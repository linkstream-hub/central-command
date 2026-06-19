import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { commsMessages } from '@/lib/schema';
import { eq, and, isNull, count } from 'drizzle-orm';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = await db
      .select({
        jobId: commsMessages.jobId,
        unreadCount: count(),
      })
      .from(commsMessages)
      .where(
        and(
          eq(commsMessages.direction, 'inbound'),
          eq(commsMessages.stakeholder, 'TENANT'),
          isNull(commsMessages.readAt)
        )
      )
      .groupBy(commsMessages.jobId);
    
    const counts = results.reduce((acc, curr) => {
      acc[curr.jobId] = Number(curr.unreadCount);
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({ success: true, counts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
