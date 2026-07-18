import { beforeEach, describe, expect, it } from 'vitest'
import { getLocalLmsState, localLessonKey, recordQuizAttempt, setLessonComplete } from './lmsProgress'

describe('local LMS progress', () => {
  beforeEach(() => window.localStorage.clear())

  it('persists lesson completion and reversal without cloud configuration', async () => {
    await setLessonComplete(null, 'course-a', 'lesson-1', true)
    expect(getLocalLmsState().completedLessons[localLessonKey('course-a', 'lesson-1')]).toBe(true)

    await setLessonComplete(null, 'course-a', 'lesson-1', false)
    expect(getLocalLmsState().completedLessons[localLessonKey('course-a', 'lesson-1')]).toBe(false)
  })

  it('preserves the highest local quiz score', async () => {
    await recordQuizAttempt(null, 'course-a', 'quiz-1', 90, ['q1'], { q1: ['a'] })
    await recordQuizAttempt(null, 'course-a', 'quiz-1', 70, ['q2'], { q2: ['b'] })
    expect(getLocalLmsState().quizScores['quiz-1']).toBe(90)
  })
})
