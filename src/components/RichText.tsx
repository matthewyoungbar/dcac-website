import { Link } from 'wouter'

/* Copy in src/content/*.json is plain text, so links are written the markdown
   way -- [label](/schedule). Site-relative hrefs go through wouter so they stay
   client-side routed (and pick up the deploy base); everything else is a plain
   anchor. */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

export function RichText({ text }: { text: string }) {
  const parts = []
  let at = 0

  for (const m of text.matchAll(LINK)) {
    if (m.index > at) parts.push(text.slice(at, m.index))
    const [, label, href] = m
    parts.push(
      href.startsWith('/')
        ? <Link key={m.index} href={href}>{label}</Link>
        : <a key={m.index} href={href}>{label}</a>
    )
    at = m.index + m[0].length
  }
  if (at < text.length) parts.push(text.slice(at))

  return <>{parts}</>
}
