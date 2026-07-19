import { ArrowLeft, ArrowRight, BadgeCheck, Download, ExternalLink, FlaskConical, Lightbulb, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CreditedVisual } from '../components/CreditedVisual'
import { LessonFeedback } from '../components/LessonFeedback'
import { useAuth } from '../context/AuthContext'
import type { FullLesson, QuizDefinition } from '../data/lmsTypes'
import { getProductionCourse, getProductionLesson } from '../data/productionCourseRegistry'
import { getLocalLmsState, localLessonKey, setLessonComplete } from '../lib/lmsProgress'

interface LessonNavigation {
  previous?: FullLesson
  next?: FullLesson
  moduleQuiz?: QuizDefinition
  finalQuiz?: QuizDefinition
}

export function LessonPage() {
  const { courseId, lessonId } = useParams()
  const { user } = useAuth()
  const course = getProductionCourse(courseId)
  const lesson = getProductionLesson(courseId, lessonId)
  const [completed, setCompleted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setCompleted(lesson ? Boolean(getLocalLmsState().completedLessons[localLessonKey(lesson.courseId, lesson.id)]) : false)
    setMessage('')
  }, [lesson?.courseId, lesson?.id])

  const navigation = useMemo<LessonNavigation>(() => {
    if (!lesson || !course) return {}
    const index = course.lessons.findIndex((item) => item.id === lesson.id)
    const module = course.modules.find((item) => item.id === lesson.moduleId)
    const moduleQuiz = course.quizDefinitions.find((quiz) => quiz.moduleId === lesson.moduleId)
    const finalQuiz = course.quizDefinitions.find((quiz) => !quiz.moduleId)
    return {
      previous: course.lessons[index - 1],
      next: course.lessons[index + 1],
      moduleQuiz: module?.lessons.at(-1) === lesson.id ? moduleQuiz : undefined,
      finalQuiz,
    }
  }, [course, lesson])

  if (!lesson || !course) {
    return <section className="section empty-state"><span className="eyebrow">Unavailable lesson</span><h1>Lesson not found</h1><p>The lesson ID may be outdated or the course may not be published.</p><Link className="button primary" to="/courses">Return to courses</Link></section>
  }

  const activeLesson = lesson
  async function completeLesson() {
    const next = !completed
    setSaving(true)
    setMessage('')
    try {
      await setLessonComplete(user, activeLesson.courseId, activeLesson.id, next)
      setCompleted(next)
      setMessage(next ? 'Lesson completion saved.' : 'Lesson marked incomplete.')
    } catch {
      setMessage('Progress was saved locally, but cloud synchronization failed. Try synchronizing from the dashboard later.')
    } finally {
      setSaving(false)
    }
  }

  return <>
    <section className="lesson-hero"><div className="container lesson-hero-grid"><div><Link className="back-link" to={`/courses/${activeLesson.courseId}`}><ArrowLeft size={17} aria-hidden="true" /> Course overview</Link><span className="eyebrow">Module {activeLesson.moduleOrder}: {activeLesson.moduleTitle}</span><h1>{activeLesson.title}</h1><p>{activeLesson.objective}</p></div><div className="lesson-completion-card"><span className="eyebrow">Lesson evidence</span><p>Complete the instruction, scenario, and guided lab before marking the lesson complete.</p><button className={completed ? 'button secondary completed-button' : 'button primary'} type="button" disabled={saving} onClick={() => void completeLesson()}><BadgeCheck size={18} aria-hidden="true" /> {saving ? 'Saving…' : completed ? 'Completed' : 'Mark lesson complete'}</button>{message && <p className={message.includes('failed') ? 'status-message error' : 'status-message success'} role="status" aria-live="polite">{message}</p>}</div></div></section>
    <section className="lesson-layout container"><article className="lesson-article">{activeLesson.sections.map((section) => <section className="lesson-section" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.code && <pre><code>{section.code}</code></pre>}</section>)}{activeLesson.visual && <CreditedVisual visual={activeLesson.visual} />}<section className="scenario-block"><div className="scenario-icon"><Lightbulb aria-hidden="true" /></div><div><span className="eyebrow">Decision scenario</span><h2>{activeLesson.scenario.title}</h2><p>{activeLesson.scenario.context}</p><strong>{activeLesson.scenario.decision}</strong><div className="recommended-answer"><ShieldCheck size={19} aria-hidden="true" /><p>{activeLesson.scenario.recommendedApproach}</p></div></div></section><section className="lab-panel"><div className="lab-panel-header"><FlaskConical aria-hidden="true" /><div><span className="eyebrow">Guided lab</span><h2>{activeLesson.lab.title}</h2></div></div><p>{activeLesson.lab.brief}</p><div className="lab-columns"><div><h3>Instructions</h3><ol>{activeLesson.lab.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div><h3>Required evidence</h3><ul>{activeLesson.lab.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div></div><details><summary>Open answer guide</summary><ul>{activeLesson.lab.answerGuide.map((item) => <li key={item}>{item}</li>)}</ul></details></section><section className="takeaway-panel"><span className="eyebrow">Key takeaways</span>{activeLesson.keyTakeaways.map((takeaway) => <div key={takeaway}><BadgeCheck size={18} aria-hidden="true" /><span>{takeaway}</span></div>)}</section>{course.downloads && <section className="download-panel"><span className="eyebrow">Course downloads</span><h2>Practice files</h2>{course.downloads.map((download) => <a href={download.url} download key={download.url}><Download size={18} aria-hidden="true" /><div><strong>{download.label}</strong><p>{download.description}</p></div></a>)}</section>}<section className="lesson-review-metadata" aria-label="Content review metadata"><span>Content version {activeLesson.review?.contentVersion ?? 'unreviewed'}</span><span>Reviewed {activeLesson.review?.lastReviewed ?? 'pending'}</span><span>{activeLesson.review?.reviewStatus === 'reviewed' ? 'Quality review completed' : 'Review pending'}</span></section><LessonFeedback courseId={activeLesson.courseId} lessonId={activeLesson.id} /></article><aside className="lesson-sidebar"><div className="sidebar-card sticky-card"><span className="eyebrow">Module navigation</span>{course.modules.map((module) => <div className={module.id === activeLesson.moduleId ? 'module-nav active' : 'module-nav'} key={module.id}><strong>{module.order}. {module.title}</strong>{module.id === activeLesson.moduleId && module.lessons.map((id) => { const item = getProductionLesson(course.courseId, id); return item ? <Link aria-current={item.id === activeLesson.id ? 'page' : undefined} className={item.id === activeLesson.id ? 'active' : ''} to={`/learn/${activeLesson.courseId}/${item.id}`} key={item.id}>{item.lessonOrder}. {item.title}</Link> : null })}</div>)}</div><div className="sidebar-card resource-card"><span className="eyebrow">Credited sources</span>{activeLesson.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span><small>{source.publisher}</small>{source.label}</span><ExternalLink size={16} aria-hidden="true" /></a>)}</div></aside></section>
    <section className="lesson-navigation"><div className="container lesson-navigation-inner">{navigation.previous ? <Link className="button secondary" to={`/learn/${activeLesson.courseId}/${navigation.previous.id}`}><ArrowLeft size={18} aria-hidden="true" /> Previous lesson</Link> : <span />}{navigation.moduleQuiz ? <Link className="button primary" to={`/quiz/${activeLesson.courseId}/${navigation.moduleQuiz.id}`}>Take module quiz <ArrowRight size={18} aria-hidden="true" /></Link> : navigation.next ? <Link className="button primary" to={`/learn/${activeLesson.courseId}/${navigation.next.id}`}>Next lesson <ArrowRight size={18} aria-hidden="true" /></Link> : navigation.finalQuiz ? <Link className="button primary" to={`/quiz/${activeLesson.courseId}/${navigation.finalQuiz.id}`}>Final assessment <ArrowRight size={18} aria-hidden="true" /></Link> : null}</div></section>
  </>
}
