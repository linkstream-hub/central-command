# RUNBOOK.md — APT Central Command
# Incident response. Written for rapid diagnosis. Read when system is broken.
# Last updated: 2026-06-26

---

## QUICK REFERENCE — DASHBOARDS

| System | URL | What to check |
|---|---|---|
| Dispatch App | dispatch.aptmaintenanceinc.com | Staff login, WO panel |
| Tech Clock | clock.aptmaintenanceinc.com | Tech login, jobs |
| Vercel | vercel.com → central-command | Deployments, function logs |
| Neon | console.neon.tech | Branch health, query console |
| Sentry | sentry.io → APT Central Command | Error feed, recent events |
| Railway (n8n) | railway.app | n8n container, logs |
| GitHub Actions | github.com/linkstream-hub/central-command/actions | CI/CD runs |

---

## ROLLBACK — CC2.0 (< 5 minutes)

1. Vercel dashboard → `central-command` → **Deployments**
2. Find last successful production deployment (green checkmark)
3. Three-dot menu → **Instant Rollback**
4. Production URL reverts in ~30 seconds

---

## SCENARIO 1 — No new work orders appearing

**Symptom:** No new WOs in dashboard for >1 hour during business hours.

**Check sequence:**
1. n8n Railway container running? (`railway.app` → n8n service)
2. n8n webhook workflow active? (n8n UI → Email Intake workflow → active toggle)
3. GAS Code.js trigger running? (`script.google.com` → APT Lead Intake → Executions)
4. Neon DB connected? (`console.neon.tech` → branch health)
5. Vercel functions erroring? (Vercel → Functions → check for 500s)

**Fix path:**
- n8n down → restart Railway container
- GAS trigger stopped → manually trigger in GAS console, re-enable trigger
- DB connection failed → check Neon branch, verify DATABASE_URL in Vercel env
- After Phase 0: check Postmark dashboard instead of GAS

---

## SCENARIO 2 — Dashboard blank or 500 error

**Symptom:** Staff logs in, sees blank page or error.

**Check sequence:**
1. Vercel latest deployment → READY or ERROR?
2. Sentry → new ERROR-level events since last deploy?
3. Neon DB query latency? (console.neon.tech → query console: `SELECT 1`)
4. GAS DashboardAPI responding? (test in browser)
5. AUTH_SECRET set in Vercel env?

**Fix path:**
- Bad deploy → Instant Rollback (see above)
- DB down → check Neon, may need to wake branch
- GAS down → staff permissions fail → Phase 1 will fix permanently
- Auth misconfigured → check GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET in Vercel

---

## SCENARIO 3 — Tech can't clock in

**Symptom:** Badge + PIN rejected, or field app crashes.

**Check sequence:**
1. Vercel `/api/auth/tech/login` returning 500? (Vercel Functions logs)
2. Neon `employees` table has tech's `pin_hash`? (`SELECT badge_number, pin_hash FROM employees WHERE badge_number = 'X'`)
3. Tech session in localStorage expired or corrupt?

**Fix path:**
- 500 on login → check Vercel function logs, likely DB query issue
- No pin_hash → re-run PIN backfill script
- After Phase 0: HttpOnly cookie auth — verify cookie set correctly

---

## SCENARIO 4 — n8n unavailable

**Symptom:** Dispatch notifications not sending, email intake stopped.

1. Railway.app → n8n container → check status + logs
2. If crashed: restart container in Railway
3. Check `N8N_API_KEY` not expired (expires ~2026-07-10)
4. After restart: verify workflows re-activated (n8n auto-activates on restart if configured)

---

## SCENARIO 5 — Neon unavailable

**Symptom:** All DB operations failing (login, WO list, etc.).

1. `console.neon.tech` → check branch status
2. Neon free tier: compute may suspend after inactivity — wake it via query console
3. If branch corrupt: restore from Neon snapshot (Neon console → Branches → Restore)
4. Emergency: roll back Vercel deploy if recent migration caused corruption

---

## SCENARIO 6 — Deploy failed / bad migration

**Symptom:** Vercel shows ERROR or new bugs post-deploy.

1. Immediate: Instant Rollback via Vercel (< 5 min)
2. Identify: Sentry errors pinpoint failing code
3. If migration ran: check if rollback needed via Neon query console
4. Fix forward or rollback migration manually — see `docs/DEPLOYMENT.md`

---

## SCENARIO 7 — Auth bypass investigation

**Symptom:** Unexpected authenticated requests in non-production.

1. Check `DEV_BYPASS_AUTH` env var set in unexpected environment
2. Check `NODE_ENV` and `VERCEL_ENV` values in Vercel env
3. After Phase 1: verify dual guard (env check + DEV_BYPASS_SECRET header)
4. Sentry: check for auth-bypass-triggered actions in last 24h

---

## SCENARIO 8 — API key compromised

