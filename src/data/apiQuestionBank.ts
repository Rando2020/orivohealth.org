import type { QuizDefinition, QuizQuestion } from './lmsTypes'

interface Concept {
  term: string
  definition: string
  misconception: string
  application: string
  wrongTerms: string[]
}

const moduleConcepts: Record<string, Concept[]> = {
  m1: [
    { term: 'system of record', definition: 'the authoritative owner for a specific entity, field, or business state', misconception: 'one application must own every field', application: 'resolving conflicting pharmacy address values', wrongTerms: ['transport protocol', 'retry queue', 'response cache'] },
    { term: 'synchronous integration', definition: 'an exchange where the caller waits for the receiver to return a result', misconception: 'it always guarantees the work completed exactly once', application: 'real-time eligibility validation before displaying a benefit', wrongTerms: ['nightly batch', 'webhook subscription', 'dead-letter queue'] },
    { term: 'asynchronous job', definition: 'work accepted now and completed later with durable status tracking', misconception: '202 Accepted means the business outcome is complete', application: 'processing a 600,000-row roster import', wrongTerms: ['browser cache', 'direct database read', 'DNS lookup'] },
    { term: 'temporal coupling', definition: 'a dependency that requires systems to be available at the same moment', misconception: 'it describes only shared database schemas', application: 'a caller waiting on a live downstream response', wrongTerms: ['field ownership', 'schema reuse', 'data retention'] },
    { term: 'integration contract', definition: 'the combined business, data, security, operational, and change agreement between systems', misconception: 'a sample JSON payload is sufficient', application: 'aligning duplicate handling, retries, and support before build', wrongTerms: ['single screenshot', 'release note only', 'database index'] },
    { term: 'polling', definition: 'a consumer repeatedly requests current state on a schedule', misconception: 'it is always more efficient than event delivery', application: 'checking a long-running job status every minute', wrongTerms: ['push notification', 'schema validation', 'token exchange'] },
    { term: 'webhook', definition: 'an HTTP delivery initiated by a producer when an event occurs', misconception: 'it replaces the need for current-state reconciliation in every case', application: 'notifying a client when launch status changes', wrongTerms: ['SQL view', 'static file', 'browser cookie'] },
    { term: 'replay', definition: 'controlled redelivery or reprocessing of previously recorded work', misconception: 'it should bypass audit and duplicate controls', application: 'recovering a failed onboarding event after a dependency outage', wrongTerms: ['caching', 'compression', 'pagination'] },
  ],
  m2: [
    { term: 'path parameter', definition: 'a value in the URL path that identifies a resource or nested resource', misconception: 'it is the safest place for secrets', application: 'identifying pharmacy 123 in /pharmacies/123', wrongTerms: ['response header', 'JSON body', 'TLS certificate'] },
    { term: 'query parameter', definition: 'a URL value commonly used for filtering, sorting, pagination, or representation', misconception: 'it should carry sensitive patient details', application: 'requesting page_size=100', wrongTerms: ['access token', 'request body', 'server log'] },
    { term: 'idempotency', definition: 'repeated requests have the same intended business effect as one request', misconception: 'every POST is automatically idempotent', application: 'safely retrying pharmacy creation after a timeout', wrongTerms: ['authentication', 'compression', 'encryption'] },
    { term: 'Content-Type', definition: 'the media type of the representation being sent', misconception: 'it specifies the only response type the client accepts', application: 'declaring an application/json request body', wrongTerms: ['Accept', 'Location', 'Retry-After'] },
    { term: 'Accept', definition: 'the response media types the client can process', misconception: 'it authenticates the client', application: 'requesting an application/json response', wrongTerms: ['Authorization', 'Content-Length', 'Host'] },
    { term: '401 response', definition: 'authentication is missing, invalid, or otherwise not accepted', misconception: 'the caller is authenticated but lacks permission', application: 'an expired bearer token', wrongTerms: ['validation success', 'rate limit', 'state conflict'] },
    { term: '403 response', definition: 'the identity is understood but not permitted to perform the action', misconception: 'it always means the token is malformed', application: 'a valid user requesting another tenant’s data', wrongTerms: ['resource creation', 'gateway timeout', 'pagination complete'] },
    { term: '422 response', definition: 'the request representation is understood but violates semantic or business validation', misconception: 'it is the best response for every server crash', application: 'termination date before effective date', wrongTerms: ['authentication failure', 'service unavailable', 'redirect'] },
  ],
  m3: [
    { term: 'authentication', definition: 'establishing the identity of a user, application, or workload', misconception: 'it determines every resource the identity may access', application: 'validating a service credential', wrongTerms: ['pagination', 'serialization', 'caching'] },
    { term: 'authorization', definition: 'deciding what an authenticated identity may do', misconception: 'it is identical to password verification', application: 'checking payer and scope access', wrongTerms: ['compression', 'DNS routing', 'schema generation'] },
    { term: 'bearer token', definition: 'a credential usable by whoever possesses it', misconception: 'it is safe to publish because it expires eventually', application: 'authorizing an API request', wrongTerms: ['public schema', 'correlation ID', 'event type'] },
    { term: 'Basic Authentication', definition: 'username and password credentials encoded for an HTTP Authorization header and protected by TLS', misconception: 'base64 encoding encrypts the credentials', application: 'a legacy server-to-server integration', wrongTerms: ['HMAC signature', 'pagination cursor', 'ETag'] },
    { term: 'OAuth scope', definition: 'a named capability granted to an access token', misconception: 'broader scopes are safer because they prevent future changes', application: 'granting pharmacies.read without pharmacies.write', wrongTerms: ['server hostname', 'JSON format', 'retry count'] },
    { term: 'OAuth audience', definition: 'the intended resource server for a token', misconception: 'any API should accept a valid token regardless of audience', application: 'rejecting a token issued for a different API', wrongTerms: ['page size', 'event timestamp', 'field format'] },
    { term: 'least privilege', definition: 'granting only the access needed for the intended task and duration', misconception: 'internal users should receive administrative access by default', application: 'a read-only batch service identity', wrongTerms: ['maximum retention', 'unlimited retries', 'global cache'] },
    { term: 'synthetic test data', definition: 'fabricated data designed to exercise scenarios without exposing real individuals', misconception: 'a copy of production data with a different filename', application: 'testing pharmacy onboarding without PHI', wrongTerms: ['access token', 'live patient file', 'private key'] },
  ],
  m4: [
    { term: 'Postman collection', definition: 'an organized set of reusable requests, examples, scripts, and documentation', misconception: 'a personal request history is automatically client-ready', application: 'packaging onboarding workflows', wrongTerms: ['database schema', 'DNS zone', 'TLS cipher'] },
    { term: 'environment variable', definition: 'a deployment-specific value such as base URL or token reference', misconception: 'the environment name guarantees every value is correct', application: 'switching from staging to production', wrongTerms: ['response schema', 'event signature', 'HTTP method'] },
    { term: 'collection variable', definition: 'a value shared by requests in a collection, often used for workflow state', misconception: 'it should contain exported production secrets', application: 'storing a created pharmacy ID', wrongTerms: ['firewall rule', 'database role', 'DNS record'] },
    { term: 'Postman test', definition: 'a script assertion that validates response and business expectations', misconception: 'a 200 status alone proves the workflow is correct', application: 'checking returned payer and pharmacy IDs', wrongTerms: ['visual theme', 'browser extension', 'network proxy'] },
    { term: 'collection runner', definition: 'a repeatable execution of requests and tests against data and an environment', misconception: 'it removes the need to control test data', application: 'executing positive and negative onboarding cases', wrongTerms: ['OAuth provider', 'database trigger', 'webhook secret'] },
    { term: 'saved example', definition: 'a stored request and response illustration for documentation and mocks', misconception: 'it guarantees the live API behaves identically', application: 'showing a 422 validation response', wrongTerms: ['production log', 'access policy', 'load balancer'] },
    { term: 'mock server', definition: 'a simulated endpoint that returns agreed examples before or independent of live implementation', misconception: 'a successful mock proves production readiness', application: 'allowing parallel client development', wrongTerms: ['identity provider', 'job queue', 'data warehouse'] },
    { term: 'pre-request script', definition: 'code executed before a request to prepare values or enforce conditions', misconception: 'it is the correct place to hard-code shared secrets', application: 'checking expected host or creating a timestamp', wrongTerms: ['response body', 'database migration', 'certificate authority'] },
  ],
  m5: [
    { term: 'offset pagination', definition: 'paging using a numeric offset and limit', misconception: 'it is always stable while records are inserted or deleted', application: 'retrieving page 4 with offset 300', wrongTerms: ['HMAC signing', 'token exchange', 'schema reference'] },
    { term: 'cursor pagination', definition: 'paging using an opaque continuation marker tied to a stable position', misconception: 'the cursor should be interpreted and edited by the client', application: 'reading a changing pharmacy collection', wrongTerms: ['access scope', 'event secret', 'status family'] },
    { term: 'rate limit', definition: 'a policy restricting request volume or concurrency over time', misconception: '429 means the request is permanently invalid', application: 'protecting a shared API from bursts', wrongTerms: ['field validation', 'resource ownership', 'schema version'] },
    { term: 'exponential backoff', definition: 'retry delays that grow after repeated transient failures', misconception: 'all workers should retry at the exact same time', application: 'recovering after 429 or selected 503 responses', wrongTerms: ['fixed schema', 'role mapping', 'content negotiation'] },
    { term: 'jitter', definition: 'random variation added to retry timing to avoid synchronized retries', misconception: 'it makes retry timing less reliable and should be removed', application: 'preventing a retry storm', wrongTerms: ['encryption salt', 'pagination limit', 'JSON property'] },
    { term: 'circuit breaker', definition: 'a control that temporarily stops calls to an unhealthy dependency', misconception: 'it guarantees the dependency recovers', application: 'preventing cascading failure during an outage', wrongTerms: ['schema validator', 'API key', 'query filter'] },
    { term: 'idempotency key', definition: 'a client-provided identifier used to recognize retries of the same intended operation', misconception: 'the same key should be reused for different payloads', application: 'deduplicating repeated create requests', wrongTerms: ['access token', 'page cursor', 'error message'] },
    { term: 'duplicate event control', definition: 'stored event identity and processing outcome used to avoid repeated side effects', misconception: 'in-memory deduplication is enough for durable systems', application: 'handling repeated webhook deliveries', wrongTerms: ['URL routing', 'media type', 'role name'] },
  ],
  m6: [
    { term: 'OpenAPI paths object', definition: 'the section describing endpoint paths and their operations', misconception: 'it stores user passwords', application: 'documenting /v1/pharmacies', wrongTerms: ['database table', 'DNS host', 'OAuth tenant'] },
    { term: 'OpenAPI components', definition: 'reusable schemas, parameters, responses, examples, and security definitions', misconception: 'reuse makes the specification less consistent', application: 'sharing a standard error schema', wrongTerms: ['runtime logs', 'client secrets', 'load tests'] },
    { term: 'schema required field', definition: 'a property that must be present in the representation', misconception: 'required means the value can never be null unless null is separately allowed', application: 'requiring externalPharmacyId', wrongTerms: ['optional response', 'HTTP header', 'page cursor'] },
    { term: 'example', definition: 'a representative payload that helps people understand intended use', misconception: 'it replaces machine-readable constraints', application: 'showing a valid pharmacy object', wrongTerms: ['access policy', 'network route', 'retry schedule'] },
    { term: 'stable error code', definition: 'a machine-readable identifier whose meaning is maintained for clients', misconception: 'clients should parse changing message prose instead', application: 'PHARMACY_ID_CONFLICT', wrongTerms: ['display label', 'stack trace', 'database password'] },
    { term: 'backward-compatible change', definition: 'a change existing tolerant clients can continue to process without modification', misconception: 'making an optional request field required is compatible', application: 'adding an optional response field', wrongTerms: ['removing an enum value', 'changing string to number', 'renaming a required field'] },
    { term: 'breaking change', definition: 'a contract change that can cause existing clients to fail or behave incorrectly', misconception: 'versioning makes migration communication unnecessary', application: 'changing field meaning or type', wrongTerms: ['adding documentation', 'fixing a typo in prose', 'adding an optional example'] },
    { term: 'deprecation', definition: 'a communicated period during which old behavior remains available while clients migrate', misconception: 'it means disabling the old version immediately', application: 'retiring v1 after measured migration', wrongTerms: ['token refresh', 'pagination', 'retry jitter'] },
  ],
  m7: [
    { term: 'webhook event ID', definition: 'a stable identifier for the logical event used for traceability and deduplication', misconception: 'every delivery attempt should create a new event ID', application: 'recognizing repeated delivery of the same status change', wrongTerms: ['access token', 'page number', 'schema title'] },
    { term: 'delivery attempt ID', definition: 'an identifier for one attempt to send an event', misconception: 'it should replace the logical event ID', application: 'tracing the third retry separately', wrongTerms: ['resource owner', 'OAuth scope', 'content type'] },
    { term: 'HMAC signature', definition: 'a keyed digest used to verify message authenticity and integrity', misconception: 'the shared secret should be included in the payload', application: 'signing a webhook raw body', wrongTerms: ['pagination cursor', 'HTTP method', 'response cache'] },
    { term: 'raw body verification', definition: 'computing a signature over the exact received bytes before parsing changes them', misconception: 'parse and reserialize always produces identical bytes', application: 'verifying a signed webhook', wrongTerms: ['query filtering', 'schema versioning', 'role mapping'] },
    { term: 'timestamp tolerance', definition: 'an allowed age window for signed messages that limits replay', misconception: 'a valid signature should be accepted forever', application: 'rejecting a two-day-old replay', wrongTerms: ['page size', 'response format', 'tenant role'] },
    { term: 'fast acknowledgement', definition: 'returning an expected 2xx after validation and durable receipt without waiting for long downstream work', misconception: 'acknowledgement should occur before durable storage', application: 'accepting an event while an EHR is slow', wrongTerms: ['client authentication', 'field mapping', 'schema reuse'] },
    { term: 'webhook retry', definition: 'provider redelivery after failure or missing acknowledgement according to policy', misconception: 'retries should repeat side effects without deduplication', application: 'recovering from a temporary consumer outage', wrongTerms: ['data sorting', 'OAuth login', 'media negotiation'] },
    { term: 'manual replay', definition: 'authorized redelivery initiated for recovery with audit and duplicate controls', misconception: 'support users should replay silently without recording it', application: 'recovering a failed production event', wrongTerms: ['browser refresh', 'field validation', 'DNS update'] },
  ],
  m8: [
    { term: 'failure domain', definition: 'the layer or responsibility area where an integration problem originates', misconception: 'all 5xx responses prove application code is defective', application: 'separating gateway, service, dependency, and client failures', wrongTerms: ['page style', 'course module', 'email template'] },
    { term: 'correlation ID', definition: 'an identifier propagated across components to connect logs for one transaction', misconception: 'a screenshot is an equivalent substitute', application: 'tracing client, gateway, service, queue, and webhook activity', wrongTerms: ['password', 'schema example', 'page cursor'] },
    { term: 'sanitized evidence package', definition: 'reproduction details and technical evidence with secrets and sensitive data removed', misconception: 'complete evidence requires sharing live credentials', application: 'escalating an intermittent API defect', wrongTerms: ['production key', 'patient file', 'private certificate'] },
    { term: 'runbook', definition: 'maintained operational guidance for normal work, failures, changes, and escalation', misconception: 'setup instructions alone are a complete runbook', application: 'credential rotation and incident response', wrongTerms: ['source code only', 'marketing page', 'database row'] },
    { term: 'go/no-go criteria', definition: 'predefined evidence thresholds used to approve or stop launch', misconception: 'a successful demo is sufficient for production approval', application: 'checking monitoring, replay, testing, and support readiness', wrongTerms: ['visual preference', 'team mood', 'calendar availability'] },
    { term: 'negative test', definition: 'a test that intentionally supplies invalid, unauthorized, duplicate, or excessive conditions', misconception: 'negative tests are unnecessary when happy paths pass', application: 'validating 401, 403, 422, 429, and duplicate behavior', wrongTerms: ['brand review', 'roadmap theme', 'font check'] },
    { term: 'root cause', definition: 'the underlying system condition that allowed an incident or defect to occur', misconception: 'the first visible error message is always the root cause', application: 'finding a missing idempotency control behind duplicate creation', wrongTerms: ['status update', 'meeting note', 'screen color'] },
    { term: 'operational readiness', definition: 'evidence that the integration can be monitored, supported, secured, recovered, and changed after launch', misconception: 'functional API success alone proves readiness', application: 'approving the pharmacy onboarding capstone', wrongTerms: ['logo approval', 'course enrollment', 'browser bookmark'] },
  ],
}

