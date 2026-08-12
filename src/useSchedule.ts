import { useState, useEffect } from 'preact/hooks'

const CALENDAR_ID = 'q4p026gk42gbn5d4f6qfl9fpfo@group.calendar.google.com'
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export interface Practice {
  id: string
  time: string
  location: string
}

export interface ScheduleDay {
  /** Local YYYY-MM-DD, also used as the render key */
  key: string
  name: string
  date: number
  isToday: boolean
  practices: Practice[]
}

interface GCalEvent {
  id: string
  location?: string
  start: { dateTime?: string; date?: string }
}

function weekBounds() {
  const now = new Date()
  const dow = now.getDay()
  const mon = new Date(now)
  mon.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1))
  mon.setHours(0, 0, 0, 0)
  const sun = new Date(mon)
  sun.setDate(mon.getDate() + 6)
  sun.setHours(23, 59, 59, 999)
  return { start: mon, end: sun }
}

/** Local calendar day, not UTC — toISOString() would shift evening practices. */
function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatTime(dt: Date) {
  const h = dt.getHours()
  const m = dt.getMinutes()
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m > 0 ? `${hour}:${String(m).padStart(2, '0')}${ampm}` : `${hour}${ampm}`
}

function shortLocation(loc: string) {
  return loc
    .split(',')[0]
    .replace(/\s*(aquatics?\s*center|recreation\s*center|rec\s*center|pool|swim\s*center)/i, '')
    .trim()
}

/** The seven days Mon–Sun, each pre-seeded with no practices. */
function emptyWeek(start: Date): ScheduleDay[] {
  const today = dayKey(new Date())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = dayKey(d)
    return { key, name: DAY_NAMES[d.getDay()], date: d.getDate(), isToday: key === today, practices: [] }
  })
}

export function useSchedule() {
  const [days, setDays] = useState<ScheduleDay[]>(() => emptyWeek(weekBounds().start))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!API_KEY) {
      console.warn('VITE_GOOGLE_CALENDAR_API_KEY is not set — schedule will be empty')
      setLoading(false)
      setError(true)
      return
    }

    const { start, end } = weekBounds()

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`)
    url.searchParams.set('key', API_KEY)
    url.searchParams.set('timeMin', start.toISOString())
    url.searchParams.set('timeMax', end.toISOString())
    url.searchParams.set('singleEvents', 'true')
    url.searchParams.set('orderBy', 'startTime')
    url.searchParams.set('maxResults', '50')

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: { items?: GCalEvent[] }) => {
        const week = emptyWeek(start)
        const byDay = new Map(week.map(d => [d.key, d]))

        for (const e of data.items ?? []) {
          if (!e.start.dateTime) continue
          const dt = new Date(e.start.dateTime)
          byDay.get(dayKey(dt))?.practices.push({
            id: e.id,
            time: formatTime(dt),
            location: e.location ? shortLocation(e.location) : '',
          })
        }

        setDays(week)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return { days, loading, error }
}