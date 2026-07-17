import { courseGroup1 } from './courses1'
import { courseGroup2 } from './courses2'
import { courseGroup3 } from './courses3'
import { courseGroup4 } from './courses4'
import { courseGroup5 } from './courses5'
import type { Category, Course } from './types'

export type { Category, Course, CourseModule, Difficulty, ResourceLink } from './types'

export const courses: Course[] = [
  ...courseGroup1,
  ...courseGroup2,
  ...courseGroup3,
  ...courseGroup4,
  ...courseGroup5,
]

export interface LearningPath {
  id: string
  name: string
  tagline: string
  description: string
  duration: string
  courseIds: string[]
  result: string
}

export const learningPaths: LearningPath[] = [
  {
    id: 'job-landing-sprint',
    name: '12-Week Job-Landing Sprint',
    tagline: 'Close credibility gaps first.',
    description:
      'A focused sequence for interviewing now while creating demonstrable technical artifacts each week.',
    duration: '12 weeks',
    courseIds: [
      'interview-star-story-bank',
      'systems-deployment-foundations',
      'apis-webhooks-integration',
      'sql-product-implementation',
      'snowflake-informatica',
      'hl7-v2-fundamentals',
      'fhir-implementation',
      'adobe-experience-platform',
    ],
    result: 'A credible technical implementation portfolio and a role-specific story bank.',
  },
  {
    id: 'healthcare-integration-lead',
    name: 'Healthcare Integration Lead',
    tagline: 'From clinical event to governed exchange.',
    description:
      'Build fluency across APIs, HL7 v2, FHIR, data platforms, security, testing, and implementation delivery.',
    duration: '16 to 20 weeks',
    courseIds: [
      'systems-deployment-foundations',
      'apis-webhooks-integration',
      'hl7-v2-fundamentals',
      'fhir-implementation',
      'snowflake-informatica',
      'security-cloud-architecture',
      'technical-testing-observability',
      'product-implementation-standards',
    ],
    result: 'A complete healthcare interoperability implementation capstone.',
  },
  {
    id: 'technical-product-leader',
    name: 'Technical Product Leader',
    tagline: 'Strategy with enough technical depth to execute.',
    description:
      'Combine product discovery, Agile delivery, APIs, cloud architecture, analytics, and implementation standards.',
    duration: '14 to 18 weeks',
    courseIds: [
      'modern-agile-product',
      'systems-deployment-foundations',
      'apis-webhooks-integration',
      'security-cloud-architecture',
      'sql-product-implementation',
      'technical-testing-observability',
      'product-implementation-standards',
      'interview-star-story-bank',
    ],
    result: 'A product strategy and delivery portfolio backed by technical implementation evidence.',
  },
  {
    id: 'adobe-experience-leader',
    name: 'Adobe Experience and Analytics Leader',
    tagline: 'Modernize deep analytics-governance experience.',
    description:
      'Connect JavaScript, Web SDK, AEP, CJA, Target, Analytics, governance, and testing into one architecture.',
    duration: '12 to 16 weeks',
    courseIds: [
      'javascript-technical-implementers',
      'adobe-experience-platform',
      'apis-webhooks-integration',
      'dama-data-governance',
      'technical-testing-observability',
      'modern-agile-product',
    ],
    result: 'A portfolio-ready Adobe healthcare journey solution design.',
  },
]

export interface InterviewStory {
  id: string
  competency: string
  title: string
  metrics: string
  situation: string
  task: string
  actions: string[]
  result: string
  lessons: string
  questions: string[]
}

