import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { instagramFeed } from './vite-plugin-instagram'

export default defineConfig({
  // '/' for a custom domain or local dev; CI sets '/<repo>/' for project Pages.
  base: process.env.VITE_BASE || '/',
  plugins: [
    preact({
      // renders every page to its own index.html at build time — see src/prerender.tsx
      prerender: {
        enabled: true,
        renderTarget: '#app',
        prerenderScript: resolve(__dirname, 'src/main.tsx'),
        // not linked from anywhere, so the crawl won't find it; GitHub Pages
        // serves this for any unknown path, with a real 404 status
        additionalPrerenderRoutes: ['/404.html'],
        // lets `yarn preview` serve the prerendered pages
        previewMiddlewareEnabled: true,
      },
    }),
    instagramFeed({ count: 9 }),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (
            req.method === 'GET' &&
            req.url &&
            req.url !== '/' &&
            !req.url.includes('.') &&
            req.headers.accept?.includes('text/html')
          ) {
            req.url = '/index.html'
          }
          next()
        })
      },
    },
  ],
})