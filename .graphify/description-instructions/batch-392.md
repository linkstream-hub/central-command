# Node Description Batch 393 of 412

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

- "workflows_autonomous_1_initialize": "1. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L17 | neighbors=[autonomous.md] | lang=en
- "workflows_autonomous_2_discover_phases": "2. Discover Phases" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L80 | neighbors=[autonomous.md] | lang=en
- "workflows_autonomous_3_execute_phase": "3. Execute Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L153 | neighbors=[autonomous.md] | lang=en
- "workflows_autonomous_4_iterate": "4. Iterate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L526 | neighbors=[autonomous.md] | lang=en
- "workflows_autonomous_5_lifecycle": "5. Lifecycle" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L580 | neighbors=[autonomous.md] | lang=en
- "workflows_autonomous_6_handle_blocker": "6. Handle Blocker" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L709 | neighbors=[autonomous.md] | lang=en
- "workflows_autonomous_smart_discuss": "Smart Discuss" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/autonomous.md:L512 | neighbors=[autonomous.md] | lang=en
- "workflows_debug": "debug.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L1 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_0_initialize_context": "0. Initialize Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L16 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_1a_list_subcommand": "1a. LIST subcommand" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L33 | neighbors=[Debug Workflow] | lang=pt
- "workflows_debug_1b_status_subcommand": "1b. STATUS subcommand" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L63 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_1c_continue_subcommand": "1c. CONTINUE subcommand" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L82 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_1d_check_active_sessions_subcmd_debug": "1d. Check Active Sessions (SUBCMD=debug)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L139 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_2_gather_symptoms_if_new_issue_subcmd_debug": "2. Gather Symptoms (if new issue, SUBCMD=debug)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L150 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_3_initial_session_setup_new_session": "3. Initial Session Setup (new session)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L171 | neighbors=[Debug Workflow] | lang=en
- "workflows_debug_4_session_management_delegated_to_gsd_debug_session_manager": "4. Session Management (delegated to gsd-debug-session-manager)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/debug.md:L188 | neighbors=[Debug Workflow] | lang=en
- "workflows_eval_review_0_initialize": "0. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L13 | neighbors=[eval-review.md] | lang=en
- "workflows_eval_review_1_detect_input_state": "1. Detect Input State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L33 | neighbors=[eval-review.md] | lang=en
- "workflows_eval_review_2_gather_context_paths": "2. Gather Context Paths" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L65 | neighbors=[eval-review.md] | lang=en
- "workflows_eval_review_3_spawn_gsd_eval_auditor": "3. Spawn gsd-eval-auditor" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L72 | neighbors=[eval-review.md] | lang=en
- "workflows_eval_review_4_parse_auditor_result": "4. Parse Auditor Result" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L107 | neighbors=[eval-review.md] | lang=en
- "workflows_eval_review_5_display_summary": "5. Display Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L114 | neighbors=[eval-review.md] | lang=en
- "workflows_eval_review_6_commit": "6. Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/eval-review.md:L137 | neighbors=[eval-review.md] | lang=en
- "workflows_execute_plan_authentication_gates": "Authentication Gates" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-plan.md:L191 | neighbors=[execute-plan.md] | lang=en
- "workflows_execute_plan_deviation_rules": "Deviation Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-plan.md:L214 | neighbors=[execute-plan.md] | lang=en
- "workflows_execute_plan_documenting_deviations": "Documenting Deviations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-plan.md:L227 | neighbors=[execute-plan.md] | lang=en
- "workflows_execute_plan_pre_commit_hook_failure_handling": "Pre-commit Hook Failure Handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-plan.md:L253 | neighbors=[execute-plan.md] | lang=en
- "workflows_execute_plan_task_commit_protocol": "Task Commit Protocol" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-plan.md:L277 | neighbors=[execute-plan.md] | lang=en
- "workflows_execute_plan_tdd_execution": "TDD Execution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-plan.md:L238 | neighbors=[execute-plan.md] | lang=en
- "workflows_explore_step_1_open_the_conversation": "Step 1: Open the conversation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/explore.md:L20 | neighbors=[explore.md] | lang=en
- "workflows_explore_step_2_socratic_conversation_2_5_exchanges": "Step 2: Socratic conversation (2-5 exchanges)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/explore.md:L38 | neighbors=[explore.md] | lang=en
- "workflows_explore_step_3_mid_conversation_research_offer_after_2_3_exchanges": "Step 3: Mid-conversation research offer (after 2-3 exchanges)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/explore.md:L50 | neighbors=[explore.md] | lang=en
- "workflows_explore_step_4_crystallize_outputs_after_3_6_exchanges": "Step 4: Crystallize outputs (after 3-6 exchanges)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/explore.md:L75 | neighbors=[explore.md] | lang=en
- "workflows_explore_step_5_write_selected_outputs": "Step 5: Write selected outputs" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/explore.md:L105 | neighbors=[explore.md] | lang=en
- "workflows_explore_step_6_close": "Step 6: Close" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/explore.md:L121 | neighbors=[explore.md] | lang=en
- "workflows_extract_learnings_1_decisions": "1. Decisions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/extract-learnings.md:L48 | neighbors=[extract-learnings.md] | lang=en
- "workflows_extract_learnings_2_lessons": "2. Lessons" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/extract-learnings.md:L60 | neighbors=[extract-learnings.md] | lang=en
- "workflows_extract_learnings_3_patterns": "3. Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/extract-learnings.md:L72 | neighbors=[extract-learnings.md] | lang=en
- "workflows_extract_learnings_4_surprises": "4. Surprises" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/extract-learnings.md:L84 | neighbors=[extract-learnings.md] | lang=en
- "workflows_forensics": "forensics.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L1 | neighbors=[Forensics Workflow] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-392.json

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
