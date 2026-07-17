import { Link } from 'react-router-dom'

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Orivo Health Academy home">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-copy">
        <strong>ORIVO</strong>
        <small>HEALTH ACADEMY</small>
      </span>
    </Link>
  )
}
