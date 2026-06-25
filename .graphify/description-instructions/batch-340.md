# Node Description Batch 341 of 412

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

- "production_audit_skill_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L191 | neighbors=[Production Audit]
- "production_audit_skill_data_integrity": "Data Integrity" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L89 | neighbors=[Risk Lenses]
- "production_audit_skill_evidence_checklist": "Evidence Checklist" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L52 | neighbors=[Production Audit]
- "production_audit_skill_example": "Example" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L162 | neighbors=[Production Audit]
- "production_audit_skill_how_it_works": "How It Works" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L36 | neighbors=[Production Audit]
- "production_audit_skill_operations": "Operations" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L104 | neighbors=[Risk Lenses]
- "production_audit_skill_output_format": "Output Format" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L143 | neighbors=[Production Audit]
- "production_audit_skill_payments_and_webhooks": "Payments And Webhooks" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L97 | neighbors=[Risk Lenses]
- "production_audit_skill_scoring": "Scoring" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L121 | neighbors=[Production Audit]
- "production_audit_skill_security_and_auth": "Security And Auth" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L78 | neighbors=[Risk Lenses]
- "production_audit_skill_see_also": "See Also" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L200 | neighbors=[Production Audit]
- "production_audit_skill_user_experience": "User Experience" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L112 | neighbors=[Risk Lenses]
- "production_audit_skill_when_not_to_use": "When Not to Use" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L25 | neighbors=[Production Audit]
- "production_audit_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L15 | neighbors=[Production Audit]
- "properties_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/properties/route.ts:L6 | neighbors=[route.ts]
- "ptow_awareness": "PTOW_AWARENESS.md" | kind=entity | source=PTOW_AWARENESS.md:L1 | neighbors=[PTOW Hub Awareness]
- "ptow_awareness_domain_skills": "Domain Skills" | kind=entity | source=PTOW_AWARENESS.md:L21 | neighbors=[PTOW Hub Awareness]
- "ptow_awareness_governance_policy": "Governance Policy" | kind=entity | source=PTOW_AWARENESS.md:L14 | neighbors=[PTOW Hub Awareness]
- "ptow_awareness_quick_start_new_session_setup": "Quick Start (New Session Setup)" | kind=entity | source=PTOW_AWARENESS.md:L25 | neighbors=[PTOW Hub Awareness]
- "ptow_awareness_shared_resources": "Shared Resources" | kind=entity | source=PTOW_AWARENESS.md:L6 | neighbors=[PTOW Hub Awareness]
- "ptow_awareness_three_laws_always_active": "Three Laws (Always Active)" | kind=entity | source=PTOW_AWARENESS.md:L31 | neighbors=[PTOW Hub Awareness]
- "public_sw": "sw.js" | kind=code-symbol | source=tech-pwa/public/sw.js:L1 | neighbors=[01bf641 Initial commit — clean history]
- "railway_n8n": "Railway n8n Host" | kind=entity | source=tools/n8n/README.md | neighbors=[n8n Version Control]
- "readme": "README.md" | kind=entity | source=README.md:L1 | neighbors=[APT Central Command]
- "readme_build_commands": "Build Commands" | kind=entity | source=README.md:L91 | neighbors=[APT Central Command]
- "readme_contributing": "Contributing" | kind=entity | source=README.md:L135 | neighbors=[APT Central Command]
- "readme_deployment": "Deployment" | kind=entity | source=README.md:L119 | neighbors=[APT Central Command]
- "readme_installation": "Installation" | kind=entity | source=README.md:L6 | neighbors=[APT Central Command]
- "readme_key_api_routes": "Key API Routes" | kind=entity | source=README.md:L76 | neighbors=[APT Central Command]
- "readme_project_structure": "Project Structure" | kind=entity | source=README.md:L57 | neighbors=[APT Central Command]
- "readme_quick_start": "Quick Start" | kind=entity | source=README.md:L24 | neighbors=[APT Central Command]
- "readme_stack": "Stack" | kind=entity | source=README.md:L105 | neighbors=[APT Central Command]
- "readme_usage": "Usage" | kind=entity | source=README.md:L45 | neighbors=[APT Central Command]
- "reference_critique_run_notes": "Run Notes" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L164 | neighbors=[Generate Combined Critique Report]
- "references_add_watch": "add-watch.md" | kind=entity | source=.github/skills/graphify/references/add-watch.md:L1 | neighbors=[graphify reference: add a URL and watch…]
- "references_add_watch_for_graphify_add": "For /graphify add" | kind=entity | source=.github/skills/graphify/references/add-watch.md:L5 | neighbors=[graphify reference: add a URL and watch…]
- "references_add_watch_for_watch": "For --watch" | kind=entity | source=.github/skills/graphify/references/add-watch.md:L39 | neighbors=[graphify reference: add a URL and watch…]
- "references_agent_contracts": "agent-contracts.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L1 | neighbors=[Agent Contracts]
- "references_agent_contracts_agent_registry": "Agent Registry" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L9 | neighbors=[Agent Contracts]
- "references_agent_contracts_executor_verifier_via_summary_md": "Executor -> Verifier (via SUMMARY.md)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L56 | neighbors=[Key Handoff Contracts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-340.json

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
