const cities = [
  'Paris', 'Honolulu', 'Montreal', 'Stockholm', 'New York City',
  'Cologne', 'Miami', 'Reykjavik', 'Melbourne', 'Seattle', 'San Francisco', 'Sydney',
]

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export function CompetitionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            {/*<span className="eyebrow">Competition</span>*/}
            <h1>Competition</h1>
            {/*<p className="sub">From local Masters meets to world championships — DCAC competes everywhere and wins.</p>*/}
          </div>
        </div>
      </section>

      <main id="main" className="wrap" style={{ paddingTop: '48px', paddingBottom: '10px' }}>

        <section className="meets-section">
          <h2 className="section-title">Upcoming meets</h2>
          <div className="meets-cta-card">
            <p className="meets-cta-label">No schedule posted yet</p>
            <p className="meets-cta-body">DCAC participates in 4–5 focus meets each year — some local, others hosted by teams around the country and world. For the latest upcoming competition opportunities, reach out to the competition committee.</p>
            <a className="btn btn-red" href="mailto:competition@swimdcac.org" style={{ color: '#fff', display: 'inline-block', marginTop: '18px' }}>
              Email the competition chair
            </a>
          </div>
        </section>

        <section className="meets-section">
          <h2 className="section-title">The big stage</h2>
          <p className="section-body">
            DCAC's marquee event each year is either the <strong>International Gay &amp; Lesbian Aquatics (IGLA) World Championships</strong> or the <strong>Gay Games</strong>. We've competed — and won — in cities around the world:
          </p>
          <div className="chips" style={{ marginTop: '16px' }}>
            {cities.map(city => <span key={city} className="chip b">{city}</span>)}
          </div>
          <p className="section-note">DCAC proudly hosted IGLA in <strong>1996</strong>, <strong>2008</strong>, and <strong>2025</strong>.</p>
        </section>

        <section className="meets-section">
          <h2 className="section-title">Our record</h2>
          <div className="accolades-grid">
            <div className="accolade t-blue">
              <span className="accolade-num">11×</span>
              <span className="accolade-label">IGLA World Champions</span>
              <span className="accolade-detail">2001, 2003–2005, 2008, 2011 &amp; 2013</span>
            </div>
            <div className="accolade t-red">
              <span className="accolade-num">2000</span>
              <span className="accolade-label">USMS National Champions</span>
              <span className="accolade-detail">Men's Champions &amp; Combined Runner Up</span>
            </div>
            <div className="accolade t-purple">
              <span className="accolade-num">38</span>
              <span className="accolade-label">USMS Top Ten times in 2020</span>
              <span className="accolade-detail">22 swimmers earned All American status</span>
            </div>
            <div className="accolade t-deep">
              <span className="accolade-num">∞</span>
              <span className="accolade-label">IGLA World Records</span>
              <span className="accolade-detail">Individual &amp; relay records across age groups</span>
            </div>
          </div>
        </section>

        <section className="meets-section">
          <h2 className="section-title">Beyond the pool</h2>
          <p className="section-body" style={{ marginBottom: '14px' }}>
            Many DCAC swimmers also compete in open water swims, triathlons, and running races. Our members are active across DC-area LGBTQ+ sports leagues:
          </p>
          <div className="tiles">
            <a className="tile t-blue" href="https://www.dcfrontrunners.org" target="_blank" rel="noopener noreferrer">
              <span>
                <span className="ttl">DC Front Runners</span><br />
                <span className="desc">Running &amp; walking club</span>
              </span>
              <span className="arr"><ArrowIcon /></span>
            </a>
            <a className="tile t-purple" href="https://www.dctriclub.org/series/triout-events/" target="_blank" rel="noopener noreferrer">
              <span>
                <span className="ttl">TriOut Multisport</span><br />
                <span className="desc">LGBTQ+ triathlon club</span>
              </span>
              <span className="arr"><ArrowIcon /></span>
            </a>
            <a className="tile t-red" href="https://dseahorses.org/" target="_blank" rel="noopener noreferrer">
              <span>
                <span className="ttl">DSeahorses</span><br />
                <span className="desc">Water polo club</span>
              </span>
              <span className="arr"><ArrowIcon /></span>
            </a>
          </div>
        </section>

        <div className="sched" style={{ marginBottom: '30px' }}>
          <div className="sched-head">
            <span className="lbl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>
              Team records
            </span>
            <a href="https://www.swimdcac.org/page.cfm?pagetitle=Team+Records" target="_blank" rel="noopener noreferrer">
              View all records →
            </a>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
            DCAC individual and relay records in SCM, LCM, and SCY — maintained on the team website.
          </p>
        </div>

        <p className="reach">
          Questions about competition? Email <a href="mailto:competition@swimdcac.org">competition@swimdcac.org</a>.
        </p>
      </main>
    </>
  )
}