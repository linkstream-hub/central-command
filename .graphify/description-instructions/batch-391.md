# Node Description Batch 392 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "workflows_ai_integration_phase_11_commit": "11. Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L256 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_12_display_completion": "12. Display Completion" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L264 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_2_parse_and_validate_phase": "2. Parse and Validate Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L52 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_3_check_prerequisites": "3. Check Prerequisites" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L62 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_4_check_existing_ai_spec": "4. Check Existing AI-SPEC" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L72 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_5_spawn_gsd_framework_selector": "5. Spawn gsd-framework-selector" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L92 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_6_initialize_ai_spec_md": "6. Initialize AI-SPEC.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L127 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_7_spawn_gsd_ai_researcher": "7. Spawn gsd-ai-researcher" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L140 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_8_spawn_gsd_domain_researcher": "8. Spawn gsd-domain-researcher" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L175 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_ai_integration_phase_9_spawn_gsd_eval_planner": "9. Spawn gsd-eval-planner" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L210 | neighbors=[ai-integration-phase.md] | lang=en
- "workflows_analyze_dependencies_1_load_roadmap_md": "1. Load ROADMAP.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L7 | neighbors=[analyze-dependencies.md] | lang=en
- "workflows_analyze_dependencies_2_infer_likely_file_modifications": "2. Infer Likely File Modifications" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L17 | neighbors=[analyze-dependencies.md] | lang=en
- "workflows_analyze_dependencies_4_build_dependency_table": "4. Build Dependency Table" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L50 | neighbors=[analyze-dependencies.md] | lang=en
- "workflows_analyze_dependencies_5_summarize_suggested_changes": "5. Summarize Suggested Changes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L70 | neighbors=[analyze-dependencies.md] | lang=en
- "workflows_analyze_dependencies_6_confirm_and_apply": "6. Confirm and Apply" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L81 | neighbors=[analyze-dependencies.md] | lang=en
- "workflows_analyze_dependencies_data_flow_detection": "Data Flow Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L45 | neighbors=[3. Detect Dependency Relationships] | lang=en
- "workflows_analyze_dependencies_file_overlap_detection": "File Overlap Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L35 | neighbors=[3. Detect Dependency Relationships] | lang=en
- "workflows_analyze_dependencies_semantic_dependency_detection": "Semantic Dependency Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L38 | neighbors=[3. Detect Dependency Relationships] | lang=en
- "workflows_audit_milestone_0_initialize_milestone_context": "0. Initialize Milestone Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L16 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_1_determine_milestone_scope": "1. Determine Milestone Scope" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L31 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_2_read_all_phase_verifications": "2. Read All Phase Verifications" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L43 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_3_spawn_integration_checker": "3. Spawn Integration Checker" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L63 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_4_collect_results": "4. Collect Results" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L91 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_5_5_nyquist_compliance_discovery": "5.5. Nyquist Compliance Discovery" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L141 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_5a_parse_requirements_md_traceability_table": "5a. Parse REQUIREMENTS.md Traceability Table" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L101 | neighbors=[5. Check Requirements Coverage (3-Sourc…] | lang=pt
- "workflows_audit_milestone_5b_parse_phase_verification_md_requirements_tables": "5b. Parse Phase VERIFICATION.md Requirements Tables" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L106 | neighbors=[5. Check Requirements Coverage (3-Sourc…] | lang=en
- "workflows_audit_milestone_5c_extract_summary_md_frontmatter_cross_check": "5c. Extract SUMMARY.md Frontmatter Cross-Check" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L112 | neighbors=[5. Check Requirements Coverage (3-Sourc…] | lang=en
- "workflows_audit_milestone_5d_status_determination_matrix": "5d. Status Determination Matrix" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L122 | neighbors=[5. Check Requirements Coverage (3-Sourc…] | lang=en
- "workflows_audit_milestone_5e_fail_gate_and_orphan_detection": "5e. FAIL Gate and Orphan Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L135 | neighbors=[5. Check Requirements Coverage (3-Sourc…] | lang=en
- "workflows_audit_milestone_6_aggregate_into_v_version_milestone_audit_md": "6. Aggregate into v{version}-MILESTONE-AUDIT.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L165 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_7_present_results": "7. Present Results" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L208 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_broken_flows": "Broken Flows" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L260 | neighbors=[⚠ Milestone {version} — Gaps Found] | lang=en
- "workflows_audit_milestone_cross_phase_issues": "Cross-Phase Issues" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L255 | neighbors=[⚠ Milestone {version} — Gaps Found] | lang=en
- "workflows_audit_milestone_milestone_version_audit_passed": "✓ Milestone {version} — Audit Passed" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L221 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_next_up_project_code_project_title": "▶ Next Up — [${PROJECT_CODE}] ${PROJECT_TITLE}" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L230 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_nyquist_coverage": "Nyquist Coverage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L265 | neighbors=[⚠ Milestone {version} — Gaps Found] | lang=en
- "workflows_audit_milestone_options": "▶ Options" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L324 | neighbors=[audit-milestone.md] | lang=en
- "workflows_audit_milestone_tech_debt_by_phase": "Tech Debt by Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L313 | neighbors=[⚡ Milestone {version} — Tech Debt Review] | lang=en
- "workflows_audit_milestone_total_n_items_across_m_phases": "Total: {N} items across {M} phases" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L320 | neighbors=[⚡ Milestone {version} — Tech Debt Review] | lang=en
- "workflows_audit_milestone_unsatisfied_requirements": "Unsatisfied Requirements" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L249 | neighbors=[⚠ Milestone {version} — Gaps Found] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-391.json

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
