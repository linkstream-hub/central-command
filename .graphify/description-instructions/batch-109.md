# Node Description Batch 110 of 412

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

- "agents_gsd_debugger_md_agents_gsd_debugger_investigation_inconclusive": "INVESTIGATION INCONCLUSIVE" | kind=entity | source=agents/gsd-debugger.md:L1327 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_matching_logic": "Matching Logic" | kind=entity | source=agents/gsd-debugger.md:L796 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_minimal_reproduction": "Minimal Reproduction" | kind=entity | source=agents/gsd-debugger.md:L257 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_mode_flags": "Mode Flags" | kind=entity | source=agents/gsd-debugger.md:L1377 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_multiple_hypotheses_strategy": "Multiple Hypotheses Strategy" | kind=entity | source=agents/gsd-debugger.md:L114 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_observability_first": "Observability First" | kind=entity | source=agents/gsd-debugger.md:L340 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_purpose": "Purpose" | kind=entity | source=agents/gsd-debugger.md:L764 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_recovery_from_wrong_hypotheses": "Recovery from Wrong Hypotheses" | kind=entity | source=agents/gsd-debugger.md:L105 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_red_flags": "Red Flags" | kind=entity | source=agents/gsd-debugger.md:L740 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_regression_testing": "Regression Testing" | kind=entity | source=agents/gsd-debugger.md:L491 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_reproduction_verification": "Reproduction Verification" | kind=entity | source=agents/gsd-debugger.md:L477 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_research_vs_reasoning_decision_tree": "Research vs Reasoning Decision Tree" | kind=entity | source=agents/gsd-debugger.md:L716 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_resume_behavior": "Resume Behavior" | kind=entity | source=agents/gsd-debugger.md:L889 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_root_cause_found_goal_find_root_cause_only": "ROOT CAUSE FOUND (goal: find_root_cause_only)" | kind=entity | source=agents/gsd-debugger.md:L1284 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_rubber_duck_debugging": "Rubber Duck Debugging" | kind=entity | source=agents/gsd-debugger.md:L180 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_stability_testing": "Stability Testing" | kind=entity | source=agents/gsd-debugger.md:L514 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_status_transitions": "Status Transitions" | kind=entity | source=agents/gsd-debugger.md:L880 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_structured_reasoning_checkpoint": "Structured Reasoning Checkpoint" | kind=entity | source=agents/gsd-debugger.md:L230 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_tdd_checkpoint_tdd_mode_true_after_writing_failing_test": "TDD CHECKPOINT (tdd_mode: true, after writing failing test)" | kind=entity | source=agents/gsd-debugger.md:L1349 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_technique_selection": "Technique Selection" | kind=entity | source=agents/gsd-debugger.md:L437 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_test_first_debugging": "Test-First Debugging" | kind=entity | source=agents/gsd-debugger.md:L551 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_update_rules": "Update Rules" | kind=entity | source=agents/gsd-debugger.md:L864 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_verification_checklist": "Verification Checklist" | kind=entity | source=agents/gsd-debugger.md:L584 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_verification_mindset": "Verification Mindset" | kind=entity | source=agents/gsd-debugger.md:L626 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_verification_red_flags": "Verification Red Flags" | kind=entity | source=agents/gsd-debugger.md:L613 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_what_verified_means": "What \"Verified\" Means" | kind=entity | source=agents/gsd-debugger.md:L465 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_when_to_read": "When to Read" | kind=entity | source=agents/gsd-debugger.md:L788 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_when_to_reason_your_code": "When to Reason (Your Code)" | kind=entity | source=agents/gsd-debugger.md:L669 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_when_to_research_external_knowledge": "When to Research (External Knowledge)" | kind=entity | source=agents/gsd-debugger.md:L642 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_when_to_return_checkpoints": "When to Return Checkpoints" | kind=entity | source=agents/gsd-debugger.md:L1205 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_when_to_write": "When to Write" | kind=entity | source=agents/gsd-debugger.md:L792 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_working_backwards": "Working Backwards" | kind=entity | source=agents/gsd-debugger.md:L285 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-debugger.md:L7 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-debugger.md:L10 | neighbors=[gsd-debugger.md]
- "agents_gsd_doc_classifier_command_true": "command: \"true\"" | kind=entity | source=.claude/agents/gsd-doc-classifier.md:L11 | neighbors=[gsd-doc-classifier.md]
- "agents_gsd_doc_classifier_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-doc-classifier.md:L6 | neighbors=[gsd-doc-classifier.md]
- "agents_gsd_doc_classifier_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-doc-classifier.md:L8 | neighbors=[gsd-doc-classifier.md]
- "agents_gsd_doc_classifier_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-doc-classifier.md:L7 | neighbors=[gsd-doc-classifier.md]
- "agents_gsd_doc_classifier_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-doc-classifier.md:L10 | neighbors=[gsd-doc-classifier.md]
- "agents_gsd_doc_synthesizer_command_true": "command: \"true\"" | kind=entity | source=.claude/agents/gsd-doc-synthesizer.md:L11 | neighbors=[gsd-doc-synthesizer.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-109.json

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
