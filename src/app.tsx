import { useEffect } from 'preact/hooks'
import { Router, Route, Switch, useLocation } from 'wouter'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { CompetitionPage } from './pages/CompetitionPage.tsx'
import { SchedulePage } from './pages/SchedulePage.tsx'
import { JoinPage } from './pages/JoinPage.tsx'
import { TrialPage } from './pages/TrialPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { DonatePage } from './pages/DonatePage.tsx'
import { FaqPage } from './pages/FaqPage.tsx'
import { CoachesPage } from './pages/CoachesPage.tsx'
import { RecordsPage } from './pages/RecordsPage.tsx'
import { ScholarshipsPage } from './pages/ScholarshipsPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { metaFor, notFoundMeta, documentTitle } from './pageMeta.ts'
import './app.css'

// Vite injects the deploy base; wouter wants it without the trailing slash,
// and an empty string when the site is served from the domain root.
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '')

/** The prerendered <title> covers the first page; this keeps it right as you navigate. */
function TitleSync() {
  const [path] = useLocation()
  useEffect(() => {
    document.title = documentTitle(metaFor(path) ?? notFoundMeta)
  }, [path])
  return null
}

/** ssrPath is only set when prerendering; in the browser the router reads the real URL. */
export function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <Router base={routerBase} ssrPath={ssrPath}>
      <TitleSync />
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/competition" component={CompetitionPage} />
        <Route path="/schedule" component={SchedulePage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/trial" component={TrialPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/donate" component={DonatePage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/coaches" component={CoachesPage} />
        <Route path="/records" component={RecordsPage} />
        <Route path="/scholarships" component={ScholarshipsPage} />
        {/* no path — matches anything the routes above didn't */}
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  )
}
