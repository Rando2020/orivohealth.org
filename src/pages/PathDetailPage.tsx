import { ArrowLeft, ArrowRight, BadgeCheck, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CourseCard } from '../components/CourseCard'
import { courses, learningPaths } from '../data/catalog'

export function PathDetailPage() {
  const { pathId } = useParams()
  const path = learningPaths.find((item) => item.id === pathId)

  if (!path) {
    return (
      <section className="section empty-state">
        <h1>Learning path not found</h1>
        <Link className="button primary" to="/paths">Return to paths</Link>
      </section>
    )
  }

  const pathCourses = path.courseIds.map((id) => courses.find((course) => course.id === id)!).filter(Boolean)
  const totalHours = pathCourses.reduce((sum, course) => sum + course.hours, 0)

  return (
    <>
      <section className="course-hero path-hero">
        <div className="container">
          <Link className="back-link" to="/paths"><ArrowLeft size={17} /> All learning paths</Link>
          <div className="path-hero-grid">
            <div>
              <span className="eyebrow">{path.duration}</span>
              <h1>{path.name}</h1>
              <h2>{path.tagline}</h2>
              <p className="hero-lede">{path.description}</p>
              <div className="path-result large"><BadgeCheck size={21} /><span>{path.result}</span></div>
            </div>
            <div className="path-summary-card">
              <div><strong>{pathCourses.length}</strong><span>courses</span></div>
              <div><strong>{totalHours}</strong><span>guided hours</span></div>
              <div><strong>1</strong><span>integrated portfolio</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Recommended sequence</span>
            <h2>Move from credibility gaps to role proof.</h2>
            <p>Interview preparation should run alongside the technical coursework, not after it.</p>
          </div>
          <div className="path-timeline">
            {pathCourses.map((course, index) => (
              <article key={course.id}>
                <div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div>
                <div className="timeline-line" />
                <div className="timeline-content">
                  <div>
                    <span className="course-code">{course.code}</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className="course-meta"><span><Clock3 size={16} /> {course.hours} hours</span><span>{course.modules.length} modules</span></div>
                  </div>
                  <Link className="text-link" to={`/courses/${course.id}`}>Open course <ArrowRight size={17} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Courses in this path</span>
            <h2>Everything you will build.</h2>
          </div>
          <div className="course-grid">
            {pathCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>
    </>
  )
}
