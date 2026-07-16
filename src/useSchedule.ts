import { useState, useEffect } from 'preact/hooks'

const ICAL_URL =
  'https://calendar.google.com/calendar/ical/' +
  'q4p026gk42gbn5d4f6qfl9fpfo%40group.calendar.google.com/public/basic.ics'

const CHIP_COLORS = ['b', 'd', 'r'] as const

export interface ScheduleEvent {
  id: string
  label: string
  color: typeof CHIP_COLORS[number]
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

// iCal lines can be folded (continuation lines start with a space/tab)
function unfold(text: string) {
  return text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '')
}

function parseIcalDate(raw: string): Date | null {
  // Strip TZID params — value is always after the last colon
  const val = raw.includes(':') ? raw.split(':').pop()! : raw
  // All-day: YYYYMMDD
  if (/^\d{8}$/.test(val)) {
    return new Date(`${val.slice(0,4)}-${val.slice(4,6)}-${val.slice(6,8)}`)
  }
  // With time: YYYYMMDDTHHmmss[Z]
  const m = val.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/)
  if (!m) return null
  const iso = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}${m[7] || ''}`
  return new Date(iso)
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

function parseEvents(text: string) {
  const lines = unfold(text).split(/\r?\n/)
  const events: { id: string; start: Date; location: string }[] = []
  let inEvent = false
  let cur: Record<string, string> = {}

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { inEvent = true; cur = {}; continue }
    if (line === 'END:VEVENT') {
      inEvent = false
      const start = parseIcalDate(cur['DTSTART'] ?? '')
      if (start) events.push({ id: cur['UID'] ?? String(Math.random()), start, location: cur['LOCATION'] ?? '' })
      continue
    }
    if (!inEvent) continue
    const colon = line.indexOf(':')
    if (colon === -1) continue
    // Key may have params: DTSTART;TZID=...:value — store the whole raw value (incl. TZID prefix) for date parsing
    const prop = line.slice(0, colon).split(';')[0].toUpperCase()
    if (prop === 'DTSTART') {
      cur['DTSTART'] = line.slice(colon - line.indexOf(';') > 0 ? 0 : colon + 1) // keep raw for parseIcalDate
      cur['DTSTART'] = line // store whole line so parseIcalDate can split on ':'
    } else {
      cur[prop] = line.slice(colon + 1)
    }
  }
  return events
}

export function useSchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const { start, end } = weekBounds()

    fetch(ICAL_URL)
      .then(r => { if (!r.ok) throw new Error(); return r.text() })
      .then(text => {
        const all = parseEvents(text)
        const week = all
          .filter(e => e.start >= start && e.start <= end)
          .sort((a, b) => a.start.getTime() - b.start.getTime())
        setEvents(
          week.map((e, i) => {
            const day = DAYS[e.start.getDay()]
            const time = formatTime(e.start)
            const loc = e.location ? ` · ${shortLocation(e.location)}` : ''
            return { id: e.id, label: `${day} · ${time}${loc}`, color: CHIP_COLORS[i % CHIP_COLORS.length] }
          })
        )
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return { events, loading, error }
}
