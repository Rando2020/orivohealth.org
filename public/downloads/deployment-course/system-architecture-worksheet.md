# System Architecture Worksheet

Use synthetic names and data only.

## Workflow

- User-important action:
- Business outcome:
- Start boundary:
- Completion boundary:
- Maximum acceptable duration:

## Components and boundaries

| Order | Component | Responsibility | Input | Output | Owner | Health signal | Failure evidence | Recovery action |
|---:|---|---|---|---|---|---|---|---|
| 1 | Browser or mobile client |  |  |  |  |  |  |  |
| 2 | DNS, CDN, or edge |  |  |  |  |  |  |  |
| 3 | Frontend |  |  |  |  |  |  |  |
| 4 | API gateway |  |  |  |  |  |  |  |
| 5 | Backend service |  |  |  |  |  |  |  |
| 6 | Queue or scheduled job |  |  |  |  |  |  |  |
| 7 | Database or object storage |  |  |  |  |  |  |  |
| 8 | External dependency |  |  |  |  |  |  |  |

## Identity and data

- Authentication provider:
- Authorization decision point:
- Tenant or client isolation rule:
- Authoritative source of truth:
- Cached or temporary state:
- Sensitive-data boundary:

## Architecture review

- Which failure can affect the largest population?
- Which boundary lacks an observable signal?
- Which dependency has no tested contingency?
- Which state cannot be rolled back automatically?
- Which decision is still based on an assumption?
