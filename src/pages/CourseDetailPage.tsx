import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  ExternalLink,
  FileOutput,
  FlaskConical,
  Target,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { VisualFlow } from '../components/VisualFlow'
import { courses } from '../data/catalog'
import { lessonKey, loadProgress, saveProgress, type ProgressState } from '../data/progress'

export function CourseDetailPage() {
  const { courseId } = useParams()
  const course = courses.find((item) => item.id === courseId)
  const [progress, setProgress] = useState<ProgressState>({})

  useEffect(() => {
    setProgress(loadProgress())
  }, [courseId])

  const counts = useMemo(() => {
    if (!course) return { total: 0, completed: 0, percent: 0 }
    let total = 0
    let completed = 0
    course.modules.forEach((module, moduleIndex) => {
      module.lessons.forEach((_, lessonIndex) => {
        total += 1
        if (progress[lessonKey(course.id, moduleIndex, lessonIndex)]) completed += 1
      })
    })
    return { total, completed, percent: total ? Math.round((completed / total) * 100) : 0 }
  }, [course, progress])

  if (!course) {
    return (
      <section className="section empty-state">
        <h1>Course not found</h1>
        <Link className="button primary" to="/courses">Return to courses</Link>
      </section>
    )
  }

  const currentIndex = courses.findIndex((item) => item.id === course.id)
  const nextCourse = courses[currentIndex + 1]

  function toggleLesson(key: string) {
    const next = { ...progress, [key]: !progress[key] }
    setProgress(next)
    saveProgress(next)
  }

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
              </div>
              <span className="eyebrow">{course.category}</span>
              <h1>{course.title}</h1>
              <p className="hero-lede">{course.description}</p>
              <div className="course-detail-meta">
                <span><Clock3 size={18} /> {course.hours} hours</span>
                <span><BookOpen size={18} /> {course.modules.length} modules</span>
                <span><Target size={18} /> {course.difficulty}</span>
              </div>
            </div>
            <div className="progress-card">
              <span className="eyebrow">Your progress</span>
              <div className="progress-number">{counts.percent}%</div>
              <div className="progress-track"><div style={{ width: `${counts.percent}%` }} /></div>
              <p>{counts.completed} of {counts.total} lessons completed</p>
              <small>Progress is stored locally in this browser.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container course-overview-grid">
          <div>
            <span className="eyebrow">You will be able to</span>
            <div className="outcome-list">
              {course.outcomes.map((outcome) => (
                <div key={outcome}><BadgeCheck size={20} /><span>{outcome}</span></div>
              ))}
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
        <div className="container">
          <VisualFlow title={course.visual.title} steps={course.visual.steps} />
        </div>
      </section>

      <section className="section">
        <div className="container course-content-grid">
          <div>
            <div className="section-heading">
              <span className="eyebrow">Course curriculum</span>
              <h2>Modules and guided lessons</h2>
              <p>Check lessons off as you complete the concept, demonstration, and practice work.</p>
            </div>
            <div className="module-list">
              {course.modules.map((module, moduleIndex) => (
                <article className="module-card" key={module.title}>
                  <div className="module-number">{String(moduleIndex + 1).padStart(2, '0')}</div>
                  <div className="module-body">
                    <h3>{module.title}</h3>
                    <p>{module.summary}</p>
                    <div className="lesson-list">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const key = lessonKey(course.id, moduleIndex, lessonIndex)
                        const checked = Boolean(progress[key])
                        return (
                          <button
                            type="button"
                            className={checked ? 'lesson-row checked' : 'lesson-row'}
                            key={lesson}
                            onClick={() => toggleLesson(key)}
                          >
                            <span className="check-box">{checked && <Check size={15} />}</span>
                            <span>{lesson}</span>
                          </button>
                        )
                      })}
                    </div>
                    {module.lab && (
                      <div className="lab-callout">
                        <FlaskConical size={19} />
                        <div><strong>Guided lab</strong><span>{module.lab}</span></div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="course-sidebar">
            <div className="sidebar-card">
              <FileOutput size={23} />
              <span className="eyebrow">Portfolio artifact</span>
              <p>{course.artifact}</p>
            </div>
            <div className="sidebar-card">
              <Target size={23} />
              <span className="eyebrow">Capstone</span>
              <p>{course.capstone}</p>
            </div>
            <div className="sidebar-card">
              <BriefcaseBusiness size={23} />
              <span className="eyebrow">Interview translation</span>
              <p>{course.interviewTranslation}</p>
            </div>
            <div className="sidebar-card resource-card">
              <span className="eyebrow">Official resources</span>
              {course.resources.map((resource) => (
                <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
                  <span><small>{resource.type}</small>{resource.label}</span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {nextCourse && (
        <section className="next-course-section">
          <div className="container next-course-inner">
            <div>
              <span className="eyebrow">Next in the full curriculum</span>
              <h2>{nextCourse.title}</h2>
            </div>
            <Link className="button primary" to={`/courses/${nextCourse.id}`}>
              Continue <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
