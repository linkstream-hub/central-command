# Node Description Batch 127 of 412

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

- "agents_gsd_verifier_md_agents_gsd_verifier_step_3b_check_verification_overrides": "Step 3b: Check Verification Overrides" | kind=entity | source=agents/gsd-verifier.md:L176 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_4b_data_flow_trace_level_4": "Step 4b: Data-Flow Trace (Level 4)" | kind=entity | source=agents/gsd-verifier.md:L257 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_6_check_requirements_coverage": "Step 6: Check Requirements Coverage" | kind=entity | source=agents/gsd-verifier.md:L369 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_7_scan_for_anti_patterns": "Step 7: Scan for Anti-Patterns" | kind=entity | source=agents/gsd-verifier.md:L397 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_7b_behavioral_spot_checks": "Step 7b: Behavioral Spot-Checks" | kind=entity | source=agents/gsd-verifier.md:L439 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_7c_probe_execution": "Step 7c: Probe Execution" | kind=entity | source=agents/gsd-verifier.md:L489 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_8_identify_human_verification_needs": "Step 8: Identify Human Verification Needs" | kind=entity | source=agents/gsd-verifier.md:L526 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_9_determine_overall_status": "Step 9: Determine Overall Status" | kind=entity | source=agents/gsd-verifier.md:L556 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_9b_filter_deferred_items": "Step 9b: Filter Deferred Items" | kind=entity | source=agents/gsd-verifier.md:L576 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_wiring_red_flags": "Wiring Red Flags" | kind=entity | source=agents/gsd-verifier.md:L876 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-verifier.md:L7 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-verifier.md:L10 | neighbors=[gsd-verifier.md]
- "agents_instructions_for_gsd": "Instructions for GSD" | kind=entity | source=AGENTS.md:L2 | neighbors=[AGENTS.md]
- "agents_issue_tracker": "issue-tracker.md" | kind=entity | source=docs/agents/issue-tracker.md:L1 | neighbors=[Issue tracker: GitHub]
- "agents_issue_tracker_conventions": "Conventions" | kind=entity | source=docs/agents/issue-tracker.md:L5 | neighbors=[Issue tracker: GitHub]
- "agents_issue_tracker_when_a_skill_says_fetch_the_relevant_ticket": "When a skill says \"fetch the relevant ticket\"" | kind=entity | source=docs/agents/issue-tracker.md:L22 | neighbors=[Issue tracker: GitHub]
- "agents_issue_tracker_when_a_skill_says_publish_to_the_issue_tracker": "When a skill says \"publish to the issue tracker\"" | kind=entity | source=docs/agents/issue-tracker.md:L18 | neighbors=[Issue tracker: GitHub]
- "agents_meta_agent": "meta-agent.md" | kind=entity | source=.claude/agents/meta-agent.md:L1 | neighbors=[Purpose]
- "agents_meta_agent_output_format": "Output Format" | kind=entity | source=.claude/agents/meta-agent.md:L29 | neighbors=[Purpose]
- "agents_meta_agent_workflow": "Workflow" | kind=entity | source=.claude/agents/meta-agent.md:L13 | neighbors=[Purpose]
- "agents_observer": "observer.md" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L1 | neighbors=[Observer Agent]
- "agents_observer_1_user_corrections": "1. User Corrections" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L34 | neighbors=[Pattern Detection]
- "agents_observer_2_error_resolutions": "2. Error Resolutions" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L42 | neighbors=[Pattern Detection]
- "agents_observer_3_repeated_workflows": "3. Repeated Workflows" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L50 | neighbors=[Pattern Detection]
- "agents_observer_4_tool_preferences": "4. Tool Preferences" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L58 | neighbors=[Pattern Detection]
- "agents_observer_confidence_calculation": "Confidence Calculation" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L137 | neighbors=[Observer Agent]
- "agents_observer_example_analysis_session": "Example Analysis Session" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L169 | neighbors=[Observer Agent]
- "agents_observer_global_instinct_universal_patterns": "Global Instinct (universal patterns)" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L97 | neighbors=[Output]
- "agents_observer_important_guidelines": "Important Guidelines" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L159 | neighbors=[Observer Agent]
- "agents_observer_input": "Input" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L17 | neighbors=[Observer Agent]
- "agents_observer_instinct_promotion_project_global": "Instinct Promotion (Project → Global)" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L150 | neighbors=[Observer Agent]
- "agents_observer_integration_with_skill_creator": "Integration with Skill Creator" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L191 | neighbors=[Observer Agent]
- "agents_observer_project_scoped_instinct_default": "Project-Scoped Instinct (default)" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L72 | neighbors=[Output]
- "agents_observer_scope_decision_guide": "Scope Decision Guide" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L120 | neighbors=[Observer Agent]
- "agents_observer_when_to_run": "When to Run" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L11 | neighbors=[Observer Agent]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_assess_adaptation_challenge": "Assess Adaptation Challenge" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L8 | neighbors=[adapt.md]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_breakpoints_content_driven": "Breakpoints: Content-Driven" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L204 | neighbors=[Responsive Design]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_content_adaptation": "Content Adaptation" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L153 | neighbors=[Implement Adaptations]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_desktop_adaptation_mobile_desktop": "Desktop Adaptation (Mobile → Desktop)" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L77 | neighbors=[Plan Adaptation Strategy]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_detect_input_method_not_just_screen_size": "Detect Input Method, Not Just Screen Size" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L208 | neighbors=[Responsive Design]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-126.json

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
