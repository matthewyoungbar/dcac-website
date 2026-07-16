import { useState, useEffect, useRef } from 'preact/hooks'
import { InstagramFeed } from './InstagramFeed'
import { useSchedule } from './useSchedule'
import './app.css'

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroInnerRef = useRef<HTMLDivElement>(null)
  const { events: schedEvents, loading: schedLoading } = useSchedule()

  useEffect(() => {
    const el = heroInnerRef.current
    if (!el) return
    const hero = el.closest('section') as HTMLElement | null
    function onScroll() {
      if (!el || !hero) return
      const y = Math.min(window.scrollY, hero.offsetHeight)
      el.style.transform = `translateY(${y * 0.22}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleMenu() {
    setMenuOpen(open => !open)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <div className="pride" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      <header>
        <div className="wrap nav">
          <a className="brand" href="#" aria-label="DCAC home">
            <svg viewBox="0 0 48 30" width="42" height="26" role="img" aria-label="District of Columbia flag mark">
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(3,-1) scale(.42)" fill="#C8102E" />
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(18,-1) scale(.42)" fill="#C8102E" />
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(33,-1) scale(.42)" fill="#C8102E" />
              <rect x="2" y="15" width="44" height="5" rx="1" fill="#C8102E" />
              <rect x="2" y="23" width="44" height="5" rx="1" fill="#C8102E" />
            </svg>
            <span className="word">DCAC</span>
          </a>
          <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? '✕' : '☰'}
          </button>
          <nav className={`links${menuOpen ? ' open' : ''}`}>
            <a href="#join" onClick={closeMenu}>Join</a>
            <a href="#schedule" onClick={closeMenu}>Schedule</a>
            <a href="#meets" onClick={closeMenu}>Meets</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a className="btn btn-red" href="#join" style={{ color: '#fff' }} onClick={closeMenu}>Come swim</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="stars" aria-hidden="true">
          <svg className="star-bob" style={{ top: '42px', right: '9%' }} width="64" height="64" viewBox="0 0 24 24">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" fill="#0C447C" />
          </svg>
          <svg className="star-bob b" style={{ top: '128px', right: '22%' }} width="40" height="40" viewBox="0 0 24 24">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" fill="#0C447C" />
          </svg>
          <svg className="star-bob c" style={{ top: '34px', right: '30%' }} width="30" height="30" viewBox="0 0 24 24">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" fill="#0C447C" />
          </svg>
        </div>
        <div className="wrap">
          <div ref={heroInnerRef} className="hero-inner">
            <span className="eyebrow">DC's LGBTQ+ swim team</span>
            <h1>Come swim with us.</h1>
            <p className="sub">Every body, every stroke, every pace. From first-timers to world champions, there's water here for you.</p>
            <div className="cta">
              <a className="btn btn-red" href="#join" style={{ color: '#fff' }}>Come to a practice</a>
              <a className="btn btn-ghost" href="#join">How to join</a>
            </div>
          </div>
        </div>
        <svg className="waves" viewBox="0 0 680 96" preserveAspectRatio="none" aria-hidden="true">
          <path className="w1" d="M0,30 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 c56.7,-14 113.3,-14 170,0 c56.7,14 113.3,14 170,0 L1360,96 L0,96 Z" fill="#0C447C" />
          <path className="w2" d="M0,48 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 c56.7,-13 113.3,-13 170,0 c56.7,13 113.3,13 170,0 L1360,96 L0,96 Z" fill="#185FA5" />
          <path className="w3" d="M0,64 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 c56.7,-12 113.3,-12 170,0 c56.7,12 113.3,12 170,0 L1360,96 L0,96 Z" fill="#378ADD" />
          <path d="M0,80 c56.7,-10 113.3,-10 170,0 c56.7,10 113.3,10 170,0 c56.7,-10 113.3,-10 170,0 c56.7,10 113.3,10 170,0 L680,96 L0,96 Z" fill="#fff" />
        </svg>
      </section>

      <main id="main" className="wrap">
        <a className="feature" id="join" href="#">
          <svg className="fstars" width="78" height="34" viewBox="0 0 80 34" aria-hidden="true">
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(2,4) scale(.8)" fill="#C8102E" />
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(28,4) scale(.8)" fill="#C8102E" />
            <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(54,4) scale(.8)" fill="#C8102E" />
          </svg>
          <div className="ftext">
            <p className="tag">New to the team?</p>
            <h2>Start here — your first swim's on us.</h2>
            <p>No experience needed. Just bring a suit, goggles, and yourself. We'll meet you at the wall.</p>
            <span className="btn btn-red" style={{ color: '#fff', display: 'inline-block' }}>Plan your first visit</span>
          </div>
        </a>

        <div className="tiles">
          <a className="tile t-blue" id="schedule" href="#">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <span><span className="ttl">Practice times</span><br /><span className="desc">When & where we swim</span></span>
            <span className="arr">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a className="tile t-red" id="meets" href="#">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M8 2v4M16 2v4" />
              </svg>
            </span>
            <span><span className="ttl">Meets & events</span><br /><span className="desc">Race days & socials</span></span>
            <span className="arr">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a className="tile t-purple" id="about" href="#">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M16 14c2.5 0 5 1.5 5 5" />
              </svg>
            </span>
            <span><span className="ttl">Who we are</span><br /><span className="desc">Our story & community</span></span>
            <span className="arr">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a className="tile t-deep" href="#">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
              </svg>
            </span>
            <span><span className="ttl">Member login</span><br /><span className="desc">Dues & member info</span></span>
            <span className="arr">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>

        <div className="sched">
          <div className="sched-head">
            <span className="lbl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" />
              </svg>
              This week in the pool
            </span>
            <a href="#">Full schedule →</a>
          </div>
          <div className="chips">
            {schedLoading && <span className="chip b" style={{ opacity: 0.5 }}>Loading…</span>}
            {!schedLoading && schedEvents.length === 0 && (
              <span className="chip b" style={{ opacity: 0.5 }}>No practices this week</span>
            )}
            {schedEvents.map(e => (
              <span key={e.id} className={`chip ${e.color}`}>{e.label}</span>
            ))}
          </div>
        </div>

        <InstagramFeed />

        <p className="reach">Not sure where to start? Email <a href="mailto:membership@swimdcac.org">hello@swimdcac.org</a> — a real person writes back.</p>
      </main>

      <footer>
        <div className="wrap foot">
          <div>
            <p className="lede">DC's premiere Master's swim team since 1986.</p>
            <div className="social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="mailto:hello@swimdcac.org" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Get going</h4>
            <a href="#join">New swimmers</a>
            <a href="#join">How to join</a>
            <a href="#schedule">Practice times</a>
            <a href="#meets">Meets & events</a>
          </div>
          <div>
            <h4>The club</h4>
            <a href="#about">About us</a>
            <a href="#">Coaches</a>
            <a href="#">Member login</a>
            <a href="mailto:hello@swimdcac.org">Contact</a>
          </div>
          <div>
            <h4>Meet our friends</h4>
            <a href="https://dpr.dc.gov">District of Columbia Parks &amp; Recreation</a>
            <a href="https://pvmasters.org">Potomac Valley Masters Swimming</a>
            <a href="https://www.gaygames.org">Federation of Gay Games</a>
            <a href="https://www.igla.org">IGLA Aquatics</a>
            <a href="https://teamdc.org">Team DC</a>
          </div>
        </div>
        <div className="wrap foot-bot">
          <span className="left">
            <svg viewBox="0 0 48 30" width="36" height="22" aria-hidden="true">
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(3,-1) scale(.42)" fill="#C8102E" />
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(18,-1) scale(.42)" fill="#C8102E" />
              <path d="M12 2 L14.9 8.6 L22 9.2 L16.5 13.9 L18.3 21 L12 17.3 L5.7 21 L7.5 13.9 L2 9.2 L9.1 8.6 Z" transform="translate(33,-1) scale(.42)" fill="#C8102E" />
              <rect x="2" y="15" width="44" height="5" rx="1" fill="#C8102E" />
              <rect x="2" y="23" width="44" height="5" rx="1" fill="#C8102E" />
            </svg>
            © 2026 District of Columbia Aquatics Club
          </span>
          <span className="right">Proudly part of DC's LGBTQ+ community.</span>
        </div>
      </footer>
    </>
  )
}
