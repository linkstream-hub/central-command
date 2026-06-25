# Node Description Batch 207 of 412

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
- "drizzle_orm": "Drizzle ORM" | kind=entity | source=tech-pwa/src/lib/dal/CLAUDE.md | neighbors=[DAL Gate]
- "e2e_accessibility_spec_pages_dispatch": "PAGES_DISPATCH" | kind=code-symbol | source=tech-pwa/tests/e2e/accessibility.spec.ts:L5 | neighbors=[accessibility.spec.ts]
- "e2e_accessibility_spec_pages_tech_pwa": "PAGES_TECH_PWA" | kind=code-symbol | source=tech-pwa/tests/e2e/accessibility.spec.ts:L6 | neighbors=[accessibility.spec.ts]
- "e2e_cc_full_spec_api_headers": "API_HEADERS" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L50 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_flowresult": "FlowResult" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L57 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_fssync": "fsSync" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L25 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_getladate": "getLADate()" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L37 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_pathsync": "pathSync" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L27 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_record": "record()" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L67 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_results": "results" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L65 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_todayla": "todayLA" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L46 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_tomorrowla": "tomorrowLA" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L47 | neighbors=[cc-full.spec.ts]
- "e2e_go_live_spec_flowresult": "FlowResult" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L40 | neighbors=[go-live.spec.ts]
- "e2e_go_live_spec_fssync": "fsSync" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L19 | neighbors=[go-live.spec.ts]
- "e2e_go_live_spec_log": "log()" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L46 | neighbors=[go-live.spec.ts]
- "e2e_go_live_spec_pathsync": "pathSync" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L21 | neighbors=[go-live.spec.ts]
- "e2e_intake_spec": "intake.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/intake.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history]
- "e2e_phase2_verification_spec_loginasadminlong": "loginAsAdminLong()" | kind=code-symbol | source=tech-pwa/tests/e2e/phase2-verification.spec.ts:L26 | neighbors=[phase2-verification.spec.ts]
- "e2e_testing_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L1 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_ci_cd_integration": "CI/CD Integration" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L225 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_common_causes_fixes": "Common Causes & Fixes" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L162 | neighbors=[Flaky Test Patterns]
- "e2e_testing_skill_financial_critical_flow_testing": "Financial / Critical Flow Testing" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L302 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_identify_flakiness": "Identify Flakiness" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L155 | neighbors=[Flaky Test Patterns]
- "e2e_testing_skill_page_object_model_pom": "Page Object Model (POM)" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L32 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_playwright_configuration": "Playwright Configuration" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L100 | neighbors=[E2E Testing Patterns]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-206.json

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
