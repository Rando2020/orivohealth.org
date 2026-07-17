import { m, type Course } from './types'

export const courseGroup6: Course[] = [
  {
    id: 'pmp-hybrid-agile-ceremonies',
    order: 12,
    code: 'ORI-315',
    title: 'PMP, Hybrid Delivery, and Agile Ceremonies',
    shortTitle: 'PMP + Agile Ceremonies',
    description:
      'Prepare for modern project leadership and the July 2026 PMP exam emphasis while learning how to facilitate predictive, agile, and hybrid delivery ceremonies in real operating environments.',
    category: 'Product and delivery',
    difficulty: 'Intermediate',
    hours: 32,
    priority: 'High',
    audience: ['Project managers', 'Implementation managers', 'Product owners', 'Program managers', 'Delivery leads'],
    outcomes: [
      'Explain predictive, agile, and hybrid delivery choices',
      'Facilitate useful project and Agile ceremonies',
      'Apply value, outcomes, stakeholder, risk, and governance thinking',
      'Prepare for scenario-based PMP and PMI-ACP style questions',
    ],
    modules: [
      m('Modern PMP orientation', 'Understand the July 2026 exam emphasis and how the exam evaluates judgment.', [
        'People, Process, and Business Environment domains',
        'Outcomes and value over output-only success',
        'AI, sustainability, and stakeholder engagement',
        'Scenario-based decision sequence',
      ]),
      m('Predictive project foundations', 'Build charter, scope, schedule, cost, quality, resource, procurement, and governance fluency.', [
        'Business case and project charter',
        'Work breakdown structure and baseline concepts',
        'Critical path, dependencies, and forecasting',
        'Integrated change control',
      ]),
      m('Agile values and adaptive delivery', 'Use empiricism, feedback, and incremental value rather than ceremony compliance.', [
        'Agile principles and product thinking',
        'Scrum accountabilities and commitments',
        'Kanban flow and work-in-progress limits',
        'Lean waste and continuous improvement',
      ]),
      m('Hybrid delivery design', 'Combine governance and adaptive delivery intentionally.', [
        'Selecting lifecycle by uncertainty and risk',
        'Predictive funding with iterative delivery',
        'Compliance gates without waterfall theater',
        'Hybrid planning and reporting',
      ]),
      m('Project initiation ceremonies', 'Facilitate alignment before delivery begins.', [
        'Project kickoff',
        'Charter workshop',
        'Stakeholder alignment session',
        'Ways-of-working and decision-rights workshop',
      ], 'Create an implementation kickoff agenda, charter canvas, and decision log.'),
      m('Planning ceremonies', 'Turn goals and uncertainty into coordinated work.', [
        'Release and milestone planning',
        'PI planning concepts',
        'Sprint planning',
        'Backlog refinement and story mapping',
      ]),
      m('Execution and synchronization ceremonies', 'Keep teams aligned without replacing delivery with meetings.', [
        'Daily Scrum and daily coordination',
        'Scrum of Scrums and dependency sync',
        'Risk and issue review',
        'Client implementation status review',
      ]),
      m('Review and learning ceremonies', 'Use evidence to inspect outcomes and improve the system.', [
        'Sprint review and product demonstration',
        'Retrospective facilitation',
        'Lessons learned and postmortems',
        'Benefits and value realization review',
      ], 'Facilitate a retrospective using evidence, experiments, and named owners.'),
      m('Stakeholders, conflict, and leadership', 'Lead across authority boundaries.', [
        'Stakeholder analysis and engagement',
        'Conflict resolution and negotiation',
        'Servant leadership and coaching',
        'Executive communication and escalation',
      ]),
      m('Risk, quality, and compliance', 'Integrate uncertainty, testing, governance, and change decisions.', [
        'Risk identification and response',
        'Quality planning and acceptance',
        'Compliance and audit evidence',
        'Change control in predictive and agile contexts',
      ]),
      m('PMP scenario practice', 'Apply a repeatable judgment framework to complex questions.', [
        'Identify lifecycle and role',
        'Assess before acting',
        'Collaborate and solve at the lowest responsible level',
        'Escalate or change formally when required',
      ]),
      m('Application and exam plan', 'Build an ethical preparation and experience-documentation package.', [
        'Experience narrative and application mapping',
        'Study plan and knowledge-gap assessment',
        'Large randomized practice bank',
        'Exam-day decision and pacing strategy',
      ]),
    ],
    capstone: 'Lead a synthetic healthcare implementation through kickoff, hybrid planning, delivery ceremonies, change control, launch review, and retrospective.',
    artifact: 'Charter, stakeholder plan, hybrid lifecycle decision, ceremony facilitation kit, RAID log, change request, status report, retrospective, and PMP study plan.',
    interviewTranslation:
      'Demonstrate that you know when ceremony creates decisions and learning versus when it becomes status theater, and explain how you lead predictive, agile, and hybrid work.',
    visual: {
      title: 'Hybrid project leadership loop',
      steps: ['Authorize', 'Plan outcomes', 'Deliver increment', 'Inspect evidence', 'Control change', 'Realize value', 'Adapt'],
    },
    resources: [
      {
        label: 'PMI PMP Exam Preparation and Exam Content Outlines',
        url: 'https://www.pmi.org/certifications/project-management-pmp/pmp-exam-preparation',
        type: 'Official documentation',
      },
      {
        label: 'PMI 2026 PMP Exam Update',
        url: 'https://www.pmi.org/certifications/project-management-pmp/new-exam',
        type: 'Official documentation',
      },
      {
        label: 'PMI Agile Certified Practitioner',
        url: 'https://www.pmi.org/certifications/agile-acp',
        type: 'Official documentation',
      },
      {
        label: 'Official Scrum Guide',
        url: 'https://scrumguides.org/download.html',
        type: 'Standard',
      },
    ],
    resumeBridge:
      'Your SAFe, Jira, ADO, implementation, governance, release, and cross-functional leadership experience provides strong scenario material for PMP and hybrid-delivery practice.',
  },
]
