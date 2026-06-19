import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { lt, notInArray, and } from 'drizzle-orm';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key');
    const hasApiKey = apiKey === process.env.DASHBOARD_API_KEY;
    const session = await auth();

    if (!hasApiKey && !session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 21);

    const result = await db.update(jobs)
      .set({ status: 'archived' })
      .where(
        and(
          lt(jobs.timestamp, cutoff),
          notInArray(jobs.status, ['archived', 'complete'])
        )
      )
      .returning({ id: jobs.id });

    return NextResponse.json({
      success: true,
      archived: result.length
    });
  } catch (error) {
    console.error('[archive-stale] error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
