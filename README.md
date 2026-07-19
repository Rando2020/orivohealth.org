# Orivo Health Academy

A portfolio-first technical learning platform for healthcare product, implementation, data, analytics, governance, and project-delivery leaders.

## Current LMS release

- 16 connected courses and four role-based learning paths
- Two fully authored production courses registered through a reusable LMS registry
- ORI-200 APIs: 32 lessons, eight modules, 192 original questions, 24 curated applied questions, and a 30-question final
- ORI-110 SQL: 44 lessons, 11 modules, 330 original questions, 33 curated applied questions, and a 40-question final
- 76 production lessons and 579 runtime assessment questions after the quality audit
- Written instruction, decision scenarios, guided labs, answer guidance, credited visuals, and portfolio capstones
- Randomized module quizzes, 80% passing score, unlimited retakes, and answer explanations
- Email/password and Google authentication through Supabase
- Local demo progress when Supabase is not configured
- Cross-device lesson progress and quiz-attempt storage when signed in
- Optional lesson feedback with local drafts and signed-in Supabase submission
- Vercel SPA routing and production security headers
- Automated registry, source, assessment, scoring, SQLite, build, and browser smoke validation
- Machine-readable lesson, module, question-bank, and lab audit artifacts

## Production course registry

`src/data/productionCourseRegistry.ts` registers lessons, modules, question banks, quiz definitions, capstones, downloads, and review metadata. Generic course, lesson, quiz, and dashboard pages resolve content through the registry.

`src/data/registryValidation.ts` validates:

- course, module, lesson, quiz, and question references
- duplicate IDs
- exact normalized prompt duplicates
- correct-option integrity
- registered primary sources
- cognitive categories
- review metadata
- complete labs and answer guides
- quiz pool capacity

## Instructional quality system

- `src/data/instructionalQuality.ts`: fifteen-dimension lesson and module scoring plus question-bank analysis
- `src/data/sourceRegistry.ts`: centralized primary sources, versions, review dates, and update sensitivity
- `src/data/labManifest.ts`: one validation record for every production lesson lab
- `src/data/curatedQualityQuestions.ts`: 57 hand-authored applied, troubleshooting, interpretation, and governance questions
- `src/data/qualityEnhancements.ts`: review metadata, source assignment, and high-risk lesson corrections
- `artifacts/instructional-quality-report.json`: generated lesson, module, and bank audit
- `artifacts/instructional-quality-report.md`: human-readable CI summary
- `artifacts/lab-manifest.json`: generated 76-lab manifest

The original 522 generated questions remain part of the retrieval-practice baseline, but the audit reports their templated structure separately. Raw question volume is not treated as proof of independent reasoning coverage.

## SQL course practice database

The SQL course includes an SQLite-compatible synthetic healthcare implementation database under `public/downloads/sql-course/`:

1. `01_schema.sql`
2. `02_seed_data.sql`
3. `03_lab_queries.sql`
4. `04_answer_queries.sql`

The dataset includes clients, payers, pharmacies, locations, mappings, implementations, milestones, synthetic members, eligibility, claims, measures, releases, validation results, defects, and incidents. It intentionally includes nulls, duplicate business keys, invalid dates, missing relationships, stale loads, and conflicting statuses.

### Run with SQLite

```bash
sqlite3 orivo_course.db < public/downloads/sql-course/01_schema.sql
sqlite3 orivo_course.db < public/downloads/sql-course/02_seed_data.sql
sqlite3 orivo_course.db
```

Inside SQLite:

```sql
.headers on
.mode column
.read public/downloads/sql-course/03_lab_queries.sql
```

Validate the complete downloadable dataset with:

```bash
npm run test:sql
```

SQLite is the supported learner baseline because it is free, local, and requires no learner account or cloud data upload.

## Curriculum

1. Systems, Environments, and Deployment Foundations
2. SQL for Product and Implementation Leaders
3. Snowflake and Informatica Data Operations
4. JavaScript for Technical Implementers
5. Python and AI-Assisted Automation
6. APIs, Webhooks, Postman, and Integration Design
7. HL7 v2 Fundamentals and Interface Implementation
8. FHIR Implementation Fundamentals
9. Data Governance with DAMA-DMBOK
10. Adobe Experience Platform, CJA, Target, and Analytics
11. Product Implementation Guidelines and Standards
12. Modern Agile Product Leadership
13. PMP, Hybrid Delivery, and Agile Ceremonies
14. Data Quality, Testing, and Observability
15. Cloud, Security, and Integration Architecture
16. Technical and Behavioral Interviewing with STAR

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The application loads without Supabase values and uses local demo progress. Account creation, cloud synchronization, and submitted lesson feedback require:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Never place a Supabase service-role key in a `VITE_` variable or browser code.

