import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type FeedbackIssueType = 'incorrect_information' | 'confusing_explanation' | 'broken_source' | 'broken_lab' | 'quiz_problem' | 'accessibility_problem' | 'other'

export interface LessonFeedbackDraft {
  rating: number | null
  issueType: FeedbackIssueType | ''
  feedback: string
  updatedAt: string
}

export interface LessonFeedbackRecord extends LessonFeedbackDraft {
  id: string
  courseId: string
  lessonId: string
  reviewStatus: string
  createdAt: string
}

const PREFIX = 'orivo-lesson-feedback-draft-v1'
export const MAX_FEEDBACK_LENGTH = 1500

function key(courseId: string, lessonId: string) {
  return `${PREFIX}:${courseId}:${lessonId}`
}

export function loadFeedbackDraft(courseId: string, lessonId: string): LessonFeedbackDraft {
  try {
    const raw = window.localStorage.getItem(key(courseId, lessonId))
    return raw ? JSON.parse(raw) as LessonFeedbackDraft : { rating: null, issueType: '', feedback: '', updatedAt: new Date().toISOString() }
  } catch {
    return { rating: null, issueType: '', feedback: '', updatedAt: new Date().toISOString() }
  }
}

export function saveFeedbackDraft(courseId: string, lessonId: string, draft: Omit<LessonFeedbackDraft, 'updatedAt'>) {
  const next = { ...draft, feedback: draft.feedback.slice(0, MAX_FEEDBACK_LENGTH), updatedAt: new Date().toISOString() }
  window.localStorage.setItem(key(courseId, lessonId), JSON.stringify(next))
  return next
}

export function clearFeedbackDraft(courseId: string, lessonId: string) {
  window.localStorage.removeItem(key(courseId, lessonId))
}

export function validateFeedback(draft: Pick<LessonFeedbackDraft, 'rating' | 'issueType' | 'feedback'>) {
  if (draft.rating !== null && (draft.rating < 1 || draft.rating > 5)) return 'Rating must be between 1 and 5.'
  if (draft.feedback.trim() && !draft.issueType) return 'Choose an issue type when providing written feedback.'
  if (!draft.feedback.trim() && draft.rating === null) return 'Add a rating or a short description.'
  if (draft.feedback.length > MAX_FEEDBACK_LENGTH) return `Feedback must be ${MAX_FEEDBACK_LENGTH} characters or fewer.`
  return null
}

export async function submitLessonFeedback(user: User | null, courseId: string, lessonId: string, draft: Pick<LessonFeedbackDraft, 'rating' | 'issueType' | 'feedback'>) {
  const validation = validateFeedback(draft)
  if (validation) throw new Error(validation)
  saveFeedbackDraft(courseId, lessonId, draft)
  if (!user || !supabase) return { submitted: false, message: 'Draft saved on this device. Sign in to submit it to Orivo Academy.' }

  const { error } = await supabase.from('lesson_feedback').insert({
    user_id: user.id,
    course_id: courseId,
    lesson_id: lessonId,
    rating: draft.rating,
    issue_type: draft.issueType || 'other',
    feedback: draft.feedback.trim(),
    review_status: 'new',
  })
  if (error) throw new Error('Feedback could not be submitted. Your draft remains saved on this device.')
  clearFeedbackDraft(courseId, lessonId)
  return { submitted: true, message: 'Feedback submitted. Thank you for helping improve the lesson.' }
}

export async function readOwnLessonFeedback(user: User | null, courseId: string, lessonId: string): Promise<LessonFeedbackRecord[]> {
  if (!user || !supabase) return []
  const { data, error } = await supabase
    .from('lesson_feedback')
    .select('id, course_id, lesson_id, rating, issue_type, feedback, review_status, created_at, updated_at')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .eq('lesson_id', lessonId)
    .order('created_at', { ascending: false })
  if (error) throw new Error('Previous feedback could not be loaded.')
  return (data ?? []).map((row) => ({
    id: row.id,
    courseId: row.course_id,
    lessonId: row.lesson_id,
    rating: row.rating,
    issueType: row.issue_type,
    feedback: row.feedback,
    reviewStatus: row.review_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }))
}
