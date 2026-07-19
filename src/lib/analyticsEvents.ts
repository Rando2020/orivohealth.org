export type LearningEventName =
  | 'course_viewed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_started'
  | 'quiz_submitted'
  | 'quiz_passed'
  | 'download_clicked'
  | 'feedback_submitted'

export interface LearningEvent {
  name: LearningEventName
  timestamp: string
  applicationVersion: string
  anonymousSessionId?: string
  courseId?: string
  moduleId?: string
  lessonId?: string
  quizId?: string
  scoreBand?: 'below-50' | '50-69' | '70-79' | '80-89' | '90-100'
  passed?: boolean
}

const allowedKeys = new Set([
  'name',
  'timestamp',
  'applicationVersion',
  'anonymousSessionId',
  'courseId',
  'moduleId',
  'lessonId',
  'quizId',
  'scoreBand',
  'passed',
])

const prohibitedKeyFragments = ['email', 'user_name', 'display_name', 'token', 'answer', 'sql_text', 'feedback_text', 'patient', 'health', 'client_name', 'employer', 'ip_address', 'secret', 'credential']

export function validateLearningEvent(event: LearningEvent) {
  const keys = Object.keys(event)
  const unexpected = keys.filter((key) => !allowedKeys.has(key))
  const prohibited = keys.filter((key) => prohibitedKeyFragments.some((fragment) => key.toLowerCase().includes(fragment)))
  if (unexpected.length) return `Unexpected analytics properties: ${unexpected.join(', ')}`
  if (prohibited.length) return `Prohibited analytics properties: ${prohibited.join(', ')}`
  if (!event.timestamp || Number.isNaN(Date.parse(event.timestamp))) return 'Analytics event timestamp must be an ISO-compatible date.'
  if (!event.applicationVersion) return 'Analytics event must include the application version.'
  return null
}

export function scoreBand(score: number): LearningEvent['scoreBand'] {
  if (score < 50) return 'below-50'
  if (score < 70) return '50-69'
  if (score < 80) return '70-79'
  if (score < 90) return '80-89'
  return '90-100'
}

// No sender is implemented. This contract exists for future first-party analytics review.
