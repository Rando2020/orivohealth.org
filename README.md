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
- Vercel SPA deployment configuration
- Supabase Postgres schema and Row Level Security policies
- ORI-315 PMP, Hybrid Delivery, and Agile Ceremonies production outline

## Production course registry

`src/data/productionCourseRegistry.ts` registers production lessons, modules, question banks, quiz definitions, capstones, and downloads. Lesson, quiz, course-detail, and dashboard pages resolve content through this registry, allowing future HL7, FHIR, PMP, and other courses to reuse the same LMS experience.

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

DuckDB can also read the schema with minor compatibility adjustments. SQLite is the supported baseline because it is free, local, and requires no learner account or cloud data upload.

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

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_lms.sql` in the SQL editor.
3. Enable Email authentication.
4. Configure Google as an OAuth provider.
5. Add local and production redirect URLs.
6. Add the project URL and publishable key to local and Vercel environment variables.

## Vercel deployment

1. Import `Rando2020/orivohealth.org` into Vercel.
2. Use `npm run build` and output directory `dist`.
3. Add both Supabase environment variables for Preview and Production.
4. Validate account-disabled local mode and Supabase-enabled preview mode.
5. Move `orivohealth.org` only after the Vercel production deployment is validated.

`vercel.json` rewrites application routes to `index.html` so account, lesson, quiz, and course deep links work.

## Content architecture

- `src/data/productionCourseRegistry.ts`: reusable production-course registry
- `src/data/apiCourseContent.ts`: 32 production API lessons
- `src/data/apiQuestionBank.ts`: 192 API assessment questions
- `src/data/sqlCourseContent.ts`: 44 production SQL lessons
- `src/data/sqlQuestionBank.ts`: 330 SQL assessment questions
- `src/data/lmsTypes.ts`: reusable lesson and quiz contracts, including code and table prompts
- `src/pages/LessonPage.tsx`: generic lesson, visual, scenario, lab, source, and download experience
- `src/pages/QuizPage.tsx`: generic randomized quiz engine with code, table, and source support
- `src/pages/DashboardPage.tsx`: multi-course learner progress
- `src/context/AuthContext.tsx`: learner authentication
- `src/lib/lmsProgress.ts`: local and Supabase progress persistence

## Production content standard

Every course promoted from outline to production should contain fully written lessons, credited original diagrams, implementation scenarios, guided labs, answer criteria, a large randomized question bank, module quizzes, a final assessment, a portfolio capstone, and interview translation.

## Content safety

All course labs and portfolio projects must use synthetic data. Do not publish employer, client, patient, PHI, PII, confidential, or proprietary material.
