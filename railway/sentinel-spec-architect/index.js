/**
 * sentinel-spec-architect/index.js
 * SENTINEL: Autonomous Spec Generator
 *
 * Listens for POST /spec requests. On receipt, fetches CLAUDE.md from GitHub,
 * lists existing spec files, calls Claude to draft a full ANTIGRAVITY_*.md spec,
 * commits it to a new branch, and opens a PR for Claude Code review.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY    — Anthropic API key
 *   GITHUB_TOKEN         — PAT with repo scope
 *   GITHUB_REPO          — owner/repo (e.g. BGB-CRB-Holdings/central-command)
 *   SPEC_ARCHITECT_KEY   — shared secret that must match { key } in POST body
 *
 * Usage:
 *   curl -X POST https://[railway-url]/spec \
 *     -H "Content-Type: application/json" \
 *     -d '{"key":"[SPEC_ARCHITECT_KEY]","goal":"Add X feature to Y page"}'
 */

import http     from 'http';
import fetch    from 'node-fetch';
import Anthropic from '@anthropic-ai/sdk';

const anthropic    = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO  = process.env.GITHUB_REPO;   // "BGB-CRB-Holdings/central-command"
const SECRET_KEY   = process.env.SPEC_ARCHITECT_KEY;

if (!GITHUB_TOKEN || !GITHUB_REPO || !SECRET_KEY) {
  console.error('FATAL: GITHUB_TOKEN, GITHUB_REPO, and SPEC_ARCHITECT_KEY must be set.');
  process.exit(1);
}

// ─── GitHub helpers ───────────────────────────────────────────────────────────

async function ghGet(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'claw-spec-architect', Accept: 'application/vnd.github.v3+json' }
  });
  return res.json();
}

async function ghPost(path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method : 'POST',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'claw-spec-architect', 'Content-Type': 'application/json' },
    body   : JSON.stringify(body)
  });
  return res.json();
}

async function ghPut(path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method : 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'claw-spec-architect', 'Content-Type': 'application/json' },
    body   : JSON.stringify(body)
  });
  return res.json();
}

// ─── Context fetchers ─────────────────────────────────────────────────────────

async function fetchClaudeMd() {
  const data = await ghGet(`/repos/${GITHUB_REPO}/contents/CLAUDE.md`);
  if (!data.content) throw new Error(`Failed to fetch CLAUDE.md: ${JSON.stringify(data)}`);
  return Buffer.from(data.content, 'base64').toString('utf8');
}

async function listExistingSpecs() {
  const data = await ghGet(`/repos/${GITHUB_REPO}/git/trees/main?recursive=1`);
  return (data.tree || [])
    .filter(f => f.path && /^ANTIGRAVITY_.*\.md$/.test(f.path))
    .map(f => f.path);
}

// ─── Claude spec generation ───────────────────────────────────────────────────

async function generateSpec(goal, claudeMd, existingSpecs) {
  const systemPrompt = `You are Spec Architect, a senior technical spec writer for APT Central Command.
Your job: given a high-level product goal, write a production-grade ANTIGRAVITY_*.md spec file
that Antigravity (a fullstack AI IDE) can execute without ambiguity.

RULES:
- Specs must include: exact file paths, exact function names, exact TypeScript types, complete JSX,
  exact column indexes from DA_DQ, exact business rules, and verification steps.
- Never use vague language like "update this function" — always quote the exact code to find and replace.
- Match the depth of existing specs (see CLAUDE.md and spec list for context).
- Use the established patterns: glassmorphism dark UI, Framer Motion animations, skeleton loaders,
  toast notifications, role-based access, DashboardAPI.gs backend pattern.
- Never add columns to Google Sheets in the spec — flag them as "Claude Code adds these manually."
- Start the file with the standard header: # ANTIGRAVITY_[NAME]_SPEC.md / # [Title] / # Sprint [N] | Spec author: Spec Architect | Date: [today]`;

  const userMessage = `CLAUDE.md (system context):
---
${claudeMd.substring(0, 20000)}
---

EXISTING SPEC FILES (do not duplicate what is already covered):
${existingSpecs.join('\n')}

HIGH-LEVEL GOAL:
${goal}

Write the complete ANTIGRAVITY spec file for this goal. Be exhaustive — every detail Antigravity
needs to implement this without asking questions.`;

  const response = await anthropic.messages.create({
    model      : 'claude-opus-4-7',
    max_tokens : 8000,
    system     : systemPrompt,
    messages   : [{ role: 'user', content: userMessage }]
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ─── GitHub PR creation ───────────────────────────────────────────────────────

async function createPR(specContent, goal) {
  const branchName = 'spec/' + Date.now();
  const specTitle  = goal.substring(0, 40).replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toUpperCase();
  const fileName   = `ANTIGRAVITY_${specTitle}_SPEC.md`;

  // Get main branch SHA
  const refData = await ghGet(`/repos/${GITHUB_REPO}/git/ref/heads/main`);
  const sha     = refData.object.sha;

  // Create branch
  await ghPost(`/repos/${GITHUB_REPO}/git/refs`, { ref: `refs/heads/${branchName}`, sha });

  // Commit spec file
  await ghPut(`/repos/${GITHUB_REPO}/contents/${fileName}`, {
    message : `feat(spec): [Spec Architect] ${fileName}`,
    content : Buffer.from(specContent).toString('base64'),
    branch  : branchName
  });

  // Open PR
  const prData = await ghPost(`/repos/${GITHUB_REPO}/pulls`, {
    title: `[SPEC ARCHITECT] ${fileName}`,
    body : `## Spec Architect Output\n\n**Goal:** ${goal}\n\n**File:** \`${fileName}\`\n\n**Review instructions:**\n- Check all file paths exist\n- Verify column indexes match DA_DQ/DA_TR maps\n- Confirm business logic matches operational requirements\n- Approve if ready for AG execution\n\n🤖 Generated by Spec Architect Sentinel`,
    head : branchName,
    base : 'main'
  });

  return prData.html_url;
}

// ─── HTTP server ──────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/spec') {
    res.writeHead(404).end();
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body);

      if (payload.key !== SECRET_KEY) {
        res.writeHead(401).end(JSON.stringify({ error: 'UNAUTHORIZED' }));
        return;
      }

      const { goal } = payload;
      if (!goal) {
        res.writeHead(400).end(JSON.stringify({ error: 'MISSING_GOAL' }));
        return;
      }

      // Respond immediately — generation is async
      res.writeHead(202).end(JSON.stringify({ status: 'GENERATING', message: 'Spec generation started. PR will be opened when complete.' }));

      (async () => {
        try {
          console.log(`[SPEC-ARCHITECT] Generating spec for: ${goal}`);
          const claudeMd      = await fetchClaudeMd();
          const existingSpecs = await listExistingSpecs();
          const specContent   = await generateSpec(goal, claudeMd, existingSpecs);
          const prUrl         = await createPR(specContent, goal);
          console.log(`[SPEC-ARCHITECT] PR opened: ${prUrl}`);
        } catch (err) {
          console.error('[SPEC-ARCHITECT] Generation error:', err.message);
        }
      })();

    } catch (err) {
      res.writeHead(400).end(JSON.stringify({ error: 'INVALID_JSON' }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[sentinel-spec-architect] Listening on port ${PORT}. POST /spec to generate a spec.`);
});
