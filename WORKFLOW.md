# APT CENTRAL COMMAND — AGENT WORKFLOW
# Peer Pair model. AG does the heavy lifting. Claude Code is the safety net.
# Updated: Session 56 — all 4 shadow-write tables live; Phase B (read cutover) is next; post-merge commit rule added.

---

## THE TEAM

| Agent | Superpower | Role | Never Does |
|---|---|---|---|
| **Brandon** | Mission Commander | States outcomes. Answers blockers. Runs merges. | Implement code |
| **Claude Code** | SuperClaude — architecture, security, domain analysis | Safety checks on flagged items. Merge gate. Direct implementation for GAS-only and emergencies. | Micromanage AG's implementation choices. Write specs for everything. |
| **AG (Antigravity)** | SuperGravity + GSD — full-stack implementation, self-planning, browser testing | Plans via GSD. Builds. Tests (separate sprint). Self-audits. | Approve merges. Make architecture decisions on flagged items without consulting Claude Code. Commit to `main`. |

---

## THE WORKFLOW LOOP — EVERY FEATURE

```
1. BRANDON states the outcome (what, not how)

2. AG runs /gsd-discuss-phase → /gsd-plan-phase
   └─ Produces a GSD plan with file-level detail
   └─ Flags any item that touches: auth, schema, column indexes, cross-system writes
   └─ Posts plan summary to Claude Code with one question: "Any concerns on flagged items?"

3. CLAUDE CODE responds in one message
   └─ PASS → AG executes immediately, no further consultation needed
   └─ Concern → Claude Code names the specific item and the risk. AG adjusts that item only.

4. AG IMPLEMENT SPRINT (/gsd-execute-phase)
   └─ Commits to feature branch (feat/[feature-name]) — never main
   └─ Runs: npx tsc --noEmit (zero errors required)
   └─ Runs: git diff main...HEAD > artifacts/ag_diff.txt (MUST run AFTER final commit)  ← full branch diff, not just last commit
   └─ Runs /gsd-code-review on changed files
   └─ Posts to Brandon: "Implementation complete. tsc: zero. Diff at artifacts/ag_diff.txt. Ready for Claude Code review."

5. CLAUDE CODE DIFF REVIEW
   └─ Brandon asks: "AG says ready — anything I should know?"
   └─ Claude Code reads artifacts/ag_diff.txt + any flagged files
   └─ PASS → "Clear for test sprint"
   └─ Concern → Claude Code names exact file + line. AG fixes that item only. Rewrites diff. Re-review.

6. AG TEST SPRINT (SuperGravity /test workflow — separate session from implement)
   └─ Runs npm run dev, tests in browser
   └─ Writes artifacts/ag_test_results.txt — one line per item:
        [PASS] navigated to X, clicked Y, saw Z
        [FAIL] expected X, saw Y
        [BLOCKED] reason
   └─ Posts: "Test sprint complete. Results at artifacts/ag_test_results.txt."

7. MERGE
   └─ Brandon asks Claude Code: "Test results look good?"
   └─ Claude Code reads artifacts/ag_test_results.txt
   └─ Any FAIL → AG fix sprint → retest before merge
   └─ All PASS/BLOCKED (valid reason) → "Clear to merge"
   └─ Brandon merges to main.
   └─ Claude Code deploys: vercel deploy --prod --archive=tgz from C:\PTOW\1_APT_Central_Command
   └─ Note: GitHub auto-deploy does NOT trigger reliably — always deploy via CLI after merge.
```

---

## WHEN AG CONSULTS CLAUDE CODE

AG flags Claude Code only when the plan touches:

| Trigger | Why |
|---|---|
| Auth token patterns or session storage keys | Breaking auth = every tech locked out |
| Neon schema changes (new columns, type changes) | Irreversible without a migration |
| Google Sheets column indexes | Fixed-position map — wrong index = silent data corruption |
| Cross-system writes (Next.js + GAS + Neon in same action) | Ordering and fallback logic is non-obvious |
| New `/api/` routes that replace existing GAS action strings | DashboardAPI.gs publicActions list must stay in sync |

Everything else — UI, components, new additive routes, shadow-writes following an established pattern, bug fixes, refactors — AG executes without waiting on Claude Code.

---

## SPRINT RULES (non-negotiable)

**Implement and test are always separate sprints, separate AG sessions.**
Combined sprints = no way to verify what passed vs. what was assumed.

**The diff file covers the full branch against main.**
```
git diff main...HEAD > artifacts/ag_diff.txt
```
Not `HEAD~1`. Not a cherry-picked subset. The full picture, every time.

