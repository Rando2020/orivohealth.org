-- ORI-110 reference answers. Alternate correct approaches are expected.

-- 1. Implementation grain and milestone count
SELECT i.implementation_id, i.implementation_name, COUNT(m.milestone_id) AS milestone_count
FROM implementations i
LEFT JOIN implementation_milestones m ON m.implementation_id = i.implementation_id
GROUP BY i.implementation_id, i.implementation_name
ORDER BY i.implementation_id;

-- 2. Overdue implementations as of 2025-10-15
SELECT implementation_id, implementation_name, status, target_launch_date,
       CAST(julianday('2025-10-15') - julianday(target_launch_date) AS INTEGER) AS days_overdue
FROM implementations
WHERE status IN ('active','validation','blocked')
  AND production_date IS NULL
  AND target_launch_date < '2025-10-15'
ORDER BY days_overdue DESC, implementation_id;

-- 3. Active pharmacies missing an active mapping
SELECT p.pharmacy_id, p.pharmacy_name
FROM pharmacies p
LEFT JOIN pharmacy_payer_mappings ppm
  ON ppm.pharmacy_id = p.pharmacy_id
 AND ppm.mapping_status = 'active'
 AND (ppm.termination_date IS NULL OR ppm.termination_date >= '2025-10-15')
WHERE p.active_flag = 1
  AND ppm.mapping_id IS NULL;

-- 4. Paid claim totals by payer-month
SELECT p.payer_name, substr(c.service_date,1,7) AS service_month,
       COUNT(*) AS paid_claim_count,
       ROUND(SUM(c.paid_amount),2) AS paid_amount
FROM claims c
JOIN payers p ON p.payer_id = c.payer_id
WHERE c.claim_status = 'paid'
GROUP BY p.payer_name, substr(c.service_date,1,7)
ORDER BY service_month, p.payer_name;

-- 5. Duplicate eligibility business keys
SELECT release_id, member_id, payer_id, pharmacy_id, effective_date, COUNT(*) AS duplicate_count
FROM eligibility_records
WHERE release_id = 'R002'
GROUP BY release_id, member_id, payer_id, pharmacy_id, effective_date
HAVING COUNT(*) > 1;

-- 6. Invalid date logic
SELECT *
FROM eligibility_records
WHERE termination_date IS NOT NULL
  AND effective_date IS NOT NULL
  AND termination_date < effective_date;

-- 7. R002 source and target controls
SELECT dr.release_id, dr.source_row_count,
       COUNT(er.eligibility_id) AS actual_record_count,
       SUM(CASE WHEN er.target_loaded_at IS NOT NULL THEN 1 ELSE 0 END) AS loaded_count,
       dr.source_row_count - SUM(CASE WHEN er.target_loaded_at IS NOT NULL THEN 1 ELSE 0 END) AS source_to_loaded_difference
FROM data_releases dr
LEFT JOIN eligibility_records er ON er.release_id = dr.release_id
WHERE dr.release_id = 'R002'
GROUP BY dr.release_id, dr.source_row_count;

-- 8. Prior/current member population classification in SQLite
WITH prior_members AS (
  SELECT DISTINCT member_id FROM eligibility_records WHERE release_id = 'R001' AND member_id IS NOT NULL
), current_members AS (
  SELECT DISTINCT member_id FROM eligibility_records WHERE release_id = 'R002' AND member_id IS NOT NULL
), all_members AS (
  SELECT member_id FROM prior_members
  UNION
  SELECT member_id FROM current_members
)
SELECT a.member_id,
       CASE WHEN p.member_id IS NOT NULL AND c.member_id IS NOT NULL THEN 'both'
            WHEN p.member_id IS NOT NULL THEN 'prior_only'
            ELSE 'current_only' END AS population_status
FROM all_members a
LEFT JOIN prior_members p ON p.member_id = a.member_id
LEFT JOIN current_members c ON c.member_id = a.member_id
ORDER BY population_status, a.member_id;

