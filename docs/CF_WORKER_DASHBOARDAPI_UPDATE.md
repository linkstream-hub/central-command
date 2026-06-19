# CF Worker — DashboardAPI URL Update

## Context

`api.aptmaintenanceinc.com` CF Worker currently proxies to DashboardAPI.gs directly.
Railway Sentinels call this URL for write-back actions (`logSentinelEvent`, `logComplianceAnomalies`, `logWcScanResult`, `logStaleJobAlert`).

## Change Required (Brandon — Cloudflare Dashboard)

Update the `DASHBOARD_API_URL` environment variable in the `DashboardAPI` Cloudflare Worker:

```
Old: <GAS deployment URL>
New: https://dispatch.aptmaintenanceinc.com/api/gas
```

This makes the CF Worker proxy to Vercel's `/api/gas` route. That route forwards unmigrated actions to GAS with the API key. As more actions migrate off GAS, the Worker destination stays the same (Vercel).

## Why This Is Safe

- The `/api/gas` route already exists and forwards unrecognized actions to GAS
- Migrated actions (getDispatchData, getTechList, etc.) are intercepted by `dashboard-api.ts` before reaching `/api/gas`
- Sentinel write-back actions are NOT migrated — they pass through to GAS as before
- No code changes required for this — it's a Cloudflare dashboard environment variable update

## AG Does NOT Access Cloudflare

This is a Brandon-only action. AG documents the instruction here for reference.
