# Content Production Roadmap

The academy contains 16 courses. ORI-200 and ORI-110 are production-complete and now use the reusable instructional-quality gate established in the 2026 audit.

## Production-complete standard

A course is not complete until it has:

1. Fully written learner-facing lessons
2. Credited original or adapted visuals
3. Implementation scenarios
4. Guided labs with evidence and answer criteria
5. A machine-readable lab manifest
6. At least 20 genuinely distinct source questions per module
7. Balanced cognitive coverage rather than definition-template volume alone
8. Randomized module quizzes
9. Randomized final assessment
10. At least 30 percent application or troubleshooting coverage in the final source bank
11. Portfolio capstone
12. Account-synchronized progress
13. Completion and certificate criteria
14. Registration in `productionCourseRegistry.ts`
15. Registered primary sources for lessons and questions
16. Course and lesson review metadata
17. Instructional-quality scoring and documented limitations
18. Lab execution or manual-validation evidence
19. Accessibility review
20. Passing registry, source, assessment, SQL, TypeScript, build, and browser checks

## Production status

1. ORI-200 APIs, Webhooks, Postman, and Integration Design: production, quality audit version 2.1.0
2. ORI-110 SQL for Product and Implementation Leaders: production, quality audit version 2.1.0

## Next sequencing

1. ORI-100 Systems, Environments, and Deployment Foundations
2. ORI-120 Snowflake and Informatica Data Operations
3. ORI-210 HL7 v2 Fundamentals
4. ORI-220 FHIR Implementation Fundamentals
5. ORI-320 Data Quality, Testing, and Observability
6. ORI-315 PMP, Hybrid Delivery, and Agile Ceremonies
7. ORI-240 Adobe Experience Platform, CJA, Target, and Analytics
8. ORI-230 Data Governance with DAMA-DMBOK
9. ORI-300 Product Implementation Guidelines and Standards
10. ORI-310 Modern Agile Product Leadership
11. ORI-140 Python and AI-Assisted Automation
12. ORI-130 JavaScript for Technical Implementers
13. ORI-330 Cloud, Security, and Integration Architecture
14. ORI-400 Technical and Behavioral Interviewing

## Current question banks

- ORI-200: 192 original questions plus 24 hand-authored applied audit questions, 216 runtime total, 10 displayed per module attempt, 30-question final
- ORI-110: 330 original questions plus 33 hand-authored applied audit questions, 363 runtime total, 12 displayed per module attempt, 40-question final

The original 522 questions were reviewed as the audit baseline. Generated-template questions remain labeled and reported separately so future reviews do not confuse raw volume with independent reasoning coverage.

## Mandatory future review evidence

Every new course pull request must provide:

- lesson and module audit results
- source registry changes
- question distribution by cognitive category
- exact and near-duplicate review results
- lab-manifest coverage
- executable or manual lab validation
- known limitations
- learner-feedback readiness
- passing CI and browser smoke tests
