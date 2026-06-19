import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { gmailSyncState, commsMessages, jobs } from '@/lib/schema';
import { eq, inArray } from 'drizzle-orm';
import { getNewMessages, getCurrentHistoryId, getThreadMessageIds } from '@/lib/gmail-client';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const emailToWatch = process.env.GMAIL_WATCH_EMAIL;
  if (!emailToWatch) {
    return NextResponse.json(
      { success: false, error: 'GMAIL_WATCH_EMAIL is not configured' },
      { status: 500 }
    );
  }

  if (process.env.NODE_ENV === 'development' && (!process.env.GMAIL_CLIENT_ID || process.env.GMAIL_CLIENT_ID === 'dummy-client-id')) {
    return NextResponse.json({
      success: true,
      message: 'Initialized sync state (Dev Mode Bypass)',
      historyId: '1000001',
    });
  }

  try {
    // 2. Load stored historyId from gmail_sync_state
    const syncState = await db
      .select()
      .from(gmailSyncState)
      .where(eq(gmailSyncState.email, emailToWatch))
      .limit(1);

    // 3. If no row exists (first run): initialize
    if (syncState.length === 0) {
      const initialHistoryId = await getCurrentHistoryId();
      await db.insert(gmailSyncState).values({
        email: emailToWatch,
        historyId: initialHistoryId,
      });
      return NextResponse.json({
        success: true,
        message: 'Initialized sync state',
        historyId: initialHistoryId,
      });
    }

    const storedHistoryId = syncState[0].historyId;

    // 4. Call getNewMessages(storedHistoryId) — get messages added since last sync
    const syncResult = await getNewMessages(storedHistoryId);
    const messages = syncResult.messages;
    const latestHistoryId = syncResult.latestHistoryId;

    let processedCount = 0;
    let skippedCount = 0;

    // 5. For each message
    for (const msg of messages) {
      // a. Skip if fromEmail contains workorder@aptmaintenanceinc.com
      if (msg.fromEmail.includes('workorder@aptmaintenanceinc.com')) {
        skippedCount++;
        continue;
      }

      // b. Look up jobId: query comms_messages where threadId = message.threadId → take jobId from first result
      const commsMatch = await db
        .select({ jobId: commsMessages.jobId })
        .from(commsMessages)
        .where(eq(commsMessages.threadId, msg.threadId))
        .limit(1);

      let resolvedJobId = commsMatch[0]?.jobId ?? null;

      // Fallback: find job by matching any thread message ID against jobs.gmailMsgId
      if (!resolvedJobId) {
        try {
          const threadMessageIds = await getThreadMessageIds(msg.threadId);
          if (threadMessageIds.length > 0) {
            const jobByGmailMsg = await db
              .select({ jobId: jobs.jobId })
              .from(jobs)
              .where(inArray(jobs.gmailMsgId, threadMessageIds))
              .limit(1);

            if (jobByGmailMsg[0]?.jobId) {
              resolvedJobId = jobByGmailMsg[0].jobId;
            }
          }
        } catch (fallbackErr) {
          console.error(`[Gmail Sync] gmailMsgId fallback failed for threadId ${msg.threadId}:`, fallbackErr);
        }
      }

      if (!resolvedJobId) {
        console.log(`[Gmail Sync] No jobId found for threadId ${msg.threadId}. Skipping message ${msg.messageId}...`);
        skippedCount++;
        continue;
      }

      // d. Insert into comms_messages: direction='inbound', stakeholder='TENANT', onConflictDoNothing on messageId
      await db
        .insert(commsMessages)
        .values({
          jobId: resolvedJobId,
          messageId: msg.messageId,
          threadId: msg.threadId,
          direction: 'inbound',
          stakeholder: 'TENANT',
          fromEmail: msg.fromEmail,
          toEmail: msg.toEmail,
          subject: msg.subject,
          bodyPreview: msg.bodyPreview,
          fullBody: msg.fullBody,
          sentAt: msg.sentAt,
        })
        .onConflictDoNothing();

      processedCount++;
    }

    // 6. Update historyId in gmail_sync_state to the latest historyId from the response
    await db
      .update(gmailSyncState)
      .set({ historyId: latestHistoryId, updatedAt: new Date() })
      .where(eq(gmailSyncState.email, emailToWatch));

    return NextResponse.json({
      success: true,
      processed: processedCount,
      skipped: skippedCount,
      historyId: latestHistoryId,
    });
  } catch (error: unknown) {
    console.error('[GET /api/cron/sync-gmail-history] Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
