# APT CENTRAL COMMAND — SESSION GUIDE
# How to start and end every Claude Code session correctly.

---

## STARTING A SESSION

### 1. Open Claude Code from the right directory
```
A:/PTOW/1_APT_Central_Command
```
Always open from this path — not OneDrive, not any other folder.
Claude reads CLAUDE.md automatically at session start.

### 2. Orient Claude immediately
Paste this at the start of every session (edit the date and goal):

```
Today is [DATE]. Review CLAUDE.md and SESSION_GUIDE.md to orient yourself.
Current goal for this session: [what you're building today]
Confirm you understand the current system state and priority list before we begin.
```

### 3. Confirm Claude is oriented
Claude should confirm:
- Current live version (check CLAUDE.md)
- What Phase 2 items are still outstanding
- What the top priority is for this session
- Any warnings relevant to what you're about to touch

If Claude seems confused or makes claims that don't match CLAUDE.md, stop and re-orient before touching any code.

---

## DURING A SESSION

### Keep Claude on track
- If Claude proposes something not on the roadmap, ask: "Is this in the current phase? Does this match the architecture?"
- If Claude wants to refactor code you didn't ask about, push back — scope creep creates bugs
- If Claude makes a code change, ask it to confirm what function(s) it changed and why

### Before any clasp push
Always confirm with Claude:
1. What files changed?
2. What functions were added/modified/removed?
3. Any risk to live triggers or production data?
4. Does this need a new trigger setup (setupTrigger, setupAuditTrigger)?

### Critical functions — never run without intent
```
catchUpMissedEmails()     — DO NOT RUN (commented out)
resetBackfill()           — DO NOT RUN (backfill complete)
setupBackfillTrigger()    — DO NOT RUN (backfill complete)
archiveOldJobsConfirmed() — DO NOT RUN (queue reset complete March 22)
```

---

## ENDING A SESSION

### Step 1 — Deploy to production (if code changed)
```bash
clasp push --force
clasp deploy --deploymentId AKfycbwfssJ3DTOxFxNc027Ro0km4coraoY7CGPlagjP-KY3HNu84hdCRBDc9fnFfhMfktbzow --description "v## — brief description"
```
Increment the version number. Current live version is in CLAUDE.md.

### Step 2 — Update CLAUDE.md
Tell Claude:
```
Update CLAUDE.md for this session. Add to the session log (most recent first):
- List every function added, changed, or removed
- List every bug fixed
- List any decisions made or deferred
- Update "Current live version" if deployed
- Update "Current system state" if anything changed
- Update the Next Session Priority List if priorities shifted
```

### Step 3 — Commit and push to GitHub
```bash
git add -A
git commit -m "brief description of what was built"
git push origin master
```

### Step 4 — Confirm with Claude
Ask Claude to confirm:
- CLAUDE.md is updated and accurate
- Live version number is correct
- Next session priority list reflects current state
- Any deferred decisions are noted in CLAUDE.md

---

## KEY COMMANDS REFERENCE

### Deploy
```bash
# Push code to Apps Script
clasp push --force

# Publish to live URL (always use this deployment ID — not HEAD)
clasp deploy --deploymentId AKfycbwfssJ3DTOxFxNc027Ro0km4coraoY7CGPlagjP-KY3HNu84hdCRBDc9fnFfhMfktbzow --description "v60 — description here"
```

### Git
```bash
git status
git add [filename]          # prefer specific files over git add -A
git commit -m "message"
git push origin master
git log --oneline -10       # see recent commits
```

### Check live version
Open the dashboard URL and check the version number in the footer, or ask Claude to check CLAUDE.md.

---

## WHAT CLAUDE READS AUTOMATICALLY

| File | When | Contents |
|-|-|-|
| CLAUDE.md | Every session start | Full system state, architecture, roadmap, warnings |
| Memory files | Every session | User preferences, project history, feedback |

CLAUDE.md is the source of truth. If it's wrong, Claude will work from wrong assumptions.
Keep it updated at the end of every session — this is the most important maintenance task.

---

## IF SOMETHING GOES WRONG

### If a trigger breaks
- Check Apps Script dashboard → Executions for errors
- Do NOT re-run setupTrigger() without checking if one already exists (it creates duplicates)
- Run `ScriptApp.getProjectTriggers()` in Apps Script console to see active triggers

### If the dashboard goes blank / errors
- Check browser console (F12)
- Check Apps Script → Executions for server-side errors
- The deployment ID is fixed — a broken deploy doesn't affect the ID, just redeploy

### If a job is accidentally archived
- Dispatch sheet → find the row → manually change Status from "Archived" back to "Open"
- Change background color back to #111318

### If Gemini parsing stops working
- Check API key in Script Properties (Project Settings → Script Properties → GEMINI_API_KEY)
- Check Gemini model name in Code.js: const GEMINI_MODEL = "gemini-2.5-flash"

---

*Keep this file current. Update the deployment ID if it ever changes.*
*Last updated: April 7, 2026*
