import { useState } from 'preact/hooks'
import { Link } from 'wouter'
import logo from '../assets/dcac_logo.svg'

const Logo = () => (
  <img className="logo" src={logo} alt="DCAC" width="89" height="44" />
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
          </Link>
          <button className="menu-btn" onClick={toggle} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? '✕' : '☰'}
          </button>
          <nav className={`links${menuOpen ? ' open' : ''}`}>
            <Link href="/about" onClick={close}>About</Link>
            <Link href="/schedule" onClick={close}>Schedule</Link>
            <Link href="/competition" onClick={close}>Competition</Link>
            <Link href="/coaches" onClick={close}>Coaches</Link>
            <Link className="btn btn-red" href="/join" style={{ color: '#fff' }} onClick={close}>Come Swim</Link>
          </nav>
        </div>
      </header>
    </>
  )
}