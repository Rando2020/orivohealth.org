# Learner Feedback Process

## Purpose

Lesson feedback is optional and supports factual correction, clearer instruction, working sources, executable labs, assessment quality, and accessibility.

## Learner experience

A learner may submit:

- a one-to-five rating
- one issue type
- up to 1,500 characters of feedback

Issue types:

- incorrect information
- confusing explanation
- broken source
- broken lab
- quiz problem
- accessibility problem
- other

The feedback control appears near the end of a lesson and does not block completion.

## Signed-out behavior

Signed-out learners may save an unsent local draft. The interface must clearly state that the draft has not been submitted. The draft remains only on that device until the learner signs in and submits it.

## Signed-in behavior

Signed-in feedback is inserted into `public.lesson_feedback`. Row Level Security allows learners to create and read their own records. Learners may update unresolved feedback they own. They cannot read another learner's feedback.

## Prohibited content

Learners are instructed not to include:

- patient or health information
- client or employer information
- confidential or proprietary material
- authentication tokens or credentials
- production payloads
- personal information about another person

A reviewer who discovers sensitive content should restrict access and follow the incident process rather than copying it into another system.

## Review statuses

- `new`
- `reviewing`
- `resolved`
- `declined`

Administrative review may remain manual. Ordinary learners do not receive administrative controls.

## Triage targets

- incorrect security or factual guidance: immediate priority
- broken labs or downloads: two business days
- broken sources: two business days
- quiz ambiguity: five business days
- accessibility problem: five business days
- general clarity requests: planned content review

## Resolution evidence

A resolution should include:

- affected course and lesson
- issue classification
- source or reproduction evidence
- correction made
- test added when practical
- content version and review-date update
- concise reason when feedback is declined
