export type Difficulty = 'Foundation' | 'Intermediate' | 'Advanced'
export type Category =
  | 'Engineering fluency'
  | 'Data and analytics'
  | 'Healthcare interoperability'
  | 'Product and delivery'
  | 'Career acceleration'

export interface ResourceLink {
  label: string
  url: string
  type: 'Official documentation' | 'Official tutorial' | 'Video channel' | 'Assessment' | 'Standard'
}

export interface CourseModule {
  title: string
  summary: string
  lessons: string[]
  lab?: string
}

export interface Course {
  id: string
  order: number
  code: string
  title: string
  shortTitle: string
  description: string
  category: Category
  difficulty: Difficulty
  hours: number
  priority: 'Critical' | 'High' | 'Supporting'
  audience: string[]
  outcomes: string[]
  modules: CourseModule[]
  capstone: string
  artifact: string
  interviewTranslation: string
  visual: {
    title: string
    steps: string[]
  }
  resources: ResourceLink[]
  resumeBridge: string
}

export const m = (title: string, summary: string, lessons: string[], lab?: string): CourseModule => ({
  title,
  summary,
  lessons,
  lab,
})
