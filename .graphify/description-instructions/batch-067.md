# Node Description Batch 68 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "references_planner_chunked_modes": "Modes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-chunked.md:L7 | neighbors=[Chunked Mode Return Formats, outline-only, single-plan] | lang=en
- "references_planner_human_verify_mode_the_two_modes": "The two modes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L5 | neighbors=[Planner — Human Verification Mode, `end-of-phase` (default — issue #3309), `mid-flight` (opt-back-in — pre-#3309 b…] | lang=en
- "references_planner_source_audit_planner_source_audit_authority_limits": "Planner Source Audit & Authority Limits" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L1 | neighbors=[planner-source-audit.md, Authority Limits — Constraint Examples, Multi-Source Coverage Audit Format] | lang=en
- "references_planning_config": "planning-config.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L1 | neighbors=[Complete Field Reference, Example Configurations, Field Interactions] | lang=en
- "references_query_graphify_reference_query_path_explain": "graphify reference: query, path, explain" | kind=entity | source=.github/skills/graphify/references/query.md:L1 | neighbors=[query.md, For /graphify explain, For /graphify path] | lang=en
- "references_revision_loop_revision_loop_pattern": "Revision Loop Pattern" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L1 | neighbors=[revision-loop.md, Important Notes, Pattern: Check-Revise-Escalate (max 3 i…] | lang=en
- "references_tdd_end_of_phase_tdd_review_checkpoint": "End-of-Phase TDD Review Checkpoint" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L285 | neighbors=[tdd.md, Review Checkpoint Format, What the Review Checks] | lang=en
- "references_update_graphify_reference_incremental_update_and_cluster_only": "graphify reference: incremental update and cluster-only" | kind=entity | source=.github/skills/graphify/references/update.md:L1 | neighbors=[update.md, For --cluster-only, For --update (incremental re-extraction)] | lang=en
- "references_verification_overrides_creating_overrides": "Creating Overrides" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L137 | neighbors=[Interactive Override Suggestion, Override via gsd-tools, Verification Overrides] | lang=en
- "remember_today_2026_06_14_done": "today-2026-06-14.done.md" | kind=entity | source=.remember/today-2026-06-14.done.md:L1 | neighbors=[03:00-10:56 | feat/phase-28-sentinel-di…, 10:58-11:16 | feat/phase-28-sentinel-di…, 19:59 | feat/phase-28-sentinel-diet] | lang=en
- "remember_today_2026_06_15_done": "today-2026-06-15.done.md" | kind=entity | source=.remember/today-2026-06-15.done.md:L1 | neighbors=[02:57-03:04 | feat/phase-28-sentinel-di…, 07:02 | feat/phase-28-sentinel-diet, 22:48 | feat/phase-28-sentinel-diet] | lang=en
- "research_architecture_integration_points": "Integration Points" | kind=entity | source=.planning/research/ARCHITECTURE.md:L387 | neighbors=[Architecture Research, External Services, Internal Boundaries] | lang=en
- "research_architecture_standard_architecture": "Standard Architecture" | kind=entity | source=.planning/research/ARCHITECTURE.md:L9 | neighbors=[Architecture Research, Component Responsibilities, System Overview] | lang=en
- "research_summary_sources": "Sources" | kind=entity | source=.planning/research/SUMMARY.md:L186 | neighbors=[Project Research Summary, Primary (HIGH confidence), Secondary (MEDIUM confidence)] | lang=en
- "schedule_redesign_sr_01_research_mobile_pages": "Mobile Pages" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L350 | neighbors=[Current Badge/PIN Login — `tech-pwa/src…, Current `/jobs` Page — `tech-pwa/src/ap…, Phase SR-01: Schedule Page Redesign - R…] | lang=en
- "schedule_redesign_sr_01_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L632 | neighbors=[Phase SR-01: Schedule Page Redesign - R…, Applicable ASVS Categories, Threat Patterns for This Phase] | lang=en
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "scripts_audit_authors": "audit-authors.ts" | kind=code-symbol | source=tech-pwa/scripts/audit-authors.ts:L1 | neighbors=[01bf641 Initial commit — clean history, schema.ts, audit()] | lang=en
- "scripts_audit_dev_artifacts": "audit-dev-artifacts.ts" | kind=code-symbol | source=tech-pwa/scripts/audit-dev-artifacts.ts:L1 | neighbors=[01bf641 Initial commit — clean history, schema.ts, audit()] | lang=en
- "scripts_check_neon_counts": "check-neon-counts.mjs" | kind=code-symbol | source=tech-pwa/scripts/check-neon-counts.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, f8dac22 fix: robust date parsing in syn…, checkCounts()] | lang=en
- "scripts_extract_legacy_data": "extract_legacy_data.py" | kind=code-symbol | source=scripts/extract_legacy_data.py:L1 | neighbors=[01bf641 Initial commit — clean history, fetch_data(), main()] | lang=en
- "scripts_migrate_new_contacts": "migrate-new-contacts.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-new-contacts.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 67b602c feat(p3-3): dispatch queue + ma…, run()] | lang=en
- "scripts_sanitize_dev_artifacts": "sanitize-dev-artifacts.ts" | kind=code-symbol | source=tech-pwa/scripts/sanitize-dev-artifacts.ts:L1 | neighbors=[01bf641 Initial commit — clean history, schema.ts, sanitize()] | lang=en
- "scripts_seed_orgs": "seed-orgs.ts" | kind=code-symbol | source=tech-pwa/scripts/seed-orgs.ts:L1 | neighbors=[01bf641 Initial commit — clean history, d7eb645 feat(p3-1): schema foundation —…, run()] | lang=en
- "scripts_seed_seed": "seed()" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L49 | neighbors=[seed.ts, pick(), sql] | lang=en
- "scripts_verify_p3_2": "verify-p3-2.ts" | kind=code-symbol | source=tech-pwa/scripts/verify-p3-2.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 1bfef1d feat(p3-2): migration scripts —…, 24cd71e feat(p3-2): time records migrat…] | lang=en
- "sentinel_stale_job_index_runstalejobscan": "runStaleJobScan()" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L43 | neighbors=[index.js, apiRequest(), raiseGitHubIssue()] | lang=en
- "sentinel_time_anomaly_index_runaudit": "runAudit()" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L38 | neighbors=[index.js, apiRequest(), raiseGitHubIssue()] | lang=en
- "sentinel_wc_scanner_index_runwcscan": "runWcScan()" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L38 | neighbors=[index.js, apiRequest(), raiseGitHubIssue()] | lang=en
- "side_effects_email_executor_emailsideeffectexecutor": "EmailSideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/email-executor.ts:L5 | neighbors=[email-executor.ts, .execute(), SideEffectExecutor] | lang=en
- "skill_scout_skill_examples": "Examples" | kind=entity | source=.github/skills/ecc/skill-scout/SKILL.md:L107 | neighbors=[Result Table, User-Facing Summary, Skill Scout] | lang=en
- "specs_antigravity_reorganize_spec_part_2_tech_pwa_directory": "PART 2 — TECH-PWA DIRECTORY" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L59 | neighbors=[ANTIGRAVITY SPEC — WORKSPACE REORGANIZA…, Delete empty stray folder, Delete stale files] | lang=en
- "specs_antigravity_rts_grid_spec_changes_exact_files": "CHANGES — EXACT FILES" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L39 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…, FILE 1: `tech-pwa/src/app/schedule/page…, FILE 2: `tech-pwa/src/components/dashbo…] | lang=en
- "specs_orchestration_direct": "ORCHESTRATION_DIRECT.md" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L1 | neighbors=[Author: Claude Code — Session 106, SPEC: Direct Agent Orchestration (No-Re…, Status: READY — no code required, workf…] | lang=en
- "specs_orchestration_direct_how_claude_code_invokes_a_sub_agent": "How Claude Code Invokes a Sub-Agent" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L43 | neighbors=[Author: Claude Code — Session 106, Implement sprint, Test sprint] | lang=pt
- "specs_phase3_p3_4_spec_frontend_update_protocol": "FRONTEND UPDATE PROTOCOL" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L389 | neighbors=[Frontend update rules:, Task 3 audit — grep BEFORE touching any…, Written: 2026-05-26 (Session 101)] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-067.json

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
