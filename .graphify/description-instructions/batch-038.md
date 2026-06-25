# Node Description Batch 39 of 49

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_parallaxy": "parallaxY()" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L56 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_springs": "springs" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L23 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_t": "_t" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L33 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_tailwind_extend": "extend" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.tailwind.js:L11 | neighbors=[dispatch-aptmaintenanceinc-com-motion.t…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_theme_muitheme": "muiTheme" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-theme.js:L87 | neighbors=[dispatch-aptmaintenanceinc-com-theme.js]
- "design_extract_output_dispatch_aptmaintenanceinc_com_theme_theme": "theme" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-theme.js:L45 | neighbors=[dispatch-aptmaintenanceinc-com-theme.js]
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
- "drizzle_0003_mysterious_darkhawk_inventory_transactions": "inventory_transactions" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L141 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_invoice_line_items": "invoice_line_items" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L154 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_invoices": "invoices" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L166 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_job_costs": "job_costs" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L183 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_job_performance_history": "job_performance_history" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L195 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_new_contact_queue": "new_contact_queue" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L210 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_orgs": "orgs" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L229 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_properties": "properties" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L241 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_push_subscriptions": "push_subscriptions" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L261 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_sentinel_log": "sentinel_log" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L274 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_shifts": "shifts" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L285 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_tenant_contacts": "tenant_contacts" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L300 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_time_off_requests": "time_off_requests" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L314 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0003_mysterious_darkhawk_trade_duration_defaults": "trade_duration_defaults" | kind=code-symbol | source=tech-pwa/drizzle/0003_mysterious_darkhawk.sql:L328 | neighbors=[0003_mysterious_darkhawk.sql]
- "drizzle_0007_curly_kree_workflow_events": "workflow_events" | kind=code-symbol | source=tech-pwa/drizzle/0007_curly_kree.sql:L1 | neighbors=[0007_curly_kree.sql]
- "e2e_accessibility_spec_pages_dispatch": "PAGES_DISPATCH" | kind=code-symbol | source=tech-pwa/tests/e2e/accessibility.spec.ts:L5 | neighbors=[accessibility.spec.ts]
- "e2e_accessibility_spec_pages_tech_pwa": "PAGES_TECH_PWA" | kind=code-symbol | source=tech-pwa/tests/e2e/accessibility.spec.ts:L6 | neighbors=[accessibility.spec.ts]
- "e2e_cc_full_spec_api_headers": "API_HEADERS" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L50 | neighbors=[cc-full.spec.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-038.json

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