-- 9. Client open defect rate per release
WITH release_counts AS (
  SELECT client_id, COUNT(*) AS release_count FROM data_releases GROUP BY client_id
), open_defects AS (
  SELECT dr.client_id, COUNT(*) AS open_defect_count
  FROM defects d JOIN data_releases dr ON dr.release_id = d.release_id
  WHERE d.defect_status <> 'resolved'
  GROUP BY dr.client_id
)
SELECT c.client_id, c.client_name,
       COALESCE(o.open_defect_count,0) AS open_defect_count,
       COALESCE(r.release_count,0) AS release_count,
       ROUND(1.0 * COALESCE(o.open_defect_count,0) / NULLIF(r.release_count,0),3) AS defects_per_release
FROM clients c
LEFT JOIN release_counts r ON r.client_id = c.client_id
LEFT JOIN open_defects o ON o.client_id = c.client_id
ORDER BY defects_per_release DESC, c.client_id;

-- 10. Latest milestone per implementation
WITH ranked AS (
  SELECT m.*,
         ROW_NUMBER() OVER (PARTITION BY implementation_id ORDER BY updated_at DESC, milestone_id DESC) AS rn
  FROM implementation_milestones m
)
SELECT * FROM ranked WHERE rn = 1 ORDER BY implementation_id;

-- 11. Week-over-week source volume change
WITH sequenced AS (
  SELECT release_id, client_id, payer_id, release_date, source_row_count,
         LAG(source_row_count) OVER (PARTITION BY client_id, payer_id ORDER BY release_date, release_id) AS prior_count
  FROM data_releases
)
SELECT *, source_row_count - prior_count AS absolute_change,
       ROUND(100.0 * (source_row_count - prior_count) / NULLIF(prior_count,0),2) AS percent_change
FROM sequenced
ORDER BY client_id, payer_id, release_date;

-- 12. Launch-readiness dataset
WITH milestone_summary AS (
  SELECT implementation_id,
         SUM(CASE WHEN milestone_status = 'blocked' THEN 1 ELSE 0 END) AS blocked_milestones,
         SUM(CASE WHEN milestone_status <> 'complete' THEN 1 ELSE 0 END) AS incomplete_milestones
  FROM implementation_milestones GROUP BY implementation_id
), defect_summary AS (
  SELECT implementation_id,
         SUM(CASE WHEN severity IN ('critical','high') AND defect_status <> 'resolved' THEN 1 ELSE 0 END) AS blocking_defects
  FROM defects GROUP BY implementation_id
)
SELECT i.implementation_id, c.client_name, i.status, i.target_launch_date,
       COALESCE(ms.blocked_milestones,0) AS blocked_milestones,
       COALESCE(ms.incomplete_milestones,0) AS incomplete_milestones,
       COALESCE(ds.blocking_defects,0) AS blocking_defects,
       CASE WHEN i.production_date IS NOT NULL THEN 'production'
            WHEN COALESCE(ds.blocking_defects,0) > 0 OR COALESCE(ms.blocked_milestones,0) > 0 THEN 'blocked'
            WHEN i.target_launch_date < '2025-10-15' THEN 'at_risk'
            WHEN COALESCE(ms.incomplete_milestones,0) = 0 THEN 'ready'
            ELSE 'in_progress' END AS readiness
FROM implementations i
JOIN clients c ON c.client_id = i.client_id
LEFT JOIN milestone_summary ms ON ms.implementation_id = i.implementation_id
LEFT JOIN defect_summary ds ON ds.implementation_id = i.implementation_id
ORDER BY c.client_name, i.implementation_id;

