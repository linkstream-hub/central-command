# SPEC: P1-6 — Staging Environment (Neon Preview Branch + Vercel Preview Env)
# Eliminates the "production is the test environment" gap. Stops Neon branch auto-provisioning.
# Owner: AG (setup) + Brandon (Neon/Vercel dashboard steps) | Reviewer: Claude Code
# Branch: feat/p1-6-staging-env

---

## CONTEXT

**Current problem (session 83 root cause):** The Vercel–Neon integration auto-creates a new Neon branch for every preview deployment. On the free Neon plan (10 branch max), 8 stale preview branches accumulated and filled all capacity, breaking all preview deploys until manually cleaned up.

**Solution:** Create one permanent `preview` branch in Neon and wire it to the Vercel Preview environment as the fixed `DATABASE_URL`. Vercel preview deploys then use this branch instead of creating new ones.

**Secondary win:** Every PR gets a preview deploy connected to a real (but not production) database. Dispatchers can test features against real data before merge.

---

## RESPONSIBILITIES

| Step | Who | How |
|---|---|---|
| Create Neon `preview` branch | Brandon | Neon console (dashboard) |
| Get connection string | Brandon | Neon console — copy POOLED connection string |
| Set DATABASE_URL in Vercel Preview env | Brandon | Vercel dashboard |
| Disable Vercel–Neon auto-provisioning | Brandon | Vercel dashboard |
| Document in ARCHITECTURE.md | AG | Code |
| Verify preview deploy uses correct branch | AG | Check Vercel preview URL |

---

## TASKS

### Task 1 — Brandon: Create Neon `preview` branch (dashboard only)

1. Open console.neon.tech → your project
2. Branches → **Create branch**
3. Name it exactly: `preview`
4. Branch from: `main` (production)
5. Click Create

**Do not create this via CLI.** Dashboard only.

After creating, copy the **POOLED** connection string from:  
Neon → `preview` branch → **Connection Details** → select "Pooled connection" → copy the full `postgresql://...` string

Paste the connection string into the chat for AG to use in Task 3. Do not commit it to any file.

### Task 2 — Brandon: Disable Vercel–Neon auto-provisioning (dashboard only)

1. Vercel dashboard → `central-command` project → **Settings** → **Integrations**
2. Find the Neon integration → **Configure**
3. Look for "Create a database branch for each preview deployment" or similar toggle — **disable it**

If no such toggle exists: the auto-provisioning is controlled by the absence of a fixed `DATABASE_URL` in the Preview environment. Setting one in Task 3 overrides the auto-provisioning behavior.

### Task 3 — Brandon: Set DATABASE_URL in Vercel Preview environment (dashboard only)

1. Vercel dashboard → `central-command` project → **Settings** → **Environment Variables**
2. Find `DATABASE_URL`
3. Change the environment scope from "All Environments" to **Production only** (if not already)
4. Add a NEW entry: `DATABASE_URL` → value = the POOLED connection string from Task 1 → environment = **Preview only**
5. Save

After saving: trigger a new preview deploy by pushing any small change to a feature branch, or by redeploying the most recent PR preview from the Vercel dashboard.

### Task 4 — AG: Verify the preview deploy connects to the `preview` Neon branch

After Brandon completes Tasks 1–3, open the most recent Vercel preview URL (from any open PR or the new deploy).

Check the preview app is functional:
- Open the preview URL in a browser
- "Dev Login (Admin)" button should exist and work
- Work queue should load (even if empty — `preview` branch starts with no data)

Document in `ag_test_results.txt`:
```
Task 4: Preview deploy verification
Preview URL used: ______
Dev Login button present: ______  (expected: yes)
Work queue loads without 500 error: ______  (expected: yes)
Neon branch confirmed in use: ______
  (check: Neon console → preview branch → Monitoring → should show connection activity after page load)
```

### Task 5 — AG: Seed the Neon `preview` branch

