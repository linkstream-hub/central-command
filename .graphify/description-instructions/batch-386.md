# Node Description Batch 387 of 412

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

- "templates_state_accumulated_context": "Accumulated Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L152 | neighbors=[File Template]
- "templates_state_current_position": "Current Position" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L133 | neighbors=[File Template]
- "templates_state_performance_metrics": "Performance Metrics" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L143 | neighbors=[File Template]
- "templates_state_project_reference": "Project Reference" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L125 | neighbors=[File Template]
- "templates_state_session_continuity": "Session Continuity" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L166 | neighbors=[File Template]
- "templates_summary": "summary.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary.md:L1 | neighbors=[Summary Template]
- "templates_summary_complex": "summary-complex.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L1 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_accomplishments": "Accomplishments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L35 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_decisions_made": "Decisions Made" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L48 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_deviations_from_plan_auto_fixed": "Deviations from Plan (Auto-fixed)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L51 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_files_created_modified": "Files Created/Modified" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L44 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_issues_encountered": "Issues Encountered" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L54 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_next_phase_readiness": "Next Phase Readiness" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L57 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_performance": "Performance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L30 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_complex_task_commits": "Task Commits" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-complex.md:L39 | neighbors=[Phase [X]: [Name] Summary (Complex)]
- "templates_summary_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary.md:L7 | neighbors=[Summary Template]
- "templates_summary_minimal": "summary-minimal.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-minimal.md:L1 | neighbors=[Phase [X]: [Name] Summary (Minimal)]
- "templates_summary_minimal_accomplishments": "Accomplishments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-minimal.md:L29 | neighbors=[Phase [X]: [Name] Summary (Minimal)]
- "templates_summary_minimal_files_created_modified": "Files Created/Modified" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-minimal.md:L37 | neighbors=[Phase [X]: [Name] Summary (Minimal)]
- "templates_summary_minimal_next_phase_readiness": "Next Phase Readiness" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-minimal.md:L40 | neighbors=[Phase [X]: [Name] Summary (Minimal)]
- "templates_summary_minimal_performance": "Performance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-minimal.md:L24 | neighbors=[Phase [X]: [Name] Summary (Minimal)]
- "templates_summary_minimal_task_commits": "Task Commits" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-minimal.md:L33 | neighbors=[Phase [X]: [Name] Summary (Minimal)]
- "templates_summary_standard": "summary-standard.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L1 | neighbors=[Phase [X]: [Name] Summary]
- "templates_summary_standard_accomplishments": "Accomplishments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L30 | neighbors=[Phase [X]: [Name] Summary]
- "templates_summary_standard_decisions_deviations": "Decisions & Deviations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L43 | neighbors=[Phase [X]: [Name] Summary]
- "templates_summary_standard_files_created_modified": "Files Created/Modified" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L39 | neighbors=[Phase [X]: [Name] Summary]
- "templates_summary_standard_next_phase_readiness": "Next Phase Readiness" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L47 | neighbors=[Phase [X]: [Name] Summary]
- "templates_summary_standard_performance": "Performance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L25 | neighbors=[Phase [X]: [Name] Summary]
- "templates_summary_standard_task_commits": "Task Commits" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary-standard.md:L34 | neighbors=[Phase [X]: [Name] Summary]
- "templates_uat": "UAT.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UAT.md:L1 | neighbors=[UAT Template]
- "templates_uat_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UAT.md:L7 | neighbors=[UAT Template]
- "templates_ui_spec": "UI-SPEC.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L1 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_checker_sign_off": "Checker Sign-Off" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L91 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_color": "Color" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L57 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_copywriting_contract": "Copywriting Contract" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L70 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_design_system": "Design System" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L16 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_registry_safety": "Registry Safety" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L82 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_spacing_scale": "Spacing Scale" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L28 | neighbors=[Phase {N} — UI Design Contract]
- "templates_ui_spec_typography": "Typography" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UI-SPEC.md:L46 | neighbors=[Phase {N} — UI Design Contract]
- "templates_user_profile": "user-profile.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L1 | neighbors=[Developer Profile]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-386.json

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
