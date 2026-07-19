# Lab Validation Standard

## Required manifest

Every production lesson must have one lab-manifest entry containing:

- course, module, and lesson IDs
- lab title
- required files
- expected evidence
- automated-validation availability
- manual-validation steps
- known limitations

The generated manifest must cover every registered production lesson.

## SQL labs

The executable baseline is SQLite. Validation must:

1. Create a fresh temporary database.
2. Run the schema file.
3. Run the seed-data file.
4. Confirm expected tables and approximate row counts.
5. Confirm intentional duplicate, null, date, mapping, and load defects.
6. Execute the complete reference-answer package.
7. Confirm learner prompts remain aligned with the answers.
8. Confirm learner files do not expose the solution package.
9. Delete the temporary database.

A successful SQLite run does not prove identical behavior in PostgreSQL, Snowflake, or another engine. Dialect differences must be stated.

## API labs

API labs are manually reviewed unless a maintained synthetic sandbox exists. Validation should confirm:

- request and response consistency
- valid JSON examples
- internally consistent endpoint and field names
- status-code rationale
- authentication and authorization terminology
- no usable secrets
- retry and idempotency consistency
- pagination completion behavior
- OpenAPI compatibility claims
- webhook event identity
- raw-body signature verification
- timestamp and replay protection
- synthetic evidence only

## Evidence quality

Evidence must allow a reviewer to determine what the learner did and why the result is trustworthy. A screenshot without context is not sufficient by itself.

Expected evidence may include:

- query or contract artifact
- sanitized result or response
- control totals
- expected-versus-actual interpretation
- identified risk
- recovery or support plan
- source reference

## Answer guides

Answer guides should evaluate decisions and controls, not demand one exact wording. They must still be specific enough to identify a missing grain, unsafe retry, invalid join, weak source, absent owner, or unsupported conclusion.
