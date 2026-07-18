# Orivo Health Academy

A portfolio-first technical learning platform for healthcare product, implementation, data, analytics, governance, and project-delivery leaders.

## Current LMS release

- 16 connected courses and four role-based learning paths
- Two fully authored production courses registered through a reusable LMS registry
- ORI-200 APIs: 32 lessons, eight modules, 192 source questions, and a 30-question final
- ORI-110 SQL: 44 lessons, 11 modules, 330 source questions, and a 40-question final
- Written instruction, decision scenarios, guided labs, answer guidance, credited visuals, and portfolio capstones
- Randomized module quizzes, 80% passing score, unlimited retakes, and answer explanations
- Email/password and Google authentication through Supabase
- Local demo progress when Supabase is not configured
- Cross-device lesson progress and quiz-attempt storage when signed in
- Vercel SPA routing and production security headers
- Automated registry, scoring, SQLite, build, and browser smoke validation
- Route-aware metadata, robots policy, sitemap, favicon, skip navigation, reduced-motion behavior, and learner-safe error states

## Production course registry

`src/data/productionCourseRegistry.ts` registers lessons, modules, question banks, quiz definitions, capstones, and downloads. Generic course, lesson, quiz, and dashboard pages resolve content through the registry. `src/data/registryValidation.ts` verifies references, duplicate IDs, correct options, quiz pools, and required lesson data.

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

SQLite is the supported baseline because it is free, local, and requires no learner account or cloud data upload.

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

The application loads without Supabase values and uses local demo progress. Account creation and cloud synchronization require:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Never place a Supabase service-role key in a `VITE_` variable or browser code.

## Validation commands

```bash
npm run test          # Vitest scoring and registry integrity
npm run test:sql      # SQLite schema, fixtures, answers, and safety checks
npm run build         # TypeScript and Vite production build
npm run test:e2e      # Playwright desktop and mobile smoke tests
```

GitHub Actions runs all required checks. Browser smoke tests cover API and SQL course routes, local lesson completion, quiz submission, dashboard rendering, SQL download access, invalid deep links, and page-level overflow.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_lms.sql` in the SQL editor.
3. Confirm Row Level Security is enabled and policies use `auth.uid()`.
4. Enable Email authentication.
5. Configure email confirmation and sender templates.
6. Configure Google as an OAuth provider.
7. Add local, Vercel Preview, and production redirect URLs.
8. Add the project URL and publishable key to Vercel Preview and Production.
9. Redeploy after changing Vite environment variables.
10. Complete the two-user RLS test in `docs/AUTHENTICATION_SETUP.md`.

## Vercel deployment

1. Import `Rando2020/orivohealth.org` into Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Node version: 22.
6. Add both Supabase variables for Preview and Production.
7. Validate local-fallback behavior on Preview before adding credentials.
8. Validate email and Google authentication after adding credentials.
9. Run `docs/MANUAL_QA_CHECKLIST.md`.
10. Add `orivohealth.org` and `www.orivohealth.org` to Vercel.
11. Copy the exact Vercel DNS values and remove conflicting GitHub Pages records only after Preview approval.
12. Confirm SSL, HTTPS redirect, canonical domain, deep links, and security headers.
13. Record the previous known-good deployment before production promotion.
14. Follow `docs/INCIDENT_AND_ROLLBACK.md` if production validation fails.

`vercel.json` rewrites application routes to `index.html` and adds CSP, HSTS, frame, no-sniff, referrer, and permissions-policy headers.

## Production runbooks

- `docs/PRODUCTION_LAUNCH_CHECKLIST.md`: deployment, DNS, SSL, authentication, smoke, and rollback gates
- `docs/MANUAL_QA_CHECKLIST.md`: desktop, mobile, accessibility, local, Supabase, quiz, and SQL validation
- `docs/AUTHENTICATION_SETUP.md`: Supabase, OAuth, RLS, redirects, and local-to-cloud behavior
- `docs/INCIDENT_AND_ROLLBACK.md`: severity, evidence, containment, Vercel rollback, recovery, and postmortem

## Content architecture

- `src/data/productionCourseRegistry.ts`: reusable production-course registry
- `src/data/registryValidation.ts`: structural and assessment integrity checks
- `src/data/apiCourseContent.ts`: 32 production API lessons
- `src/data/apiQuestionBank.ts`: 192 API assessment questions
- `src/data/sqlCourseContent.ts`: 44 production SQL lessons
- `src/data/sqlQuestionBank.ts`: 330 SQL assessment questions
- `src/data/lmsTypes.ts`: reusable lesson and quiz contracts
- `src/pages/LessonPage.tsx`: generic lesson, visual, scenario, lab, source, download, and synchronized completion experience
- `src/pages/QuizPage.tsx`: randomized assessment engine with exact scoring, code, tables, sources, empty-pool protection, and safe synchronization
- `src/pages/DashboardPage.tsx`: multi-course learner progress and synchronization status
- `src/context/AuthContext.tsx`: learner authentication and safe error translation
- `src/lib/lmsProgress.ts`: local and Supabase progress persistence
- `src/lib/quizScoring.ts`: tested exact scoring helpers
- `tests/smoke.spec.ts`: desktop and mobile browser validation
- `scripts/validate-sql.sh`: executable SQL dataset validation

## Production content standard

Every course promoted from outline to production should contain fully written lessons, credited original diagrams, implementation scenarios, guided labs, answer criteria, a large randomized question bank, module quizzes, a final assessment, a portfolio capstone, interview translation, registry integrity validation, executable asset checks, and passing browser smoke tests.

## Content and identity safety

All course labs and portfolio projects must use synthetic data. Do not publish employer, client, patient, PHI, PII, confidential, or proprietary material. Orivo Health Academy does not claim accreditation, certification authority, compliance approval, or official endorsement from standards bodies or vendors referenced in course sources.
