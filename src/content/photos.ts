/* Content JSON names its images by path relative to src/assets/ (e.g.
   "coaches/coach_sam.webp"); Vite has to see the imports at build time, so
   they are globbed here and looked up by that path. */
const files = import.meta.glob<string>('../assets/**/*.webp', { eager: true, import: 'default' })

const byName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace('../assets/', ''), url])
)

export function photo(file: string): string {
  const url = byName[file]
  if (!url) throw new Error(`missing image src/assets/${file}`)
  return url
}
