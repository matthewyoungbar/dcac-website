import { useState, useEffect } from 'preact/hooks'

/**
 * Team records live in a Google Sheet the records chair maintains ("Team
 * Records.xlsx"), published to the web. Each course/type pair is one tab, and
 * the published CSV export of a tab sends CORS headers, so the browser can
 * read it directly — no key and no build step, and an edit to the sheet shows
 * up on the next page load.
 */
const PUB_ID = '2PACX-1vSMIf5tFGiEFsVNDFnJZXQSqcBSmo7JmbSjm2ZAwpA1x2H5WAuoq8tBAHWWu2GwTA'

/** The human-readable sheet, for the "see the source" link. */
export const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${PUB_ID}/pubhtml`

export type Course = 'SCY' | 'SCM' | 'LCM'
export type RecordKind = 'individual' | 'relay'

/** Tab ids, read off the published sheet's own tab switcher. */
const GIDS: Record<Course, Record<RecordKind, string>> = {
  SCY: { individual: '187087209', relay: '2059669624' },
  SCM: { individual: '1680356941', relay: '866884261' },
  LCM: { individual: '1322768079', relay: '1598634264' },
}

export const COURSES: { id: Course; label: string; full: string }[] = [
  { id: 'SCY', label: 'SCY', full: 'Short course yards — 25 yard pool' },
  { id: 'SCM', label: 'SCM', full: 'Short course meters — 25 meter pool' },
  { id: 'LCM', label: 'LCM', full: 'Long course meters — 50 meter pool' },
]

/** One swim: the swimmer (or the four-person relay), the time, and the year. */
export interface Swim {
  names: string[]
  time: string
  year: string
}

export interface RecordLine {
  event: string
  men: Swim | null
  women: Swim | null
  /** Mixed relays are single-entry — the sheet gives them their own blocks. */
  mixed: Swim | null
}

export interface AgeGroup {
  /** Unique within a sheet; mixed and gendered blocks share a label. */
  id: string
  label: string
  mixed: boolean
  lines: RecordLine[]
}

function csvUrl(course: Course, kind: RecordKind) {
  return `https://docs.google.com/spreadsheets/d/e/${PUB_ID}/pub?gid=${GIDS[course][kind]}&single=true&output=csv`
}

/** Minimal RFC-4180 reader — enough for quoted fields and CRLF line endings. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c !== '"') field += c
      else if (text[i + 1] === '"') { field += '"'; i++ }
      else quoted = false
      continue
    }
    if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

const cell = (row: string[], i: number) => (row[i] ?? '').trim()

/** A swim only counts once it has both a swimmer and a time; the year is sometimes missing. */
function swim(names: string[], time: string, year: string): Swim | null {
  const who = names.map(n => n.trim()).filter(Boolean)
  if (!who.length || !time.trim()) return null
  return { names: who, time: time.trim(), year: year.trim() }
}

/** Age ranges are typed with hyphens; the display wants en dashes. */
const prettyLabel = (raw: string) => raw.replace(/\s*-\s*/g, '–')

function pushLine(group: AgeGroup | null, line: RecordLine) {
  // The sheet lists every event in every age group, empty or not — only the
  // ones somebody has actually swum belong on the page.
  if (group && (line.men || line.women || line.mixed)) group.lines.push(line)
}

/**
 * Individual tabs mirror the two genders around a centre event column:
 * name, time, year | event | year, time, name.
 */
function readIndividuals(rows: string[][]): AgeGroup[] {
  const groups: AgeGroup[] = []
  let current: AgeGroup | null = null

  for (const row of rows) {
    const first = cell(row, 0)
    if (first === 'MEN') {
      const label = prettyLabel(cell(row, 3))
      current = { id: label, label, mixed: false, lines: [] }
      groups.push(current)
      continue
    }
    if (first === 'Name' || first === 'Names') continue

    const event = cell(row, 3)
    if (!event) continue
    pushLine(current, {
      event,
      men: swim([cell(row, 0)], cell(row, 1), cell(row, 2)),
      women: swim([cell(row, 6)], cell(row, 5), cell(row, 4)),
      mixed: null,
    })
  }

  return groups.filter(g => g.lines.length)
}

/**
 * Relay tabs carry four names a side: names ×4, time, year | event | year,
 * time, names ×4. Mixed relays get their own blocks, headed "MIXED <age>",
 * with the single entry in the left-hand columns.
 */
function readRelays(rows: string[][]): AgeGroup[] {
  const groups: AgeGroup[] = []
  let current: AgeGroup | null = null

  for (const row of rows) {
    const first = cell(row, 0)
    if (first === 'MEN') {
      const label = prettyLabel(cell(row, 6))
      current = { id: label, label, mixed: false, lines: [] }
      groups.push(current)
      continue
    }
    if (first.startsWith('MIXED')) {
      const label = prettyLabel(first.replace(/^MIXED\s*/, ''))
      current = { id: `mixed ${label}`, label, mixed: true, lines: [] }
      groups.push(current)
      continue
    }
    if (first === 'Name' || first === 'Names') continue

    const event = cell(row, 6)
    if (!event) continue
    const left = swim(
      [cell(row, 0), cell(row, 1), cell(row, 2), cell(row, 3)],
      cell(row, 4),
      cell(row, 5),
    )
    pushLine(current, {
      event,
      men: current?.mixed ? null : left,
      women: swim(
        [cell(row, 9), cell(row, 10), cell(row, 11), cell(row, 12)],
        cell(row, 8),
        cell(row, 7),
      ),
      mixed: current?.mixed ? left : null,
    })
  }

  return groups.filter(g => g.lines.length)
}

/** Parsed sheets are kept for the session so flipping between tabs is instant. */
const cache = new Map<string, AgeGroup[]>()

export function useRecords(course: Course, kind: RecordKind) {
  const key = `${course}:${kind}`
  const [groups, setGroups] = useState<AgeGroup[]>(() => cache.get(key) ?? [])
  const [loading, setLoading] = useState(() => !cache.has(key))
  const [error, setError] = useState(false)

  useEffect(() => {
    const cached = cache.get(key)
    if (cached) {
      setGroups(cached)
      setLoading(false)
      setError(false)
      return
    }

    setGroups([])
    setLoading(true)
    setError(false)

    let cancelled = false
    const [c, k] = key.split(':') as [Course, RecordKind]

    fetch(csvUrl(c, k))
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.text() })
      .then(text => {
        if (cancelled) return
        const rows = parseCsv(text)
        const parsed = k === 'relay' ? readRelays(rows) : readIndividuals(rows)
        cache.set(key, parsed)
        setGroups(parsed)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [key])

  return { groups, loading, error }
}
