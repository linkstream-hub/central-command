# ANTIGRAVITY SPEC — WORKSPACE REORGANIZATION
**Sprint type:** File moves + deletes only. Zero code changes.
**Base commit:** current HEAD

---

## OBJECTIVE

Clean up root and tech-pwa directories. Move spec/doc files into organized subfolders. Delete empty and stale folders/files. Do not touch any .gs, .js, or .ts source files.

---

## PART 1 — ROOT DIRECTORY

### Move to `specs/` (folder already exists)

```
Move-Item "ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md"       "specs/"
Move-Item "ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md"    "specs/"
Move-Item "ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md" "specs/"
Move-Item "ANTIGRAVITY_SESSION50_SPEC.md"              "specs/"
Move-Item "ANTIGRAVITY_SESSION52_SPEC.md"              "specs/"
Move-Item "CLAW_ARMY_PHASE1_SPEC.md"                   "specs/"
Move-Item "PLAYGROUND_CONTEXT.md"                      "specs/"
Move-Item "TECH_PWA_API_SPEC.md"                       "specs/"
Move-Item "TIER 1 SPEC — SESSION 50 SPRINT.txt"        "specs/"
```

### Create `docs/` and move reference documents

```
New-Item -ItemType Directory "docs"
Move-Item "APT_COMPLIANCE_HR_BLUEPRINT.md"       "docs/"
Move-Item "APT_STRATEGIC_INTEGRATION_ROADMAP.md" "docs/"
Move-Item "CENTRAL_COMMAND_EXPANSION_ROADMAP.md" "docs/"
Move-Item "CLAW_CODE_CC_INTEGRATION.md"          "docs/"
Move-Item "DESIGN_REFERENCE_ANCHORS.md"          "docs/"
Move-Item "DISPATCH_GUIDE.md"                    "docs/"
Move-Item "SESSION_GUIDE.md"                     "docs/"
```

### Move old HTML prototypes to `scratch/`

```
Move-Item "APT_Dispatch_Dashboard.html"  "scratch/"
Move-Item "Dispatch_Walkthrough.html"    "scratch/"
```

### Delete empty folders

```
Remove-Item "bolt"          -Recurse -Force
Remove-Item "n8n"           -Recurse -Force
Remove-Item "n8n-workflows" -Recurse -Force
```

---

## PART 2 — TECH-PWA DIRECTORY

### Delete stale files

```
Remove-Item "tech-pwa/lint_errors.txt"     -Force
Remove-Item "tech-pwa/AGENTS.md"           -Force
```

### Delete empty stray folder

```
Remove-Item "tech-pwa/tech-pwa" -Recurse -Force
```

---

## DO NOT TOUCH

- Any `.gs`, `.js`, `.ts`, `.tsx` files
- `CLAUDE.md`, `WORKFLOW.md`, `README.md`
- `.clasp.json`, `.claspignore`, `appsscript.json`
- `dashboard-api/`, `flowise-flows/`, `railway/`, `Sentinels/`
- `tech-pwa/src/`, `tech-pwa/public/`, `tech-pwa/tests/`
- `artifacts/` (either location)

---

## COMPLETION

1. [ ] All moves completed — verify with `Get-ChildItem` on root and confirm spec/doc files are gone from root
2. [ ] `specs/` contains all 9 moved files
3. [ ] `docs/` contains all 7 moved files
4. [ ] Empty folders deleted
5. [ ] `tech-pwa/lint_errors.txt` and `tech-pwa/tech-pwa/` deleted
6. [ ] Run `git status` — confirm only moves/deletes, zero source file changes
7. [ ] Report: "Reorganization complete. Git status clean. No source files touched."
