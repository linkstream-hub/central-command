# SPRINT: ADW FLAG Gate + Hook Suite
**Branch:** `feat/adw-flag-gate-and-hooks`
**Closes:** Two Foundation Milestone gaps — FLAG email gate + Round 2 course items

---

## GOAL

Close the two remaining ADW gaps in one sprint:

1. **FLAG→email gate** — When `/review-diff` returns `VERDICT: FLAG`, `ptow_adw.py` currently halts silently. This sprint wires it to send a notification email via n8n so Brandon gets the diff context and resume command in his inbox.

2. **Hook suite + agents + commands** — Four new hooks, three agent definitions, three slash commands from the IndyDevDan Round 2 course material. Zero schema/Next.js/GAS changes.

---

## SCOPE — EXACT FILE LIST

**Modify:**
- `tools/orchestrator/ptow_adw.py`
- `.claude/settings.json`
- `.gitignore`

**Create (hooks):**
- `.claude/hooks/dangerous_command_blocker.py`
- `.claude/hooks/universal_hook_logger.py`
- `.claude/hooks/pre_compact.py`
- `.claude/hooks/subagent_stop.py`

**Create (agents):**
- `.claude/agents/diff-reviewer.md`
- `.claude/agents/ag-plan-reviewer.md`
- `.claude/agents/meta-agent.md`

**Create (commands):**
- `.claude/commands/load_bundle.md`
- `.claude/commands/background.md`
- `.claude/commands/scout.md`

**Create (n8n):**
- `tools/n8n/workflows/flag-gate.json` (exported after building in n8n UI)

**No other files.** Any change outside this list requires a STOP and flag to Claude Code.

---

## CONTRADICTION DETECTOR — RUN BEFORE TASK 1

Read each file listed in "Modify" above. Cross-check all string literals you plan to change against the live content. Flag any mismatch to Claude Code before writing a single line of code.

---

## TASK LIST

### Task 1 — Branch setup
```
git branch --show-current  → paste: ______  (must be feat/adw-flag-gate-and-hooks)
git ls-remote --heads origin feat/adw-flag-gate-and-hooks  → paste: ______
git log main..HEAD --oneline  → paste: ______
```
If branch doesn't exist: `git checkout -b feat/adw-flag-gate-and-hooks`.
If remote doesn't exist: `git push -u origin feat/adw-flag-gate-and-hooks`.

---

### Task 2 — ptow_adw.py: add `_notify_flag_gate()` function

Add this function after `extract_block_reason()` (before `run_review()`). Use only stdlib — no `requests`.

```python
def _notify_flag_gate(spec_path: Path, pr_number: Optional[int], review_excerpt: str) -> None:
    """POST FLAG context to n8n which emails Brandon. Gracefully skips if URL not set."""
    url = os.getenv("N8N_FLAG_GATE_WEBHOOK_URL")
    if not url:
        log("WARNING: N8N_FLAG_GATE_WEBHOOK_URL not set — FLAG email notification skipped")
        return

    resume_parts = [
        f"python tools/orchestrator/ptow_adw.py {spec_path.name}",
        "--skip-implement",
        "--override-flag",
    ]
    if pr_number:
        resume_parts.append(f"--pr {pr_number}")
    resume_command = " ".join(resume_parts)

    payload = {
        "pr_number": pr_number or 0,
        "spec": spec_path.name,
        "review_excerpt": review_excerpt,
        "timestamp": datetime.utcnow().isoformat(),
        "resume_command": resume_command,
    }

    try:
        import json as _json
        import urllib.request as _req
        data = _json.dumps(payload).encode()
        request = _req.Request(url, data=data, headers={"Content-Type": "application/json"})
        _req.urlopen(request, timeout=10)
        log("FLAG notification sent to n8n — email dispatched to Brandon")
    except Exception as exc:
        log(f"WARNING: FLAG notification failed ({exc}) — halting pipeline regardless")
```

`datetime` is already imported. `Optional` and `Path` are already imported.

---

### Task 3 — ptow_adw.py: `--override-flag` arg + FLAG branch update

**3a — Add arg** in `main()` after `--heavy`:
```python
parser.add_argument("--override-flag", action="store_true",
                    help="Bypass diff-review FLAG verdict after manual approval (use with --skip-implement)")
```

