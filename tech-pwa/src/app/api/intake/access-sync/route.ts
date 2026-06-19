import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { extractCodes, computeAccessMerge } from '@/lib/access-codes';

/**
 * POST /api/intake/access-sync
 *
 * Two-way access-info sync — merges inbound WO access info into the Neon
 * properties record without overwriting existing codes (INTAKE-04).
 *
 * Called by n8n HTTP Request node. Auth: DASHBOARD_API_KEY header.
 *
 * Request body:
 *   { addressKey: string, inboundAccessInfo: string, orgId?: string }
 *
 * Response shapes:
 *   200 { updated: true,  merged: string, newCodes: string[] }
 *   200 { updated: false, reason: 'no_new_codes' | 'property_not_found' | 'no_inbound_codes' }
 *   400 { error: 'addressKey required' }
 *   401 { error: 'Unauthorized' }
 *   500 { error: string }
 */
export async function POST(req: NextRequest) {
  // Internal API key only — this route is called by n8n, not browser sessions
  // Header name is DASHBOARD_API_KEY (not x-api-key) — matches jobs/sync and properties routes
  const apiKey = req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json() as { addressKey?: unknown; inboundAccessInfo?: unknown; orgId?: unknown };

    const { addressKey, inboundAccessInfo, orgId = 'APT-CA' } = body;

    if (!addressKey || typeof addressKey !== 'string') {
      return NextResponse.json({ error: 'addressKey required' }, { status: 400 });
    }

    const inbound = typeof inboundAccessInfo === 'string' ? inboundAccessInfo : '';
    const org = typeof orgId === 'string' ? orgId : 'APT-CA';

    // Validate inbound has at least one code before querying the DB
    const inboundCodes = extractCodes(inbound);
    if (inboundCodes.length === 0) {
      return NextResponse.json({ updated: false, reason: 'no_inbound_codes' });
    }

    // SELECT the property row — must already exist (never insert here)
    const rows = await db
      .select({ id: properties.id, accessInfo: properties.accessInfo })
      .from(properties)
      .where(and(eq(properties.addressKey, addressKey), eq(properties.orgId, org)))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ updated: false, reason: 'property_not_found' });
    }

    const existing = rows[0];
    const mergeResult = computeAccessMerge(existing.accessInfo, inbound);

    if (!mergeResult.updated) {
      return NextResponse.json({ updated: false, reason: mergeResult.reason });
    }

    // Only write when there are genuinely new codes (merge-not-replace)
    await db
      .update(properties)
      .set({ accessInfo: mergeResult.merged })
      .where(eq(properties.id, existing.id));

    return NextResponse.json({
      updated: true,
      merged: mergeResult.merged,
      newCodes: mergeResult.newCodes,
    });
  } catch (error: unknown) {
    console.error('[access-sync] error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
