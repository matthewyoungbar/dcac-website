import { useState, useEffect } from 'preact/hooks'

export const CALENDAR_ID = 'q4p026gk42gbn5d4f6qfl9fpfo@group.calendar.google.com'
/** The club swims on DC time; everyone sees ET regardless of where they're browsing from. */
export const CLUB_TZ = 'America/New_York'

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

/** Weekday headings for a Monday-first grid. */
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/**
 * Practice focus for the day, published on the source calendar as an all-day
 * event. Anything that doesn't match a known focus still shows, as 'other'.
 */
export type ThemeId = 'distance' | 'race' | 'sprint' | 'rainbow' | 'other'

export interface Theme {
  id: ThemeId
  /** The summary exactly as written on the calendar. */
  label: string
  /** Trimmed for the narrow month cells. */
  short: string
}

const THEME_PATTERNS: [ThemeId, RegExp][] = [
  ['rainbow', /rainbow/i],
  ['sprint', /sprint/i],
  ['race', /race\s*pace|vo\s*2/i],
  ['distance', /distance/i],
]

const THEME_SHORT: Record<ThemeId, string | null> = {
  distance: 'Distance',
  race: 'Race pace',
  sprint: 'Sprint',
  rainbow: 'Rainbow',
  other: null,
}

function matchTheme(summary: string): Theme {
  const label = summary.trim()
  const id = THEME_PATTERNS.find(([, re]) => re.test(label))?.[0] ?? 'other'
  return { id, label, short: THEME_SHORT[id] ?? label }
}

export interface Practice {
  id: string
  title: string
  time: string
  location: string
  /** Full location string as entered in Google Calendar — used for calendar exports. */
  fullLocation: string
  start: Date
  end: Date
  /** The day's focus, copied down so calendar exports can carry it. */
  theme: Theme | null
}

export interface ScheduleDay {
  /** Local YYYY-MM-DD, also used as the render key */
  key: string
  name: string
  month: string
  date: number
  isToday: boolean
  /** False for the leading/trailing days a month grid borrows from its neighbours. */
  inMonth: boolean
  theme: Theme | null
  practices: Practice[]
}

interface GCalEvent {
  id: string
  summary?: string
  location?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

export type Range = 'week' | 'month'

interface Bounds {
  start: Date
  end: Date
  /** Month the grid is "about"; -1 for week ranges, where every day counts. */
  monthIndex: number
  label: string
}

/** Days since the most recent Monday. */
function sinceMonday(d: Date) {
  const dow = d.getDay()
  return dow === 0 ? 6 : dow - 1
}

/** Monday 00:00 through Sunday 23:59 of the current week. */
function weekBounds(): Bounds {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - sinceMonday(now))
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end, monthIndex: -1, label: '' }
}

/**
 * A whole month padded out to complete Monday–Sunday weeks, so the grid is
 * rectangular and the borrowed neighbour days still show their practices.
 */
function monthBounds(offset: number): Bounds {
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0)

  const start = new Date(first)
  start.setDate(first.getDate() - sinceMonday(first))
  start.setHours(0, 0, 0, 0)

  const end = new Date(last)
  end.setDate(last.getDate() + (6 - sinceMonday(last)))
  end.setHours(23, 59, 59, 999)

  return {
    start,
    end,
    monthIndex: first.getMonth(),
    label: `${MONTH_FULL[first.getMonth()]} ${first.getFullYear()}`,
  }
}

function bounds(range: Range, offset: number) {
  return range === 'week' ? weekBounds() : monthBounds(offset)
}

/**
 * All-day events carry a bare "YYYY-MM-DD". new Date() would read that as UTC
 * midnight, which lands on the previous day in Eastern time — build it locally.
 */
function parseDateOnly(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Local calendar day, not UTC — toISOString() would shift evening practices. */
function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const timeFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: CLUB_TZ, hour: 'numeric', minute: '2-digit', hour12: true,
})

