# Node Description Batch 206 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "docs_sheets_schema_tab_dispatcher_feedback": "Tab: `Dispatcher Feedback`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L218 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_employee_list": "Tab: `Employee List`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L280 | neighbors=[Spreadsheet: Inventory (Staff-created —…]
- "docs_sheets_schema_tab_historical_assignments": "Tab: `Historical Assignments`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L153 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_historical_tech_insights": "Tab: `Historical Tech Insights`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L159 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_inventory_master": "Tab: `Inventory Master`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L255 | neighbors=[Spreadsheet: Inventory (Staff-created —…]
- "docs_sheets_schema_tab_job_performance_history": "Tab: `Job Performance History`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L189 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_jobcomments": "Tab: `JobComments`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L194 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_leads": "Tab: `Leads`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L12 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_master_directory": "Tab: `Master Directory`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L96 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_new_contacts": "Tab: `New Contacts`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L19 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_sentinellog": "Tab: `SentinelLog`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L213 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_staff_roster": "Tab: `Staff Roster`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L170 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_tech_roster": "Tab: `Tech Roster`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L112 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_time_records": "Tab: `Time Records`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L135 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_timeoffrequests": "Tab: `TimeOffRequests`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L245 | neighbors=[Spreadsheet: Time Off Manager]
- "docs_sheets_schema_tab_trade_duration_defaults": "Tab: `Trade Duration Defaults`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L165 | neighbors=[Spreadsheet: APT Lead Intake Master]
- "docs_sheets_schema_tab_transaction_logs": "Tab: `Transaction Logs`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L269 | neighbors=[Spreadsheet: Inventory (Staff-created —…]
- "docs_sprint_standards_backend_security_standards": "BACKEND SECURITY STANDARDS" | kind=entity | source=docs/SPRINT_STANDARDS.md:L42 | neighbors=[Design and quality gates for all AG + C…]
- "docs_sprint_standards_definition_of_done_all_sprints_hard_gate_no_exceptions": "DEFINITION OF DONE — ALL SPRINTS (hard gate, no exceptions)" | kind=entity | source=docs/SPRINT_STANDARDS.md:L6 | neighbors=[Design and quality gates for all AG + C…]
- "docs_sprint_standards_sprint_standards_apt_central_command": "SPRINT STANDARDS — APT Central Command" | kind=entity | source=docs/SPRINT_STANDARDS.md:L1 | neighbors=[SPRINT_STANDARDS.md]
- "docs_sprint_standards_visual_design_standards": "VISUAL DESIGN STANDARDS" | kind=entity | source=docs/SPRINT_STANDARDS.md:L27 | neighbors=[Design and quality gates for all AG + C…]
- "domain_communications": "Communications Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | neighbors=[n8n]
- "domain_compliance": "Compliance / PAGA Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | neighbors=[PAGA Compliance]
- "domain_work_order_mgmt": "Work Order Management Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | neighbors=[ADR-004 (Work Order Lifecycle)]
- "drizzle_0000_conscious_microchip_comms_messages": "comms_messages" | kind=code-symbol | source=tech-pwa/drizzle/0000_conscious_microchip.sql:L1 | neighbors=[0000_conscious_microchip.sql]
- "drizzle_0000_conscious_microchip_job_comments": "job_comments" | kind=code-symbol | source=tech-pwa/drizzle/0000_conscious_microchip.sql:L18 | neighbors=[0000_conscious_microchip.sql]
- "drizzle_0000_conscious_microchip_jobs": "jobs" | kind=code-symbol | source=tech-pwa/drizzle/0000_conscious_microchip.sql:L29 | neighbors=[0000_conscious_microchip.sql]
- "drizzle_0000_conscious_microchip_techs": "techs" | kind=code-symbol | source=tech-pwa/drizzle/0000_conscious_microchip.sql:L67 | neighbors=[0000_conscious_microchip.sql]
- "drizzle_0000_conscious_microchip_time_records": "time_records" | kind=code-symbol | source=tech-pwa/drizzle/0000_conscious_microchip.sql:L91 | neighbors=[0000_conscious_microchip.sql]
- "drizzle_0001_nervous_black_queen": "0001_nervous_black_queen.sql" | kind=code-symbol | source=tech-pwa/drizzle/0001_nervous_black_queen.sql:L1 | neighbors=[01bf641 Initial commit — clean history]
- "drizzle_0002_noisy_shinko_yamashiro_compliance_alerts": "compliance_alerts" | kind=code-symbol | source=tech-pwa/drizzle/0002_noisy_shinko_yamashiro.sql:L1 | neighbors=[0002_noisy_shinko_yamashiro.sql]
- "drizzle_0003_mysterious_darkhawk_accrual_rules": "accrual_rules" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L1 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_attestations": "attestations" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L12 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_breaks": "breaks" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L29 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_clients": "clients" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L41 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_dispatcher_feedback": "dispatcher_feedback" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L54 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_employees": "employees" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L65 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_gmail_sync_state": "gmail_sync_state" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L98 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_historical_assignments": "historical_assignments" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L107 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_inventory_items": "inventory_items" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L122 | neighbors=[0003_mysterious_darkhawk.sql]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-205.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
