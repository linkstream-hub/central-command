import { Resend } from 'resend';

// Resend initialization moved to lazy-init inside functions to prevent build failures
// when RESEND_API_KEY is missing from the environment.
const getResend = () => new Resend(process.env.RESEND_API_KEY || 're_placeholder');

const BRAND_COLOR = '#f97316'; // --accent
const PTE_COLOR = '#8b5cf6';    // --color-pte
const BG_COLOR = '#0d0f14';    // --bg-primary

/**
 * Sends an email to the tenant when a job is scheduled.
 */
export async function sendTenantScheduledEmail(
  to: string,
  tenantName: string,
  address: string,
  scheduledDate: string,
  scheduledTime?: string
) {
  try {
    if (!to || !to.includes('@')) return;
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
      console.log(`[DEV/TEST EMAIL BLOCKED] Tenant scheduled → ${to} | ${address} | ${scheduledDate}`);
      return;
    }

    const timeString = scheduledTime ? ` at ${scheduledTime}` : '';
    
    await getResend().emails.send({
      from: 'noreply@aptmaintenanceinc.com',
      to,
      replyTo: 'workorder@aptmaintenanceinc.com',
      subject: `Scheduled: Maintenance Visit — ${address}`,
      html: `
        <div style="font-family: sans-serif; background-color: ${BG_COLOR}; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 16px;">
          <h1 style="color: ${BRAND_COLOR}; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">Scheduled</h1>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            Hi ${escapeHtml(tenantName)},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            Your maintenance request for <strong>${address}</strong> has been scheduled.
          </p>
          <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 900;">Appointment Date</p>
            <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 900; color: ${BRAND_COLOR};">${scheduledDate}${timeString}</p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.6);">
            Please ensure access to your unit is available at this time. If you need to reschedule, please reply to this email to coordinate with our dispatch team.
          </p>
          <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 32px 0;" />
          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); text-align: center;">
            &copy; ${new Date().getFullYear()} APT Maintenance Inc. · Dispatch Department
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send tenant scheduled email:', error);
  }
}

/**
 * Sends a coordination email to the tenant when PTE (Permission To Enter) coordination is needed.
 */
export async function sendPteCoordinationEmail(
  to: string,
  tenantName: string,
  address: string
) {
  try {
    if (!to || !to.includes('@')) return;
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
      console.log(`[DEV/TEST EMAIL BLOCKED] PTE coordination → ${to} | ${address}`);
      return;
    }

    await getResend().emails.send({
      from: 'noreply@aptmaintenanceinc.com',
      to,
      replyTo: 'workorder@aptmaintenanceinc.com',
      subject: `Action Required: Coordinate Access — ${address}`,
      html: `
        <div style="font-family: sans-serif; background-color: ${BG_COLOR}; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 16px;">
          <h1 style="color: ${PTE_COLOR}; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">Coordinate Access</h1>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            Hi ${escapeHtml(tenantName)},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            We are ready to begin work on your maintenance request for <strong>${address}</strong>.
          </p>
          <div style="background-color: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; font-weight: 900; color: #ffffff; line-height: 1.5;">
              Please reply to this email with the dates and times that work best for you to have a technician visit your unit.
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.6);">
            Once we receive your preferred windows, our dispatch team will confirm the final appointment with you.
          </p>
          <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 32px 0;" />
          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); text-align: center;">
            &copy; ${new Date().getFullYear()} APT Maintenance Inc. · Dispatch Department
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send PTE coordination email:', error);
  }
}

