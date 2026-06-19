import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { checkLoginRateLimit } from '@/lib/rateLimit';
import { LoginSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

function hashPin(pin: string): string {
  return crypto.createHash('sha256').update(pin).digest('hex');
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    // P-1: Zod validation
    const body = await req.json().catch(() => ({}));
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { badge, pin } = parsed.data;

    // P-0: Rate limiting
    const rateLimit = await checkLoginRateLimit(badge);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds ?? 900) },
        }
      );
    }

    const techList = await db.select().from(employees).where(eq(employees.badge, badge));
    if (techList.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid badge number or PIN.' }, { status: 401 });
    }

    const tech = techList[0];
    let isValid = false;

    if (!tech.pinHash) {
      // No pin set — allow default PIN in dev only
      if (process.env.NODE_ENV !== 'production' && pin === '1234') {
        isValid = true;
      }
    } else {
      // P-3: Only compare against the hashed pin — legacy unhashed fallback removed
      isValid = tech.pinHash === hashPin(pin);
    }

    // Dev backdoor — non-production only
    if (process.env.NODE_ENV !== 'production' && pin === '1234') {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid badge number or PIN.' }, { status: 401 });
    }

    // No rate limit reset needed — @upstash/ratelimit sliding window handles cleanup automatically

    // P-2: Generate raw token, store SHA-256 hash in Neon, return raw token to client
    const rawToken = generateSessionToken();
    const hashedToken = hashToken(rawToken);

    // P-4: 24-hour token expiry
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.update(employees)
      .set({
        sessionToken: hashedToken,
        tokenExpiry: expiresAt,
      })
      .where(eq(employees.id, tech.id));

    return NextResponse.json({
      success: true,
      token: rawToken,          // Raw token returned to client; never stored
      techId: tech.badge,
      employeeId: tech.id,
      techName: tech.name,
      role: tech.role,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Login error:', error);
    // P-5: Use 'message' key, not 'error'
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
