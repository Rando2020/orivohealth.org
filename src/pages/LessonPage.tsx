import { ArrowLeft, ArrowRight, BadgeCheck, Download, ExternalLink, FlaskConical, Lightbulb, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CreditedVisual } from '../components/CreditedVisual'
import { useAuth } from '../context/AuthContext'
import { getProductionCourse, getProductionLesson } from '../data/productionCourseRegistry'
import { getLocalLmsState, localLessonKey, setLessonComplete } from '../lib/lmsProgress'

export function LessonPage() {
  const { courseId, lessonId } = useParams()
  const { user } = useAuth()
  const course = getProductionCourse(courseId)
  const lesson = getProductionLesson(courseId, lessonId)
  const [completed, setCompleted] = useState(() => lesson ? Boolean(getLocalLmsState().completedLessons[localLessonKey(lesson.courseId, lesson.id)]) : false)

  const navigation = useMemo(() => {
    if (!lesson || !course) return { previous: undefined, next: undefined, moduleQuiz: undefined, finalQuiz: undefined }
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
    return <section className="section empty-state"><h1>Lesson not found</h1><Link className="button primary" to="/courses">Return to courses</Link></section>
  }

  const activeLesson = lesson
  async function completeLesson() {
    const next = !completed
    setCompleted(next)
    await setLessonComplete(user, activeLesson.courseId, activeLesson.id, next)
  }

  return (
    <>
      <section className="lesson-hero">
        <div className="container lesson-hero-grid">
          <div>
            <Link className="back-link" to={`/courses/${activeLesson.courseId}`}><ArrowLeft size={17} /> Course overview</Link>
            <span className="eyebrow">Module {activeLesson.moduleOrder}: {activeLesson.moduleTitle}</span>
            <h1>{activeLesson.title}</h1>
            <p>{activeLesson.objective}</p>
          </div>
          <div className="lesson-completion-card">
            <span className="eyebrow">Lesson evidence</span>
            <p>Complete the instruction, scenario, and guided lab before marking the lesson complete.</p>
            <button className={completed ? 'button secondary completed-button' : 'button primary'} type="button" onClick={() => void completeLesson()}><BadgeCheck size={18} /> {completed ? 'Completed' : 'Mark lesson complete'}</button>
          </div>
        </div>
      </section>

      <section className="lesson-layout container">
        <article className="lesson-article">
          {activeLesson.sections.map((section) => <section className="lesson-section" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.code && <pre><code>{section.code}</code></pre>}</section>)}
          {activeLesson.visual && <CreditedVisual visual={activeLesson.visual} />}
          <section className="scenario-block"><div className="scenario-icon"><Lightbulb /></div><div><span className="eyebrow">Decision scenario</span><h2>{activeLesson.scenario.title}</h2><p>{activeLesson.scenario.context}</p><strong>{activeLesson.scenario.decision}</strong><div className="recommended-answer"><ShieldCheck size={19} /><p>{activeLesson.scenario.recommendedApproach}</p></div></div></section>
          <section className="lab-panel"><div className="lab-panel-header"><FlaskConical /><div><span className="eyebrow">Guided lab</span><h2>{activeLesson.lab.title}</h2></div></div><p>{activeLesson.lab.brief}</p><div className="lab-columns"><div><h3>Instructions</h3><ol>{activeLesson.lab.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div><h3>Required evidence</h3><ul>{activeLesson.lab.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div></div><details><summary>Open answer guide</summary><ul>{activeLesson.lab.answerGuide.map((item) => <li key={item}>{item}</li>)}</ul></details></section>
          <section className="takeaway-panel"><span className="eyebrow">Key takeaways</span>{activeLesson.keyTakeaways.map((takeaway) => <div key={takeaway}><BadgeCheck size={18} /><span>{takeaway}</span></div>)}</section>
          {course.downloads && <section className="download-panel"><span className="eyebrow">Course downloads</span><h2>Practice files</h2>{course.downloads.map((download) => <a href={download.url} download key={download.url}><Download size={18} /><div><strong>{download.label}</strong><p>{download.description}</p></div></a>)}</section>}
        </article>

        <aside className="lesson-sidebar">
          <div className="sidebar-card sticky-card"><span className="eyebrow">Module navigation</span>{course.modules.map((module) => <div className={module.id === activeLesson.moduleId ? 'module-nav active' : 'module-nav'} key={module.id}><strong>{module.order}. {module.title}</strong>{module.id === activeLesson.moduleId && module.lessons.map((id) => { const item = getProductionLesson(course.courseId, id); return item ? <Link className={item.id === activeLesson.id ? 'active' : ''} to={`/learn/${activeLesson.courseId}/${item.id}`} key={item.id}>{item.lessonOrder}. {item.title}</Link> : null })}</div>)}</div>
          <div className="sidebar-card resource-card"><span className="eyebrow">Credited sources</span>{activeLesson.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span><small>{source.publisher}</small>{source.label}</span><ExternalLink size={16} /></a>)}</div>
        </aside>
      </section>

      <section className="lesson-navigation"><div className="container lesson-navigation-inner">{navigation.previous ? <Link className="button secondary" to={`/learn/${activeLesson.courseId}/${navigation.previous.id}`}><ArrowLeft size={18} /> Previous lesson</Link> : <span />}{navigation.moduleQuiz ? <Link className="button primary" to={`/quiz/${activeLesson.courseId}/${navigation.moduleQuiz.id}`}>Take module quiz <ArrowRight size={18} /></Link> : navigation.next ? <Link className="button primary" to={`/learn/${activeLesson.courseId}/${navigation.next.id}`}>Next lesson <ArrowRight size={18} /></Link> : navigation.finalQuiz ? <Link className="button primary" to={`/quiz/${activeLesson.courseId}/${navigation.finalQuiz.id}`}>Final assessment <ArrowRight size={18} /></Link> : null}</div></section>
    </>
  )
}
