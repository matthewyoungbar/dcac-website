import { Link } from 'wouter'
import { useSchedule } from '../useSchedule.ts'
import { ThemeTag } from './ThemeTag.tsx'
import './SchedulePreview.css'

export function SchedulePreview() {
  const { days, loading, error } = useSchedule()

  return (
    <div className="sched">
      <div className="sched-head">
        <span className="lbl">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" />
          </svg>
          This week in the pool
        </span>
        <Link href="/schedule">Full schedule →</Link>
      </div>
      {error ? (
        <p className="sched-msg">Schedule unavailable right now — email us and we'll tell you when we're swimming.</p>
      ) : (
        <ol className={`week${loading ? ' loading' : ''}`}>
          {days.map(d => (
            <li key={d.key} className={`day${d.isToday ? ' today' : ''}${d.practices.length ? '' : ' rest'}`}>
              <div className="day-head">
                <span className="day-name">{d.isToday ? 'Today' : d.name}</span>
                <span className="day-num">{d.date}</span>
              </div>
              {!loading && <ThemeTag theme={d.theme} />}
              {loading ? (
                <span className="day-skel" aria-hidden="true" />
              ) : d.practices.length ? (
                d.practices.map(p => (
                  <div key={p.id} className="practice">
                    <span className="p-time">{p.time}</span>
                    {p.location && <span className="p-loc">{p.location}</span>}
                  </div>
                ))
              ) : (
                <span className="day-off">Rest</span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}