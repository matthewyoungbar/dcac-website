import { useState } from 'preact/hooks'
import { Link } from 'wouter'

const Logo = () => (
  <svg viewBox="0 0 48 30" width="42" height="26" role="img" aria-label="District of Columbia flag mark">
    <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(3,-1) scale(.42)" fill="#C8102E" />
    <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(18,-1) scale(.42)" fill="#C8102E" />
    <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(33,-1) scale(.42)" fill="#C8102E" />
    <rect x="2" y="15" width="44" height="5" rx="1" fill="#C8102E" />
    <rect x="2" y="23" width="44" height="5" rx="1" fill="#C8102E" />
  </svg>
)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggle = () => setMenuOpen(o => !o)
  const close = () => setMenuOpen(false)

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="pride" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <header>
        <div className="wrap nav">
          <Link className="brand" href="/" aria-label="DCAC home" onClick={close}>
            <Logo />
            <span className="word">DCAC</span>
          </Link>
          <button className="menu-btn" onClick={toggle} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? '✕' : '☰'}
          </button>
          <nav className={`links${menuOpen ? ' open' : ''}`}>
            <a href="/#join" onClick={close}>Join</a>
            <a href="/#schedule" onClick={close}>Schedule</a>
            <Link href="/competition" onClick={close}>Competition</Link>
            <a href="/#about" onClick={close}>About</a>
            <a className="btn btn-red" href="/#join" style={{ color: '#fff' }} onClick={close}>Come swim</a>
          </nav>
        </div>
      </header>
    </>
  )
}