**3b — Update Phase 2 block** (around line 439). Add `args.override_flag` to the skip condition:
```python
if not (args.skip_review or args.override_flag or state.is_phase_complete("review")):
```
And update the skipped banner to show why:
```python
else:
    skipped_reason = " (override-flag — manual approval)" if args.override_flag else ""
    banner(f"2 / 5  DIFF REVIEW — skipped{skipped_reason}")
```

**3c — Update FLAG branch** in `run_review()` (around line 303). Replace the current FLAG block:
```python
elif verdict == "FLAG":
    return False, (
        "Review returned FLAG — gates need human judgment before proceeding.\n\n"
        + output[-3000:]
    )
```
with:
```python
elif verdict == "FLAG":
    _notify_flag_gate(
        spec_path=Path(args.spec) if hasattr(args, "spec") else Path("unknown.md"),
        pr_number=getattr(args, "pr", None),
        review_excerpt=output[-3000:],
    )
    return False, (
        "VERDICT: FLAG — notification email sent to Brandon.\n"
        "After reviewing the diff, resume the pipeline with:\n"
        "  python tools/orchestrator/ptow_adw.py <spec> --skip-implement --override-flag [--pr N]\n\n"
        + output[-3000:]
    )
```

**Problem:** `run_review()` does not currently have access to `args`. Fix this by passing the needed values in. Change `run_review()` signature to:
```python
def run_review(branch: Optional[str], label: str, spec_path: Optional[Path] = None, pr_number: Optional[int] = None) -> Tuple[bool, str]:
```
And the two call sites in `main()` to:
```python
passed, result = run_review(branch, "diff review (/review-diff)", spec_path=spec_path, pr_number=args.pr)
```
(Both Phase 2 and Phase 4 calls get the same update.)

---

### Task 4 — n8n FLAG Gate workflow (build in n8n UI)

Open the n8n UI (Railway). Create a new workflow named **"FLAG Gate Notification"**.

**Node 1 — Webhook trigger:**
- Type: Webhook
- Name: "Receive FLAG Gate"
- HTTP Method: POST
- Path: `flag-gate`
- Response Mode: "Using 'Respond to Webhook' node"

**Node 2 — Send email (Resend node):**
- Type: Resend (use existing Resend credential from CA Break Compliance Monitor)
- Name: "Send FLAG Email"
- From: `ADW Orchestrator <onboarding@resend.dev>` (or existing verified sender)
- To: Brandon's email (use the address already in your Resend credential setup)
- Subject: `⚑ FLAG Review Required — PR #{{ $json.body.pr_number }} — {{ $json.body.spec }}`
- Email Format: Text
- Body:
```
ADW Orchestrator — DIFF REVIEW RETURNED FLAG
============================================

PR #: {{ $json.body.pr_number }}
Spec: {{ $json.body.spec }}
Time: {{ $json.body.timestamp }}

The automated diff review requires human judgment before proceeding.

--- REVIEW EXCERPT ---
{{ $json.body.review_excerpt }}

--- NEXT STEPS ---
1. Review the full diff on GitHub PR #{{ $json.body.pr_number }}
2. If the diff is acceptable, tell AG to run:

   {{ $json.body.resume_command }}

3. If the diff should be blocked, tell AG to address the review findings first.
```

**Node 3 — Respond to Webhook:**
- Type: Respond to Webhook
- Response Code: 200
- Response Body: `{"status":"notified"}`

Wire: Webhook → Resend → Respond to Webhook. Activate workflow.

Test: use curl or n8n's test trigger with sample payload:
```json
{
  "pr_number": 999,
  "spec": "test-spec.md",
  "review_excerpt": "Test excerpt",
  "timestamp": "2026-01-01T00:00:00",
  "resume_command": "python tools/orchestrator/ptow_adw.py test-spec.md --skip-implement --override-flag --pr 999"
}
```
Confirm email arrives. Paste n8n execution ID here: `______`

---

### Task 5 — Export FLAG gate workflow

```powershell
python tools/n8n/export.py --url $env:N8N_URL --api-key $env:N8N_API_KEY
```
Verify `tools/n8n/workflows/flag-gate.json` was created (or updated if name differs).

Stage and commit:
```
git add tools/n8n/workflows/
git commit -m "feat(adw): add FLAG gate notification workflow — n8n export"
```

---

### Task 6 — `.claude/hooks/dangerous_command_blocker.py`

