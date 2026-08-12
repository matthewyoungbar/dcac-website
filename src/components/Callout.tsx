import type { ComponentChildren } from 'preact'
import './Callout.css'

export type CalloutTone = 'blue' | 'purple' | 'neutral'

interface CalloutProps {
  tone?: CalloutTone
  compact?: boolean
  children: ComponentChildren
}

export function Callout({ tone = 'blue', compact, children }: CalloutProps) {
  const className = `callout callout-${tone}${compact ? ' callout-compact' : ''}`
  return <div className={className}>{children}</div>
}