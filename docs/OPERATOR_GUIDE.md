# APT FSM — OPERATOR GUIDE
# For Brandon. Plain English. No coding knowledge required.
# This is your playbook for working with Claude to build APT FSM like a professional team.
# Last Updated: S137 (2026-06-04)

---

## THE 30-SECOND VERSION

**Your job:** Describe WHAT you want and WHY. Approve or reject plans. Type secrets into web dashboards.
**Claude's job:** Figure out HOW. Write the code. Run the tests. Deploy.
**You never:** Run terminal commands. Merge PRs. Manually edit code files.

---

## 1. SESSION START PROTOCOL

When you open a new Claude Code session, type exactly this:

```
/ptow-prime
```

Wait for Claude to confirm it has the context, then give your instruction.

**If `/ptow-prime` fails, type:**
> "Read SESSION_STATE.md and docs/CAPABILITIES_REGISTER.md, then confirm current project state."

Claude will be fully briefed within 2–3 responses.

---

## 2. HOW TO REQUEST WORK

**The golden rule: describe outcomes, not methods.**

### GOOD requests (outcome-focused):
- "I need tenants to automatically receive an email asking for access when a job comes in that requires permission to enter."
- "I need techs to receive an SMS the moment I click Lock and Send."
- "I need to see who changed each job's status and when."
- "I need jobs that haven't moved in 24 hours to trigger an alert to the dispatcher."

### BAD requests (method-focused — Claude decides these):
- ~~"Add a sendTenantContact function to Code.js"~~
- ~~"Create an n8n webhook that fires on POST requests"~~
- ~~"Refactor the auth middleware"~~

### Use this template for every request:

```
Feature request:

WHAT I NEED: [outcome in plain English]
WHO IS AFFECTED: [tenant / tech / dispatcher / PM company / owner]
WHY IT MATTERS: [problem it solves or risk it eliminates]
CONSTRAINTS: [anything Claude should not change]
PHASE: [which roadmap phase — see docs/ROADMAP.md]
```

**Example:**
```
Feature request:

WHAT I NEED: When a job comes in where the tenant hasn't given permission to enter, an email
should automatically be sent to the tenant asking for access confirmation.
WHO IS AFFECTED: Tenants (receive email), dispatcher (fewer manual follow-ups)
WHY IT MATTERS: Jobs are sitting in PTE Required with zero outreach. Blocks scheduling.
CONSTRAINTS: Do not change the existing auto-reply that goes to the property manager.
PHASE: Phase 1
```

Claude produces a plan, you review it, you say SHIP IT. Then Claude executes.

---

## 3. HOW TO READ A PLAN

Before writing any code, Claude produces a numbered task list. Review it and say SHIP or BLOCK.

### Green lights ✅
- Task list matches what you asked for — nothing extra, nothing missing
- There is a test that proves it works
- Last 3 tasks are: tsc clean → diff review → test sprint → merge

### Red flags 🚩 — ask Claude to clarify:
- Plan touches auth, login, or session handling → "Does this change how anyone logs in?"
- Plan touches database schema → "Are you changing existing tables or just adding?"
- Plan touches Google Sheets column order → "Are you changing the column structure?"
- Plan involves the same action writing to multiple systems → "What's the rollback if one fails?"
- Scope is larger than what you asked for → "Only do what I asked — don't add extra."

### Hard blocks ⛔ — do not approve:
- Any task assigned to you other than "type X into Vercel/Railway/GCP dashboard"
- Any plan that says "merge immediately" without a review step
- Any plan touching the production Lock and Send path without a staging test first

**To approve:** Say "SHIP IT"
**To block:** Describe your concern. Claude revises and resubmits.

---

## 4. APPROVAL GATES

These are things Claude will always stop and ask about. Do not skip them.

