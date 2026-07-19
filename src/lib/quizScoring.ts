import type { QuizQuestion } from '../data/lmsTypes'

export function isQuestionCorrect(question: QuizQuestion, selectedOptionIds: string[] = []) {
  const selected = [...selectedOptionIds].sort()
  const expected = [...question.correctOptionIds].sort()
  return selected.length === expected.length && selected.every((value, index) => value === expected[index])
}

export function scoreQuiz(questions: QuizQuestion[], answers: Record<string, string[]>) {
  if (questions.length === 0) return 0
  const correct = questions.filter((question) => isQuestionCorrect(question, answers[question.id])).length
  return Math.round((correct / questions.length) * 100)
}

export function areAllQuestionsAnswered(questions: QuizQuestion[], answers: Record<string, string[]>) {
  return questions.length > 0 && questions.every((question) => (answers[question.id] ?? []).length > 0)
}
