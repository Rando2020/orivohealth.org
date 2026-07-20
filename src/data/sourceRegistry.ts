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
  { id: 'github-actions', publisher: 'GitHub', title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Workflow syntax, hosted runner images, interfaces, limits, and plan availability can change.' },
  { id: 'github-actions-reference', publisher: 'GitHub', title: 'Workflows and Actions Reference', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Use current syntax examples and avoid implying every feature is available on every plan.' },
  { id: 'github-deployments', publisher: 'GitHub', title: 'Deployments and Environments', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Protection rules, environments, secrets, and plan availability change. Validate before implementation.' },
  { id: 'github-pull-requests', publisher: 'GitHub', title: 'Collaborating with Pull Requests', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Teach durable review and evidence concepts rather than memorizing interface locations.' },
  { id: 'github-protected-branches', publisher: 'GitHub', title: 'About Protected Branches', url: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Rulesets, branch protection, merge queues, and plan behavior may change.' },
  { id: 'jenkins-pipeline', publisher: 'Jenkins Project', title: 'Jenkins Pipeline', url: 'https://www.jenkins.io/doc/book/pipeline/', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Plugin availability and organization-specific shared libraries can change behavior.' },
  { id: 'jenkins-pipeline-syntax', publisher: 'Jenkins Project', title: 'Pipeline Syntax', url: 'https://www.jenkins.io/doc/book/pipeline/syntax/', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Examples use Declarative Pipeline unless explicitly labeled otherwise.' },
  { id: 'opentelemetry-signals', publisher: 'OpenTelemetry', title: 'OpenTelemetry Signals', url: 'https://opentelemetry.io/docs/concepts/signals/', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Signal and language support status can change. Teach logs, metrics, and traces as complementary evidence.' },
  { id: 'google-sre-slo', publisher: 'Google', title: 'Service Level Objectives', url: 'https://sre.google/sre-book/service-level-objectives/', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'medium', reuseNotes: 'Use the framework to support decisions, not as a universal target-setting formula.' },
  { id: 'google-sre-postmortem', publisher: 'Google', title: 'Postmortem Culture: Learning from Failure', url: 'https://sre.google/sre-book/postmortem-culture/', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'medium', reuseNotes: 'Adapt practices to organizational context and preserve a learning-oriented, non-punitive approach.' },
  { id: 'nist-ssdf-1-1', publisher: 'NIST', title: 'Secure Software Development Framework Version 1.1', url: 'https://csrc.nist.gov/pubs/sp/800/218/final', type: 'security-guidance', version: 'SP 800-218, Version 1.1 final', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'medium', reuseNotes: 'Version 1.2 remained an initial public draft at review time. Treat 1.1 as the final baseline and monitor NIST updates.' },
  { id: 'semver-2', publisher: 'Semantic Versioning', title: 'Semantic Versioning 2.0.0', url: 'https://semver.org/spec/v2.0.0.html', type: 'specification', version: '2.0.0', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'low', reuseNotes: 'Semantic versioning requires a declared public API and does not replace release notes or compatibility testing.' },
  { id: 'twelve-factor-config', publisher: 'The Twelve-Factor App', title: 'III. Config', url: 'https://www.12factor.net/config', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'low', reuseNotes: 'Use as a durable configuration-separation principle, not a complete secrets-management standard.' },
  { id: 'owasp-cicd-security', publisher: 'OWASP Foundation', title: 'CI/CD Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html', type: 'security-guidance', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'medium', reuseNotes: 'Use as risk guidance. It is not a certification or proof that a pipeline is secure.' },
  { id: 'aws-deployment-strategies', publisher: 'Amazon Web Services', title: 'Deployment Strategies', url: 'https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/deployment-strategies.html', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'medium', reuseNotes: 'Extract general strategy concepts and call out cloud-specific implementation details.' },
  { id: 'microsoft-safe-deployments', publisher: 'Microsoft', title: 'Architecture Strategies for Safe Deployment Practices', url: 'https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments', type: 'official-documentation', lastReviewed: '2026-07-20', primary: true, updateSensitivity: 'high', reuseNotes: 'Use progressive exposure and bake-time concepts without implying Azure is required.' },
]

const byUrl = new Map(sourceRegistry.map((source) => [source.url.replace(/\/$/, ''), source]))
const byId = new Map(sourceRegistry.map((source) => [source.id, source]))

export function getSourceById(id: string) {
  return byId.get(id)
}

export function getSourceByUrl(url: string) {
  return byUrl.get(url.replace(/\/$/, ''))
}
