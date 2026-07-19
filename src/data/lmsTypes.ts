export interface ReviewMetadata {
  contentVersion: string
  lastReviewed: string
  reviewOwner: string
  reviewStatus: 'reviewed' | 'needs-review' | 'blocked'
  sourceVersion?: string
  knownLimitations: string[]
}

export interface LessonSource {
  label: string
  url: string
  publisher: string
  sourceId?: string
}

export interface LessonVisual {
  title: string
  caption: string
  steps: Array<{ label: string; detail: string }>
  sourceLabel: string
  sourceUrl: string
}

export interface LessonSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  code?: string
}

export interface LessonLab {
  title: string
  brief: string
  steps: string[]
  evidence: string[]
  answerGuide: string[]
}

export interface FullLesson {
  id: string
  courseId: string
  moduleId: string
  moduleTitle: string
  moduleOrder: number
  lessonOrder: number
  title: string
  objective: string
  sections: LessonSection[]
  visual?: LessonVisual
  scenario: {
    title: string
    context: string
    decision: string
    recommendedApproach: string
  }
  lab: LessonLab
  keyTakeaways: string[]
  sources: LessonSource[]
  review?: ReviewMetadata
}

export type QuizQuestionType = 'single' | 'multiple' | 'true-false'
export type CognitiveCategory = 'foundation' | 'technical-interpretation' | 'implementation-scenario' | 'troubleshooting' | 'risk-governance'

export interface QuizOption {
  id: string
  text: string
}

export interface QuizPromptTable {
  headers: string[]
  rows: string[][]
}

export interface QuizQuestion {
  id: string
  courseId: string
  moduleId: string
  type: QuizQuestionType
  prompt: string
  code?: string
  table?: QuizPromptTable
  options: QuizOption[]
  correctOptionIds: string[]
  explanation: string
  sourceLabel?: string
  sourceUrl?: string
  sourceId?: string
  difficulty: 'foundation' | 'application' | 'advanced'
  cognitiveCategory?: CognitiveCategory
  qualityNote?: string
}

export interface QuizDefinition {
  id: string
  courseId: string
  moduleId?: string
  title: string
  description: string
  questionCount: number
  passingScore: number
}
