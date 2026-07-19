# Question Bank Standard

## Purpose

A large bank is useful only when it measures distinct reasoning. Rephrased definition questions do not create meaningful coverage.

## Target cognitive distribution

Each module should generally target:

- 20 percent foundation and mental models
- 25 percent technical interpretation
- 30 percent implementation scenarios
- 15 percent troubleshooting and defect diagnosis
- 10 percent risk, governance, and operational judgment

A module may vary when the subject requires it, but the rationale should be documented. At least 30 percent of every final-assessment source bank must require application or troubleshooting.

## Required question qualities

Every question must have:

- a unique ID
- one registered course and module
- a clear prompt
- plausible options
- one defensible answer set
- correct option IDs that exist
- an explanation that teaches the underlying model
- a registered primary source
- a difficulty label
- a cognitive category

## Single-select questions

A single-select question must not have two reasonable answers under normal interpretation. Qualifiers such as “best,” “first,” or “most appropriate” require enough scenario detail to make the distinction defensible.

## Multiple-select questions

Multiple-select questions must clearly indicate that more than one answer may be correct. Scoring requires an exact answer set. Partial selection is not a pass.

## Distractors

Distractors should represent realistic mistakes, adjacent concepts, or incomplete controls. Avoid unrelated words that make the correct answer obvious.

Weak distractor:

- “browser color” in a status-code question

Stronger distractor:

- `409 Conflict` when the actual issue is a semantic validation failure better represented by `422`

## Code and table questions

Use code or sample tables when the learner must interpret:

- SQL output
- join behavior
- null handling
- aggregate denominators
- window functions
- HTTP requests and responses
- OAuth claims
- webhook signatures and replay evidence
- OpenAPI compatibility

The question should test interpretation, not merely whether the learner recognizes a keyword.

## Duplication controls

CI fails for:

- duplicate IDs
- exact normalized prompt duplicates
- missing explanations
- invalid correct options
- empty source pools
- unregistered sources

Near duplicates are reported for review but do not fail solely because of a similarity threshold. Reviewers decide whether similar questions test different evidence or merely repeat a template.

## Generated questions

Generated questions may provide initial coverage, but they must remain labeled for review. A course cannot treat three template variants per concept as equivalent to three independently designed reasoning tasks.

## Review evidence

The CI audit artifact reports:

- counts by module
- counts by difficulty
- counts by question type
- counts by cognitive category
- source distribution
- answer-position distribution before runtime randomization
- exact duplicate prompts
- near-duplicate pairs
- reused option sets
- generated-template count
- application and troubleshooting percentage
