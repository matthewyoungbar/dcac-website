import { Router, Route, Switch } from 'wouter'
import { Header } from './Header'
import { Footer } from './Footer'
import { HomePage } from './HomePage'
import { CompetitionPage } from './CompetitionPage'
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