Copy the source from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\building-specialized-agents\.claude\hooks\dangerous_command_blocker.py`

**PTOW adaptations (make these changes to the copy before writing):**

1. Replace the shebang line:
   - From: `#!/usr/bin/env uv run`
   - To: `#!/usr/bin/env python3`
   - Remove the `# /// script` block (lines 2–5) entirely.

2. Add PowerShell destructive patterns to `DANGEROUS_PATTERNS` after the existing list:
```python
# PowerShell Remove-Item dangerous patterns
r'Remove-Item\s+.*-Recurse\s+.*-Force\s+[/\\]',  # Remove-Item -Recurse -Force /
r'Remove-Item\s+.*-Force\s+.*-Recurse\s+[/\\]',
r'Remove-Item\s+.*-Recurse.*-Force.*\*\s*$',       # wildcard + force
r'Remove-Item\s+.*-rf\b',                          # short alias
```

3. Add PTOW critical paths to `CRITICAL_PATHS`:
```python
'A:/PTOW',
'A:\\PTOW',
str(Path(__file__).parent.parent.parent),  # REPO_ROOT
```

Write to `.claude/hooks/dangerous_command_blocker.py`.

---

### Task 7 — `.claude/hooks/universal_hook_logger.py`

Copy verbatim from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\elite-context-engineering\.claude\hooks\universal_hook_logger.py`

Replace shebang: `#!/usr/bin/env uv run` → `#!/usr/bin/env python3`. Remove the `# /// script` block.

Write to `.claude/hooks/universal_hook_logger.py`.

---

### Task 8 — `.claude/hooks/pre_compact.py`

Copy from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\multi-agent-orchestration\.claude\hooks\pre_compact.py`

Replace shebang: `#!/usr/bin/env -S uv run --script` → `#!/usr/bin/env python3`. Remove the `# /// script` block (lines 2–7, including `python-dotenv` dependency).

The `dotenv` import is wrapped in `try/except` so removing the dependency block is safe.

Write to `.claude/hooks/pre_compact.py`.

---

### Task 9 — `.claude/hooks/subagent_stop.py`

Copy from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\multi-agent-orchestration\.claude\hooks\subagent_stop.py`

Replace shebang: `#!/usr/bin/env -S uv run --script` → `#!/usr/bin/env python3`. Remove the `# /// script` block.

**PTOW adaptations:**
- The TTS functionality (`announce_subagent_completion`) requires ElevenLabs/OpenAI/pyttsx3. We don't have those. Keep the function body but it will silently no-op since `get_tts_script_path()` returns `None` when no TTS scripts exist. No changes needed — existing guard handles it.
- Default behavior (no `--notify` flag): just logs completion. That's what we want.

Write to `.claude/hooks/subagent_stop.py`.

---

### Task 10 — `.claude/settings.json`: add new hook registrations

Read the current `.claude/settings.json` fully before editing.

Make these changes:

**1 — PreToolUse: add `dangerous_command_blocker.py` alongside existing `pre_tool_use.py`**

Current:
```json
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre_tool_use.py\"",
        "timeout": 5
      }
    ]
  }
]
```

Replace with:
```json
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre_tool_use.py\"",
        "timeout": 5
      },
      {
        "type": "command",
        "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/dangerous_command_blocker.py\"",
        "timeout": 5
      }
    ]
  }
]
```

**2 — UserPromptSubmit: add `universal_hook_logger.py` as a third hook**

Add to the existing `UserPromptSubmit` hooks array:
```json
{
  "type": "command",
  "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/universal_hook_logger.py\"",
  "timeout": 5
}
```

**3 — Stop: add `universal_hook_logger.py` after the existing worktree cleanup hook**

Add to the existing `Stop` hooks array:
```json
{
  "type": "command",
  "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/universal_hook_logger.py\"",
  "timeout": 5
}
```

**4 — Add `PreCompact` section (new top-level key in `hooks`)**

```json
"PreCompact": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/pre_compact.py\"",
        "timeout": 5
      }
    ]
  }
]
```

**5 — Add `SubagentStop` section (new top-level key in `hooks`)**

```json
"SubagentStop": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/subagent_stop.py\"",
        "timeout": 5
      }
    ]
  }
]
```

Validate JSON is well-formed before committing (`python -c "import json; json.load(open('.claude/settings.json'))"`).

---

### Task 11 — `.claude/agents/diff-reviewer.md`

Create this file exactly:

