import { FullConfig } from '@playwright/test';
import { seedFixtures } from './fixtures/seed';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import { Redis } from '@upstash/redis';

// Codes we can safely skip when applying migrations idempotently.
// drizzle-orm wraps NeonDbError inside DrizzleQueryError, so check both
// e.code and e.cause.code when inspecting Postgres error codes.
const SKIP_CODES = new Set(['42P07', '42701', '42P16', '42P01', '42710', '23505']);

function pgCode(e: unknown): string {
  const err = e as { code?: string; cause?: { code?: string } };
  return err.code ?? err.cause?.code ?? '';
}

function pgMessage(e: unknown): string {
  return ((e as { message?: string }).message) ?? '';
}

async function applySchemaIfNeeded() {
  const client = neon(process.env.DATABASE_URL!);
  const db = drizzle(client);

  // Fast path: all core tables exist (check the latest-added table to catch partial migrations)
  try {
    await db.execute(sql`SELECT 1 FROM employees LIMIT 1`);
    await db.execute(sql`SELECT 1 FROM shifts LIMIT 1`);
    console.log('Schema verified — skipping migration.');
    return;
  } catch (e) {
    if (pgCode(e) !== '42P01') throw e;
    console.log('Schema missing or incomplete — applying migrations...');
  }

  const migrationsDir = path.resolve(__dirname, '../drizzle');
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    const statements = content
      .split('--> statement-breakpoint')
      .map((s) => s.trim())
      .filter(Boolean);

    for (const statement of statements) {
      try {
        await db.execute(sql.raw(statement));
      } catch (e) {
        const code = pgCode(e);
        const msg = pgMessage(e);
        if (SKIP_CODES.has(code) || msg.includes('already exists')) continue;
        console.error('Migration statement failed:', statement.slice(0, 120));
        throw e;
      }
    }
  }
  console.log('Schema applied successfully.');
}

async function globalSetup(_config: FullConfig) {
  console.log('--- GLOBAL SETUP START ---');

  dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment or .env.local');
  }

  await applySchemaIfNeeded();

  // Clear Upstash rate-limit counter for badge='1' before seeding.
  // Required when a dev server (NODE_ENV=development) is reused via reuseExistingServer —
  // in that mode the NODE_ENV=test bypass in rateLimit.ts doesn't fire, so repeated
  // runs within the 15-min window accumulate against the 5-attempt limit.
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
      await redis.del('rate:login:1');
      await redis.del('rate:login:99');
      console.log('Cleared rate-limit keys for badge=1 and badge=99.');
    } catch (e) {
      console.warn('Rate-limit key clear failed (non-fatal):', (e as Error).message);
    }
  }

  await seedFixtures();

  // Pre-compile Next.js pages so first test doesn't hit cold-compilation timeout.
  // The dev server compiles on first request; without warmup, /live takes 30-60s on
  // initial access and the 15s waitForURL in loginAsAdmin times out.
  const baseURL = 'http://localhost:3010';
  try {
    await Promise.all([
      fetch(`${baseURL}/`).then(() => console.log('Warm-up: / compiled.')),
      fetch(`${baseURL}/login`).then(() => console.log('Warm-up: /login compiled.')),
      fetch(`${baseURL}/live`).then(() => console.log('Warm-up: /live compiled.')),
      fetch(`${baseURL}/schedule`).then(() => console.log('Warm-up: /schedule compiled.')),
    ]);
  } catch (e) {
    console.warn('Warm-up fetch failed (non-fatal):', (e as Error).message);
  }

  console.log('--- GLOBAL SETUP COMPLETE ---');
}

export default globalSetup;
