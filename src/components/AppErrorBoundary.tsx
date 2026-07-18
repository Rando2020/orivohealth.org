import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { failed: boolean }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Orivo Academy rendering error', { name: error.name, componentStack: info.componentStack })
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="fatal-error" role="alert">
        <span className="eyebrow">Something went wrong</span>
        <h1>The academy could not finish loading this page.</h1>
        <p>Your saved local progress has not been deleted. Reload the page, or return to the course catalog.</p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => window.location.reload()}>Reload page</button>
          <a className="button secondary" href="/courses">Return to courses</a>
        </div>
      </main>
    )
  }
}
