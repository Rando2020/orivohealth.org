interface VisualFlowProps {
  title: string
  steps: string[]
  compact?: boolean
}

export function VisualFlow({ title, steps, compact = false }: VisualFlowProps) {
  return (
    <div className={compact ? 'visual-flow compact' : 'visual-flow'}>
      <span className="eyebrow">Visual architecture</span>
      <h3>{title}</h3>
      <div className="flow-steps">
        {steps.map((step, index) => (
          <div className="flow-step-wrap" key={step}>
            <div className="flow-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
            {index < steps.length - 1 && <div className="flow-line" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  )
}
