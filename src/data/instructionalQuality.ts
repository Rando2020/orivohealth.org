import type { FullLesson, QuizQuestion } from './lmsTypes'
import type { ProductionCourse, ProductionModule } from './productionCourseRegistry'
import { getSourceById, getSourceByUrl, sourceRegistry } from './sourceRegistry'

export const qualityDimensions = [
  'accuracy',
  'completeness',
  'practicalRelevance',
  'difficultyProgression',
  'lessonIndependence',
  'scenarioRealism',
  'labExecutability',
  'answerGuideQuality',
  'assessmentValidity',
  'sourceQuality',
  'accessibility',
  'interviewRelevance',
  'portfolioValue',
  'contentDuplication',
  'unsupportedClaims',
] as const

export type QualityDimension = typeof qualityDimensions[number]
export type QualityScores = Record<QualityDimension, number>

export interface LessonAudit {
  courseId: string
  moduleId: string
  lessonId: string
  title: string
  scores: QualityScores
  average: number
  findings: string[]
}

export interface ModuleAudit {
  courseId: string
  moduleId: string
  title: string
  lessonCount: number
  average: number
  scores: QualityScores
  priorityFindings: string[]
}

export interface QuestionBankAnalysis {
  courseId: string
  totalQuestions: number
  exactDuplicateIds: string[]
  exactDuplicatePrompts: string[][]
  nearDuplicatePairs: Array<{ left: string; right: string; similarity: number }>
  reusedOptionSets: Array<{ normalizedOptions: string; questionIds: string[] }>
  difficultyDistribution: Record<string, number>
  typeDistribution: Record<string, number>
  cognitiveDistribution: Record<string, number>
  sourceDistribution: Record<string, number>
  moduleDistribution: Record<string, number>
  answerPositionDistribution: Record<string, number>
  applicationOrTroubleshootingPercent: number
  templatedQuestionCount: number
  unregisteredSourceQuestionIds: string[]
}

export interface InstructionalAuditReport {
  generatedAt: string
  lessonsReviewed: number
  modulesReviewed: number
  questionsReviewed: number
  lessonAudits: LessonAudit[]
  moduleAudits: ModuleAudit[]
  questionBanks: QuestionBankAnalysis[]
  sourceRegistry: {
    registered: number
    primarySources: number
    highSensitivitySources: number
  }
}

function clamp(value: number) {
  return Math.max(1, Math.min(5, Math.round(value)))
}

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
}

function words(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean)
}

export function normalizePrompt(value: string) {
  return words(value).join(' ')
}

function jaccard(left: string, right: string) {
  const a = new Set(words(left).filter((word) => word.length > 2))
  const b = new Set(words(right).filter((word) => word.length > 2))
  const intersection = [...a].filter((word) => b.has(word)).length
  const union = new Set([...a, ...b]).size
  return union ? intersection / union : 0
}

function duplicateValues(values: string[]) {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value)
}

function phraseOverlap(lesson: FullLesson) {
  const objective = new Set(words(lesson.objective))
  const takeaways = new Set(words(lesson.keyTakeaways.join(' ')))
  const overlap = [...objective].filter((word) => takeaways.has(word)).length
  return objective.size ? overlap / objective.size : 1
}

function unsupportedClaimRisk(lesson: FullLesson) {
  const text = [lesson.objective, ...lesson.sections.flatMap((section) => section.paragraphs), lesson.scenario.recommendedApproach].join(' ').toLowerCase()
  const riskyClaims = ['guarantees compliance', 'certified compliant', 'officially endorsed', 'always secure', 'zero risk', 'guaranteed production ready']
  return riskyClaims.some((claim) => text.includes(claim))
}

