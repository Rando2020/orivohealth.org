# Content Review Process

## Roles

- **Author:** drafts or revises instruction, scenarios, labs, and questions
- **Technical reviewer:** verifies the model against primary sources and tests examples
- **Instructional reviewer:** evaluates clarity, progression, cognitive load, and assessment alignment
- **Release reviewer:** confirms registry integrity, source registration, tests, and production metadata

One person may perform more than one role in a small project, but the review record must identify the role being performed.

## Review sequence

1. Confirm the course objective and intended audience.
2. Review the authoritative source registry and versions.
3. Review lessons in module order.
4. Execute or simulate every lab.
5. Review question-bank analysis and inspect flagged near duplicates.
6. Replace shallow or ambiguous questions with applied evidence tasks.
7. Review capstone alignment.
8. Update content version, review date, owner, known limitations, and source version.
9. Run all quality gates.
10. Open a pull request with unresolved risks documented.

## Versioning

Content versions use semantic intent:

- major: material redesign of outcomes, module structure, or capstone
- minor: substantive lesson, lab, source, or assessment improvement
- patch: wording, accessibility, broken-link, or non-material correction

Review metadata is stored in version-controlled course and lesson objects. No external CMS is required.

## Pull request evidence

Every course-content pull request should include:

- lessons and modules affected
- claims or standards updated
- sources added, removed, or versioned
- labs executed
- questions added, rewritten, or removed
- before-and-after cognitive distribution
- known limitations
- automated checks completed
- manual review still required

## Learner feedback triage

1. Confirm the report contains no sensitive information.
2. Classify impact and reproducibility.
3. Link the feedback to the relevant lesson, source, lab, or quiz.
4. Correct high-risk factual or security issues first.
5. Add a regression test when practical.
6. Update review metadata after resolution.
7. Close or decline the report with a concise rationale.

## Production-complete gate

Future courses must pass:

- production registry validation
- source registry validation
- lesson review metadata validation
- lab-manifest coverage
- executable dataset or example validation where applicable
- question-bank integrity checks
- application and troubleshooting coverage threshold
- accessibility review
- TypeScript and production build
- browser smoke testing