export const interviewStories: InterviewStory[] = [
  {
    id: 'cog-framework',
    competency: 'Operational transformation',
    title: 'Created the first auditable SaaS cost-of-goods framework',
    metrics: '25% COG reduction',
    situation:
      'Legacy Azure DevOps workflows supported major implementations, but effort and cost were not consistently measurable.',
    task:
      'Create a defensible model that connected delivery work to cost and revealed the highest-value opportunities for improvement.',
    actions: [
      'Reverse-engineered the legacy workflow into standardized delivery activities',
      'Migrated the operating structure into Jira with story-point conventions',
      'Paired effort estimates with FTE cost analysis',
      'Used the model to prioritize standardization and automation',
    ],
    result:
      'Reduced SaaS cost of goods by 25% and established the first auditable, quantified implementation cost framework used by the team.',
    lessons:
      'Operational cost improves when work is visible, consistently classified, and connected to decision rights.',
    questions: [
      'Tell me about a process you transformed.',
      'How have you used data to influence leadership?',
      'Describe a time you reduced operating cost.',
    ],
  },
  {
    id: 'jenkins-automation',
    competency: 'Automation and quality',
    title: 'Scaled UI automation across environments',
    metrics: '80% less manual QA',
    situation:
      'Release validation depended heavily on manual UI checks across development, staging, and production environments.',
    task:
      'Reduce repeated effort while preserving release confidence and implementation readiness.',
    actions: [
      'Defined repeatable validation scenarios and environment expectations',
      'Partnered with engineering on a Jenkins-based UI automation framework',
      'Embedded automated checks into release readiness',
      'Established escalation and evidence standards for failures',
    ],
    result:
      'Reduced manual QA effort by 80% while improving release consistency and readiness visibility.',
    lessons:
      'Automation creates value only when ownership, maintenance, false-positive handling, and release decisions are designed with it.',
    questions: [
      'Tell me about an automation you led.',
      'How do you balance speed and quality?',
      'Describe your partnership with engineering.',
    ],
  },
  {
    id: 'implementation-scale',
    competency: 'Scaled implementation leadership',
    title: 'Led multi-client pharmacy and payer implementations',
    metrics: '60+ pharmacies, 10 payors, $20M+ annual revenue supported',
    situation:
      'Multiple pharmacy and payer implementations required coordinated product, data, QA, client, and operational work.',
    task:
      'Onboard new and existing programs while protecting timeline, data quality, and client outcomes.',
    actions: [
      'Established implementation plans and readiness expectations',
      'Coordinated dependencies across product, engineering, QA, data, and client teams',
      'Managed release validation and issue escalation',
      'Standardized repeatable onboarding and handoff artifacts',
    ],
    result:
      'Led implementations for more than 60 pharmacies and 10 payors supporting over $20 million in annual company revenue.',
    lessons:
      'Implementation scale depends on exception management and reusable standards, not simply adding more status meetings.',
    questions: [
      'Describe the largest implementation portfolio you managed.',
      'How do you keep complex clients aligned?',
      'How do you manage cross-functional dependencies?',
    ],
  },
  {
    id: 'analytics-governance',
    competency: 'Data governance and compliance',
    title: 'Governed analytics across CVS and Aetna digital properties',
    metrics: '20+ properties and hundreds of tags remediated',
    situation:
      'Enterprise digital properties used extensive analytics and marketing tags while facing HIPAA, GDPR, and CCPA obligations.',
    task:
      'Preserve measurement value while reducing consent, privacy, and protected-information exposure risk.',
    actions: [
      'Owned tagging governance and implementation requirements',
      'Audited data collection behavior across properties',
      'Partnered with product, marketing, analytics, privacy, and engineering',
      'Built the Confluence system of record for standards and remediation evidence',
    ],
    result:
      'Aligned analytics across more than 20 properties and remediated hundreds of tags to close consent and PHI exposure gaps.',
    lessons:
      'Governance works when it is embedded into implementation specifications, testing, and release approval.',
    questions: [
      'Tell me about a governance program you led.',
      'How have you handled privacy risk?',
      'Describe a time you influenced without authority.',
    ],
  },
  {
    id: 'tag-validation',
    competency: 'Technical partnership',
    title: 'Built automated analytics tag validation',
    metrics: '85-90% defect detection before production and 70-80% fewer manual QA hours',
    situation:
      'Manual validation of Tealium and Adobe Analytics deployments was slow and allowed defects to reach later release stages.',
    task:
      'Create a repeatable mechanism that compared live-page behavior against tagging specifications before production.',
    actions: [
      'Translated tagging specifications into testable validation rules',
      'Partnered with engineering on an automated page-validation framework',
      'Integrated the framework into pre-release QA',
      'Used failures to improve implementation standards upstream',
    ],
    result:
      'Caught 85-90% of tagging defects before production and eliminated 70-80% of manual QA hours.',
    lessons:
      'The best QA automation begins with precise specifications and feeds lessons back into design standards.',
    questions: [
      'Describe a technical initiative you led without writing all the code.',
      'How do you convert requirements into automated controls?',
      'Tell me about a quality improvement.',
    ],
  },
  {
    id: 'sop-system',
    competency: 'Knowledge systems and enablement',
    title: 'Created the implementation system of record',
    metrics: '160+ pages of SOPs and implementation guidance',
    situation:
      'Critical implementation knowledge lived across people, messages, and inconsistent artifacts.',
    task:
      'Create a durable operating backbone that supported onboarding, handoff, quality, and scale.',
    actions: [
      'Mapped recurring processes, decisions, risks, and ownership',
      'Authored structured SOPs, implementation guides, and templates',
      'Organized the content in Confluence as the system of record',
      'Used the library for onboarding and cross-team knowledge transfer',
    ],
    result:
      'Produced more than 160 pages of reusable implementation documentation and reduced reliance on tribal knowledge.',
    lessons:
      'Documentation must be designed as part of the workflow, with ownership and maintenance cadence, or it decays quickly.',
    questions: [
      'How do you scale knowledge?',
      'Tell me about a process you standardized.',
      'How do you onboard new team members?',
    ],
  },
  {
    id: 'store-locator',
    competency: 'Pragmatic automation',
    title: 'Automated emergency store routing',
    metrics: 'Reduced a 5-7 minute lookup to seconds',
    situation:
      'Cold-chain events required fast identification of the correct store and district contacts using a manual Excel process.',
    task:
      'Reduce response time and communication error during high-risk pharmaceutical events.',
    actions: [
      'Mapped the lookup and routing workflow',
      'Built an automated locator that ingested weekly organizational updates',
      'Standardized the communication output',
      'Maintained the source-data update process',
    ],
    result:
      'Reduced each lookup from five to seven minutes to seconds and eliminated a major source of human error.',
    lessons:
      'The highest-value automation is often small, close to the work, and built around reliable source-data maintenance.',
    questions: [
      'Describe a simple solution with outsized impact.',
      'How do you identify automation opportunities?',
      'Tell me about an operational risk you reduced.',
    ],
  },
  {
    id: 'cold-chain-crisis',
    competency: 'Judgment under pressure',
    title: 'Protected patient safety during cold-chain and disaster events',
    metrics: 'Supported approximately 9,000 stores and millions of dollars in inventory',
    situation:
      'Temperature excursions, hurricanes, and large-scale incidents threatened medication integrity across a national pharmacy footprint.',
    task:
      'Make timely retain, quarantine, or discard decisions while guiding stores through immediate risk containment.',
    actions: [
      'Assessed exposure duration, damage tier, manufacturer stability data, and guidance',
      'Directed pharmacies on containment and next actions',
      'Coordinated safe disposal and documentation',
      'Maintained patient-safety and compliance standards during high-pressure events',
    ],
    result:
      'Protected patient safety and helped adjudicate millions of dollars in temperature-sensitive and specialty-drug inventory.',
    lessons:
      'Strong operational judgment combines evidence, clear thresholds, decisive communication, and documented accountability.',
    questions: [
      'Tell me about a crisis you managed.',
      'Describe a high-stakes decision with incomplete information.',
      'How do you communicate during an incident?',
    ],
  },
]

export const officialSourceNotes = [
  'OpenAPI 3.2.0 is the latest published OpenAPI specification and was released in September 2025.',
  'FHIR R5 remains the current published FHIR release. The curriculum teaches R4 implementation fluency because it remains common in production, then adds R5 awareness.',
  'The November 2020 Scrum Guide remains the official current Scrum Guide.',
  'DAMA-DMBOK 2 remains the current published framework while the DMBOK 3.0 modernization project is underway.',
  'Adobe recommends the Experience Platform Web SDK for new Adobe Analytics implementations and clean XDM-based implementations when CJA is anticipated.',
]

export const categoryOrder: Category[] = [
  'Engineering fluency',
  'Data and analytics',
  'Healthcare interoperability',
  'Product and delivery',
  'Career acceleration',
]
