import type { ComponentChildren } from 'preact'
import './Step.css'

interface StepProps {
  number: number
  title: string
  price?: string
  children: ComponentChildren
}

export function Step({ number, title, price, children }: StepProps) {
  return (
    <div className="step">
      <div className="step-head">
        <span className="step-num">{number}</span>
        <h3 className="step-title">{title}</h3>
      </div>
      {price && <span className="step-price">{price}</span>}
      {children}
    </div>
  )
}

export function Steps({ children }: { children: ComponentChildren }) {
  return <div className="steps">{children}</div>
}
