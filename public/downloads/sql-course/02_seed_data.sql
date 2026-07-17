INSERT INTO clients VALUES
('C001','Orivo North Health','enterprise',1,'2024-01-10'),
('C002','Mesa Community Plan','regional',1,'2024-03-14'),
('C003','Harbor Benefit Network','enterprise',1,'2024-05-01'),
('C004','Pine Ridge Care','regional',1,'2024-07-20'),
('C005','Sunfield Health','pilot',0,'2025-01-05');

INSERT INTO payers VALUES
('P001','Northstar Health Plan','commercial',1),
('P002','Mesa Advantage','medicare',1),
('P003','Harbor Medicaid','medicaid',1),
('P004','Pine Rx Services','pbm',1),
('P005','Legacy Closed Plan','commercial',0);

INSERT INTO pharmacies VALUES
('PH001','Orivo Pharmacy One','1000000001',1,'2024-01-01'),
('PH002','Orivo Pharmacy Two','1000000002',1,'2024-01-01'),
('PH003','Orivo Pharmacy Three','1000000003',1,'2024-01-01'),
('PH004','Orivo Pharmacy Four',NULL,1,'2024-02-01'),
('PH005','Orivo Pharmacy Five','1000000005',0,'2024-02-01'),
('PH006','Orivo Pharmacy Six','1000000006',1,'2024-03-01'),
('PH007','Orivo Pharmacy Seven','1000000007',1,'2024-03-01'),
('PH008','Orivo Pharmacy Eight','1000000008',1,'2024-04-01');

INSERT INTO pharmacy_locations VALUES
('L001','PH001','00123','Milwaukee','WI','53202','2024-01-01',NULL),
('L002','PH002','00124','Madison','WI','53703','2024-01-01',NULL),
('L003','PH003','00125','Chicago','IL','60601','2024-01-01',NULL),
('L004','PH004','00126','Phoenix','AZ','85001','2024-02-01',NULL),
('L005','PH005','00127','Tucson','AZ','85701','2024-02-01','2025-12-31'),
('L006','PH006','00128','Charlotte','NC','28202','2024-03-01',NULL),
('L007','PH007','00129','Philadelphia','PA','19103','2024-03-01',NULL),
('L008','PH008','00130','New York','NY','10001','2024-04-01',NULL);

INSERT INTO pharmacy_payer_mappings VALUES
('MAP001','PH001','P001','2025-01-01',NULL,'active'),
('MAP002','PH002','P001','2025-01-01',NULL,'active'),
('MAP003','PH003','P002','2025-01-01',NULL,'active'),
('MAP004','PH004','P002','2025-01-01','2025-12-31','terminated'),
('MAP005','PH005','P003','2025-01-01',NULL,'active'),
('MAP006','PH006','P003','2025-01-01',NULL,'active'),
('MAP007','PH007','P004','2025-01-01',NULL,'active');
-- PH008 intentionally missing a payer mapping.

INSERT INTO implementations VALUES
('I001','C001','P001','Northstar Pharmacy Launch','production','2025-01-15','2025-04-01','2025-03-28','Avery Stone','2025-03-28T14:00:00Z'),
('I002','C002','P002','Mesa Advantage Expansion','validation','2025-05-01','2025-08-15',NULL,'Jordan Vale','2025-08-10T09:00:00Z'),
('I003','C003','P003','Harbor Medicaid Onboarding','blocked','2025-04-01','2025-07-01',NULL,NULL,'2025-07-20T11:00:00Z'),
('I004','C004','P004','Pine Rx Integration','active','2025-06-01','2025-09-15',NULL,'Riley North','2025-09-01T16:00:00Z'),
('I005','C001','P001','Northstar Second Wave','active','2025-07-01','2025-10-01',NULL,'Avery Stone','2025-09-15T10:00:00Z'),
('I006','C005',NULL,'Sunfield Pilot','cancelled','2025-02-01','2025-05-01',NULL,'Morgan Lake','2025-04-01T10:00:00Z'),
('I007','C003','P003','Harbor Quality Measures','production','2024-10-01','2025-01-15','2025-01-20','Taylor Quinn','2025-01-20T13:00:00Z'),
('I008','C004','P004','Pine Claims Release','validation','2025-08-01','2025-11-01',NULL,'Riley North','2025-10-20T08:00:00Z');

INSERT INTO implementation_milestones VALUES
('M001','I001','data_mapping','complete','2025-02-01','2025-01-29','2025-01-29T12:00:00Z'),
('M002','I001','uat','complete','2025-03-15','2025-03-14','2025-03-14T12:00:00Z'),
('M003','I002','data_mapping','complete','2025-06-01','2025-06-05','2025-06-05T12:00:00Z'),
('M004','I002','uat','in_progress','2025-08-01',NULL,'2025-08-10T12:00:00Z'),
('M005','I003','data_mapping','blocked','2025-05-01',NULL,'2025-07-20T12:00:00Z'),
('M006','I004','data_mapping','complete','2025-07-01','2025-07-01','2025-07-01T12:00:00Z'),
('M007','I004','uat','not_started','2025-09-01',NULL,'2025-08-15T12:00:00Z'),
('M008','I005','data_mapping','in_progress','2025-08-01',NULL,'2025-09-15T12:00:00Z'),
('M009','I007','uat','complete','2025-01-10','2025-01-18','2025-01-18T12:00:00Z'),
('M010','I008','data_mapping','complete','2025-09-01','2025-09-02','2025-09-02T12:00:00Z');

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 120)
INSERT INTO members
SELECT printf('MBR%04d',x), printf('C%03d',((x-1)%4)+1), 'Synthetic'||x, 'Member'||x, 1950 + (x%55), CASE x%6 WHEN 0 THEN 'WI' WHEN 1 THEN 'IL' WHEN 2 THEN 'AZ' WHEN 3 THEN 'NC' WHEN 4 THEN 'PA' ELSE 'NY' END FROM n;