-- 13. Release control totals
WITH duplicate_groups AS (
  SELECT release_id, COUNT(*) AS duplicate_group_count
  FROM (
    SELECT release_id, member_id, payer_id, pharmacy_id, effective_date
    FROM eligibility_records
    GROUP BY release_id, member_id, payer_id, pharmacy_id, effective_date
    HAVING COUNT(*) > 1
  ) x GROUP BY release_id
), controls AS (
  SELECT dr.release_id, dr.source_row_count,
         COUNT(er.eligibility_id) AS eligibility_row_count,
         SUM(CASE WHEN er.target_loaded_at IS NOT NULL THEN 1 ELSE 0 END) AS loaded_row_count,
         COUNT(DISTINCT er.member_id) AS distinct_member_count,
         SUM(CASE WHEN er.termination_date < er.effective_date THEN 1 ELSE 0 END) AS invalid_date_count,
         SUM(CASE WHEN p.pharmacy_id IS NULL THEN 1 ELSE 0 END) AS missing_pharmacy_count
  FROM data_releases dr
  LEFT JOIN eligibility_records er ON er.release_id = dr.release_id
  LEFT JOIN pharmacies p ON p.pharmacy_id = er.pharmacy_id
  GROUP BY dr.release_id, dr.source_row_count
)
SELECT c.*, COALESCE(d.duplicate_group_count,0) AS duplicate_group_count
FROM controls c LEFT JOIN duplicate_groups d ON d.release_id = c.release_id
ORDER BY c.release_id;

-- 14. Release certification
WITH controls AS (
  SELECT dr.release_id,
         SUM(CASE WHEN p.pharmacy_id IS NULL THEN 1 ELSE 0 END) AS missing_pharmacy_count,
         SUM(CASE WHEN er.termination_date < er.effective_date THEN 1 ELSE 0 END) AS invalid_date_count,
         dr.source_row_count - SUM(CASE WHEN er.target_loaded_at IS NOT NULL THEN 1 ELSE 0 END) AS load_difference
  FROM data_releases dr
  LEFT JOIN eligibility_records er ON er.release_id = dr.release_id
  LEFT JOIN pharmacies p ON p.pharmacy_id = er.pharmacy_id
  GROUP BY dr.release_id, dr.source_row_count
), defects_by_release AS (
  SELECT release_id,
         SUM(CASE WHEN severity = 'critical' AND defect_status <> 'resolved' THEN 1 ELSE 0 END) AS open_critical,
         SUM(CASE WHEN severity IN ('medium','low') AND defect_status <> 'resolved' THEN 1 ELSE 0 END) AS open_warning
  FROM defects GROUP BY release_id
)
SELECT c.release_id,
       CASE WHEN COALESCE(d.open_critical,0) > 0 OR c.missing_pharmacy_count > 0 OR c.invalid_date_count > 0 THEN 'NO_GO'
            WHEN COALESCE(d.open_warning,0) > 0 OR c.load_difference <> 0 THEN 'CONDITIONAL_GO'
            ELSE 'GO' END AS certification_decision,
       c.*, COALESCE(d.open_critical,0) AS open_critical, COALESCE(d.open_warning,0) AS open_warning
FROM controls c LEFT JOIN defects_by_release d ON d.release_id = c.release_id;

-- 15. Executive implementation dashboard
WITH impl AS (
  SELECT client_id,
         SUM(CASE WHEN status IN ('active','validation','blocked') THEN 1 ELSE 0 END) AS active_implementations,
         SUM(CASE WHEN production_date IS NULL AND target_launch_date < '2025-10-15' AND status IN ('active','validation','blocked') THEN 1 ELSE 0 END) AS overdue_implementations,
         SUM(CASE WHEN status = 'production' THEN 1 ELSE 0 END) AS production_implementations
  FROM implementations GROUP BY client_id
), def AS (
  SELECT dr.client_id, COUNT(*) AS open_defects
  FROM defects d JOIN data_releases dr ON dr.release_id = d.release_id
  WHERE d.defect_status <> 'resolved' GROUP BY dr.client_id
), inc AS (
  SELECT client_id, COUNT(*) AS open_incidents FROM support_incidents WHERE incident_status <> 'closed' GROUP BY client_id
)
SELECT c.client_id, c.client_name,
       COALESCE(i.active_implementations,0) AS active_implementations,
       COALESCE(i.overdue_implementations,0) AS overdue_implementations,
       COALESCE(i.production_implementations,0) AS production_implementations,
       COALESCE(d.open_defects,0) AS open_defects,
       COALESCE(n.open_incidents,0) AS open_incidents
FROM clients c
LEFT JOIN impl i ON i.client_id = c.client_id
LEFT JOIN def d ON d.client_id = c.client_id
LEFT JOIN inc n ON n.client_id = c.client_id
ORDER BY c.client_name;
