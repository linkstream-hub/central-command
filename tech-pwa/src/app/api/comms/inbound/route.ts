import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';
import { commsMessages } from '@/lib/schema';

export async function POST(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = apiKey === process.env.DASHBOARD_API_KEY;

  if (!isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      jobId,
      messageId,
      threadId,
      fromEmail,
      toEmail,
      subject,
      bodyPreview,
      fullBody,
      sentAt
    } = body;

    if (!jobId || !messageId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await db.insert(commsMessages).values({
      jobId,
      messageId,
      threadId,
      direction: 'inbound',
      stakeholder: 'TENANT',
      fromEmail,
      toEmail,
      subject,
      bodyPreview,
      fullBody,
      sentAt: sentAt ? new Date(sentAt) : new Date(),
    }).onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('[POST /api/comms/inbound] Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
// Trigger deployment test to verify the CI root-directory fix