INSERT INTO data_releases VALUES
('R001','C001','P001','2025-06-07','weekly',100,100,'published',NULL),
('R002','C001','P001','2025-06-14','weekly',104,102,'validation','R001'),
('R003','C002','P002','2025-06-07','weekly',80,80,'published',NULL),
('R004','C002','P002','2025-06-14','weekly',70,69,'validation','R003'),
('R005','C003','P003','2025-06-14','weekly',95,95,'validation',NULL),
('R006','C004','P004','2025-06-14','weekly',60,NULL,'received',NULL);

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 100)
INSERT INTO eligibility_records
SELECT printf('E1-%04d',x),'R001',printf('MBR%04d',((x-1)%120)+1),'P001',printf('PH%03d',((x-1)%3)+1),'2025-01-01',NULL,'active','2025-06-06T10:00:00Z','2025-06-07T01:00:00Z' FROM n;

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 104)
INSERT INTO eligibility_records
SELECT printf('E2-%04d',x),'R002',
 CASE WHEN x=103 THEN NULL ELSE printf('MBR%04d',((x-1)%120)+1) END,
 'P001',
 CASE WHEN x IN (99,100) THEN 'PH999' ELSE printf('PH%03d',((x-1)%3)+1) END,
 CASE WHEN x=101 THEN '2025-12-31' ELSE '2025-01-01' END,
 CASE WHEN x=101 THEN '2025-01-01' ELSE NULL END,
 CASE WHEN x=104 THEN NULL ELSE 'active' END,
 '2025-06-13T10:00:00Z',
 CASE WHEN x > 102 THEN NULL ELSE '2025-06-14T01:00:00Z' END
FROM n;
-- Intentional duplicate business record in R002.
INSERT INTO eligibility_records SELECT 'E2-DUP','R002','MBR0001','P001','PH001','2025-01-01',NULL,'active','2025-06-13T10:00:00Z','2025-06-14T01:00:00Z';

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 80)
INSERT INTO eligibility_records
SELECT printf('E3-%04d',x),'R003',printf('MBR%04d',((x+20)%120)+1),'P002','PH003','2025-01-01',NULL,'active','2025-06-06T10:00:00Z','2025-06-07T01:00:00Z' FROM n;

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 70)
INSERT INTO eligibility_records
SELECT printf('E4-%04d',x),'R004',printf('MBR%04d',((x+30)%120)+1),'P002',CASE WHEN x=70 THEN 'PH008' ELSE 'PH003' END,'2025-01-01',NULL,'active','2025-06-13T10:00:00Z',CASE WHEN x=70 THEN NULL ELSE '2025-06-14T01:00:00Z' END FROM n;

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 220)
INSERT INTO claims
SELECT printf('CLM%05d',x),printf('MBR%04d',((x-1)%120)+1),printf('P%03d',((x-1)%4)+1),printf('PH%03d',((x-1)%7)+1),date('2025-01-01','+'||(x%180)||' day'),round(5 + ((x*17)%250) + (x%10)*0.13,2),CASE WHEN x%11=0 THEN 'reversed' ELSE 'paid' END FROM n;

WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x < 180)
INSERT INTO quality_measures
SELECT printf('QM%05d',x),printf('MBR%04d',((x-1)%120)+1),CASE x%3 WHEN 0 THEN 'PQA01' WHEN 1 THEN 'PQA02' ELSE 'HEDIS01' END,2025,CASE WHEN x%7=0 THEN NULL ELSE x%2 END,1 FROM n;

INSERT INTO release_validation_results VALUES
('V001','R002','ROW_COUNT','Source and target row count','high',2,0,'fail','2025-06-14T02:00:00Z'),
('V002','R002','DUPLICATE_KEY','Duplicate eligibility business key','high',1,0,'fail','2025-06-14T02:00:00Z'),
('V003','R002','DATE_LOGIC','Termination before effective date','high',1,0,'fail','2025-06-14T02:00:00Z'),
('V004','R002','PHARMACY_MAP','Missing pharmacy mapping','critical',2,0,'fail','2025-06-14T02:00:00Z'),
('V005','R004','VOLUME_CHANGE','Volume change above threshold','medium',1,0,'warning','2025-06-14T02:00:00Z');

INSERT INTO defects VALUES
('D001','R002','I005','mapping','critical','open','Data Engineering','2025-06-14T02:05:00Z',NULL,'Two eligibility rows reference synthetic pharmacy PH999.'),
('D002','R002','I005','duplicate','high','open','Source Operations','2025-06-14T02:07:00Z',NULL,'Duplicate eligibility business key for MBR0001.'),
('D003','R002','I005','date_logic','high','open',NULL,'2025-06-14T02:08:00Z',NULL,'Termination date precedes effective date.'),
('D004','R004','I002','volume','medium','investigating','Client Operations','2025-06-14T02:10:00Z',NULL,'Weekly volume declined more than expected.');

INSERT INTO support_incidents VALUES
('INC001','C001','I001','high','closed','2025-03-28T15:00:00Z','2025-03-28T17:00:00Z','configuration','Synthetic launch status did not update after production deployment.'),
('INC002','C003','I003','critical','open','2025-07-20T11:30:00Z',NULL,NULL,'Synthetic payer mapping file failed validation.'),
('INC003','C004','I004','medium','closed','2025-08-12T09:00:00Z','2025-08-12T11:00:00Z','data_quality','Store identifier lost leading zeros during a test load.');
