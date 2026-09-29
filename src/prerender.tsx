import { renderToString } from 'preact-render-to-string'
import { App } from './app.tsx'

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

export function prerenderPage({ url }: { url: string }) {
  const html = renderToString(<App ssrPath={base + url} />)
  // `data` is written into the page as #prerender-data; main.tsx checks it
  // before hydrating, so HTML built for one route is never adopted by another
  return { html, links: internalLinks(html), data: { url } }
}
