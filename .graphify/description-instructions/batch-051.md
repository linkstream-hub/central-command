# Node Description Batch 52 of 412

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

- "commit:repo:github.com/linkstream-hub/central-command@e9be60dfbd6537e79e24bdad588c643e9230daef": "e9be60d feat(c1): implement JobUpdate deep module — PATCH route shrinks to 15 l…" | kind=Commit | source=git | neighbors=[958611a test(c1): RED tests for JobUpda…, feat/phase-18-event-publishing-seam, 41b6a57 feat(job-update): Phase 18 even…, job-update.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ed073908398794e604aadca97eefa376a6ff02fa": "ed07390 chore(phase-12): refresh diff artifact" | kind=Commit | source=git | neighbors=[7509ccf fix(phase-12): replace utcnow()…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, d770ab8 fix(phase-12): handle missing s…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f4a23e8216e7876650d9a82fd3b5ecb34402bb6b": "f4a23e8 chore: delete one-shot n8n update_p2_3.py (already executed)" | kind=Commit | source=git | neighbors=[149f1e3 fix(phase-19): remove record.pr…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 1ca22d9 feat(arch): ADR-010 job state m…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@f8dac22e41a163c91be807c5d5063391f150bdd3": "f8dac22 fix: robust date parsing in sync API routes to handle Google Sheets dat…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, fe10b9c fix: resolve linting errors in …, check-neon-counts.mjs, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f98fa25e09d95ed22dd05d7da4e24198136b575f": "f98fa25 chore(phase-12): add diff artifact" | kind=Commit | source=git | neighbors=[77c65ee feat(phase-12): neon_audit.py d…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 4b464d4 docs(phase-12): wave 3 summary] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@fe10b9c7777e38de1cc3004c879980305d286180": "fe10b9c fix: resolve linting errors in sync routes (unused imports, 'any' types)" | kind=Commit | source=git | neighbors=[f8dac22 fix: robust date parsing in syn…, chore/s97-phase3-architecture-design, 8a3caa5 fix(sync): explicitly map time …, route.ts] | lang=en
- "components_clockedinbar_clockedinbar": "ClockedInBar()" | kind=code-symbol | source=tech-pwa/src/components/ClockedInBar.tsx:L16 | neighbors=[ClockedInBar.tsx, layout.tsx, useToast(), useTranslation()] | lang=en
- "components_installprompt": "InstallPrompt.tsx" | kind=code-symbol | source=tech-pwa/src/components/InstallPrompt.tsx:L1 | neighbors=[layout.tsx, 01bf641 Initial commit — clean history, BeforeInstallPromptEvent, InstallPrompt()] | lang=en
- "components_skeleton": "Skeleton.tsx" | kind=code-symbol | source=tech-pwa/src/components/Skeleton.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, SkeletonBlock(), SkeletonCard(), page.tsx] | lang=en
- "components_toast": "Toast.tsx" | kind=code-symbol | source=tech-pwa/src/components/Toast.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, ToastContext.tsx, useToast(), JobDetailModal.tsx] | lang=en
- "concept_package_legitimacy_gate": "Package Legitimacy Gate" | kind=entity | source=agents/gsd-phase-researcher.md | neighbors=[gsd-phase-researcher.md, Step 1 — Run legitimacy check via seam, Step 2 — Ecosystem-specific registry ve…, Step 3 — Check for suspicious postinsta…] | lang=en
- "configure_ecc_skill_troubleshooting": "Troubleshooting" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L371 | neighbors=[Configure Everything Claude Code (ECC), "Path reference errors after project-le…, "Rules not working", "Skills not being picked up by Claude C…] | lang=en
- "contexts_dev_dev_context_profile": "Dev Context Profile" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/dev.md:L1 | neighbors=[dev.md, Focus Areas, Output Style, Verbosity] | lang=en
- "contexts_research_research_context_profile": "Research Context Profile" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/research.md:L1 | neighbors=[research.md, Focus Areas, Output Style, Verbosity] | lang=en
- "contexts_review_review_context_profile": "Review Context Profile" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/review.md:L1 | neighbors=[review.md, Focus Areas, Output Style, Verbosity] | lang=en
- "continuous_learning_v2_skill_quick_start": "Quick Start" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L151 | neighbors=[Continuous Learning v2.1 - Instinct, 1. Enable Observation Hooks, 2. Initialize Directory Structure, 3. Use the Instinct Commands] | lang=en
- "dal_job_state_dal_makejobstatedal": "makeJobStateDAL()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L52 | neighbors=[route.ts, route.ts, job-state-dal.ts, job-update.ts] | lang=en
- "dal_job_state_dal_maptojobstaterecord": "mapToJobStateRecord()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L32 | neighbors=[job-state-dal.ts, mapArrivalWindow(), mapPte(), mapWoType()] | lang=en
- "dal_mappers_computedashboardstats": "computeDashboardStats()" | kind=code-symbol | source=tech-pwa/src/lib/dal/mappers.ts:L58 | neighbors=[jobs.ts, mappers.ts, route.ts, smoke.ts] | lang=en
- "dal_sheets_client": "sheets-client.ts" | kind=code-symbol | source=tech-pwa/src/lib/dal/sheets-client.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4d7ba4d feat(phase-12): Neon-only cutov…, e61f88a fix(security+team): server-side…, sheetsRequest()] | lang=en
- "dashboard_datenavigation": "DateNavigation.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DateNavigation.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 93afc14 feat(schedule): Phase 2 schedul…, DateNavigation(), DateNavigationProps] | lang=en
- "design_2_colors_the_signal_palette": "2. Colors: The Signal Palette" | kind=entity | source=DESIGN.md:L112 | neighbors=[Neutral, Primary, Secondary: Status Semantic System, Design System: APT Central Command] | lang=en
- "design_extract_output_aptmaintenanceinc_com_design_language_brand_voice": "Brand Voice" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L803 | neighbors=[Button Copy Patterns, Sample Headings, Top CTA Verbs, Design Language: APT Maintenance] | lang=en
- "design_extract_output_aptmaintenanceinc_com_design_language_motion_language": "Motion Language" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L770 | neighbors=[Design Language: APT Maintenance, Duration Tokens, Easing Families, Keyframes In Use] | lang=en
- "design_extract_output_aptmaintenanceinc_com_tailwind_config": "aptmaintenanceinc-com-tailwind.config.js" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-tailwind.config.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_tailwind_config": "dispatch-aptmaintenanceinc-com-tailwind.config.js" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-tailwind.config.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…] | lang=en
- "dispatch_aptmaintenanceinc_com_prompts_cursor_design_brief": "Design brief" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/cursor.md:L1 | neighbors=[cursor.md, Library, Sections, Tokens] | lang=en
- "docs_apt_compliance_hr_blueprint_apt_wage_hour_paga_compliance_blueprint": "APT WAGE, HOUR & PAGA COMPLIANCE BLUEPRINT" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L1 | neighbors=[APT_COMPLIANCE_HR_BLUEPRINT.md, PART 1: WAGE, HOUR & PAGA AUTOMATED GUA…, PART 2: SYSTEMATIC HR WORKFLOWS, PART 3: SEPARATION AND FINAL PAY] | lang=en
- "docs_apt_compliance_hr_blueprint_part_2_systematic_hr_workflows": "PART 2: SYSTEMATIC HR WORKFLOWS" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L42 | neighbors=[APT WAGE, HOUR & PAGA COMPLIANCE BLUEPR…, 1. FEHA Disability/Medical Accommodatio…, 2. Harassment/Discrimination Investigat…, 3. Leave Stacking Logic] | lang=en
- "docs_capabilities_register": "CAPABILITIES_REGISTER.md" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L1 | neighbors=[CC CAPABILITIES REGISTER, Ground truth — what the system actually…, READ THIS BEFORE EVERY SESSION THAT TOU…, Updated: S136 (2026-06-04). Update afte…] | lang=en
- "docs_central_command_expansion_roadmap_team_protocol_peer_pair_model_updated_session_54": "TEAM PROTOCOL — PEER PAIR MODEL (Updated Session 54)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L635 | neighbors=[APT ECOSYSTEM — MASTER STRATEGIC ROADMAP, Division of Labor, Quality Gate — Every Sprint, What Claude Code Never Delegates] | lang=en
- "docs_design_reference_anchors_specific_patterns_to_copy": "Specific patterns to copy" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L35 | neighbors=[FEY — fey.com, HEIGHT.APP — height.app, RAYCAST — raycast.com, VERCEL DASHBOARD — vercel.com/dashboard] | lang=en
- "docs_domain_architecture": "DOMAIN_ARCHITECTURE.md" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L1 | neighbors=[DOMAIN ARCHITECTURE — APT ECOSYSTEM, Last updated: 2026-05-22, Systems analysis for the full platform …, This document answers: how does all of …] | lang=en
- "docs_domain_architecture_the_communications_architecture_expanded": "THE COMMUNICATIONS ARCHITECTURE (EXPANDED)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L474 | neighbors=[Last updated: 2026-05-22, Service A: Notification Engine, Service B: Conversation Threads, Service C: Internal Coordination] | lang=en
- "docs_known_vulns_revisit_each_entry_when_the_named_package_releases_a_patch_that_doesn_t_require_force": "Revisit each entry when the named package releases a patch that doesn't require…" | kind=entity | source=docs/KNOWN_VULNS.md:L5 | neighbors=[KNOWN_VULNS.md, HIGH — serialize-javascript <=7.0.4, MODERATE — esbuild <=0.24.2, MODERATE — postcss <8.5.10] | lang=en
- "docs_operator_guide": "OPERATOR_GUIDE.md" | kind=entity | source=docs/OPERATOR_GUIDE.md:L1 | neighbors=[APT FSM — OPERATOR GUIDE, For Brandon. Plain English. No coding k…, Last Updated: S137 (2026-06-04), This is your playbook for working with …] | lang=en
- "docs_operator_guide_2_how_to_request_work": "2. HOW TO REQUEST WORK" | kind=entity | source=docs/OPERATOR_GUIDE.md:L33 | neighbors=[BAD requests (method-focused — Claude d…, GOOD requests (outcome-focused):, Use this template for every request:, Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_3_how_to_read_a_plan": "3. HOW TO READ A PLAN" | kind=entity | source=docs/OPERATOR_GUIDE.md:L76 | neighbors=[Green lights ✅, Hard blocks ⛔ — do not approve:, Red flags 🚩 — ask Claude to clarify:, Last Updated: S137 (2026-06-04)] | lang=en
- "docs_product_vision": "PRODUCT_VISION.md" | kind=entity | source=docs/PRODUCT_VISION.md:L1 | neighbors=[Any feature, sprint, or architectural c…, APT FSM — PRODUCT VISION, Last Updated: S137 (2026-06-04), The authoritative north star for all bu…] | lang=en
- "docs_professional_baseline_consolidated_remediation_roadmap": "CONSOLIDATED REMEDIATION ROADMAP" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L235 | neighbors=[P1 — Fix Before Next Sprint (blocking), P2 — Schedule Within 30 Days, P3 — Tracked Backlog, Last updated: 2026-05-18] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-051.json

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
