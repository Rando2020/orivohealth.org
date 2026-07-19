import { MessageSquareText, Send, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loadFeedbackDraft, MAX_FEEDBACK_LENGTH, saveFeedbackDraft, submitLessonFeedback, type FeedbackIssueType } from '../lib/lessonFeedback'

const issueOptions: Array<{ value: FeedbackIssueType; label: string }> = [
  { value: 'incorrect_information', label: 'Incorrect information' },
  { value: 'confusing_explanation', label: 'Confusing explanation' },
  { value: 'broken_source', label: 'Broken source' },
  { value: 'broken_lab', label: 'Broken lab' },
  { value: 'quiz_problem', label: 'Quiz problem' },
  { value: 'accessibility_problem', label: 'Accessibility problem' },
  { value: 'other', label: 'Other' },
]

export function LessonFeedback({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [issueType, setIssueType] = useState<FeedbackIssueType | ''>('')
  const [feedback, setFeedback] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const draft = loadFeedbackDraft(courseId, lessonId)
    setRating(draft.rating)
    setIssueType(draft.issueType)
    setFeedback(draft.feedback)
    setMessage(draft.feedback || draft.rating ? 'An unsent draft is saved on this device.' : '')
  }, [courseId, lessonId])

  function persist(next: { rating: number | null; issueType: FeedbackIssueType | ''; feedback: string }) {
    saveFeedbackDraft(courseId, lessonId, next)
  }

  async function submit() {
    setSubmitting(true)
    setMessage('')
    try {
      const result = await submitLessonFeedback(user, courseId, lessonId, { rating, issueType, feedback })
      setMessage(result.message)
      if (result.submitted) {
        setRating(null)
        setIssueType('')
        setFeedback('')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Feedback could not be submitted. Your draft remains saved.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) {
    return <button className="lesson-feedback-trigger" type="button" onClick={() => setOpen(true)}><MessageSquareText size={17} aria-hidden="true" /> Report a lesson issue or leave feedback</button>
  }

  return (
    <section className="lesson-feedback" aria-labelledby="lesson-feedback-heading">
      <div className="lesson-feedback-header">
        <div><span className="eyebrow">Optional feedback</span><h2 id="lesson-feedback-heading">Help improve this lesson</h2></div>
        <button type="button" className="icon-button" aria-label="Close lesson feedback" onClick={() => setOpen(false)}><X size={18} /></button>
      </div>
      <p>Feedback is reviewed for course quality. Do not include patient, client, employer, confidential, credential, or proprietary information.</p>
      <fieldset className="rating-fieldset">
        <legend>Rating</legend>
        <div className="rating-buttons">
          {[1,2,3,4,5].map((value) => <button key={value} type="button" aria-label={`${value} star rating`} aria-pressed={rating === value} className={rating === value ? 'active' : ''} onClick={() => { setRating(value); persist({ rating: value, issueType, feedback }) }}><Star size={18} aria-hidden="true" /></button>)}
        </div>
      </fieldset>
      <label htmlFor="feedback-issue-type">Issue type</label>
      <select id="feedback-issue-type" value={issueType} onChange={(event) => { const value = event.target.value as FeedbackIssueType | ''; setIssueType(value); persist({ rating, issueType: value, feedback }) }}>
        <option value="">Choose an issue type</option>
        {issueOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <label htmlFor="lesson-feedback-text">Details</label>
      <textarea id="lesson-feedback-text" value={feedback} maxLength={MAX_FEEDBACK_LENGTH} onChange={(event) => { setFeedback(event.target.value); persist({ rating, issueType, feedback: event.target.value }) }} placeholder="Describe what was incorrect, confusing, inaccessible, or broken." />
      <div className="feedback-footer"><small>{feedback.length}/{MAX_FEEDBACK_LENGTH}</small><button className="button primary" type="button" disabled={submitting} onClick={() => void submit()}><Send size={16} aria-hidden="true" /> {submitting ? 'Submitting…' : user ? 'Submit feedback' : 'Save draft'}</button></div>
      {!user && <p className="feedback-note">You are not signed in. This feedback will remain an unsent draft on this device until you sign in and submit it.</p>}
      {message && <p className="status-message" role="status" aria-live="polite">{message}</p>}
    </section>
  )
}
