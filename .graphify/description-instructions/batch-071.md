# Node Description Batch 72 of 412

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

- "archive_antigravity_modal_visibility_spec_task_2_add_clear_active_tab_indicator": "TASK 2 — Add clear active-tab indicator" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L53 | neighbors=[File: tech-pwa/src/components/dashboard…, Location: the `button` element for each…]
- "archive_antigravity_nav_rbac_sprint_layout": "Layout" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L196 | neighbors=[PART 3 — FULL WEEKLY SCHEDULE VIEW, PART 5 — HR PAGE (MVP)]
- "archive_antigravity_nav_rbac_sprint_part_1_sidebar_navigation_restructure": "PART 1 — SIDEBAR NAVIGATION RESTRUCTURE" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L19 | neighbors=[File: `src/components/dashboard/AppSide…, Read every section before writing code.…]
- "archive_antigravity_nav_rbac_sprint_part_4_duration_enforcement_0_hour_prevention": "PART 4 — DURATION ENFORCEMENT (0-HOUR PREVENTION)" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L255 | neighbors=[File: `src/components/dashboard/Schedul…, Read every section before writing code.…]
- "archive_antigravity_nav_rbac_sprint_part_6_schedule_page_header_update": "PART 6 — SCHEDULE PAGE HEADER UPDATE" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L331 | neighbors=[File: `src/app/schedule/page.tsx`, Read every section before writing code.…]
- "archive_antigravity_notifications_spec": "ANTIGRAVITY_NOTIFICATIONS_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L1 | neighbors=[Notifications Center Phase 1 — Bell ico…, Sprint owner: Antigravity | Spec author…]
- "archive_antigravity_pwa_ui_prompt": "ANTIGRAVITY_PWA_UI_PROMPT.md" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L1 | neighbors=[APT Tech PWA — Expert-Grade UI Brief fo…, Paste this entire file into Antigravity…]
- "archive_antigravity_rbac_schedule_fix_spec_fix_1_shared_route_permissions_constant": "FIX 1 — Shared ROUTE_PERMISSIONS Constant" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L33 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…, Create `tech-pwa/src/lib/routePermissio…]
- "archive_antigravity_rbac_schedule_fix_spec_fix_6_schedule_page_date_window_month_pill": "FIX 6 — Schedule Page: Date Window + Month Pill" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L206 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…, File: `tech-pwa/src/app/schedule/page.t…]
- "archive_antigravity_schedule_dnd_fix_spec": "ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L1 | neighbors=[Schedule Grid: D&D Fix + Manual Schedul…, Sprint 30 | Spec author: Claude Code | …]
- "archive_antigravity_schedule_integrity_spec_in_live_page_tsx": "In `live/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L273 | neighbors=[FEATURE 3 — Mark Ready Optimistic State…, FEATURE 4 — Queue Refresh After Modal S…]
- "archive_antigravity_schedule_integrity_spec_the_gap": "The gap" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L247 | neighbors=[FEATURE 3 — Mark Ready Optimistic State…, FEATURE 4 — Queue Refresh After Modal S…]
- "archive_antigravity_schedule_integrity_spec_what_it_does": "What it does" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L21 | neighbors=[FEATURE 1 — OUT Cells for Approved Time…, FEATURE 2 — Daily Capacity Warning in D…]
- "archive_antigravity_schedule_team_sprint_part_3_coordination_screen_cosmetic_fixes_only": "PART 3 — COORDINATION SCREEN (Cosmetic Fixes Only)" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L359 | neighbors=[File: `src/app/live/page.tsx` and `src/…, Read this entire document before writin…]
- "archive_antigravity_session50_spec": "ANTIGRAVITY_SESSION50_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L1 | neighbors=[ANTIGRAVITY SESSION 50 SPEC — HARDENED …, Status: APPROVED FOR AG IMPLEMENTATION]
- "archive_antigravity_session50_spec_critical_preflight_read_before_touching_any_file": "CRITICAL PREFLIGHT — READ BEFORE TOUCHING ANY FILE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L6 | neighbors=[VERIFIED LITERALS (pulled from live cod…, Status: APPROVED FOR AG IMPLEMENTATION]
- "archive_antigravity_session50_spec_ui_redesign_appsidebar_tsx": "UI REDESIGN — AppSidebar.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L435 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Status: NO CHANGES REQUIRED]
- "archive_antigravity_spec_architect_correction_spec": "ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L1 | neighbors=[sentinel-spec-architect: Rewrite to web…, Sprint 31.1 | Spec author: Claude Code …]
- "archive_antigravity_sprint32_schedule_spec": "ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L1 | neighbors=[Schedule Grid Overhaul + Inline Estimat…, Sprint 32 | Spec author: Claude Code | …]
- "archive_antigravity_sprint32_schedule_spec_step_2_wire_onestimatechange_in_schedule_page_tsx": "Step 2 — Wire `onEstimateChange` in schedule/page.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L263 | neighbors=[SPEC 3 — Inline Estimate Editing on Sid…, File: `tech-pwa/src/app/schedule/page.t…]
- "archive_antigravity_tech_pwa_sprint_critical_bug_to_fix_first": "CRITICAL BUG TO FIX FIRST" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L8 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…, `/jobs` is broken for field techs]
- "archive_antigravity_tenant_scheduling_spec": "ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L1 | neighbors=[Sprint 30 | Spec author: Claude Code | …, Tenant Self-Scheduling — Full Flow]
- "archive_antigravity_timecard_approval_spec_feature_3_tech_pwa_post_clockout_attestation_modal": "FEATURE 3 — Tech PWA: Post-ClockOut Attestation Modal" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L472 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …, File: `tech-pwa/src/app/job/[jobId]/pag…]
- "archive_antigravity_weekly_schedule_nav_tech_pwa_src_components_dashboard_schedulepagecomponents_tsx": "tech-pwa/src/components/dashboard/SchedulePageComponents.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L7 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md, GOAL]
- "archive_antigravity_wo_card_redesign_spec_problem": "Problem" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L25 | neighbors=[PART 1 — CommandPalette.tsx, PART 3 — SchedulePageComponents.tsx — D…]
- "branch:repo:github.com/linkstream-hub/central-command#fix/remove-vercel-cron": "fix/remove-vercel-cron" | kind=Branch | source=git | neighbors=[01bf641 Initial commit — clean history, 9c89835 chore: remove every-minute cron…]
- "calendar_page_calendarpage": "CalendarPage()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L18 | neighbors=[page.tsx, useTranslation()]
- "calendar_page_daydetailpanel": "DayDetailPanel()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L256 | neighbors=[page.tsx, useTranslation()]
- "calendar_page_monthgrid": "MonthGrid()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L146 | neighbors=[page.tsx, useTranslation()]
- "caveman_compress_readme_usage": "Usage" | kind=entity | source=.github/skills/caveman-compress/README.md:L84 | neighbors=[README.md, What files work]
- "caveman_compress_security_security": "Security" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L1 | neighbors=[SECURITY.md, Snyk High Risk Rating]
- "change_pin_page_changepinpage": "ChangePinPage()" | kind=code-symbol | source=tech-pwa/src/app/change-pin/page.tsx:L13 | neighbors=[page.tsx, getSession()]
- "change_pin_route_hashpin": "hashPin()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/change-pin/route.ts:L11 | neighbors=[route.ts, POST()]
- "claude": "CLAUDE.md" | kind=entity | source=CLAUDE.md:L1 | neighbors=[APT CENTRAL COMMAND — CLAUDE.md, Ops reference. Non-narrative. Load refs…]
- "claude_agents_gsd_code_fixer_md_agents_gsd_code_fixer": "gsd-code-fixer.md" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L1 | neighbors=[- before_write, hooks:]
- "claude_agents_gsd_code_reviewer_md_agents_gsd_code_reviewer": "gsd-code-reviewer.md" | kind=entity | source=.claude/agents/gsd-code-reviewer.md:L1 | neighbors=[- before_write, hooks:]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater": "gsd-intel-updater.md" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L1 | neighbors=[hooks:, GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_completion_protocol": "Completion Protocol" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L308 | neighbors=[Context Quality Tiers, GSD Intel Updater]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_4_verify_artifacts_three_levels": "Step 4: Verify Artifacts (Three Levels)" | kind=entity | source=.claude/agents/gsd-verifier.md:L218 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…, Final Artifact Status]
- "claude_scripts_changeset_readme_md_changeset_readme_changeset_release_notes_tooling": "changeset/ — release-notes tooling" | kind=entity | source=.claude/scripts/changeset/README.md:L1 | neighbors=[README.md, `cli.cjs extract`]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-071.json

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
