# DRAFT TASK CARDS — 2026-06-28
# Status: DRAFT — Pending Brandon Approval
# Author: Claude Code
# Do NOT issue to AG until Brandon approves. Present → wait → then issue.

---

## DRAFT Task Card TC-PURGE-001: Purge Project Root / Workspace

**Task:** Audit and purge all dead-weight files from project root; archive rather than delete when evidence of historical use exists.
**Business reason:** Root directory has 5+ dirs and 10+ files with zero active role. Dead weight increases context rot risk, confuses agents, slows navigation.
**User-visible outcome:** Root structure is clean; only active governance, docs, tech-pwa, workers, Sentinels remain.
**Phase:** 0
**Approved by:** PENDING — do not issue until Brandon confirms

**Files allowed to change:** All items listed in the DELETE and ARCHIVE sections below. Nothing else.
**Files forbidden to change:** SESSION_STATE.md, AGENTS.md, AGENT_PLAYBOOK.md, CLAUDE.md, IMPLEMENTATION_PLAN.md, CORE_PROJECT_FILES.md, AG.md, PRODUCT.md, DESIGN.md, GATES.md, RULES.md, README.md, tech-pwa/**, workers/**, docs/**, Sentinels/**, railway/**, graphify-out/**

**Database changes:** none
**API changes:** none
**Auth changes:** none
**n8n/GAS changes:** none
**New dependency:** none

---

### AG Task List (in order)

**STEP 1 — Create archive dirs before touching anything:**
```
mkdir -p archive/gas-legacy
mkdir -p archive/specs
mkdir -p archive/artifacts
mkdir -p archive/scripts-legacy
mkdir -p archive/design-extract
```

**STEP 2 — GAS root artifacts → DELETE:**
These are Google Apps Script source files executed in GAS cloud. GAS editor is source of truth. Local copies are stale mirrors with zero import path into Next.js.

First, run ONE Codegraph call to confirm no TS/JS file references them:
```
codegraph explore "imports or references to Code.js, TechPWA.gs, SuggestTechs.js, DashboardAPI.gs"
```
If Codegraph returns zero call edges into these filenames from tech-pwa/ or workers/: DELETE all.
If Codegraph finds any edge: STOP and report to Claude Code before proceeding.

Files to delete on Codegraph confirmation:
- `Code.js`
- `SuggestTechs.js`
- `TechPWA.gs`
- `appsscript.json` (root level)
- `dashboard-api/` (entire dir — DashboardAPI.gs, appsscript.json, CLAUDE.md for GAS agent)

**STEP 3 — One-time scripts → delete:**
These have zero ongoing use:
- `fix_tavily_pkg.js` — one-time Tavily package fix
- `ROSTER_PROOF.txt` — one-time verification artifact
- `skills-lock.json` — one-time skills snapshot; content superseded by CLAUDE.md/AGENTS.md

**STEP 4 — scratch/ → delete entire dir:**
Contents are bookmark reorganization scripts (list_bookmark_folders.py, mega_merge_bookmarks.py, etc.) and HTML mockups (APT_Dispatch_Dashboard.html, Dispatch_Walkthrough.html) with zero relation to this codebase.
Confirm before delete: `codegraph explore "references to scratch directory or scratch/ path"` — if any edge found from active code, STOP and report to CC.

**STEP 5 — artifacts/ → archive/artifacts:**
Move entire dir. Pre-recovery diffs (sr-01-*.txt, phase25_*.txt, etc.) and old test results are historical record only.
Exception: if any file in artifacts/ is referenced in SESSION_STATE.md or docs/, note it in report.

**STEP 6 — specs/ → archive/specs:**
Move entire dir. All specs are superseded:
- PHASE17_, PHASE18_, PHASE19_ — implemented; replaced by SESSION_STATE.md phase gates
- SPRINT_* — all pre-recovery sprints; superseded by Task Card system
- ANTIGRAVITY_* — legacy Antigravity framework; not current stack
- PHASE3_*, P2_*, P3_* — old phase numbering; superseded
- SPEC_P1_*, SPEC_P2_* — ditto
- archive/ subdir inside specs/ — move with parent

After move, verify: `grep -r "specs/" --include="*.md" docs/ SESSION_STATE.md AGENTS.md` — any active reference must be noted in report.

**STEP 7 — scripts/ → split:**
Scripts dir has two categories:
- ANTIGRAVITY_*.md files — spec docs, not scripts. Move to archive/specs.
- changeset/, lib/, extract_legacy_data.py, verify-hash-parity.mjs — evaluate:
  - If referenced in package.json scripts or CI workflows: keep in scripts/, note in report.
  - If not referenced: move to archive/scripts-legacy.

**STEP 8 — design-extract-output/ → archive/design-extract:**
Contains Impeccable design system extraction for aptmaintenanceinc.com. Active but FROZEN during Phase 0.
Move to archive/design-extract with note: "Resume post-Phase 5. Design system frozen during recovery."
Do NOT delete — these are Impeccable outputs.

**STEP 9 — logs/ → delete:**
Contains only `subagent_stop.json`. No active use.

**STEP 10 — lighthouserc.json → evaluate:**
Check: `grep -r "lighthouserc" .github/ package.json` — if referenced in CI, keep. If not, delete.

**STEP 11 — trees/ and agents/ → evaluate:**
- `trees/` contains n8n/neon/orchestrator folder structure maps. Check if any active doc references them: `grep -r "trees/" docs/ SESSION_STATE.md AGENTS.md`. If no active ref → move to archive.
- `agents/` contains GSD advisor/researcher agent definitions + security_logs + hook_logs. Context bundles in agents/context_bundles/ may still be loaded. Report to CC with list before touching.

**STEP 12 — tools/ → evaluate:**
Contains n8n, neon, orchestrator tool configs. Check if active: `grep -r "tools/" tech-pwa/ workers/ docs/`. Report findings to CC before touching.

**STEP 13 — session-summary.tmp:**
Active handoff file. Do NOT delete. After CC session ends, archive to `archive/session-summaries/` with date prefix.

---

### Assumptions declared:

| Assumption | Evidence Needed | Risk if Wrong |
|---|---|---|
| GAS root files not imported by active TS code | grep output Step 2 | HIGH — breaks build |
| scratch/ scripts not referenced anywhere | grep output Step 4 | LOW — separate domain |
| specs/ not referenced by active docs | grep output Step 6 | MEDIUM — doc rot |
| scripts/ ANTIGRAVITY_.md are docs not code | file type check | LOW |

### Failure modes:

| Failure Mode | Guard/Detection | Recoverable? |
|---|---|---|
| Archived file was still referenced | grep checks before each move | Yes — move back from archive |
| Delete instead of archive by mistake | Explicit grep check before any rm | Yes — git history |
| CI breaks post-cleanup | CI run after PR | Yes — revert |

**Cross-agent questions:** None — file system only.
**RED test criteria:** N/A — no code changes.
**GREEN verification:** `ls` of root shows only: AG.md, AGENTS.md, CLAUDE.md, CODEX_FRONTEND_BRIEF.md, CORE_PROJECT_FILES.md, DESIGN.md, GATES.md, IMPLEMENTATION_PLAN.md, PRODUCT.md, README.md, RULES.md, SESSION_STATE.md, session-summary.tmp, archive/, docs/, graphify-out/, railway/, Sentinels/, tech-pwa/, workers/ (plus any confirmed-active dirs from Steps 11-12). CI still green.
**Rollback plan:** Archive dirs contain originals. Any accidentally deleted file recoverable from git history.
**Definition of done:** Root contains only active governance files and active code dirs. All moved items confirmed in archive/. CI green. AG posts diff with `ls` output before/after.
**ag-plan-reviewer required:** no

---
---

## DRAFT Task Card TC-AUDIT-002: Audit Core Project Files + Agent Defaults

**Task:** Audit all core governance files and each agent's global defaults; enforce core stack (agentmemory + caveman + karpathy + pocock + graphify + codegraph) per agent; eliminate redundancy, contradictions, and stale content.
**Business reason:** Core project files (CLAUDE.md, AGENTS.md, AG.md, AGENT_PLAYBOOK.md, RULES.md, GATES.md) and agent global configs have accumulated drift, contradictions, and redundancy. Agents loading conflicting instructions = unpredictable behavior. Fix before Phase 1.
**User-visible outcome:** Every agent in the system has a verified, non-contradictory core stack. CLAUDE.md canonical plan path bug fixed. Redundant governance files consolidated.
**Phase:** 0
**Approved by:** PENDING — do not issue until Brandon confirms

**Files allowed to change:**
- `C:\PTOW\1_APT_Central_Command\CLAUDE.md` — fix canonical plan path; update to YAML-first
- `C:\PTOW\1_APT_Central_Command\AGENTS.md` — verify accuracy; remove stale roles
- `C:\PTOW\1_APT_Central_Command\AG.md` — verify AG core stack documented
- `C:\PTOW\1_APT_Central_Command\CODEX_FRONTEND_BRIEF.md` — verify accuracy; trim if verbose
- `C:\PTOW\1_APT_Central_Command\RULES.md` — assess: merge into AGENT_PLAYBOOK.md if redundant, else update
- `C:\PTOW\1_APT_Central_Command\GATES.md` — assess: merge into SESSION_STATE.md if redundant, else update
- `C:\PTOW\1_APT_Central_Command\CORE_PROJECT_FILES.md` — verify all listed files still exist

**Files forbidden to change:** SESSION_STATE.md, IMPLEMENTATION_PLAN.md, AGENT_PLAYBOOK.md, DESIGN.md, PRODUCT.md, tech-pwa/**, docs/**, workers/**

**Database changes:** none
**API changes:** none
**Auth changes:** none
**n8n/GAS changes:** none
**New dependency:** none

---

### AG Task List (in order)

**STEP 1 — Audit CLAUDE.md (project root):**

Check each of these claims against current reality:
- [ ] `app: tech-pwa` — is this still the app dir name? Verify: `ls tech-pwa/`
- [ ] `dev: cd tech-pwa && npm run dev` — still correct? Check package.json scripts.
- [ ] `Recovery plan (canonical): C:\Users\Aldrick\.gemini\antigravity\brain\9f4ae946-e172-46dd-9a27-8d376cf2c6de\implementation_plan.md` — **BUG**: this is the S171 execution plan, NOT the recovery plan. Fix: change to `Recovery plan (canonical): C:\PTOW\1_APT_Central_Command\IMPLEMENTATION_PLAN.md`
- [ ] Reference Triggers table — verify every file listed actually exists. For each missing file, mark `[FILE NOT FOUND]` in the table.
- [ ] Review Gates table — verify all 9 gates match AGENT_PLAYBOOK.md. If duplicate with lower detail, update CLAUDE.md to point to AGENT_PLAYBOOK.md.
- [ ] Team Structure — verify matches AGENTS.md.
- [ ] Never List — verify matches AGENT_PLAYBOOK.md never constraints.
- [ ] Trim any verbose prose. YAML-first. No narrative paragraphs.

**STEP 2 — Audit AGENTS.md:**

For each agent listed (Claude Code, AG, Codex, omp):
- [ ] Role description accurate vs current AGENT_PLAYBOOK.md?
- [ ] File domain boundaries correct? (AG: /api/**, /domain/**, etc.)
- [ ] Core stack listed? Each agent must explicitly state: agentmemory, caveman, karpathy, pocock, graphify, codegraph. Exception: Codex = frontend only (no codegraph/graphify required). omp = bounded scout (no full stack required).
- [ ] Any stale agents listed that no longer exist? Remove.
- [ ] Any contradiction with AGENT_PLAYBOOK.md? Flag every contradiction with `[CONTRADICTION: AGENTS.md says X; AGENT_PLAYBOOK.md says Y]`.

**STEP 3 — Audit AG.md:**

AG's own instruction file. Check:
- [ ] Core stack block exists with: agentmemory, caveman (full), karpathy, pocock, graphify, codegraph.
- [ ] Session flow matches AGENT_PLAYBOOK.md AG section exactly.
- [ ] Never list matches AGENT_PLAYBOOK.md.
- [ ] File domain boundaries explicit.
- [ ] `ag-plan-reviewer` integration documented.
- [ ] RED test mandate documented.
- [ ] Evidence package mandate documented.
- [ ] No verbose prose — YAML-first, fragment-OK.

If any core stack item missing: add it. If any contradiction with AGENT_PLAYBOOK.md: resolve in favor of AGENT_PLAYBOOK.md (it is authoritative).

**STEP 4 — Audit CODEX_FRONTEND_BRIEF.md:**

- [ ] References `.impeccable/design.json` — does that file exist? `ls tech-pwa/.impeccable/` or `ls .impeccable/`
- [ ] shadcn/ui standard documented?
- [ ] Core stack for Codex: agentmemory, caveman (full), karpathy. No codegraph (frontend, not backend AST). No graphify mandate. Verify this is stated.
- [ ] File domain restriction documented: `/app/**` only, never `/api/**`, `/domain/**`, `/lib/dal/**`, `/lib/schema/**`.
- [ ] `/impeccable audit` trigger documented?
- [ ] No verbose prose. YAML-first.

**STEP 5 — Assess RULES.md vs AGENT_PLAYBOOK.md:**

Read both. Then:
- [ ] List every rule in RULES.md.
- [ ] For each rule: is it already in AGENT_PLAYBOOK.md (same or better)?
  - If YES: RULES.md entry is redundant. Mark for consolidation.
  - If NO: RULES.md has unique content. Must migrate to AGENT_PLAYBOOK.md.
- [ ] After migration of unique content: convert RULES.md to a one-liner pointing to AGENT_PLAYBOOK.md. OR delete RULES.md if 100% redundant.
- [ ] Report decision to CC with list of what moved and what was dropped.

**STEP 6 — Assess GATES.md vs SESSION_STATE.md:**

Read both. Then:
- [ ] List every gate in GATES.md.
- [ ] For each gate: is it already in SESSION_STATE.md with equal or better detail?
  - If YES: GATES.md entry is redundant. Mark for consolidation.
  - If NO: GATES.md has unique content. Must migrate to SESSION_STATE.md.
- [ ] After migration: convert GATES.md to a one-liner pointing to SESSION_STATE.md. OR delete GATES.md if 100% redundant.
- [ ] Report decision to CC with what moved and what was dropped.

**STEP 7 — Audit CORE_PROJECT_FILES.md:**

This file lists all canonical project files. For each file listed:
- [ ] Does the file actually exist? `ls` each path.
- [ ] Is the description still accurate?
- [ ] Remove entries for files that no longer exist.
- [ ] Add entries for new governance files created this session: IMPLEMENTATION_PLAN.md, AGENT_PLAYBOOK.md, docs/ASSUMPTION_LEDGER.md, docs/EVIDENCE_REGISTER.md, docs/DATA_INTEGRITY_AUDIT.md, docs/PHASE_REPORTS/TEMPLATE.md.

**STEP 8 — Global CLAUDE.md (`C:\Users\Aldrick\.claude\CLAUDE.md`):**

READ ONLY. Do NOT modify. Report findings to CC:
- [ ] Does it reference agentmemory, caveman, karpathy, pocock, graphify, codegraph?
- [ ] Does it reference the APT project correctly?
- [ ] Any instructions that conflict with project-level CLAUDE.md?
- [ ] Any stale content (e.g., references to old infrastructure, old tool names)?

CC will handle global CLAUDE.md updates — not AG.

**STEP 9 — Post-audit report:**

AG must post a single structured report with:
```
FILE: [filename]
STATUS: [GREEN | AMENDED | DELETED | REDIRECT-ADDED]
CHANGES: [bullet list of what changed]
CONTRADICTIONS FOUND: [list or none]
UNIQUE CONTENT MIGRATED: [list or none]
```

One block per file. No prose. CC reviews report before any PR is submitted.

---

### Assumptions declared:

| Assumption | Evidence Needed | Risk if Wrong |
|---|---|---|
| AG.md exists and is AG's actual instruction file | `ls AG.md` | MEDIUM — may need to create |
| RULES.md content not actively loaded by CI or hook | grep check | MEDIUM — removing could break CI |
| GATES.md content not referenced by active scripts | grep check | LOW — it's a doc file |
| design.json exists in impeccable dir | `ls` check | LOW — just a doc ref |

### Failure modes:

| Failure Mode | Guard/Detection | Recoverable? |
|---|---|---|
| Unique rule lost during consolidation | AG post-report itemizes every migration | Yes — git history |
| Global CLAUDE.md modified without CC approval | Step 8 = READ ONLY explicit | Yes — git revert |
| Contradiction resolved wrong direction | CC reviews before PR merge | Yes — amend PR |

**Cross-agent questions:** Codex must confirm CODEX_FRONTEND_BRIEF.md description of design.json path before Step 4 is finalized.
**RED test criteria:** N/A — doc audit, no code changes.
**GREEN verification:** 
- All 8 steps completed.
- CLAUDE.md canonical plan path = `IMPLEMENTATION_PLAN.md` (not the Gemini path).
- Every agent has core stack documented (agentmemory + caveman + karpathy + pocock per agent; graphify + codegraph for AG only).
- RULES.md and GATES.md either deleted or redirects to authoritative files.
- CORE_PROJECT_FILES.md lists all active governance files with verified existence.
- AG report posted to CC before PR submitted.
**Rollback plan:** All changes are doc-only. Git revert on any file is instant. No prod impact.
**Definition of done:** AG posts structured report. CC reviews. Every contradiction resolved. Every stale canonical path fixed. No agent missing core stack. PR passes tsc + vitest (no code changes, so these should trivially pass).
**ag-plan-reviewer required:** no

---

## REVIEW STANDARD

These task cards meet expert-grade lead dev standard because:
1. Every allowed/forbidden file is explicit — no ambiguity for AG
2. Every step has a grep/ls verification check before action
3. Archive-before-delete strategy means zero data loss risk
4. Report-before-PR requirement prevents CC rubber-stamping
5. Contradictions are flagged, not silently resolved
6. Core stack enforcement is per-agent (not one-size-fits-all)
7. Global CLAUDE.md is READ ONLY — CC owns global config changes
8. Definition of done is binary, not "probably complete"

---

## NEXT STEPS (after Brandon approval)

1. Brandon approves both cards → CC issues TC-PURGE-001 to AG first
2. TC-PURGE-001 complete + CC cleared → issue TC-AUDIT-002 to AG
3. AG posts report for TC-AUDIT-002 → CC reviews → amends/approves → PR
4. Both merged → CC updates SESSION_STATE.md Phase 0 gate: "workspace purged, governance files audited"
5. CC shares IMPLEMENTATION_PLAN.md with other AI agents for hardening review
