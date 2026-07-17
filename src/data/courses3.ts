import { m, type Course } from './types'

export const courseGroup3: Course[] = [
  {
      id: 'hl7-v2-fundamentals',
      order: 6,
      code: 'ORI-210',
      title: 'HL7 v2 Fundamentals and Interface Implementation',
      shortTitle: 'HL7 v2',
      description:
        'Understand message structure, clinical events, interface engines, acknowledgements, mapping, testing, and production support.',
      category: 'Healthcare interoperability',
      difficulty: 'Intermediate',
      hours: 22,
      priority: 'High',
      audience: ['Healthcare implementation managers', 'Integration analysts', 'Product managers', 'Clinical operations leaders'],
      outcomes: [
        'Read the structure of common HL7 v2 messages',
        'Explain ADT, ORM, ORU, and acknowledgement workflows',
        'Create a field-level interface mapping',
        'Troubleshoot message rejection and delivery failures',
      ],
      modules: [
        m('Why HL7 v2 persists', 'Understand the standard’s role in event-driven clinical exchange.', [
          'Healthcare systems and interoperability boundaries',
          'Event-driven messaging',
          'Sending system, receiving system, and interface engine',
          'Why local implementation guides matter',
        ]),
        m('Message anatomy', 'Read delimiters, segments, fields, components, and repetitions.', [
          'MSH and message metadata',
          'PID and patient identity',
          'PV1 and encounter context',
          'Field positions, optionality, and cardinality',
        ], 'Annotate a sample ADT message field by field.'),
        m('Common message families', 'Connect clinical events to message types and trigger events.', [
          'ADT registration, admission, transfer, and discharge',
          'ORM order messages',
          'ORU results messages',
          'SIU scheduling concepts',
        ]),
        m('Orders, observations, and results', 'Read the clinical content carried by ORC, OBR, and OBX segments.', [
          'Order control and identifiers',
          'Observation request context',
          'Observation values and units',
          'Code systems and interpretation',
        ]),
        m('Acknowledgements and error handling', 'Understand how receivers accept, reject, and explain messages.', [
          'ACK and NACK concepts',
          'Control IDs and correlation',
          'Application versus transport errors',
          'Queues, retries, and replay',
        ], 'Diagnose five rejected messages and recommend the correct owner and fix.'),
        m('Interface mapping and conformance', 'Translate local source fields into a constrained implementation contract.', [
          'Message profiles',
          'Required, optional, conditional, and repeating fields',
          'Value-set mapping',
          'Conformance statements and test cases',
        ]),
        m('Production implementation and support', 'Plan connectivity, security, testing, cutover, and monitoring.', [
          'Transport and secure connectivity concepts',
          'Test patients and PHI controls',
          'Volume, sequencing, and downtime planning',
          'Operational dashboard and support runbook',
        ]),
      ],
      capstone: 'Implement a synthetic ADT feed from a hospital registration system to a downstream pharmacy platform.',
      artifact: 'Annotated messages, interface specification, mapping workbook, conformance tests, cutover plan, and support runbook.',
      interviewTranslation:
        'Explain how a patient event leaves one system, crosses an interface engine, transforms, reaches a receiver, and produces an acknowledgement.',
      visual: {
        title: 'HL7 event movement',
        steps: ['Clinical event', 'HL7 message', 'Interface engine', 'Transform', 'Receiver', 'ACK', 'Monitor'],
      },
      resources: [
        {
          label: 'HL7 backgrounder',
          url: 'https://media.hl7.org/hl7-backgrounder-brief/',
          type: 'Official documentation',
        },
        {
          label: 'HL7 v2 conformance methodology',
          url: 'https://v2.hl7.org/conformance/HL7v2_Conformance_Methodology_R1_O1_Ballot_Revised_D9_-_September_2019_Introduction.html',
          type: 'Standard',
        },
        {
          label: 'HL7 certification resources',
          url: 'https://info.hl7.org/member-toolkit/certifications',
          type: 'Official tutorial',
        },
        {
          label: 'HL7 International video channel',
          url: 'https://www.youtube.com/@HL7International',
          type: 'Video channel',
        },
      ],
      resumeBridge:
        'Your pharmacy and clinical operations background gives you the domain context that many technical implementers lack. This course adds the message mechanics.',
    },
  {
      id: 'fhir-implementation',
      order: 7,
      code: 'ORI-220',
      title: 'FHIR Implementation Fundamentals',
      shortTitle: 'FHIR',
      description:
        'Learn how FHIR models healthcare data, exposes RESTful interactions, constrains resources, and supports modern interoperability.',
      category: 'Healthcare interoperability',
      difficulty: 'Intermediate',
      hours: 28,
      priority: 'Critical',
      audience: ['Healthcare product managers', 'Implementation leaders', 'Integration analysts', 'Data architects'],
      outcomes: [
        'Read and explain common FHIR resources',
        'Use REST interactions and search parameters',
        'Understand profiles, extensions, terminology, and implementation guides',
        'Map a simple HL7 v2 workflow into FHIR resources',
      ],
      modules: [
        m('FHIR architecture', 'Understand resources and APIs as the two core implementation building blocks.', [
          'FHIR goals and exchange paradigms',
          'Resources, elements, datatypes, and metadata',
          'JSON and XML representations',
          'R4 implementation fluency with R5 awareness',
        ]),
        m('Core administrative resources', 'Model the people and organizations participating in care.', [
          'Patient',
          'Practitioner and PractitionerRole',
          'Organization and Location',
          'Encounter',
        ], 'Read and explain a Patient and Encounter bundle.'),
        m('Clinical and medication resources', 'Model observations, conditions, orders, and medications.', [
          'Observation and DiagnosticReport',
          'Condition and Procedure',
          'MedicationRequest and MedicationDispense',
          'ServiceRequest',
        ]),
        m('Coverage and financial resources', 'Understand payer-oriented FHIR data structures.', [
          'Coverage',
          'Claim and ClaimResponse',
          'ExplanationOfBenefit',
          'Identifiers and references across resources',
        ]),
        m('FHIR REST API', 'Work with standardized interactions over HTTP.', [
          'Create, read, update, delete, and history',
          'Search parameters and result bundles',
          'Conditional interactions',
          'OperationOutcome errors',
        ], 'Query a public test server with Postman and document the request and response.'),
        m('Profiles, extensions, and implementation guides', 'Understand how communities constrain the broad base standard.', [
          'StructureDefinition and profiles',
          'Must Support and cardinality',
          'Extensions and governance',
          'CapabilityStatement and implementation guides',
        ]),
        m('Terminology and validation', 'Keep coded meaning consistent across organizations.', [
          'CodeSystem, ValueSet, and ConceptMap',
          'Bindings and required terminology',
          'Resource validation',
          'Version compatibility and migration',
        ]),
        m('SMART, bulk data, and security concepts', 'Place FHIR in broader application and analytics patterns.', [
          'SMART on FHIR authorization concepts',
          'Scopes and launch context',
          'Bulk data concepts',
          'Consent, audit, and minimum necessary access',
        ]),
        m('HL7 v2 to FHIR mapping', 'Translate event-oriented messages into resource-oriented exchanges.', [
          'Mapping PID to Patient',
          'Mapping PV1 to Encounter',
          'Mapping OBX to Observation',
          'Identity, timing, and semantic gaps',
        ], 'Create an HL7 ADT-to-FHIR mapping and identify information-loss risks.'),
      ],
      capstone: 'Receive an HL7 ADT event, map it into FHIR Patient and Encounter resources, and validate the API exchange.',
      artifact: 'FHIR bundle, Postman collection, mapping specification, validation evidence, capability checklist, and error runbook.',
      interviewTranslation:
        'Compare HL7 v2 and FHIR accurately, including where FHIR is resource-based, how REST is used, and why profiles are necessary.',
      visual: {
        title: 'FHIR resource exchange',
        steps: ['Source event', 'Map resources', 'Validate profile', 'Authenticate', 'FHIR API', 'Bundle response', 'Audit'],
      },
      resources: [
        {
          label: 'FHIR R5 specification',
          url: 'https://hl7.org/fhir/R5/',
          type: 'Standard',
        },
        {
          label: 'FHIR overview for architects',
          url: 'https://hl7.org/fhir/overview-arch.html',
          type: 'Official documentation',
        },
        {
          label: 'FHIR RESTful API',
          url: 'https://hl7.org/fhir/http.html',
          type: 'Standard',
        },
        {
          label: 'FHIR documentation index',
          url: 'https://www.hl7.org/fhir/R5/documentation.html',
          type: 'Official documentation',
        },
      ],
      resumeBridge:
        'FHIR lets you combine your healthcare domain knowledge, data governance experience, and growing API fluency into a differentiated role profile.',
    },
  {
      id: 'dama-data-governance',
      order: 8,
      code: 'ORI-230',
      title: 'Data Governance with DAMA-DMBOK',
      shortTitle: 'DAMA-DMBOK',
      description:
        'Turn broad governance language into decision rights, stewardship, quality controls, metadata, lineage, issue management, and audit evidence.',
      category: 'Data and analytics',
      difficulty: 'Intermediate',
      hours: 26,
      priority: 'High',
      audience: ['Data governance managers', 'Product leaders', 'Implementation managers', 'Analytics leaders'],
      outcomes: [
        'Explain all major DMBOK knowledge areas',
        'Design a practical governance operating model',
        'Define critical data elements and measurable quality rules',
        'Create lineage, stewardship, and issue-management artifacts',
      ],
      modules: [
        m('DMBOK operating model', 'Use DMBOK as a practical system rather than a vocabulary list.', [
          'Governance at the center of data management',
          'Eleven knowledge areas',
          'Strategy, policy, standards, and controls',
          'DMBOK2 foundations and the DMBOK 3.0 modernization project',
        ]),
        m('Governance structure and decision rights', 'Make accountability visible and executable.', [
          'Executive sponsor and governance council',
          'Data owner, steward, custodian, and consumer',
          'Decision rights and escalation',
          'RACI and PASCI patterns',
        ], 'Create a governance charter and role matrix for a pharmacy data product.'),
        m('Data quality management', 'Define, measure, and remediate trust problems.', [
          'Accuracy, completeness, consistency, timeliness, validity, uniqueness',
          'Critical data elements',
          'Thresholds and scorecards',
          'Issue triage and root-cause remediation',
        ]),
        m('Metadata and lineage', 'Make data discoverable, understandable, and auditable.', [
          'Business, technical, and operational metadata',
          'Business glossary',
          'Source-to-target lineage',
          'Change impact and evidence retention',
        ]),
        m('Architecture, integration, and interoperability', 'Govern data as it moves between systems.', [
          'Data architecture principles',
          'Contracts and schemas',
          'Reference and master data',
          'Integration controls and reconciliation',
        ]),
        m('Security, privacy, and ethical use', 'Connect governance to regulated healthcare obligations.', [
          'Classification and access control',
          'HIPAA, GDPR, and CCPA operationalization',
          'Consent and retention',
          'Ethical use and minimum necessary data',
        ]),
        m('Governance in product delivery', 'Embed controls in agile delivery rather than reviewing them at the end.', [
          'Governance requirements in epics and stories',
          'Readiness gates and acceptance criteria',
          'Release certification',
          'Control monitoring and exceptions',
        ]),
        m('AI and modern platform governance', 'Extend the operating model to AI, cloud, and modern data products.', [
          'Training data and model lineage',
          'Human accountability',
          'Cloud ownership boundaries',
          'Policy-as-code and automated evidence',
        ], 'Design a governance control matrix for an AI-assisted healthcare workflow.'),
      ],
      capstone: 'Build a governance operating model for a multi-payer pharmacy product.',
      artifact: 'Charter, RACI, critical data element register, lineage map, quality scorecard, control matrix, and issue workflow.',
      interviewTranslation:
        'Move beyond saying “I did governance” by describing decision rights, controls, evidence, quality thresholds, and remediation ownership.',
      visual: {
        title: 'Governance operating loop',
        steps: ['Define ownership', 'Classify data', 'Set rules', 'Measure quality', 'Resolve issues', 'Certify release', 'Improve'],
      },
      resources: [
        {
          label: 'DAMA-DMBOK overview',
          url: 'https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/',
          type: 'Official documentation',
        },
        {
          label: 'DAMA-DMBOK 3.0 project',
          url: 'https://dama.org/dama-dmbok-3-0-project/',
          type: 'Official documentation',
        },
        {
          label: 'CDMP exam information',
          url: 'https://dama.org/certification/exam-information-and-pricing/',
          type: 'Assessment',
        },
      ],
      resumeBridge:
        'Governance is one of your strongest differentiators. The course packages your HIPAA, GDPR, CCPA, analytics, and release work into a recognized framework.',
    }
]