export function auditLesson(lesson: FullLesson): LessonAudit {
  const findings: string[] = []
  const paragraphCount = lesson.sections.reduce((sum, section) => sum + section.paragraphs.length, 0)
  const registeredSources = lesson.sources.filter((source) => source.sourceId ? getSourceById(source.sourceId) : getSourceByUrl(source.url))
  const primaryRatio = lesson.sources.length ? registeredSources.length / lesson.sources.length : 0
  const objectiveWords = words(lesson.objective).length
  const labStrength = Math.min(5, 2 + lesson.lab.steps.length / 2 + lesson.lab.evidence.length / 3)
  const guideStrength = Math.min(5, 2 + lesson.lab.answerGuide.length / 2)
  const overlap = phraseOverlap(lesson)
  const isApplied = /implementation|release|client|payer|pharmacy|member|production|support|incident/i.test(`${lesson.scenario.context} ${lesson.lab.brief}`)
  const hasReview = Boolean(lesson.review?.lastReviewed && lesson.review?.contentVersion && lesson.review?.reviewOwner)

  if (paragraphCount < 3) findings.push('Lesson remains concise and should receive deeper human review before being treated as comprehensive instruction.')
  if (lesson.sources.length === 0) findings.push('No source is attached to the lesson.')
  if (primaryRatio < 1) findings.push('One or more lesson sources are not registered in the central source registry.')
  if (lesson.lab.steps.length < 3) findings.push('Lab has fewer than three executable or reviewable steps.')
  if (lesson.lab.answerGuide.length < 3) findings.push('Answer guide is brief and may not support consistent evaluation.')
  if (overlap > 0.78) findings.push('Takeaways substantially repeat objective language and need more synthesis.')
  if (!hasReview) findings.push('Review metadata is incomplete.')
  if (unsupportedClaimRisk(lesson)) findings.push('Potential unsupported assurance or endorsement language detected.')

  const scores: QualityScores = {
    accuracy: clamp(3 + primaryRatio + (hasReview ? 0.5 : 0)),
    completeness: clamp(2 + paragraphCount / 2 + lesson.sections.length / 3),
    practicalRelevance: clamp(3 + (isApplied ? 1 : 0) + Math.min(1, lesson.lab.steps.length / 4)),
    difficultyProgression: clamp(3 + Math.min(1.5, lesson.moduleOrder / 8)),
    lessonIndependence: clamp(2.5 + paragraphCount / 2 + lesson.keyTakeaways.length / 4),
    scenarioRealism: clamp(2.5 + (isApplied ? 1.5 : 0) + (lesson.scenario.recommendedApproach.length > 75 ? 0.5 : 0)),
    labExecutability: clamp(labStrength),
    answerGuideQuality: clamp(guideStrength),
    assessmentValidity: clamp(3 + (lesson.objective.length > 35 ? 0.5 : 0) + (lesson.lab.steps.length >= 3 ? 0.5 : 0)),
    sourceQuality: clamp(2 + primaryRatio * 2 + (lesson.sources.length > 1 ? 0.5 : 0)),
    accessibility: clamp(4 + (lesson.visual?.caption ? 0.5 : 0)),
    interviewRelevance: clamp(3 + (isApplied ? 1 : 0)),
    portfolioValue: clamp(3 + Math.min(1, lesson.lab.evidence.length / 3)),
    contentDuplication: clamp(overlap > 0.78 ? 2 : overlap > 0.55 ? 3 : 4),
    unsupportedClaims: clamp(unsupportedClaimRisk(lesson) ? 1 : 4 + primaryRatio / 2),
  }

  return {
    courseId: lesson.courseId,
    moduleId: lesson.moduleId,
    lessonId: lesson.id,
    title: lesson.title,
    scores,
    average: Number(average(Object.values(scores)).toFixed(2)),
    findings,
  }
}

export function auditModule(course: ProductionCourse, module: ProductionModule, lessonAudits: LessonAudit[]): ModuleAudit {
  const audits = lessonAudits.filter((audit) => audit.courseId === course.courseId && audit.moduleId === module.id)
  const scores = Object.fromEntries(qualityDimensions.map((dimension) => [dimension, Number(average(audits.map((audit) => audit.scores[dimension])).toFixed(2))])) as QualityScores
  const findings = audits.flatMap((audit) => audit.findings.map((finding) => `${audit.lessonId}: ${finding}`))
  return {
    courseId: course.courseId,
    moduleId: module.id,
    title: module.title,
    lessonCount: audits.length,
    average: Number(average(Object.values(scores)).toFixed(2)),
    scores,
    priorityFindings: findings.slice(0, 5),
  }
}

function countBy(values: string[]) {
  const result: Record<string, number> = {}
  for (const value of values) result[value || 'unclassified'] = (result[value || 'unclassified'] ?? 0) + 1
  return result
}

