# Node Description Batch 364 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "session_state_git_state": "GIT STATE" | kind=entity | source=SESSION_STATE.md:L21 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_key_architectural_facts": "KEY ARCHITECTURAL FACTS" | kind=entity | source=SESSION_STATE.md:L143 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_local_dev_state": "LOCAL DEV STATE" | kind=entity | source=SESSION_STATE.md:L74 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_next_session_ag_start_here": "NEXT SESSION — AG START HERE" | kind=entity | source=SESSION_STATE.md:L33 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_s144_completed": "S144 COMPLETED" | kind=entity | source=SESSION_STATE.md:L92 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_session_144_closed": "SESSION: 144 (CLOSED)" | kind=entity | source=SESSION_STATE.md:L6 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_session_state": "SESSION STATE" | kind=entity | source=SESSION_STATE.md:L1 | neighbors=[SESSION_STATE.md] | lang=en
- "session_state_system_state": "SYSTEM STATE" | kind=entity | source=SESSION_STATE.md:L10 | neighbors=[Overwrite completely at session close. …] | lang=en
- "session_state_vercel_deploy_blocker": "VERCEL DEPLOY BLOCKER" | kind=entity | source=SESSION_STATE.md:L62 | neighbors=[Overwrite completely at session close. …] | lang=en
- "shift_session_concept": "Shift Session Concept" | kind=entity | source=tech-pwa/src/lib/tech-session.ts | neighbors=[Tech Session] | lang=en
- "side_effects_email_executor_emailsideeffectexecutor_execute": ".execute()" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/email-executor.ts:L6 | neighbors=[EmailSideEffectExecutor] | lang=en
- "side_effects_email_executor_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | neighbors=[EmailSideEffectExecutor] | lang=en
- "side_effects_event_bus_executor_eventbussideeffectexecutor_execute": ".execute()" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/event-bus-executor.ts:L6 | neighbors=[EventBusSideEffectExecutor] | lang=en
- "side_effects_event_bus_executor_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | neighbors=[EventBusSideEffectExecutor] | lang=en
- "side_effects_fake_executor_fakesideeffectexecutor_execute": ".execute()" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/fake-executor.ts:L8 | neighbors=[FakeSideEffectExecutor] | lang=en
- "side_effects_fake_executor_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | neighbors=[FakeSideEffectExecutor] | lang=en
- "skill_scout_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L1 | neighbors=[Skill Scout] | lang=en
- "skill_scout_skill_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L128 | neighbors=[Skill Scout] | lang=en
- "skill_scout_skill_related": "Related" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L136 | neighbors=[Skill Scout] | lang=en
- "skill_scout_skill_result_table": "Result Table" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L109 | neighbors=[Examples] | lang=en
- "skill_scout_skill_step_1_capture_intent": "Step 1 - Capture Intent" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L29 | neighbors=[How It Works] | lang=en
- "skill_scout_skill_step_2_search_local_sources": "Step 2 - Search Local Sources" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L38 | neighbors=[How It Works] | lang=en
- "skill_scout_skill_step_3_search_remote_sources": "Step 3 - Search Remote Sources" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L54 | neighbors=[How It Works] | lang=en
- "skill_scout_skill_step_4_vet_external_matches": "Step 4 - Vet External Matches" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L71 | neighbors=[How It Works] | lang=en
- "skill_scout_skill_step_5_rank_results": "Step 5 - Rank Results" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L82 | neighbors=[How It Works] | lang=en
- "skill_scout_skill_step_6_present_decision_options": "Step 6 - Present Decision Options" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L94 | neighbors=[How It Works] | lang=en
- "skill_scout_skill_user_facing_summary": "User-Facing Summary" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L119 | neighbors=[Examples] | lang=en
- "skill_scout_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L15 | neighbors=[Skill Scout] | lang=en
- "skill_stocktake_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L1 | neighbors=[skill-stocktake] | lang=en
- "skill_stocktake_skill_modes": "Modes" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L33 | neighbors=[skill-stocktake] | lang=en
- "skill_stocktake_skill_notes": "Notes" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L190 | neighbors=[skill-stocktake] | lang=en
- "skill_stocktake_skill_phase_1_inventory": "Phase 1 — Inventory" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L59 | neighbors=[Full Stocktake Flow] | lang=en
- "skill_stocktake_skill_phase_2_quality_evaluation": "Phase 2 — Quality Evaluation" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L76 | neighbors=[Full Stocktake Flow] | lang=en
- "skill_stocktake_skill_phase_3_summary_table": "Phase 3 — Summary Table" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L146 | neighbors=[Full Stocktake Flow] | lang=en
- "skill_stocktake_skill_phase_4_consolidation": "Phase 4 — Consolidation" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L151 | neighbors=[Full Stocktake Flow] | lang=en
- "skill_stocktake_skill_quick_scan_flow": "Quick Scan Flow" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L42 | neighbors=[skill-stocktake] | lang=en
- "skill_stocktake_skill_results_file_schema": "Results File Schema" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L163 | neighbors=[skill-stocktake] | lang=en
- "skill_stocktake_skill_targeting_a_specific_project": "Targeting a specific project" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L22 | neighbors=[Scope] | lang=pt
- "specs_antigravity_reorganize_spec": "ANTIGRAVITY_REORGANIZE_SPEC.md" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — WORKSPACE REORGANIZA…] | lang=en
- "specs_antigravity_reorganize_spec_completion": "COMPLETION" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L87 | neighbors=[ANTIGRAVITY SPEC — WORKSPACE REORGANIZA…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-363.json

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
