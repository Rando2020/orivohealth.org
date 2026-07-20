# Environment Readiness Checklist

Decision: `READY`, `CONDITIONAL`, or `BLOCKED`

## Access

- [ ] Individual learner and support identities are active.
- [ ] Roles and tenant mappings match the approved access matrix.
- [ ] No shared production credentials are used.
- [ ] Time-bound elevated access has an owner and expiration.

## Data

- [ ] Synthetic test data covers positive, negative, null, duplicate, mapping, and date scenarios.
- [ ] Required volumes are representative.
- [ ] Data refresh timing is coordinated.
- [ ] Masking or synthetic-data controls are validated.

## Configuration and dependencies

- [ ] Artifact and migration versions match the approved candidate.
- [ ] Non-secret configuration has been compared with the baseline.
- [ ] Secret references are present without exposing secret values.
- [ ] Feature flags have the correct default and targeting.
- [ ] Critical dependencies and test accounts are healthy.

## Evidence and support

- [ ] Logs, metrics, traces, and request identifiers are available.
- [ ] Known parity gaps are documented and risk-assessed.
- [ ] Reset, refresh, and recovery procedures are known.
- [ ] Support owner and escalation channel are confirmed.

## Decision record

- Decision:
- Blocking items:
- Accepted conditions:
- Owner:
- Due date:
- Recheck time:
- Approver:
