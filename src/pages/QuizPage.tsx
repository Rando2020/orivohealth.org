import { ArrowLeft, BadgeCheck, CircleAlert, ExternalLink, RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { QuizQuestion } from '../data/lmsTypes'
import { getProductionQuiz, getQuizQuestionPool, randomizeQuestions } from '../data/productionCourseRegistry'
import { areAllQuestionsAnswered, scoreQuiz } from '../lib/quizScoring'
import { recordQuizAttempt } from '../lib/lmsProgress'

export function QuizPage() {
  const { courseId, quizId } = useParams()
  const { user } = useAuth()
  const definition = getProductionQuiz(courseId, quizId)
  const pool = definition && courseId ? getQuizQuestionPool(courseId, definition) : []
  const [attempt, setAttempt] = useState(1)
  const questions = useMemo(() => definition ? randomizeQuestions(pool, definition.questionCount) : [], [definition, attempt])
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setAttempt(1)
    setMessage('')
  }, [definition?.id])

  if (!definition || !courseId) {
    return <section className="section empty-state"><span className="eyebrow">Unavailable assessment</span><h1>Quiz not found</h1><p>The assessment ID may be outdated or the course may not be published.</p><Link className="button primary" to="/courses">Return to courses</Link></section>
  }
  if (pool.length === 0 || questions.length === 0) {
    return <section className="section empty-state" role="alert"><span className="eyebrow">Assessment unavailable</span><h1>This quiz does not have a valid question pool.</h1><p>The curriculum team has been notified through automated validation. Continue with the course while the assessment is repaired.</p><Link className="button primary" to={`/courses/${definition.courseId}`}>Return to course</Link></section>
  }

  const activeDefinition = definition
  function select(question: QuizQuestion, optionId: string) {
    if (submitted) return
    setAnswers((current) => {
      if (question.type === 'multiple') {
        const selected = current[question.id] ?? []
        return { ...current, [question.id]: selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId] }
      }
      return { ...current, [question.id]: [optionId] }
    })
  }

  async function submit() {
    if (!areAllQuestionsAnswered(questions, answers)) return
    const calculated = scoreQuiz(questions, answers)
    setScore(calculated)
    setSubmitted(true)
    setSaving(true)
    setMessage('')
    try {
      await recordQuizAttempt(user, activeDefinition.courseId, activeDefinition.id, calculated, questions.map((question) => question.id), answers)
      setMessage('Assessment result saved.')
    } catch {
      setMessage('Your score was saved locally, but cloud synchronization failed. Try synchronizing from the dashboard later.')
    } finally {
      setSaving(false)
    }
  }

  function retake() {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setMessage('')
    setAttempt((value) => value + 1)
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length
  const allAnswered = areAllQuestionsAnswered(questions, answers)
  const passed = score >= activeDefinition.passingScore

  return <>
    <section className="quiz-hero"><div className="container quiz-hero-grid"><div><Link className="back-link" to={`/courses/${activeDefinition.courseId}`}><ArrowLeft size={17} aria-hidden="true" /> Course overview</Link><span className="eyebrow">Randomized assessment</span><h1>{activeDefinition.title}</h1><p>{activeDefinition.description}</p></div><div className="quiz-summary-card"><div><strong>{activeDefinition.questionCount}</strong><span>questions this attempt</span></div><div><strong>{pool.length}</strong><span>questions in the source bank</span></div><div><strong>{activeDefinition.passingScore}%</strong><span>required to pass</span></div></div></div></section>
    <section className="section section-tight-top"><div className="container quiz-layout"><main className="quiz-question-list">
      {questions.map((question, index) => {
        const selected = answers[question.id] ?? []
        const isCorrect = submitted && question.correctOptionIds.every((id) => selected.includes(id)) && selected.length === question.correctOptionIds.length
        const explanationId = `explanation-${question.id}`
        return <article className={submitted ? `quiz-question ${isCorrect ? 'correct' : 'incorrect'}` : 'quiz-question'} key={question.id}>
          <div className="quiz-question-header"><span>Question {index + 1}</span><small>{question.difficulty}</small></div>
          <h2>{question.prompt}</h2>
          {question.code && <pre className="quiz-code"><code>{question.code}</code></pre>}
          {question.table && <div className="quiz-table-wrap"><table className="quiz-table"><caption className="visually-hidden">Data provided for question {index + 1}</caption><thead><tr>{question.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{question.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
          <div className="quiz-options" aria-label={`Answer options for question ${index + 1}`}>{question.options.map((option) => { const active = selected.includes(option.id); const correctOption = submitted && question.correctOptionIds.includes(option.id); return <button aria-pressed={active} aria-describedby={submitted ? explanationId : undefined} className={`${active ? 'selected' : ''} ${correctOption ? 'correct-option' : ''}`} type="button" onClick={() => select(question, option.id)} key={option.id}><span className="option-marker" aria-hidden="true">{String.fromCharCode(65 + question.options.indexOf(option))}</span><span>{option.text}</span></button> })}</div>
          {submitted && <div className="quiz-explanation" id={explanationId} role="status">{isCorrect ? <BadgeCheck size={20} aria-hidden="true" /> : <CircleAlert size={20} aria-hidden="true" />}<div><strong>{isCorrect ? 'Correct' : 'Review this concept'}</strong><p>{question.explanation}</p>{question.sourceUrl && <a href={question.sourceUrl} target="_blank" rel="noreferrer">Source: {question.sourceLabel} <ExternalLink size={13} aria-hidden="true" /></a>}</div></div>}
        </article>
      })}
    </main><aside className="quiz-sidebar"><div className="sidebar-card sticky-card quiz-progress-card">{!submitted ? <><span className="eyebrow">Attempt progress</span><div className="progress-number" aria-live="polite">{answeredCount}/{questions.length}</div><div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount}><div style={{ width: `${Math.round((answeredCount / questions.length) * 100)}%` }} /></div><p>Answer every question before submitting. Questions and option order are randomized for each retake.</p><button className="button primary" type="button" disabled={!allAnswered || saving} onClick={() => void submit()}>{saving ? 'Saving…' : 'Submit assessment'}</button></> : <><span className="eyebrow">Attempt result</span><div className="progress-number" aria-live="polite">{score}%</div><div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}><div style={{ width: `${score}%` }} /></div><h3>{passed ? 'Assessment passed' : 'Keep building the model'}</h3><p>{passed ? 'Review the explanations and continue.' : `Review the explanations and retake. You need ${activeDefinition.passingScore}% to pass.`}</p>{message && <p className={message.includes('failed') ? 'status-message error' : 'status-message success'} role="status" aria-live="polite">{message}</p>}<button className="button secondary" type="button" onClick={retake}><RefreshCw size={17} aria-hidden="true" /> Retake with new questions</button></>}</div></aside></div></section>
  </>
}
