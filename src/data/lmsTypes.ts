export interface LessonSource {
  label: string
  url: string
  publisher: string
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
}

export type QuizQuestionType = 'single' | 'multiple' | 'true-false'

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  courseId: string
  moduleId: string
  type: QuizQuestionType
  prompt: string
  options: QuizOption[]
  correctOptionIds: string[]
  explanation: string
  sourceLabel?: string
  sourceUrl?: string
  difficulty: 'foundation' | 'application' | 'advanced'
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
