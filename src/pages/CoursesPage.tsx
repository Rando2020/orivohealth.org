import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CourseCard } from '../components/CourseCard'
import { SectionHeading } from '../components/SectionHeading'
import { categoryOrder, courses, type Category } from '../data/catalog'
import { lessonKey, loadProgress } from '../data/progress'

const allCategories = ['All', ...categoryOrder] as const

function courseProgress(courseId: string): number {
  const course = courses.find((item) => item.id === courseId)
  if (!course) return 0
  const progress = loadProgress()
  let completed = 0
  let total = 0
  course.modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((_, lessonIndex) => {
      total += 1
      if (progress[lessonKey(course.id, moduleIndex, lessonIndex)]) completed += 1
    })
  })
  return total ? Math.round((completed / total) * 100) : 0
}

export function CoursesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | Category>('All')
  const [difficulty, setDifficulty] = useState('All')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesQuery =
        !normalized ||
        course.title.toLowerCase().includes(normalized) ||
        course.description.toLowerCase().includes(normalized) ||
        course.outcomes.some((outcome) => outcome.toLowerCase().includes(normalized))
      const matchesCategory = category === 'All' || course.category === category
      const matchesDifficulty = difficulty === 'All' || course.difficulty === difficulty
      return matchesQuery && matchesCategory && matchesDifficulty
    })
  }, [query, category, difficulty])

  return (
    <>
      <section className="page-hero compact-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Full curriculum"
            title="Technical fluency, implementation proof, and interview translation."
            description="Move in order for a full academy experience, or filter by the role-specific gap you need to close now."
          />
        </div>
      </section>
      <section className="section section-tight-top">
        <div className="container">
          <div className="filter-panel">
            <label className="search-field">
              <Search size={19} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search SQL, FHIR, Adobe, deployment..."
              />
            </label>
            <div className="select-wrap">
              <SlidersHorizontal size={18} />
              <select value={category} onChange={(event) => setCategory(event.target.value as 'All' | Category)}>
                {allCategories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              {['All', 'Foundation', 'Intermediate', 'Advanced'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="results-line">
            <span>{filtered.length} courses</span>
            <span>Recommended: APIs → SQL → healthcare or Adobe specialization</span>
          </div>
          <div className="course-grid">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} progress={courseProgress(course.id)} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
