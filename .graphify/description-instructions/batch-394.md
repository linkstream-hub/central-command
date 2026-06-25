# Node Description Batch 395 of 412

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

- "workflows_help_getting_help": "Getting Help" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L777 | neighbors=[GSD Command Reference]
- "workflows_help_knowledge_context": "Knowledge & Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L604 | neighbors=[Additional Commands]
- "workflows_help_milestone_auditing": "Milestone Auditing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L488 | neighbors=[Core Workflow]
- "workflows_help_milestone_management": "Milestone Management" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L232 | neighbors=[Core Workflow]
- "workflows_help_namespace_routers_model_facing_meta_skills": "Namespace Routers (model-facing meta-skills)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L623 | neighbors=[Additional Commands]
- "workflows_help_phase_planning": "Phase Planning" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L65 | neighbors=[Core Workflow]
- "workflows_help_planning_configuration": "Planning Configuration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L696 | neighbors=[GSD Command Reference]
- "workflows_help_planning_execution": "Planning & Execution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L580 | neighbors=[Additional Commands]
- "workflows_help_progress_tracking": "Progress Tracking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L258 | neighbors=[Core Workflow]
- "workflows_help_project_initialization": "Project Initialization" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L30 | neighbors=[Core Workflow]
- "workflows_help_quality_review_verification": "Quality, Review & Verification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L586 | neighbors=[Additional Commands]
- "workflows_help_quick_mode": "Quick Mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L156 | neighbors=[Core Workflow]
- "workflows_help_quick_start": "Quick Start" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L10 | neighbors=[GSD Command Reference]
- "workflows_help_repository_integration": "Repository Integration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L619 | neighbors=[Additional Commands]
- "workflows_help_roadmap_management": "Roadmap Management" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L194 | neighbors=[Core Workflow]
- "workflows_help_session_management": "Session Management" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L280 | neighbors=[Core Workflow]
- "workflows_help_ship_work": "Ship Work" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L419 | neighbors=[Core Workflow]
- "workflows_help_smart_router": "Smart Router" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L142 | neighbors=[Core Workflow]
- "workflows_help_spiking_sketching": "Spiking & Sketching" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L317 | neighbors=[Core Workflow]
- "workflows_help_staying_updated": "Staying Updated" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L16 | neighbors=[GSD Command Reference]
- "workflows_help_user_acceptance_testing": "User Acceptance Testing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L407 | neighbors=[Core Workflow]
- "workflows_help_utility_commands": "Utility Commands" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L538 | neighbors=[Core Workflow]
- "workflows_help_workflow_modes": "Workflow Modes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L678 | neighbors=[GSD Command Reference]
- "workflows_help_workflow_orchestration": "Workflow & Orchestration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L611 | neighbors=[Additional Commands]
- "workflows_import": "import.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L1 | neighbors=[Import Workflow]
- "workflows_import_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L244 | neighbors=[Import Workflow]
- "workflows_import_blocker_checks_any_one_prevents_import": "BLOCKER checks (any one prevents import):" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L112 | neighbors=[Path A: MODE=plan (--from)]
- "workflows_import_info_checks_informational_no_action_needed": "INFO checks (informational, no action needed):" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L126 | neighbors=[Path A: MODE=plan (--from)]
- "workflows_import_warning_checks_user_confirmation_required": "WARNING checks (user confirmation required):" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L119 | neighbors=[Path A: MODE=plan (--from)]
- "workflows_ingest_docs": "ingest-docs.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ingest-docs.md:L1 | neighbors=[Ingest Docs Workflow]
- "workflows_ingest_docs_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ingest-docs.md:L329 | neighbors=[Ingest Docs Workflow]
- "workflows_list_workspaces_1_setup": "1. Setup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/list-workspaces.md:L11 | neighbors=[list-workspaces.md]
- "workflows_list_workspaces_2_display": "2. Display" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/list-workspaces.md:L20 | neighbors=[list-workspaces.md]
- "workflows_manager_1_initialize": "1. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L17 | neighbors=[manager.md]
- "workflows_manager_2_dashboard_refresh_point": "2. Dashboard (Refresh Point)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L58 | neighbors=[manager.md]
- "workflows_manager_5_background_agent_completion": "5. Background Agent Completion" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L314 | neighbors=[manager.md]
- "workflows_manager_6_exit": "6. Exit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L354 | neighbors=[manager.md]
- "workflows_manager_compound_action_background_inline": "Compound Action (background + inline)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L219 | neighbors=[4. Handle Action]
- "workflows_manager_discuss_phase_n": "Discuss Phase N" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L232 | neighbors=[4. Handle Action]
- "workflows_manager_execute_phase_n": "Execute Phase N" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L276 | neighbors=[4. Handle Action]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-394.json

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