| What | Why You Must Approve |
|------|----------------------|
| Any content going to a customer (tenant, PM, tech) | You are the brand. AI-generated customer emails need your sign-off. |
| Changes to payment flows | Any Stripe or billing configuration |
| New external vendor integrations | Adding any API or service that costs money |
| Data deletion or database schema migration | Cannot be undone |
| Changes to auto-reply email templates | You were burned before: 3 unwanted emails sent to Lapham client |
| New recurring infrastructure costs | Railway, Vercel, Neon, n8n charges |

---

## 5. WARNING SIGNS CLAUDE IS DRIFTING

| Warning Sign | What It Means | What to Say |
|-------------|--------------|-------------|
| Long response explaining what it just built | Narrating instead of working | "Skip the recap. What's the next task?" |
| Suggests building something you didn't ask for | Scope creep | "Stop. Only do what I asked. Save that idea for later." |
| Lists 5 options and asks which one | Analysis paralysis | "Pick the best one and execute it." |
| Third iteration of the same error | Stuck in a debug loop | "Stop. Root cause in one sentence, then fix it once." |
| Researching something basic from scratch | Re-deriving known context | "Check AgentMemory first. If it's not there, research it, but save it before proceeding." |
| Writing docs or refactoring when you asked for a feature | Wrong priority | "Build the feature first. Polish later." |
| 500-word response with headers and bullets but no code | Consulting mode, not building | "Less talk, more code. What are you doing right now?" |

---

## 6. YOUR COMPLETE TECHNICAL ROLE

There are exactly two things that require your physical involvement:

### Typing secrets into web dashboards (you are the account holder)

| Where | What to enter | When |
|-------|--------------|------|
| Vercel → Project → Environment Variables | API keys, webhook URLs, DB connections | When Claude says "add X to Vercel env vars" |
| Railway → Service → Variables | n8n env vars | When setting up new n8n workflows |
| n8n UI (your Railway instance) | Workflow creation, credential setup | When building new n8n workflows |
| Google Cloud Console (brandon@ account) | OAuth credentials | Rare — only for auth changes |
| GCP Apps Script console | Script Properties | When Claude says "update Script Properties" |

### Decision-making
- Approve plans before code is written
- Say SHIP IT or BLOCK
- Decide whether to proceed to the next roadmap phase

**That is your complete technical role.**

---

## 7. EMERGENCY STOP

If Claude is doing something wrong, destructive, or not what you asked:

**Type immediately:**
> `STOP. Do not proceed. Tell me what you just did and what you were about to do next.`

Claude halts, summarizes, and waits for your direction.

**Signs you need an emergency stop:**
- Claude mentions deleting files, dropping tables, or force-pushing to main
- Claude is about to send something to a customer you didn't approve
- Claude is looping and burning tokens without progress
- Something unexpected happened (a deploy went out, an email was sent)

After an emergency stop, verify system state before giving any new instruction.

---

## 8. THE ROADMAP RULE

Before approving any work, ask: **does this advance the current phase?**

We are in **Phase 1**. See `docs/ROADMAP.md` for the 5 tasks. Until those are done and 10 real jobs are dispatched, we do not build Phase 2 things.

If Claude proposes something that sounds like Phase 3 or 4, say:
> "That's not Phase 1. Add it to the backlog. What's next on Phase 1?"

The sequence is locked. A working system at lower fidelity beats a fancy system nobody has used.

---

## 9. GLOSSARY

| Term | Plain English |
|------|--------------|
| GAS / Apps Script | Google code that reads your emails and creates jobs |
| Neon | The database where all jobs are stored |
| AG / Antigravity | The AI coding tool that writes most of the code |
| Claude Code | This — the AI you're talking to right now |
| n8n | The automation platform (on Railway) for SMS, emails, follow-ups |
| Vercel | Where dispatch.aptmaintenanceinc.com lives |
| Railway | Where n8n lives |
| PWA | The tech mobile app (browser-based, feels like an app) |
| Lock and Send | The button that assigns all techs and triggers SMS |
| PTE | Permission to Enter — tenant's approval for a tech to enter the unit |
| Playwright | Automated tests that check the app after every code change |
| main branch | The live codebase — merges here deploy to production automatically |
| feat/ branch | A safe copy of the code where new features are built before going live |
