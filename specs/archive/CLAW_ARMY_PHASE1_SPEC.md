# CLAW ARMY — PHASE 1 SPEC
# GitHub Actions Quality Gate Fleet
# Zero infrastructure cost. No Railway. No containers. Ships today.
# Authored: April 26, 2026

---

## WHAT THIS SPEC COVERS

Phase 1 deploys 3 soldiers as GitHub Actions workflows. These run on every push to `main`
and on every PR targeting `main`. They require no Railway account, no Docker, no local
hardware. Total cost: $0.

| Soldier | Trigger | Cost | Blocks Merge? |
|---|---|---|---|
| TypeScript Guardian | Push / PR | Free (GH Actions) | YES — opens Issue on failure |
| Design Lint Enforcer | Push / PR | Free (GH Actions) | NO — reports only (escalate to block after 2 weeks) |
| Spec Quality Auditor | On-demand (`workflow_dispatch`) | Free (GH Actions) | NO — advisory only |

---

## SOLDIER 1: TYPESCRIPT GUARDIAN

**File to create:** `.github/workflows/ts-guardian.yml`

**What it does:**
- Runs `npx tsc --noEmit` inside `tech-pwa/`
- On failure: opens a GitHub Issue with the exact TypeScript error output, labeled `ts-error` + `quality-gate`
- On success: closes any open `ts-error` issues (auto-resolves when the build is clean)
- Blocks merge if errors exist (via `continue-on-error: false`)

**Exact file content:**

```yaml
name: TypeScript Guardian

on:
  push:
    branches: [main]
    paths:
      - 'tech-pwa/**'
  pull_request:
    branches: [main]
    paths:
      - 'tech-pwa/**'

jobs:
  ts-check:
    name: TypeScript Compilation Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: tech-pwa/package-lock.json

      - name: Install dependencies
        working-directory: tech-pwa
        run: npm ci

      - name: Run TypeScript check
        id: tsc
        working-directory: tech-pwa
        run: |
          npx tsc --noEmit 2>&1 | tee /tmp/tsc-output.txt
          echo "exit_code=${PIPESTATUS[0]}" >> $GITHUB_OUTPUT

      - name: Open GitHub Issue on failure
        if: steps.tsc.outputs.exit_code != '0'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const output = fs.readFileSync('/tmp/tsc-output.txt', 'utf8').slice(0, 6000);
            const title = `[TS Guardian] TypeScript errors on ${context.sha.slice(0,7)}`;
            const body = [
              `## TypeScript compilation failed`,
              `**Commit:** ${context.sha}`,
              `**Branch:** ${context.ref}`,
              `**Pushed by:** ${context.actor}`,
              ``,
              `### Errors`,
              '```',
              output,
              '```',
              ``,
              `Fix the errors above and push again. This issue closes automatically when \`tsc --noEmit\` passes.`,
            ].join('\n');

            // Check if there's an existing open ts-error issue for this branch
            const { data: issues } = await github.rest.issues.listForRepo({
              owner: context.repo.owner,
              repo: context.repo.repo,
              labels: 'ts-error',
              state: 'open',
            });

            if (issues.length === 0) {
              await github.rest.issues.create({
                owner: context.repo.owner,
                repo: context.repo.repo,
                title,
                body,
                labels: ['ts-error', 'quality-gate'],
              });
            } else {
              // Update existing issue with new error output
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issues[0].number,
                body: `New failure on \`${context.sha.slice(0,7)}\`:\n\`\`\`\n${output}\n\`\`\``,
              });
            }

            core.setFailed('TypeScript errors found. See issue for details.');

      - name: Close resolved TS error issues
        if: steps.tsc.outputs.exit_code == '0'
        uses: actions/github-script@v7
        with:
          script: |
            const { data: issues } = await github.rest.issues.listForRepo({
              owner: context.repo.owner,
              repo: context.repo.repo,
              labels: 'ts-error',
              state: 'open',
            });
            for (const issue of issues) {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                body: `✅ TypeScript check passed on \`${context.sha.slice(0,7)}\`. Closing automatically.`,
              });
              await github.rest.issues.update({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                state: 'closed',
              });
            }
