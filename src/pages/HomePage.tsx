import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  BookOpenCheck,
  DatabaseZap,
  HeartPulse,
  Route,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CourseCard } from '../components/CourseCard'
import { SectionHeading } from '../components/SectionHeading'
import { VisualFlow } from '../components/VisualFlow'
import { courses, learningPaths } from '../data/catalog'

const featuredIds = [
  'apis-webhooks-integration',
  'sql-product-implementation',
  'fhir-implementation',
  'adobe-experience-platform',
  'product-implementation-standards',
  'interview-star-story-bank',
]

const differentiators = [
  {
    icon: <Blocks />,
    title: 'One connected curriculum',
    copy: 'SQL, APIs, Snowflake, HL7, FHIR, Adobe, governance, Agile, and implementation standards reinforce one another instead of living in separate beginner tutorials.',
  },
  {
    icon: <BookOpenCheck />,
    title: 'Artifacts in every course',
    copy: 'Build mappings, Postman collections, SQL validations, governance models, release plans, and interview stories that can be shown in a portfolio.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Healthcare and compliance aware',
    copy: 'Labs are framed around pharmacy, payer, clinical, privacy, and regulated-data scenarios rather than generic ecommerce examples.',
  },
]

export function HomePage() {
  const featured = featuredIds.map((id) => courses.find((course) => course.id === id)!).filter(Boolean)
  const totalModules = courses.reduce((sum, course) => sum + course.modules.length, 0)
  const totalLessons = courses.reduce(
    (sum, course) => sum + course.modules.reduce((moduleSum, module) => moduleSum + module.lessons.length, 0),
    0,
  )

  return (
    <>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles size={17} /> Built for healthcare implementation and product leaders
            </div>
            <h1>
              Build the technical fluency to <span>lead the room.</span>
            </h1>
            <p className="hero-lede">
              A practical academy for professionals who already know how to deliver, govern, and influence, but need stronger proof across data, integrations, healthcare interoperability, Adobe, and modern product leadership.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/paths">
                Choose your learning path <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" to="/courses/apis-webhooks-integration">
                Start with APIs and webhooks
              </Link>
            </div>
            <div className="hero-proof">
              <span><BadgeCheck size={18} /> Portfolio-first</span>
              <span><BadgeCheck size={18} /> Interview-ready</span>
              <span><BadgeCheck size={18} /> Self-paced</span>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-header">
              <div>
                <span className="eyebrow">Recommended first sprint</span>
                <h2>Technical Implementation Leader</h2>
              </div>
              <Route size={28} />
            </div>
            <div className="sprint-list">
              {[
                ['01', 'Deployment foundations', 'Understand how systems ship'],
                ['02', 'APIs and webhooks', 'Test and document integrations'],
                ['03', 'SQL and Snowflake', 'Trace and validate data'],
                ['04', 'HL7 and FHIR', 'Speak healthcare interoperability'],
                ['05', 'Interview lab', 'Translate proof into offers'],
              ].map(([number, title, subtitle]) => (
                <div className="sprint-row" key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                  </div>
                </div>
              ))}
            </div>
            <Link className="panel-link" to="/paths/job-landing-sprint">
              View the 12-week plan <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="metric-strip">
        <div className="container metric-grid">
          <div><strong>{courses.length}</strong><span>courses</span></div>
          <div><strong>{totalModules}</strong><span>guided modules</span></div>
          <div><strong>{totalLessons}+</strong><span>lessons and labs</span></div>
          <div><strong>2</strong><span>portfolio capstones</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="The thesis"
            title="You do not need another certificate pile. You need visible proof."
            description="The curriculum converts existing implementation and governance leadership into demonstrable technical fluency, without pretending you need to become a full-time software engineer."
            align="center"
          />
          <div className="differentiator-grid">
            {differentiators.map((item) => (
              <article className="icon-card" key={item.title}>
                <div className="icon-box">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              eyebrow="Priority curriculum"
              title="Start with the gaps employers actually probe."
              description="Each course includes a concept layer, original visual, guided lab, portfolio artifact, assessment, and interview translation."
            />
            <Link className="text-link" to="/courses">
              Explore all courses <ArrowRight size={17} />
            </Link>
          </div>
          <div className="course-grid">
            {featured.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column-feature">
          <div>
            <SectionHeading
              eyebrow="Architecture before memorization"
              title="Learn to trace what happens across the whole system."
              description="Senior implementation leaders are expected to connect business requirements to data movement, security, testing, release readiness, and support."
            />
            <div className="check-list">
              {[
                'Trace a clinical or customer event from source to destination',
                'Identify where transformation, validation, and ownership live',
                'Separate contract failures from data, access, or environment failures',
                'Explain the operational controls that keep the workflow trustworthy',
              ].map((item) => (
                <div key={item}><BadgeCheck size={19} /><span>{item}</span></div>
              ))}
            </div>
          </div>
          <VisualFlow
            title="Healthcare implementation flow"
            steps={['Client need', 'Data contract', 'Integration', 'Validation', 'Product', 'Monitoring', 'Outcome']}
          />
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <SectionHeading
            eyebrow="Role-based routes"
            title="Choose a path that matches the job you are targeting."
            description="Paths reuse courses intentionally. The point is not to finish everything before applying. The point is to close the most expensive credibility gaps first."
            align="center"
          />
          <div className="path-grid">
            {learningPaths.map((path, index) => {
              const icons = [<Sparkles />, <HeartPulse />, <DatabaseZap />, <Route />]
              return (
                <article className="path-card" key={path.id}>
                  <div className="path-icon">{icons[index]}</div>
                  <span className="eyebrow">{path.duration}</span>
                  <h3>{path.name}</h3>
                  <strong>{path.tagline}</strong>
                  <p>{path.description}</p>
                  <div className="path-course-count">{path.courseIds.length} courses</div>
                  <Link className="text-link" to={`/paths/${path.id}`}>
                    View path <ArrowRight size={17} />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="container founder-grid">
          <div className="founder-stat-block">
            <span className="eyebrow">Built from real operating experience</span>
            <div className="founder-number">$20M+</div>
            <p>Annual revenue supported through pharmacy and payer implementations.</p>
          </div>
          <div>
            <SectionHeading
              eyebrow="Instructor context"
              title="The curriculum is grounded in the work, not generic tech theater."
              description="Josiah Parve has led healthcare SaaS implementations, enterprise analytics governance, release operations, automation, data-quality remediation, pharmacy operations, and regulated-data programs across product, engineering, QA, client, and operational teams."
            />
            <div className="impact-grid">
              <div><strong>25%</strong><span>SaaS COG reduction</span></div>
              <div><strong>80%</strong><span>manual QA reduction</span></div>
              <div><strong>60+</strong><span>pharmacy implementations</span></div>
              <div><strong>20+</strong><span>digital properties governed</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">Do not wait to feel fully technical.</span>
            <h2>Start with one integration, one artifact, and one stronger interview story.</h2>
          </div>
          <Link className="button primary light" to="/courses/apis-webhooks-integration">
            Begin the API course <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
