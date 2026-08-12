import { Router, Route, Switch } from 'wouter'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { CompetitionPage } from './pages/CompetitionPage.tsx'
import { SchedulePage } from './pages/SchedulePage.tsx'
import { JoinPage } from './pages/JoinPage.tsx'
import { TrialPage } from './pages/TrialPage.tsx'
import './app.css'

export function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/competition" component={CompetitionPage} />
        <Route path="/schedule" component={SchedulePage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/trial" component={TrialPage} />
      </Switch>
      <Footer />
    </Router>
  )
}