## Validation commands

```bash
npm run test          # Vitest registry, scoring, feedback, source, lab, and instructional audits
npm run test:sql      # SQLite schema, fixtures, answers, and safety checks
npm run build         # TypeScript and Vite production build
npm run test:e2e      # Playwright desktop and mobile smoke tests
```

GitHub Actions uploads the generated quality reports and browser evidence with every branch and pull-request validation run.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_lms.sql` in the SQL editor.
3. Run `supabase/migrations/002_lesson_feedback.sql`.
4. Confirm Row Level Security is enabled and own-record policies use `auth.uid()`.
5. Enable Email authentication.
6. Configure email confirmation and sender templates.
7. Configure Google as an OAuth provider.
8. Add local, Vercel Preview, and production redirect URLs.
9. Add the project URL and publishable key to Vercel Preview and Production.
10. Redeploy after changing Vite environment variables.
11. Complete two-user RLS testing for progress and lesson feedback.

## Learner feedback

The lesson feedback control is optional and does not block completion.

- Signed-out learners can save an unsent local draft.
- The interface clearly states that a local draft has not been submitted.
- Signed-in learners can submit a rating, issue type, and up to 1,500 characters.
- Learners can read only their own feedback records.
- Administrative review remains manual.
- Learners are instructed not to include patient, client, employer, credential, confidential, or proprietary information.

## Privacy-conscious analytics

`src/lib/analyticsEvents.ts` defines a future first-party event contract. No analytics sender or advertising tracker is installed. The contract allows course, lesson, quiz, score-band, pass, download, and feedback-submission events while prohibiting answers, SQL, tokens, names, email, free-text feedback, health information, client data, employer data, credentials, and advertising identifiers.

## Vercel deployment

1. Import `Rando2020/orivohealth.org` into Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Node version: 22.
6. Add both Supabase variables for Preview and Production.
7. Validate local-fallback behavior on Preview before adding credentials.
8. Validate email, Google authentication, progress RLS, and feedback RLS after adding credentials.
9. Run `docs/MANUAL_QA_CHECKLIST.md`.
10. Add `orivohealth.org` and `www.orivohealth.org` to Vercel.
11. Copy the exact Vercel DNS values and remove conflicting GitHub Pages records only after Preview approval.
12. Confirm SSL, HTTPS redirect, canonical domain, deep links, and security headers.
13. Record the previous known-good deployment before production promotion.
14. Follow `docs/INCIDENT_AND_ROLLBACK.md` if production validation fails.

## Quality and production runbooks

- `docs/INSTRUCTIONAL_QUALITY_STANDARD.md`
- `docs/QUESTION_BANK_STANDARD.md`
- `docs/CONTENT_REVIEW_PROCESS.md`
- `docs/SOURCE_AND_CITATION_STANDARD.md`
- `docs/LAB_VALIDATION_STANDARD.md`
- `docs/LEARNER_FEEDBACK_PROCESS.md`
- `docs/INSTRUCTIONAL_QUALITY_AUDIT.md`
- `docs/QUESTION_BANK_AUDIT.md`
- `docs/PRODUCTION_LAUNCH_CHECKLIST.md`
- `docs/MANUAL_QA_CHECKLIST.md`
- `docs/AUTHENTICATION_SETUP.md`
- `docs/INCIDENT_AND_ROLLBACK.md`

## Production content standard

A future course cannot be labeled production-complete until it passes registry validation, primary-source registration, review metadata, lab-manifest coverage, executable or manual lab validation, question-bank integrity, cognitive-distribution review, accessibility review, production build, and browser smoke testing.

## Content and identity safety

All course labs and portfolio projects must use synthetic data. Do not publish employer, client, patient, PHI, PII, confidential, or proprietary material. Orivo Health Academy does not claim accreditation, certification authority, compliance approval, or official endorsement from standards bodies or vendors referenced in course sources.
