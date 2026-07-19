# Instructional Quality Audit

## Scope

This audit covers the two production courses present before the audit branch:

- ORI-200 APIs, Webhooks, Postman, and Integration Design
- ORI-110 SQL for Product and Implementation Leaders

Baseline scope:

- 76 lessons
- 19 modules
- 522 original source questions
- 19 module quizzes
- two final assessments
- two capstones

The branch adds 57 hand-authored applied questions after reviewing the original banks, bringing the runtime total to 579.

## Main findings

### 1. Structural integrity was stronger than instructional distinctness

The production-hardening work already prevented missing references, invalid answers, empty pools, and common progress failures. The larger instructional weakness was that the original question banks were generated from a repeated three-question concept pattern: definition, application label, and misconception. Those questions remain useful for retrieval practice, but the count overstated the number of independent reasoning tasks.

### 2. Applied assessment depth needed improvement

The audit adds three hand-authored questions per module. These questions use request examples, SQL fragments, small tables, operational evidence, multi-select controls, and risk decisions. The additions focus on the concepts requested in the audit, including idempotency, OAuth audience, webhook verification, null behavior, join multiplication, release reconciliation, Snowflake permissions, Informatica rejects, and AI-assisted SQL review.

### 3. Several high-risk lessons needed updated or more explicit boundaries

Corrections and additions were made to lessons covering:

- current OAuth security guidance and RFC 9700
- credential evidence and redaction
- webhook raw-body verification and replay sequence
- pagination completeness evidence
- SQL dialect portability
- null business meaning
- explicit window frames and deterministic ties
- Snowflake permission diagnosis
- AI-generated SQL as an untrusted draft

### 4. Source attribution was inconsistent at question level

The original API template questions did not all include direct question-level source metadata. The audit assigns every production question to a registered primary source by course and module, while preserving more specific existing sources when present.

### 5. Review metadata was missing

Every production course and lesson now receives:

- content version
- last reviewed date
- review owner
- review status
- relevant source version
- known limitations

### 6. Lab evidence existed, but validation needed a complete manifest

A machine-readable manifest is generated for all 76 labs. SQL labs identify the four downloadable files and automated SQLite validation. API labs identify manual validation steps for contracts, payloads, security, retries, and synthetic evidence.

### 7. Learners lacked a direct correction channel

An optional lesson-level feedback control and Supabase table were added. Signed-out learners can save a clearly labeled unsent draft. Signed-in learners can submit and read only their own feedback through Row Level Security.

## Scoring

Every lesson is scored against fifteen dimensions using the rubric in `INSTRUCTIONAL_QUALITY_STANDARD.md`. Module scores are calculated from their lesson scores.

The audit deliberately does not assign perfect scores by default. Concise lessons, brief answer guides, repeated takeaway language, high-update-sensitivity sources, and generated-template questions remain visible limitations.

The complete lesson and module score set is generated during CI as:

- `artifacts/instructional-quality-report.json`
- `artifacts/instructional-quality-report.md`
- `artifacts/lab-manifest.json`

## Remaining risks

- Structural and heuristic scoring cannot prove every claim is factually perfect.
- The original 522 template-generated questions still require periodic human review and selective replacement.
- Vendor documentation and interface details can change quickly.
- API labs are design and evidence exercises rather than calls to a maintained live sandbox.
- SQLite validates the SQL learning baseline but does not prove dialect equivalence with Snowflake or PostgreSQL.
- Learner feedback administration remains manual.
- Live Supabase feedback submission and two-user RLS isolation require deployment testing.