**AG never commits to main.**
Always `feat/[feature-name]`. Brandon runs the merge after Claude Code clears it.

**After Brandon merges, the sprint is done. AG stops.**
No additional commits after a merge. Any follow-on work goes on a new feature branch with a new plan.
Commits landing on `main` post-merge are a hard rule violation.

**tsc must be zero before the diff is written.**
A diff with type errors is not a complete implement sprint.

---

## WHAT EACH AGENT IMPLEMENTS DIRECTLY

**Claude Code implements directly (no AG needed):**
- CLAUDE.md, WORKFLOW.md, SESSION_STATE.md, memory file updates
- Emergency patches where spec authoring takes longer than the fix
- Irreversible sheet ops (triggers, bulk archive, backfill)
- 1–3 file logic fixes that don't require browser verification

**AG implements (everything else):**
- Multi-file UI sprints, visual components, animations
- Features requiring browser testing to verify
- New API routes, new Neon shadow-write paths
- Large refactors spanning many components
- Anything in `tech-pwa/`

---

## GSD COMMANDS — QUICK REFERENCE

| Command | When to use |
|---|---|
| `/gsd-discuss-phase` | Start of any non-trivial feature — gather context, surface unknowns |
| `/gsd-plan-phase` | After discuss — produce the executable plan |
| `/gsd-execute-phase` | Run the plan with wave-based parallelization |
| `/gsd-code-review` | Self-audit after implement sprint |
| `/gsd-verify-work` | Goal-backward check: did this actually achieve what was intended? |

**SuperGravity skills AG uses:**
- `/test` — browser-based verification sprint
- `/security` — security audit on changed files

**SuperClaude skills Claude Code uses:**
- `/sc:analyze` — deep codebase analysis when diagnosing issues
- `/sc:design` — architecture decisions

---

## ARTIFACTS DIRECTORY

```
artifacts/
  ag_diff.txt          ← current branch diff vs main (gitignored, overwritten each sprint)
  ag_test_results.txt  ← current sprint test results (gitignored, overwritten each sprint)
```

Both files are gitignored — ephemeral. The `artifacts/` directory itself is committed (placeholder).
Completed specs → `specs/archive/`. Never accumulate root-level planning files.

---

## ANTI-PATTERNS

| Pattern | How to catch | Fix |
|---|---|---|
| AG diff is `HEAD~1` only (not full branch) or run before final commit | Check if prior sprint changes are missing | Re-run `git diff main...HEAD > artifacts/ag_diff.txt` AFTER final commit |
| AG creates files not discussed in the plan | `git diff --name-only main...HEAD` vs plan scope | AG removes unauthorized files, explains why they were needed |
| AG builds stubs for out-of-scope features | Stub responses return wrong shapes silently | Stubs are a hard FAIL in diff review — remove them |
| AG exports production data to repo | Check for `data_exports/` or `*.json` with real records | Delete immediately, add to `.gitignore` |
| Implement and test in same sprint | Sprint report says "implemented and verified" | Separate sessions, non-negotiable |
| Claude Code asks AG to write a spec for a well-scoped task | AG has GSD and can plan | Claude Code passes, AG plans with `/gsd-plan-phase` |
| AG changes auth pattern without flagging | Look for new session storage keys or new login routes | Hard flag — Claude Code reviews before any commit |

---

## NEON MIGRATION — CURRENT STATE

Shadow-write phase complete (all 4 tables: `job_comments`, `time_records`, `techs`, `jobs`). Neon is now the primary read source for all migrated paths. GAS is being retired — no new GAS features, ever.

**Active rules:**
- All new routes read from Neon — no new GAS read paths
- No new GAS features. New functionality → Next.js API routes or n8n
- GAS remains for Google Workspace integration only (email polling delegated to n8n Phase 19)

---

## 💎 PROFESSIONAL GRADE WORKFLOW (Strict Rules)

**Rule 1: Artifact Timing**
`artifacts/ag_diff.txt` must ONLY be generated after the final commit of a sprint. If any changes are made after the diff is generated, the diff MUST be regenerated.

**Rule 2: Type Integrity**
Zero `any` types. Zero `npx tsc --noEmit` errors. No exceptions.

**Rule 3: Sprint Separation**
Never mix Implementation and Testing in the same session. Build first, merge second, test third (on a new branch/session if needed, or after merge).

**Rule 4: Write Guards**
Respect `DEV_BLOCKED_WRITES`. Only remove actions from this list when moving them to a verified internal API (like the Neon migration).

**Rule 5: Memory Compliance**
AG must check `CLAUDE.md` and `WORKFLOW.md` at the start of every session to align with current sprint rules.