**Immediate action:**

1. Identify which key: `N8N_API_KEY`, `RESEND_API_KEY`, `GOOGLE_CLIENT_SECRET`
2. Revoke in provider dashboard immediately
3. Generate new key
4. Update in Vercel env vars (Settings → Environment Variables)
5. Redeploy (push empty commit or Vercel redeploy button)
6. Verify new key works in prod
7. Update `docs/ENVIRONMENT_MAP.md` rotation date
8. File GitHub issue documenting incident

---

## SCENARIO 9 — Staff login broken (GAS down)

**Current state:** GAS DashboardAPI controls staff permissions. If GAS is down, staff can't log in.

**Workaround:**
- Check GAS script.google.com → DashboardAPI project → Executions
- Redeploy GAS script if needed: `clasp deploy`
- Temporary: set `DEV_BYPASS_AUTH=true` + `VERCEL_ENV=preview` for emergency staff access (SECURITY RISK — remove immediately after)

**Permanent fix:** Phase 1 Neon staff_permissions migration eliminates GAS from auth path.

---

## SCENARIO 10 — Cloudflare Email Routing webhook failure <!-- fix/s171-field-fixes -->

**Symptom:** No new WOs from email since Cloudflare cutover; Cloudflare Worker metrics show errors.

**Route:** `POST /api/intake/email` (`tech-pwa/src/app/api/intake/email/route.ts`)

**Check sequence:**
1. Cloudflare dashboard → Email Routing → Routing rules → verify `workorder@apt-main.com` routes to Worker.
2. Cloudflare dashboard → Workers & Pages → `email-intake` → Logs / Metrics
   - `401` → token mismatch: check `EMAIL_INBOUND_TOKEN` in Vercel matches Worker secret
   - `500` → check Vercel function logs (Vercel → central-command → Functions → `/api/intake/email`)
3. `EMAIL_INBOUND_TOKEN` set in Vercel? (Settings → Environment Variables)
4. `GOOGLE_GENERATIVE_AI_API_KEY` set in Vercel? (missing key → 500 for non-Lapham emails)
5. Neon DB connected? (rule out DB issue causing fallback WO insertions)

**Fix path:**
- Token mismatch → update `EMAIL_INBOUND_TOKEN` in Vercel or Cloudflare Worker secret; redeploy
- Missing Gemini key → add `GOOGLE_GENERATIVE_AI_API_KEY` to Vercel env; redeploy
- DB failure causing fallback → treat as SCENARIO 5 (Neon unavailable)
- Cloudflare outage → n8n Gmail workflow (WF-001) is standby — re-enable in n8n UI; disable again after Cloudflare recovers

**Rollback:** Delete `src/app/api/intake/email/route.ts` + Vercel redeploy (< 2 min). Gmail route unchanged in behavior.

---

## SCENARIO 11 — Neon sequence drift (duplicate key on INSERT)

**Symptom:** `NeonDbError: duplicate key value violates unique constraint "<table>_pkey"` on a table with a serial/integer PK — despite the row not existing.

**Cause:** Sequence `last_value` is behind `MAX(id)` in the table. Happens when data is migrated to a new Neon project without syncing sequences. Root cause of how the drift originates may be unknown — fix is the same regardless.

**Confirmed instance:** 2026-06-29 — `drizzle.__drizzle_migrations_id_seq` (last_value=2, max_id=7).

**Diagnosis:**

```sql
-- Find drifted sequences
SELECT s.schemaname, s.sequencename, s.last_value, t.relname AS owned_by_table
FROM pg_sequences s
JOIN pg_class c ON c.relname = s.sequencename
  AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = s.schemaname)
LEFT JOIN pg_depend d ON d.objid = c.oid AND d.deptype = 'a'
LEFT JOIN pg_class t ON t.oid = d.refobjid
WHERE s.schemaname IN ('public', 'drizzle')
ORDER BY s.schemaname, s.sequencename;

-- Then compare last_value against actual MAX(id) for suspect tables
SELECT MAX(id) FROM <table>;
```

**Fix:**

```sql
-- Reset sequence to current max — safe, non-destructive, immediate
SELECT setval('drizzle.__drizzle_migrations_id_seq',
  (SELECT MAX(id) FROM drizzle.__drizzle_migrations));

-- General form for any table:
SELECT setval('<schema>.<seq_name>', (SELECT MAX(id) FROM <schema>.<table>));
```

**Verify:** next INSERT succeeds; no PK violation.

**Prevention:** Run sequence audit after every Neon project migration — see `docs/DEPLOYMENT.md §NEON PROJECT MIGRATION`.

---

## ESCALATION CONDITIONS

Escalate to Claude Code (file GitHub issue) when:
- Incident not resolved within 30 minutes
- Data integrity suspected
- Security breach suspected
- Multiple scenarios occurring simultaneously
- Auth system bypassed unexpectedly
