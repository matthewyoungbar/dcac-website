import { Router, Route, Switch } from 'wouter'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { CompetitionPage } from './pages/CompetitionPage.tsx'
import './app.css'

export function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/competition" component={CompetitionPage} />
      </Switch>
      <Footer />
    </Router>
  )
}
