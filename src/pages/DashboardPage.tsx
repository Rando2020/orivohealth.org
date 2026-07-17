import { ArrowRight, BadgeCheck, BookOpenCheck, RefreshCw, Target } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAuth } from '../context/AuthContext'
import { courses } from '../data/catalog'
import { getProductionCourses } from '../data/productionCourseRegistry'
import { getLocalLmsState, localLessonKey, syncUserProgress, type LocalLmsState } from '../lib/lmsProgress'

export function DashboardPage() {
  const { user, configured } = useAuth()
  const [state, setState] = useState<LocalLmsState>(() => getLocalLmsState())
  const [syncing, setSyncing] = useState(false)
  const productionCourses = getProductionCourses()

  async function sync() {
    setSyncing(true)
    const next = await syncUserProgress(user)
    setState({ ...next })
    setSyncing(false)
  }
  useEffect(() => { void sync() }, [user?.id])

  const stats = useMemo(() => productionCourses.map((production) => {
    const completedLessons = production.lessons.filter((lesson) => state.completedLessons[localLessonKey(production.courseId, lesson.id)]).length
    const passedQuizzes = production.quizDefinitions.filter((quiz) => (state.quizScores[quiz.id] ?? 0) >= quiz.passingScore).length
    const percent = Math.round((completedLessons / production.lessons.length) * 100)
    const nextLesson = production.lessons.find((lesson) => !state.completedLessons[localLessonKey(production.courseId, lesson.id)]) ?? production.lessons[0]
    const finalQuiz = production.quizDefinitions.find((quiz) => !quiz.moduleId)
    return { production, completedLessons, passedQuizzes, percent, nextLesson, finalQuiz }
  }), [state])

  const overallLessons = stats.reduce((sum, item) => sum + item.production.lessons.length, 0)
  const overallCompleted = stats.reduce((sum, item) => sum + item.completedLessons, 0)
  const overallPercent = Math.round((overallCompleted / overallLessons) * 100)
  const continueCourse = stats.find((item) => item.completedLessons > 0 && item.percent < 100) ?? stats.find((item) => item.percent < 100) ?? stats[0]
  const allScores = productionCourses.flatMap((production) => production.quizDefinitions.map((quiz) => ({ quiz, score: state.quizScores[quiz.id] ?? 0 }))).filter((item) => item.score > 0)

  return <>
    <section className="page-hero dashboard-hero"><div className="container dashboard-hero-grid"><SectionHeading eyebrow="My learning dashboard" title={user ? `Welcome back, ${user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'learner'}.` : 'Your progress is saved in local demo mode.'} description={configured ? 'Signed-in progress synchronizes across production courses, quizzes, and devices.' : 'Add Supabase environment variables to enable cross-device accounts. Local course tracking remains active.'} /><div className="dashboard-progress-card"><div className="progress-number">{overallPercent}%</div><div className="progress-track"><div style={{ width: `${overallPercent}%` }} /></div><p>{overallCompleted} of {overallLessons} production lessons complete</p><button className="reset-button" type="button" onClick={() => void sync()} disabled={syncing}><RefreshCw size={16} /> {syncing ? 'Synchronizing…' : 'Synchronize progress'}</button></div></div></section>

    {continueCourse && <section className="section section-tight-top"><div className="container dashboard-feature-grid"><article className="dashboard-feature-card"><BookOpenCheck size={28} /><span className="eyebrow">Continue learning</span><h2>{continueCourse.nextLesson.title}</h2><p>{continueCourse.nextLesson.moduleTitle}</p><Link className="button primary" to={`/learn/${continueCourse.production.courseId}/${continueCourse.nextLesson.id}`}>Open next lesson <ArrowRight size={18} /></Link></article><article className="dashboard-feature-card"><Target size={28} /><span className="eyebrow">Assessment status</span><h2>{continueCourse.passedQuizzes} of {continueCourse.production.quizDefinitions.length} passed</h2><p>{continueCourse.production.questionBank.length} source questions support randomized attempts in this course.</p>{continueCourse.finalQuiz && <Link className="button secondary" to={`/quiz/${continueCourse.production.courseId}/${continueCourse.finalQuiz.id}`}>Take final assessment <ArrowRight size={18} /></Link>}</article></div></section>}

    <section className="section section-tinted"><div className="container"><SectionHeading eyebrow="Production courses" title="Track each fully authored learning path" description="Courses are registered through a reusable LMS registry rather than hard-coded page logic." /><div className="production-course-grid">{stats.map(({ production, completedLessons, passedQuizzes, percent, nextLesson }) => { const metadata = courses.find((course) => course.id === production.courseId); return <article className="dashboard-feature-card" key={production.courseId}><span className="course-code">{metadata?.code}</span><h2>{metadata?.shortTitle}</h2><div className="progress-track"><div style={{ width: `${percent}%` }} /></div><p>{completedLessons}/{production.lessons.length} lessons · {passedQuizzes}/{production.quizDefinitions.length} assessments passed</p><Link className="text-link" to={`/learn/${production.courseId}/${nextLesson.id}`}>Continue course <ArrowRight size={17} /></Link></article> })}</div></div></section>

    <section className="section"><div className="container"><SectionHeading eyebrow="Quiz history" title="Highest saved scores" description="Retakes are unlimited. Supabase stores signed-in attempts while the dashboard preserves highest local scores." />{allScores.length ? <div className="assessment-list">{allScores.map(({ quiz, score }) => <Link to={`/quiz/${quiz.courseId}/${quiz.id}`} key={quiz.id}><div><strong>{quiz.title}</strong><small>{quiz.description}</small></div><span className={score >= quiz.passingScore ? 'score-pass' : 'score-review'}>{score}%</span></Link>)}</div> : <div className="empty-dashboard"><BadgeCheck size={34} /><h2>No assessment attempts yet.</h2><p>Complete a first module and take its randomized quiz.</p></div>}</div></section>

    <section className="section section-tinted"><div className="container"><SectionHeading eyebrow="Academy roadmap" title={`${courses.length} courses in the curriculum`} description={`${productionCourses.length} courses are fully authored and assessable. Remaining courses retain production-ready outlines.`} /><div className="dashboard-list">{courses.map((course) => { const item = stats.find((entry) => entry.production.courseId === course.id); return <Link to={`/courses/${course.id}`} key={course.id}><span className="course-code">{course.code}</span><div><strong>{course.shortTitle}</strong><small>{item ? 'Fully authored and assessable' : 'Production curriculum defined'}</small></div><div className="dashboard-row-progress"><div style={{ width: item ? `${item.percent}%` : '0%' }} /></div><span>{item ? `${item.percent}%` : 'Queued'}</span></Link> })}</div></div></section>
  </>
}
