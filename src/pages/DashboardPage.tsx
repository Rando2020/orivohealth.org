import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CourseCard } from '../components/CourseCard'
import { SectionHeading } from '../components/SectionHeading'
import { courses } from '../data/catalog'
import { lessonKey, loadProgress, saveProgress, type ProgressState } from '../data/progress'

function getCourseStats(courseId: string, progress: ProgressState) {
  const course = courses.find((item) => item.id === courseId)
  if (!course) return { completed: 0, total: 0, percent: 0 }
  let completed = 0
  let total = 0
  course.modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((_, lessonIndex) => {
      total += 1
      if (progress[lessonKey(course.id, moduleIndex, lessonIndex)]) completed += 1
    })
  })
  return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 }
}

export function DashboardPage() {
  const [progress, setProgress] = useState<ProgressState>({})

  useEffect(() => setProgress(loadProgress()), [])

  const stats = useMemo(() => {
    const courseStats = courses.map((course) => ({ course, ...getCourseStats(course.id, progress) }))
    const total = courseStats.reduce((sum, item) => sum + item.total, 0)
    const completed = courseStats.reduce((sum, item) => sum + item.completed, 0)
    return {
      courseStats,
      total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
      active: courseStats.filter((item) => item.completed > 0 && item.percent < 100),
      done: courseStats.filter((item) => item.percent === 100),
    }
  }, [progress])

  function reset() {
    const shouldReset = window.confirm('Reset all locally stored course progress?')
    if (!shouldReset) return
    setProgress({})
    saveProgress({})
  }

  return (
    <>
      <section className="page-hero dashboard-hero">
        <div className="container dashboard-hero-grid">
          <SectionHeading
            eyebrow="My progress"
            title="Build momentum without turning learning into another avoidance project."
            description="Complete the smallest useful artifact, use it in an interview, then deepen the skill based on the feedback you receive."
          />
          <div className="dashboard-progress-card">
            <div className="progress-number">{stats.percent}%</div>
            <div className="progress-track"><div style={{ width: `${stats.percent}%` }} /></div>
            <p>{stats.completed} of {stats.total} lessons complete</p>
            <button className="reset-button" type="button" onClick={reset}><RotateCcw size={16} /> Reset progress</button>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container">
          {stats.active.length > 0 ? (
            <>
              <div className="split-heading">
                <SectionHeading eyebrow="Continue learning" title="Pick up where you stopped." />
                <Link className="text-link" to="/courses">All courses <ArrowRight size={17} /></Link>
              </div>
              <div className="course-grid">
                {stats.active.map(({ course, percent }) => <CourseCard key={course.id} course={course} progress={percent} />)}
              </div>
            </>
          ) : (
            <div className="empty-dashboard">
              <CheckCircle2 size={34} />
              <h2>No active course yet.</h2>
              <p>Start with APIs and webhooks, then complete the Postman lab before moving on.</p>
              <Link className="button primary" to="/courses/apis-webhooks-integration">Start the API course <ArrowRight size={18} /></Link>
            </div>
          )}
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <SectionHeading
            eyebrow="Curriculum map"
            title="Every course at a glance."
            description={`${stats.done.length} courses completed. Progress is stored only in this browser.`}
          />
          <div className="dashboard-list">
            {stats.courseStats.map(({ course, completed, total, percent }) => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <span className="course-code">{course.code}</span>
                <div><strong>{course.shortTitle}</strong><small>{completed}/{total} lessons</small></div>
                <div className="dashboard-row-progress"><div style={{ width: `${percent}%` }} /></div>
                <span>{percent}%</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
