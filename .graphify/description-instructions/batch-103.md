# Node Description Batch 104 of 412

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

- "adr_adr_011_event_publishing_seam_integration_with_jobstateservice_adr_010": "Integration with JobStateService (ADR-010)" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L110 | neighbors=[Decision]
- "adr_adr_011_event_publishing_seam_n8n_unified_webhook_switch_node_routing": "n8n Unified Webhook — Switch Node Routing" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L92 | neighbors=[Decision]
- "adr_adr_011_event_publishing_seam_outbox_poller_n8n_scheduled_workflow": "Outbox Poller — n8n Scheduled Workflow" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L79 | neighbors=[Decision]
- "adr_adr_011_event_publishing_seam_outbox_table": "Outbox Table" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L59 | neighbors=[Decision]
- "adr_adr_011_event_publishing_seam_prerequisites_must_complete_before_this_adr_executes": "Prerequisites (must complete before this ADR executes)" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L139 | neighbors=[ADR-011: Event Publishing Seam — Outbox…]
- "adr_adr_011_event_publishing_seam_what_this_replaces": "What This Replaces" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L126 | neighbors=[ADR-011: Event Publishing Seam — Outbox…]
- "adr_adr_012_dal_cleanup_dead_code": "ADR-012-dal-cleanup-dead-code.md" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md:L1 | neighbors=[ADR-012: DAL Cleanup — Delete `updateJo…]
- "adr_adr_012_dal_cleanup_dead_code_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md:L44 | neighbors=[ADR-012: DAL Cleanup — Delete `updateJo…]
- "adr_adr_012_dal_cleanup_dead_code_context": "Context" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md:L9 | neighbors=[ADR-012: DAL Cleanup — Delete `updateJo…]
- "adr_adr_012_dal_cleanup_dead_code_decision_1_delete_jobsrepository_updatejob": "Decision 1: Delete `jobsRepository.updateJob()`" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md:L26 | neighbors=[Decisions]
- "adr_adr_012_dal_cleanup_dead_code_decision_2_preserve_createmanualjob_conditional_status_initialization": "Decision 2: Preserve `createManualJob()` conditional status initialization" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md:L32 | neighbors=[Decisions]
- "adr_adr_012_dal_cleanup_dead_code_decision_3_defer_source_neon_removal_to_standalone_chore_pr": "Decision 3: Defer `source: 'neon'` removal to standalone chore PR" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md:L38 | neighbors=[Decisions]
- "adr_adr_013_dashboard_stats_canonical_computation": "ADR-013-dashboard-stats-canonical-computation.md" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L1 | neighbors=[ADR-013: Dashboard Stats — Canonical Co…]
- "adr_adr_013_dashboard_stats_canonical_computation_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L67 | neighbors=[ADR-013: Dashboard Stats — Canonical Co…]
- "adr_adr_013_dashboard_stats_canonical_computation_context": "Context" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L9 | neighbors=[ADR-013: Dashboard Stats — Canonical Co…]
- "adr_adr_013_dashboard_stats_canonical_computation_decision_1_fix_api_route_stats_to_use_repurposed_semantics": "Decision 1: Fix API route stats to use repurposed semantics" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L35 | neighbors=[Decision]
- "adr_adr_013_dashboard_stats_canonical_computation_decision_2_extract_to_named_computedashboardstats_in_dal_mappers_ts": "Decision 2: Extract to named `computeDashboardStats()` in `dal/mappers.ts`" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L47 | neighbors=[Decision]
- "adr_adr_013_dashboard_stats_canonical_computation_decision_3_delete_jobsrepository_getdispatchdata": "Decision 3: Delete `jobsRepository.getDispatchData()`" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L53 | neighbors=[Decision]
- "adr_adr_013_dashboard_stats_canonical_computation_decision_4_consolidate_dashboardstats_type": "Decision 4: Consolidate `DashboardStats` type" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L57 | neighbors=[Decision]
- "adr_adr_013_dashboard_stats_canonical_computation_decision_5_rename_dashboardstats_fields_to_match_ui_labels": "Decision 5: Rename `DashboardStats` fields to match UI labels" | kind=entity | source=docs/adr/ADR-013-dashboard-stats-canonical-computation.md:L61 | neighbors=[Decision]
- "adr_readme": "README.md" | kind=entity | source=docs/adr/README.md:L1 | neighbors=[Architecture Decision Records]
- "adr_readme_findings_from_phase_1_mapping": "Findings from Phase 1 Mapping" | kind=entity | source=docs/adr/README.md:L22 | neighbors=[Architecture Decision Records]
- "adr_readme_format": "Format" | kind=entity | source=docs/adr/README.md:L32 | neighbors=[Architecture Decision Records]
- "ag_ag_execution_protocol_condensed_full_protocol_in_workflow_md": "⚙️ AG EXECUTION PROTOCOL (condensed — full protocol in WORKFLOW.md)" | kind=entity | source=AG.md:L234 | neighbors=[Updated: Session 74 — created. Typograp…]
- "ag_ag_s_runtime_reference_claude_md_handles_system_state_and_safety_rules_this_is_your_execution_toolkit": "AG's runtime reference. CLAUDE.md handles system state and safety rules. This i…" | kind=entity | source=AG.md:L2 | neighbors=[AG.md]
- "ag_antigravity_operational_playbook_ag_md": "ANTIGRAVITY OPERATIONAL PLAYBOOK — AG.md" | kind=entity | source=AG.md:L1 | neighbors=[AG.md]
- "ag_approved_component_patterns": "Approved Component Patterns" | kind=entity | source=AG.md:L129 | neighbors=[🎨 VISUAL DESIGN SYSTEM]
- "ag_auth_hooks_never_mix": "🔐 AUTH HOOKS — NEVER MIX" | kind=entity | source=AG.md:L326 | neighbors=[Updated: Session 74 — created. Typograp…]
- "ag_cc2_0_css_tokens_canonical_tech_pwa_src_app_globals_css": "CC2.0 CSS Tokens (canonical — `tech-pwa/src/app/globals.css`)" | kind=entity | source=AG.md:L40 | neighbors=[🎨 VISUAL DESIGN SYSTEM]
- "ag_glassmorphism_rules": "Glassmorphism Rules" | kind=entity | source=AG.md:L112 | neighbors=[🎨 VISUAL DESIGN SYSTEM]
- "ag_next_js_version_warning": "⚠️ NEXT.JS VERSION WARNING" | kind=entity | source=AG.md:L337 | neighbors=[Updated: Session 74 — created. Typograp…]
- "ag_step_0_activate_your_tool_suite_always_before_anything_else": "Step 0 — Activate your tool suite (always, before anything else)" | kind=entity | source=AG.md:L9 | neighbors=[START OF EVERY SESSION]
- "ag_step_1_read_in_order": "Step 1 — Read in order" | kind=entity | source=AG.md:L19 | neighbors=[START OF EVERY SESSION]
- "ag_step_2_plan_before_touching_code": "Step 2 — Plan before touching code" | kind=entity | source=AG.md:L28 | neighbors=[START OF EVERY SESSION]
- "ag_typography_system_canonical_established_sprint_9": "Typography System (canonical — established Sprint 9)" | kind=entity | source=AG.md:L94 | neighbors=[🎨 VISUAL DESIGN SYSTEM]
- "ag_windows_shell_configuration": "💻 WINDOWS SHELL CONFIGURATION" | kind=entity | source=AG.md:L163 | neighbors=[Updated: Session 74 — created. Typograp…]
- "ag_workspace_directory_map": "🗂️ WORKSPACE DIRECTORY MAP" | kind=entity | source=AG.md:L215 | neighbors=[Updated: Session 74 — created. Typograp…]
- "agent_ag_plan_reviewer": "ag-plan-reviewer agent" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "agent_diff_reviewer": "diff-reviewer agent" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "agent_gsd_code_fixer": "gsd-code-fixer" | kind=entity | source=agents/gsd-code-fixer.md | neighbors=[gsd-code-reviewer]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-103.json

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
