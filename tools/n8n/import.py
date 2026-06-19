#!/usr/bin/env python3
"""
n8n Workflow Importer — PTOW ADW
Imports workflows from tools/n8n/workflows/ into the Railway n8n instance.
Use to restore workflows after a Railway redeploy or to seed a new n8n instance.

Usage:
    python tools/n8n/import.py --url https://your-n8n.railway.app --api-key YOUR_KEY
    python tools/n8n/import.py --url ... --api-key ... --file tools/n8n/workflows/my-workflow.json

Or set environment variables:
    N8N_URL=https://... N8N_API_KEY=... python tools/n8n/import.py

WARNING: This creates NEW workflow copies. It does not update existing ones.
         Deactivate and delete the old versions in n8n UI after confirming imports work.
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

WORKFLOWS_DIR = Path(__file__).parent / "workflows"


def api_post(base_url: str, api_key: str, path: str, body: dict) -> dict:
    url = f"{base_url.rstrip('/')}{path}"
    data = json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "X-N8N-API-KEY": api_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode()
        print(f"HTTP {e.code}: {body_text[:300]}")
        return {}
    except urllib.error.URLError as e:
        print(f"Connection error: {e.reason}")
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description="Import n8n workflows from JSON files")
    parser.add_argument("--url", default=os.environ.get("N8N_URL", ""), help="n8n base URL")
    parser.add_argument("--api-key", default=os.environ.get("N8N_API_KEY", ""), help="n8n API key")
    parser.add_argument("--file", help="Import a single workflow file (default: all in workflows/)")
    args = parser.parse_args()

    if not args.url or not args.api_key:
        print("ERROR: --url and --api-key (or N8N_URL / N8N_API_KEY env vars) are required")
        sys.exit(1)

    if args.file:
        files = [Path(args.file)]
    else:
        files = [f for f in WORKFLOWS_DIR.glob("*.json") if f.name != "MANIFEST.json"]

    if not files:
        print(f"No workflow JSON files found in {WORKFLOWS_DIR}")
        sys.exit(0)

    print(f"Importing {len(files)} workflow(s) to {args.url}")

    for wf_path in sorted(files):
        workflow = json.loads(wf_path.read_text(encoding="utf-8"))
        # Strip IDs so n8n creates fresh copies
        workflow.pop("id", None)
        workflow.pop("versionId", None)
        result = api_post(args.url, args.api_key, "/api/v1/workflows", workflow)
        new_id = result.get("id", "unknown")
        print(f"  {wf_path.name} → id={new_id}")

    print("\nImport complete. Verify workflows in n8n UI, then deactivate/delete old versions.")


if __name__ == "__main__":
    main()
