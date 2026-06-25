# Node Description Batch 102 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
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

- "accessibility_accessibilit_9fbbd_has_no_critical_violations_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_e274b_has_no_critical_violations_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_ef671_has_no_critical_violations_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "adr_004": "ADR-004 (Work Order Lifecycle)" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[Work Order Management Domain]
- "adr_006": "ADR-006" | kind=entity | source=tech-pwa/src/lib/dal/CLAUDE.md | neighbors=[DAL Gate]
- "adr_adr_001_dual_auth_architecture": "ADR-001-dual-auth-architecture.md" | kind=entity | source=docs/adr/ADR-001-dual-auth-architecture.md:L1 | neighbors=[ADR-001: Dual Authentication Architectu…]
- "adr_adr_001_dual_auth_architecture_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-001-dual-auth-architecture.md:L41 | neighbors=[ADR-001: Dual Authentication Architectu…]
- "adr_adr_001_dual_auth_architecture_context": "Context" | kind=entity | source=docs/adr/ADR-001-dual-auth-architecture.md:L9 | neighbors=[ADR-001: Dual Authentication Architectu…]
- "adr_adr_001_dual_auth_architecture_decision": "Decision" | kind=entity | source=docs/adr/ADR-001-dual-auth-architecture.md:L20 | neighbors=[ADR-001: Dual Authentication Architectu…]
- "adr_adr_002_neon_postgres_as_primary_database": "ADR-002-neon-postgres-as-primary-database.md" | kind=entity | source=docs/adr/ADR-002-neon-postgres-as-primary-database.md:L1 | neighbors=[ADR-002: Neon Postgres as Primary Datab…]
- "adr_adr_002_neon_postgres_as_primary_database_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-002-neon-postgres-as-primary-database.md:L58 | neighbors=[ADR-002: Neon Postgres as Primary Datab…]
- "adr_adr_002_neon_postgres_as_primary_database_context": "Context" | kind=entity | source=docs/adr/ADR-002-neon-postgres-as-primary-database.md:L9 | neighbors=[ADR-002: Neon Postgres as Primary Datab…]
- "adr_adr_002_neon_postgres_as_primary_database_decision": "Decision" | kind=entity | source=docs/adr/ADR-002-neon-postgres-as-primary-database.md:L27 | neighbors=[ADR-002: Neon Postgres as Primary Datab…]
- "adr_adr_002_neon_postgres_as_primary_database_migration_strategy": "Migration Strategy" | kind=entity | source=docs/adr/ADR-002-neon-postgres-as-primary-database.md:L47 | neighbors=[ADR-002: Neon Postgres as Primary Datab…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-101.json

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
