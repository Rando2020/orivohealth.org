export type ProgressState = Record<string, boolean>

const STORAGE_KEY = 'orivo-academy-progress-v1'

export function loadProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressState) : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress: ProgressState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function lessonKey(courseId: string, moduleIndex: number, lessonIndex: number): string {
  return `${courseId}:${moduleIndex}:${lessonIndex}`
}
