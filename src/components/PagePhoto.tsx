import './PagePhoto.css'

interface PagePhotoProps {
  src: string
  alt: string
  /** intrinsic size, so the browser reserves the space before it loads */
  width: number
  height: number
  caption?: string
  /** centered and capped at 620px, for tall or square shots that would tower at full width */
  narrow?: boolean
}

/** A full-width content photo with rounded corners and an optional caption. */
export function PagePhoto({ src, alt, width, height, caption, narrow }: PagePhotoProps) {
  return (
    <figure className={`page-photo${narrow ? ' narrow' : ''}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
