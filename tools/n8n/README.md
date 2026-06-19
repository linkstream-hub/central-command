# n8n Workflow Version Control — PTOW ADW

n8n workflows are source-controlled here. `workflows/` is the single source of truth.
Any workflow change made in the n8n UI must be exported and committed before the sprint closes.

---

## Directory Layout

```
tools/n8n/
  export.py              — exports all workflows from Railway n8n to workflows/
  import.py              — imports workflows/ back into n8n (disaster recovery)
  workflows/
    MANIFEST.json        — index: workflow names, IDs, active state, export timestamp
    *.json               — one file per workflow (filename = slugified workflow name)
```

---

## Exporting (after any n8n UI change)

**Step 1 — Get credentials:**
- URL: Railway dashboard → your n8n service → Settings → Domains
- API key: n8n UI → Settings → n8n API → Create an API key (if not already created)

**Step 2 — Run the exporter:**
```powershell
# From repo root
$env:N8N_URL    = "https://your-n8n.railway.app"
$env:N8N_API_KEY = "your-api-key"
python tools/n8n/export.py
```

Or inline:
```powershell
python tools/n8n/export.py --url https://your-n8n.railway.app --api-key YOUR_KEY
```

**Step 3 — Commit:**
```powershell
git add tools/n8n/workflows/
git commit -m "chore: export n8n workflows — <brief description of change>"
```

**Dry run** (list workflows without saving):
```powershell
python tools/n8n/export.py --url ... --api-key ... --dry-run
```

---

## Importing (disaster recovery / new instance)

```powershell
python tools/n8n/import.py --url https://your-n8n.railway.app --api-key YOUR_KEY
```

Import a single workflow:
```powershell
python tools/n8n/import.py --url ... --api-key ... --file tools/n8n/workflows/my-workflow.json
```

After import: verify in n8n UI, then deactivate and delete old duplicates.

---

## Workflow Inventory

> Run `python tools/n8n/export.py --dry-run` to list live workflows.
> After first export, MANIFEST.json will contain the full index.

| Workflow | Purpose | Active |
|---|---|---|
| (export pending — see MANIFEST.json after first run) | | |

---

## Rules

1. **Workflow change = export + commit in same sprint.** No exceptions.
2. **MANIFEST.json is auto-generated.** Never edit it by hand.
3. **Import creates new copies.** After disaster recovery, deactivate old workflows in the UI.
4. **API key is a secret.** Never commit it. Use env vars or Railway secrets only.

---

## Enabling the n8n REST API

If the export script returns a 404 on `/api/v1/workflows`, the REST API may not be enabled.

In n8n UI: Settings → n8n API → toggle on → copy the API key.

Requires n8n >= 0.122.0 (Railway instances are current by default).
