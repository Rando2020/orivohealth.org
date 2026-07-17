import { ArrowRight, BadgeCheck, BookOpenCheck, RefreshCw, Target } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAuth } from '../context/AuthContext'
import { apiLessons } from '../data/apiCourseContent'
import { apiQuizDefinitions } from '../data/apiQuestionBank'
import { courses } from '../data/catalog'
import { getLocalLmsState, localLessonKey, syncUserProgress, type LocalLmsState } from '../lib/lmsProgress'

export function DashboardPage() {
  const { user, configured } = useAuth()
  const [state, setState] = useState<LocalLmsState>(() => getLocalLmsState())
  const [syncing, setSyncing] = useState(false)

  async function sync() {
    setSyncing(true)
    const next = await syncUserProgress(user)
    setState({ ...next })
    setSyncing(false)
  }

  useEffect(() => { void sync() }, [user?.id])

  const apiStats = useMemo(() => {
    const completedLessons = apiLessons.filter((lesson) => state.completedLessons[localLessonKey(lesson.courseId, lesson.id)]).length
    const passedQuizzes = apiQuizDefinitions.filter((quiz) => (state.quizScores[quiz.id] ?? 0) >= quiz.passingScore).length
    const percent = Math.round((completedLessons / apiLessons.length) * 100)
    const nextLesson = apiLessons.find((lesson) => !state.completedLessons[localLessonKey(lesson.courseId, lesson.id)]) ?? apiLessons[0]
    return { completedLessons, passedQuizzes, percent, nextLesson }
  }, [state])

  const topScores = apiQuizDefinitions
    .map((quiz) => ({ quiz, score: state.quizScores[quiz.id] ?? 0 }))
    .filter((item) => item.score > 0)

  return (
    <>
      <section className="page-hero dashboard-hero">
        <div className="container dashboard-hero-grid">
          <SectionHeading
            eyebrow="My learning dashboard"
            title={user ? `Welcome back, ${user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'learner'}.` : 'Your progress is saved in local demo mode.'}
            description={configured ? 'Signed-in progress is synchronized with the Orivo learner database. Complete lessons, pass assessments, and build portfolio evidence.' : 'Add Supabase environment variables to enable cross-device accounts. Course completion still works locally while the service is being configured.'}
          />
          <div className="dashboard-progress-card">
            <div className="progress-number">{apiStats.percent}%</div>
            <div className="progress-track"><div style={{ width: `${apiStats.percent}%` }} /></div>
            <p>{apiStats.completedLessons} of {apiLessons.length} API course lessons complete</p>
            <button className="reset-button" type="button" onClick={() => void sync()} disabled={syncing}><RefreshCw size={16} /> {syncing ? 'Synchronizing…' : 'Synchronize progress'}</button>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container dashboard-feature-grid">
          <article className="dashboard-feature-card">
            <BookOpenCheck size={28} />
            <span className="eyebrow">Continue learning</span>
            <h2>{apiStats.nextLesson.title}</h2>
            <p>Module {apiStats.nextLesson.moduleOrder}: {apiStats.nextLesson.moduleTitle}</p>
            <Link className="button primary" to={`/learn/apis-webhooks-integration/${apiStats.nextLesson.id}`}>Open next lesson <ArrowRight size={18} /></Link>
          </article>
          <article className="dashboard-feature-card">
            <Target size={28} />
            <span className="eyebrow">Assessment status</span>
            <h2>{apiStats.passedQuizzes} of {apiQuizDefinitions.length} passed</h2>
            <p>Every attempt uses a randomized selection from the 192-question source bank.</p>
            <Link className="button secondary" to="/quiz/apis-webhooks-integration/apis-final-assessment">Take final assessment <ArrowRight size={18} /></Link>
          </article>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div className="split-heading">
            <SectionHeading eyebrow="Quiz history" title="Highest saved scores" description="Retakes are unlimited. The dashboard preserves your highest local score while Supabase stores each signed-in attempt." />
          </div>
          {topScores.length ? (
            <div className="assessment-list">
              {topScores.map(({ quiz, score }) => (
                <Link to={`/quiz/${quiz.courseId}/${quiz.id}`} key={quiz.id}>
                  <div><strong>{quiz.title}</strong><small>{quiz.description}</small></div>
                  <span className={score >= quiz.passingScore ? 'score-pass' : 'score-review'}>{score}%</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-dashboard"><BadgeCheck size={34} /><h2>No assessment attempts yet.</h2><p>Complete Module 1 and take its randomized quiz.</p><Link className="button primary" to="/learn/apis-webhooks-integration/integration-patterns">Begin Module 1</Link></div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Academy roadmap" title={`${courses.length} courses in the curriculum`} description="ORI-200 is the first fully authored production course. The remaining courses are sequenced for the same lesson, visual, lab, quiz, and capstone standard." />
          <div className="dashboard-list">
            {courses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <span className="course-code">{course.code}</span>
                <div><strong>{course.shortTitle}</strong><small>{course.id === 'apis-webhooks-integration' ? 'Fully authored and assessable' : 'Production curriculum defined'}</small></div>
                <div className="dashboard-row-progress"><div style={{ width: course.id === 'apis-webhooks-integration' ? `${apiStats.percent}%` : '0%' }} /></div>
                <span>{course.id === 'apis-webhooks-integration' ? `${apiStats.percent}%` : 'Queued'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
