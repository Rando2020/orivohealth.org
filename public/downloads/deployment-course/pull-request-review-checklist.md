# Pull Request Review Checklist

## Scope

- [ ] Behavior change is explained in plain language.
- [ ] API, schema, migration, configuration, permission, and feature-flag changes are identified.
- [ ] Affected users, clients, and dependencies are named with synthetic examples only.
- [ ] Known limitations and deferred work are visible.

## Evidence

- [ ] Acceptance criteria map to tests.
- [ ] Required checks cover the actual change risk.
- [ ] Migration and compatibility evidence is attached when relevant.
- [ ] Security, accessibility, performance, and data-quality evidence is included when relevant.
- [ ] Test results identify commit, environment, and data set.

## Review integrity

- [ ] Appropriate code or domain owners reviewed sensitive paths.
- [ ] Material review conversations are resolved.
- [ ] New commits after approval were reassessed.
- [ ] The final merge candidate is the revision that passed checks.

## Release readiness

- [ ] Artifact, deployment, monitoring, and rollback implications are documented.
- [ ] No secret or sensitive value appears in code, logs, screenshots, or comments.
- [ ] Emergency exceptions have owner, rationale, expiration, and follow-up.

Decision: `APPROVE`, `REQUEST CHANGES`, or `COMMENT`

Rationale:
