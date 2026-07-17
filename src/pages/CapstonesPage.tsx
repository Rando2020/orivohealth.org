import { ArrowRight, BadgeCheck, Database, HeartPulse, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { VisualFlow } from '../components/VisualFlow'

const capstones = [
  {
    icon: <HeartPulse />,
    label: 'Capstone 01',
    title: 'Healthcare Data Implementation',
    description:
      'Build a synthetic payer and pharmacy implementation that demonstrates discovery, interoperability, data movement, testing, governance, cutover, and support.',
    flow: ['Client intake', 'HL7 event', 'FHIR resources', 'API and webhook', 'Snowflake', 'Validation', 'Launch'],
    deliverables: [
      'Client discovery questionnaire and RACI',
      'HL7 ADT message and FHIR Patient, Encounter, and Coverage resources',
      'OpenAPI specification and Postman collection',
      'Snowflake and Informatica source-to-target design',
      'SQL validation suite and data-quality scorecard',
      'Cutover, hypercare, and support runbook',
    ],
    courseId: 'fhir-implementation',
  },
  {
    icon: <Layers3 />,
    label: 'Capstone 02',
    title: 'Adobe Customer Journey Implementation',
    description:
      'Design a governed healthcare consumer journey across Web SDK, XDM, datasets, identity, CJA, Analytics, Target, and A4T.',
    flow: ['Journey need', 'Web SDK', 'XDM schema', 'AEP dataset', 'Identity', 'CJA and Analytics', 'Target test'],
    deliverables: [
      'Measurement strategy and solution design reference',
      'ExperienceEvent schema and dataset plan',
      'Identity namespace and governance strategy',
      'CJA connection and data-view design',
      'Target activity and A4T reporting plan',
      'Consent controls, QA script, and release checklist',
    ],
    courseId: 'adobe-experience-platform',
  },
]

export function CapstonesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <SectionHeading
            eyebrow="Portfolio capstones"
            title="The final product is not course completion. It is evidence."
            description="Both capstones are designed to be reviewed by a hiring manager in under ten minutes and defended in a technical interview."
          />
          <div className="hero-note-card">
            <Database size={24} />
            <strong>Use synthetic data only</strong>
            <p>Never place employer, client, patient, protected, or confidential information in a public portfolio.</p>
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container capstone-stack">
          {capstones.map((capstone) => (
            <article className="capstone-card" key={capstone.title}>
              <div className="capstone-header">
                <div className="path-icon">{capstone.icon}</div>
                <div><span className="eyebrow">{capstone.label}</span><h2>{capstone.title}</h2></div>
              </div>
              <p className="capstone-description">{capstone.description}</p>
              <VisualFlow title="End-to-end architecture" steps={capstone.flow} compact />
              <div className="capstone-deliverables">
                <span className="eyebrow">Portfolio package</span>
                {capstone.deliverables.map((item) => (
                  <div key={item}><BadgeCheck size={18} /><span>{item}</span></div>
                ))}
              </div>
              <Link className="button secondary" to={`/courses/${capstone.courseId}`}>
                Open anchor course <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
