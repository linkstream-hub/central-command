# Node Description Batch 403 of 412

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

- "workflows_validate_phase_7_commit": "7. Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L136 | neighbors=[validate-phase.md]
- "workflows_validate_phase_8_results_routing": "8. Results + Routing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L145 | neighbors=[validate-phase.md]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_01_plan": "17-01-PLAN.md" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-01-PLAN.md:L1
- "agent_ag": "Antigravity (AG)" | kind=entity | source=WORKFLOW.md
- "agent_brandon": "Brandon" | kind=entity | source=WORKFLOW.md
- "agent_claude_code": "Claude Code" | kind=entity | source=WORKFLOW.md
- "agent_gsd_advisor_researcher": "gsd-advisor-researcher" | kind=entity | source=agents/gsd-advisor-researcher.md
- "agent_gsd_ai_researcher": "gsd-ai-researcher" | kind=entity | source=agents/gsd-ai-researcher.md
- "agent_gsd_assumptions_analyzer": "gsd-assumptions-analyzer" | kind=entity | source=agents/gsd-assumptions-analyzer.md
- "agent_gsd_codebase_mapper": "gsd-codebase-mapper" | kind=entity | source=agents/gsd-codebase-mapper.md
- "agent_omp": "omp" | kind=entity | source=CLAUDE.md
- "agents_gsd_ai_researcher_agent": "gsd-ai-researcher.agent.md" | kind=entity | source=.github/agents/gsd-ai-researcher.agent.md:L1
- "agents_gsd_ai_researcher_md_agents_gsd_ai_researcher": "gsd-ai-researcher.md" | kind=entity | source=agents/gsd-ai-researcher.md:L1
- "agents_gsd_doc_classifier_agent": "gsd-doc-classifier.agent.md" | kind=entity | source=.github/agents/gsd-doc-classifier.agent.md:L1
- "agents_gsd_doc_classifier_md_agents_gsd_doc_classifier": "gsd-doc-classifier.md" | kind=entity | source=agents/gsd-doc-classifier.md:L1
- "agents_gsd_doc_synthesizer_agent": "gsd-doc-synthesizer.agent.md" | kind=entity | source=.github/agents/gsd-doc-synthesizer.agent.md:L1
- "agents_gsd_doc_synthesizer_md_agents_gsd_doc_synthesizer": "gsd-doc-synthesizer.md" | kind=entity | source=agents/gsd-doc-synthesizer.md:L1
- "agents_gsd_doc_verifier_agent": "gsd-doc-verifier.agent.md" | kind=entity | source=.github/agents/gsd-doc-verifier.agent.md:L1
- "agents_gsd_doc_verifier_md_agents_gsd_doc_verifier": "gsd-doc-verifier.md" | kind=entity | source=agents/gsd-doc-verifier.md:L1
- "agents_gsd_domain_researcher_agent": "gsd-domain-researcher.agent.md" | kind=entity | source=.github/agents/gsd-domain-researcher.agent.md:L1
- "agents_gsd_domain_researcher_md_agents_gsd_domain_researcher": "gsd-domain-researcher.md" | kind=entity | source=agents/gsd-domain-researcher.md:L1
- "agents_gsd_eval_auditor_agent": "gsd-eval-auditor.agent.md" | kind=entity | source=.github/agents/gsd-eval-auditor.agent.md:L1
- "agents_gsd_eval_auditor_md_agents_gsd_eval_auditor": "gsd-eval-auditor.md" | kind=entity | source=agents/gsd-eval-auditor.md:L1
- "agents_gsd_eval_planner_agent": "gsd-eval-planner.agent.md" | kind=entity | source=.github/agents/gsd-eval-planner.agent.md:L1
- "agents_gsd_eval_planner_md_agents_gsd_eval_planner": "gsd-eval-planner.md" | kind=entity | source=agents/gsd-eval-planner.md:L1
- "agents_gsd_framework_selector_agent": "gsd-framework-selector.agent.md" | kind=entity | source=.github/agents/gsd-framework-selector.agent.md:L1
- "agents_gsd_framework_selector_md_agents_gsd_framework_selector": "gsd-framework-selector.md" | kind=entity | source=agents/gsd-framework-selector.md:L1
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater": "gsd-intel-updater.md" | kind=entity | source=agents/gsd-intel-updater.md:L1
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_anti_patterns": "Anti-Patterns" | kind=entity | source=agents/gsd-intel-updater.md:L329
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_core_principle": "Core Principle" | kind=entity | source=agents/gsd-intel-updater.md:L31
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_forbidden_files": "Forbidden Files" | kind=entity | source=agents/gsd-intel-updater.md:L93
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_output_budget": "Output Budget" | kind=entity | source=agents/gsd-intel-updater.md:L284
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_partial_updates": "Partial Updates" | kind=entity | source=agents/gsd-intel-updater.md:L276
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_project_scope": "Project Scope" | kind=entity | source=agents/gsd-intel-updater.md:L56
- "agents_gsd_user_profiler_agent": "gsd-user-profiler.agent.md" | kind=entity | source=.github/agents/gsd-user-profiler.agent.md:L1
- "agents_gsd_user_profiler_md_agents_gsd_user_profiler": "gsd-user-profiler.md" | kind=entity | source=agents/gsd-user-profiler.md:L1
- "antigravity_dispatch_battletest_spec_md": "Dispatch Battle Test Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md
- "antigravity_dispatch_polish_spec_md": "Dispatch Polish Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md
- "antigravity_feedback_spec_md": "Dispatcher Feedback System Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md
- "antigravity_hr_permissions_and_deploy_md": "HR Permissions and Deploy Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-402.json

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
