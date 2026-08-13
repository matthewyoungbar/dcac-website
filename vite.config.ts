import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { instagramFeed } from './vite-plugin-instagram'

export default defineConfig({
  // '/' for a custom domain or local dev; CI sets '/<repo>/' for project Pages.
  base: process.env.VITE_BASE || '/',
  plugins: [
    preact(),
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