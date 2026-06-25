# Node Description Batch 339 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "n8n_readme_exporting_after_any_n8n_ui_change": "Exporting (after any n8n UI change)" | kind=entity | source=tools/n8n/README.md:L21 | neighbors=[n8n Workflow Version Control — PTOW ADW]
- "n8n_readme_importing_disaster_recovery_new_instance": "Importing (disaster recovery / new instance)" | kind=entity | source=tools/n8n/README.md:L53 | neighbors=[n8n Workflow Version Control — PTOW ADW]
- "n8n_readme_rules": "Rules" | kind=entity | source=tools/n8n/README.md:L79 | neighbors=[n8n Workflow Version Control — PTOW ADW]
- "n8n_readme_workflow_inventory": "Workflow Inventory" | kind=entity | source=tools/n8n/README.md:L68 | neighbors=[n8n Workflow Version Control — PTOW ADW]
- "n8n_version_control": "n8n Version Control" | kind=entity | source=tools/n8n/README.md | neighbors=[Railway n8n Host]
- "neon_db": "Neon Database" | kind=entity | source=tech-pwa/src/lib/dal/CLAUDE.md | neighbors=[DAL Gate]
- "notifications_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/notifications/route.ts:L8 | neighbors=[route.ts]
- "parse_route_genai": "genAI" | kind=code-symbol | source=tech-pwa/src/app/api/parse/route.ts:L7 | neighbors=[route.ts]
- "plankton_code_quality_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L1 | neighbors=[Plankton Code Quality Skill]
- "plankton_code_quality_skill_avoiding_hook_conflicts": "Avoiding Hook Conflicts" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L132 | neighbors=[Pairing with ECC]
- "plankton_code_quality_skill_ci_integration_pattern": "CI Integration Pattern" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L221 | neighbors=[ECC v1.8 Additions]
- "plankton_code_quality_skill_complementary_not_overlapping": "Complementary, Not Overlapping" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L114 | neighbors=[Pairing with ECC]
- "plankton_code_quality_skill_config_protection_defense_against_rule_gaming": "Config Protection (Defense Against Rule-Gaming)" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L56 | neighbors=[How It Works]
- "plankton_code_quality_skill_config_tamper_guard": "Config Tamper Guard" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L213 | neighbors=[ECC v1.8 Additions]
- "plankton_code_quality_skill_configuration_reference": "Configuration Reference" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L139 | neighbors=[Plankton Code Quality Skill]
- "plankton_code_quality_skill_copyable_hook_profile": "Copyable Hook Profile" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L197 | neighbors=[ECC v1.8 Additions]
- "plankton_code_quality_skill_environment_overrides": "Environment Overrides" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L180 | neighbors=[Plankton Code Quality Skill]
- "plankton_code_quality_skill_health_metrics": "Health Metrics" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L230 | neighbors=[ECC v1.8 Additions]
- "plankton_code_quality_skill_language_gate_table": "Language Gate Table" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L207 | neighbors=[ECC v1.8 Additions]
- "plankton_code_quality_skill_language_specific_dependencies": "Language-Specific Dependencies" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L99 | neighbors=[Setup]
- "plankton_code_quality_skill_package_manager_enforcement": "Package Manager Enforcement" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L64 | neighbors=[How It Works]
- "plankton_code_quality_skill_per_project_integration": "Per-Project Integration" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L90 | neighbors=[Setup]
- "plankton_code_quality_skill_quick_start": "Quick Start" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L73 | neighbors=[Setup]
- "plankton_code_quality_skill_recommended_combination": "Recommended Combination" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L125 | neighbors=[Pairing with ECC]
- "plankton_code_quality_skill_references": "References" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L189 | neighbors=[Plankton Code Quality Skill]
- "plankton_code_quality_skill_three_phase_architecture": "Three-Phase Architecture" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L20 | neighbors=[How It Works]
- "plankton_code_quality_skill_what_the_main_agent_sees": "What the Main Agent Sees" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L45 | neighbors=[How It Works]
- "plankton_code_quality_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L11 | neighbors=[Plankton Code Quality Skill]
- "planning_continue_here": ".continue-here.md" | kind=entity | source=.planning/.continue-here.md:L1 | neighbors=[BLOCKING CONSTRAINTS — Read Before Anyt…]
- "planning_continue_here_infrastructure_state": "Infrastructure State" | kind=entity | source=.planning/.continue-here.md:L67 | neighbors=[BLOCKING CONSTRAINTS — Read Before Anyt…]
- "planning_continue_here_key_technical_facts_for_phase_28_executor": "Key Technical Facts for Phase 28 Executor" | kind=entity | source=.planning/.continue-here.md:L75 | neighbors=[BLOCKING CONSTRAINTS — Read Before Anyt…]
- "planning_continue_here_required_reading": "Required Reading" | kind=entity | source=.planning/.continue-here.md:L62 | neighbors=[BLOCKING CONSTRAINTS — Read Before Anyt…]
- "planning_project": "PROJECT.md" | kind=entity | source=.planning/PROJECT.md:L1 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_active": "Active" | kind=entity | source=.planning/PROJECT.md:L39 | neighbors=[Requirements]
- "planning_project_constraints": "Constraints" | kind=entity | source=.planning/PROJECT.md:L70 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_context": "Context" | kind=entity | source=.planning/PROJECT.md:L60 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_core_value": "Core Value" | kind=entity | source=.planning/PROJECT.md:L7 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_current_milestone_v1_1_neon_cut_over": "Current Milestone: v1.1 Neon Cut-Over" | kind=entity | source=.planning/PROJECT.md:L11 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_evolution": "Evolution" | kind=entity | source=.planning/PROJECT.md:L93 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_key_decisions": "Key Decisions" | kind=entity | source=.planning/PROJECT.md:L79 | neighbors=[APT Central Command (CC2.0 → CC3.0)]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-338.json

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
