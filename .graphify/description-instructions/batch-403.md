# Node Description Batch 404 of 412

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "antigravity_i18n_spec_md": "Tech PWA I18n Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md
- "antigravity_job_comments_spec_md": "Job Comments Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md
- "antigravity_kill_sync_spec_md": "Kill Sync Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md
- "AppSidebar": "App Sidebar" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx
- "aptmaintenanceinc_com_prompts_claude_artifacts": "claude-artifacts.md" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/claude-artifacts.md:L1
- "brandon_bittner": "Brandon Bittner" | kind=entity | source=docs/ORG.md
- "caveman_stats_skill": "SKILL.md" | kind=entity | source=.github/skills/caveman-stats/SKILL.md:L1
- "claude_agents_gsd_framework_selector_md_agents_gsd_framework_selector": "gsd-framework-selector.md" | kind=entity | source=.claude/agents/gsd-framework-selector.md:L1
- "claude_agents_gsd_user_profiler_md_agents_gsd_user_profiler": "gsd-user-profiler.md" | kind=entity | source=.claude/agents/gsd-user-profiler.md:L1
- "cloudflare_worker": "Cloudflare Worker" | kind=entity | source=docs/CF_WORKER_DASHBOARDAPI_UPDATE.md
- "concept_ai_eval_strategy": "AI Evaluation Strategy" | kind=entity | source=agents/gsd-eval-planner.md
- "concept_cross_phase_integration": "Cross-Phase Integration" | kind=entity | source=agents/gsd-integration-checker.md
- "concept_drive_attachments": "Google Drive Attachments" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md
- "concept_execution_deviation_rules": "Execution Deviation Rules" | kind=entity | source=agents/gsd-executor.md
- "concept_factual_claims_verification": "Factual Claims Verification" | kind=entity | source=agents/gsd-doc-verifier.md
- "concept_goal_backward_verification": "Goal-Backward Verification" | kind=entity | source=agents/gsd-plan-checker.md
- "concept_job_state_machine_seam": "Job State Machine Seam" | kind=entity | source=CONTEXT.md
- "concept_mvp_mode": "MVP Mode" | kind=entity | source=agents/gsd-planner.md
- "concept_nyquist_validation": "Nyquist Validation" | kind=entity | source=agents/gsd-nyquist-auditor.md
- "concept_revision_gate": "Revision Gate" | kind=entity | source=agents/gsd-plan-checker.md
- "concept_sentinel": "Sentinel" | kind=entity | source=CONTEXT.md
- "concept_staging_environment": "Neon Staging Environment" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md
- "dal_dead_code_cleanup": "DAL Dead Code Cleanup" | kind=entity | source=docs/adr/ADR-012-dal-cleanup-dead-code.md
- "dal_neon_first": "DAL Neon-First Pattern" | kind=entity | source=docs/adr/ADR-006-dal-pattern-neon-first.md
- "design_reference_fey": "Fey.com Design" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md
- "design_reference_linear": "Linear.app Design" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md
- "design_reference_vercel": "Vercel Dashboard Design" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md
- "dispatch_aptmaintenanceinc_com_prompts_claude_artifacts": "claude-artifacts.md" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/claude-artifacts.md:L1
- "doc_ai_spec": "AI-SPEC.md" | kind=entity | source=agents/gsd-domain-researcher.md
- "doc_eval_review": "EVAL-REVIEW.md" | kind=entity | source=agents/gsd-eval-auditor.md
- "doc_patterns": "PATTERNS.md" | kind=entity | source=agents/gsd-pattern-mapper.md
- "doc_plan": "PLAN.md" | kind=entity | source=agents/gsd-planner.md
- "doc_research": "RESEARCH.md" | kind=entity | source=agents/gsd-phase-researcher.md
- "domain_field_ops": "Field Operations Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md
- "domain_financial": "Financial Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md
- "domain_layer_boundary": "Domain Layer Boundary" | kind=entity | source=docs/adr/ADR-014-domain-layer-boundary.md
- "domain_lead_intake": "Lead Intake Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md
- "domain_property_directory": "Property / Client Directory Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md
- "domain_workforce": "Workforce Domain" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md
- "entity_lapham": "LAPHAM" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-403.json

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
