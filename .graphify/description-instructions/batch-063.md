# Node Description Batch 64 of 412

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

- "commit:repo:github.com/linkstream-hub/central-command@e4d35f341f10da36d8800109212e927ee3717d7f": "e4d35f3 docs(11-01): append Next.js routes, Drizzle/Neon, n8n, and frontend tab…" | kind=Commit | source=git | neighbors=[a157981 docs(11-01): write header, exec…, feat/phase-19-code-js-email-migration, e2b75b6 docs(11-01): append shadow-writ…]
- "commit:repo:github.com/linkstream-hub/central-command@ea64d3418e2ddf7575c32da2bc467e06fc4bb39f": "ea64d34 chore: session close — Phase 1 finding: dispatch queue reads Sheets not…" | kind=Commit | source=git | neighbors=[6184db5 chore(s116): session state — S1…, feat/s115-dispatch-flow, f33d302 docs(01): capture Phase 1 conte…]
- "commit:repo:github.com/linkstream-hub/central-command@ea82854cc0f683225c3a390f9f8be22047c05ac5": "ea82854 feat(foundation): phases 9-11 — n8n error handling, GAS migration scope…" | kind=Commit | source=git | neighbors=[86de1f9 Merge branch 'main' of https://…, feat/foundation-phases-9-11, 989514d fix(job-comments): add sheetsId…]
- "commit:repo:github.com/linkstream-hub/central-command@eea6dcecaac871c50907368aa4cabdf46701037b": "eea6dce feat(gas): sendTenantContact() — PTE coordination email, wired in route…" | kind=Commit | source=git | neighbors=[feat/send-tenant-contact, Code.js, f86e858 chore: gitignore — exclude Clau…]
- "commit:repo:github.com/linkstream-hub/central-command@f0860f67f182680cb52762f4bf9ac9fc46eda08a": "f0860f6 feat(foundation-03): Gap 3 — add implement/test/commit/pull_request/cla…" | kind=Commit | source=git | neighbors=[05e78c5 fix(foundation-01): touch diff …, feat/foundation-milestone, cf28a3d feat(foundation-02): context_bu…]
- "commit:repo:github.com/linkstream-hub/central-command@f16595c22131d6c20c31336c596c35ec1c0a6275": "f16595c docs(11-01): complete tech debt map plan — SUMMARY, STATE, ROADMAP" | kind=Commit | source=git | neighbors=[e2b75b6 docs(11-01): append shadow-writ…, feat/phase-19-code-js-email-migration, 0268497 docs(11-02): expand MANIFEST.js…]
- "commit:repo:github.com/linkstream-hub/central-command@f1c65b349f663ea67dd1e279104150ebe294cadd": "f1c65b3 chore(s113): regenerate ag_diff with S113 code changes" | kind=Commit | source=git | neighbors=[7780b6c feat(s113): gap 2+4+5+6 — needs…, feat/s113-remediation, a49ddb6 chore(s113): task 8 test result…]
- "commit:repo:github.com/linkstream-hub/central-command@f33d302aaadee3873802f90a0e5be60fc2382f3d": "f33d302 docs(01): capture Phase 1 context — Dispatch Neon Cutover" | kind=Commit | source=git | neighbors=[ea64d34 chore: session close — Phase 1 …, feat/s115-dispatch-flow, c4f6ee0 docs(01): confirm Script Proper…]
- "commit:repo:github.com/linkstream-hub/central-command@f5c63dc09c6480da6e4a477845383931180af35c": "f5c63dc docs(agents): add Codex design brief — design.json, anti-slop rules, sk…" | kind=Commit | source=git | neighbors=[43c9034 fix(ui): BottomNav — remove dea…, chore/lean-agent-stack, dea1c75 chore: update SESSION_STATE to …]
- "commit:repo:github.com/linkstream-hub/central-command@f63f155acae81341a6eba53971bc985213a59a23": "f63f155 chore: update diff artifact" | kind=Commit | source=git | neighbors=[b77b802 feat(compliance): wire N8N_COMP…, feat/p2-2-compliance-activation, dfed67e chore: export n8n workflows - C…]
- "commit:repo:github.com/linkstream-hub/central-command@f7bdc933f497755d5ad554f07f842c279267027d": "f7bdc93 chore: update diff artifact" | kind=Commit | source=git | neighbors=[3bec3c3 fix(tech-pwa): fix undefined to…, feat/p2-2-compliance-activation, 8a5ced4 test(p2-2): manual webhook veri…]
- "commit:repo:github.com/linkstream-hub/central-command@f8c2c967c5b711f3c41c225e5ea009fbc9b82393": "f8c2c96 fix(vercel): skip preview builds for non-PR branch pushes" | kind=Commit | source=git | neighbors=[10ebf48 chore: merge origin/main — reso…, chore/phase-12-merge-sync, ee7129d chore: wire context_bundle.ps1 …]
- "commit:repo:github.com/linkstream-hub/central-command@fd3727c3b31b05e017953cab117100a751b67187": "fd3727c chore: remove every-minute cron — n8n owns gmail sync (Hobby plan compa…" | kind=Commit | source=git | neighbors=[1e45239 feat(domain): add JobStateServi…, feat/phase-17-job-state-machine, 73e906c docs(phase-17): rewrite spec wi…]
- "commit:repo:github.com/linkstream-hub/central-command@ff093f603c9c5d478c4e427321a5080af1f70188": "ff093f6 feat(adw): flag gate, hooks, and agents" | kind=Commit | source=git | neighbors=[3e87d74 chore(s121): Foundation Milesto…, feat/adw-flag-gate-and-hooks, c0a3abf chore: update diff artifact]
- "complete_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/job/complete/route.ts:L12 | neighbors=[route.ts, route.test.ts, verifyFieldSession()]
- "concept_time_off_manager": "Time Off Manager" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md | neighbors=[hr/page.tsx, time-off/page.tsx, Supervisor Timecard Approval]
- "concept_timecard_approval": "Supervisor Timecard Approval" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md | neighbors=[Employee Attestation, Time Off Manager, hr/page.tsx]
- "configure_ecc_skill_step_5_optimize_installed_files_optional": "Step 5: Optimize Installed Files (Optional)" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L303 | neighbors=[Configure Everything Claude Code (ECC), If optimizing rules:, If optimizing skills:]
- "context_language": "Language" | kind=entity | source=CONTEXT.md:L5 | neighbors=[APT Central Command, Sentinel Domain, Work Order Domain]
- "continuous_learning_skill_comparison_notes_research_jan_2025": "Comparison Notes (Research: Jan 2025)" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L105 | neighbors=[Potential v2 Enhancements, vs Homunculus, Continuous Learning Skill - DEPRECATED]
- "dal_jobs_manualjobpayload": "ManualJobPayload" | kind=code-symbol | source=tech-pwa/src/lib/dal/jobs.ts:L10 | neighbors=[jobs.ts, route.ts, route.ts]
- "dal_mappers_mapjob": "mapJob()" | kind=code-symbol | source=tech-pwa/src/lib/dal/mappers.ts:L21 | neighbors=[jobs.ts, mappers.ts, normalizeLegacyStatus()]
- "dashboard_activityfeed_activityfeedprops": "ActivityFeedProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ActivityFeed.tsx:L8 | neighbors=[ActivityFeed.tsx, TechStatus, Job]
- "dashboard_appsidebar_appsidebar": "AppSidebar()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx:L37 | neighbors=[AppSidebar.tsx, cn(), DashboardLayout.tsx]
- "dashboard_jobchip_jobchip": "JobChip()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobChip.tsx:L8 | neighbors=[JobChip.tsx, TechRow.tsx, UrgentQueuePanel.tsx]
- "dashboard_jobdetailmodal_jobdetailmodal": "JobDetailModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L157 | neighbors=[JobDetailModal.tsx, formatTechName(), useToast()]
- "dashboard_jobqueuetable_jobqueuetableprops": "JobQueueTableProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L20 | neighbors=[JobQueueTable.tsx, StatFilter, Job]
- "dashboard_manualschedulemodal_manualschedulemodalprops": "ManualScheduleModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L8 | neighbors=[ManualScheduleModal.tsx, TechStatus, Job]
- "dashboard_routeguard_routeguard": "RouteGuard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/RouteGuard.tsx:L10 | neighbors=[RouteGuard.tsx, DashboardLayout.tsx, hasAccess()]
- "dashboard_schedulepagecomponents_datedetailmodalprops": "DateDetailModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L22 | neighbors=[SchedulePageComponents.tsx, TechStatus, Job]
- "dashboard_schedulingdispatch_schedulingdispatchprops": "SchedulingDispatchProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L22 | neighbors=[SchedulingDispatch.tsx, TechSuggestion, Job]
- "dashboard_summarycards_statfilter": "StatFilter" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx:L7 | neighbors=[JobQueueTable.tsx, SummaryCards.tsx, JobQueueTableProps]
- "dashboard_techcard_techcardprops": "TechCardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechCard.tsx:L8 | neighbors=[TechCard.tsx, TechStatus, Job]
- "dashboard_techrow_techrow": "TechRow()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L19 | neighbors=[ScheduleGrid.tsx, TechRow.tsx, getInitials()]
- "design_6_do_s_and_don_ts": "6. Do's and Don'ts" | kind=entity | source=DESIGN.md:L223 | neighbors=[Do:, Don't:, Design System: APT Central Command]
- "design_extract_output_aptmaintenanceinc_com_design_language_component_anatomy": "Component Anatomy" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L794 | neighbors=[button — 6 instances, input — 4 instances, Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_transitions_animations": "Transitions & Animations" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L341 | neighbors=[Design Language: APT Maintenance, Common Transitions, Keyframe Animations]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_brand_voice": "Brand Voice" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L475 | neighbors=[Button Copy Patterns, Top CTA Verbs, Design Language: APT Central Command]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_layout_system": "Layout System" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L385 | neighbors=[Design Language: APT Central Command, Container Widths, Flex Patterns]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_motion_language": "Motion Language" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L460 | neighbors=[Design Language: APT Central Command, Duration Tokens, Easing Families]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-063.json

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
