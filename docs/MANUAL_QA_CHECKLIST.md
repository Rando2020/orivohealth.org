# Manual QA Checklist

Run this checklist on a Vercel Preview deployment before production promotion.

## Test identities and safety

- Use synthetic learner accounts only.
- Do not paste real patient, client, employer, or credential data.
- Record browser, viewport, deployment URL, commit SHA, and test date.

## Public navigation

- Home, courses, paths, capstones, and interview lab open.
- Header navigation works with mouse and keyboard.
- Mobile menu opens, announces expanded state, and closes after navigation.
- Skip link becomes visible on keyboard focus and moves focus to main content.
- Footer links and branding remain readable.

## Route matrix

Validate direct-load and in-app navigation for:

| Route | Expected result |
|---|---|
| `/courses/apis-webhooks-integration` | ORI-200 overview |
| `/courses/sql-product-implementation` | ORI-110 overview |
| `/learn/apis-webhooks-integration/integration-patterns` | First API lesson |
| `/learn/sql-product-implementation/tables-grain` | First SQL lesson |
| `/quiz/apis-webhooks-integration/apis-m1-quiz` | API module assessment |
| `/quiz/sql-product-implementation/sql-m1-quiz` | SQL module assessment |
| `/courses/invalid` | Course not found |
| `/learn/sql-product-implementation/invalid` | Lesson not found |
| `/quiz/sql-product-implementation/invalid` | Quiz not found |
| `/invalid` | General 404 |

## Local fallback mode

Test without Supabase environment variables:

- Account page clearly states cloud account setup is unavailable.
- Course pages, lessons, quizzes, and dashboard still load.
- Mark one API lesson complete.
- Mark one SQL lesson complete.
- Refresh and confirm both remain complete.
- Navigate between lessons and confirm the completion button reflects the active lesson.
- Complete a module quiz and confirm the highest score persists after refresh.
- Confirm dashboard totals match the completed work.

## Supabase mode

- Register a new learner.
- Confirm email if enabled.
- Sign in with email and password.
- Sign in with Google.
- Refresh a protected page and confirm the session persists.
- Complete a lesson and verify its row in `lesson_progress`.
- Complete two quiz attempts and verify both rows in `quiz_attempts`.
- Sign out and confirm protected routes return to the account page.
- Sign in and confirm the original intended route is restored.
- Attempt to read another user’s progress through the Supabase client or SQL editor with user context. Access must be denied.

## Quiz behavior

For both courses:

- Question count matches the quiz description.
- Every question has visible options.
- Code and tables stay inside their scroll containers.
- Keyboard focus reaches every option.
- Selected options have a visible and announced state.
- Submit remains disabled until all questions are answered.
- Multiple-select requires the exact correct set.
- Explanations identify correct and incorrect results.
- Source links open in a new tab without exposing referrer-sensitive information.
- Retake resets answers, score, and explanations.
- Retake produces a different order or selection under normal randomization.
- Empty or invalid quiz IDs show a useful state.

## SQL downloads

- Download all four files.
- Confirm filenames are correct.
- Run schema and seed files with SQLite.
- Confirm 120 synthetic members, 220 claims, and 180 quality-measure rows.
- Confirm at least one duplicate eligibility key, invalid date, and missing pharmacy relationship.
- Execute the answer file without syntax errors.
- Confirm the learner lab file contains prompts but no executable answer queries.

## Responsive matrix

Test at 360, 390, 768, 1024, and at least 1440 pixels.

Review:

- Header and mobile navigation
- Course overview cards
- Long course and lesson titles
- Lesson sidebars
- SQL code blocks
- Quiz options and explanations
- Quiz prompt tables
- Download panels
- Authentication forms
- Dashboard progress cards
- Footer

The document viewport must not scroll horizontally. Code and tables may scroll inside their own containers.

## Accessibility

- Navigate the full header and one lesson using keyboard only.
- Confirm visible focus on links, buttons, inputs, and summary controls.
- Confirm heading order starts with one page-level H1.
- Confirm form controls have labels and autocomplete attributes.
- Confirm status and error messages are announced.
- Confirm progress bars have numeric accessible values.
- Enable reduced motion and confirm scrolling and transitions are reduced.
- Check contrast with an automated accessibility tool.

## Failure and recovery

- Temporarily use invalid Supabase variables in Preview and confirm the app does not become a blank screen.
- Simulate offline mode after the first page load and confirm a local lesson completion remains understandable.
- Force an invalid lesson or quiz and confirm the application remains navigable.
- Confirm unexpected render failures show the application error boundary rather than a stack trace.

## Sign-off record

Record:

- Tester
- Date
- Preview URL
- Commit SHA
- Browser and viewport matrix
- Passed areas
- Failed areas
- Severity and owner of each defect
- Production recommendation: GO, CONDITIONAL GO, or NO-GO
