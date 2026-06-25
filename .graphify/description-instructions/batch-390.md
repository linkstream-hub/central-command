# Node Description Batch 391 of 412

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

- "windows_desktop_e2e_skill_patch_into_basepage": "Patch into BasePage" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L381 | neighbors=[Per-Step Trace (opt-in)]
- "windows_desktop_e2e_skill_prevent_hanging_tests": "Prevent hanging tests" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L629 | neighbors=[Test Isolation & Sandbox]
- "windows_desktop_e2e_skill_pytest_ini": "pytest.ini" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L301 | neighbors=[Page Object Model]
- "windows_desktop_e2e_skill_qt_see_dedicated_section_below": "Qt — see dedicated section below" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L100 | neighbors=[Testability Setup (by Framework)]
- "windows_desktop_e2e_skill_qt_specific_quirks": "Qt-Specific Quirks" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L715 | neighbors=[Qt Specific]
- "windows_desktop_e2e_skill_related_skills": "Related Skills" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L883 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_running_tests": "Running Tests" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L863 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_setup_prerequisites": "Setup & Prerequisites" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L50 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_tier_1_filesystem_isolation_default_always_use": "Tier 1 — Filesystem Isolation (default, always use)" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L456 | neighbors=[Test Isolation & Sandbox]
- "windows_desktop_e2e_skill_tier_2_windows_job_object_optional_process_lifetime_containment": "Tier 2 — Windows Job Object (optional: process-lifetime containment)" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L517 | neighbors=[Test Isolation & Sandbox]
- "windows_desktop_e2e_skill_tier_3_windows_sandbox_ci_full_os_isolation": "Tier 3 — Windows Sandbox (CI full-OS isolation)" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L573 | neighbors=[Test Isolation & Sandbox]
- "windows_desktop_e2e_skill_tier_comparison": "Tier comparison" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L621 | neighbors=[Test Isolation & Sandbox]
- "windows_desktop_e2e_skill_wait_patterns": "Wait Patterns" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L328 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_when_not_to_use": "When NOT to Use" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L19 | neighbors=[When to Activate]
- "windows_desktop_e2e_skill_win32_mfc": "Win32 / MFC" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L92 | neighbors=[Testability Setup (by Framework)]
- "windows_desktop_e2e_skill_winforms": "WinForms" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L82 | neighbors=[Testability Setup (by Framework)]
- "windows_desktop_e2e_skill_wpf": "WPF" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L72 | neighbors=[Testability Setup (by Framework)]
- "work_order_6_state_machine": "Work Order 6-State Machine" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md | neighbors=[JobStateService]
- "workflow_anti_patterns": "ANTI-PATTERNS" | kind=entity | source=WORKFLOW.md:L152 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_apt_central_command_agent_workflow": "APT CENTRAL COMMAND — AGENT WORKFLOW" | kind=entity | source=WORKFLOW.md:L1 | neighbors=[WORKFLOW.md]
- "workflow_artifacts_directory": "ARTIFACTS DIRECTORY" | kind=entity | source=WORKFLOW.md:L139 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_events_table": "workflow_events" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md | neighbors=[EventBus Module]
- "workflow_gsd_commands_quick_reference": "GSD COMMANDS — QUICK REFERENCE" | kind=entity | source=WORKFLOW.md:L119 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_neon_migration_active_rules": "NEON MIGRATION — ACTIVE RULES" | kind=entity | source=WORKFLOW.md:L166 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_peer_pair_model_ag_does_the_heavy_lifting_claude_code_is_the_safety_net": "Peer Pair model. AG does the heavy lifting. Claude Code is the safety net." | kind=entity | source=WORKFLOW.md:L2 | neighbors=[WORKFLOW.md]
- "workflow_professional_grade_workflow_strict_rules": "💎 PROFESSIONAL GRADE WORKFLOW (Strict Rules)" | kind=entity | source=WORKFLOW.md:L187 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_sprint_rules_non_negotiable": "SPRINT RULES (non-negotiable)" | kind=entity | source=WORKFLOW.md:L78 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_the_team": "THE TEAM" | kind=entity | source=WORKFLOW.md:L7 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_the_workflow_loop_every_feature": "THE WORKFLOW LOOP — EVERY FEATURE" | kind=entity | source=WORKFLOW.md:L17 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_what_each_agent_implements_directly": "WHAT EACH AGENT IMPLEMENTS DIRECTLY" | kind=entity | source=WORKFLOW.md:L101 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflow_when_ag_consults_claude_code": "WHEN AG CONSULTS CLAUDE CODE" | kind=entity | source=WORKFLOW.md:L62 | neighbors=[Updated: Session 56 — all 4 shadow-writ…]
- "workflows_add_backlog": "add-backlog.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L1 | neighbors=[Add Backlog Item Workflow]
- "workflows_add_backlog_step_1_read_roadmap_md": "Step 1: Read ROADMAP.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L11 | neighbors=[Add Backlog Item Workflow]
- "workflows_add_backlog_step_2_find_next_backlog_number": "Step 2: Find next backlog number" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L19 | neighbors=[Add Backlog Item Workflow]
- "workflows_add_backlog_step_3_write_roadmap_entry": "Step 3: Write ROADMAP entry" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L28 | neighbors=[Add Backlog Item Workflow]
- "workflows_add_backlog_step_4_create_the_phase_directory": "Step 4: Create the phase directory" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L50 | neighbors=[Add Backlog Item Workflow]
- "workflows_add_backlog_step_5_commit": "Step 5: Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L63 | neighbors=[Add Backlog Item Workflow]
- "workflows_add_backlog_step_6_report": "Step 6: Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/add-backlog.md:L69 | neighbors=[Add Backlog Item Workflow]
- "workflows_ai_integration_phase_1_initialize": "1. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L20 | neighbors=[ai-integration-phase.md]
- "workflows_ai_integration_phase_10_validate_ai_spec_completeness": "10. Validate AI-SPEC Completeness" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ai-integration-phase.md:L243 | neighbors=[ai-integration-phase.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-390.json

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