/** Escapes HTML entities in values interpolated into outbound email HTML. Intake fields originate from untrusted inbound email — never interpolate them raw. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export type RequesterAckVariant = 'standard' | 'lapham-form-request';

/**
 * Sends an automatic receipt to the requester when a WO intake email is received.
 * (INTAKE-06)
 *
 * Dev write guard: blocked outside production / in sandbox mode.
 * APT-Internal gate: CALLER must check senderType !== 'APT Internal' before calling.
 *
 * Three-way segmentation (COO 2026-06-10): callers pass 'lapham-form-request' when the
 * sender is Lapham-affiliated but the WO arrived WITHOUT the Lapham form (Gemini path) —
 * that variant asks them to include the form with future requests. Lapham-with-form and
 * general requesters both get 'standard'. (APT intake-form link lands here in Phase 26 — TEMPLATE_TODO.)
 *
 * @param to      - Requester email address
 * @param address - Property address from the WO
 * @param variant - Ack copy variant (default 'standard')
 */
export async function sendRequesterAutoReply(to: string, address: string, variant: RequesterAckVariant = 'standard'): Promise<void> {
  try {
    if (!to || !to.includes('@')) return;
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
      console.log(`[DEV/TEST EMAIL BLOCKED] Requester auto-reply → ${to} | ${address}`);
      return;
    }

    await getResend().emails.send({
      from: 'noreply@aptmaintenanceinc.com',
      to,
      replyTo: 'workorder@aptmaintenanceinc.com',
      subject: `Request Received — ${escapeHtml(address)}`,
      html: `
        <div style="font-family: sans-serif; background-color: ${BG_COLOR}; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 16px;">
          <h1 style="color: ${BRAND_COLOR}; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">Request Received</h1>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            Your maintenance request for <strong>${escapeHtml(address)}</strong> has been received.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            Our dispatch team will review your request and be in touch shortly.
          </p>
          ${variant === 'lapham-form-request' ? `
          <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
              <strong>Tip for faster scheduling:</strong> including the Lapham maintenance request form with your email lets us schedule your request immediately, with no follow-up questions.
            </p>
          </div>` : ''}
          <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 32px 0;" />
          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); text-align: center;">
            &copy; ${new Date().getFullYear()} APT Maintenance Inc. · Dispatch Department
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send requester auto-reply:', error);
  }
}

/**
 * Sends a date/time coordination email to the tenant to schedule the maintenance visit.
 * (INTAKE-07 — email channel; SMS via OpenPhone deferred to Phase 23)
 *
 * Dev write guard: blocked outside production / in sandbox mode.
 * Only call when tenant email is provided and property is not a turnover/inspection WO.
 *
 * @param to          - Tenant email address
 * @param tenantName  - Tenant's display name
 * @param address     - Property address for the maintenance visit
 */
export async function sendTenantCoordinationEmail(
  to: string,
  tenantName: string,
  address: string
): Promise<void> {
  try {
    if (!to || !to.includes('@')) return;
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
      console.log(`[DEV/TEST EMAIL BLOCKED] Tenant coordination → ${to} | ${address}`);
      return;
    }

    await getResend().emails.send({
      from: 'noreply@aptmaintenanceinc.com',
      to,
      replyTo: 'workorder@aptmaintenanceinc.com',
      subject: `Coordinating Your Maintenance Visit — ${escapeHtml(address)}`,
      html: `
        <div style="font-family: sans-serif; background-color: ${BG_COLOR}; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 16px;">
          <h1 style="color: ${BRAND_COLOR}; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">Schedule Your Visit</h1>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            Hi ${escapeHtml(tenantName)},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
            We have a maintenance request for your unit at <strong>${escapeHtml(address)}</strong> and want to coordinate a convenient time with you.
          </p>
          <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; margin: 32px 0;">
            <p style="margin: 0; font-size: 15px; font-weight: 900; color: #ffffff; line-height: 1.5;">
              Please reply with the dates and times that work best for you.
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.6);">
            Once we have your availability, our dispatch team will confirm the appointment.
          </p>
          <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 32px 0;" />
          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); text-align: center;">
            &copy; ${new Date().getFullYear()} APT Maintenance Inc. · Dispatch Department
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send tenant coordination email:', error);
  }
}
