import { db } from '@/lib/db';
import { workflowEvents } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import type { Result } from '@/domain/job';

export type WorkOrderEvent =
  | { type: 'AttestationSigned'; jobId: string; techId: string; mealCompliant: boolean; restCompliant: boolean; shiftDurationMinutes: number }
  | { type: 'WorkOrderScheduled'; jobId: string; techId: string; scheduledDate: string; scheduledTime: string; tenantEmail?: string; pmEmail?: string; propertyAddress: string }
  | { type: 'PteRequired'; jobId: string; propertyAddress: string; pmEmail: string; tenantEmail?: string }
  | { type: 'DispatchSent'; date: string; techs: unknown[]; sentBy: string; sentAt: string }
  | { type: 'WorkOrderCompleted'; jobId: string; techId: string; completedAt: string }
  | { type: 'StaleJobDetected'; jobId: string; propertyAddress: string; daysSinceCreated: number }
  | { type: 'WcCodeMissing'; jobId: string; propertyAddress: string };

type BusError = { code: 'DB_WRITE_FAILED'; error: string };

export class EventBus {
  static async publish(event: WorkOrderEvent): Promise<Result<{ eventId: string }, BusError>> {
    const eventId = crypto.randomUUID();
    const occurredAt = new Date();

    // 1. Write to outbox
    try {
      await db.insert(workflowEvents).values({
        id: eventId,
        type: event.type,
        payload: JSON.stringify(event),
        occurredAt,
        status: 'pending',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Post to Discord on DB failure
      const webhook = process.env.DISCORD_N8N_WEBHOOK;
      if (webhook) {
        fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: `[EventBus] DB_WRITE_FAILED: ${event.type} — ${msg}` }),
        }).catch(() => {});
      }
      return { ok: false, error: { code: 'DB_WRITE_FAILED', error: msg } };
    }

    // 2. Attempt immediate delivery
    const url = process.env.N8N_EVENT_BUS_URL;
    if (url) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: eventId, occurredAt: occurredAt.toISOString(), ...event }),
        });
        if (res.ok) {
          await db.update(workflowEvents)
            .set({ status: 'delivered', deliveredAt: new Date() })
            .where(eq(workflowEvents.id, eventId));
        }
      } catch {
        // Leave as pending — outbox poller retries
      }
    }

    return { ok: true, value: { eventId } };
  }
}
