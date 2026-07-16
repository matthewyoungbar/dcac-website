import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { instagramFeed } from './vite-plugin-instagram'

export default defineConfig({
  plugins: [preact(), instagramFeed({ count: 9 })],
})
