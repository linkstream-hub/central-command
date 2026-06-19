'use server';

import { intakeSchema } from '@/lib/intake-schema';
import { processIntakePayload } from '@/lib/intake-processor';
import { db } from '@/lib/db';
import { jobs, newContactQueue } from '@/lib/schema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitIntakeForm(data: unknown) {
  try {
    const parsed = intakeSchema.safeParse(data);
    
    if (!parsed.success) {
      return { success: false, error: 'Validation failed', details: parsed.error.flatten() };
    }

    const { destination, data: dbPayload } = processIntakePayload(parsed.data);

    if (destination === 'jobs') {
      await db.insert(jobs).values(dbPayload);
    } else {
      // @ts-ignore - Drizzle infer issues with optional fields sometimes
      await db.insert(newContactQueue).values(dbPayload);
    }

    try {
      const subject = destination === 'jobs' 
        ? `New Web Work Order: ${dbPayload.address}`
        : `New Web Lead: ${'clientName' in dbPayload ? dbPayload.clientName : 'Unknown'}`;

      await resend.emails.send({
        from: 'system@aptmaintenanceinc.com',
        to: 'info@aptmaintenanceinc.com',
        subject,
        text: `A new ${destination === 'jobs' ? 'Work Order' : 'Lead'} has been received via the website.\n\nDetails:\n${JSON.stringify(dbPayload, null, 2)}`,
      });
    } catch (e) {
      console.error('Failed to send Resend email:', e);
    }

    return { success: true };
  } catch (err) {
    console.error('Error processing intake:', err);
    return { success: false, error: 'Internal server error' };
  }
}
