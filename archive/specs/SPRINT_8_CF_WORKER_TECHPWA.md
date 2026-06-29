# SPRINT 8 — Cloudflare Worker: TechPWA.gs Security Proxy
**Branch:** `feat/sprint8-techpwa-worker`
**Author:** Claude Code
**Goal:** Put TechPWA.gs behind a Cloudflare Worker at `pwa-api.aptmaintenanceinc.com`. After this sprint: (1) the raw `script.google.com/...` GAS URL is never exposed to browser clients, (2) all Tech PWA traffic is rate-limited at the Cloudflare edge, (3) CORS is enforced to `aptmaintenanceinc.com` origins only.

---

## Security Gap Being Closed

TechPWA.gs is deployed as **"Execute as: Me | Who has access: Anyone"** — completely public. Anyone who opens DevTools on any APT-issued device can copy the GAS deployment URL and hammer it directly: enumerate valid badge numbers, brute-force PINs, flood clock-in/clock-out actions, or probe for unhandled errors that leak stack traces.

This is listed as security gap #1 in both `docs/ARCHITECTURE.md` and `docs/SPRINT_STANDARDS.md`.

---

## Architecture

```
Today:
  Tech PWA (browser)
    → NEXT_PUBLIC_API_URL = script.google.com/macros/s/[id]/exec   ← exposed
    → TechPWA.gs (public, unrated, full GAS URL visible in DevTools)

After sprint:
  Tech PWA (browser)
    → NEXT_PUBLIC_API_URL = https://pwa-api.aptmaintenanceinc.com  ← opaque CF URL
    → Cloudflare Worker (rate limit + CORS + proxy)
    → TechPWA.gs via TECH_PWA_GAS_URL Worker secret (never browser-visible)

  Next.js /api/exec route (server-side proxy):
    → TECH_PWA_GAS_URL env var (server-only, no NEXT_PUBLIC_)     ← already server-side
    → TechPWA.gs (unchanged)
```

**What the Worker does:**
- Rate limits per IP (Cloudflare zone rules — Brandon configures in CF dashboard)
- Enforces CORS: only `https://dispatch.aptmaintenanceinc.com` and localhost
- Blocks unknown origins with 403
- Forwards GET/POST to TechPWA.gs with `Content-Type: text/plain` (required by GAS to avoid CORS preflight)
- Times out upstream at 30s (GAS cold starts can be slow)
- Stores TechPWA GAS URL as a Worker secret — never in client bundle

**What the Worker does NOT do:**
- Auth validation (TechPWA.gs already validates session tokens internally)
- Request body inspection (handled by TechPWA.gs)
- Business logic

---

## CORS note

TechPWA.gs requires `Content-Type: text/plain` on POST requests to avoid CORS preflight — this is documented at the top of `TechPWA.gs` and enforced in `syncQueue.ts`. The Worker forwards requests with this content type unchanged, so existing behavior is preserved.

---

## Brandon's Setup (dashboard-only — no terminal)

Brandon's three jobs in this sprint require your Cloudflare account credentials — these are the only things only you can do.

**Job 1 — Deploy the Worker via Cloudflare dashboard**

AG writes the Worker code in `workers/tech-pwa-proxy/src/index.js` and commits it. Brandon deploys it via the CF dashboard (no terminal):

