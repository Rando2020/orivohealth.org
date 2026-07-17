import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

const LOCAL_KEY = 'orivo-lms-progress-v1'

export interface LocalLmsState {
  completedLessons: Record<string, boolean>
  quizScores: Record<string, number>
}

function loadLocal(): LocalLmsState {
  try {
    const value = window.localStorage.getItem(LOCAL_KEY)
    return value ? JSON.parse(value) as LocalLmsState : { completedLessons: {}, quizScores: {} }
  } catch {
    return { completedLessons: {}, quizScores: {} }
  }
}

function saveLocal(state: LocalLmsState) {
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
  await supabase.from('lesson_progress').upsert({
    user_id: user.id,
    course_id: courseId,
    lesson_id: lessonId,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,course_id,lesson_id' })
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
  await supabase.from('quiz_attempts').insert({
    user_id: user.id,
    course_id: courseId,
    quiz_id: quizId,
    score,
    passed: score >= 80,
    question_ids: questionIds,
    answers,
  })
}

export async function syncUserProgress(user: User | null) {
  const local = loadLocal()
  if (!supabase || !user) return local

  const [{ data: lessonRows }, { data: quizRows }] = await Promise.all([
    supabase.from('lesson_progress').select('course_id, lesson_id, completed').eq('user_id', user.id),
    supabase.from('quiz_attempts').select('quiz_id, score').eq('user_id', user.id),
  ])

  for (const row of lessonRows ?? []) {
    local.completedLessons[localLessonKey(row.course_id, row.lesson_id)] = Boolean(row.completed)
  }
  for (const row of quizRows ?? []) {
    local.quizScores[row.quiz_id] = Math.max(local.quizScores[row.quiz_id] ?? 0, row.score)
  }
  saveLocal(local)
  return local
}