The `preview` branch starts empty. Run the seed script against it so preview deploys show realistic data.

First, get the `preview` branch connection string from Brandon (same string used in Task 3).

Add a `.env.preview` file locally (gitignored — add to `.gitignore` if not already):
```
DATABASE_URL=<preview branch POOLED connection string from Brandon>
```

Run seed:
```
cd tech-pwa && DATABASE_URL="<preview branch connection string>" npx ts-node --project tsconfig.json -e "require('./scripts/seed.ts')"
```

Or if ts-node isn't set up:
```
cd tech-pwa && npx tsx scripts/seed.ts
```
(with DATABASE_URL set to preview branch connection string in env)

Document in `ag_test_results.txt`:
```
Task 5: Preview branch seed
Seed output: ______  (expected: "Seed complete. 42 jobs inserted.")
```

### Task 6 — AG: Update ARCHITECTURE.md

In `docs/ARCHITECTURE.md`, under the **Database — Target (Neon Postgres)** section, add:

```markdown
**Environments:**
- `main` branch — production. `DATABASE_URL` in Vercel Production env.
- `preview` branch — preview deploys. `DATABASE_URL` in Vercel Preview env. Seeded with fake data. Resets on demand.
- `dev` branch — local development. `DATABASE_URL` in `.env.local`. Neon branch limit: 10 total. Do not create more branches without deleting stale ones first.
```

Also add to the **WHAT IS WORKING** section:
```
- Staging environment: Neon `preview` branch wired to Vercel Preview env. Preview deploys use isolated database.
```

And remove (or strike through) from **OPEN SECURITY GAPS**:
```
~~Staging environment — Vercel preview + Neon staging branch. P2.~~
```

### Task 7 — AG: Update PROFESSIONAL_BASELINE.md

In `docs/PROFESSIONAL_BASELINE.md`, update the P1-6 row:
```
| ~~P1-6~~ | ~~Staging environment (already in roadmap)~~ | ~~AG~~ | ✅ DONE — Neon `preview` branch, Vercel Preview env wired, seeded session 84 |
```

Also update the Dimension 4 gap row:
```
| No staging environment | ~~**P1**~~ ✅ DONE | Neon `preview` branch wired to Vercel Preview DATABASE_URL. |
```

### Task 8 — AG: Add `.env.preview` to `.gitignore`

In `tech-pwa/.gitignore`, confirm `.env.preview` is listed. If not, add it.

```
.env.preview
```

### Task 9 — tsc + diff

```
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Post to Claude Code. Wait for PASS.

Expected: `______` (0 tsc errors)

### Task 10 (separate session) — Test sprint

Verify the full flow:

1. Push a trivial change to a test branch (e.g., a comment in any file)
2. Vercel creates a preview deploy automatically
3. Open the preview URL
4. Dev Login works
5. Work queue loads seeded jobs
6. Neon console → `preview` branch → shows connection activity (not `main` branch)
7. Neon `preview` branch count stays at 1 (no new branch auto-created)

Document in `ag_test_results.txt`:
```
Task 10: Staging environment E2E
Preview deploy URL: ______
Dev Login works: ______  (expected: yes)
Seeded jobs visible: ______  (expected: yes, ~42 jobs)
Neon branch count after deploy: ______  (expected: same as before, no new branch created)
preview branch connection activity in Neon monitoring: ______  (expected: yes)
```

Wait for clear-to-merge.

### Task 11 — Merge after "Clear to merge"

Not before.

---

## MERGE GATE

Claude Code checks:
- [ ] ARCHITECTURE.md documents Neon environment setup
- [ ] PROFESSIONAL_BASELINE.md P1-6 closed
- [ ] `.env.preview` in `.gitignore`
- [ ] No connection strings in any committed file
- [ ] Preview deploy confirmed using `preview` Neon branch (not `main`, not new auto-provisioned)
- [ ] tsc zero errors
- [ ] No Neon branch auto-provisioning visible in Neon console after a test preview deploy
