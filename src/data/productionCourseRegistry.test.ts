import { describe, expect, it } from 'vitest'
import { getProductionCourses, getQuizQuestionPool, randomizeQuestions } from './productionCourseRegistry'
import { validateProductionRegistry } from './registryValidation'

const courses = getProductionCourses()

describe('production course registry', () => {
  it('contains API and SQL production courses', () => {
    expect(courses.map((course) => course.courseId)).toEqual(expect.arrayContaining([
      'apis-webhooks-integration',
      'sql-product-implementation',
    ]))
  })

  it('has no structural integrity violations', () => {
    expect(validateProductionRegistry(courses)).toEqual([])
  })

  it('creates the expected module and final quiz pools', () => {
    for (const course of courses) {
      for (const quiz of course.quizDefinitions) {
        const pool = getQuizQuestionPool(course.courseId, quiz)
        expect(pool.length).toBeGreaterThanOrEqual(quiz.questionCount)
        if (quiz.moduleId) expect(pool.every((question) => question.moduleId === quiz.moduleId)).toBe(true)
        else expect(pool).toHaveLength(course.questionBank.length)
      }
    }
  })

  it('randomizes without mutating correct-option references', () => {
    const course = courses[0]
    const selected = randomizeQuestions(course.questionBank, 12)
    expect(selected).toHaveLength(12)
    for (const question of selected) {
      const optionIds = new Set(question.options.map((option) => option.id))
      expect(question.correctOptionIds.every((id) => optionIds.has(id))).toBe(true)
    }
  })
})
