#!/usr/bin/env python3
"""
n8n Workflow Exporter — PTOW ADW
Exports all workflows from the Railway n8n instance to tools/n8n/workflows/ as JSON.
Run this whenever workflows are changed in the n8n UI. Commit the results.

Usage:
    python tools/n8n/export.py --url https://your-n8n.railway.app --api-key YOUR_KEY

Or set environment variables and run without flags:
    N8N_URL=https://... N8N_API_KEY=... python tools/n8n/export.py

Output:
    tools/n8n/workflows/<slug>.json   — one file per workflow
    tools/n8n/workflows/MANIFEST.json — index of all workflows with IDs and names
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    import urllib.request
    import urllib.error
except ImportError:
    pass  # stdlib — always present

REPO_ROOT = Path(__file__).parent.parent.parent
WORKFLOWS_DIR = Path(__file__).parent / "workflows"


def slugify(name: str) -> str:
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    return slug or "workflow"


def api_get(base_url: str, api_key: str, path: str) -> dict:
    url = f"{base_url.rstrip('/')}{path}"
    req = urllib.request.Request(url, headers={"X-N8N-API-KEY": api_key, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"HTTP {e.code} on {path}: {body[:200]}")
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Connection error: {e.reason}")
        print("Check that N8N_URL is correct and the Railway instance is running.")
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description="Export all n8n workflows to JSON")
    parser.add_argument("--url", default=os.environ.get("N8N_URL", ""), help="n8n base URL")
    parser.add_argument("--api-key", default=os.environ.get("N8N_API_KEY", ""), help="n8n API key")
    parser.add_argument("--dry-run", action="store_true", help="List workflows without saving")
    args = parser.parse_args()

    if not args.url:
        print("ERROR: --url or N8N_URL required")
        print("Find the URL in Railway dashboard → your n8n service → Settings → Domains")
        sys.exit(1)
    if not args.api_key:
        print("ERROR: --api-key or N8N_API_KEY required")
        print("Find the API key in n8n UI → Settings → n8n API → Create an API key")
        sys.exit(1)

    print(f"Connecting to: {args.url}")

    # Fetch workflow list
    resp = api_get(args.url, args.api_key, "/api/v1/workflows")
    workflows = resp.get("data", [])
    print(f"Found {len(workflows)} workflow(s)")

    if not workflows:
        print("No workflows found. Verify the API key has read access.")
        sys.exit(0)

    if args.dry_run:
        for wf in workflows:
            status = "active" if wf.get("active") else "inactive"
            print(f"  [{status}] {wf['id']:>6}  {wf['name']}")
        return

    WORKFLOWS_DIR.mkdir(parents=True, exist_ok=True)

    manifest = {
        "exported_at": datetime.now(timezone.utc).isoformat(),
        "n8n_url": args.url,
        "workflows": [],
    }

    for wf in workflows:
        wf_id = wf["id"]
        wf_name = wf["name"]
        slug = slugify(wf_name)
        filename = f"{slug}.json"

        # Fetch full workflow definition
        full = api_get(args.url, args.api_key, f"/api/v1/workflows/{wf_id}")

        out_path = WORKFLOWS_DIR / filename
        out_path.write_text(json.dumps(full, indent=2, ensure_ascii=False), encoding="utf-8")

        status = "active" if wf.get("active") else "inactive"
        print(f"  [{status}] {filename}")

        manifest["workflows"].append({
            "id": wf_id,
            "name": wf_name,
            "slug": slug,
            "file": filename,
            "active": wf.get("active", False),
        })

    manifest_path = WORKFLOWS_DIR / "MANIFEST.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"\nExported {len(workflows)} workflow(s) to {WORKFLOWS_DIR.relative_to(REPO_ROOT)}/")
    print("Commit tools/n8n/workflows/ to version-control these workflows.")
    print("\nNext step:")
    print(f"  git add tools/n8n/workflows/")
    print(f"  git commit -m 'chore: export n8n workflows to version control'")


if __name__ == "__main__":
    main()
