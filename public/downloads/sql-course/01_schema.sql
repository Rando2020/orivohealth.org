PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS support_incidents;
DROP TABLE IF EXISTS defects;
DROP TABLE IF EXISTS release_validation_results;
DROP TABLE IF EXISTS data_releases;
DROP TABLE IF EXISTS quality_measures;
DROP TABLE IF EXISTS claims;
DROP TABLE IF EXISTS eligibility_records;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS implementation_milestones;
DROP TABLE IF EXISTS implementations;
DROP TABLE IF EXISTS pharmacy_payer_mappings;
DROP TABLE IF EXISTS pharmacy_locations;
DROP TABLE IF EXISTS pharmacies;
DROP TABLE IF EXISTS payers;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  client_id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  segment TEXT NOT NULL,
  active_flag INTEGER NOT NULL CHECK (active_flag IN (0,1)),
  created_at TEXT NOT NULL
);

CREATE TABLE payers (
  payer_id TEXT PRIMARY KEY,
  payer_name TEXT NOT NULL,
  payer_type TEXT NOT NULL,
  active_flag INTEGER NOT NULL CHECK (active_flag IN (0,1))
);

CREATE TABLE pharmacies (
  pharmacy_id TEXT PRIMARY KEY,
  pharmacy_name TEXT NOT NULL,
  npi TEXT,
  active_flag INTEGER NOT NULL CHECK (active_flag IN (0,1)),
  created_at TEXT NOT NULL
);

CREATE TABLE pharmacy_locations (
  location_id TEXT PRIMARY KEY,
  pharmacy_id TEXT NOT NULL,
  store_number TEXT NOT NULL,
  city TEXT NOT NULL,
  state_code TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  opened_date TEXT,
  closed_date TEXT,
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(pharmacy_id)
);

CREATE TABLE pharmacy_payer_mappings (
  mapping_id TEXT PRIMARY KEY,
  pharmacy_id TEXT NOT NULL,
  payer_id TEXT NOT NULL,
  effective_date TEXT NOT NULL,
  termination_date TEXT,
  mapping_status TEXT NOT NULL,
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(pharmacy_id),
  FOREIGN KEY (payer_id) REFERENCES payers(payer_id)
);

CREATE TABLE implementations (
  implementation_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  payer_id TEXT,
  implementation_name TEXT NOT NULL,
  status TEXT NOT NULL,
  kickoff_date TEXT,
  target_launch_date TEXT,
  production_date TEXT,
  project_manager TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(client_id),
  FOREIGN KEY (payer_id) REFERENCES payers(payer_id)
);

CREATE TABLE implementation_milestones (
  milestone_id TEXT PRIMARY KEY,
  implementation_id TEXT NOT NULL,
  milestone_type TEXT NOT NULL,
  milestone_status TEXT NOT NULL,
  planned_date TEXT,
  completed_date TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (implementation_id) REFERENCES implementations(implementation_id)
);

CREATE TABLE members (
  member_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  synthetic_first_name TEXT NOT NULL,
  synthetic_last_name TEXT NOT NULL,
  birth_year INTEGER NOT NULL,
  state_code TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE eligibility_records (
  eligibility_id TEXT NOT NULL,
  release_id TEXT NOT NULL,
  member_id TEXT,
  payer_id TEXT,
  pharmacy_id TEXT,
  effective_date TEXT,
  termination_date TEXT,
  eligibility_status TEXT,
  source_updated_at TEXT,
  target_loaded_at TEXT
);

CREATE TABLE claims (
  claim_id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  payer_id TEXT NOT NULL,
  pharmacy_id TEXT NOT NULL,
  service_date TEXT NOT NULL,
  paid_amount NUMERIC NOT NULL,
  claim_status TEXT NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(member_id),
  FOREIGN KEY (payer_id) REFERENCES payers(payer_id),
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(pharmacy_id)
);

CREATE TABLE quality_measures (
  measure_result_id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  measure_code TEXT NOT NULL,
  measurement_year INTEGER NOT NULL,
  compliant_flag INTEGER,
  denominator_flag INTEGER NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(member_id)
);

CREATE TABLE data_releases (
  release_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  payer_id TEXT NOT NULL,
  release_date TEXT NOT NULL,
  release_type TEXT NOT NULL,
  source_row_count INTEGER NOT NULL,
  target_row_count INTEGER,
  release_status TEXT NOT NULL,
  prior_release_id TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(client_id),
  FOREIGN KEY (payer_id) REFERENCES payers(payer_id)
);

CREATE TABLE release_validation_results (
  validation_id TEXT PRIMARY KEY,
  release_id TEXT NOT NULL,
  rule_code TEXT NOT NULL,
  rule_name TEXT NOT NULL,
  severity TEXT NOT NULL,
  exception_count INTEGER NOT NULL,
  threshold_count INTEGER NOT NULL,
  validation_status TEXT NOT NULL,
  validated_at TEXT NOT NULL,
  FOREIGN KEY (release_id) REFERENCES data_releases(release_id)
);

CREATE TABLE defects (
  defect_id TEXT PRIMARY KEY,
  release_id TEXT,
  implementation_id TEXT,
  defect_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  defect_status TEXT NOT NULL,
  owner_team TEXT,
  opened_at TEXT NOT NULL,
  resolved_at TEXT,
  description TEXT NOT NULL,
  FOREIGN KEY (release_id) REFERENCES data_releases(release_id),
  FOREIGN KEY (implementation_id) REFERENCES implementations(implementation_id)
);

CREATE TABLE support_incidents (
  incident_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  implementation_id TEXT,
  severity TEXT NOT NULL,
  incident_status TEXT NOT NULL,
  opened_at TEXT NOT NULL,
  closed_at TEXT,
  root_cause_category TEXT,
  summary TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(client_id),
  FOREIGN KEY (implementation_id) REFERENCES implementations(implementation_id)
);
