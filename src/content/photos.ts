/* Content JSON names its images by filename; Vite has to see the imports at
   build time, so they are globbed here and looked up by basename. */
const files = import.meta.glob<string>('../assets/*.webp', { eager: true, import: 'default' })

const byName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!, url])
)

export function photo(file: string): string {
  const url = byName[file]
  if (!url) throw new Error(`missing image src/assets/${file}`)
  return url
}
