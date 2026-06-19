import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { ilike } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const address = req.nextUrl.searchParams.get('address');
    if (!address) {
      return NextResponse.json({ success: false, error: 'address required' }, { status: 400 });
    }

    const rows = await db.select({
      timestamp: jobs.timestamp,
      tech:      jobs.tech,
      category:  jobs.category,
      status:    jobs.status,
      notes:     jobs.notes,
      address:   jobs.address,
    }).from(jobs).where(
      ilike(jobs.address, `%${address}%`)
    ).limit(50);

    const matches = rows.map(r => ({
      source:   'Neon',
      date:     r.timestamp ? r.timestamp.toISOString() : '',
      tech:     r.tech || '',
      category: r.category || '',
      status:   r.status || '',
      notes:    (r.notes || '').substring(0, 200),
    })).sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({
      success: true, source: 'neon',
      address, total: matches.length, matches,
    });
  } catch (error) {
    console.error('[GET /api/jobs/history] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
