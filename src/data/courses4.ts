import { m, type Course } from './types'

export const courseGroup4: Course[] = [
  {
      id: 'adobe-experience-platform',
      order: 9,
      code: 'ORI-240',
      title: 'Adobe Experience Platform, CJA, Target, and Analytics',
      shortTitle: 'Adobe Experience Cloud',
      description:
        'Understand how XDM, datasets, identities, Web SDK, Customer Journey Analytics, Adobe Analytics, and Target work as one implementation ecosystem.',
      category: 'Data and analytics',
      difficulty: 'Advanced',
      hours: 34,
      priority: 'Critical',
      audience: ['Digital analytics managers', 'AEP product managers', 'Implementation leaders', 'Experience data architects'],
      outcomes: [
        'Explain the AEP data model and ingestion flow',
        'Design CJA connections and data views',
        'Describe Adobe Analytics Web SDK implementation choices',
        'Explain Target activities and Analytics for Target reporting',
      ],
      modules: [
        m('Adobe ecosystem architecture', 'Place Data Collection, AEP, Analytics, CJA, Target, and destinations in one map.', [
          'Experience Cloud applications and shared services',
          'Edge Network and datastream concepts',
          'Batch, streaming, and Web SDK ingestion',
          'Analytics versus CJA use cases',
        ]),
        m('XDM schemas', 'Model customer experience data using classes, field groups, datatypes, and relationships.', [
          'XDM ExperienceEvent and profile-oriented classes',
          'Field groups and custom fields',
          'Schema composition and governance',
          'Data-modeling best practices',
        ], 'Design a healthcare digital journey XDM schema.'),
        m('Datasets, catalog, and ingestion', 'Understand how schema-conformant data is stored and tracked.', [
          'Datasets and data lake concepts',
          'Catalog metadata and lineage',
          'Batch and streaming ingestion',
          'Ingestion monitoring and failed batches',
        ]),
        m('Identity and profile concepts', 'Connect online and offline identifiers without creating false person-level joins.', [
          'Identity namespaces',
          'Primary identity selection',
          'Identity graphs',
          'Merge and governance risks',
        ]),
        m('Customer Journey Analytics', 'Build an analysis layer across AEP datasets.', [
          'Connections and included datasets',
          'Person IDs and stitching concepts',
          'Data views, components, and session settings',
          'Workspace, attribution, and journey analysis',
        ], 'Design a CJA connection and data view for appointment and pharmacy journeys.'),
        m('Adobe Analytics implementation', 'Understand data collection choices and implementation governance.', [
          'Report suites, variables, events, and processing concepts',
          'Web SDK extension versus JavaScript library',
          'Data object versus XDM object migration paths',
          'Validation, debugging, and release controls',
        ]),
        m('Adobe Target and experimentation', 'Design activities, audiences, experiences, metrics, and governance.', [
          'A/B, multivariate, and experience targeting concepts',
          'Activity setup and success metrics',
          'Offer and audience governance',
          'Experiment QA and statistical interpretation',
        ]),
        m('Analytics for Target', 'Use Analytics as the reporting source for Target activities.', [
          'A4T provisioning and permissions',
          'Reporting-source decisions',
          'Activity and experience data flow',
          'Reporting and troubleshooting',
        ], 'Create an A4T measurement and QA plan for a patient scheduling experiment.'),
        m('Privacy and implementation governance', 'Apply consent, purpose, access, and quality controls across the stack.', [
          'Consent-aware data collection',
          'Schema and field governance',
          'PHI exposure prevention',
          'Change control and implementation documentation',
        ]),
      ],
      capstone: 'Design a healthcare consumer journey implementation across Web SDK, AEP, CJA, Analytics, and Target.',
      artifact: 'Solution design reference, XDM schema, dataset plan, identity strategy, CJA design, Target test plan, A4T reporting plan, and QA checklist.',
      interviewTranslation:
        'Connect your historical Adobe Analytics and tag-governance experience to the modern AEP, Web SDK, CJA, and Target architecture.',
      visual: {
        title: 'Adobe experience-data flow',
        steps: ['Web and app', 'Web SDK', 'Edge Network', 'XDM dataset', 'Identity', 'CJA and Analytics', 'Target decision'],
      },
      resources: [
        {
          label: 'AEP XDM system overview',
          url: 'https://experienceleague.adobe.com/en/docs/experience-platform/xdm/home',
          type: 'Official documentation',
        },
        {
          label: 'AEP datasets overview',
          url: 'https://experienceleague.adobe.com/en/docs/experience-platform/catalog/datasets/overview',
          type: 'Official documentation',
        },
        {
          label: 'CJA documentation',
          url: 'https://experienceleague.adobe.com/en/docs/analytics-platform/using/cja-landing',
          type: 'Official documentation',
        },
        {
          label: 'Adobe Analytics Web SDK implementation',
          url: 'https://experienceleague.adobe.com/en/docs/analytics/implementation/aep-edge/web-sdk/overview',
          type: 'Official documentation',
        },
        {
          label: 'Analytics for Target',
          url: 'https://experienceleague.adobe.com/en/docs/target/using/integrate/a4t/a4t',
          type: 'Official documentation',
        },
        {
          label: 'Adobe Experience League video channel',
          url: 'https://www.youtube.com/@AdobeExperienceLeague',
          type: 'Video channel',
        },
      ],
      resumeBridge:
        'This is the direct bridge from your enterprise Adobe Analytics and Tealium governance work to current AEP, CJA, Target, and Web SDK roles.',
    },
  {
      id: 'product-implementation-standards',
      order: 10,
      code: 'ORI-300',
      title: 'Product Implementation Guidelines and Standards',
      shortTitle: 'Implementation Standards',
      description:
        'Build a repeatable implementation operating system from discovery through handoff, with explicit gates for data, configuration, testing, readiness, and adoption.',
      category: 'Product and delivery',
      difficulty: 'Advanced',
      hours: 26,
      priority: 'Critical',
      audience: ['Implementation managers', 'Product operations leaders', 'Program managers', 'Customer success leaders'],
      outcomes: [
        'Run structured discovery and scope control',
        'Create implementation plans, mappings, testing, cutover, and hypercare artifacts',
        'Define readiness and escalation standards',
        'Build governance that scales without adding unnecessary meetings',
      ],
      modules: [
        m('Implementation operating model', 'Define stages, owners, decisions, evidence, and exit criteria.', [
          'Lifecycle and stage gates',
          'RACI and PASCI',
          'Standard work versus client-specific work',
          'Governance cadence and decision logs',
        ]),
        m('Discovery and solution alignment', 'Turn sales promises and client goals into implementable scope.', [
          'Business outcomes and use cases',
          'Current-state and future-state workflows',
          'Requirements, assumptions, constraints, and exclusions',
          'Feasibility and architecture alignment',
        ], 'Create a discovery questionnaire and requirements traceability matrix.'),
        m('Planning and dependency management', 'Build a plan that makes hidden work visible.', [
          'Milestones, work breakdown, and critical path',
          'Dependency and decision registers',
          'Client and internal readiness',
          'Risk, issue, action, and decision management',
        ]),
        m('Data and configuration readiness', 'Prove that the product can receive, interpret, and use the client’s inputs.', [
          'Source-to-target mapping',
          'Configuration workbook',
          'Data-quality thresholds',
          'Security, access, and environment readiness',
        ]),
        m('Testing strategy', 'Design evidence across configuration, integration, regression, and user acceptance.', [
          'Test levels and ownership',
          'Requirements traceability',
          'Defect severity and triage',
          'Exit criteria and sign-off',
        ], 'Build a complete UAT plan and defect triage workflow.'),
        m('Cutover and launch', 'Coordinate the final transition without relying on optimism.', [
          'Cutover sequencing',
          'Go/no-go decision criteria',
          'Rollback and contingency plans',
          'Launch communications',
        ]),
        m('Hypercare, adoption, and handoff', 'Stabilize the implementation and transfer ownership deliberately.', [
          'Hypercare metrics and command center',
          'Support readiness and knowledge transfer',
          'Adoption and outcome measurement',
          'Lessons learned and backlog capture',
        ]),
        m('Portfolio-level implementation management', 'Manage many clients without losing control or creating custom chaos.', [
          'Implementation segmentation',
          'Capacity and cost-to-serve',
          'Standardization and exceptions',
          'Executive portfolio reporting',
        ], 'Create a weighted implementation health score and portfolio dashboard.'),
      ],
      capstone: 'Create the full implementation package for a healthcare SaaS client onboarding.',
      artifact: 'Playbook, discovery kit, RACI, project plan, mapping, test plan, cutover, hypercare, handoff, and health dashboard.',
      interviewTranslation:
        'Show employers that your success came from a deliberate operating model, not personal heroics or endless follow-up.',
      visual: {
        title: 'Implementation lifecycle',
        steps: ['Discover', 'Design', 'Configure', 'Integrate', 'Validate', 'Launch', 'Adopt'],
      },
      resources: [
        {
          label: 'Atlassian project management resources',
          url: 'https://www.atlassian.com/work-management/project-management',
          type: 'Official documentation',
        },
        {
          label: 'Atlassian Agile Coach',
          url: 'https://www.atlassian.com/agile',
          type: 'Official tutorial',
        },
      ],
      resumeBridge:
        'This formalizes the operating backbone you already built through SOPs, Gantt plans, onboarding templates, PRDs, BRDs, and Confluence libraries.',
    },
  {
      id: 'modern-agile-product',
      order: 11,
      code: 'ORI-310',
      title: 'Modern Agile Product Leadership',
      shortTitle: 'Modern Agile',
      description:
        'Strengthen product strategy, discovery, prioritization, outcomes, flow, and scaled delivery without treating Agile as ceremony compliance.',
      category: 'Product and delivery',
      difficulty: 'Intermediate',
      hours: 26,
      priority: 'High',
      audience: ['Product managers', 'Product owners', 'Implementation leaders', 'Product operations'],
      outcomes: [
        'Differentiate product management, product ownership, project management, and product operations',
        'Create outcome-driven product goals and roadmaps',
        'Run discovery and convert learning into backlog decisions',
        'Use Scrum, Kanban, and scaled practices intentionally',
      ],
      modules: [
        m('Product operating roles', 'Clarify accountability and eliminate title-driven confusion.', [
          'Product manager, Product Owner, project manager, and delivery manager',
          'Product operations and enablement',
          'Engineering and design partnership',
          'Decision rights and anti-patterns',
        ]),
        m('Product strategy and goals', 'Connect customer problems, business outcomes, and measurable product bets.', [
          'Vision, strategy, and product principles',
          'Product Goals and outcome statements',
          'North-star and supporting metrics',
          'Assumptions and strategic risks',
        ], 'Write a product strategy one-pager and measurable Product Goal.'),
        m('Discovery and evidence', 'Reduce uncertainty before scaling delivery.', [
          'Problem interviews and observation',
          'Opportunity mapping',
          'Hypotheses and experiments',
          'Evidence quality and decision thresholds',
        ]),
        m('Roadmaps and prioritization', 'Make trade-offs visible without pretending dates are certainty.', [
          'Outcome roadmaps',
          'Now, next, later',
          'RICE, WSJF, cost of delay, and risk-adjusted priority',
          'Dependency and capacity constraints',
        ]),
        m('Backlog and story design', 'Translate validated problems into coherent delivery slices.', [
          'Story mapping and vertical slices',
          'Epics, capabilities, features, and stories',
          'Acceptance criteria and examples',
          'Technical, data, governance, and enablement work',
        ], 'Build a story map and first-release backlog for a healthcare integration feature.'),
        m('Scrum and empiricism', 'Apply the current official Scrum framework with clarity.', [
          'Accountabilities, events, and artifacts',
          'Commitments and empiricism',
          'Product Backlog management',
          'Sprint Goals and review outcomes',
        ]),
        m('Kanban and flow', 'Manage work using explicit policies and flow metrics.', [
          'Work in progress limits',
          'Cycle time and throughput',
          'Classes of service',
          'Blocked work and aging',
        ]),
        m('Scaled and adjacent practices', 'Use coordination structures without recreating command-and-control delivery.', [
          'Program increments and planning concepts',
          'Cross-team dependency management',
          'Portfolio prioritization',
          'When scaled frameworks create overhead',
        ]),
        m('Product analytics and learning loops', 'Measure whether shipped work changed behavior or outcomes.', [
          'Leading and lagging indicators',
          'Instrumentation requirements',
          'Experiment and adoption analysis',
          'Kill, iterate, or scale decisions',
        ], 'Create an outcome measurement plan with instrumentation requirements.'),
      ],
      capstone: 'Create a product strategy, discovery plan, outcome roadmap, story map, and measurement system.',
      artifact: 'Product brief, Product Goal, opportunity map, roadmap, backlog, release plan, and KPI framework.',
      interviewTranslation:
        'Reframe your extensive delivery experience in the language of product decisions, discovery, prioritization, and measurable value.',
      visual: {
        title: 'Modern product loop',
        steps: ['Outcome', 'Discover', 'Prioritize', 'Deliver slice', 'Measure', 'Learn', 'Adjust'],
      },
      resources: [
        {
          label: 'Official Scrum Guide',
          url: 'https://scrumguides.org/download.html',
          type: 'Standard',
        },
        {
          label: 'Scrum.org Product Owner learning path',
          url: 'https://www.scrum.org/pathway/product-owner-learning-path',
          type: 'Official tutorial',
        },
        {
          label: 'Scrum.org Product Owner Open assessment',
          url: 'https://www.scrum.org/open-assessments/product-owner-open',
          type: 'Assessment',
        },
        {
          label: 'Scrum.org digital learning paths',
          url: 'https://www.scrum.org/resources/scrum-digital-learning-paths',
          type: 'Official tutorial',
        },
      ],
      resumeBridge:
        'Your resume proves execution and operations. This course makes discovery, strategy, outcomes, and prioritization equally visible.',
    }
]
