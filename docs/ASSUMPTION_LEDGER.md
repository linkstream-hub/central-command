# Assumption Ledger

**Rule:** No implementation proceeds with an open HIGH-risk assumption.
**Process:** Agent logs assumption → CC or second agent must confirm or reject before code merges.

| ID | Assumption | Area | Risk if Wrong | Evidence Needed | Status | Confirmed By | Proof Deadline | Escalation If Missed |
|---|---|---|---|---|---|---|---|---|
| A-001 | Staff auth does not store session tokens in localStorage | Auth | HIGH — XSS steals staff sessions | Codegraph audit of auth.ts + next-auth config | OPEN | — | Phase 1 close | CC → halt Phase 1 |
| A-002 | Gemini GOOGLE_AI_API_KEY present in all deployment contexts | Intake | HIGH — email parsing silently fails | Vercel env screenshot (key presence only, not value) | OPEN | — | Phase 1 close | CC → halt Phase 1 |
| A-003 | compliance.ts and GAS calculateMealPremiums produce identical results | Compliance/Legal | HIGH — PAGA liability if divergent | Side-by-side output comparison on last 90d shifts | OPEN — Task Card pending Brandon approval | — | Phase 0 close | CC → Brandon decision before Phase 1 |
| A-004 | @ducanh2912/next-pwa is compatible with Next.js 15.x | PWA/Build | MEDIUM — PWA breaks when Next.js pinned | Compatibility test in Phase 2 pre-work | OPEN | — | Phase 2 start | CC → use @serwist/next |
| A-005 | pushSubscriptions in Neon matches what send/route.ts expects | Push | MEDIUM — notifications silently fail | Query pushSubscriptions + trace send route | OPEN | — | Phase 3 close | CC → Task Card to fix send route |
| A-006 | Cloudflare Email Worker correctly routes to /api/intake/email | Intake | HIGH — email WOs lost silently | Send test email, verify job created in Neon | OPEN | — | Phase 1 close | CC → halt Phase 1 |

---

## Status Key
- `OPEN` — assumption not yet verified, do not ship dependent code to prod
- `CONFIRMED` — evidence provided and accepted by CC
- `REJECTED` — assumption was wrong; associated Task Card must be revised
- `ACCEPTED-RISK` — Brandon explicitly accepted the risk (document rationale)
