import { Link } from 'wouter'
import logoWhite from '../assets/logos/dcac_logo_white.svg'

const Logo = () => (
  <img className="logo" src={logoWhite} alt="" width="57" height="28" />
)

export function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <p className="lede">DC's premiere Master's swim team since 1986.</p>
          <div className="social">
            <a href="https://instagram.com/swimdcac/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://facebook.com/DCAquaticsClub/" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
              </svg>
            </a>
            <a href="mailto:membership@swimdcac.org" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4>Get going</h4>
          <Link href="/join">New swimmers</Link>
          <Link href="/trial">Trial swims</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/schedule">Practice times</Link>
          <Link href="/competition">Competition &amp; events</Link>
          <Link href="/records">Team records</Link>
        </div>
        <div>
          <h4>The club</h4>
          <Link href="/about">About us</Link>
          <Link href="/coaches">Coaches</Link>
          <a href="https://www.clubassistant.com/club/login_form.cfm?c=1344">Member login</a>
          <Link href="/donate">Donate</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Meet our friends</h4>
          <a href="https://dpr.dc.gov">District of Columbia Parks &amp; Recreation</a>
          <a href="https://pvmasters.org/newsite">Potomac Valley Masters Swimming</a>
          <a href="https://www.gaygames.org">Federation of Gay Games</a>
          <a href="https://www.igla.org">IGLA Aquatics</a>
          <a href="https://teamdc.org">Team DC</a>
        </div>
      </div>
      <div className="wrap foot-bot">
        <span className="left">
          <Logo />
          © 2026 District Of Columbia Aquatics Club
        </span>
        {/*<span className="right">Proudly part of DC's LGBTQ+ community.</span>*/}
      </div>
    </footer>
  )
}