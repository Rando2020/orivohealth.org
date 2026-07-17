# Orivo Health Academy

A portfolio-first technical learning platform for healthcare product, implementation, data, analytics, governance, and project-delivery leaders.

## Current LMS release

This branch converts the original course catalog into a functional learning platform.

- 16 connected courses and four role-based learning paths
- ORI-200 fully authored with 32 lessons across eight modules
- Written instruction, decision scenarios, guided labs, answer guidance, and credited visuals
- 192-question API course bank
- Eight randomized module quizzes
- Randomized 30-question final assessment
- 80% passing score with unlimited retakes and answer explanations
- Email/password and Google authentication through Supabase
- Local demo progress when Supabase is not configured
- Cross-device lesson progress and quiz-attempt storage when signed in
- Vercel SPA deployment configuration
- Supabase Postgres schema and Row Level Security policies
- Added ORI-315 PMP, Hybrid Delivery, and Agile Ceremonies

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

The application loads without Supabase values and uses local demo progress. Account creation and cloud synchronization require the two environment variables below.

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

The database contains learner profiles, enrollments, lesson progress, quiz attempts, and course completions. Row Level Security limits learners to their own records.

## Vercel deployment

1. Import `Rando2020/orivohealth.org` into Vercel.
2. Use the default Vite build command: `npm run build`.
3. Set the output directory to `dist`.
4. Add both Supabase environment variables for Preview and Production.
5. Redeploy after changing environment variables.
6. Move `orivohealth.org` to the Vercel project after the production deployment is validated.

`vercel.json` rewrites application routes to `index.html` so account, lesson, and quiz deep links work as a single-page application.

## Content architecture

- `src/data/catalog.ts`: original curriculum and paths
- `src/data/registerExtendedCatalog.ts`: PMP course registration
- `src/data/apiCourseContent.ts`: 32 production API lessons
- `src/data/apiQuestionBank.ts`: 192 generated assessment questions
- `src/data/lmsTypes.ts`: lesson and quiz content contracts
- `src/pages/LessonPage.tsx`: lesson, visual, scenario, lab, and source experience
- `src/pages/QuizPage.tsx`: randomized quiz engine and explanations
- `src/context/AuthContext.tsx`: learner authentication
- `src/lib/lmsProgress.ts`: local and Supabase progress persistence

## Production content standard

Every course promoted from outline to production should contain:

- Orientation and diagnostic assessment
- Fully written lessons
- Original diagrams adapted from credited primary sources
- Implementation scenarios
- Guided labs and answer criteria
- Large randomized question banks
- Module quizzes and final assessment
- Portfolio capstone
- Interview translation

## Content safety

All course labs and portfolio projects must use synthetic data. Do not publish employer, client, patient, PHI, PII, confidential, or proprietary material.
