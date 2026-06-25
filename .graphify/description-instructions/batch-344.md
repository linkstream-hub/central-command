# Node Description Batch 345 of 412

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

- "references_decimal_phase_calculation_examples": "Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/decimal-phase-calculation.md:L45 | neighbors=[Decimal Phase Calculation]
- "references_decimal_phase_calculation_extract_values": "Extract Values" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/decimal-phase-calculation.md:L32 | neighbors=[Decimal Phase Calculation]
- "references_decimal_phase_calculation_using_gsd_tools": "Using gsd-tools" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/decimal-phase-calculation.md:L5 | neighbors=[Decimal Phase Calculation]
- "references_doc_conflict_engine": "doc-conflict-engine.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/doc-conflict-engine.md:L1 | neighbors=[Doc Conflict Engine]
- "references_doc_conflict_engine_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/doc-conflict-engine.md:L84 | neighbors=[Doc Conflict Engine]
- "references_doc_conflict_engine_report_format": "Report Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/doc-conflict-engine.md:L15 | neighbors=[Doc Conflict Engine]
- "references_doc_conflict_engine_safety_gate": "Safety Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/doc-conflict-engine.md:L46 | neighbors=[Doc Conflict Engine]
- "references_doc_conflict_engine_severity_semantics": "Severity Semantics" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/doc-conflict-engine.md:L7 | neighbors=[Doc Conflict Engine]
- "references_doc_conflict_engine_workflow_responsibilities": "Workflow Responsibilities" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/doc-conflict-engine.md:L67 | neighbors=[Doc Conflict Engine]
- "references_domain_probes": "domain-probes.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L1 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_api_design": "API Design" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L45 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_authentication": "Authentication" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L9 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_caching": "Caching" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L93 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_dashboard": "Dashboard" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L33 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_database": "Database" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L57 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_deployment": "Deployment" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L117 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_file_upload_storage": "File Upload/Storage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L81 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_real_time_updates": "Real-Time Updates" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L21 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_search": "Search" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L69 | neighbors=[Domain-Aware Probing Patterns]
- "references_domain_probes_testing": "Testing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/domain-probes.md:L105 | neighbors=[Domain-Aware Probing Patterns]
- "references_execute_mvp_tdd": "execute-mvp-tdd.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L1 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_compatibility_with_existing_tdd_discipline": "Compatibility with existing TDD discipline" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L79 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_escalation_end_of_phase_tdd_review_under_mvp_tdd": "Escalation: end-of-phase TDD review under MVP+TDD" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L61 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_what_behavior_adding_task_means": "What \"behavior-adding task\" means" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L26 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_what_happens_when_the_gate_trips": "What happens when the gate trips" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L35 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_what_the_gate_checks": "What the gate checks" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L14 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_what_this_gate_does_not_do": "What this gate does NOT do" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L72 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_execute_mvp_tdd_when_this_gate_fires": "When this gate fires" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/execute-mvp-tdd.md:L5 | neighbors=[Execute-Phase — MVP+TDD Gate (Runtime E…]
- "references_executor_examples": "executor-examples.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L1 | neighbors=[Executor Extended Examples]
- "references_executor_examples_auth_gate_handling": "Auth gate handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L104 | neighbors=[Checkpoint Examples]
- "references_executor_examples_bad_checkpoint_placement": "Bad checkpoint placement" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L92 | neighbors=[Checkpoint Examples]
- "references_executor_examples_edge_case_decision_guide": "Edge Case Decision Guide" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L56 | neighbors=[Executor Extended Examples]
- "references_executor_examples_good_checkpoint_placement": "Good checkpoint placement" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L74 | neighbors=[Checkpoint Examples]
- "references_executor_examples_rule_1_auto_fix_bugs": "Rule 1 — Auto-fix bugs" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L8 | neighbors=[Deviation Rule Examples]
- "references_executor_examples_rule_2_auto_add_missing_critical_functionality": "Rule 2 — Auto-add missing critical functionality" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L20 | neighbors=[Deviation Rule Examples]
- "references_executor_examples_rule_3_auto_fix_blocking_issues": "Rule 3 — Auto-fix blocking issues" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L33 | neighbors=[Deviation Rule Examples]
- "references_executor_examples_rule_4_ask_about_architectural_changes": "Rule 4 — Ask about architectural changes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L45 | neighbors=[Deviation Rule Examples]
- "references_exports": "exports.md" | kind=entity | source=.github/skills/graphify/references/exports.md:L1 | neighbors=[graphify reference: extra exports and b…]
- "references_exports_step_6b_wiki_only_if_wiki_flag": "Step 6b - Wiki (only if --wiki flag)" | kind=entity | source=.github/skills/graphify/references/exports.md:L5 | neighbors=[graphify reference: extra exports and b…]
- "references_exports_step_7_neo4j_export_only_if_neo4j_or_neo4j_push_flag": "Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag)" | kind=entity | source=.github/skills/graphify/references/exports.md:L15 | neighbors=[graphify reference: extra exports and b…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-344.json

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
