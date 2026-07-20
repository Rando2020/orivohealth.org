import type { CognitiveCategory, QuizPromptTable, QuizQuestion, QuizQuestionType } from './lmsTypes'
import { getSourceById } from './sourceRegistry'

export interface DeploymentQuestionSeed {
  category: CognitiveCategory
  prompt: string
  correct: string[]
  distractors: string[]
  explanation: string
  sourceId: string
  type?: QuizQuestionType
  code?: string
  table?: QuizPromptTable
}

function makeSeed(category: CognitiveCategory, prompt: string, correct: string | string[], distractors: string[], explanation: string, sourceId: string, extras: Partial<Pick<DeploymentQuestionSeed, 'type' | 'code' | 'table'>> = {}): DeploymentQuestionSeed {
  return {
    category,
    prompt,
    correct: Array.isArray(correct) ? correct : [correct],
    distractors,
    explanation,
    sourceId,
    type: Array.isArray(correct) ? 'multiple' : 'single',
    ...extras,
  }
}

export const foundation = (prompt: string, correct: string | string[], distractors: string[], explanation: string, sourceId: string, extras?: Partial<Pick<DeploymentQuestionSeed, 'type' | 'code' | 'table'>>) => makeSeed('foundation', prompt, correct, distractors, explanation, sourceId, extras)
export const technical = (prompt: string, correct: string | string[], distractors: string[], explanation: string, sourceId: string, extras?: Partial<Pick<DeploymentQuestionSeed, 'type' | 'code' | 'table'>>) => makeSeed('technical-interpretation', prompt, correct, distractors, explanation, sourceId, extras)
export const scenario = (prompt: string, correct: string | string[], distractors: string[], explanation: string, sourceId: string, extras?: Partial<Pick<DeploymentQuestionSeed, 'type' | 'code' | 'table'>>) => makeSeed('implementation-scenario', prompt, correct, distractors, explanation, sourceId, extras)
export const troubleshoot = (prompt: string, correct: string | string[], distractors: string[], explanation: string, sourceId: string, extras?: Partial<Pick<DeploymentQuestionSeed, 'type' | 'code' | 'table'>>) => makeSeed('troubleshooting', prompt, correct, distractors, explanation, sourceId, extras)
export const risk = (prompt: string, correct: string | string[], distractors: string[], explanation: string, sourceId: string, extras?: Partial<Pick<DeploymentQuestionSeed, 'type' | 'code' | 'table'>>) => makeSeed('risk-governance', prompt, correct, distractors, explanation, sourceId, extras)

function rotate<T>(items: T[], shift: number) {
  if (!items.length) return items
  const normalized = shift % items.length
  return [...items.slice(normalized), ...items.slice(0, normalized)]
}

export function buildDeploymentModuleQuestions(moduleId: string, seeds: DeploymentQuestionSeed[]): QuizQuestion[] {
  if (seeds.length !== 30) throw new Error(`Deployment module ${moduleId} must contain exactly 30 question seeds; received ${seeds.length}.`)
  return seeds.map((seed, index) => {
    const questionId = `dep-${moduleId}-q${String(index + 1).padStart(2, '0')}`
    const rawOptions = [
      ...seed.correct.map((text, correctIndex) => ({ text, correct: true, token: `c${correctIndex + 1}` })),
      ...seed.distractors.map((text, distractorIndex) => ({ text, correct: false, token: `d${distractorIndex + 1}` })),
    ]
    const rotated = rotate(rawOptions, index % rawOptions.length)
    const options = rotated.map((option, optionIndex) => ({ id: `${questionId}-o${optionIndex + 1}`, text: option.text }))
    const correctOptionIds = rotated.flatMap((option, optionIndex) => option.correct ? [options[optionIndex].id] : [])
    const source = getSourceById(seed.sourceId)
    if (!source) throw new Error(`Question ${questionId} references missing source ${seed.sourceId}`)
    const difficulty = seed.category === 'foundation' ? 'foundation' : seed.category === 'technical-interpretation' || seed.category === 'implementation-scenario' ? 'application' : 'advanced'
    return {
      id: questionId,
      courseId: 'systems-deployment-foundations',
      moduleId,
      type: seed.type ?? (seed.correct.length > 1 ? 'multiple' : 'single'),
      prompt: seed.prompt,
      code: seed.code,
      table: seed.table,
      options,
      correctOptionIds,
      explanation: seed.explanation,
      sourceId: seed.sourceId,
      sourceLabel: source.title,
      sourceUrl: source.url,
      difficulty,
      cognitiveCategory: seed.category,
      qualityNote: 'Hand-authored for ORI-100 with balanced cognitive coverage and stored answer-position rotation.',
    }
  })
}
