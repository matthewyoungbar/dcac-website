import { useState } from 'preact/hooks'
import { Link } from 'wouter'
import logoMark from '../assets/dcac_logo_mark.webp'

/* the club mark, cropped out of the full logo lockup — the lockup's "DCAC"
   and tagline are dropped here, since the wordmark beside it stays live text */
const Logo = () => (
  <img className="mark" src={logoMark} alt="" width="55" height="26" />
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
            <Link href="/join" onClick={close}>Join</Link>
            <Link href="/schedule" onClick={close}>Schedule</Link>
            <Link href="/competition" onClick={close}>Competition</Link>
            <Link href="/about" onClick={close}>About</Link>
            <Link className="btn btn-red" href="/join" style={{ color: '#fff' }} onClick={close}>Come swim</Link>
          </nav>
        </div>
      </header>
    </>
  )
}