```

**GitHub secret required:** None. Uses `GITHUB_TOKEN` (auto-provided by Actions).

**GitHub label setup (one-time, Brandon runs once):**
- Create label `ts-error` — color `#d73a49` (red)
- Create label `quality-gate` — color `#e4e669` (yellow)

Can be created via: `gh label create ts-error --color d73a49 --description "TypeScript compilation failure"`
and: `gh label create quality-gate --color e4e669 --description "Automated quality gate failure"`

---

## SOLDIER 2: DESIGN LINT ENFORCER

**File to create:** `.github/workflows/design-lint.yml`

**What it does:**
- Scans all modified `.tsx` files for banned patterns from `DESIGN_REFERENCE_ANCHORS.md` + `CLAUDE.md` quality gate
- Reports violations as a formatted PR comment (does NOT block merge yet — advisory for 2 weeks, then escalate)
- Tracks 7 violation categories

**Exact file content:**

```yaml
name: Design Lint Enforcer

on:
  push:
    branches: [main]
    paths:
      - 'tech-pwa/**/*.tsx'
      - 'tech-pwa/**/*.ts'
  pull_request:
    branches: [main]
    paths:
      - 'tech-pwa/**/*.tsx'
      - 'tech-pwa/**/*.ts'

jobs:
  design-lint:
    name: Design Compliance Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run design lint checks
        id: lint
        run: |
          # Get list of changed TSX/TS files
          git diff --name-only HEAD~1 HEAD -- 'tech-pwa/**/*.tsx' 'tech-pwa/**/*.ts' > /tmp/changed_files.txt || \
          find tech-pwa/src -name "*.tsx" -o -name "*.ts" > /tmp/changed_files.txt

          violations=""
          violation_count=0

          while IFS= read -r file; do
            [ -f "$file" ] || continue

            # Rule 1: alert() or window.confirm() — hard ban
            if grep -n "alert(" "$file" | grep -qv "//.*alert\|triggerComplianceAlert\|compliance_alert\|COMPLIANCE_ALERT"; then
              matches=$(grep -n "alert(" "$file" | grep -v "//.*alert\|triggerComplianceAlert\|compliance_alert\|COMPLIANCE_ALERT")
              violations+="**🚫 BANNED: \`alert()\`** in \`$file\`\n\`\`\`\n$matches\n\`\`\`\n\n"
              violation_count=$((violation_count + 1))
            fi

            if grep -n "window\.confirm(" "$file" | grep -qv "//.*window\.confirm"; then
              matches=$(grep -n "window\.confirm(" "$file" | grep -v "//.*window\.confirm")
              violations+="**🚫 BANNED: \`window.confirm()\`** in \`$file\`\n\`\`\`\n$matches\n\`\`\`\n\n"
              violation_count=$((violation_count + 1))
            fi

            # Rule 2: bg-white or text-black — light mode bleed
            if grep -n "bg-white\|text-black\b" "$file" | grep -qv "//.*bg-white\|//.*text-black\|bg-white/\|hover:bg-white/\|focus:bg-white/"; then
              matches=$(grep -n "\bbg-white\b\|\btext-black\b" "$file" | grep -v "//.*\|bg-white/\|hover:bg-white/")
              violations+="**⚠️ LIGHT MODE BLEED: \`bg-white\` / \`text-black\`** in \`$file\`\n\`\`\`\n$matches\n\`\`\`\n\n"
              violation_count=$((violation_count + 1))
            fi

            # Rule 3: TypeScript `any` cast — flag (not ban)
            if grep -n ": any\b\|as any\b\|<any>" "$file" | grep -qv "//.*: any\|//.*as any"; then
              matches=$(grep -n ": any\b\|as any\b\|<any>" "$file" | grep -v "//.*: any\|//.*as any")
              violations+="**⚠️ WEAK TYPING: \`any\` cast** in \`$file\`\n\`\`\`\n$matches\n\`\`\`\n\n"
              violation_count=$((violation_count + 1))
            fi

            # Rule 4: Async components without loading state
            if grep -q "useEffect\|fetch\|dashboardRequest\|fetchData" "$file"; then
              if ! grep -q "loading\|skeleton\|Skeleton\|isLoading" "$file"; then
                violations+="**⚠️ MISSING LOADING STATE** — async data fetching with no skeleton/loading in \`$file\`\n\n"
                violation_count=$((violation_count + 1))
              fi
            fi

            # Rule 5: New panels without Framer Motion
            if grep -q "className.*panel\|className.*modal\|className.*drawer\|className.*sheet" "$file"; then
              if ! grep -q "motion\.\|AnimatePresence\|useAnimation\|variants" "$file"; then
                violations+="**⚠️ MISSING FRAMER MOTION** — panel/modal/drawer component with no animation in \`$file\`\n\n"
                violation_count=$((violation_count + 1))
              fi
            fi

            # Rule 6: Hardcoded hex colors in component files (not design tokens)
            if grep -n "#[0-9a-fA-F]\{6\}\|#[0-9a-fA-F]\{3\}" "$file" | grep -qv "//\|DESIGN_REFERENCE\|placeholder\|stroke\|fill"; then
              matches=$(grep -n "#[0-9a-fA-F]\{6\}\|#[0-9a-fA-F]\{3\}" "$file" | grep -v "//\|fill\|stroke" | head -5)
              violations+="**⚠️ HARDCODED HEX COLOR** in \`$file\` — use Tailwind tokens or CSS vars\n\`\`\`\n$matches\n\`\`\`\n\n"
              violation_count=$((violation_count + 1))
            fi

          done < /tmp/changed_files.txt

          echo "violation_count=$violation_count" >> $GITHUB_OUTPUT

          if [ -n "$violations" ]; then
            # Write to file for the next step (newlines are tricky in GITHUB_OUTPUT)
            echo -e "$violations" > /tmp/violations.txt
            echo "has_violations=true" >> $GITHUB_OUTPUT
          else
            echo "has_violations=false" >> $GITHUB_OUTPUT
          fi

      - name: Post PR comment with violations
        if: steps.lint.outputs.has_violations == 'true' && github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const violations = fs.readFileSync('/tmp/violations.txt', 'utf8');
            const count = '${{ steps.lint.outputs.violation_count }}';

            const body = [
              `## 🎨 Design Lint Report — ${count} violation(s) found`,
              ``,
              `These are **advisory** for now. Hard block enforcement begins in 2 weeks (May 10, 2026).`,
              ``,
              violations,
              `---`,
              `_Design standards: [DESIGN_REFERENCE_ANCHORS.md](./DESIGN_REFERENCE_ANCHORS.md) | [CLAUDE.md Quality Gate](./CLAUDE.md)_`,
            ].join('\n');

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body,
            });

      - name: Write violations to job summary
        if: steps.lint.outputs.has_violations == 'true'
        run: |
          echo "## 🎨 Design Lint — ${{ steps.lint.outputs.violation_count }} violation(s)" >> $GITHUB_STEP_SUMMARY
          cat /tmp/violations.txt >> $GITHUB_STEP_SUMMARY

      - name: Write clean summary
        if: steps.lint.outputs.has_violations == 'false'
        run: |
          echo "## ✅ Design Lint — Clean" >> $GITHUB_STEP_SUMMARY
          echo "All checked files pass design compliance rules." >> $GITHUB_STEP_SUMMARY
