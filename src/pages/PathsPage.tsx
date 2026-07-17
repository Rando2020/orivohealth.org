import { ArrowRight, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { courses, learningPaths } from '../data/catalog'

export function PathsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <SectionHeading
            eyebrow="Role-based learning paths"
            title="Do not finish everything before applying. Close the right gaps in the right order."
            description="Each path creates a coherent body of proof for a specific role family while the interview course runs in parallel."
          />
          <div className="hero-note-card">
            <strong>Recommended default</strong>
            <p>Start with the 12-week Job-Landing Sprint, apply throughout, then deepen the specialization that produces the strongest interview response.</p>
          </div>
        </div>
      </section>
      <section className="section section-tight-top">
        <div className="container path-list">
          {learningPaths.map((path, index) => {
            const pathCourses = path.courseIds.map((id) => courses.find((course) => course.id === id)!).filter(Boolean)
            return (
              <article className="path-detail-card" key={path.id}>
                <div className="path-detail-number">0{index + 1}</div>
                <div className="path-detail-main">
                  <span className="eyebrow">{path.duration}</span>
                  <h2>{path.name}</h2>
                  <strong>{path.tagline}</strong>
                  <p>{path.description}</p>
                  <div className="path-result"><BadgeCheck size={19} /><span>{path.result}</span></div>
                  <Link className="button secondary" to={`/paths/${path.id}`}>
                    Open learning plan <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="path-mini-courses">
                  {pathCourses.map((course, courseIndex) => (
                    <div key={course.id}>
                      <span>{String(courseIndex + 1).padStart(2, '0')}</span>
                      <div><strong>{course.shortTitle}</strong><small>{course.hours} hours</small></div>
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
