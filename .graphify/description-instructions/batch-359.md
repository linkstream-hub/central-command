# Node Description Batch 360 of 412

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

- "schedule_redesign_sr_01_06_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-06-PLAN.md:L275 | neighbors=[sr-01-06-PLAN.md]
- "schedule_redesign_sr_01_06_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-06-PLAN.md:L269 | neighbors=[sr-01-06-PLAN.md]
- "schedule_redesign_sr_01_context": "sr-01-CONTEXT.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L1 | neighbors=[Schedule Page Redesign — Phase Context]
- "schedule_redesign_sr_01_context_build_order_sprint_1_scope": "Build Order (Sprint 1 Scope)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L114 | neighbors=[Schedule Page Redesign — Phase Context]
- "schedule_redesign_sr_01_context_canonical_refs": "Canonical Refs" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L134 | neighbors=[Schedule Page Redesign — Phase Context]
- "schedule_redesign_sr_01_context_deferred_ideas_future_phases": "Deferred Ideas (future phases)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L125 | neighbors=[Schedule Page Redesign — Phase Context]
- "schedule_redesign_sr_01_context_design_system_architecture_locked": "Design System Architecture — LOCKED" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L42 | neighbors=[Decisions]
- "schedule_redesign_sr_01_context_desktop_schedule_page_locked": "Desktop Schedule Page — LOCKED" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L56 | neighbors=[Decisions]
- "schedule_redesign_sr_01_context_domain": "Domain" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L10 | neighbors=[Schedule Page Redesign — Phase Context]
- "schedule_redesign_sr_01_context_interaction_standards_locked": "Interaction Standards — LOCKED" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L101 | neighbors=[Decisions]
- "schedule_redesign_sr_01_context_mobile_tech_pwa_locked": "Mobile Tech PWA — LOCKED" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L81 | neighbors=[Decisions]
- "schedule_redesign_sr_01_context_ptow_gate_pre_check": "PTOW Gate Pre-Check" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L148 | neighbors=[Schedule Page Redesign — Phase Context]
- "schedule_redesign_sr_01_context_visual_direction_locked": "Visual Direction — LOCKED" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-CONTEXT.md:L18 | neighbors=[Decisions]
- "schedule_redesign_sr_01_research": "sr-01-RESEARCH.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L1 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_api_schedule_today_response": "`/api/schedule/today` Response" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L189 | neighbors=[API Data Shape]
- "schedule_redesign_sr_01_research_api_schedule_week_response": "`/api/schedule/week` Response" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L204 | neighbors=[API Data Shape]
- "schedule_redesign_sr_01_research_applicable_asvs_categories": "Applicable ASVS Categories" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L634 | neighbors=[Security Domain]
- "schedule_redesign_sr_01_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L67 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L682 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_auth_patterns_confirmed": "Auth Patterns — Confirmed" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L172 | neighbors=[Current Codebase State]
- "schedule_redesign_sr_01_research_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L43 | neighbors=[User Constraints (from CONTEXT.md)]
- "schedule_redesign_sr_01_research_critical_gap_tech_phone_numbers": "Critical Gap: Tech Phone Numbers" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L248 | neighbors=[API Data Shape]
- "schedule_redesign_sr_01_research_cross_page_token_impact_assessment": "Cross-Page Token Impact Assessment" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L413 | neighbors=[Design System Migration Plan]
- "schedule_redesign_sr_01_research_current_badge_pin_login_tech_pwa_src_app_login_page_tsx": "Current Badge/PIN Login — `tech-pwa/src/app/login/page.tsx`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L372 | neighbors=[Mobile Pages]
- "schedule_redesign_sr_01_research_current_css_token_state_tech_pwa_src_app_globals_css": "Current CSS Token State — `tech-pwa/src/app/globals.css`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L111 | neighbors=[Current Codebase State]
- "schedule_redesign_sr_01_research_current_font_layout_tsx": "Current Font — `layout.tsx`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L151 | neighbors=[Current Codebase State]
- "schedule_redesign_sr_01_research_current_jobs_page_tech_pwa_src_app_jobs_page_tsx": "Current `/jobs` Page — `tech-pwa/src/app/jobs/page.tsx`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L352 | neighbors=[Mobile Pages]
- "schedule_redesign_sr_01_research_db_schema_status": "DB Schema Status" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L264 | neighbors=[Lock and Send — Backend Requirements]
- "schedule_redesign_sr_01_research_deferred_ideas_out_of_scope": "Deferred Ideas (OUT OF SCOPE)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L46 | neighbors=[User Constraints (from CONTEXT.md)]
- "schedule_redesign_sr_01_research_existing_schedule_page_tech_pwa_src_app_schedule_page_tsx": "Existing Schedule Page — `tech-pwa/src/app/schedule/page.tsx`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L84 | neighbors=[Current Codebase State]
- "schedule_redesign_sr_01_research_field_mapping_to_tech_row_grid": "Field Mapping to Tech-Row Grid" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L235 | neighbors=[API Data Shape]
- "schedule_redesign_sr_01_research_font_migration_path": "Font Migration Path" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L427 | neighbors=[Design System Migration Plan]
- "schedule_redesign_sr_01_research_icon_library": "Icon Library" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L164 | neighbors=[Current Codebase State]
- "schedule_redesign_sr_01_research_important_current_schedule_page_uses_gas_not_the_neon_api_route": "Important: Current Schedule Page Uses GAS, Not the Neon API Route" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L256 | neighbors=[API Data Shape]
- "schedule_redesign_sr_01_research_locked_decisions": "Locked Decisions" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L12 | neighbors=[User Constraints (from CONTEXT.md)]
- "schedule_redesign_sr_01_research_metadata": "Metadata" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L693 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_n8n_webhook_integration_pattern": "n8n Webhook Integration Pattern" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L286 | neighbors=[Lock and Send — Backend Requirements]
- "schedule_redesign_sr_01_research_new_api_route_spec_post_api_schedule_lock_and_send": "New API Route Spec: `POST /api/schedule/lock-and-send`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L332 | neighbors=[Lock and Send — Backend Requirements]
- "schedule_redesign_sr_01_research_new_tests_required": "New Tests Required" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L488 | neighbors=[Playwright Coverage]
- "schedule_redesign_sr_01_research_open_questions": "Open Questions" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L579 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-359.json

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