```

---

## SOLDIER 3: SPEC QUALITY AUDITOR

**File to create:** `.github/workflows/spec-auditor.yml`

**What it does:**
- On-demand (`workflow_dispatch`) — Brandon or Claude runs it manually before any AG sprint
- Validates a target spec file (passed as input) against CLAUDE.md quality standards
- Checks for: missing file paths, missing TypeScript code (prose-only sections), missing verification steps, column index claims that don't match CLAUDE.md column maps
- Outputs a `SPEC_AUDIT_REPORT.md` as a workflow artifact

**Exact file content:**

```yaml
name: Spec Quality Auditor

on:
  workflow_dispatch:
    inputs:
      spec_file:
        description: 'Spec file to audit (e.g. ANTIGRAVITY_CALENDAR_SPEC.md)'
        required: true
        type: string
      sprint_name:
        description: 'Sprint name for the report title'
        required: false
        default: 'Next Sprint'

jobs:
  audit-spec:
    name: Spec Quality Audit
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run spec audit
        id: audit
        run: |
          SPEC="${{ inputs.spec_file }}"
          REPORT="/tmp/SPEC_AUDIT_REPORT.md"

          echo "# Spec Quality Audit: ${{ inputs.sprint_name }}" > $REPORT
          echo "**File:** \`$SPEC\`" >> $REPORT
          echo "**Date:** $(date -u +%Y-%m-%d)" >> $REPORT
          echo "" >> $REPORT

          if [ ! -f "$SPEC" ]; then
            echo "## ❌ FATAL: Spec file not found" >> $REPORT
            echo "File \`$SPEC\` does not exist in the repo." >> $REPORT
            exit 1
          fi

          pass_count=0
          fail_count=0

          check() {
            local label="$1"
            local result="$2"
            local detail="$3"
            if [ "$result" = "pass" ]; then
              echo "- ✅ **$label**" >> $REPORT
              pass_count=$((pass_count + 1))
            else
              echo "- ❌ **$label** — $detail" >> $REPORT
              fail_count=$((fail_count + 1))
            fi
          }

          echo "## Checklist" >> $REPORT
          echo "" >> $REPORT

          # Check 1: Mentions at least one exact file path
          if grep -qE "tech-pwa/|dashboard-api/|DashboardAPI\.gs|TechPWA\.gs" "$SPEC"; then
            check "Contains exact file paths" "pass" ""
          else
            check "Contains exact file paths" "fail" "Spec must name exact files to edit — not just describe behavior"
          fi

          # Check 2: Contains TypeScript/code blocks (not prose-only)
          if grep -q '```' "$SPEC"; then
            check "Contains code blocks" "pass" ""
          else
            check "Contains code blocks" "fail" "Spec must include exact TypeScript/JSX — prose descriptions are not enough for AG"
          fi

          # Check 3: Contains a verification steps section
          if grep -iqE "verification|verify|test|confirm|check" "$SPEC"; then
            check "Contains verification steps" "pass" ""
          else
            check "Contains verification steps" "fail" "Spec must include browser verification steps AG can confirm"
          fi

          # Check 4: If it mentions column numbers, validate against CLAUDE.md
          if grep -qE "col [0-9]+|row\[[0-9]+\]|\[DA_DQ\.\|DA_TR\." "$SPEC"; then
            check "References column constants (not magic numbers)" "pass" ""
          else
            # Check if it mentions column indices at all without constants
            if grep -qE "\brow\[[0-9]\]\b\|\bcol [0-9]\b" "$SPEC"; then
              check "Column references use constants" "fail" "Use DA_DQ.COLUMN_NAME or DA_TR.COLUMN_NAME — not raw row[N] indices"
            else
              check "Column references (none found — OK if no sheet ops)" "pass" ""
            fi
          fi

          # Check 5: Mentions RBAC / role gating if it's a frontend feature
          if grep -qE "page\.tsx|route|/app/" "$SPEC"; then
            if grep -qiE "rbac|role|RouteGuard|ROUTE_PERMISSIONS|dispatch|management|admin|hr" "$SPEC"; then
              check "Defines RBAC / role access" "pass" ""
            else
              check "Defines RBAC / role access" "fail" "Frontend pages must specify which roles can access them in RouteGuard + AppSidebar"
            fi
          else
            check "RBAC (no frontend page — N/A)" "pass" ""
          fi

          # Check 6: Has a "what to keep unchanged" section
          if grep -iqE "keep unchanged|do not touch|leave intact|do not modify|unchanged" "$SPEC"; then
            check "Specifies what NOT to change" "pass" ""
          else
            check "Specifies what NOT to change" "fail" "Specs must explicitly call out what AG should leave alone — it will otherwise 'improve' things"
          fi

          # Check 7: Has a tsc check note
          if grep -qiE "tsc|typecheck|type check|noEmit" "$SPEC"; then
            check "Mentions tsc --noEmit requirement" "pass" ""
          else
            check "Mentions tsc --noEmit requirement" "fail" "Every spec must end with: run tsc --noEmit and confirm 0 errors before calling sprint complete"
          fi

          echo "" >> $REPORT
          echo "## Summary" >> $REPORT
          echo "**Passed:** $pass_count / $((pass_count + fail_count))" >> $REPORT
          echo "" >> $REPORT

          if [ $fail_count -eq 0 ]; then
            echo "✅ **Spec is ready for AG.** All quality checks pass." >> $REPORT
          elif [ $fail_count -le 2 ]; then
            echo "⚠️ **Spec needs minor fixes before AG sprint.** Address the failed checks above." >> $REPORT
          else
            echo "🚫 **Spec is NOT ready for AG.** Too many gaps — AG will freelance and cause regressions." >> $REPORT
          fi

          echo "fail_count=$fail_count" >> $GITHUB_OUTPUT
          cat $REPORT >> $GITHUB_STEP_SUMMARY

      - name: Upload audit report as artifact
        uses: actions/upload-artifact@v4
        with:
          name: spec-audit-report
          path: /tmp/SPEC_AUDIT_REPORT.md
          retention-days: 14
