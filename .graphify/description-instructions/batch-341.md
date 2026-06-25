# Node Description Batch 342 of 412

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

- "references_agent_contracts_marker_rules": "Marker Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L36 | neighbors=[Agent Contracts]
- "references_agent_contracts_planner_executor_via_plan_md": "Planner -> Executor (via PLAN.md)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L46 | neighbors=[Key Handoff Contracts]
- "references_agent_contracts_workflow_regex_patterns": "Workflow Regex Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L65 | neighbors=[Agent Contracts]
- "references_ai_evals": "ai-evals.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L1 | neighbors=[AI Evaluation Reference]
- "references_ai_evals_common_pitfalls": "Common Pitfalls" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L149 | neighbors=[AI Evaluation Reference]
- "references_ai_evals_execute_phase_instrument_while_building": "Execute Phase (Instrument While Building)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L128 | neighbors=[Evals in the Development Lifecycle]
- "references_ai_evals_model_vs_product_evaluation": "Model vs. Product Evaluation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L13 | neighbors=[Core Concepts]
- "references_ai_evals_monitor_phase_production_evaluation_loop": "Monitor Phase (Production Evaluation Loop)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L141 | neighbors=[Evals in the Development Lifecycle]
- "references_ai_evals_plan_phase_evaluation_aware_design": "Plan Phase (Evaluation-Aware Design)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L117 | neighbors=[Evals in the Development Lifecycle]
- "references_ai_evals_pre_deployment_development_phase": "Pre-Deployment (Development Phase)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L33 | neighbors=[Evaluation Dimensions]
- "references_ai_evals_production_monitoring": "Production Monitoring" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L48 | neighbors=[Evaluation Dimensions]
- "references_ai_evals_reference_dataset_guidelines": "Reference Dataset Guidelines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L82 | neighbors=[AI Evaluation Reference]
- "references_ai_evals_rubric_design": "Rubric Design" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L69 | neighbors=[AI Evaluation Reference]
- "references_ai_evals_the_guardrail_vs_flywheel_decision": "The Guardrail vs. Flywheel Decision" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L60 | neighbors=[AI Evaluation Reference]
- "references_ai_evals_the_three_components_of_every_eval": "The Three Components of Every Eval" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L17 | neighbors=[Core Concepts]
- "references_ai_evals_three_measurement_approaches": "Three Measurement Approaches" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L22 | neighbors=[Core Concepts]
- "references_ai_evals_tool_selection_by_system_type": "Tool Selection by System Type" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L102 | neighbors=[Eval Tooling Guide]
- "references_ai_evals_verify_phase_pre_deployment_validation": "Verify Phase (Pre-Deployment Validation)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L134 | neighbors=[Evals in the Development Lifecycle]
- "references_ai_evals_why_evals_exist": "Why Evals Exist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L10 | neighbors=[Core Concepts]
- "references_ai_frameworks": "ai-frameworks.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L1 | neighbors=[AI Framework Decision Matrix]
- "references_ai_frameworks_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L165 | neighbors=[AI Framework Decision Matrix]
- "references_ai_frameworks_autogen_ag2_microsoft_agent_framework": "AutoGen / AG2 / Microsoft Agent Framework" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L94 | neighbors=[Framework Profiles]
- "references_ai_frameworks_by_model_commitment": "By Model Commitment" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L154 | neighbors=[Decision Dimensions]
- "references_ai_frameworks_by_system_type": "By System Type" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L131 | neighbors=[Decision Dimensions]
- "references_ai_frameworks_by_team_size_and_stage": "By Team Size and Stage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L143 | neighbors=[Decision Dimensions]
- "references_ai_frameworks_claude_agent_sdk_anthropic": "Claude Agent SDK (Anthropic)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L83 | neighbors=[Framework Profiles]
- "references_ai_frameworks_combination_plays_multi_framework_stacks": "Combination Plays (Multi-Framework Stacks)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L178 | neighbors=[AI Framework Decision Matrix]
- "references_ai_frameworks_crewai": "CrewAI" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L28 | neighbors=[Framework Profiles]
- "references_ai_frameworks_google_adk_agent_development_kit": "Google ADK (Agent Development Kit)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L105 | neighbors=[Framework Profiles]
- "references_ai_frameworks_haystack": "Haystack" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L116 | neighbors=[Framework Profiles]
- "references_ai_frameworks_langchain": "LangChain" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L50 | neighbors=[Framework Profiles]
- "references_ai_frameworks_langgraph": "LangGraph" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L61 | neighbors=[Framework Profiles]
- "references_ai_frameworks_llamaindex": "LlamaIndex" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L39 | neighbors=[Framework Profiles]
- "references_ai_frameworks_openai_agents_sdk": "OpenAI Agents SDK" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L72 | neighbors=[Framework Profiles]
- "references_ai_frameworks_quick_picks": "Quick Picks" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L8 | neighbors=[AI Framework Decision Matrix]
- "references_artifact_types": "artifact-types.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L1 | neighbors=[GSD Artifact Types]
- "references_artifact_types_context_md_per_phase": "CONTEXT.md (per-phase)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L29 | neighbors=[Core Artifacts]
- "references_artifact_types_discussion_log_md_per_phase": "DISCUSSION-LOG.md (per-phase)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L57 | neighbors=[Extended Artifacts]
- "references_artifact_types_handoff_json_continue_here_md": "HANDOFF.json / .continue-here.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L47 | neighbors=[Core Artifacts]
- "references_artifact_types_methodology_md": "METHODOLOGY.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L97 | neighbors=[Standing Reference Artifacts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-341.json

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
