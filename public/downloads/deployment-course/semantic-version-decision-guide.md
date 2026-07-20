# Semantic Version Decision Guide

Semantic Versioning applies when the product declares a public API.

## Decision

- **Major:** backward-incompatible public API change.
- **Minor:** backward-compatible functionality added.
- **Patch:** backward-compatible defect correction.
- **Pre-release:** optional identifier for unstable candidate behavior.

## Review questions

1. What is the declared public compatibility boundary?
2. Are any fields, endpoints, events, defaults, error behaviors, or required inputs removed or changed incompatibly?
3. Do consumers have a deprecation and migration period?
4. Does the version identify the same commit and artifact digest that were tested?
5. Do release notes explain required client action?

## Change worksheet

| Change | Consumer impact | Compatible? | Version decision | Migration or deprecation | Evidence |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

A version number communicates compatibility intent. It does not prove quality, security, or production readiness.
