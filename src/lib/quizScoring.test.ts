import { describe, expect, it } from 'vitest'
import type { QuizQuestion } from '../data/lmsTypes'
import { areAllQuestionsAnswered, isQuestionCorrect, scoreQuiz } from './quizScoring'

const questions: QuizQuestion[] = [
  {
    id: 'q1', courseId: 'course', moduleId: 'm1', type: 'single', prompt: 'Single',
    options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], correctOptionIds: ['a'],
    explanation: 'A is correct.', difficulty: 'foundation',
  },
  {
    id: 'q2', courseId: 'course', moduleId: 'm1', type: 'multiple', prompt: 'Multiple',
    options: [{ id: 'c', text: 'C' }, { id: 'd', text: 'D' }, { id: 'e', text: 'E' }], correctOptionIds: ['c', 'd'],
    explanation: 'C and D are required.', difficulty: 'application',
  },
]

describe('quiz scoring', () => {
  it('requires an exact option match for multiple select', () => {
    expect(isQuestionCorrect(questions[1], ['d', 'c'])).toBe(true)
    expect(isQuestionCorrect(questions[1], ['c'])).toBe(false)
    expect(isQuestionCorrect(questions[1], ['c', 'd', 'e'])).toBe(false)
  })

  it('scores complete attempts correctly', () => {
    expect(scoreQuiz(questions, { q1: ['a'], q2: ['c', 'd'] })).toBe(100)
    expect(scoreQuiz(questions, { q1: ['b'], q2: ['c', 'd'] })).toBe(50)
  })

  it('does not divide by zero for an empty pool', () => {
    expect(scoreQuiz([], {})).toBe(0)
    expect(areAllQuestionsAnswered([], {})).toBe(false)
  })

  it('requires every question to have at least one selected option', () => {
    expect(areAllQuestionsAnswered(questions, { q1: ['a'], q2: ['c', 'd'] })).toBe(true)
    expect(areAllQuestionsAnswered(questions, { q1: ['a'] })).toBe(false)
  })
})