/** "6:30am" / "7pm" in club time, whatever timezone the browser is in. */
function formatTime(dt: Date) {
  const parts = timeFmt.formatToParts(dt)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? ''
  const minute = get('minute')
  const ampm = get('dayPeriod').toLowerCase()
  return minute === '00' ? `${get('hour')}${ampm}` : `${get('hour')}:${minute}${ampm}`
}

function shortLocation(loc: string) {
  return loc
    .split(',')[0]
    .replace(/\s*(aquatics?\s*center|recreation\s*center|rec\s*center|pool|swim\s*center)/i, '')
    .trim()
}

/** Every day in the range, pre-seeded with no practices, so gaps still render. */
function emptyDays({ start, end, monthIndex }: Bounds): ScheduleDay[] {
  const today = dayKey(new Date())
  const days: ScheduleDay[] = []
  const d = new Date(start)
  while (d <= end) {
    const key = dayKey(d)
    days.push({
      key,
      name: DAY_NAMES[d.getDay()],
      month: MONTH_NAMES[d.getMonth()],
      date: d.getDate(),
      isToday: key === today,
      inMonth: monthIndex < 0 || d.getMonth() === monthIndex,
      theme: null,
      practices: [],
    })
    d.setDate(d.getDate() + 1)
  }
  return days
}

export function useSchedule(range: Range = 'week', monthOffset = 0) {
  const [days, setDays] = useState<ScheduleDay[]>(() => emptyDays(bounds(range, monthOffset)))
  const [label, setLabel] = useState(() => bounds(range, monthOffset).label)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const b = bounds(range, monthOffset)
    setLabel(b.label)
    // Re-seed immediately so a month change repaints the new grid while we fetch.
    setDays(emptyDays(b))
    setLoading(true)
    setError(false)

    if (!API_KEY) {
      console.warn('VITE_GOOGLE_CALENDAR_API_KEY is not set — schedule will be empty')
      setLoading(false)
      setError(true)
      return
    }

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`)
    url.searchParams.set('key', API_KEY)
    url.searchParams.set('timeMin', b.start.toISOString())
    url.searchParams.set('timeMax', b.end.toISOString())
    url.searchParams.set('singleEvents', 'true')
    url.searchParams.set('orderBy', 'startTime')
    url.searchParams.set('maxResults', '250')

    let cancelled = false

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: { items?: GCalEvent[] }) => {
        if (cancelled) return
        const list = emptyDays(b)
        const byDay = new Map(list.map(d => [d.key, d]))

        const items = data.items ?? []

        // Pass 1: all-day events set the day's focus. end.date is exclusive,
        // so a single-day event runs from its date to the next one.
        for (const e of items) {
          if (e.start.dateTime || !e.start.date || !e.summary?.trim()) continue
          const theme = matchTheme(e.summary)
          const from = parseDateOnly(e.start.date)
          const to = e.end?.date ? parseDateOnly(e.end.date) : new Date(from.getTime() + 86_400_000)
          for (let d = new Date(from); d < to; d.setDate(d.getDate() + 1)) {
            const day = byDay.get(dayKey(d))
            if (day) day.theme = theme
          }
        }

        // Pass 2: timed events are the practices themselves.
        for (const e of items) {
          if (!e.start.dateTime) continue
          const startAt = new Date(e.start.dateTime)
          // Google omits end only for malformed events; fall back to a one-hour block.
          const endAt = e.end?.dateTime ? new Date(e.end.dateTime) : new Date(startAt.getTime() + 3600_000)
          const day = byDay.get(dayKey(startAt))
          day?.practices.push({
            id: e.id,
            title: e.summary?.trim() || 'DCAC practice',
            time: formatTime(startAt),
            location: e.location ? shortLocation(e.location) : '',
            fullLocation: e.location ?? '',
            start: startAt,
            end: endAt,
            theme: day.theme,
          })
        }

        setDays(list)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [range, monthOffset])

  return { days, loading, error, label }
}