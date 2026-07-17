import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  ExternalLink,
  FileOutput,
  FlaskConical,
  LockKeyhole,
  Target,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { VisualFlow } from '../components/VisualFlow'
import { useAuth } from '../context/AuthContext'
import { apiLessons, apiModules } from '../data/apiCourseContent'
import { apiQuestionBank } from '../data/apiQuestionBank'
import { courses } from '../data/catalog'
import { getLocalLmsState, localLessonKey } from '../lib/lmsProgress'

export function CourseDetailPage() {
  const { courseId } = useParams()
  const { user, configured } = useAuth()
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return <section className="section empty-state"><h1>Course not found</h1><Link className="button primary" to="/courses">Return to courses</Link></section>
  }

  const productionCourse = course.id === 'apis-webhooks-integration'
  const state = getLocalLmsState()
  const completed = productionCourse
    ? apiLessons.filter((lesson) => state.completedLessons[localLessonKey(course.id, lesson.id)]).length
    : 0
  const percent = productionCourse ? Math.round((completed / apiLessons.length) * 100) : 0
  const startLesson = apiLessons.find((lesson) => !state.completedLessons[localLessonKey(course.id, lesson.id)]) ?? apiLessons[0]
  const accessLink = configured && !user ? '/account' : `/learn/${course.id}/${startLesson?.id}`

  return (
    <>
      <section className="course-hero">
        <div className="container">
          <Link className="back-link" to="/courses"><ArrowLeft size={17} /> All courses</Link>
          <div className="course-hero-grid">
            <div>
              <div className="course-card-topline course-detail-topline">
                <span className="course-code">{course.code}</span>
                <span className={`priority priority-${course.priority.toLowerCase()}`}>{course.priority}</span>
                {productionCourse && <span className="production-badge">Fully authored</span>}
              </div>
              <span className="eyebrow">{course.category}</span>
              <h1>{course.title}</h1>
              <p className="hero-lede">{course.description}</p>
              <div className="course-detail-meta">
                <span><BookOpen size={18} /> {productionCourse ? apiLessons.length : course.modules.reduce((sum, module) => sum + module.lessons.length, 0)} lessons</span>
                <span><Target size={18} /> {course.difficulty}</span>
                {productionCourse && <span><BadgeCheck size={18} /> {apiQuestionBank.length} quiz questions</span>}
              </div>
              {productionCourse && (
                <div className="hero-actions">
                  <Link className="button primary" to={accessLink} state={!user ? { from: `/learn/${course.id}/${startLesson?.id}` } : undefined}>
                    {configured && !user ? <LockKeyhole size={18} /> : <ArrowRight size={18} />}
                    {completed > 0 ? 'Continue course' : 'Begin course'}
                  </Link>
                  <Link className="button secondary" to={`/quiz/${course.id}/apis-final-assessment`}>View final assessment</Link>
                </div>
              )}
            </div>
            <div className="progress-card">
              <span className="eyebrow">Course status</span>
              <div className="progress-number">{productionCourse ? `${percent}%` : 'Preview'}</div>
              {productionCourse && <div className="progress-track"><div style={{ width: `${percent}%` }} /></div>}
              <p>{productionCourse ? `${completed} of ${apiLessons.length} lessons complete` : 'This course currently has a detailed curriculum outline. Full lesson production follows the API course standard.'}</p>
              <small>{productionCourse ? 'Signed-in learners sync progress across devices. Local demo progress is available before Supabase configuration.' : 'Production sequencing is tracked in the LMS build plan.'}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container course-overview-grid">
          <div>
            <span className="eyebrow">You will be able to</span>
            <div className="outcome-list">
              {course.outcomes.map((outcome) => <div key={outcome}><BadgeCheck size={20} /><span>{outcome}</span></div>)}
            </div>
          </div>
          <div className="resume-bridge-card">
            <BriefcaseBusiness size={24} />
            <span className="eyebrow">Resume bridge</span>
            <p>{course.resumeBridge}</p>
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container"><VisualFlow title={course.visual.title} steps={course.visual.steps} /></div>
      </section>

      <section className="section">
        <div className="container course-content-grid">
          <div>
            <div className="section-heading">
              <span className="eyebrow">Course curriculum</span>
              <h2>{productionCourse ? 'Instruction, scenarios, labs, and assessments' : 'Modules and planned lesson sequence'}</h2>
              <p>{productionCourse ? 'Every lesson contains written instruction, an implementation scenario, a guided lab, answer guidance, credited sources, and completion tracking.' : 'The current outline defines the production scope that will be authored using the same standard as ORI-200.'}</p>
            </div>
            <div className="module-list">
              {(productionCourse ? apiModules : course.modules.map((module, index) => ({ id: `outline-${index}`, title: module.title, order: index + 1, lessons: module.lessons }))).map((module) => (
                <article className="module-card" key={module.id}>
                  <div className="module-number">{String(module.order).padStart(2, '0')}</div>
                  <div className="module-body">
                    <h3>{module.title}</h3>
                    <div className="lesson-link-list">
                      {module.lessons.map((lessonRef, lessonIndex) => {
                        if (!productionCourse) return <div className="outline-lesson" key={lessonRef}><span>{lessonIndex + 1}</span><strong>{lessonRef}</strong></div>
                        const lesson = apiLessons.find((item) => item.id === lessonRef)
                        if (!lesson) return null
                        const done = Boolean(state.completedLessons[localLessonKey(course.id, lesson.id)])
                        return (
                          <Link className={done ? 'lesson-link complete' : 'lesson-link'} to={`/learn/${course.id}/${lesson.id}`} key={lesson.id}>
                            <span>{done ? <BadgeCheck size={17} /> : `${lesson.lessonOrder}`}</span>
                            <div><strong>{lesson.title}</strong><small>{lesson.objective}</small></div>
                            <ArrowRight size={17} />
                          </Link>
                        )
                      })}
                    </div>
                    {productionCourse && <Link className="module-quiz-link" to={`/quiz/${course.id}/apis-${module.id}-quiz`}><Target size={17} /> Module quiz: 10 randomized questions from a 24-question bank</Link>}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="course-sidebar">
            <div className="sidebar-card"><FileOutput size={23} /><span className="eyebrow">Portfolio artifact</span><p>{course.artifact}</p></div>
            <div className="sidebar-card"><Target size={23} /><span className="eyebrow">Capstone</span><p>{course.capstone}</p></div>
            <div className="sidebar-card"><BriefcaseBusiness size={23} /><span className="eyebrow">Interview translation</span><p>{course.interviewTranslation}</p></div>
            {productionCourse && <div className="sidebar-card"><FlaskConical size={23} /><span className="eyebrow">Assessment model</span><p>Eight module quizzes and a 30-question final. Each attempt randomizes questions and option order, requires 80%, allows unlimited retakes, and explains every answer.</p></div>}
            <div className="sidebar-card resource-card">
              <span className="eyebrow">Official resources</span>
              {course.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer"><span><small>{resource.type}</small>{resource.label}</span><ExternalLink size={16} /></a>)}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
