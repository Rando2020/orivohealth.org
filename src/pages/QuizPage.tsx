import { ArrowLeft, BadgeCheck, CircleAlert, ExternalLink, RefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { QuizQuestion } from '../data/lmsTypes'
import { getProductionQuiz, getQuizQuestionPool, randomizeQuestions } from '../data/productionCourseRegistry'
import { recordQuizAttempt } from '../lib/lmsProgress'

function scoreQuiz(questions: QuizQuestion[], answers: Record<string, string[]>) {
  const correct = questions.filter((question) => {
    const selected = [...(answers[question.id] ?? [])].sort()
    const expected = [...question.correctOptionIds].sort()
    return selected.length === expected.length && selected.every((value, index) => value === expected[index])
  }).length
  return Math.round((correct / questions.length) * 100)
}

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

  if (!definition || !courseId) {
    return <section className="section empty-state"><h1>Quiz not found</h1><Link className="button primary" to="/courses">Return to courses</Link></section>
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
    const calculated = scoreQuiz(questions, answers)
    setScore(calculated)
    setSubmitted(true)
    await recordQuizAttempt(user, activeDefinition.courseId, activeDefinition.id, calculated, questions.map((question) => question.id), answers)
  }

  function retake() {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setAttempt((value) => value + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length
  const passed = score >= activeDefinition.passingScore

  return (
    <>
      <section className="quiz-hero"><div className="container quiz-hero-grid"><div><Link className="back-link" to={`/courses/${activeDefinition.courseId}`}><ArrowLeft size={17} /> Course overview</Link><span className="eyebrow">Randomized assessment</span><h1>{activeDefinition.title}</h1><p>{activeDefinition.description}</p></div><div className="quiz-summary-card"><div><strong>{activeDefinition.questionCount}</strong><span>questions this attempt</span></div><div><strong>{pool.length}</strong><span>questions in the source bank</span></div><div><strong>{activeDefinition.passingScore}%</strong><span>required to pass</span></div></div></div></section>
      <section className="section section-tight-top"><div className="container quiz-layout"><main className="quiz-question-list">
        {questions.map((question, index) => {
          const selected = answers[question.id] ?? []
          const isCorrect = submitted && question.correctOptionIds.every((id) => selected.includes(id)) && selected.length === question.correctOptionIds.length
          return <article className={submitted ? `quiz-question ${isCorrect ? 'correct' : 'incorrect'}` : 'quiz-question'} key={question.id}>
            <div className="quiz-question-header"><span>Question {index + 1}</span><small>{question.difficulty}</small></div>
            <h2>{question.prompt}</h2>
            {question.code && <pre className="quiz-code"><code>{question.code}</code></pre>}
            {question.table && <div className="quiz-table-wrap"><table className="quiz-table"><thead><tr>{question.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{question.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
            <div className="quiz-options">{question.options.map((option) => { const active = selected.includes(option.id); const correctOption = submitted && question.correctOptionIds.includes(option.id); return <button className={`${active ? 'selected' : ''} ${correctOption ? 'correct-option' : ''}`} type="button" onClick={() => select(question, option.id)} key={option.id}><span className="option-marker">{String.fromCharCode(65 + question.options.indexOf(option))}</span><span>{option.text}</span></button> })}</div>
            {submitted && <div className="quiz-explanation">{isCorrect ? <BadgeCheck size={20} /> : <CircleAlert size={20} />}<div><strong>{isCorrect ? 'Correct' : 'Review this concept'}</strong><p>{question.explanation}</p>{question.sourceUrl && <a href={question.sourceUrl} target="_blank" rel="noreferrer">Source: {question.sourceLabel} <ExternalLink size={13} /></a>}</div></div>}
          </article>
        })}
      </main><aside className="quiz-sidebar"><div className="sidebar-card sticky-card quiz-progress-card">{!submitted ? <><span className="eyebrow">Attempt progress</span><div className="progress-number">{answeredCount}/{questions.length}</div><div className="progress-track"><div style={{ width: `${Math.round((answeredCount / questions.length) * 100)}%` }} /></div><p>Answer every question before submitting. Questions and option order are randomized for each retake.</p><button className="button primary" type="button" disabled={answeredCount !== questions.length} onClick={() => void submit()}>Submit assessment</button></> : <><span className="eyebrow">Attempt result</span><div className="progress-number">{score}%</div><div className="progress-track"><div style={{ width: `${score}%` }} /></div><h3>{passed ? 'Assessment passed' : 'Keep building the model'}</h3><p>{passed ? 'Your score has been saved. Review the explanations and continue.' : `Review the explanations and retake. You need ${activeDefinition.passingScore}% to pass.`}</p><button className="button secondary" type="button" onClick={retake}><RefreshCw size={17} /> Retake with new questions</button></>}</div></aside></div></section>
    </>
  )
}
