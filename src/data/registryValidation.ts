import type { ProductionCourse } from './productionCourseRegistry'

export interface RegistryIssue {
  courseId: string
  code: string
  message: string
}

function duplicates(values: string[]) {
  const seen = new Set<string>()
  const repeated = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) repeated.add(value)
    seen.add(value)
  }
  return [...repeated]
}

export function validateProductionCourse(course: ProductionCourse): RegistryIssue[] {
  const issues: RegistryIssue[] = []
  const moduleIds = new Set(course.modules.map((module) => module.id))
  const lessonIds = new Set(course.lessons.map((lesson) => lesson.id))
  const questionIds = new Set(course.questionBank.map((question) => question.id))
  const quizIds = new Set(course.quizDefinitions.map((quiz) => quiz.id))

  for (const duplicate of duplicates(course.lessons.map((lesson) => lesson.id))) {
    issues.push({ courseId: course.courseId, code: 'DUPLICATE_LESSON_ID', message: `Duplicate lesson ID: ${duplicate}` })
  }
  for (const duplicate of duplicates(course.questionBank.map((question) => question.id))) {
    issues.push({ courseId: course.courseId, code: 'DUPLICATE_QUESTION_ID', message: `Duplicate question ID: ${duplicate}` })
  }
  for (const duplicate of duplicates(course.quizDefinitions.map((quiz) => quiz.id))) {
    issues.push({ courseId: course.courseId, code: 'DUPLICATE_QUIZ_ID', message: `Duplicate quiz ID: ${duplicate}` })
  }

  for (const module of course.modules) {
    if (module.lessons.length === 0) issues.push({ courseId: course.courseId, code: 'EMPTY_MODULE', message: `Module ${module.id} has no lessons.` })
    for (const lessonId of module.lessons) {
      if (!lessonIds.has(lessonId)) issues.push({ courseId: course.courseId, code: 'MISSING_LESSON_REFERENCE', message: `Module ${module.id} references missing lesson ${lessonId}.` })
    }
  }

  for (const lesson of course.lessons) {
    if (!moduleIds.has(lesson.moduleId)) issues.push({ courseId: course.courseId, code: 'LESSON_MISSING_MODULE', message: `Lesson ${lesson.id} references missing module ${lesson.moduleId}.` })
    if (lesson.courseId !== course.courseId) issues.push({ courseId: course.courseId, code: 'LESSON_WRONG_COURSE', message: `Lesson ${lesson.id} has courseId ${lesson.courseId}.` })
    if (!lesson.objective.trim()) issues.push({ courseId: course.courseId, code: 'EMPTY_OBJECTIVE', message: `Lesson ${lesson.id} has no objective.` })
    if (lesson.lab.steps.length === 0 || lesson.lab.evidence.length === 0) issues.push({ courseId: course.courseId, code: 'INCOMPLETE_LAB', message: `Lesson ${lesson.id} has an incomplete lab.` })
  }

  for (const question of course.questionBank) {
    if (!moduleIds.has(question.moduleId)) issues.push({ courseId: course.courseId, code: 'QUESTION_MISSING_MODULE', message: `Question ${question.id} references missing module ${question.moduleId}.` })
    if (question.courseId !== course.courseId) issues.push({ courseId: course.courseId, code: 'QUESTION_WRONG_COURSE', message: `Question ${question.id} has courseId ${question.courseId}.` })
    if (question.correctOptionIds.length === 0) issues.push({ courseId: course.courseId, code: 'NO_CORRECT_OPTION', message: `Question ${question.id} has no correct answer.` })
    const optionIds = new Set(question.options.map((option) => option.id))
    for (const correctOptionId of question.correctOptionIds) {
      if (!optionIds.has(correctOptionId)) issues.push({ courseId: course.courseId, code: 'INVALID_CORRECT_OPTION', message: `Question ${question.id} references missing option ${correctOptionId}.` })
    }
    if (!question.explanation.trim()) issues.push({ courseId: course.courseId, code: 'EMPTY_EXPLANATION', message: `Question ${question.id} has no explanation.` })
  }

  for (const quiz of course.quizDefinitions) {
    if (quiz.courseId !== course.courseId) issues.push({ courseId: course.courseId, code: 'QUIZ_WRONG_COURSE', message: `Quiz ${quiz.id} has courseId ${quiz.courseId}.` })
    if (quiz.moduleId && !moduleIds.has(quiz.moduleId)) issues.push({ courseId: course.courseId, code: 'QUIZ_MISSING_MODULE', message: `Quiz ${quiz.id} references missing module ${quiz.moduleId}.` })
    const pool = quiz.moduleId ? course.questionBank.filter((question) => question.moduleId === quiz.moduleId) : course.questionBank
    if (pool.length === 0) issues.push({ courseId: course.courseId, code: 'EMPTY_QUIZ_POOL', message: `Quiz ${quiz.id} has an empty source pool.` })
    if (quiz.questionCount > pool.length) issues.push({ courseId: course.courseId, code: 'QUIZ_COUNT_EXCEEDS_POOL', message: `Quiz ${quiz.id} requests ${quiz.questionCount} questions from a pool of ${pool.length}.` })
  }

  if (questionIds.size === 0) issues.push({ courseId: course.courseId, code: 'EMPTY_QUESTION_BANK', message: 'Course has no questions.' })
  if (quizIds.size === 0) issues.push({ courseId: course.courseId, code: 'EMPTY_QUIZ_LIST', message: 'Course has no quizzes.' })
  return issues
}

export function validateProductionRegistry(courses: ProductionCourse[]) {
  const issues = courses.flatMap(validateProductionCourse)
  for (const duplicate of duplicates(courses.map((course) => course.courseId))) {
    issues.push({ courseId: duplicate, code: 'DUPLICATE_COURSE_ID', message: `Duplicate production course ID: ${duplicate}` })
  }
  return issues
}
