# Node Description Batch 400 of 412

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

- "workflows_scan_focus_to_document_mapping": "Focus-to-Document Mapping" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/scan.md:L17 | neighbors=[scan.md] | lang=en
- "workflows_scan_step_1_parse_arguments_and_resolve_focus": "Step 1: Parse arguments and resolve focus" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/scan.md:L27 | neighbors=[scan.md] | lang=en
- "workflows_scan_step_2_check_for_existing_documents": "Step 2: Check for existing documents" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/scan.md:L39 | neighbors=[scan.md] | lang=en
- "workflows_scan_step_3_create_output_directory": "Step 3: Create output directory" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/scan.md:L64 | neighbors=[scan.md] | lang=en
- "workflows_scan_step_4_spawn_mapper_agent": "Step 4: Spawn mapper agent" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/scan.md:L70 | neighbors=[scan.md] | lang=en
- "workflows_scan_step_5_report": "Step 5: Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/scan.md:L84 | neighbors=[scan.md] | lang=en
- "workflows_secure_phase_0_initialize": "0. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L16 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_1_detect_input_state": "1. Detect Input State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L35 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_2a_read_phase_artifacts": "2a. Read Phase Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L49 | neighbors=[2. Discovery] | lang=pt
- "workflows_secure_phase_2b_read_summary_threat_flags": "2b. Read Summary Threat Flags" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L53 | neighbors=[2. Discovery] | lang=en
- "workflows_secure_phase_2c_build_threat_register": "2c. Build Threat Register" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L57 | neighbors=[2. Discovery] | lang=en
- "workflows_secure_phase_3_threat_classification": "3. Threat Classification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L63 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_4_present_threat_plan": "4. Present Threat Plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L79 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_5_spawn_gsd_security_auditor": "5. Spawn gsd-security-auditor" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L88 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_6_write_update_security_md": "6. Write/Update SECURITY.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L116 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_7_commit": "7. Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L146 | neighbors=[secure-phase.md] | lang=en
- "workflows_secure_phase_8_results_routing": "8. Results + Routing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L152 | neighbors=[secure-phase.md] | lang=en
- "workflows_settings_advanced_section_1_planning_tuning": "Section 1 — Planning Tuning" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L115 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_advanced_section_2_execution_tuning": "Section 2 — Execution Tuning" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L168 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_advanced_section_3_discussion_tuning": "Section 3 — Discussion Tuning" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L202 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_advanced_section_4_cross_ai_execution": "Section 4 — Cross-AI Execution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L218 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_advanced_section_5_git_customization": "Section 5 — Git Customization" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L253 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_advanced_section_6_runtime_output": "Section 6 — Runtime / Output" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L287 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_advanced_section_7_runtime_model_tiers": "Section 7 — Runtime Model Tiers" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings-advanced.md:L331 | neighbors=[settings-advanced.md] | lang=en
- "workflows_settings_docs_output": "Docs & Output" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings.md:L89 | neighbors=[settings.md] | lang=en
- "workflows_settings_execution": "Execution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings.md:L86 | neighbors=[settings.md] | lang=en
- "workflows_settings_features": "Features" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings.md:L92 | neighbors=[settings.md] | lang=en
- "workflows_settings_misc": "Misc" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings.md:L98 | neighbors=[settings.md] | lang=en
- "workflows_settings_model_pipeline": "Model & Pipeline" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings.md:L95 | neighbors=[settings.md] | lang=en
- "workflows_settings_planning": "Planning" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/settings.md:L83 | neighbors=[settings.md] | lang=en
- "workflows_sketch_analyze_for_consistency_sketches": "Analyze for Consistency Sketches" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L60 | neighbors=[Frontier Mode — Propose What to Sketch …] | lang=en
- "workflows_sketch_analyze_for_frontier_sketches": "Analyze for Frontier Sketches" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L71 | neighbors=[Frontier Mode — Propose What to Sketch …] | lang=en
- "workflows_sketch_for_each_sketch": "For Each Sketch:" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L220 | neighbors=[Research the Target Stack] | lang=en
- "workflows_sketch_get_alignment_and_execute": "Get Alignment and Execute" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L83 | neighbors=[Frontier Mode — Propose What to Sketch …] | lang=en
- "workflows_sketch_load_spike_context": "Load Spike Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L127 | neighbors=[sketch.md] | lang=en
- "workflows_sketch_load_the_sketch_landscape": "Load the Sketch Landscape" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L48 | neighbors=[Frontier Mode — Propose What to Sketch …] | lang=en
- "workflows_sketch_next_up": "▶ Next Up" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L330 | neighbors=[sketch.md] | lang=en
- "workflows_sketch_routing": "Routing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L39 | neighbors=[sketch.md] | lang=en
- "workflows_sketch_wrap_up_auto_group_by_design_area": "Auto-Group by Design Area" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L79 | neighbors=[sketch-wrap-up.md] | lang=en
- "workflows_sketch_wrap_up_copy_source_files": "Copy Source Files" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L102 | neighbors=[sketch-wrap-up.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-399.json

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
