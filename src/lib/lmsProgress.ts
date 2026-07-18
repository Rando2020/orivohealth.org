import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

const LOCAL_KEY = 'orivo-lms-progress-v1'

export interface LocalLmsState {
  completedLessons: Record<string, boolean>
  quizScores: Record<string, number>
}

function emptyState(): LocalLmsState {
  return { completedLessons: {}, quizScores: {} }
}

function loadLocal(): LocalLmsState {
  if (typeof window === 'undefined') return emptyState()
  try {
    const value = window.localStorage.getItem(LOCAL_KEY)
    if (!value) return emptyState()
    const parsed = JSON.parse(value) as Partial<LocalLmsState>
    return {
      completedLessons: parsed.completedLessons ?? {},
      quizScores: parsed.quizScores ?? {},
    }
  } catch {
    return emptyState()
  }
}

function saveLocal(state: LocalLmsState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
}

export function localLessonKey(courseId: string, lessonId: string) {
  return `${courseId}:${lessonId}`
}

export function getLocalLmsState() {
  return loadLocal()
}

export async function setLessonComplete(user: User | null, courseId: string, lessonId: string, completed = true) {
  const state = loadLocal()
  state.completedLessons[localLessonKey(courseId, lessonId)] = completed
  saveLocal(state)

  if (!supabase || !user) return
  const { error } = await supabase.from('lesson_progress').upsert({
    user_id: user.id,
    course_id: courseId,
    lesson_id: lessonId,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,course_id,lesson_id' })
  if (error) throw new Error('Cloud lesson synchronization failed.')
}

export async function recordQuizAttempt(
  user: User | null,
  courseId: string,
  quizId: string,
  score: number,
  questionIds: string[],
  answers: Record<string, string[]>,
) {
  const state = loadLocal()
  state.quizScores[quizId] = Math.max(state.quizScores[quizId] ?? 0, score)
  saveLocal(state)

  if (!supabase || !user) return
  const { error } = await supabase.from('quiz_attempts').insert({
    user_id: user.id,
    course_id: courseId,
    quiz_id: quizId,
    score,
    passed: score >= 80,
    question_ids: questionIds,
    answers,
  })
  if (error) throw new Error('Cloud quiz synchronization failed.')
}

export async function syncUserProgress(user: User | null) {
  const local = loadLocal()
  if (!supabase || !user) return local

  const localLessons = Object.entries(local.completedLessons)
    .filter(([, completed]) => completed)
    .map(([key]) => {
      const separator = key.indexOf(':')
      return {
        user_id: user.id,
        course_id: key.slice(0, separator),
        lesson_id: key.slice(separator + 1),
        completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    })

  if (localLessons.length > 0) {
    const { error } = await supabase.from('lesson_progress').upsert(localLessons, { onConflict: 'user_id,course_id,lesson_id' })
    if (error) throw new Error('Local lesson progress could not be uploaded.')
  }

  const [{ data: lessonRows, error: lessonError }, { data: quizRows, error: quizError }] = await Promise.all([
    supabase.from('lesson_progress').select('course_id, lesson_id, completed').eq('user_id', user.id),
    supabase.from('quiz_attempts').select('quiz_id, score').eq('user_id', user.id),
  ])
  if (lessonError || quizError) throw new Error('Cloud progress could not be retrieved.')

  for (const row of lessonRows ?? []) {
    local.completedLessons[localLessonKey(row.course_id, row.lesson_id)] = Boolean(row.completed)
  }
  for (const row of quizRows ?? []) {
    local.quizScores[row.quiz_id] = Math.max(local.quizScores[row.quiz_id] ?? 0, row.score)
  }
  saveLocal(local)
  return local
}
