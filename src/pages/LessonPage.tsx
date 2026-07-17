import { ArrowLeft, ArrowRight, BadgeCheck, ExternalLink, FlaskConical, Lightbulb, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CreditedVisual } from '../components/CreditedVisual'
import { useAuth } from '../context/AuthContext'
import { apiLessons, apiModules, getApiLesson } from '../data/apiCourseContent'
import { getLocalLmsState, localLessonKey, setLessonComplete } from '../lib/lmsProgress'

export function LessonPage() {
  const { courseId, lessonId } = useParams()
  const { user } = useAuth()
  const lesson = courseId === 'apis-webhooks-integration' && lessonId ? getApiLesson(lessonId) : undefined
  const [completed, setCompleted] = useState(() => lesson ? Boolean(getLocalLmsState().completedLessons[localLessonKey(lesson.courseId, lesson.id)]) : false)

  const navigation = useMemo(() => {
    if (!lesson) return { previous: undefined, next: undefined, moduleQuiz: undefined }
    const index = apiLessons.findIndex((item) => item.id === lesson.id)
    const module = apiModules.find((item) => item.id === lesson.moduleId)
    const isLastInModule = module?.lessons.at(-1) === lesson.id
    return {
      previous: apiLessons[index - 1],
      next: apiLessons[index + 1],
      moduleQuiz: isLastInModule ? `apis-${lesson.moduleId}-quiz` : undefined,
    }
  }, [lesson])

  if (!lesson) {
    return <section className="section empty-state"><h1>Lesson not found</h1><Link className="button primary" to="/courses">Return to courses</Link></section>
  }

  async function completeLesson() {
    const next = !completed
    setCompleted(next)
    await setLessonComplete(user, lesson.courseId, lesson.id, next)
  }

  return (
    <>
      <section className="lesson-hero">
        <div className="container lesson-hero-grid">
          <div>
            <Link className="back-link" to={`/courses/${lesson.courseId}`}><ArrowLeft size={17} /> Course overview</Link>
            <span className="eyebrow">Module {lesson.moduleOrder}: {lesson.moduleTitle}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.objective}</p>
          </div>
          <div className="lesson-completion-card">
            <span className="eyebrow">Lesson evidence</span>
            <p>Complete the instruction, scenario, and guided lab before marking the lesson complete.</p>
            <button className={completed ? 'button secondary completed-button' : 'button primary'} type="button" onClick={() => void completeLesson()}>
              <BadgeCheck size={18} /> {completed ? 'Completed' : 'Mark lesson complete'}
            </button>
          </div>
        </div>
      </section>

      <section className="lesson-layout container">
        <article className="lesson-article">
          {lesson.sections.map((section) => (
            <section className="lesson-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.code && <pre><code>{section.code}</code></pre>}
            </section>
          ))}

          {lesson.visual && <CreditedVisual visual={lesson.visual} />}

          <section className="scenario-block">
            <div className="scenario-icon"><Lightbulb /></div>
            <div>
              <span className="eyebrow">Decision scenario</span>
              <h2>{lesson.scenario.title}</h2>
              <p>{lesson.scenario.context}</p>
              <strong>{lesson.scenario.decision}</strong>
              <div className="recommended-answer"><ShieldCheck size={19} /><p>{lesson.scenario.recommendedApproach}</p></div>
            </div>
          </section>

          <section className="lab-panel">
            <div className="lab-panel-header"><FlaskConical /><div><span className="eyebrow">Guided lab</span><h2>{lesson.lab.title}</h2></div></div>
            <p>{lesson.lab.brief}</p>
            <div className="lab-columns">
              <div><h3>Instructions</h3><ol>{lesson.lab.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
              <div><h3>Required evidence</h3><ul>{lesson.lab.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <details><summary>Open answer guide</summary><ul>{lesson.lab.answerGuide.map((item) => <li key={item}>{item}</li>)}</ul></details>
          </section>

          <section className="takeaway-panel">
            <span className="eyebrow">Key takeaways</span>
            {lesson.keyTakeaways.map((takeaway) => <div key={takeaway}><BadgeCheck size={18} /><span>{takeaway}</span></div>)}
          </section>
        </article>

        <aside className="lesson-sidebar">
          <div className="sidebar-card sticky-card">
            <span className="eyebrow">Module navigation</span>
            {apiModules.map((module) => (
              <div className={module.id === lesson.moduleId ? 'module-nav active' : 'module-nav'} key={module.id}>
                <strong>{module.order}. {module.title}</strong>
                {module.id === lesson.moduleId && module.lessons.map((id) => {
                  const item = getApiLesson(id)
                  return item ? <Link className={item.id === lesson.id ? 'active' : ''} to={`/learn/${lesson.courseId}/${item.id}`} key={item.id}>{item.lessonOrder}. {item.title}</Link> : null
                })}
              </div>
            ))}
          </div>
          <div className="sidebar-card resource-card">
            <span className="eyebrow">Credited sources</span>
            {lesson.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span><small>{source.publisher}</small>{source.label}</span><ExternalLink size={16} /></a>)}
          </div>
        </aside>
      </section>

      <section className="lesson-navigation">
        <div className="container lesson-navigation-inner">
          {navigation.previous ? <Link className="button secondary" to={`/learn/${lesson.courseId}/${navigation.previous.id}`}><ArrowLeft size={18} /> Previous lesson</Link> : <span />}
          {navigation.moduleQuiz ? (
            <Link className="button primary" to={`/quiz/${lesson.courseId}/${navigation.moduleQuiz}`}>Take module quiz <ArrowRight size={18} /></Link>
          ) : navigation.next ? (
            <Link className="button primary" to={`/learn/${lesson.courseId}/${navigation.next.id}`}>Next lesson <ArrowRight size={18} /></Link>
          ) : (
            <Link className="button primary" to={`/quiz/${lesson.courseId}/apis-final-assessment`}>Final assessment <ArrowRight size={18} /></Link>
          )}
        </div>
      </section>
    </>
  )
}
