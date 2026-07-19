# Production Launch Checklist

Use this checklist for every Vercel production deployment and custom-domain change.

## 1. Repository and quality gates

- [ ] Pull request targets `main`.
- [ ] Required GitHub Actions validation is green.
- [ ] TypeScript, production build, Vitest, registry validation, SQLite validation, and Playwright smoke tests pass.
- [ ] No service-role key, OAuth client secret, password, token, PHI, PII, client data, or proprietary material is present.
- [ ] ORI-200 and ORI-110 open correctly in local fallback mode.
- [ ] Four SQL downloads return HTTP 200 and execute in SQLite.

## 2. Vercel project

- [ ] Import `Rando2020/orivohealth.org`.
- [ ] Framework preset: Vite.
- [ ] Build command: `npm run build`.
- [ ] Output directory: `dist`.
- [ ] Node runtime: 22.
- [ ] Preview deployment completes before production promotion.
- [ ] `vercel.json` rewrites valid SPA routes to `index.html`.
- [ ] Response headers include CSP, HSTS, no-sniff, frame protection, referrer policy, and permissions policy.

## 3. Environment variables

Add to Preview and Production:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

- [ ] Values belong to the intended Supabase project.
- [ ] No `service_role` key is used in a `VITE_` variable.
- [ ] Preview does not accidentally point to an unrelated production project.
- [ ] A deployment is triggered after variables change.

## 4. Supabase

- [ ] Run `supabase/migrations/001_lms.sql`.
- [ ] Confirm Row Level Security is enabled on every learner table.
- [ ] Confirm policies restrict records to `auth.uid()`.
- [ ] Enable Email authentication.
- [ ] Decide whether email confirmation is required.
- [ ] Configure a production-safe sender and confirmation template.
- [ ] Configure Google OAuth only after redirect URLs are correct.
- [ ] Add `http://localhost:5173/dashboard` for local development when needed.
- [ ] Add the Vercel preview URL for preview testing.
- [ ] Add `https://orivohealth.org/dashboard` for production.

## 5. Authentication smoke test

- [ ] Create a new email account.
- [ ] Confirm the email path.
- [ ] Sign in and refresh.
- [ ] Confirm the session survives refresh.
- [ ] Sign out.
- [ ] Complete one lesson while signed out, then sign in and synchronize.
- [ ] Confirm one learner cannot query or modify another learner’s records.
- [ ] Test Google sign-in and sign-out.
- [ ] Test invalid credentials and rate-limit messaging.

## 6. Custom domain and DNS

- [ ] Add `orivohealth.org` to the Vercel project.
- [ ] Add `www.orivohealth.org` and choose the canonical redirect behavior.
- [ ] Copy the exact Vercel DNS records.
- [ ] Remove conflicting GitHub Pages A, AAAA, and CNAME records only after the Vercel preview is approved.
- [ ] Confirm apex and `www` resolve to Vercel.
- [ ] Confirm SSL is issued and valid.
- [ ] Confirm HTTP redirects to HTTPS.
- [ ] Confirm the canonical URL is `https://orivohealth.org`.

## 7. Production smoke test

Open each route directly in a new private browser session:

- [ ] `/`
- [ ] `/courses`
- [ ] `/courses/apis-webhooks-integration`
- [ ] `/courses/sql-product-implementation`
- [ ] `/learn/apis-webhooks-integration/integration-patterns`
- [ ] `/learn/sql-product-implementation/tables-grain`
- [ ] `/quiz/apis-webhooks-integration/apis-m1-quiz`
- [ ] `/quiz/sql-product-implementation/sql-m1-quiz`
- [ ] `/dashboard`
- [ ] `/account`
- [ ] Invalid course, lesson, quiz, and route states

Validate at 360, 390, 768, 1024, and desktop widths.

## 8. Learner workflow

- [ ] Mark and unmark lessons in both courses.
- [ ] Navigate directly from one lesson to another and verify completion state changes with the active lesson.
- [ ] Complete failed and passed quiz attempts.
- [ ] Retake and confirm a newly randomized question set.
- [ ] Confirm score and course percentages.
- [ ] Confirm no page-level horizontal overflow.
- [ ] Confirm keyboard navigation and visible focus.
- [ ] Confirm external sources open safely.

## 9. SEO and public files

- [ ] Page title changes by route.
- [ ] Description and Open Graph metadata are present.
- [ ] Canonical URL is correct.
- [ ] `/favicon.svg` loads.
- [ ] `/robots.txt` loads.
- [ ] `/sitemap.xml` loads.
- [ ] No page claims accreditation or official vendor endorsement.

## 10. Rollback readiness

- [ ] Record the previous production deployment URL and commit SHA.
- [ ] Confirm a project owner can promote the prior Vercel deployment.
- [ ] Confirm Supabase schema changes are backward compatible or have a tested reversal plan.
- [ ] Assign launch decision, incident communication, and technical rollback owners.
- [ ] Follow `docs/INCIDENT_AND_ROLLBACK.md` for production failure.