1. Open [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Create Worker**
2. Name it `tech-pwa-proxy`, click **Deploy**
3. Click **Edit code** → delete the placeholder → paste the full contents of `workers/tech-pwa-proxy/src/index.js` from the repo → click **Deploy**
4. Go to the Worker's **Settings → Variables → Secrets** → **Add secret**:
   - Name: `TECH_PWA_GAS_URL`
   - Value: `https://script.google.com/macros/s/AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q/exec`
   - Click **Encrypt and save**
5. Go to the Worker's **Triggers** tab → **Add route**:
   - Route: `pwa-api.aptmaintenanceinc.com/*`
   - Zone: `aptmaintenanceinc.com`
   - Click **Save**
6. Go to **DNS** tab for `aptmaintenanceinc.com` → **Add record**:
   - Type: `AAAA`, Name: `pwa-api`, IPv6 address: `100::`, Proxy status: **Proxied** (orange cloud)

**Job 2 — Rate limiting rules (after Worker is confirmed live)**

Cloudflare dashboard → `aptmaintenanceinc.com` zone → **Security → WAF → Rate Limiting Rules** → **Create rule**:

Rule 1:
- Name: `TechPWA Login Guard`
- Expression: `http.request.body contains "\"action\":\"login\""`
- Threshold: 5 requests / 1 minute / same IP
- Action: Block, duration 1 hour

Rule 2:
- Name: `TechPWA Flood Guard`
- Expression: `http.host eq "pwa-api.aptmaintenanceinc.com"`
- Threshold: 60 requests / 1 minute / same IP
- Action: Block, duration 10 minutes

**Job 3 — Vercel env vars (after Claude Code clears the diff)**

Vercel dashboard → `central-command` project → **Settings → Environment Variables**:
- Add `NEXT_PUBLIC_API_URL` = `https://pwa-api.aptmaintenanceinc.com` (check Production + Preview)
- Add `TECH_PWA_GAS_URL` = `https://script.google.com/macros/s/AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q/exec` (Production + Preview — **no** NEXT_PUBLIC_ prefix, server-only)

---

## Numbered Task List

**Task 1 — Create Worker directory**
Create directory: `workers/tech-pwa-proxy/`
Create file: `workers/tech-pwa-proxy/src/index.js` with the following content:

```javascript
const ALLOWED_ORIGINS = new Set([
  'https://dispatch.aptmaintenanceinc.com',
  'http://localhost:3000',
  'http://localhost:3010',
]);

const GAS_TIMEOUT_MS = 30000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const isAllowedOrigin = ALLOWED_ORIGINS.has(origin);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, isAllowedOrigin),
      });
    }

    if (request.method !== 'GET' && request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Block unknown origins (allow empty origin for server-to-server calls)
    if (origin && !isAllowedOrigin) {
      return new Response(JSON.stringify({ success: false, error: 'FORBIDDEN' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const gasUrl = env.TECH_PWA_GAS_URL;
    if (!gasUrl) {
      return new Response(JSON.stringify({ success: false, error: 'WORKER_MISCONFIGURED' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let gasRequest;
    if (request.method === 'GET') {
      const incoming = new URL(request.url);
      const target = new URL(gasUrl);
      incoming.searchParams.forEach((val, key) => target.searchParams.set(key, val));
      gasRequest = new Request(target.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
    } else {
      const body = await request.text();
      gasRequest = new Request(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body,
      });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GAS_TIMEOUT_MS);

    let gasResponse;
    try {
      gasResponse = await fetch(gasRequest, { signal: controller.signal });
    } catch (err) {
      clearTimeout(timer);
      const isTimeout = err.name === 'AbortError';
      return new Response(
        JSON.stringify({ success: false, error: isTimeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_ERROR' }),
        {
          status: isTimeout ? 504 : 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, isAllowedOrigin) },
        }
      );
    }
    clearTimeout(timer);

    const responseText = await gasResponse.text();
    return new Response(responseText, {
      status: gasResponse.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(origin, isAllowedOrigin),
      },
    });
  },
};

function corsHeaders(origin, isAllowed) {
  if (!isAllowed || !origin) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}
```

**Task 2 — Create wrangler.toml**
Create `workers/tech-pwa-proxy/wrangler.toml`:

```toml
name = "tech-pwa-proxy"
main = "src/index.js"
compatibility_date = "2025-01-01"

routes = [
  { pattern = "pwa-api.aptmaintenanceinc.com/*", zone_name = "aptmaintenanceinc.com" }
]
```

**Task 3 — Create package.json for the Worker**
Create `workers/tech-pwa-proxy/package.json`:

```json
{
  "name": "tech-pwa-proxy",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "deploy": "wrangler deploy",
    "dev": "wrangler dev"
  },
  "devDependencies": {
    "wrangler": "^3.0.0"
  }
}
```

**Task 4 — Update /api/exec to use server-only env var**
In `tech-pwa/src/app/api/exec/route.ts`, line 84:

Change:
```typescript
const fallbackUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
```
To:
```typescript
const fallbackUrl = process.env.TECH_PWA_GAS_URL || process.env.NEXT_PUBLIC_API_URL;
```

This makes the server-side proxy use the raw GAS URL directly (faster, no extra CF hop), while the browser client uses the CF Worker URL via `NEXT_PUBLIC_API_URL`.

**Task 5 — Update .env.local for local dev**
In `tech-pwa/.env.local`, add:
```
NEXT_PUBLIC_API_URL=https://pwa-api.aptmaintenanceinc.com
TECH_PWA_GAS_URL=https://script.google.com/macros/s/AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q/exec
```

**Note:** Local dev will still hit the CF Worker (not localhost) unless Brandon runs `wrangler dev` locally. That's acceptable — dev devices are trusted.

**Task 6 — TypeScript check and diff**
```
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

**Task 7 — Test results**
After Brandon deploys the Worker (`wrangler deploy`) and sets the DNS + secret:

`artifacts/ag_test_results.txt` must include:
1. `curl -X POST https://pwa-api.aptmaintenanceinc.com -H "Content-Type: text/plain" -d '{"action":"login","employeeId":"1","pin":"1234"}'` → show response body (success or INVALID_CREDENTIALS — both are valid; proves Worker proxied to GAS)
2. `curl -X POST https://pwa-api.aptmaintenanceinc.com -H "Content-Type: text/plain" -H "Origin: https://evil.com" -d '{"action":"login","employeeId":"1","pin":"1234"}'` → must return `{"success":false,"error":"FORBIDDEN"}` with status 403
3. `curl -X OPTIONS https://pwa-api.aptmaintenanceinc.com -H "Origin: https://dispatch.aptmaintenanceinc.com"` → show CORS headers in response
4. In a real browser at `dispatch.aptmaintenanceinc.com`: open DevTools Network tab, log in to Tech PWA, confirm requests go to `pwa-api.aptmaintenanceinc.com` (not `script.google.com`)

---

## Flags to Claude Code Before Deploy

**Flag 1 — Vercel env var change (production impact)**
Task requires adding `NEXT_PUBLIC_API_URL=https://pwa-api.aptmaintenanceinc.com` to Vercel production. This changes where the Tech PWA routes all API calls. **AG flags this to Claude Code before Brandon sets the Vercel env var.**

Claude Code must verify:
- Worker is live and responding (curl test in task 7 items 1-3 pass)
- DNS is resolving (`dig pwa-api.aptmaintenanceinc.com` shows CF edge IP)
- Only then: PASS on env var change

**Flag 2 — /api/exec route change**
Task 4 changes `NEXT_PUBLIC_API_URL` fallback in the server-side proxy. The server-side proxy should prefer `TECH_PWA_GAS_URL` (direct GAS, no CF hop) — this is correct behavior. Claude Code confirms this pattern is safe.

---

## What Does NOT Change

- TechPWA.gs code — no changes to the Apps Script backend
- The internal token validation in `validateToken()` — still runs on every action
- The CORS trick (`Content-Type: text/plain` to avoid preflight) — preserved end-to-end
- All existing PWA UI components — only the URL they call changes

---

## Rollback

If the Worker has issues:
1. In Vercel: revert `NEXT_PUBLIC_API_URL` to the raw GAS URL (Brandon)
2. System returns to current state immediately

The Worker being broken does not break the system — it's a proxy, not the backend.

---

## After This Sprint — Remaining Security Gaps

| Gap | Status After Sprint 8 |
|---|---|
| TechPWA.gs "Anyone" access | ✅ Closed — URL hidden, rate-limited at CF edge |
| Session token stored plain in Tech Roster col M | Still open |
| `NEXT_PUBLIC_DASHBOARD_API_KEY` in push/subscribe/route.ts | Still open |
| n8n + Flowise not version-controlled | Still open |
