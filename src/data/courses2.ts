import { m, type Course } from './types'

export const courseGroup2: Course[] = [
  {
      id: 'javascript-technical-implementers',
      order: 3,
      code: 'ORI-130',
      title: 'JavaScript for Technical Implementers',
      shortTitle: 'JavaScript',
      description:
        'Read, test, and safely modify basic browser and integration scripts, with special attention to analytics tagging and API calls.',
      category: 'Engineering fluency',
      difficulty: 'Foundation',
      hours: 18,
      priority: 'Supporting',
      audience: ['Digital analytics leaders', 'Implementation managers', 'Product managers', 'QA analysts'],
      outcomes: [
        'Read variables, functions, objects, arrays, and conditions',
        'Use the browser console to validate behavior',
        'Call an API using fetch and inspect asynchronous results',
        'Understand data layers, event listeners, and tagging scripts',
      ],
      modules: [
        m('JavaScript in a web application', 'Understand where JavaScript runs and how it interacts with HTML, CSS, APIs, and the browser.', [
          'Browser runtime and page lifecycle',
          'Scripts, modules, packages, and builds',
          'Console, network panel, and source maps',
          'Client-side risk and privacy considerations',
        ]),
        m('Core syntax', 'Build enough fluency to read and reason about small scripts.', [
          'Variables and primitive types',
          'Arrays and objects',
          'Conditions and loops',
          'Functions and scope',
        ]),
        m('Working with JSON and events', 'Connect common implementation payloads to browser behavior.', [
          'JSON parsing and serialization',
          'DOM selection and events',
          'Data layers and event payloads',
          'Defensive checks for missing values',
        ], 'Inspect a synthetic data layer and verify required analytics fields.'),
        m('Asynchronous JavaScript', 'Understand promises and why integration results do not arrive immediately.', [
          'Promises and async/await',
          'fetch requests',
          'Error handling with try/catch',
          'Timeouts and user feedback',
        ]),
        m('Analytics implementation patterns', 'Connect JavaScript skills to Adobe and tag-management work.', [
          'Page-view and interaction events',
          'Event-driven data collection',
          'Tag rules and custom code',
          'Consent-aware firing conditions',
        ]),
        m('Testing and safe changes', 'Make small changes without turning production into a laboratory.', [
          'Unit checks and console assertions',
          'DevTools breakpoints',
          'Feature flags and staged rollout',
          'Code review and rollback',
        ], 'Build a browser-based analytics payload validator with clear pass/fail output.'),
      ],
      capstone: 'Create a small client-side validator that checks a healthcare journey event before it is sent.',
      artifact: 'JavaScript validation script, test cases, implementation notes, and deployment checklist.',
      interviewTranslation:
        'Explain how you partnered with engineers on automated tag validation and how you would inspect a broken event in the browser.',
      visual: {
        title: 'Browser event to analytics destination',
        steps: ['User action', 'JavaScript event', 'Data layer', 'Tag rule', 'Web SDK', 'Analytics'],
      },
      resources: [
        {
          label: 'MDN JavaScript guide',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          type: 'Official documentation',
        },
        {
          label: 'MDN Fetch API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
          type: 'Official documentation',
        },
      ],
      resumeBridge:
        'Your CVS experience already included Tealium iQ, Adobe Analytics, tagging specifications, and automated validation. JavaScript makes that work easier to demonstrate.',
    },
  {
      id: 'python-ai-automation',
      order: 4,
      code: 'ORI-140',
      title: 'Python and AI-Assisted Automation',
      shortTitle: 'Python + AI',
      description:
        'Use Python to automate repetitive implementation work while applying disciplined AI prompting, review, testing, and security practices.',
      category: 'Engineering fluency',
      difficulty: 'Foundation',
      hours: 24,
      priority: 'High',
      audience: ['Implementation leaders', 'Product operations', 'Data analysts', 'Automation-minded managers'],
      outcomes: [
        'Write and explain basic Python programs',
        'Read files and analyze tabular data with pandas',
        'Call APIs and handle errors safely',
        'Use AI to accelerate code without outsourcing judgment',
      ],
      modules: [
        m('Python setup and mental model', 'Understand scripts, notebooks, packages, and virtual environments.', [
          'Python runtime and files',
          'Variables, types, and expressions',
          'Installing packages and isolated environments',
          'Running code in an editor and terminal',
        ]),
        m('Control flow and functions', 'Build small programs that are readable and reusable.', [
          'Conditions and loops',
          'Functions and return values',
          'Lists, dictionaries, and sets',
          'Input validation',
        ]),
        m('Files and structured data', 'Automate common implementation inputs and outputs.', [
          'Reading and writing CSV and JSON',
          'Paths and file organization',
          'Logging and exception handling',
          'Configuration files and secrets',
        ], 'Validate a client onboarding CSV against required fields and accepted values.'),
        m('Pandas for operational analysis', 'Use dataframes for reconciliation and data-quality reporting.', [
          'Loading dataframes',
          'Filtering, grouping, joining, and reshaping',
          'Missing values and duplicates',
          'Exporting exception reports',
        ]),
        m('Calling APIs with Python', 'Send requests and convert responses into useful outputs.', [
          'requests library concepts',
          'Authentication and headers',
          'Pagination and rate limits',
          'Retries and failure handling',
        ]),
        m('AI-assisted coding workflow', 'Use AI as a pair programmer under explicit controls.', [
          'Writing grounded coding prompts',
          'Supplying examples, constraints, and acceptance criteria',
          'Reviewing generated code line by line',
          'Testing, security checks, and provenance',
        ]),
        m('Automation packaging', 'Turn a working script into a repeatable team tool.', [
          'Command-line inputs',
          'README and usage documentation',
          'Test fixtures',
          'Scheduling and handoff considerations',
        ], 'Package a reusable file-validation tool with sample data and test cases.'),
      ],
      capstone: 'Automate the reconciliation of client rosters, release files, and exception outputs.',
      artifact: 'Python application, sample inputs, test cases, generated report, README, and AI-use checklist.',
      interviewTranslation:
        'Show that you can automate operational work, review AI-generated code responsibly, and partner with engineers from a position of technical credibility.',
      visual: {
        title: 'Responsible AI-assisted automation',
        steps: ['Define rules', 'Prompt with context', 'Generate draft', 'Review code', 'Test', 'Document', 'Operate'],
      },
      resources: [
        {
          label: 'Official Python tutorial',
          url: 'https://docs.python.org/3/tutorial/',
          type: 'Official tutorial',
        },
        {
          label: 'pandas getting started',
          url: 'https://pandas.pydata.org/docs/getting_started/index.html',
          type: 'Official documentation',
        },
      ],
      resumeBridge:
        'Your resume lists Python and automation. This course creates a concrete repository artifact that proves both.',
    },
  {
      id: 'apis-webhooks-integration',
      order: 5,
      code: 'ORI-200',
      title: 'APIs, Webhooks, Postman, and Integration Design',
      shortTitle: 'APIs + Webhooks',
      description:
        'Build the highest-value technical fluency for implementation roles: request, authenticate, test, document, troubleshoot, and operationalize integrations.',
      category: 'Engineering fluency',
      difficulty: 'Intermediate',
      hours: 30,
      priority: 'Critical',
      audience: ['Implementation managers', 'Technical product managers', 'Solutions consultants', 'Integration analysts'],
      outcomes: [
        'Explain REST and HTTP in practical terms',
        'Authenticate and test APIs in Postman',
        'Read and write a basic OpenAPI specification',
        'Design secure, retry-safe webhook workflows',
      ],
      modules: [
        m('Integration architecture', 'Understand why systems integrate and choose an appropriate exchange pattern.', [
          'APIs, files, databases, events, and queues',
          'Synchronous versus asynchronous workflows',
          'Polling versus push',
          'System of record and ownership boundaries',
        ]),
        m('HTTP and REST fundamentals', 'Learn the mechanics behind common API conversations.', [
          'URLs, resources, endpoints, and methods',
          'Headers, query parameters, and bodies',
          'JSON payload design',
          'Status codes and error families',
        ], 'Send GET, POST, PATCH, and DELETE requests to a safe practice API.'),
        m('Authentication and security', 'Understand how APIs establish identity and authorize action.', [
          'API keys and Basic Auth',
          'Bearer tokens and OAuth 2.0 concepts',
          'Scopes and least privilege',
          'Secrets management and PHI-safe testing',
        ]),
        m('Postman execution workflow', 'Build reusable collections rather than one-off requests.', [
          'Collections and folders',
          'Environments and variables',
          'Pre-request scripts and tests',
          'Examples, mocks, and collection runs',
        ], 'Build a Postman collection with environment variables and automated response tests.'),
        m('Production API behavior', 'Design around real-world limits and failures.', [
          'Pagination and filtering',
          'Rate limits and backoff',
          'Timeouts, retries, and circuit breakers',
          'Idempotency and duplicate requests',
        ]),
        m('OpenAPI and implementation contracts', 'Use a language-agnostic API description to align teams.', [
          'Paths, operations, parameters, and schemas',
          'Response and error models',
          'Examples and reusable components',
          'Versioning and change compatibility',
        ], 'Document a pharmacy onboarding API using OpenAPI 3.2 concepts.'),
        m('Webhooks and event delivery', 'Receive events safely and prove what happened.', [
          'Subscriptions and event types',
          'Signatures and timestamp validation',
          'Acknowledgement, retries, and replay',
          'Dead-letter queues and observability',
        ], 'Design a signed implementation-status webhook with replay and duplicate protection.'),
        m('Troubleshooting and handoff', 'Narrow integration defects using evidence rather than escalation theater.', [
          'Request and response evidence',
          'Correlation IDs and timestamps',
          'Contract, data, authentication, and environment failures',
          'Client-facing integration runbooks',
        ]),
      ],
      capstone: 'Build and document a mocked pharmacy onboarding API with implementation-status webhooks.',
      artifact: 'Postman collection, OpenAPI file, webhook runbook, error catalog, test evidence, and client implementation guide.',
      interviewTranslation:
        'Walk an interviewer through a 401, 422, 429, and webhook duplicate scenario without needing an engineer to translate the problem.',
      visual: {
        title: 'Reliable API and webhook exchange',
        steps: ['Client request', 'Authenticate', 'Validate', 'Process', 'Respond', 'Emit event', 'Retry or close'],
      },
      resources: [
        {
          label: 'Postman quick start',
          url: 'https://learning.postman.com/docs/getting-started/quick-start',
          type: 'Official tutorial',
        },
        {
          label: 'Postman API design documentation',
          url: 'https://learning.postman.com/docs/design-apis/overview/',
          type: 'Official documentation',
        },
        {
          label: 'Postman webhook listeners',
          url: 'https://learning.postman.com/latest-v-12/docs/use/send-requests/protocols/webhooks',
          type: 'Official documentation',
        },
        {
          label: 'OpenAPI Specification 3.2.0',
          url: 'https://spec.openapis.org/oas/v3.2.0.html',
          type: 'Standard',
        },
        {
          label: 'Postman video channel',
          url: 'https://www.youtube.com/@postman',
          type: 'Video channel',
        },
      ],
      resumeBridge:
        'API fluency connects nearly every part of your background: implementation, automation, analytics, Adobe, healthcare data, and governance.',
    }
]
