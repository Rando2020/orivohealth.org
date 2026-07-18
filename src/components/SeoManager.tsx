import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { courses } from '../data/catalog'
import { getProductionLesson, getProductionQuiz } from '../data/productionCourseRegistry'

const defaultDescription = 'Practical technical fluency for healthcare product, implementation, data, analytics, and governance leaders.'

function setMeta(selector: string, attribute: 'content' | 'href', value: string) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

export function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const segments = location.pathname.split('/').filter(Boolean)
    let title = 'Orivo Health Academy'
    let description = defaultDescription

    if (segments[0] === 'courses' && segments[1]) {
      const course = courses.find((item) => item.id === segments[1])
      if (course) {
        title = `${course.title} | Orivo Health Academy`
        description = course.description
      }
    } else if (segments[0] === 'learn' && segments[1] && segments[2]) {
      const lesson = getProductionLesson(segments[1], segments[2])
      if (lesson) {
        title = `${lesson.title} | Orivo Health Academy`
        description = lesson.objective
      }
    } else if (segments[0] === 'quiz' && segments[1] && segments[2]) {
      const quiz = getProductionQuiz(segments[1], segments[2])
      if (quiz) {
        title = `${quiz.title} | Orivo Health Academy`
        description = quiz.description
      }
    } else if (segments[0] === 'courses') title = 'Courses | Orivo Health Academy'
    else if (segments[0] === 'paths') title = 'Learning Paths | Orivo Health Academy'
    else if (segments[0] === 'dashboard') title = 'My Progress | Orivo Health Academy'
    else if (segments[0] === 'account') title = 'Learner Account | Orivo Health Academy'

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', `https://orivohealth.org${location.pathname}`)
    setMeta('link[rel="canonical"]', 'href', `https://orivohealth.org${location.pathname}`)
  }, [location.pathname])

  return null
}
