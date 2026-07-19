# Source Audit

## Registered primary sources

The production courses now resolve lesson and question sources through `src/data/sourceRegistry.ts`.

Reviewed source families:

- IETF and RFC Editor HTTP semantics
- OAuth 2.0 framework and OAuth 2.0 security best current practice
- OpenAPI Specification 3.2.0
- OWASP API Security Top 10, 2023 edition
- Postman official documentation
- GitHub webhook documentation
- PostgreSQL current SQL documentation
- SQLite language documentation
- DuckDB SQL documentation
- Snowflake official documentation
- Informatica Cloud Data Integration documentation

## Issues corrected

1. **OAuth security recency:** RFC 6749 remains the framework source, but security guidance is now supplemented with RFC 9700.
2. **OpenAPI version ambiguity:** the registry pins course contract guidance to OpenAPI 3.2.0 rather than an unversioned marketing page.
3. **Question-level source gaps:** original API template questions now receive registered module-level primary sources.
4. **Inconsistent source labels:** runtime lesson and question records use stable source IDs.
5. **Vendor change risk:** Postman, GitHub, Snowflake, and Informatica sources are marked high-sensitivity and require more frequent review.

## Remaining risks

- Vendor documentation routes and interface labels may change.
- A registered source does not prove every individual sentence is perfectly supported; claim-level human review remains required.
- Search or redirect availability does not establish licensing permission to copy a diagram or long passage.
- Informatica terminology can differ across product generations and tenant releases.
- Snowflake features, limits, and account behavior can vary by edition and configuration.

## Review rule

A lesson or question cannot pass production registry validation without a registered source. Broken-link and claim-support review still require human verification during scheduled content review.
