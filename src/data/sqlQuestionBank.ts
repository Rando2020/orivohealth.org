import type { QuizDefinition, QuizQuestion } from './lmsTypes'

interface Concept {
  term: string
  definition: string
  application: string
  misconception: string
  code?: string
  table?: { headers: string[]; rows: string[][] }
  wrong: string[]
}

const moduleConcepts: Record<string, Concept[]> = {
  m1: [
    { term: 'table grain', definition: 'what one row represents', application: 'explaining whether a claims table stores claim headers or claim lines', misconception: 'the table name always proves the grain', wrong: ['warehouse size', 'schema owner', 'query timeout'] },
    { term: 'primary key', definition: 'a column or column set intended to uniquely identify a row', application: 'testing whether pharmacy_id is unique in pharmacies', misconception: 'every identifier-looking column is unique', wrong: ['foreign key', 'aggregate', 'view'] },
    { term: 'foreign key', definition: 'a reference from one table to a key in another table', application: 'connecting implementations to clients', misconception: 'it guarantees a populated match in every dataset', wrong: ['window frame', 'warehouse', 'stage'] },
    { term: 'one-to-many relationship', definition: 'one parent row can relate to multiple child rows', application: 'one implementation having many milestones', misconception: 'joining it can never increase row count', wrong: ['one-to-one only', 'many-to-none', 'scalar expression'] },
    { term: 'many-to-many relationship', definition: 'multiple rows on each side relate through a bridge or repeated key', application: 'pharmacies participating with several payers', misconception: 'a direct join always preserves totals', wrong: ['single-row lookup', 'primary-key constraint', 'date cast'] },
    { term: 'normalization', definition: 'separating facts so each is maintained in a controlled place', application: 'storing payer details separately from implementation events', misconception: 'every wide reporting table is automatically invalid', wrong: ['sorting', 'pagination', 'cloning'] },
    { term: 'denormalization', definition: 'purposeful repetition or pre-joining to simplify consumption or performance', application: 'creating a curated implementation dashboard view', misconception: 'it requires manual editing of repeated values', wrong: ['foreign-key enforcement', 'tokenization', 'row locking'] },
    { term: 'data type', definition: 'the declared kind of value and supported operations', application: 'storing store IDs as text to preserve leading zeros', misconception: 'sample appearance alone determines the best type', wrong: ['join path', 'role hierarchy', 'query history'] },
    { term: 'nullability', definition: 'whether a field may contain an unknown or absent value', application: 'allowing production_date to be absent before launch', misconception: 'nullable means the field is unimportant', wrong: ['cardinality', 'warehouse credit', 'stage path'] },
    { term: 'composite key', definition: 'a row identity formed from more than one column', application: 'member_id plus payer_id plus effective_date for eligibility periods', misconception: 'one component can always replace the full key', wrong: ['single aggregate', 'database role', 'file format'] },
  ],
  m2: [
    { term: 'schema', definition: 'a namespace that organizes database objects', application: 'distinguishing staging.eligibility from production.eligibility', misconception: 'it is the same thing as a warehouse', wrong: ['row', 'query result', 'OAuth scope'] },
    { term: 'view', definition: 'a saved query exposed like a table', application: 'presenting launch readiness without duplicating source storage', misconception: 'it always stores independent physical data', wrong: ['stage', 'warehouse', 'primary key'] },
    { term: 'information schema', definition: 'metadata views describing objects and columns', application: 'discovering column names and data types', misconception: 'it should be used to inspect production PHI with SELECT *', wrong: ['claim ledger', 'webhook log', 'application cache'] },
    { term: 'fully qualified name', definition: 'an object reference including database and schema context', application: 'querying PROD.CURATED.IMPLEMENTATIONS', misconception: 'it makes permissions unnecessary', wrong: ['column alias', 'window frame', 'sort key'] },
    { term: 'ERD', definition: 'a diagram showing entities, keys, and expected relationships', application: 'tracing clients to implementations to milestones', misconception: 'its lines prove the data contains no orphans', wrong: ['query profile', 'access token', 'load stage'] },
    { term: 'cardinality', definition: 'the expected number of relationships between entities', application: 'confirming one client can have many implementations', misconception: 'it describes only the number of table columns', wrong: ['latency', 'warehouse size', 'data type'] },
    { term: 'data dictionary', definition: 'governed definitions, types, ownership, values, and lineage for fields', application: 'clarifying what active_status means', misconception: 'column names are enough for shared understanding', wrong: ['query cache', 'release branch', 'TLS certificate'] },
    { term: 'lineage', definition: 'the trace of data from source through transformations to consumers', application: 'finding where a payer label changed', misconception: 'it ends when data reaches the warehouse', wrong: ['pagination', 'index order', 'API route'] },
    { term: 'business definition', definition: 'the agreed meaning and inclusion logic of a field or metric', application: 'distinguishing active members from eligibility rows', misconception: 'technical type alone defines meaning', wrong: ['query ID', 'file size', 'role grant'] },
    { term: 'object ownership', definition: 'the role or authority responsible for controlling an object', application: 'determining who may grant access to a view', misconception: 'ownership and data stewardship are always identical', wrong: ['row grain', 'filter predicate', 'window rank'] },
  ],
  m3: [
    { term: 'SELECT', definition: 'the clause that defines output expressions and columns', application: 'returning client_id and launch_date', misconception: 'it guarantees result order', code: 'SELECT client_id, launch_date FROM implementations;', wrong: ['WHERE', 'HAVING', 'GRANT'] },
    { term: 'WHERE', definition: 'the clause that keeps rows whose predicate evaluates true', application: 'finding overdue active implementations', misconception: 'it is evaluated after grouped aggregates', code: "SELECT * FROM implementations WHERE status = 'active';", wrong: ['ORDER BY', 'CREATE', 'WINDOW'] },
    { term: 'ORDER BY', definition: 'the clause that defines output sequence', application: 'sorting defects by severity then opened date', misconception: 'table storage order is an equivalent guarantee', wrong: ['GROUP BY', 'DROP', 'WITH'] },
    { term: 'LIMIT', definition: 'a clause that restricts returned rows after ordering', application: 'returning the five highest defect rates', misconception: 'it produces a stable top set without ORDER BY', wrong: ['JOIN', 'CASE', 'CAST'] },
    { term: 'alias', definition: 'a temporary output or table name used for readability and reference', application: 'naming calculated duration days_to_launch', misconception: 'it changes the source column name permanently', wrong: ['constraint', 'role', 'warehouse'] },
    { term: 'IS NULL', definition: 'the predicate used to test missing values', application: 'finding implementations without target dates', misconception: '= NULL is equivalent', code: 'WHERE target_date IS NULL', wrong: ['= 0', "= ''", 'IS FALSE'] },
    { term: 'IN', definition: 'a predicate that tests membership in a set of values', application: 'filtering statuses to active, validation, and blocked', misconception: 'it safely handles every nullable NOT IN subquery', wrong: ['SUM', 'LAG', 'GRANT'] },
    { term: 'BETWEEN', definition: 'an inclusive range predicate', application: 'filtering dates within a known interval', misconception: 'it always matches half-open reporting periods', wrong: ['DISTINCT', 'PARTITION', 'ROLE'] },
    { term: 'LIKE', definition: 'a text pattern predicate using wildcard characters', application: 'finding labels beginning with ORIVO', misconception: 'it is the preferred join key for entities', wrong: ['COUNT', 'EXISTS', 'COPY'] },
    { term: 'deterministic ordering', definition: 'an ORDER BY that resolves all relevant ties', application: 'selecting the latest incident with timestamp plus incident_id', misconception: 'one nonunique date column is always enough', wrong: ['implicit cast', 'warehouse resume', 'schema clone'] },
  ],
  m4: [
    { term: 'COUNT(*)', definition: 'the count of rows including rows with null values', application: 'counting eligibility records', misconception: 'it counts only non-null values in one column', wrong: ['COUNT(column)', 'AVG', 'RANK'] },
    { term: 'COUNT(column)', definition: 'the count of non-null values in a column', application: 'counting records with populated target_date', misconception: 'it is always equal to COUNT(*)', wrong: ['SUM', 'MAX', 'ROW_NUMBER'] },
    { term: 'COUNT(DISTINCT x)', definition: 'the count of unique non-null values', application: 'counting unique members', misconception: 'it preserves duplicate eligibility periods as separate members', wrong: ['COUNT(*)', 'SUM(x)', 'MIN(x)'] },
    { term: 'GROUP BY', definition: 'the clause that creates one result group per unique dimension combination', application: 'calculating paid amount by payer and month', misconception: 'it preserves every detail row unchanged', wrong: ['ORDER BY', 'ALTER', 'QUALIFY'] },
    { term: 'HAVING', definition: 'the clause that filters grouped results', application: 'finding clients with more than three defects', misconception: 'it should replace every WHERE predicate', wrong: ['SELECT', 'COPY', 'ROLE'] },
    { term: 'SUM', definition: 'the total of non-null numeric values at the current grouping grain', application: 'calculating paid claims by payer', misconception: 'it cannot be inflated by joins', wrong: ['ROW_NUMBER', 'EXISTS', 'CAST'] },
    { term: 'AVG', definition: 'the mean of non-null numeric values', application: 'average implementation duration', misconception: 'null rows are automatically included as zero', wrong: ['MAX', 'COUNT(*)', 'UNION'] },
    { term: 'conditional aggregation', definition: 'aggregate functions applied to CASE-classified rows', application: 'calculating pass, warning, and fail counts', misconception: 'overlapping CASE rules cannot double-count', wrong: ['schema inspection', 'role inheritance', 'stage loading'] },
    { term: 'denominator control', definition: 'an explicit definition of the population used in a rate', application: 'calculating defect rate among eligible releases', misconception: 'every row in the joined query belongs in the denominator', wrong: ['warehouse scaling', 'query tagging', 'file compression'] },
    { term: 'output grain', definition: 'what one aggregated result row represents', application: 'one row per client-month', misconception: 'it is irrelevant after GROUP BY', wrong: ['TLS version', 'OAuth audience', 'stage URL'] },
  ],
  m5: [
    { term: 'INNER JOIN', definition: 'a join returning matched row combinations only', application: 'returning implementations with valid clients', misconception: 'it preserves unmatched implementations', wrong: ['LEFT JOIN', 'FULL JOIN', 'CROSS JOIN'] },
    { term: 'LEFT JOIN', definition: 'a join preserving all left rows and matched right rows', application: 'finding pharmacies without payer mappings', misconception: 'a right-side WHERE filter can never remove unmatched rows', wrong: ['INNER JOIN', 'UNION', 'GROUP BY'] },
    { term: 'FULL OUTER JOIN', definition: 'a join preserving unmatched rows from both sides', application: 'source-target reconciliation', misconception: 'it is supported identically by every SQL engine including SQLite', wrong: ['LEFT JOIN only', 'CROSS JOIN', 'SEMI JOIN'] },
    { term: 'anti-join', definition: 'a pattern returning rows with no matching related record', application: 'finding implementations without milestones', misconception: 'it requires deleting matches first', wrong: ['aggregate join', 'role grant', 'warehouse resize'] },
    { term: 'join predicate', definition: 'the condition defining which rows relate', application: 'matching member_id and payer_id', misconception: 'same column names prove business equivalence', wrong: ['sort direction', 'schema owner', 'query tag'] },
    { term: 'row multiplication', definition: 'an increase from multiple matching combinations during a join', application: 'paid amounts tripling after claims join to several measures', misconception: 'DISTINCT always fixes the business logic', wrong: ['null sorting', 'warehouse suspension', 'date parsing'] },
    { term: 'driving table', definition: 'the source population a query intends to preserve or analyze', application: 'starting from all pharmacies when checking mappings', misconception: 'join order in written SQL always determines optimizer execution', wrong: ['result cache', 'OAuth client', 'data stage'] },
    { term: 'match rate', definition: 'the share of driving rows that found the expected relationship', application: 'measuring pharmacy-to-payer mapping completeness', misconception: 'a successful query implies a 100 percent match rate', wrong: ['credit usage', 'query runtime', 'column count'] },
    { term: 'composite join', definition: 'a join using multiple columns that together define the relationship', application: 'member, payer, and effective date matching', misconception: 'one convenient column is always sufficient', wrong: ['single alias', 'window rank', 'file pattern'] },
    { term: 'orphan record', definition: 'a child row without a valid parent relationship', application: 'implementation referencing a missing client', misconception: 'it is impossible when constraints are absent', wrong: ['duplicate parent', 'result row', 'warehouse queue'] },
  ],
  m6: [
    { term: 'CASE', definition: 'an ordered conditional expression returning the first matching result', application: 'classifying release readiness', misconception: 'rule order never matters', wrong: ['JOIN', 'GRANT', 'COPY'] },
    { term: 'three-valued logic', definition: 'SQL boolean evaluation using true, false, and unknown', application: 'understanding null comparisons in WHERE', misconception: 'unknown is the same as false in every context', wrong: ['binary storage', 'role hierarchy', 'warehouse state'] },
    { term: 'COALESCE', definition: 'an expression returning the first non-null argument', application: 'displaying Unassigned for missing owner', misconception: 'it repairs the underlying source data', wrong: ['COUNT', 'RANK', 'CLONE'] },
    { term: 'exact duplicate', definition: 'a repeated row with identical compared values', application: 'finding repeated eligibility rows', misconception: 'every business duplicate is exact', wrong: ['foreign key', 'window frame', 'stage file'] },
    { term: 'business duplicate', definition: 'multiple rows sharing a business identity but differing elsewhere', application: 'two eligibility periods for the same member and start date', misconception: 'DISTINCT necessarily identifies the correct survivor', wrong: ['query result', 'role grant', 'schema clone'] },
    { term: 'survivorship rule', definition: 'a deterministic rule choosing the retained record among duplicates', application: 'preferring authoritative source then latest update', misconception: 'newest timestamp is always authoritative', wrong: ['query timeout', 'warehouse size', 'stage type'] },
    { term: 'raw value preservation', definition: 'keeping original source data while creating standardized fields', application: 'retaining payer label before trimming and casing', misconception: 'cleanup should overwrite source evidence', wrong: ['pagination', 'role inheritance', 'query cache'] },
    { term: 'missing-data flag', definition: 'an explicit indicator that a required or important value is absent', application: 'flagging missing production dates', misconception: 'COALESCE makes the flag unnecessary', wrong: ['primary key', 'warehouse credit', 'file format'] },
    { term: 'null-safe anti-join', definition: 'a NOT EXISTS or equivalent pattern unaffected by nullable list values', application: 'finding members absent from a target', misconception: 'NOT IN is always equivalent', wrong: ['INNER JOIN', 'ORDER BY', 'CREATE ROLE'] },
    { term: 'standardization', definition: 'controlled transformation to a consistent representation', application: 'trimming whitespace in payer labels', misconception: 'it should create matches between unrelated identifiers', wrong: ['warehouse cloning', 'query history', 'API polling'] },
  ],
  m7: [
    { term: 'scalar subquery', definition: 'a subquery expected to return one value', application: 'comparing client defect rate to portfolio average', misconception: 'multiple returned rows are automatically combined', wrong: ['table function', 'warehouse', 'stage'] },
    { term: 'list subquery', definition: 'a subquery returning a set used by membership tests', application: 'finding clients in a high-risk payer set', misconception: 'NOT IN is null-safe by default', wrong: ['window frame', 'role grant', 'file format'] },
    { term: 'correlated subquery', definition: 'a subquery referencing values from the outer row', application: 'checking related milestones per implementation', misconception: 'it always executes only once', wrong: ['constant subquery', 'schema clone', 'result cache'] },
    { term: 'EXISTS', definition: 'a predicate testing whether at least one related row exists', application: 'finding clients with defects', misconception: 'it returns all subquery columns', wrong: ['SUM', 'CAST', 'GRANT'] },
    { term: 'NOT EXISTS', definition: 'a predicate testing that no qualifying related row exists', application: 'finding active implementations without validation milestones', misconception: 'it is unsafe whenever nulls exist in related keys', wrong: ['NOT IN only', 'ORDER BY', 'COPY INTO'] },
    { term: 'CTE', definition: 'a named intermediate query result available to the following statement', application: 'separating source eligibility from quality controls', misconception: 'it is always materialized and faster', wrong: ['database schema', 'warehouse role', 'stage file'] },
    { term: 'query decomposition', definition: 'splitting complex logic into testable business steps', application: 'separating eligibility, joins, metrics, and presentation', misconception: 'only the final output needs validation', wrong: ['column masking', 'OAuth flow', 'DNS routing'] },
    { term: 'known-answer fixture', definition: 'a small dataset with predetermined expected results', application: 'regression testing a release query', misconception: 'production output alone is a sufficient test oracle', wrong: ['warehouse monitor', 'schema owner', 'query tag'] },
    { term: 'intermediate grain', definition: 'what one row represents after each transformation step', application: 'validating a CTE before joining it', misconception: 'only final grain matters', wrong: ['credit rate', 'stage path', 'role name'] },
    { term: 'dependency order', definition: 'the sequence in which query components rely on prior results', application: 'reviewing CTEs from source to final output', misconception: 'review should begin only at presentation aliases', wrong: ['sort order', 'OAuth audience', 'file compression'] },
  ],
  m8: [
    { term: 'window function', definition: 'a calculation across related rows that preserves detail rows', application: 'showing each status event with sequence number', misconception: 'it collapses rows like GROUP BY', wrong: ['aggregate-only query', 'warehouse', 'stage'] },
    { term: 'PARTITION BY', definition: 'the clause defining independent groups for a window calculation', application: 'ranking events within each implementation', misconception: 'it sorts the final output automatically', wrong: ['GROUP BY', 'ORDER BY final', 'WHERE'] },
    { term: 'window ORDER BY', definition: 'the sequence used inside each partition', application: 'ordering releases by release date', misconception: 'ties never need a secondary key', wrong: ['schema order', 'warehouse queue', 'stage listing'] },
    { term: 'ROW_NUMBER', definition: 'a unique sequential number assigned within a window partition', application: 'selecting the latest milestone row', misconception: 'ties receive the same number', wrong: ['RANK', 'COUNT', 'SUM'] },
    { term: 'RANK', definition: 'a ranking that gives ties equal rank and leaves gaps', application: 'ranking clients by equal defect rates', misconception: 'it never leaves gaps', wrong: ['DENSE_RANK', 'ROW_NUMBER', 'LAG'] },
    { term: 'DENSE_RANK', definition: 'a ranking that gives ties equal rank without gaps', application: 'grouping equal score positions', misconception: 'it always produces unique row numbers', wrong: ['ROW_NUMBER', 'SUM', 'LEAD'] },
    { term: 'LAG', definition: 'a function returning a prior row value in window order', application: 'comparing current release volume to prior release', misconception: 'it requires a self-join in every engine', wrong: ['LEAD', 'MAX', 'EXISTS'] },
    { term: 'LEAD', definition: 'a function returning a following row value in window order', application: 'finding the next milestone date', misconception: 'it changes physical row order', wrong: ['LAG', 'COUNT', 'CAST'] },
    { term: 'window frame', definition: 'the subset of ordered partition rows contributing to a window calculation', application: 'calculating a three-period moving average', misconception: 'default frames always match business intent', wrong: ['schema namespace', 'role scope', 'stage format'] },
    { term: 'running total', definition: 'a cumulative aggregate from a defined start through the current row', application: 'year-to-date launches', misconception: 'detail data can be joined without checking duplicate inflation', wrong: ['single-row total', 'warehouse credit', 'query ID'] },
  ],
  m9: [
    { term: 'control total', definition: 'an independent count, distinct key count, sum, or range used to validate completeness', application: 'comparing source and target release populations', misconception: 'row count alone proves exact equality', wrong: ['warehouse size', 'role hierarchy', 'stage URL'] },
    { term: 'source-only record', definition: 'a record expected from the source but absent in the target', application: 'identifying failed loads', misconception: 'matching aggregate totals make it irrelevant', wrong: ['target-only record', 'matched row', 'query alias'] },
    { term: 'target-only record', definition: 'a target record with no corresponding source record', application: 'detecting stale or duplicate target data', misconception: 'extra rows are always harmless', wrong: ['source-only record', 'warehouse queue', 'column type'] },
    { term: 'quality threshold', definition: 'a predefined tolerance that maps measured results to pass, warning, or fail', application: 'blocking release above a duplicate-rate limit', misconception: 'it should be chosen after seeing the results', wrong: ['query timeout', 'stage file', 'role owner'] },
    { term: 'exception set', definition: 'the detailed records violating a validation rule', application: 'returning invalid eligibility dates', misconception: 'an aggregate failed count is equally actionable', wrong: ['result cache', 'warehouse monitor', 'API token'] },
    { term: 'release churn', definition: 'the record-level additions and removals between release populations', application: 'finding 500 changed member IDs despite stable totals', misconception: 'equal counts imply zero churn', wrong: ['warehouse credits', 'schema clone', 'query tag'] },
    { term: 'conditional go', definition: 'a launch approval with explicit accepted risk, owner, deadline, and conditions', application: 'proceeding with a documented low-impact defect', misconception: 'it is an informal way to ignore warnings', wrong: ['automatic pass', 'no-go', 'data type'] },
    { term: 'no-go', definition: 'a decision that release risk exceeds approved tolerance', application: 'blocking a high-volume missing payer mapping', misconception: 'it requires every check to fail', wrong: ['warning only', 'warehouse suspend', 'stage upload'] },
    { term: 'release certification', definition: 'the evidence-backed decision process confirming readiness against defined controls', application: 'approving weekly payer data publication', misconception: 'a successful load job alone is sufficient', wrong: ['worksheet name', 'role grant', 'file compression'] },
    { term: 'variance disposition', definition: 'a documented explanation and owner for each identified difference', application: 'classifying expected additions versus defects', misconception: 'small differences never need explanation', wrong: ['query profile', 'schema path', 'warehouse size'] },
  ],
  m10: [
    { term: 'Snowflake account', definition: 'the top-level Snowflake environment and security boundary', application: 'identifying the organization account being used', misconception: 'it is the same as a virtual warehouse', wrong: ['schema', 'view', 'stage'] },
    { term: 'Snowflake database', definition: 'a logical collection of schemas and objects', application: 'separating DEV and PROD data domains', misconception: 'it provides compute for queries', wrong: ['warehouse', 'role', 'worksheet'] },
    { term: 'virtual warehouse', definition: 'independent compute used to execute queries and loads', application: 'running release validation SQL', misconception: 'it permanently stores table rows', wrong: ['database', 'schema', 'stage'] },
    { term: 'role', definition: 'a securable identity grouping privileges', application: 'granting read access to curated release tables', misconception: 'seeing a database proves SELECT access to every table', wrong: ['warehouse size', 'query result', 'file format'] },
    { term: 'worksheet', definition: 'a Snowsight workspace for SQL, context, and saved analysis', application: 'organizing release validation queries', misconception: 'it is a production data table', wrong: ['stage', 'database', 'role'] },
    { term: 'query history', definition: 'execution evidence including query text, timing, status, user, and warehouse', application: 'troubleshooting a slow validation query', misconception: 'a screenshot provides equivalent traceability', wrong: ['data dictionary', 'ERD', 'OAuth log'] },
    { term: 'stage', definition: 'a Snowflake location for files used in loading or unloading', application: 'holding weekly CSV files before COPY', misconception: 'it is the final curated table', wrong: ['view', 'warehouse', 'role'] },
    { term: 'zero-copy clone', definition: 'a metadata-based copy that initially shares underlying storage', application: 'creating an isolated test copy', misconception: 'it remains cost-free regardless of later changes', wrong: ['full export', 'role grant', 'query result'] },
    { term: 'Time Travel', definition: 'access to historical object states within configured retention', application: 'comparing a table before a bad transformation', misconception: 'it is an unlimited backup', wrong: ['result cache', 'stage retention', 'OAuth refresh'] },
    { term: 'fully qualified Snowflake name', definition: 'database.schema.object reference', application: 'querying PROD.CURATED.DATA_RELEASES', misconception: 'it bypasses role privileges', wrong: ['column alias', 'warehouse name', 'query tag'] },
  ],
  m11: [
    { term: 'Informatica mapping', definition: 'a defined flow of sources, transformations, and targets', application: 'loading eligibility data into Snowflake', misconception: 'it is simply a SQL SELECT statement', wrong: ['warehouse role', 'query result', 'API route'] },
    { term: 'taskflow', definition: 'orchestration of mapping tasks, decisions, and dependencies', application: 'running load, validation, and notification steps', misconception: 'successful orchestration proves every record loaded correctly', wrong: ['primary key', 'window frame', 'schema clone'] },
    { term: 'reject record', definition: 'a source record excluded or failed during processing', application: 'explaining target count shortfalls', misconception: 'a successful task means there are no rejects', wrong: ['query alias', 'warehouse credit', 'OAuth token'] },
    { term: 'query profile', definition: 'execution evidence showing scans, joins, time, and bottlenecks', application: 'investigating a slow Snowflake query', misconception: 'larger compute is always the first fix', wrong: ['data dictionary', 'release note', 'stage file'] },
    { term: 'early filtering', definition: 'reducing the working population before expensive joins and aggregates', application: 'limiting claims to one weekly release', misconception: 'selecting all years first has no cost impact', wrong: ['late aliasing', 'role inheritance', 'API retry'] },
    { term: 'AI-grounded SQL prompt', definition: 'a prompt containing actual schema, grain, rules, and expected output', application: 'asking AI to draft a reconciliation query', misconception: 'a vague business question is enough to prevent hallucination', wrong: ['production data dump', 'unreviewed delete', 'OAuth grant'] },
    { term: 'known-answer validation', definition: 'testing generated SQL against a fixture with predetermined results', application: 'checking AI join and null logic', misconception: 'valid syntax proves correct business logic', wrong: ['warehouse resume', 'schema clone', 'result export'] },
    { term: 'destructive statement review', definition: 'explicit control before executing UPDATE, DELETE, MERGE, DROP, or DDL', application: 'preventing AI-generated production damage', misconception: 'AI-generated statements are safe when they include comments', wrong: ['SELECT-only test', 'query tag', 'data dictionary'] },
    { term: 'release capstone evidence', definition: 'queries, results, exception sets, thresholds, and decision rationale', application: 'defending go, conditional-go, or no-go', misconception: 'an executive summary alone is sufficient', wrong: ['worksheet theme', 'role name', 'stage path'] },
    { term: 'STAR translation', definition: 'a concise interview story connecting situation, task, actions, and measured result', application: 'explaining release certification leadership', misconception: 'reciting SQL syntax demonstrates leadership impact', wrong: ['query plan only', 'schema diagram only', 'raw log only'] },
  ],
}

