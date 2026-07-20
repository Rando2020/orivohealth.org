import type { QuizDefinition } from './lmsTypes'
import { buildDeploymentModuleQuestions } from './deploymentQuestionTypes'
import { deploymentQuestionSeeds1 } from './deploymentQuestions1'
import { deploymentQuestionSeeds2 } from './deploymentQuestions2'
import { deploymentQuestionSeeds3 } from './deploymentQuestions3'

const deploymentQuestionSeeds = {
  ...deploymentQuestionSeeds1,
  ...deploymentQuestionSeeds2,
  ...deploymentQuestionSeeds3,
}

export const deploymentQuestionBank = Object.entries(deploymentQuestionSeeds).flatMap(([moduleId, seeds]) =>
  buildDeploymentModuleQuestions(moduleId, seeds),
)

export const deploymentQuizDefinitions: QuizDefinition[] = [
  ...Array.from({ length: 12 }, (_, index) => {
    const moduleNumber = index + 1
    return {
      id: `deployment-m${moduleNumber}-quiz`,
      courseId: 'systems-deployment-foundations',
      moduleId: `m${moduleNumber}`,
      title: `Deployment Foundations Module ${moduleNumber} assessment`,
      description: 'A randomized 12-question assessment drawn from a reviewed 30-question module bank.',
      questionCount: 12,
      passingScore: 80,
    }
  }),
  {
    id: 'deployment-final-assessment',
    courseId: 'systems-deployment-foundations',
    title: 'Systems, Environments, and Deployment Foundations final assessment',
    description: 'A randomized 40-question final assessment drawn from 360 reviewed questions across the course.',
    questionCount: 40,
    passingScore: 80,
  },
]
