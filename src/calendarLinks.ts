import { CALENDAR_ID, CLUB_TZ, type Practice } from './useSchedule.ts'

/** UTC basic format, e.g. 20260812T223000Z — what both ICS and Google's template URL expect. */
function stamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/** RFC 5545 TEXT escaping: backslash, semicolon, comma and newlines are special. */
function esc(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

/**
 * A single-event calendar file. Line endings must be CRLF — Apple Calendar
 * rejects LF-only files outright.
 */
export function icsForPractice(p: Practice) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DCAC//Practice Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${p.id}@swimdcac.org`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(p.start)}`,
    `DTEND:${stamp(p.end)}`,
    `SUMMARY:${esc(p.title)}`,
    ...(p.theme ? [`DESCRIPTION:${esc(`Focus: ${p.theme.label}`)}`] : []),
    ...(p.fullLocation ? [`LOCATION:${esc(p.fullLocation)}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/** Hands the .ics to the OS, which opens Apple Calendar / Outlook / whatever is registered. */
export function downloadPractice(p: Practice) {
  const blob = new Blob([icsForPractice(p)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dcac-${p.id}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Give the navigation a tick before tearing the blob down.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Google's prefilled-event composer. ctz keeps the times in club time. */
export function googlePracticeUrl(p: Practice) {
  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', p.title)
  url.searchParams.set('dates', `${stamp(p.start)}/${stamp(p.end)}`)
  url.searchParams.set('ctz', CLUB_TZ)
  if (p.fullLocation) url.searchParams.set('location', p.fullLocation)
  if (p.theme) url.searchParams.set('details', `Focus: ${p.theme.label}`)
  return url.toString()
}

/**
 * Whole-calendar subscription. The two platforms want different things:
 * Apple/Outlook follow webcal://, while the Google Calendar app handles
 * webcal:// badly and wants its own cid= form.
 */
export const subscribeApple = `webcal://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`
export const subscribeGoogle = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(CALENDAR_ID)}`
export const subscribeIcs = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`

/**
 * Google's own rendering of the calendar, used only as a fallback when our API
 * fetch fails. It shares no infrastructure with the API path — no key, no
 * googleapis.com — so it survives a revoked key, a bad referrer restriction or
 * an exhausted quota. MONTH mode mirrors the custom grid it stands in for, and
 * ctz pins it to the same club time.
 */
export const embedUrl = (() => {
  const url = new URL('https://calendar.google.com/calendar/embed')
  url.searchParams.set('src', CALENDAR_ID)
  url.searchParams.set('ctz', CLUB_TZ)
  url.searchParams.set('mode', 'MONTH')
  url.searchParams.set('wkst', '2') // weeks start Monday, matching the rest of the site
  url.searchParams.set('showTitle', '0')
  url.searchParams.set('showPrint', '0')
  url.searchParams.set('showTabs', '0')
  url.searchParams.set('showCalendars', '0')
  url.searchParams.set('showTz', '0')
  return url.toString()
})()