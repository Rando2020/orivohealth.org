import { m, type Course } from './types'

export const courseGroup1: Course[] = [
  {
      id: 'systems-deployment-foundations',
      order: 0,
      code: 'ORI-100',
      title: 'Systems, Environments, and Deployment Foundations',
      shortTitle: 'Deployment Foundations',
      description:
        'Understand how software moves from an idea to production, how environments differ, and how product and implementation leaders prevent release failures.',
      category: 'Engineering fluency',
      difficulty: 'Foundation',
      hours: 12,
      priority: 'Critical',
      audience: ['Implementation managers', 'Product managers', 'Product operations', 'Client success leaders'],
      outcomes: [
        'Explain the SDLC and deployment pipeline without hand-waving',
        'Read release logs and identify the right technical owner',
        'Create a release-readiness gate for Dev, STG, UAT, and Prod',
        'Translate business risk into testable deployment controls',
      ],
      modules: [
        m('How software systems fit together', 'Build a shared vocabulary for frontends, backends, databases, services, and infrastructure.', [
          'Client, server, database, and network responsibilities',
          'Monoliths, services, queues, jobs, and third-party dependencies',
          'Configuration versus code versus data',
          'Functional and nonfunctional requirements',
        ]),
        m('The software delivery lifecycle', 'Trace work from discovery through support and continuous improvement.', [
          'Discovery, design, build, test, release, operate',
          'Definition of Ready and Definition of Done',
          'Change control without bureaucracy',
          'Release notes, rollback plans, and decision logs',
        ]),
        m('Development environments', 'Understand why Dev, QA, STG, UAT, and Prod should not behave identically.', [
          'Environment purpose and ownership',
          'Test data and production-like configuration',
          'Environment drift and hidden dependencies',
          'Secrets, variables, and feature flags',
        ]),
        m('Git and version control for non-engineers', 'Read branches, pull requests, commits, and tags well enough to follow delivery.', [
          'Repository anatomy',
          'Branches, commits, pull requests, and reviews',
          'Merge conflicts and release branches',
          'Semantic versions and change history',
        ]),
        m('CI/CD and automated release controls', 'See how tools such as Jenkins and GitHub Actions automate quality checks.', [
          'Build, test, package, deploy',
          'Pipelines, jobs, artifacts, and runners',
          'Quality gates and approval steps',
          'Blue-green, canary, and phased releases',
        ], 'Create a release pipeline map with owners, evidence, exit criteria, and rollback triggers.'),
        m('Incident and release troubleshooting', 'Use logs, timestamps, correlation IDs, and change history to narrow failures.', [
          'Symptoms versus root causes',
          'Reading structured logs',
          'Dependency and configuration failures',
          'Incident severity, communications, and postmortems',
        ]),
      ],
      capstone: 'Produce a complete release-readiness and cutover package for a healthcare SaaS feature.',
      artifact: 'Release workflow, readiness checklist, cutover plan, rollback plan, and incident communication template.',
      interviewTranslation:
        'Explain how you enforced implementation readiness across STG, Dev, and Prod while reducing manual QA effort.',
      visual: {
        title: 'From requirement to reliable release',
        steps: ['Discovery', 'Backlog', 'Build', 'Automated QA', 'UAT', 'Production', 'Observe'],
      },
      resources: [
        {
          label: 'GitHub Actions documentation',
          url: 'https://docs.github.com/en/actions',
          type: 'Official documentation',
        },
        {
          label: 'GitHub pull request documentation',
          url: 'https://docs.github.com/en/pull-requests',
          type: 'Official documentation',
        },
      ],
      resumeBridge:
        'You already led a Jenkins-based UI automation framework and enforced release readiness. This course makes the underlying engineering language explicit.',
    },
  {
      id: 'sql-product-implementation',
      order: 1,
      code: 'ORI-110',
      title: 'SQL for Product and Implementation Leaders',
      shortTitle: 'SQL',
      description:
        'Learn SQL through implementation validation, release reconciliation, root-cause analysis, and stakeholder-ready findings.',
      category: 'Data and analytics',
      difficulty: 'Foundation',
      hours: 24,
      priority: 'Critical',
      audience: ['Implementation managers', 'Business analysts', 'Product managers', 'Data governance leaders'],
      outcomes: [
        'Write reliable queries using joins, CTEs, aggregations, and window functions',
        'Reconcile source and target populations',
        'Detect missing, duplicated, stale, or malformed records',
        'Turn query findings into an actionable defect narrative',
      ],
      modules: [
        m('Relational data fundamentals', 'Understand tables, keys, relationships, schemas, and grain.', [
          'Rows, columns, data types, and nulls',
          'Primary and foreign keys',
          'One-to-one, one-to-many, and many-to-many relationships',
          'Table grain and why it prevents bad metrics',
        ]),
        m('Selecting and filtering data', 'Build clean, readable foundational queries.', [
          'SELECT, aliases, and calculated fields',
          'WHERE, IN, BETWEEN, LIKE, and boolean logic',
          'CASE statements',
          'Dates, strings, and null handling',
        ], 'Create an implementation exception report for records that fail readiness rules.'),
        m('Aggregations and business metrics', 'Turn rows into trustworthy counts, rates, and trends.', [
          'GROUP BY and HAVING',
          'COUNT, SUM, AVG, MIN, and MAX',
          'Distinct counts and denominator traps',
          'Metric validation and tie-outs',
        ]),
        m('Joins that do not corrupt the answer', 'Join datasets while preserving intended grain.', [
          'INNER and LEFT joins',
          'FULL joins for reconciliation',
          'Duplicate multiplication',
          'Anti-joins and missing relationships',
        ], 'Compare pharmacy eligibility records against the configured client roster and classify every mismatch.'),
        m('CTEs and subqueries', 'Break complicated analysis into auditable steps.', [
          'Common table expressions',
          'Nested queries',
          'Reusable business logic',
          'Readable query structure and comments',
        ]),
        m('Window functions', 'Analyze sequencing, ranking, and change without collapsing rows.', [
          'ROW_NUMBER, RANK, and DENSE_RANK',
          'LAG and LEAD',
          'Running totals and partitions',
          'Latest-record and deduplication patterns',
        ]),
        m('Data-quality investigation', 'Use SQL as a root-cause tool rather than a reporting trick.', [
          'Completeness, validity, uniqueness, and consistency',
          'Week-over-week deltas',
          'Source-to-target reconciliation',
          'Evidence packages for engineering',
        ], 'Build a reusable suite of release validation queries with pass/fail thresholds.'),
        m('Performance and safe querying', 'Avoid expensive, risky, or misleading queries.', [
          'Filtering early and selecting only needed columns',
          'Query plans and scan awareness',
          'Read-only practice environments',
          'Peer review and version control for SQL',
        ]),
      ],
      capstone: 'Investigate a synthetic payer release where client totals do not match the source system.',
      artifact: 'A 20-query SQL validation workbook, reconciliation report, issue summary, and remediation recommendations.',
      interviewTranslation:
        'Demonstrate how you used SQL with data engineering to identify recurring release issues and convert findings into permanent fixes.',
      visual: {
        title: 'SQL-led root-cause loop',
        steps: ['Question', 'Query', 'Validate grain', 'Reconcile', 'Find pattern', 'Document', 'Fix control'],
      },
      resources: [
        {
          label: 'Snowflake SQL reference',
          url: 'https://docs.snowflake.com/en/sql-reference',
          type: 'Official documentation',
        },
        {
          label: 'Snowflake getting-started tutorials',
          url: 'https://docs.snowflake.com/en/learn-tutorials',
          type: 'Official tutorial',
        },
      ],
      resumeBridge:
        'Your resume already states that you owned L0-L6 release operations and used SQL for root-cause analysis. This course turns that claim into visible proof.',
    },
  {
      id: 'snowflake-informatica',
      order: 2,
      code: 'ORI-120',
      title: 'Snowflake and Informatica Data Operations',
      shortTitle: 'Snowflake + Informatica',
      description:
        'Navigate a modern cloud data workflow from source connection through mapping, loading, transformation, validation, and monitoring.',
      category: 'Data and analytics',
      difficulty: 'Intermediate',
      hours: 22,
      priority: 'Critical',
      audience: ['Implementation managers', 'Data product managers', 'Technical business analysts', 'Product operations'],
      outcomes: [
        'Navigate Snowflake databases, schemas, tables, views, roles, and warehouses',
        'Explain ETL versus ELT and where Informatica fits',
        'Read source-to-target mappings and taskflow failures',
        'Design validation and exception handling for a data pipeline',
      ],
      modules: [
        m('Modern data-platform architecture', 'Connect source applications, integration tools, cloud storage, warehouses, and consuming products.', [
          'Operational systems versus analytical platforms',
          'ETL, ELT, batch, streaming, and files',
          'Landing, staging, curated, and semantic layers',
          'Lineage from source to dashboard',
        ]),
        m('Snowflake foundations', 'Learn the object hierarchy and the separation of storage and compute.', [
          'Account, database, schema, table, and view',
          'Virtual warehouses and compute sizing',
          'Roles, privileges, and least access',
          'Snowsight navigation and query history',
        ], 'Create a practice database, schema, warehouse, and role model.'),
        m('Loading and organizing data', 'Move structured and semi-structured data into Snowflake.', [
          'Stages and file formats',
          'COPY INTO and load history',
          'CSV and JSON ingestion',
          'VARIANT, flattening, and schema-on-read',
        ]),
        m('Data transformation and operations', 'Understand how data becomes reliable and usable.', [
          'Views and transformation SQL',
          'Tasks, streams, and scheduled processing concepts',
          'Time Travel and recovery concepts',
          'Cost and warehouse monitoring',
        ]),
        m('Informatica Cloud Data Integration', 'Understand the objects used to connect, map, execute, and monitor.', [
          'Connections and runtime environments',
          'Sources, targets, and field mapping',
          'Filters, expressions, lookups, routers, and joins',
          'Mapping tasks and taskflows',
        ]),
        m('Parameters, schedules, and incremental loads', 'Make pipelines reusable and production-ready.', [
          'Parameters and parameter files',
          'Watermarks and change capture concepts',
          'Scheduling and dependency order',
          'Environment promotion',
        ]),
        m('Monitoring and failure analysis', 'Use operational evidence to isolate the failure domain.', [
          'Job logs and rejected records',
          'Connection, schema, permission, and data errors',
          'Retry, replay, and quarantine patterns',
          'Support runbooks and escalation evidence',
        ], 'Diagnose a failed mapping task and write a concise incident handoff.'),
        m('Source-to-target implementation package', 'Document what moves, how it changes, and how success is proven.', [
          'Field mapping and transformation rules',
          'Data contracts and assumptions',
          'Reconciliation controls',
          'Operational ownership and SLAs',
        ]),
      ],
      capstone: 'Design and validate a pharmacy eligibility pipeline from a source file through Informatica into Snowflake.',
      artifact: 'Architecture diagram, source-to-target mapping, Snowflake object model, taskflow design, validation SQL, and support runbook.',
      interviewTranslation:
        'Confidently answer where data landed, how it transformed, what failed, and how you proved that the client release was complete.',
      visual: {
        title: 'Cloud data movement',
        steps: ['Source', 'Informatica', 'Landing', 'Snowflake staging', 'Curated model', 'Validation', 'Product'],
      },
      resources: [
        {
          label: 'Snowflake in 20 minutes',
          url: 'https://docs.snowflake.com/en/user-guide-getting-started',
          type: 'Official tutorial',
        },
        {
          label: 'Snowflake tutorial library',
          url: 'https://docs.snowflake.com/en/tutorials',
          type: 'Official tutorial',
        },
        {
          label: 'Informatica Cloud Data Integration documentation',
          url: 'https://docs.informatica.com/integration-cloud/data-integration/current-version.html',
          type: 'Official documentation',
        },
        {
          label: 'Informatica video channel',
          url: 'https://www.youtube.com/@Informatica',
          type: 'Video channel',
        },
      ],
      resumeBridge:
        'You have managed complex data releases and root-cause work. This course fills in the platform-specific navigation and pipeline vocabulary employers test.',
    }
]
