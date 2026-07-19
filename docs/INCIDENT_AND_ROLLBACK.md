# Incident and Rollback Runbook

Use this runbook when Orivo Health Academy has a production availability, authentication, progress, assessment, content, security, or deployment incident.

## Severity model

| Severity | Definition | Examples |
|---|---|---|
| SEV-1 | Widespread outage, security exposure, or learner-data access across accounts | Blank production site, RLS bypass, service-role key exposure |
| SEV-2 | Major learner workflow unavailable with no reasonable workaround | Sign-in unavailable, lessons fail to load, quiz submission loses results |
| SEV-3 | Degraded feature with a workaround | One download broken, one quiz unavailable, synchronization delayed |
| SEV-4 | Minor content or presentation defect | Typo, isolated visual issue, nonblocking mobile spacing |

## Immediate response

1. Record detection time, reporter, production URL, commit SHA, and affected workflow.
2. Assign incident lead, technical lead, communication owner, and decision authority.
3. Determine whether the issue is application code, Vercel configuration, DNS, Supabase, OAuth, content, or external dependency.
4. Protect learners first. Disable or roll back a harmful feature before completing root-cause analysis.
5. Never paste tokens, learner records, OAuth secrets, or provider payloads into public issues or chat.

## Evidence package

Capture:

- UTC timestamp and timezone
- Production and preview URLs
- Commit and deployment IDs
- Browser and device
- Route
- Reproduction steps
- Expected and actual behavior
- Console and network evidence with secrets redacted
- Supabase request ID or relevant safe identifiers
- Scope and learner impact
- Last known good deployment

## Containment decisions

### Application regression

- Promote the previous known-good Vercel deployment.
- Confirm the domain now points to the promoted deployment.
- Run the production smoke routes.
- Keep the faulty deployment available only for private investigation.

### Authentication outage

- Confirm whether local fallback remains available.
- Check Supabase status, project health, URL, publishable key, provider settings, and redirects.
- Do not weaken RLS or expose service-role credentials as a workaround.
- If OAuth alone fails, communicate that email sign-in or local learning is the temporary path when valid.

### Progress synchronization failure

- Confirm localStorage remains intact.
- Prevent repeated destructive synchronization attempts.
- Do not overwrite local completion with an empty cloud response.
- Restore service, then ask affected learners to use dashboard synchronization.

### Broken quiz or content registration

- If a quiz has an empty or invalid pool, retain access to lessons and disable only the broken assessment path.
- Correct the registry or question data through a reviewed pull request.
- Run registry integrity tests before deployment.

### Security exposure

- Revoke exposed privileged credentials immediately.
- Preserve repository and deployment evidence.
- Review Supabase audit information and learner-table access.
- Notify affected parties based on verified scope and applicable obligations.
- Do not claim a breach before scope is established, and do not minimize confirmed exposure.

## Vercel rollback

1. Open the Vercel project deployment history.
2. Identify the last deployment with completed production smoke validation.
3. Promote that deployment to Production.
4. Confirm apex and `www` behavior.
5. Validate SSL and security headers.
6. Run direct deep-link tests for a course, lesson, quiz, account, and dashboard.
7. Record rollback time and deployment ID.

## Database and migration rollback

The current LMS migration is additive. Future migrations must document backward compatibility and reversal before merge.

- Prefer forward fixes for data-preserving schema changes.
- Never drop learner data as an emergency shortcut.
- Back up or export affected records before destructive repair.
- Test reversal in a nonproduction project.
- Validate RLS after every policy change.

## Recovery validation

Before declaring recovery:

- Home and public catalog load.
- ORI-200 and ORI-110 lessons load.
- SQL downloads return 200.
- Local completion works.
- A configured account can sign in and sign out.
- Signed-in lesson completion synchronizes.
- Module quiz renders, submits, and saves.
- Dashboard totals are correct.
- Invalid IDs show controlled errors.
- No page-level horizontal overflow is introduced.

## Communication template

```text
Status: Investigating | Identified | Monitoring | Resolved
Started: <UTC timestamp>
Affected capability: <learner workflow>
Impact: <verified scope>
Workaround: <safe workaround or none>
Current action: <containment or recovery action>
Next update: <time>
```

Do not speculate about root cause in active incident updates.

## Postmortem

Within five business days for SEV-1 or SEV-2, document:

- Impact and duration
- Detection method
- Timeline
- Technical and process contributors
- Why controls did not prevent or detect earlier
- Recovery actions
- Corrective and preventive actions
- Owner and SMART due date for every action
- Evidence that the fix was tested

Use blameless language while maintaining clear accountability for systems, controls, and decisions.
