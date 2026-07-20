# Git and GitHub Delivery Workflow Guide

## Traceability chain

`Requirement → branch → commit → pull request → checks → artifact → deployment → production verification`

## Recommended workflow

1. Confirm the requirement, acceptance criteria, and risk.
2. Create a focused branch from the approved base.
3. Commit reviewable changes with meaningful messages.
4. Open a pull request that explains behavior, data, configuration, testing, and recovery impact.
5. Run required checks against the merge candidate.
6. Resolve material review comments.
7. Merge through protected-branch policy.
8. Tag or otherwise identify the immutable release commit.
9. Build one artifact and promote it through environments.
10. Record the deployed commit and artifact digest.

## Review questions

- What user or business behavior changes?
- What API, database, configuration, or permission changes?
- Which consumers may be affected?
- Which tests cover the actual risks?
- Did any material commit arrive after approval?
- What cannot be reversed through a code revert?

## Hotfix rules

- Keep scope focused.
- Use accountable review and targeted checks.
- Preserve incident and deployment links.
- Reconcile the hotfix into the main development history.
- Add regression evidence and post-incident actions.