function options(correct: string, wrong: string[], prefix: string) {
  return [correct, ...wrong.slice(0, 3)].map((text, index) => ({ id: `${prefix}-${index}`, text }))
}

function conceptQuestions(moduleId: string, concept: Concept, index: number): QuizQuestion[] {
  const base = `${moduleId}-${index}`
  const definitionOptions = options(concept.definition, [concept.misconception, ...concept.wrongTerms], `${base}-d`)
  const termOptions = options(concept.term, concept.wrongTerms, `${base}-t`)
  const misconceptionOptions = options(concept.misconception, [concept.definition, concept.application, `a valid use of ${concept.term}`], `${base}-m`)
  return [
    {
      id: `${base}-definition`, courseId: 'apis-webhooks-integration', moduleId, type: 'single',
      prompt: `Which definition best describes ${concept.term}?`, options: definitionOptions,
      correctOptionIds: [definitionOptions[0].id], explanation: `${concept.term} is ${concept.definition}.`, difficulty: 'foundation',
    },
    {
      id: `${base}-application`, courseId: 'apis-webhooks-integration', moduleId, type: 'single',
      prompt: `Which concept is most directly applied when ${concept.application}?`, options: termOptions,
      correctOptionIds: [termOptions[0].id], explanation: `This is an application of ${concept.term}: ${concept.definition}.`, difficulty: 'application',
    },
    {
      id: `${base}-misconception`, courseId: 'apis-webhooks-integration', moduleId, type: 'single',
      prompt: `Which statement is a common misconception about ${concept.term}?`, options: misconceptionOptions,
      correctOptionIds: [misconceptionOptions[0].id], explanation: `The misconception is “${concept.misconception}.” The correct model is that ${concept.term} is ${concept.definition}.`, difficulty: 'advanced',
    },
  ]
}

