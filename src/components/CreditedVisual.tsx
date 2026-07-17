import { ExternalLink } from 'lucide-react'
import type { LessonVisual } from '../data/lmsTypes'

export function CreditedVisual({ visual }: { visual: LessonVisual }) {
  return (
    <figure className="credited-visual">
      <figcaption>
        <span className="eyebrow">Visual model</span>
        <h2>{visual.title}</h2>
        <p>{visual.caption}</p>
      </figcaption>
      <div className="credited-visual-flow">
        {visual.steps.map((step, index) => (
          <div className="credited-step-wrap" key={`${step.label}-${index}`}>
            <div className="credited-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{step.label}</strong><p>{step.detail}</p></div>
            </div>
            {index < visual.steps.length - 1 && <div className="credited-connector" />}
          </div>
        ))}
      </div>
      <a href={visual.sourceUrl} target="_blank" rel="noreferrer">
        Adapted from {visual.sourceLabel} <ExternalLink size={14} />
      </a>
    </figure>
  )
}
