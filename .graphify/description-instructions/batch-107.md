# Node Description Batch 108 of 412

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

- "agents_gsd_debugger_agent_checkpoint_format": "Checkpoint Format" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1214 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_checkpoint_reached": "CHECKPOINT REACHED" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1371 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_checkpoint_types": "Checkpoint Types" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1239 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_combining_techniques": "Combining Techniques" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L452 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_comment_out_everything": "Comment Out Everything" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L369 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_debug_complete_goal_find_and_fix": "DEBUG COMPLETE (goal: find_and_fix)" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1309 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_decision_point_when_to_act": "Decision Point: When to Act" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L97 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_delta_debugging": "Delta Debugging" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L198 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_differential_debugging": "Differential Debugging" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L311 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_entry_format": "Entry Format" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L776 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_environment_verification": "Environment Verification" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L502 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_evidence_quality": "Evidence Quality" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L83 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_experimental_design_framework": "Experimental Design Framework" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L69 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_falsifiability_requirement": "Falsifiability Requirement" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L46 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_file_location": "File Location" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L770 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_file_structure": "File Structure" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L815 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_follow_the_indirection": "Follow the Indirection" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L406 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_forming_hypotheses": "Forming Hypotheses" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L62 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_git_bisect": "Git Bisect" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L389 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_how_to_research": "How to Research" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L689 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_hypothesis_testing_pitfalls": "Hypothesis Testing Pitfalls" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L150 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_investigation_inconclusive": "INVESTIGATION INCONCLUSIVE" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1329 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_matching_logic": "Matching Logic" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L798 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_minimal_reproduction": "Minimal Reproduction" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L259 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_mode_flags": "Mode Flags" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1379 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_multiple_hypotheses_strategy": "Multiple Hypotheses Strategy" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L116 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_observability_first": "Observability First" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L342 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_purpose": "Purpose" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L766 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_recovery_from_wrong_hypotheses": "Recovery from Wrong Hypotheses" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L107 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_red_flags": "Red Flags" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L742 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_regression_testing": "Regression Testing" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L493 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_reproduction_verification": "Reproduction Verification" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L479 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_research_vs_reasoning_decision_tree": "Research vs Reasoning Decision Tree" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L718 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_resume_behavior": "Resume Behavior" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L891 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_root_cause_found_goal_find_root_cause_only": "ROOT CAUSE FOUND (goal: find_root_cause_only)" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1286 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_rubber_duck_debugging": "Rubber Duck Debugging" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L182 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_stability_testing": "Stability Testing" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L516 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_status_transitions": "Status Transitions" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L882 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_structured_reasoning_checkpoint": "Structured Reasoning Checkpoint" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L232 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_tdd_checkpoint_tdd_mode_true_after_writing_failing_test": "TDD CHECKPOINT (tdd_mode: true, after writing failing test)" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1351 | neighbors=[gsd-debugger.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-107.json

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
