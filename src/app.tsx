import { Router, Route, Switch } from 'wouter'
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
import './app.css'

// Vite injects the deploy base; wouter wants it without the trailing slash,
// and an empty string when the site is served from the domain root.
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '')

export function App() {
  return (
    <Router base={routerBase}>
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
      </Switch>
      <Footer />
    </Router>
  )
}
