import type { Theme } from '../useSchedule.ts'
import './ThemeTag.css'

interface ThemeTagProps {
  theme: Theme | null
  /** 'dot' is for cramped spots (phone cells) where the label won't fit. */
  variant?: 'inline' | 'pill' | 'dot'
}

export function ThemeTag({ theme, variant = 'inline' }: ThemeTagProps) {
  if (!theme) return null

  return (
    <span className={`th th-${variant} th-${theme.id}`} title={theme.label}>
      <span className="th-dot" aria-hidden="true" />
      {variant !== 'dot' && <span className="th-label">{theme.short}</span>}
    </span>
  )
}