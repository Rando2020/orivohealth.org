# Source and Citation Standard

## Source hierarchy

Prefer sources in this order:

1. Published standards and RFCs
2. Official specifications
3. Official vendor documentation
4. Official security guidance
5. Peer-reviewed or recognized authoritative technical references

Marketing pages, community posts, search snippets, and unsourced tutorials are not primary technical authority.

## Central registry

Production sources are registered in `src/data/sourceRegistry.ts` with:

- stable source ID
- publisher
- title
- URL
- source type
- version when applicable
- review date
- primary-source status
- update sensitivity
- reuse notes

Lessons and questions should reference the registered source ID. CI rejects unregistered lesson or question sources.

## Claim support

A source is relevant only when it supports the claim being taught. A general vendor homepage does not support a detailed security, permission, or compatibility claim.

When one source is insufficient, cite more than one. Examples:

- OAuth framework plus current OAuth security best practice
- SQL language documentation plus engine-specific dialect documentation
- OpenAPI specification plus HTTP semantics

## Version-sensitive content

High-sensitivity sources include vendor interfaces, product limits, roles, pricing behavior, and workflow labels. Lessons using these sources require review at least every six months.

Standards-focused lessons should record the RFC or specification version. A `current` vendor documentation URL should still have a review date.

## Visuals

Create original Orivo diagrams that summarize a concept. Do not copy vendor or standards-body diagrams unless licensing explicitly permits it. Captions should identify the conceptual source and link to it.

## Copyright and quotation

- Summarize concepts in original language.
- Avoid long verbatim excerpts.
- Do not republish documentation pages.
- Do not embed copyrighted screenshots when a simple original visual can teach the same model.
- Preserve attribution for adapted concepts.

## Unsupported claims

Do not claim that a course, architecture, checklist, or learner artifact:

- guarantees compliance
- creates HIPAA, GDPR, SOC 2, PCI DSS, or security certification
- is officially endorsed by a vendor or standards body
- guarantees production readiness
- eliminates operational or legal risk

The academy teaches practical implementation reasoning and evidence practices. It does not replace legal, security, compliance, or vendor certification review.
