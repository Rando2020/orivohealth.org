import type { ProductionCourse } from './productionCourseRegistry'

export interface LabManifestEntry {
  courseId: string
  moduleId: string
  lessonId: string
  labTitle: string
  requiredFiles: string[]
  expectedEvidence: string[]
  automatedValidation: boolean
  manualValidationSteps: string[]
  knownLimitations: string[]
}

export function buildLabManifest(courses: ProductionCourse[]): LabManifestEntry[] {
  return courses.flatMap((course) => course.lessons.map((lesson) => {
    const isSql = course.courseId === 'sql-product-implementation'
    return {
      courseId: course.courseId,
      moduleId: lesson.moduleId,
      lessonId: lesson.id,
      labTitle: lesson.lab.title,
      requiredFiles: isSql ? [
        '/downloads/sql-course/01_schema.sql',
        '/downloads/sql-course/02_seed_data.sql',
        '/downloads/sql-course/03_lab_queries.sql',
        '/downloads/sql-course/04_answer_queries.sql',
      ] : [],
      expectedEvidence: lesson.lab.evidence,
      automatedValidation: isSql,
      manualValidationSteps: isSql ? [
        'Create a fresh SQLite database from the schema file.',
        'Load the synthetic seed data.',
        'Run the matching learner prompt and reference answer.',
        'Confirm result grain, control totals, and intentional exceptions.',
      ] : [
        'Review the lab artifact against the stated integration contract.',
        'Validate request, response, error, authentication, retry, and evidence consistency where applicable.',
        'Confirm the artifact contains synthetic data and no usable credentials.',
        'Compare the learner evidence with the answer-guide criteria.',
      ],
      knownLimitations: isSql ? [
        'SQLite is the executable baseline; production SQL dialects may differ.',
        'Some conceptual lessons do not map one-to-one to a single answer query.',
      ] : [
        'API labs are design and evidence exercises rather than calls to a live production service.',
        'Vendor interfaces and exact Postman navigation may change.',
      ],
    }
  }))
}