```markdown
---
name: diff-reviewer
description: Use proactively when an AG diff needs review and you want to isolate the review in a sub-agent context to protect the main conversation window. Reads artifacts/ag_diff.txt and returns a structured VERDICT line.
tools: Read, Bash
model: sonnet
color: blue
---

# Purpose

You are PTOW's diff gate reviewer. You read the AG diff artifact and run the `/review-diff` gate, returning a clean VERDICT.

## Instructions

1. Read `artifacts/ag_diff.txt`. Summarize the scope: file count, key changes, areas touched.
2. Run `/review-diff` to apply the 17-gate check defined in `.claude/commands/review-diff.md`.
3. Parse the output for the `VERDICT:` line.
4. Report your findings concisely.

## Report

End your response with exactly one of:
```
VERDICT: PASS
VERDICT: BLOCK — [one-line reason]
VERDICT: FLAG — [one-line reason]
```
```

---

### Task 12 — `.claude/agents/ag-plan-reviewer.md`

Create this file exactly:

```markdown
---
name: ag-plan-reviewer
description: Use proactively when AG posts a plan before implementation. Checks the plan for the four PTOW gate categories — auth, schema, columns, cross-system — and returns a structured PASS or BLOCK verdict before AG writes a single line of code.
tools: Read, Grep, Glob
model: sonnet
color: orange
---

# Purpose

You are PTOW's plan safety reviewer. You receive AG's proposed plan and check it against the four categories that Claude Code gates on. Your job is to catch risks before implementation begins, not after.

## The Four Gate Categories

- **AUTH** — Any change to auth hooks, session storage, token handling, or next-auth config
- **SCHEMA** — Any Neon schema change: new table, column added/removed/renamed, index, migration file
- **COLUMNS** — Any Google Sheets column index change or new column reference in GAS code
- **CROSS-SYSTEM** — Any single action that writes to Next.js + GAS + Neon in the same flow

## Instructions

1. Read the plan text provided in the prompt.
2. For each gate category, scan for triggers. Be conservative — if ambiguous, FLAG it.
3. Report each category as CLEAR or FLAGGED with a specific quote or line reference.
4. If any category is FLAGGED without prior Claude Code approval, verdict is BLOCK.

## Report

```
AUTH:         CLEAR | FLAGGED — [detail]
SCHEMA:       CLEAR | FLAGGED — [detail]
COLUMNS:      CLEAR | FLAGGED — [detail]
CROSS-SYSTEM: CLEAR | FLAGGED — [detail]

VERDICT: PASS | BLOCK
```
If BLOCK, state exactly what needs Claude Code sign-off before AG proceeds.
```

---

### Task 13 — `.claude/agents/meta-agent.md`

Copy from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\elite-context-engineering\.claude\agents\meta-agent.md`

**PTOW adaptation:** Replace the `tools` frontmatter field. The original references `mcp__firecrawl-mcp__*` tools which are not available in PTOW. Replace:
```
tools: Write, WebFetch, mcp__firecrawl-mcp__firecrawl_scrape, mcp__firecrawl-mcp__firecrawl_search, MultiEdit
```
with:
```
tools: Write, WebFetch, WebSearch
```

All other content: copy verbatim.

Write to `.claude/agents/meta-agent.md`.

---

### Task 14 — `.claude/commands/load_bundle.md`

Copy verbatim from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\elite-context-engineering\.claude\commands\load_bundle.md`

No PTOW adaptations needed. Write to `.claude/commands/load_bundle.md`.

---

### Task 15 — `.claude/commands/background.md`

Copy verbatim from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\elite-context-engineering\.claude\commands\background.md`

No adaptations. Write to `.claude/commands/background.md`.

---

### Task 16 — `.claude/commands/scout.md`

Copy from:
`F:\New Courses\IndyDevDan – Tactical Agentic Coding – Agentic Engineer + Principled AI Coding\Tactical Coding\3. Code & Materials\multi-agent-orchestration\.claude\commands\scout.md`

**Prerequisite:** Verify `gemini` CLI is authenticated before starting this task:
```powershell
gemini --version
gemini -p "say hi" --model gemini-2.5-flash
```
If the second command fails with an auth error, run `gemini auth` and complete the Google sign-in flow before continuing.

**PTOW adaptations — opencode and codex are not installed. Replace the agent dispatch list** in the Workflow section with the following (gemini + haiku, 4 agents at default scale):

```markdown
- Write a prompt for `SCALE` number of agents to the Task tool in parallel:
  - `gemini -p "[prompt]" --model gemini-2.5-flash` (count >= 1)
  - `claude -p "[prompt]" --model claude-haiku-4-5-20251001` (count >= 2)
  - `gemini -p "[prompt]" --model gemini-2.5-flash-lite` (count >= 3)
  - `claude -p "[prompt]" --model claude-haiku-4-5-20251001` (count >= 4)
  - Default SCALE is 4
  - Set a 3-minute timeout per agent bash call. Skip any that don't return in time.
