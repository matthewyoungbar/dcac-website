import { renderToString } from 'preact-render-to-string'
import { App } from './app.tsx'
import { metaFor, notFoundMeta, documentTitle, SITE_NAME, SITE_URL } from './pageMeta.ts'

/*
 * Build-time prerendering (wired up in vite.config.ts). The plugin calls this
 * once per route, starting at "/" and following every internal link we report
 * back, and writes the result to <route>/index.html. That gives each page real
 * HTML and a 200 on GitHub Pages instead of the 404.html fallback.
 *
 * Only the first render is captured: data that loads in effects (schedule,
 * records) still fetches live in the browser.
 */

// '' at a custom domain, '/dcac-website' on project Pages
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Internal hrefs on the page, minus the base path — the plugin works in unprefixed routes. */
function internalLinks(html: string) {
  const links = new Set<string>()
  for (const [, href] of html.matchAll(/<a\s[^>]*?href="([^"]+)"/g)) {
    if (!href.startsWith(base + '/') || href.startsWith('//')) continue
    const path = href.slice(base.length).split(/[?#]/)[0]
    // skip files in public/ (icons, manifest) — only routes get prerendered
    if (path && !/\.[a-z0-9]+$/i.test(path)) links.add(path)
  }
  return links
}

type HeadElement = { type: 'meta' | 'link'; props: Record<string, string> }

/** <title>, description and the Open Graph tags link previews are built from. */
function head(url: string) {
  const notFound = url === '/404.html'
  const meta = notFound ? notFoundMeta : metaFor(url)
  if (!meta) throw new Error(`No page metadata for "${url}" — add it to src/pageMeta.ts`)

  const title = documentTitle(meta)
  // GitHub Pages redirects /about to /about/, so that's the canonical form
  const pageUrl = SITE_URL + (url === '/' ? '/' : `${url}/`)
  const tag = (property: string, content: string): HeadElement =>
    ({ type: 'meta', props: { property, content } })

  const elements: HeadElement[] = [
    { type: 'meta', props: { name: 'description', content: meta.description } },
    tag('og:type', 'website'),
    tag('og:site_name', SITE_NAME),
    tag('og:locale', 'en_US'),
    tag('og:title', title),
    tag('og:description', meta.description),
    tag('og:image', `${SITE_URL}/og/${meta.image.file}`),
    tag('og:image:width', '1200'),
    tag('og:image:height', '630'),
    tag('og:image:alt', meta.image.alt),
    // X/Twitter falls back to the og: tags for everything but the card size
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
  ]
  // the 404 page stands in for every unknown path, so it has no URL of its own
  if (!notFound) {
    elements.push(tag('og:url', pageUrl), { type: 'link', props: { rel: 'canonical', href: pageUrl } })
  }
  return { lang: 'en', title, elements: new Set(elements) }
}

export function prerenderPage({ url }: { url: string }) {
  const html = renderToString(<App ssrPath={base + url} />)
  // `data` is written into the page as #prerender-data; main.tsx checks it
  // before hydrating, so HTML built for one route is never adopted by another
  return { html, links: internalLinks(html), data: { url }, head: head(url) }
}
