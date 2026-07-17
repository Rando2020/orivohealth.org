# Orivo Health Academy

A portfolio-first technical learning platform for healthcare product, implementation, data, analytics, and governance leaders.

## What is included

- 15 connected courses with more than 100 guided lessons
- Four role-based learning paths
- Course search and filtering
- Original architecture-flow visuals
- Local lesson progress tracking
- Two integrated portfolio capstones
- Resume-based STAR interview story bank
- Official 2026 vendor and standards resources
- Responsive premium dark UI
- GitHub Pages deployment workflow

## Curriculum

1. Systems, Environments, and Deployment Foundations
2. SQL for Product and Implementation Leaders
3. Snowflake and Informatica Data Operations
4. JavaScript for Technical Implementers
5. Python and AI-Assisted Automation
6. APIs, Webhooks, Postman, and Integration Design
7. HL7 v2 Fundamentals and Interface Implementation
8. FHIR Implementation Fundamentals
9. Data Governance with DAMA-DMBOK
10. Adobe Experience Platform, CJA, Target, and Analytics
11. Product Implementation Guidelines and Standards
12. Modern Agile Product Leadership
13. Data Quality, Testing, and Observability
14. Cloud, Security, and Integration Architecture
15. Technical and Behavioral Interviewing with STAR

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Architecture

- React
- TypeScript
- Vite
- React Router
- Lucide icons
- CSS-based responsive design and diagrams
- Browser localStorage for progress

Course and interview content lives in `src/data/catalog.ts`. The application is intentionally data-driven so lessons, paths, resources, and outcomes can be expanded without redesigning page components.

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the `dist` directory to GitHub Pages whenever changes reach `main`.

Because the site publishes through a custom GitHub Actions workflow, configure `orivohealth.org` in **Repository Settings > Pages > Custom domain**. GitHub ignores a repository `CNAME` file for this publishing method.

For Namecheap DNS, point the apex `@` host to the four GitHub Pages IPv4 addresses and point `www` to `rando2020.github.io`. Remove conflicting parking, redirect, A, AAAA, ALIAS, or CNAME records for the same hosts before running GitHub's DNS check.

## Content safety

All course labs and portfolio projects should use synthetic data. Do not publish employer, client, patient, PHI, PII, confidential, or proprietary material.