```

Do **not** change the `model` frontmatter field — that controls the orchestrating agent, not the subagents.

All other content (instructions, report format, output file path, deduplication logic): copy verbatim.

Write to `.claude/commands/scout.md`.

---

### Task 17 — `.gitignore`: add new ignored directories

Append after the existing `agents/context_bundles/` line:
```
agents/hook_logs/
agents/security_logs/
agents/scout_files/
logs/
```

---

### Task 18 — Compile + push + diff (WAIT FOR PASS)

```powershell
npx tsc --noEmit
```
Zero errors required. Fix any before continuing.

```powershell
git push origin HEAD
git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore: update diff artifact"
git push origin HEAD
```

Post diff artifact to Claude Code. **Stop. Wait for PASS.**

---

### Task 19 — Test sprint (separate session, WAIT FOR CLEAR-TO-MERGE)

Run these verifications and record exact evidence for each:

**T1 — Hook files exist:**
```powershell
Get-Item .claude/hooks/dangerous_command_blocker.py, .claude/hooks/universal_hook_logger.py, .claude/hooks/pre_compact.py, .claude/hooks/subagent_stop.py
```
Paste output: `______`

**T2 — settings.json is valid JSON and contains all new hooks:**
```powershell
python -c "import json; s=json.load(open('.claude/settings.json')); print('PreCompact:', 'PreCompact' in s['hooks']); print('SubagentStop:', 'SubagentStop' in s['hooks']); print('blocker:', any('dangerous_command_blocker' in str(h) for h in s['hooks'].get('PreToolUse',[])[0].get('hooks',[])))"
```
Paste output: `______` (must show True for all three)

**T3 — dangerous_command_blocker blocks a test pattern:**
```powershell
echo '{"tool_name":"Bash","tool_input":{"command":"rm -rf /"},"session_id":"test"}' | python .claude/hooks/dangerous_command_blocker.py
echo "Exit code: $LASTEXITCODE"
```
Paste output: `______` (exit code must be 2)

**T4 — universal_hook_logger runs without error:**
```powershell
echo '{"hook_event_name":"TestEvent","session_id":"test-session-123"}' | python .claude/hooks/universal_hook_logger.py
echo "Exit code: $LASTEXITCODE"
Get-Content agents/hook_logs/test-session-123/TestEvent.jsonl
```
Paste output: `______` (exit code 0, JSONL entry visible)

**T5 — Agent files exist:**
```powershell
Get-Item .claude/agents/diff-reviewer.md, .claude/agents/ag-plan-reviewer.md, .claude/agents/meta-agent.md
```
Paste output: `______`

**T6 — Command files exist:**
```powershell
Get-Item .claude/commands/load_bundle.md, .claude/commands/background.md, .claude/commands/scout.md
```
Paste output: `______`

**T7 — n8n workflow file exists:**
```powershell
Get-Item tools/n8n/workflows/flag-gate.json
(Get-Content tools/n8n/workflows/flag-gate.json | ConvertFrom-Json).name
```
Paste output: `______` (file exists, name shown)

**T8 — ptow_adw.py --override-flag arg exists:**
```powershell
python tools/orchestrator/ptow_adw.py --help | Select-String "override-flag"
```
Paste output: `______` (line describing --override-flag must appear)

**T9 — ptow_adw.py FLAG branch calls _notify_flag_gate (grep verify):**
```powershell
Select-String "_notify_flag_gate" tools/orchestrator/ptow_adw.py
```
Paste output: `______` (must show at least 2 occurrences — definition + call site)

After recording all evidence in `artifacts/ag_test_results.txt`, post to Claude Code. **Stop. Wait for clear-to-merge.**

---

### Task 20 — Merge

Merge only after Claude Code issues "Clear to merge."

```powershell
gh pr merge <PR_NUMBER> --squash
```
