import { ChevronDown, ChevronUp, Gauge, MessageSquareText, Target } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { interviewStories } from '../data/catalog'

export function InterviewLabPage() {
  const [openId, setOpenId] = useState(interviewStories[0]?.id ?? '')

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <SectionHeading
            eyebrow="Resume-based interview lab"
            title="Turn dense experience into answers people remember."
            description="The story bank uses real, quantified achievements and shows how one example can answer several competency questions without sounding scripted."
          />
          <div className="interview-hero-grid">
            <div><Gauge /><strong>60-120 sec</strong><span>target answer length</span></div>
            <div><Target /><strong>15 stories</strong><span>full target bank</span></div>
            <div><MessageSquareText /><strong>1 takeaway</strong><span>per answer</span></div>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container interview-layout">
          <div>
            <div className="section-heading">
              <span className="eyebrow">Starter story bank</span>
              <h2>Eight stories already hiding in the resume.</h2>
              <p>Open a story to see the STAR structure, adaptable questions, and the lesson that proves judgment rather than task completion.</p>
            </div>
            <div className="story-list">
              {interviewStories.map((story) => {
                const open = story.id === openId
                return (
                  <article className={open ? 'story-card open' : 'story-card'} key={story.id}>
                    <button type="button" onClick={() => setOpenId(open ? '' : story.id)}>
                      <div>
                        <span className="eyebrow">{story.competency}</span>
                        <h3>{story.title}</h3>
                        <strong>{story.metrics}</strong>
                      </div>
                      {open ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {open && (
                      <div className="story-content">
                        <div className="star-block"><span>S</span><div><strong>Situation</strong><p>{story.situation}</p></div></div>
                        <div className="star-block"><span>T</span><div><strong>Task</strong><p>{story.task}</p></div></div>
                        <div className="star-block"><span>A</span><div><strong>Actions</strong><ul>{story.actions.map((action) => <li key={action}>{action}</li>)}</ul></div></div>
                        <div className="star-block"><span>R</span><div><strong>Result</strong><p>{story.result}</p></div></div>
                        <div className="lesson-callout"><strong>Leadership lesson</strong><p>{story.lessons}</p></div>
                        <div className="question-tags">
                          {story.questions.map((question) => <span key={question}>{question}</span>)}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>

          <aside className="interview-sidebar">
            <div className="sidebar-card sticky-card">
              <span className="eyebrow">Answer scorecard</span>
              <h3>What strong sounds like</h3>
              {[
                'The situation is short and relevant',
                'Your specific accountability is explicit',
                'Actions show sequence, choices, and trade-offs',
                'The result is quantified or independently verifiable',
                'The lesson connects to the target role',
              ].map((item, index) => (
                <div className="score-item" key={item}><span>{index + 1}</span><p>{item}</p></div>
              ))}
            </div>
            <div className="sidebar-card warning-card">
              <span className="eyebrow">Common failure</span>
              <h3>Do not narrate the team’s resume.</h3>
              <p>Use “we” for context, then switch to “I” when describing your decisions, analysis, influence, and actions.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
