import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords } from '@/lib/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { verifyFieldSession } from '@/lib/fieldAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    // 8 weeks back
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 56);

    const records = await db
      .select()
      .from(timeRecords)
      .where(
        and(
          eq(timeRecords.techId, session.badge),
          gte(timeRecords.clockIn, cutoff)
        )
      )
      .orderBy(desc(timeRecords.clockIn));

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error('[hours] error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
