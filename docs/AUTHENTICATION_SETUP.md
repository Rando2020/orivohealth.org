# Authentication Setup

Orivo Health Academy supports local fallback mode and optional Supabase-backed learner accounts.

## Architecture

The browser uses only the Supabase project URL and publishable key. These values are expected to be visible in client code. The Supabase service-role key is privileged and must never be stored in this repository, exposed through a `VITE_` variable, or added to browser code.

Required variables:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## Create the project

1. Create a Supabase project in the intended region.
2. Open the SQL editor.
3. Run `supabase/migrations/001_lms.sql`.
4. Confirm these tables exist:
   - `profiles`
   - `course_enrollments`
   - `lesson_progress`
   - `quiz_attempts`
   - `course_completions`
5. Confirm Row Level Security is enabled.
6. Review every policy before production use.

## Required RLS behavior

Learners may only select, insert, update, or delete records where `user_id = auth.uid()`. Profiles are restricted by `id = auth.uid()`.

Do not add public read policies to learner progress tables.

## Email authentication

1. Enable Email under Authentication providers.
2. Decide whether confirmation is required.
3. Configure a recognizable sender and branded templates.
4. Ensure confirmation links use an approved site URL.
5. Add redirect destinations for local, preview, and production.

Recommended production redirect:

```text
https://orivohealth.org/dashboard
```

Recommended local redirect:

```text
http://localhost:5173/dashboard
```

## Google OAuth

1. Create a Google OAuth client in the Google Cloud console.
2. Use the callback URL shown by Supabase for the Google provider.
3. Store the Google client secret only in Supabase or the approved secrets manager.
4. Enable Google in Supabase Authentication providers.
5. Add allowed application redirects:
   - Local development URL
   - Active Vercel Preview URL used for testing
   - `https://orivohealth.org/dashboard`
6. Test sign-in, callback, refresh, and sign-out.

## Vercel variables

Add the Supabase URL and publishable key to:

- Preview
- Production
- Development only when Vercel development is used

Redeploy after changing variables. A previously built deployment will not inherit new Vite variables without rebuilding.

## Local fallback mode

When the variables are missing:

- Account creation is disabled.
- The account page explains that cloud synchronization is unavailable.
- Lessons and quizzes remain available.
- Progress is stored in browser localStorage.
- Protected learning routes remain accessible because there is no configured account service.

This mode is intentional and is covered by CI smoke tests.

## Local-to-cloud synchronization

When a learner completes lessons locally and later signs in, completed lesson records are uploaded with the learner’s user ID. Local highest quiz scores remain visible on the device. Signed-in quiz attempts are stored in Supabase after submission.

Do not represent local-only scores as a complete cross-device attempt history.

## Manual security verification

Create two test learners, A and B.

- Complete a lesson as A.
- Verify A can read A’s record.
- Authenticate as B.
- Attempt to read or update A’s record.
- Confirm RLS denies the operation.
- Repeat for quiz attempts and course completions.

## Failure behavior

- Session restoration failures show a learner-safe message.
- Authentication functions translate provider errors into limited, understandable messages.
- Progress synchronization failures keep local progress and direct the learner to retry from the dashboard.
- Raw provider payloads, stack traces, database policy details, and secrets are not displayed.

## Rotation and incident response

Publishable key rotation requires updating Vercel variables and rebuilding. A leaked service-role key requires immediate revocation and a security review because it can bypass RLS.

Follow `docs/INCIDENT_AND_ROLLBACK.md` for a production authentication incident.
