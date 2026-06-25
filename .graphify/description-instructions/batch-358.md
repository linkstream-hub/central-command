# Node Description Batch 359 of 412

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

- "research_summary_phase_3_techs_shadow_write": "Phase 3: `techs` Shadow-Write" | kind=entity | source=.planning/research/SUMMARY.md:L117 | neighbors=[Implications for Roadmap] | lang=en
- "research_summary_phase_4_jobs_shadow_write": "Phase 4: `jobs` Shadow-Write" | kind=entity | source=.planning/research/SUMMARY.md:L123 | neighbors=[Implications for Roadmap] | lang=en
- "research_summary_phase_5_validation_gates_security_hardening": "Phase 5: Validation Gates + Security Hardening" | kind=entity | source=.planning/research/SUMMARY.md:L129 | neighbors=[Implications for Roadmap] | lang=en
- "research_summary_phase_6_read_cutover_per_table": "Phase 6: Read Cutover (Per Table)" | kind=entity | source=.planning/research/SUMMARY.md:L135 | neighbors=[Implications for Roadmap] | lang=it
- "research_summary_phase_7_post_cutover_features": "Phase 7: Post-Cutover Features" | kind=entity | source=.planning/research/SUMMARY.md:L141 | neighbors=[Implications for Roadmap] | lang=en
- "research_summary_phase_ordering_rationale": "Phase Ordering Rationale" | kind=entity | source=.planning/research/SUMMARY.md:L147 | neighbors=[Implications for Roadmap] | lang=en
- "research_summary_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/research/SUMMARY.md:L188 | neighbors=[Sources] | lang=en
- "research_summary_recommended_stack": "Recommended Stack" | kind=entity | source=.planning/research/SUMMARY.md:L22 | neighbors=[Key Findings] | lang=en
- "research_summary_research_flags": "Research Flags" | kind=entity | source=.planning/research/SUMMARY.md:L154 | neighbors=[Implications for Roadmap] | lang=en
- "research_summary_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/research/SUMMARY.md:L197 | neighbors=[Sources] | lang=en
- "rules_branch_rule": "BRANCH RULE" | kind=entity | source=RULES.md:L57 | neighbors=[Last updated: 2026-05-21] | lang=en
- "rules_critical_warnings": "CRITICAL WARNINGS" | kind=entity | source=RULES.md:L27 | neighbors=[Last updated: 2026-05-21] | lang=en
- "rules_graphify": "graphify.md" | kind=entity | source=.agents/rules/graphify.md:L1 | neighbors=[graphify] | lang=en
- "rules_graphify_graphify": "graphify" | kind=entity | source=.agents/rules/graphify.md:L6 | neighbors=[graphify.md] | lang=en
- "rules_hard_code_prohibitions": "HARD CODE PROHIBITIONS" | kind=entity | source=RULES.md:L47 | neighbors=[Last updated: 2026-05-21] | lang=en
- "rules_load_this_first_before_any_other_context_every_line_is_load_bearing": "Load this FIRST, before any other context. Every line is load-bearing." | kind=entity | source=RULES.md:L3 | neighbors=[RULES.md] | lang=en
- "rules_locked_decisions": "LOCKED DECISIONS" | kind=entity | source=RULES.md:L63 | neighbors=[Last updated: 2026-05-21] | lang=en
- "rules_md_auth_hook": "RULES.md §AUTH HOOK RULE" | kind=entity | source=tech-pwa/src/lib/CLAUDE.md | neighbors=[Auth Split Gate] | lang=en
- "rules_md_dual_auth": "RULES.md §DUAL AUTH" | kind=entity | source=tech-pwa/src/app/api/CLAUDE.md | neighbors=[API Routes Gate] | lang=en
- "rules_pre_action_gates_run_before_every_implementation_task": "PRE-ACTION GATES — run before every implementation task" | kind=entity | source=RULES.md:L8 | neighbors=[Last updated: 2026-05-21] | lang=en
- "rules_rules_md_apt_central_command": "RULES.md — APT Central Command" | kind=entity | source=RULES.md:L1 | neighbors=[RULES.md] | lang=en
- "rules_universal_constraints_for_all_agents_on_this_project": "Universal constraints for all agents on this project." | kind=entity | source=RULES.md:L2 | neighbors=[RULES.md] | lang=en
- "schedule_redesign_sr_01_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-PLAN.md:L265 | neighbors=[sr-01-01-PLAN.md] | lang=en
- "schedule_redesign_sr_01_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-PLAN.md:L259 | neighbors=[sr-01-01-PLAN.md] | lang=en
- "schedule_redesign_sr_01_01_summary": "sr-01-01-SUMMARY.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-SUMMARY.md:L1 | neighbors=[sr-01-01 SUMMARY] | lang=en
- "schedule_redesign_sr_01_01_summary_objective_completed": "Objective Completed" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-SUMMARY.md:L3 | neighbors=[sr-01-01 SUMMARY] | lang=en
- "schedule_redesign_sr_01_01_summary_output": "Output" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-SUMMARY.md:L14 | neighbors=[sr-01-01 SUMMARY] | lang=en
- "schedule_redesign_sr_01_01_summary_verification_tasks": "Verification & Tasks" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-SUMMARY.md:L6 | neighbors=[sr-01-01 SUMMARY] | lang=en
- "schedule_redesign_sr_01_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-02-PLAN.md:L412 | neighbors=[sr-01-02-PLAN.md] | lang=en
- "schedule_redesign_sr_01_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-02-PLAN.md:L405 | neighbors=[sr-01-02-PLAN.md] | lang=en
- "schedule_redesign_sr_01_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-03-PLAN.md:L379 | neighbors=[sr-01-03-PLAN.md] | lang=en
- "schedule_redesign_sr_01_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-03-PLAN.md:L371 | neighbors=[sr-01-03-PLAN.md] | lang=en
- "schedule_redesign_sr_01_04_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-PLAN.md:L318 | neighbors=[sr-01-04-PLAN.md] | lang=en
- "schedule_redesign_sr_01_04_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-PLAN.md:L312 | neighbors=[sr-01-04-PLAN.md] | lang=en
- "schedule_redesign_sr_01_04_summary": "sr-01-04-SUMMARY.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-SUMMARY.md:L1 | neighbors=[SR-01-04 Summary] | lang=en
- "schedule_redesign_sr_01_04_summary_accomplishments": "Accomplishments" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-SUMMARY.md:L7 | neighbors=[SR-01-04 Summary] | lang=en
- "schedule_redesign_sr_01_04_summary_code_changes": "Code Changes" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-SUMMARY.md:L20 | neighbors=[SR-01-04 Summary] | lang=en
- "schedule_redesign_sr_01_04_summary_verification": "Verification" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-SUMMARY.md:L15 | neighbors=[SR-01-04 Summary] | lang=en
- "schedule_redesign_sr_01_05_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-05-PLAN.md:L306 | neighbors=[sr-01-05-PLAN.md] | lang=en
- "schedule_redesign_sr_01_05_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-05-PLAN.md:L300 | neighbors=[sr-01-05-PLAN.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-358.json

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
