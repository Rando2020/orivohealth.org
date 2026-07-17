import { courses, learningPaths } from './catalog'
import { courseGroup6 } from './courses6'

for (const course of courseGroup6) {
  if (!courses.some((item) => item.id === course.id)) courses.push(course)
}

courses.sort((a, b) => a.order - b.order || a.code.localeCompare(b.code))

const technicalProductPath = learningPaths.find((path) => path.id === 'technical-product-leader')
if (technicalProductPath && !technicalProductPath.courseIds.includes('pmp-hybrid-agile-ceremonies')) {
  const agileIndex = technicalProductPath.courseIds.indexOf('modern-agile-product')
  technicalProductPath.courseIds.splice(Math.max(agileIndex + 1, 0), 0, 'pmp-hybrid-agile-ceremonies')
}

const jobLandingPath = learningPaths.find((path) => path.id === 'job-landing-sprint')
if (jobLandingPath && !jobLandingPath.courseIds.includes('pmp-hybrid-agile-ceremonies')) {
  jobLandingPath.courseIds.push('pmp-hybrid-agile-ceremonies')
}
