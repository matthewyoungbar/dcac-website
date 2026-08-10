import type { ComponentChildren } from 'preact'
import './Tile.css'

export type TileColor = 'blue' | 'red' | 'purple' | 'deep'

interface TileProps {
  color: TileColor
  title: ComponentChildren
  description: ComponentChildren
  icon?: ComponentChildren
  href?: string
  external?: boolean
  arrow?: boolean
  id?: string
}

export function Tile({ color, title, description, icon, href, external, arrow = !!href, id }: TileProps) {
  const className = `tile t-${color}`
  const inner = (
    <>
      {icon && <span className="ic">{icon}</span>}
      <span><span className="ttl">{title}</span><br /><span className="desc">{description}</span></span>
      {arrow && (
        <span className="arr">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a className={className} id={id} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  }

  return <div className={className} id={id}>{inner}</div>
}