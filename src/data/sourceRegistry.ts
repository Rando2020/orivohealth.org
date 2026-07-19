export type SourceType = 'standard' | 'official-documentation' | 'security-guidance' | 'specification'

export interface RegisteredSource {
  id: string
  publisher: string
  title: string
  url: string
  type: SourceType
  version?: string
  lastReviewed: string
  primary: boolean
  updateSensitivity: 'low' | 'medium' | 'high'
  reuseNotes: string
}

export const sourceRegistry: RegisteredSource[] = [
  { id: 'http-rfc-9110', publisher: 'IETF / RFC Editor', title: 'HTTP Semantics, RFC 9110', url: 'https://www.rfc-editor.org/rfc/rfc9110', type: 'standard', version: 'RFC 9110', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'low', reuseNotes: 'Summarize concepts. Do not republish long passages.' },
  { id: 'oauth-rfc-6749', publisher: 'IETF / RFC Editor', title: 'OAuth 2.0 Authorization Framework, RFC 6749', url: 'https://www.rfc-editor.org/rfc/rfc6749', type: 'standard', version: 'RFC 6749', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'low', reuseNotes: 'Use with the OAuth security best-current-practice source.' },
  { id: 'oauth-rfc-9700', publisher: 'IETF / RFC Editor', title: 'Best Current Practice for OAuth 2.0 Security, RFC 9700', url: 'https://www.rfc-editor.org/rfc/rfc9700', type: 'security-guidance', version: 'RFC 9700', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'Use for current OAuth security recommendations.' },
  { id: 'openapi-3-2', publisher: 'OpenAPI Initiative', title: 'OpenAPI Specification 3.2.0', url: 'https://spec.openapis.org/oas/v3.2.0.html', type: 'specification', version: '3.2.0', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'Create original examples and diagrams.' },
  { id: 'owasp-api-project', publisher: 'OWASP Foundation', title: 'OWASP API Security Project', url: 'https://owasp.org/API-Security/', type: 'security-guidance', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'Use for project-level guidance and link to a specific edition for risk details.' },
  { id: 'owasp-api-2023', publisher: 'OWASP Foundation', title: 'OWASP API Security Top 10, 2023 edition', url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/', type: 'security-guidance', version: '2023', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'Use as risk guidance, not as a compliance certification.' },
  { id: 'postman-docs', publisher: 'Postman', title: 'Postman Documentation', url: 'https://learning.postman.com/docs/getting-started/overview/', type: 'official-documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'high', reuseNotes: 'UI details may change. Teach durable workflow concepts.' },
  { id: 'github-webhooks', publisher: 'GitHub', title: 'GitHub Webhooks Documentation', url: 'https://docs.github.com/en/webhooks', type: 'official-documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'high', reuseNotes: 'Use as an implementation example, not a universal webhook specification.' },
  { id: 'postgres-current', publisher: 'PostgreSQL Global Development Group', title: 'PostgreSQL SQL Language', url: 'https://www.postgresql.org/docs/current/sql.html', type: 'official-documentation', version: 'Current supported documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'Call out dialect-specific behavior when relevant.' },
  { id: 'sqlite-language', publisher: 'SQLite', title: 'SQLite SQL Language', url: 'https://www.sqlite.org/lang.html', type: 'official-documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'SQLite is the executable baseline for learner labs.' },
  { id: 'duckdb-sql', publisher: 'DuckDB Foundation', title: 'DuckDB SQL Introduction', url: 'https://duckdb.org/docs/stable/sql/introduction', type: 'official-documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'medium', reuseNotes: 'Use to compare analytical SQL concepts, not to imply identical dialect behavior.' },
  { id: 'snowflake-docs', publisher: 'Snowflake', title: 'Snowflake Documentation', url: 'https://docs.snowflake.com/', type: 'official-documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'high', reuseNotes: 'Features, interface labels, limits, and pricing-related behavior may change.' },
  { id: 'informatica-cdi', publisher: 'Informatica', title: 'Cloud Data Integration Documentation', url: 'https://docs.informatica.com/integration-cloud/data-integration/current-version.html', type: 'official-documentation', lastReviewed: '2026-07-18', primary: true, updateSensitivity: 'high', reuseNotes: 'Terminology can vary by product generation and tenant.' },
]

const byUrl = new Map(sourceRegistry.map((source) => [source.url.replace(/\/$/, ''), source]))
const byId = new Map(sourceRegistry.map((source) => [source.id, source]))

export function getSourceById(id: string) {
  return byId.get(id)
}

export function getSourceByUrl(url: string) {
  return byUrl.get(url.replace(/\/$/, ''))
}
