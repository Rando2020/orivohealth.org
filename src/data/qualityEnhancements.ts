import type { CognitiveCategory, FullLesson, QuizQuestion, ReviewMetadata } from './lmsTypes'
import { getSourceById, getSourceByUrl } from './sourceRegistry'

const REVIEW_DATE = '2026-07-18'

export function reviewMetadata(contentVersion: string, knownLimitations: string[], sourceVersion?: string): ReviewMetadata {
  return {
    contentVersion,
    lastReviewed: REVIEW_DATE,
    reviewOwner: 'Orivo Academy curriculum review',
    reviewStatus: 'reviewed',
    sourceVersion,
    knownLimitations,
  }
}

function withRegisteredSources(lesson: FullLesson): FullLesson {
  return {
    ...lesson,
    sources: lesson.sources.map((source) => ({ ...source, sourceId: getSourceByUrl(source.url)?.id })),
  }
}

function addSection(lesson: FullLesson, heading: string, paragraph: string) {
  if (lesson.sections.some((section) => section.heading === heading)) return lesson
  return { ...lesson, sections: [...lesson.sections, { heading, paragraphs: [paragraph] }] }
}

function addSource(lesson: FullLesson, sourceId: string) {
  const source = getSourceById(sourceId)
  if (!source || lesson.sources.some((item) => item.sourceId === sourceId || item.url.replace(/\/$/, '') === source.url.replace(/\/$/, ''))) return lesson
  return { ...lesson, sources: [...lesson.sources, { sourceId, label: source.title, url: source.url, publisher: source.publisher }] }
}

export function enhanceApiLessons(lessons: FullLesson[]) {
  return lessons.map((original) => {
    let lesson = withRegisteredSources(original)
    if (lesson.id === 'oauth-flow') {
      lesson = addSection(lesson, 'Current OAuth security posture', 'OAuth 2.0 implementation guidance has evolved beyond the original framework. Use authorization code with PKCE for user-facing applications, validate issuer and audience, avoid deprecated grants, constrain redirect URIs, and follow the current OAuth security best-current-practice rather than copying legacy examples.')
      lesson = addSource(lesson, 'oauth-rfc-9700')
    }
    if (lesson.id === 'credential-patterns') {
      lesson = addSection(lesson, 'Credential evidence boundary', 'Support evidence should demonstrate the credential mechanism without preserving usable values. Redact secrets at collection, application, gateway, and ticketing layers, and verify rotation with a non-secret identifier or timestamp rather than a copied token.')
    }
    if (lesson.id === 'signatures-replay') {
      lesson = addSection(lesson, 'Verification sequence', 'Preserve the exact received bytes, locate the documented signature and timestamp headers, recompute the digest with the active secret, compare without timing leakage, enforce an age window, and deduplicate the logical event before allowing a business side effect.')
    }
    if (lesson.id === 'pagination-filtering') {
      lesson = addSection(lesson, 'Completeness evidence', 'A pagination implementation is complete only when it follows the documented continuation mechanism to termination and reconciles stable identifiers. A response count equal to page size is not proof that more pages exist, and a short page is not universally proof of completion unless the contract says so.')
    }
    return { ...lesson, review: reviewMetadata('2.1.0', ['Vendor interfaces and product UI labels may change.', 'Labs use synthetic examples and do not establish regulatory compliance.'], 'RFC 9110, OpenAPI 3.2.0, OWASP API Security 2023') }
  })
}

export function enhanceSqlLessons(lessons: FullLesson[]) {
  return lessons.map((original) => {
    let lesson = withRegisteredSources(original)
    if (lesson.id === 'full-anti') {
      lesson = addSection(lesson, 'Dialect portability', 'FULL OUTER JOIN support and syntax vary by engine and version. The learner baseline should use the provided SQLite-compatible reconciliation pattern, while production work should confirm the target engine documentation before assuming portability.')
    }
    if (lesson.id === 'null-logic') {
      lesson = addSection(lesson, 'Null is not a business value', 'SQL null represents missing or unknown information, but the business meaning must still be defined field by field. Do not silently convert unknown dates, owners, or monetary values to zero merely to simplify a report.')
    }
    if (lesson.id === 'window-model') {
      lesson = addSection(lesson, 'Explicit frames and ties', 'For cumulative and rolling calculations, specify the window frame when the default could change the business result. Add deterministic ordering keys and test tied timestamps, duplicate dates, and missing periods.')
    }
    if (lesson.id === 'warehouses-roles') {
      lesson = addSection(lesson, 'Permission diagnosis sequence', 'Separate object visibility, object privileges, warehouse use, and current role. Capture the exact error and current context before requesting broad access, and ask for the minimum privilege needed for the implementation task.')
    }
    if (lesson.id === 'ai-assisted-sql') {
      lesson = addSection(lesson, 'Untrusted-draft rule', 'Treat generated SQL as an untrusted draft. Verify every table, column, join, filter, null rule, grouping level, destructive keyword, and expected control total in an approved read-only environment before using the result as evidence.')
    }
    return { ...lesson, review: reviewMetadata('2.1.0', ['SQL behavior varies by dialect.', 'Snowflake and Informatica product behavior may change.', 'SQLite is the executable learner baseline, not a production architecture recommendation.'], 'PostgreSQL current, SQLite current, Snowflake current documentation') }
  })
}

function inferCategory(question: QuizQuestion): CognitiveCategory {
  if (question.cognitiveCategory) return question.cognitiveCategory
  const id = question.id.toLowerCase()
  const prompt = question.prompt.toLowerCase()
  if (id.includes('definition') || question.difficulty === 'foundation') return 'foundation'
  if (id.includes('application') || prompt.includes('scenario') || prompt.includes('most directly applied')) return 'implementation-scenario'
  if (id.includes('misconception') || id.includes('review') || prompt.includes('incorrect') || prompt.includes('problem')) return 'troubleshooting'
  if (prompt.includes('risk') || prompt.includes('control') || prompt.includes('should be challenged')) return 'risk-governance'
  return 'technical-interpretation'
}

function defaultQuestionSourceId(question: QuizQuestion) {
  if (question.courseId === 'apis-webhooks-integration') {
    const byModule: Record<string, string> = {
      m1: 'http-rfc-9110',
      m2: 'http-rfc-9110',
      m3: 'oauth-rfc-9700',
      m4: 'postman-docs',
      m5: 'http-rfc-9110',
      m6: 'openapi-3-2',
      m7: 'github-webhooks',
      m8: 'owasp-api-2023',
    }
    return byModule[question.moduleId]
  }
  if (question.courseId === 'sql-product-implementation') {
    if (question.moduleId === 'm10') return 'snowflake-docs'
    if (question.moduleId === 'm11') return 'informatica-cdi'
    return 'postgres-current'
  }
  return undefined
}

export function enhanceQuestions(questions: QuizQuestion[]) {
  return questions.map((question) => {
    const explicitSource = question.sourceUrl ? getSourceByUrl(question.sourceUrl) : undefined
    const sourceId = question.sourceId ?? explicitSource?.id ?? defaultQuestionSourceId(question)
    const source = sourceId ? getSourceById(sourceId) : undefined
    return {
      ...question,
      sourceId,
      sourceLabel: question.sourceLabel ?? source?.title,
      sourceUrl: question.sourceUrl ?? source?.url,
      cognitiveCategory: inferCategory(question),
      qualityNote: question.qualityNote ?? 'Structurally reviewed during the 2026 instructional-quality audit; generated-template questions remain flagged for continuing human review.',
    }
  })
}
