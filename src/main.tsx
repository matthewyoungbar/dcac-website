import { hydrate, render } from 'preact'
import { App } from './app.tsx'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

/**
 * Whether the HTML already in #app was prerendered for the page we're on.
 * Hydrating HTML built for a different route (e.g. a server that falls back
 * to index.html) would stitch two pages together, so in that case we redraw.
 * 404.html is the exception: GitHub Pages serves it for every unknown path,
 * which is exactly the set of paths it was rendered for.
 */
function prerenderedForHere() {
  const tag = document.getElementById('prerender-data')
  if (!tag) return false
  const { url } = JSON.parse(tag.textContent || '{}') as { url?: string }
  const here = location.pathname.slice(base.length).replace(/\/$/, '') || '/'
  return url === here || url === '/404.html'
}

if (typeof window !== 'undefined') {
  const root = document.getElementById('app')!
  if (prerenderedForHere()) {
    hydrate(<App />, root)
  } else {
    // dev server (empty shell) or mismatched HTML — start clean
    root.textContent = ''
    render(<App />, root)
  }
}

/**
 * Called at build time by the prerender plugin (see vite.config.ts). The
 * renderer is loaded lazily so it lands in its own chunk that browsers never
 * fetch.
 */
export async function prerender(data: { url: string }) {
  const { prerenderPage } = await import('./prerender.tsx')
  return prerenderPage(data)
}
