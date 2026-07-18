import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppErrorBoundary } from './AppErrorBoundary'

function BrokenComponent(): ReactNode {
  throw new Error('internal secret diagnostic')
}

describe('AppErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  it('shows a safe recovery state without exposing the internal error', () => {
    render(<AppErrorBoundary><BrokenComponent /></AppErrorBoundary>)
    expect(screen.getByRole('alert')).toHaveTextContent('The academy could not finish loading this page.')
    expect(screen.queryByText('internal secret diagnostic')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeVisible()
  })
})
