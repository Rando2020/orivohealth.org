import { m, type Course } from './types'

export const courseGroup5: Course[] = [
  {
      id: 'technical-testing-observability',
      order: 12,
      code: 'ORI-320',
      title: 'Data Quality, Testing, and Observability',
      shortTitle: 'Testing + Observability',
      description:
        'Bridge product, data, QA, and operations by defining what good looks like, how it is tested, and how failures are detected after launch.',
      category: 'Engineering fluency',
      difficulty: 'Intermediate',
      hours: 20,
      priority: 'High',
      audience: ['Product operations', 'Implementation leaders', 'QA managers', 'Data product managers'],
      outcomes: [
        'Design layered test strategies',
        'Define data-quality and service-level indicators',
        'Build traceable test evidence and defect workflows',
        'Use observability signals to shorten root-cause analysis',
      ],
      modules: [
        m('Quality strategy', 'Define quality as risk reduction and outcome protection.', [
          'Functional, integration, regression, performance, and security testing',
          'Risk-based test coverage',
          'Shift-left and shift-right quality',
          'Test ownership and independence',
        ]),
        m('Requirements traceability', 'Connect every test to a requirement, risk, or control.', [
          'Traceability matrices',
          'Acceptance criteria and examples',
          'Evidence standards',
          'Coverage gaps and sign-off',
        ]),
        m('Data testing', 'Validate data at each pipeline stage.', [
          'Schema and contract checks',
          'Reconciliation and control totals',
          'Freshness, volume, and distribution checks',
          'Quarantine and exception handling',
        ], 'Design a release certification query and dashboard.'),
        m('Automation framework concepts', 'Understand what should be automated and how automated checks fit delivery.', [
          'Test pyramid and practical alternatives',
          'UI, API, and data-layer automation',
          'Stable selectors and test data',
          'False positives and maintenance cost',
        ]),
        m('Observability and service health', 'Use signals to understand production behavior.', [
          'Logs, metrics, and traces',
          'SLIs, SLOs, and alerts',
          'Correlation IDs',
          'Business and client-impact monitoring',
        ]),
        m('Defect and incident learning', 'Convert failures into stronger systems.', [
          'Severity, priority, and triage',
          'Root cause and contributing factors',
          'Corrective and preventive action',
          'Postmortems without blame',
        ], 'Write a postmortem that identifies control failures and system improvements.'),
      ],
      capstone: 'Build a quality and observability plan for a weekly regulated data release.',
      artifact: 'Risk-based test strategy, traceability matrix, data checks, automation plan, SLO dashboard, and postmortem template.',
      interviewTranslation:
        'Quantify how your automation and governance work reduced defects, manual effort, and release risk.',
      visual: {
        title: 'Quality across delivery',
        steps: ['Requirement', 'Control', 'Automated test', 'Release evidence', 'Monitor', 'Alert', 'Improve'],
      },
      resources: [
        {
          label: 'OpenTelemetry documentation',
          url: 'https://opentelemetry.io/docs/',
          type: 'Official documentation',
        },
        {
          label: 'GitHub Actions testing guidance',
          url: 'https://docs.github.com/en/actions/automating-builds-and-tests',
          type: 'Official documentation',
        },
      ],
      resumeBridge:
        'This deepens the story behind your 85-90% pre-production defect detection and 70-80% reduction in manual QA hours.',
    },
  {
      id: 'security-cloud-architecture',
      order: 13,
      code: 'ORI-330',
      title: 'Cloud, Security, and Integration Architecture for Product Leaders',
      shortTitle: 'Cloud + Security',
      description:
        'Learn the architecture and security concepts expected in senior implementation and product conversations without turning the course into cloud-engineer certification prep.',
      category: 'Engineering fluency',
      difficulty: 'Intermediate',
      hours: 18,
      priority: 'High',
      audience: ['Technical product managers', 'Implementation directors', 'Solutions leaders', 'Governance managers'],
      outcomes: [
        'Read a high-level cloud architecture diagram',
        'Ask credible security and nonfunctional requirement questions',
        'Understand identity, encryption, networks, and shared responsibility',
        'Create a practical integration threat and control review',
      ],
      modules: [
        m('Cloud architecture vocabulary', 'Understand regions, availability, managed services, and shared responsibility.', [
          'Compute, storage, networking, and managed databases',
          'Regions, zones, resilience, and disaster recovery',
          'Infrastructure, platform, and software services',
          'Shared-responsibility model',
        ]),
        m('Identity and access', 'Make access decisions explicit and reviewable.', [
          'Authentication and authorization',
          'Users, roles, services, and scopes',
          'Least privilege and separation of duties',
          'Secrets and key rotation',
        ]),
        m('Data protection', 'Protect sensitive information across storage, movement, and use.', [
          'Encryption in transit and at rest',
          'Tokenization and masking concepts',
          'Data classification and retention',
          'Backups and recovery',
        ]),
        m('Network and integration security', 'Understand the controls surrounding APIs, files, and data connections.', [
          'Public and private endpoints',
          'Firewalls, allowlists, and gateways',
          'TLS and certificates',
          'Webhook signatures and replay protection',
        ]),
        m('Threat and control thinking', 'Translate architecture risks into implementation requirements.', [
          'Threat actors, abuse cases, and attack surface',
          'Security requirements and acceptance criteria',
          'Vendor and third-party risk',
          'Evidence and exception management',
        ], 'Create a lightweight threat and control review for a FHIR API integration.'),
        m('Resilience and continuity', 'Design for failures that will eventually happen.', [
          'Recovery objectives',
          'Failover and graceful degradation',
          'Dependency failure modes',
          'Business continuity and communications',
        ]),
      ],
      capstone: 'Review a healthcare integration architecture for security, privacy, resilience, and operational readiness.',
      artifact: 'Architecture review, security questionnaire, threat-control matrix, nonfunctional requirements, and continuity plan.',
      interviewTranslation:
        'Ask and answer the architecture questions senior roles face without claiming to be the person configuring the network.',
      visual: {
        title: 'Secure integration boundary',
        steps: ['Client', 'Identity', 'Gateway', 'Service', 'Data store', 'Audit', 'Recovery'],
      },
      resources: [
        {
          label: 'NIST Cybersecurity Framework',
          url: 'https://www.nist.gov/cyberframework',
          type: 'Standard',
        },
        {
          label: 'OWASP API Security project',
          url: 'https://owasp.org/www-project-api-security/',
          type: 'Standard',
        },
      ],
      resumeBridge:
        'Your compliance and governance work becomes stronger when paired with practical architecture, access, encryption, resilience, and threat language.',
    },
  {
      id: 'interview-star-story-bank',
      order: 14,
      code: 'ORI-400',
      title: 'Technical and Behavioral Interviewing with STAR',
      shortTitle: 'Interview Lab',
      description:
        'Convert a strong but dense resume into concise stories that demonstrate scope, judgment, technical fluency, influence, and measurable results.',
      category: 'Career acceleration',
      difficulty: 'Foundation',
      hours: 16,
      priority: 'Critical',
      audience: ['Job seekers', 'Implementation leaders', 'Product managers', 'Operations leaders'],
      outcomes: [
        'Build a reusable bank of evidence-based STAR stories',
        'Answer technical questions at the right depth',
        'Handle failure, conflict, ambiguity, and executive scenarios',
        'Adapt one core story to multiple competency questions',
      ],
      modules: [
        m('Interview positioning', 'Define the role narrative employers should remember.', [
          'Your one-sentence value proposition',
          'Role target and evidence map',
          'Leadership scope versus title',
          'Technical fluency without overclaiming',
        ]),
        m('STAR that does not sound rehearsed', 'Structure context and spend most of the answer on judgment and action.', [
          'Situation and relevant constraints',
          'Task and personal accountability',
          'Action with sequence and trade-offs',
          'Result, evidence, and learning',
        ], 'Turn the 25% COG reduction achievement into 60-second and 120-second answers.'),
        m('Core story bank', 'Create stories that cover the majority of behavioral questions.', [
          'Transformation and automation',
          'Conflict and stakeholder alignment',
          'Failure and recovery',
          'Ambiguity and executive decision-making',
        ]),
        m('Technical explanation practice', 'Explain systems at product-leader depth.', [
          'Whiteboard an API integration',
          'Trace data through a pipeline',
          'Explain an environment or deployment defect',
          'Describe governance controls and evidence',
        ]),
        m('Case and scenario interviews', 'Respond to open-ended implementation and product problems.', [
          'Clarifying goals and constraints',
          'Framework without framework theater',
          'Prioritizing risks and next steps',
          'Communicating assumptions',
        ]),
        m('Executive presence and challenge questions', 'Stay direct when questions are skeptical, compressed, or politically loaded.', [
          'Why this role and why now',
          'Why you are ready for director scope',
          'Compensation and level conversations',
          'Handling an incorrect premise calmly',
        ]),
        m('Mock interview operating rhythm', 'Use deliberate practice and evidence-based improvement.', [
          'Question rotation and scorecard',
          'Filler-word and answer-length review',
          'Technical accuracy review',
          'Company-specific adaptation',
        ], 'Complete a scored mock interview and revise the three weakest answers.'),
      ],
      capstone: 'Complete a role-specific mock interview using a 15-story resume-based evidence bank.',
      artifact: 'Positioning statement, story bank, technical whiteboards, question matrix, mock scorecard, and follow-up email templates.',
      interviewTranslation:
        'This is the translation layer itself: your experience becomes crisp, credible, role-specific interview evidence.',
      visual: {
        title: 'Interview answer architecture',
        steps: ['Question intent', 'Relevant story', 'Constraint', 'Actions', 'Measured result', 'Learning', 'Role connection'],
      },
      resources: [
        {
          label: 'MIT STAR method guide',
          url: 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/',
          type: 'Official documentation',
        },
        {
          label: 'Amazon interview preparation',
          url: 'https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon',
          type: 'Official documentation',
        },
      ],
      resumeBridge:
        'The course uses your quantified implementation, governance, automation, analytics, pharmacy, and crisis-response achievements as the practice dataset.',
    }
]