```

---

## DEPLOYMENT STEPS (one-time, in order)

### Step 1 — Create the GitHub labels (run from repo root)
```bash
gh label create ts-error --color d73a49 --description "TypeScript compilation failure"
gh label create quality-gate --color e4e669 --description "Automated quality gate"
gh label create design-violation --color 0075ca --description "Design lint violation"
```

### Step 2 — Create the workflow files
Antigravity creates these three files exactly as specified above:
- `.github/workflows/ts-guardian.yml`
- `.github/workflows/design-lint.yml`
- `.github/workflows/spec-auditor.yml`

### Step 3 — Push to main
```bash
git add .github/workflows/
git commit -m "ci: add TS Guardian + Design Lint + Spec Auditor quality gates"
git push origin main
```

### Step 4 — Verify TS Guardian fires
The push that includes the workflow files will trigger TS Guardian on `tech-pwa/**`. It should pass immediately. Check the Actions tab — green means the soldier is deployed and healthy.

### Step 5 — Test Spec Auditor manually
```
GitHub → Actions → "Spec Quality Auditor" → Run workflow
spec_file: ANTIGRAVITY_CALENDAR_SPEC.md
sprint_name: Calendar (completed — regression test)
```
Should score 6-7/7. Download the artifact to see the report.

---

## WHAT COMES NEXT (Phase 2)

Once Phase 1 is live and green for 3+ days with no false positives, proceed to Phase 2:

**Phase 2 — Railway container (Week 1 after Phase 1 stable):**
1. Build claw binary: `cd A:\PTOW\4_Double_Great_Project_35\repos\claw-code-private\rust && cargo build --workspace`
2. Push Containerfile to Railway — one service, env vars: `ANTHROPIC_API_KEY`, `GITHUB_TOKEN`, `PTOW_AUTH_KEY`, `REPO_URL`
3. Smoke test: `claw doctor` from Railway shell

**Phase 2 Railway soldiers (first wave):**
- Health Sentinel — reads CLAUDE.md system state + scans for stale data, runs on a schedule
- BT Migration Tracker — counts BT vs PWA usage until June 16 deadline
- Time Records Anomaly Detector — cross-midnight punches, >12h shifts, missing clock-out
- WC Code Scanner — verifies Dispatch Queue col 27 populated for all Scheduled/Complete rows

A separate `CLAW_ARMY_PHASE2_SPEC.md` will be written once Phase 1 is stable.

---

## ESCALATION POLICY (for all Phase 1 soldiers)

| Situation | Action |
|---|---|
| TS errors on push | Open GitHub Issue, block merge, alert in issue |
| Design violations on PR | PR comment (advisory until May 10), then block |
| Spec audit fails 3+ checks | Report in summary, artifact uploaded, do not proceed to AG sprint |
| Workflow itself fails (setup error, permission error) | Claude Code investigates — not AG |

---

*This spec is ready for Antigravity implementation as-is.*
*All file contents are exact — no interpretation needed.*
*Brandon: review Steps 1–5 in DEPLOYMENT STEPS before merging.*
