# Node Description Batch 379 of 412

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

- "specs_tech_pwa_api_spec_job_performance_history": "Job Performance History" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L563 | neighbors=[New Google Sheets Tabs Required (backen…]
- "specs_tech_pwa_api_spec_mock_api_for_local_development": "Mock API for Local Development" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L480 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_offline_behavior": "Offline Behavior" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L470 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_overview": "Overview" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L6 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_post_clockin": "POST — clockIn" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L254 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_post_clockout": "POST — clockOut" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L279 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_post_endbreak": "POST — endBreak" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L333 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_post_login": "POST — login" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L138 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_post_markcomplete": "POST — markComplete" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L357 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_post_startbreak": "POST — startBreak" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L310 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_post_uploadreceipt": "POST — uploadReceipt" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L386 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_screen_1_login": "Screen 1 — Login" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L415 | neighbors=[PWA Screens & UI Requirements]
- "specs_tech_pwa_api_spec_screen_2_today_s_jobs_home": "Screen 2 — Today's Jobs (Home)" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L422 | neighbors=[PWA Screens & UI Requirements]
- "specs_tech_pwa_api_spec_screen_3_job_detail": "Screen 3 — Job Detail" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L431 | neighbors=[PWA Screens & UI Requirements]
- "specs_tech_pwa_api_spec_screen_4_receipt_upload": "Screen 4 — Receipt Upload" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L442 | neighbors=[PWA Screens & UI Requirements]
- "specs_tech_pwa_api_spec_screen_5_job_history_optional_for_mvp": "Screen 5 — Job History (optional for MVP)" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L449 | neighbors=[PWA Screens & UI Requirements]
- "specs_tech_pwa_api_spec_techsession_stored_in_localstorage": "TechSession (stored in localStorage)" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L121 | neighbors=[Data Models]
- "specs_tech_pwa_api_spec_time_records": "Time Records" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L538 | neighbors=[New Google Sheets Tabs Required (backen…]
- "specs_tech_pwa_api_spec_timerecord": "TimeRecord" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L105 | neighbors=[Data Models]
- "specs_tech_pwa_api_spec_token_format": "Token format" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L50 | neighbors=[Authentication]
- "specs_tech_pwa_api_spec_transport_cors": "Transport & CORS" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L28 | neighbors=[For use with Google Antigravity to buil…]
- "src_auth_fetchstaffpermissions": "fetchStaffPermissions()" | kind=code-symbol | source=tech-pwa/src/auth.ts:L11 | neighbors=[auth.ts]
- "src_auth_handlers_auth_signin_signout": "{ handlers, auth, signIn, signOut }" | kind=code-symbol | source=tech-pwa/src/auth.ts:L34 | neighbors=[auth.ts]
- "src_index_allowed_origins": "ALLOWED_ORIGINS" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L1 | neighbors=[index.js]
- "src_instrumentation_client": "instrumentation-client.ts" | kind=code-symbol | source=tech-pwa/src/instrumentation-client.ts:L1 | neighbors=[01bf641 Initial commit — clean history]
- "src_proxy_config": "config" | kind=code-symbol | source=tech-pwa/src/proxy.ts:L22 | neighbors=[proxy.ts]
- "src_proxy_proxy": "proxy()" | kind=code-symbol | source=tech-pwa/src/proxy.ts:L4 | neighbors=[proxy.ts]
- "staff_roster_tab": "Staff Roster Tab" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md | neighbors=[Google Auth Spec]
- "start_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/start/route.ts:L10 | neighbors=[route.ts]
- "steps_codebase_drift_gate": "codebase-drift-gate.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-phase/steps/codebase-drift-gate.md:L1 | neighbors=[Step: codebase_drift_gate]
- "steps_codebase_drift_gate_step_codebase_drift_gate": "Step: codebase_drift_gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-phase/steps/codebase-drift-gate.md:L1 | neighbors=[codebase-drift-gate.md]
- "steps_per_plan_worktree_gate": "per-plan-worktree-gate.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-phase/steps/per-plan-worktree-gate.md:L1 | neighbors=[Per-plan worktree decision (#2772)]
- "steps_per_plan_worktree_gate_per_plan_worktree_decision_2772": "Per-plan worktree decision (#2772)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-phase/steps/per-plan-worktree-gate.md:L1 | neighbors=[per-plan-worktree-gate.md]
- "steps_post_merge_gate": "post-merge-gate.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-phase/steps/post-merge-gate.md:L1 | neighbors=[Step: post_merge_gate]
- "steps_post_merge_gate_step_post_merge_gate": "Step: post_merge_gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/execute-phase/steps/post-merge-gate.md:L1 | neighbors=[post-merge-gate.md]
- "strategic_compact_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L1 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_best_practices": "Best Practices" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L94 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_compaction_decision_guide": "Compaction Decision Guide" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L69 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_configuration": "Configuration" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L61 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_context_composition_awareness": "Context Composition Awareness" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L114 | neighbors=[Token Optimization Patterns]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-378.json

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
