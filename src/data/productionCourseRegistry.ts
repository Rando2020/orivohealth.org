import { apiLessons, apiModules } from './apiCourseContent'
import { apiQuestionBank, apiQuizDefinitions } from './apiQuestionBank'
import { curatedApiQuestions, curatedSqlQuestions } from './curatedQualityQuestions'
import type { FullLesson, QuizDefinition, QuizQuestion, ReviewMetadata } from './lmsTypes'
import { enhanceApiLessons, enhanceQuestions, enhanceSqlLessons, reviewMetadata } from './qualityEnhancements'
import { sqlCapstone, sqlLessons, sqlModules } from './sqlCourseContent'
import { sqlQuestionBank, sqlQuizDefinitions } from './sqlQuestionBank'

export interface ProductionModule {
  id: string
  title: string
  order: number
  lessons: string[]
}

export interface ProductionCourse {
  courseId: string
  status: 'production' | 'preview'
  lessons: FullLesson[]
  modules: ProductionModule[]
  questionBank: QuizQuestion[]
  quizDefinitions: QuizDefinition[]
  capstone: {
    title: string
    description: string
    artifacts: string[]
  }
  downloads?: Array<{ label: string; url: string; description: string }>
  review: ReviewMetadata
}

const reviewedApiLessons = enhanceApiLessons(apiLessons)
const reviewedSqlLessons = enhanceSqlLessons(sqlLessons)
const reviewedApiQuestions = enhanceQuestions([...apiQuestionBank, ...curatedApiQuestions])
const reviewedSqlQuestions = enhanceQuestions([...sqlQuestionBank, ...curatedSqlQuestions])

function reviewedQuizDefinitions(definitions: QuizDefinition[], questions: QuizQuestion[]) {
  return definitions.map((quiz) => {
    const pool = quiz.moduleId ? questions.filter((question) => question.moduleId === quiz.moduleId) : questions
    return {
      ...quiz,
      description: quiz.moduleId
        ? `A randomized ${quiz.questionCount}-question assessment drawn from a ${pool.length}-question reviewed module bank.`
        : `A randomized ${quiz.questionCount}-question final assessment drawn from ${pool.length} reviewed questions across the course.`,
    }
  })
}

const apiCourse: ProductionCourse = {
  courseId: 'apis-webhooks-integration',
  status: 'production',
  lessons: reviewedApiLessons,
  modules: apiModules,
  questionBank: reviewedApiQuestions,
  quizDefinitions: reviewedQuizDefinitions(apiQuizDefinitions, reviewedApiQuestions),
  capstone: {
    title: 'Pharmacy Onboarding API Implementation',
    description: 'Design, test, secure, document, and operationalize a synthetic pharmacy onboarding API and webhook workflow.',
    artifacts: ['OpenAPI document', 'Postman collection', 'Webhook runbook', 'Error catalog', 'Test evidence', 'Client implementation guide'],
  },
  review: reviewMetadata('2.1.0', ['Postman and GitHub user interfaces may change.', 'The course teaches implementation fluency and does not confer vendor certification or compliance approval.'], 'RFC 9110, OpenAPI 3.2.0, RFC 9700, OWASP API Security 2023'),
}

const sqlCourse: ProductionCourse = {
  courseId: 'sql-product-implementation',
  status: 'production',
  lessons: reviewedSqlLessons,
  modules: sqlModules,
  questionBank: reviewedSqlQuestions,
  quizDefinitions: reviewedQuizDefinitions(sqlQuizDefinitions, reviewedSqlQuestions),
  capstone: sqlCapstone,
  downloads: [
    { label: '01 Schema creation', url: '/downloads/sql-course/01_schema.sql', description: 'SQLite-compatible schema for the synthetic healthcare implementation database.' },
    { label: '02 Synthetic seed data', url: '/downloads/sql-course/02_seed_data.sql', description: 'Generated clients, payers, pharmacies, members, releases, claims, defects, and intentional quality issues.' },
    { label: '03 Learner lab queries', url: '/downloads/sql-course/03_lab_queries.sql', description: 'Progressive implementation and validation exercises.' },
    { label: '04 Answer queries', url: '/downloads/sql-course/04_answer_queries.sql', description: 'Reference solutions with control and certification patterns.' },
  ],
  review: reviewMetadata('2.1.0', ['SQL behavior differs by engine.', 'SQLite is the executable learner baseline.', 'Snowflake and Informatica interface details require periodic review.'], 'PostgreSQL current, SQLite current, Snowflake current documentation'),
}

const registry = new Map<string, ProductionCourse>([
  [apiCourse.courseId, apiCourse],
  [sqlCourse.courseId, sqlCourse],
])

export function getProductionCourse(courseId?: string) {
  return courseId ? registry.get(courseId) : undefined
}

export function getProductionCourses() {
  return [...registry.values()]
}

export function getProductionLesson(courseId?: string, lessonId?: string) {
  return getProductionCourse(courseId)?.lessons.find((lesson) => lesson.id === lessonId)
}

export function getProductionQuiz(courseId?: string, quizId?: string) {
  return getProductionCourse(courseId)?.quizDefinitions.find((quiz) => quiz.id === quizId)
}

export function getQuizQuestionPool(courseId: string, quiz: QuizDefinition) {
  const course = getProductionCourse(courseId)
  if (!course) return []
  return quiz.moduleId ? course.questionBank.filter((question) => question.moduleId === quiz.moduleId) : course.questionBank
}

export function randomizeQuestions(pool: QuizQuestion[], count: number) {
  const shuffled = [...pool]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((question) => ({
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5),
  }))
}
