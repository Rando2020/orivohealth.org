import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course } from '../data/catalog'

interface CourseCardProps {
  course: Course
  progress?: number
}

export function CourseCard({ course, progress = 0 }: CourseCardProps) {
  return (
    <article className="course-card">
      <div className="course-card-topline">
        <span className="course-code">{course.code}</span>
        <span className={`priority priority-${course.priority.toLowerCase()}`}>{course.priority}</span>
      </div>
      <div>
        <span className="eyebrow">{course.category}</span>
        <h3>{course.shortTitle}</h3>
        <p>{course.description}</p>
      </div>
      <div className="course-meta">
        <span>
          <Clock3 size={16} /> {course.hours} hours
        </span>
        <span>{course.difficulty}</span>
        <span>{course.modules.length} modules</span>
      </div>
      {progress > 0 && (
        <div className="mini-progress" aria-label={`${progress}% complete`}>
          <div style={{ width: `${progress}%` }} />
        </div>
      )}
      <Link className="text-link" to={`/courses/${course.id}`}>
        View course <ArrowRight size={17} />
      </Link>
    </article>
  )
}
