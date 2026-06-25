# Node Description Batch 99 of 412

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

- "27_dashboard_remainder_27_validation_test_infrastructure": "Test Infrastructure" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L16 | neighbors=[Phase 27 — Validation Strategy]
- "27_dashboard_remainder_27_validation_validation_sign_off": "Validation Sign-Off" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L76 | neighbors=[Phase 27 — Validation Strategy]
- "27_dashboard_remainder_27_validation_wave_0_requirements": "Wave 0 Requirements" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L58 | neighbors=[Phase 27 — Validation Strategy]
- "28_sentinel_diet_28_01_plan": "28-01-PLAN.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-PLAN.md:L1 | neighbors=[Reference pattern — the Brandon-runnabl…]
- "28_sentinel_diet_28_01_plan_artifacts_this_phase_produces": "Artifacts this phase produces" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-PLAN.md:L185 | neighbors=[Reference pattern — the Brandon-runnabl…]
- "28_sentinel_diet_28_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-PLAN.md:L162 | neighbors=[Reference pattern — the Brandon-runnabl…]
- "28_sentinel_diet_28_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-PLAN.md:L155 | neighbors=[Reference pattern — the Brandon-runnabl…]
- "28_sentinel_diet_28_01_summary": "28-01-SUMMARY.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-SUMMARY.md:L1 | neighbors=[Plan 28-01: Wave 0 Sentinel Discovery —…]
- "28_sentinel_diet_28_01_summary_critical_discovery": "Critical Discovery" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-SUMMARY.md:L22 | neighbors=[Plan 28-01: Wave 0 Sentinel Discovery —…]
- "28_sentinel_diet_28_01_summary_self_check_passed": "Self-Check: PASSED" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-SUMMARY.md:L36 | neighbors=[Plan 28-01: Wave 0 Sentinel Discovery —…]
- "28_sentinel_diet_28_01_summary_wave_1_implication": "Wave 1 Implication" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-SUMMARY.md:L32 | neighbors=[Plan 28-01: Wave 0 Sentinel Discovery —…]
- "28_sentinel_diet_28_01_summary_what_was_built": "What Was Built" | kind=entity | source=.planning/phases/28-sentinel-diet/28-01-SUMMARY.md:L16 | neighbors=[Plan 28-01: Wave 0 Sentinel Discovery —…]
- "28_sentinel_diet_28_02_plan": "28-02-PLAN.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-PLAN.md:L1 | neighbors=[Reference patterns — node structure, cr…]
- "28_sentinel_diet_28_02_plan_artifacts_this_phase_produces": "Artifacts this phase produces" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-PLAN.md:L206 | neighbors=[Reference patterns — node structure, cr…]
- "28_sentinel_diet_28_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-PLAN.md:L183 | neighbors=[Reference patterns — node structure, cr…]
- "28_sentinel_diet_28_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-PLAN.md:L176 | neighbors=[Reference patterns — node structure, cr…]
- "28_sentinel_diet_28_02_summary": "28-02-SUMMARY.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L1 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_commits_exist": "Commits Exist" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L100 | neighbors=[Self-Check]
- "28_sentinel_diet_28_02_summary_created_files_exist": "Created Files Exist" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L96 | neighbors=[Self-Check]
- "28_sentinel_diet_28_02_summary_deviations_from_plan": "Deviations from Plan" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L86 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_importer_syntax_check": "Importer Syntax Check" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L112 | neighbors=[Self-Check]
- "28_sentinel_diet_28_02_summary_self_check_passed": "Self-Check: PASSED" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L117 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_sql_designed_from_scratch_per_sentinel_inventory_md_gap": "SQL Designed From Scratch (per SENTINEL_INVENTORY.md gap)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L74 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_status_paused_at_checkpoint_task_3_brandon_human_action_required": "Status: PAUSED AT CHECKPOINT (Task 3 — Brandon Human Action Required)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L42 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_task_3_pending_human_action": "Task 3 Pending (Human Action)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L53 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_tasks_completed": "Tasks Completed" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L46 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_threat_surface_scan": "Threat Surface Scan" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L90 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_workflow_architecture": "Workflow Architecture" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L59 | neighbors=[Phase 28 Plan 02: Sentinel Diet Wave 1 …]
- "28_sentinel_diet_28_02_summary_workflow_automated_checks": "Workflow Automated Checks" | kind=entity | source=.planning/phases/28-sentinel-diet/28-02-SUMMARY.md:L104 | neighbors=[Self-Check]
- "28_sentinel_diet_28_03_plan": "28-03-PLAN.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-03-PLAN.md:L1 | neighbors=[Reference patterns — Railway GraphQL Br…]
- "28_sentinel_diet_28_03_plan_artifacts_this_phase_produces": "Artifacts this phase produces" | kind=entity | source=.planning/phases/28-sentinel-diet/28-03-PLAN.md:L182 | neighbors=[Reference patterns — Railway GraphQL Br…]
- "28_sentinel_diet_28_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/28-sentinel-diet/28-03-PLAN.md:L159 | neighbors=[Reference patterns — Railway GraphQL Br…]
- "28_sentinel_diet_28_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/28-sentinel-diet/28-03-PLAN.md:L152 | neighbors=[Reference patterns — Railway GraphQL Br…]
- "28_sentinel_diet_28_context": "28-CONTEXT.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L1 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_context_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L28 | neighbors=[Implementation Decisions]
- "28_sentinel_diet_28_context_constraints": "Constraints" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L49 | neighbors=[Canonical References]
- "28_sentinel_diet_28_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L64 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_context_lead_dev_preference_planner_may_refine": "Lead-dev preference (planner may refine)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L24 | neighbors=[Implementation Decisions]
- "28_sentinel_diet_28_context_locked": "Locked" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L17 | neighbors=[Implementation Decisions]
- "28_sentinel_diet_28_context_patterns": "Patterns" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L44 | neighbors=[Canonical References]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-098.json

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
