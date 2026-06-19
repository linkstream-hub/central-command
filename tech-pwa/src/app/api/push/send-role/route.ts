import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { pushSubscriptions, employees } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

const VAPID_EMAIL = process.env.VAPID_EMAIL;
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (VAPID_EMAIL && VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

const SendRoleSchema = z.object({
  role: z.string().min(1),
  payload: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  if (!session && apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!VAPID_EMAIL || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return NextResponse.json({ error: 'VAPID not configured' }, { status: 500 });
  }

  const body = await req.json();
  const parsed = SendRoleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
  }

  const { role, payload } = parsed.data;

  const subs = await db
    .select({
      endpoint: pushSubscriptions.endpoint,
      p256dh: pushSubscriptions.p256dh,
      authKey: pushSubscriptions.authKey,
    })
    .from(pushSubscriptions)
    .innerJoin(employees, eq(pushSubscriptions.employeeId, employees.id))
    .where(and(
      eq(pushSubscriptions.orgId, 'APT-CA'),
      eq(employees.role, role),
      eq(employees.isActive, true),
    ));

  if (subs.length === 0) {
    return NextResponse.json({ sent: 0, failed: 0 });
  }

  const results = await Promise.allSettled(
    subs.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.authKey } },
        JSON.stringify(payload),
      )
    )
  );

  const sent = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  return NextResponse.json({ sent, failed });
}