const sourceMap: Record<string, { label: string; url: string }> = {
  m10: { label: 'Snowflake Documentation', url: 'https://docs.snowflake.com/' },
  m11: { label: 'Informatica Cloud Data Integration Documentation', url: 'https://docs.informatica.com/integration-cloud/data-integration/current-version.html' },
}
const defaultSource = { label: 'PostgreSQL SQL Language', url: 'https://www.postgresql.org/docs/current/sql.html' }

function makeOptions(correct: string, wrong: string[], prefix: string) {
  return [correct, ...wrong.slice(0, 3)].map((text, index) => ({ id: `${prefix}-${index}`, text }))
}

function buildQuestions(moduleId: string, concept: Concept, index: number): QuizQuestion[] {
  const source = sourceMap[moduleId] ?? defaultSource
  const base = `${moduleId}-${index}`
  const definitionOptions = makeOptions(concept.definition, [concept.misconception, ...concept.wrong], `${base}-d`)
  const termOptions = makeOptions(concept.term, concept.wrong, `${base}-a`)
  const misconceptionOptions = makeOptions(concept.misconception, [concept.definition, concept.application, `a valid use of ${concept.term}`], `${base}-m`)
  return [
    { id: `${base}-definition`, courseId: 'sql-product-implementation', moduleId, type: 'single', prompt: `Which definition best describes ${concept.term}?`, code: concept.code, table: concept.table, options: definitionOptions, correctOptionIds: [definitionOptions[0].id], explanation: `${concept.term} means ${concept.definition}.`, sourceLabel: source.label, sourceUrl: source.url, difficulty: 'foundation' },
    { id: `${base}-application`, courseId: 'sql-product-implementation', moduleId, type: 'single', prompt: `Which SQL or data concept is most directly applied when ${concept.application}?`, code: concept.code, table: concept.table, options: termOptions, correctOptionIds: [termOptions[0].id], explanation: `The scenario is an application of ${concept.term}: ${concept.definition}.`, sourceLabel: source.label, sourceUrl: source.url, difficulty: 'application' },
    { id: `${base}-review`, courseId: 'sql-product-implementation', moduleId, type: 'single', prompt: `Which statement is a dangerous misconception about ${concept.term}?`, code: concept.code, table: concept.table, options: misconceptionOptions, correctOptionIds: [misconceptionOptions[0].id], explanation: `The misconception is “${concept.misconception}.” The correct model is ${concept.definition}.`, sourceLabel: source.label, sourceUrl: source.url, difficulty: 'advanced' },
  ]
}

export const sqlQuestionBank: QuizQuestion[] = Object.entries(moduleConcepts).flatMap(([moduleId, concepts]) => concepts.flatMap((concept, index) => buildQuestions(moduleId, concept, index + 1)))

export const sqlQuizDefinitions: QuizDefinition[] = [
  ...Object.keys(moduleConcepts).map((moduleId, index) => ({ id: `sql-${moduleId}-quiz`, courseId: 'sql-product-implementation', moduleId, title: `SQL Module ${index + 1} assessment`, description: 'A randomized 12-question assessment drawn from a 30-question module bank.', questionCount: 12, passingScore: 80 })),
  { id: 'sql-final-assessment', courseId: 'sql-product-implementation', title: 'SQL for Product and Implementation Leaders final assessment', description: `A randomized 40-question assessment drawn from ${Object.keys(moduleConcepts).length * 30} questions across all modules.`, questionCount: 40, passingScore: 80 },
]
