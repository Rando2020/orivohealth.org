import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="section empty-state">
      <span className="eyebrow">404</span>
      <h1>This page is not in the curriculum.</h1>
      <p>Return to the academy and choose a learning path.</p>
      <Link className="button primary" to="/">Go home</Link>
    </section>
  )
}
