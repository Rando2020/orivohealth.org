import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LessonFeedback } from './LessonFeedback'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null }),
}))

afterEach(() => cleanup())

describe('LessonFeedback', () => {
  beforeEach(() => window.localStorage.clear())

  it('opens without interrupting the lesson and saves a signed-out draft', async () => {
    const user = userEvent.setup()
    render(<LessonFeedback courseId="sql-product-implementation" lessonId="tables-grain" />)
    await user.click(screen.getByRole('button', { name: /report a lesson issue/i }))
    await user.selectOptions(screen.getByLabelText(/issue type/i), 'confusing_explanation')
    await user.type(screen.getByLabelText(/details/i), 'The grain example needs another row-level comparison.')
    await user.click(screen.getByRole('button', { name: /save draft/i }))
    expect(await screen.findByText(/draft saved on this device/i)).toBeInTheDocument()
    expect(window.localStorage.length).toBe(1)
  })

  it('requires an issue type for written feedback', async () => {
    const user = userEvent.setup()
    render(<LessonFeedback courseId="apis-webhooks-integration" lessonId="integration-patterns" />)
    await user.click(screen.getByRole('button', { name: /report a lesson issue/i }))
    await user.type(screen.getByLabelText(/details/i), 'This explanation is unclear.')
    await user.click(screen.getByRole('button', { name: /save draft/i }))
    expect(await screen.findByText(/choose an issue type/i)).toBeInTheDocument()
  })

  it('supports rating-only feedback', async () => {
    const user = userEvent.setup()
    render(<LessonFeedback courseId="apis-webhooks-integration" lessonId="sync-async" />)
    await user.click(screen.getByRole('button', { name: /report a lesson issue/i }))
    await user.click(screen.getByRole('button', { name: /5 star rating/i }))
    await user.click(screen.getByRole('button', { name: /save draft/i }))
    expect(await screen.findByText(/draft saved on this device/i)).toBeInTheDocument()
  })
})