export const apiQuestionBank: QuizQuestion[] = Object.entries(moduleConcepts).flatMap(([moduleId, concepts]) =>
  concepts.flatMap((concept, index) => conceptQuestions(moduleId, concept, index + 1)),
)

export const apiQuizDefinitions: QuizDefinition[] = [
  ...Object.keys(moduleConcepts).map((moduleId, index) => ({
    id: `apis-${moduleId}-quiz`,
    courseId: 'apis-webhooks-integration',
    moduleId,
    title: `Module ${index + 1} knowledge and application quiz`,
    description: 'A randomized assessment drawn from a 24-question module bank. Explanations appear after submission.',
    questionCount: 10,
    passingScore: 80,
  })),
  {
    id: 'apis-final-assessment',
    courseId: 'apis-webhooks-integration',
    title: 'API Integration final assessment',
    description: `A randomized 30-question assessment drawn from ${apiQuestionBank.length} questions across all eight modules.`,
    questionCount: 30,
    passingScore: 80,
  },
]

export function getQuizDefinition(quizId: string) {
  return apiQuizDefinitions.find((quiz) => quiz.id === quizId)
}

export function getQuestionPool(quiz: QuizDefinition) {
  return quiz.moduleId ? apiQuestionBank.filter((question) => question.moduleId === quiz.moduleId) : apiQuestionBank
}

export function randomizeQuestions(pool: QuizQuestion[], count: number) {
  const shuffled = [...pool]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((question) => ({
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5),
  }))
}
