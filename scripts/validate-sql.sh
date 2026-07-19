#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SQL_DIR="$ROOT_DIR/public/downloads/sql-course"
DB_FILE="$(mktemp -t orivo-sql-XXXXXX.db)"
ANSWER_OUTPUT="$(mktemp -t orivo-answers-XXXXXX.txt)"
trap 'rm -f "$DB_FILE" "$ANSWER_OUTPUT"' EXIT

for file in 01_schema.sql 02_seed_data.sql 03_lab_queries.sql 04_answer_queries.sql; do
  test -s "$SQL_DIR/$file" || { echo "Missing or empty SQL asset: $file"; exit 1; }
done

sqlite3 "$DB_FILE" < "$SQL_DIR/01_schema.sql"
sqlite3 "$DB_FILE" < "$SQL_DIR/02_seed_data.sql"
sqlite3 "$DB_FILE" < "$SQL_DIR/04_answer_queries.sql" > "$ANSWER_OUTPUT"

assert_equals() {
  local expected="$1" query="$2" label="$3"
  local actual
  actual="$(sqlite3 "$DB_FILE" "$query")"
  if [[ "$actual" != "$expected" ]]; then
    echo "$label: expected $expected, received $actual"
    exit 1
  fi
}

assert_at_least() {
  local minimum="$1" query="$2" label="$3"
  local actual
  actual="$(sqlite3 "$DB_FILE" "$query")"
  if (( actual < minimum )); then
    echo "$label: expected at least $minimum, received $actual"
    exit 1
  fi
}

assert_equals 15 "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';" "table count"
assert_equals 120 "SELECT COUNT(*) FROM members;" "synthetic member count"
assert_equals 220 "SELECT COUNT(*) FROM claims;" "claim count"
assert_equals 180 "SELECT COUNT(*) FROM quality_measures;" "quality measure count"
assert_at_least 1 "SELECT COUNT(*) FROM eligibility_records WHERE termination_date < effective_date;" "invalid date fixture"
assert_at_least 1 "SELECT COUNT(*) FROM (SELECT release_id, member_id, payer_id, pharmacy_id, effective_date FROM eligibility_records GROUP BY release_id, member_id, payer_id, pharmacy_id, effective_date HAVING COUNT(*) > 1);" "duplicate fixture"
assert_at_least 2 "SELECT COUNT(*) FROM eligibility_records er LEFT JOIN pharmacies p ON p.pharmacy_id = er.pharmacy_id WHERE p.pharmacy_id IS NULL;" "missing pharmacy fixture"

if grep -Eiq '^\s*(SELECT|WITH|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b' "$SQL_DIR/03_lab_queries.sql"; then
  echo "Learner lab file contains executable solution SQL. Keep answers in 04_answer_queries.sql."
  exit 1
fi

if grep -Eiq '(service[_-]?role|secret[_-]?key|password\s*=|BEGIN (RSA|OPENSSH) PRIVATE KEY)' "$SQL_DIR"/*.sql; then
  echo "Potential credential material detected in SQL downloads."
  exit 1
fi

echo "SQL dataset validation passed."