function duplicatePromptGroups(questions: QuizQuestion[]) {
  const groups = new Map<string, string[]>()
  for (const question of questions) {
    const normalized = normalizePrompt(question.prompt)
    groups.set(normalized, [...(groups.get(normalized) ?? []), question.id])
  }
  return [...groups.values()].filter((ids) => ids.length > 1)
}

function nearDuplicatePairs(questions: QuizQuestion[]) {
  const pairs: Array<{ left: string; right: string; similarity: number }> = []
  for (let left = 0; left < questions.length; left += 1) {
    for (let right = left + 1; right < questions.length; right += 1) {
      if (questions[left].moduleId !== questions[right].moduleId) continue
      const similarity = jaccard(questions[left].prompt, questions[right].prompt)
      if (similarity >= 0.72 && normalizePrompt(questions[left].prompt) !== normalizePrompt(questions[right].prompt)) {
        pairs.push({ left: questions[left].id, right: questions[right].id, similarity: Number(similarity.toFixed(3)) })
      }
    }
  }
  return pairs.sort((a, b) => b.similarity - a.similarity).slice(0, 250)
}

function reusedOptions(questions: QuizQuestion[]) {
  const groups = new Map<string, string[]>()
  for (const question of questions) {
    const key = question.options.map((option) => normalizePrompt(option.text)).sort().join(' | ')
    groups.set(key, [...(groups.get(key) ?? []), question.id])
  }
  return [...groups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([normalizedOptions, questionIds]) => ({ normalizedOptions, questionIds }))
    .sort((a, b) => b.questionIds.length - a.questionIds.length)
    .slice(0, 100)
}

function answerPosition(question: QuizQuestion) {
  return question.correctOptionIds.map((id) => String(question.options.findIndex((option) => option.id === id) + 1)).join(',')
}

export function analyzeQuestionBank(course: ProductionCourse): QuestionBankAnalysis {
  const questions = course.questionBank
  const applied = questions.filter((question) => ['implementation-scenario', 'troubleshooting'].includes(question.cognitiveCategory ?? ''))
  const templated = questions.filter((question) => /which definition best describes|which concept is most directly applied|which statement is a common misconception|which statement is a dangerous misconception/i.test(question.prompt))
  return {
    courseId: course.courseId,
    totalQuestions: questions.length,
    exactDuplicateIds: duplicateValues(questions.map((question) => question.id)),
    exactDuplicatePrompts: duplicatePromptGroups(questions),
    nearDuplicatePairs: nearDuplicatePairs(questions),
    reusedOptionSets: reusedOptions(questions),
    difficultyDistribution: countBy(questions.map((question) => question.difficulty)),
    typeDistribution: countBy(questions.map((question) => question.type)),
    cognitiveDistribution: countBy(questions.map((question) => question.cognitiveCategory ?? 'unclassified')),
    sourceDistribution: countBy(questions.map((question) => question.sourceId ?? question.sourceLabel ?? 'unregistered')),
    moduleDistribution: countBy(questions.map((question) => question.moduleId)),
    answerPositionDistribution: countBy(questions.map(answerPosition)),
    applicationOrTroubleshootingPercent: Number((100 * applied.length / Math.max(1, questions.length)).toFixed(1)),
    templatedQuestionCount: templated.length,
    unregisteredSourceQuestionIds: questions.filter((question) => {
      if (question.sourceId) return !getSourceById(question.sourceId)
      if (question.sourceUrl) return !getSourceByUrl(question.sourceUrl)
      return true
    }).map((question) => question.id),
  }
}

export function buildInstructionalAudit(courses: ProductionCourse[]): InstructionalAuditReport {
  const lessonAudits = courses.flatMap((course) => course.lessons.map(auditLesson))
  const moduleAudits = courses.flatMap((course) => course.modules.map((module) => auditModule(course, module, lessonAudits)))
  return {
    generatedAt: new Date().toISOString(),
    lessonsReviewed: lessonAudits.length,
    modulesReviewed: moduleAudits.length,
    questionsReviewed: courses.reduce((sum, course) => sum + course.questionBank.length, 0),
    lessonAudits,
    moduleAudits,
    questionBanks: courses.map(analyzeQuestionBank),
    sourceRegistry: {
      registered: sourceRegistry.length,
      primarySources: sourceRegistry.filter((source) => source.primary).length,
      highSensitivitySources: sourceRegistry.filter((source) => source.updateSensitivity === 'high').length,
    },
  }
}
