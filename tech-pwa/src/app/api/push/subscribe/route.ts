import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { pushSubscriptions } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';

export const dynamic = 'force-dynamic';

const SubscribeSchema = z.object({
  subscription: z.object({
    endpoint: z.string(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string(),
    }),
  }),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await verifyFieldSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body: unknown = await req.json();
  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid request body', errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { subscription } = parsed.data;

  await db.insert(pushSubscriptions).values({
    orgId: 'APT-CA',
    employeeId: session.employeeId,
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    authKey: subscription.keys.auth,
  }).onConflictDoUpdate({
    target: [pushSubscriptions.employeeId, pushSubscriptions.endpoint],
    set: {
      p256dh: subscription.keys.p256dh,
      authKey: subscription.keys.auth,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}
