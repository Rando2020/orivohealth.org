-- ORI-110 learner labs. Complete each TODO before opening the answer file.

-- Lab 1: Define table grain and candidate keys.
-- TODO: return each implementation and count its milestones.

-- Lab 2: Find overdue implementations.
-- Assume the reporting date is 2025-10-15.
-- TODO: include active, validation, and blocked records with target dates before the reporting date and no production date.

-- Lab 3: Identify active pharmacies missing an active payer mapping.
-- TODO: preserve every active pharmacy.

-- Lab 4: Calculate paid claim totals by payer and service month.
-- TODO: exclude reversed claims and return payer name, month, claim count, and paid amount.

-- Lab 5: Find duplicate eligibility business keys in release R002.
-- Business key: release_id, member_id, payer_id, pharmacy_id, effective_date.

-- Lab 6: Find invalid eligibility date logic.
-- TODO: termination_date earlier than effective_date.

-- Lab 7: Reconcile R002 source rows and loaded target rows.
-- TODO: calculate expected source count, actual record count, loaded count, and difference.

-- Lab 8: Compare R001 and R002 member populations.
-- TODO: classify member IDs as prior_only, current_only, or both.

-- Lab 9: Rank clients by open defect rate.
-- Define defect rate as open defects divided by data releases. State limitations.

-- Lab 10: Find the latest milestone per implementation.
-- TODO: use ROW_NUMBER with a deterministic tie breaker.

-- Lab 11: Calculate week-over-week source volume change.
-- TODO: use LAG partitioned by client and payer.

-- Lab 12: Build a launch-readiness dataset.
-- Include implementation, client, target date, milestone summary, open critical/high defect count, and readiness category.

-- Lab 13: Build release control totals.
-- For each release return source_row_count, eligibility row count, loaded row count, distinct member count, duplicate-group count, invalid-date count, and missing-pharmacy count.

-- Lab 14: Create release certification decision logic.
-- Suggested rules:
-- NO_GO when any critical defect is open or any missing pharmacy mapping exists.
-- CONDITIONAL_GO when warnings exist but no blocking failure exists.
-- GO when all controls pass.

-- Lab 15: Create an executive implementation dashboard query.
-- One row per client with active implementations, overdue implementations, production implementations, open defects, and open incidents.
