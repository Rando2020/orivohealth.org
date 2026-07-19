# Question Bank Audit

## Baseline

- ORI-200 original bank: 192 questions
- ORI-110 original bank: 330 questions
- Original total reviewed: 522 questions
- Hand-authored applied additions: 57 questions
- Runtime total after audit: 579 questions

## Findings

The original banks were structurally valid but heavily dependent on a repeated concept template. A large share of the questions tested whether learners could identify a definition, label a concept, or recognize a misconception. This created useful retrieval practice but less evidence of applied implementation judgment than the raw count implied.

The audit therefore:

- preserves the original questions for broad retrieval coverage
- labels every question with a cognitive category
- assigns a registered primary source to every question
- reports templated questions separately
- adds three hand-authored questions per module
- introduces more code, table, multi-select, troubleshooting, and governance decisions
- fails CI for exact duplicate prompts and invalid answer structures
- reports near duplicates for human review without using an arbitrary similarity score as an automatic failure

## Added coverage

### API

The added questions cover:

- pattern selection
- timeout uncertainty
- integration-contract controls
- HTTP methods and status decisions
- resource-level authorization
- OAuth audience
- credential handling
- Postman business assertions
- mock limitations
- pagination completion
- bounded retries
- idempotency conflicts
- OpenAPI breaking changes
- webhook raw-body verification
- replay protection
- operational-readiness evidence

### SQL

The added questions cover:

- table grain
- leading-zero identifiers
- many-to-many join risk
- environment context
- ERD validation
- null filters
- boolean precedence
- aggregation denominators
- join multiplication
- LEFT JOIN filter mistakes
- duplicate survivorship
- scalar subquery cardinality
- CTE debugging
- window ranking and frames
- release churn
- predefined thresholds
- Snowflake privileges
- Informatica rejects
- AI-generated SQL review

## CI artifact

Exact distributions and review queues are generated in `artifacts/instructional-quality-report.json`, including:

- question counts by module
- difficulty distribution
- question-type distribution
- cognitive distribution
- source distribution
- answer-position distribution
- exact duplicates
- near-duplicate pairs
- reused option sets
- generated-template count
- application and troubleshooting percentage
