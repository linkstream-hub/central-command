/**
 * Deterministic Lapham webform parser.
 * Verbatim TypeScript port of `detectLaphamForm()` from Code.js (GAS).
 *
 * Lapham forms arrive at workorder@ as forwards from RM/Lapham employees —
 * detection is content-based, not sender-based. Bypasses Gemini entirely.
 * Returns `null` when the email is not a Lapham form (caller falls through to Gemini).
 *
 * Two email body formats handled:
 *  - Same-line:  "Field: Value" on one line
 *  - Two-line:   "Field\nValue" (Apple Mail renders <b>Field</b><br>Value as plain text on forward)
 *
 * Missing fields return empty string, never null. No try/catch — pure parse.
 */

import { normalizeAddressKey } from './normalizeAddressKey';

// Re-export so consumers can import both from this module
export { normalizeAddressKey };

/** Shape returned by detectLaphamForm. Consumed by Plan 25-03 n8n Code nodes (must match). */
export interface LaphamParseResult {
  isLaphamForm: boolean;
  confidence: 'High' | 'Medium' | 'Low';
  emailType: 'adhoc_workorder' | 'turnover' | 'inspection' | 'unknown';
  leadType: 'Unit Turnover' | 'Inspection' | 'Unknown';
  serviceCategory: string;
  urgency: 'Standard';
  address: string;
  unit: string;
  rmName: string;
  rmEmail: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  tenantPreferredContact: string;
  tenantHasPets: string;
  pteGranted: 'Yes' | 'No' | 'Not Applicable';
  pteNotes: string;
  description: string;
  senderLookupNeeded: boolean;
}

/**
 * Attempts to parse `body` as a Lapham webform.
 *
 * @param senderEmail - Email address of the message sender
 * @param subject     - Email subject line
 * @param body        - Full plain-text email body
 * @returns Parsed `LaphamParseResult` or `null` if not a Lapham form
 */
export function detectLaphamForm(
  senderEmail: string,
  subject: string,
  body: string
): LaphamParseResult | null {
  const isLaphamSender = senderEmail.indexOf('website@laphamcompany.com') !== -1;
  const isFormBody =
    body.indexOf('Submitted values are:') !== -1 ||
    body.indexOf('Webform submission from: Maintenance Request') !== -1;

  if (!isLaphamSender && !isFormBody) return null;

  // ---------------------------------------------------------------------------
  // field() — extract a named field from `body`.
  // Tries each label in order. Supports two formats (CRITICAL — see Pitfall 3):
  //   Same-line:  "Field: Value"  or  "Field Value"
  //   Two-line:   "Field\nValue"  (Apple Mail forward rendering)
  // ---------------------------------------------------------------------------
  function field(names: string[]): string {
    for (const name of names) {
      // Same-line: label + optional colon/space + value on same line
      const re = new RegExp(`(?:^|\\n)${name}\\s*:?\\s*([^\\n]+)`, 'i');
      const m = body.match(re);
      if (m && m[1].trim()) return m[1].trim();

      // Two-line: label on one line (with any trailing text/colon), value on next line
      const re2 = new RegExp(`(?:^|\\n)${name}[^\\n]*\\n\\s*([^\\n]+)`, 'i');
      const m2 = body.match(re2);
      if (m2 && m2[1].trim()) return m2[1].trim();
    }
    return '';
  }

  // fieldFromBody() — same logic but scoped to a target body substring (forwarded section).
  function fieldFromBody(names: string[], targetBody: string): string {
    for (const name of names) {
      const re = new RegExp(`(?:^|\\n)${name}\\s*:?\\s*([^\\n]+)`, 'i');
      const m = targetBody.match(re);
      if (m && m[1].trim()) return m[1].trim();

      const re2 = new RegExp(`(?:^|\\n)${name}[^\\n]*\\n\\s*([^\\n]+)`, 'i');
      const m2 = targetBody.match(re2);
      if (m2 && m2[1].trim()) return m2[1].trim();
    }
    return '';
  }

  // ---------------------------------------------------------------------------
  // Forwarded body handling — handle both Gmail and Apple Mail forward formats
  // Gmail:      "---------- Forwarded message ---------"
  // Apple Mail: "Begin forwarded message:"
  // Strip `> ` quote prefixes and `*bold*` asterisks from Apple Mail rendering
  // ---------------------------------------------------------------------------
  let forwardedBody = '';
  const gmailFwdIdx = body.indexOf('---------- Forwarded message ---------');
  const appleFwdIdx = body.indexOf('Begin forwarded message:');
  const fwdIdx = gmailFwdIdx !== -1 ? gmailFwdIdx : appleFwdIdx;
  if (fwdIdx !== -1) {
    forwardedBody = body.substring(fwdIdx);
    forwardedBody = forwardedBody.replace(/^> ?/gm, '');
    // Apple Mail renders form field labels as *bold* — strip asterisks so regex matches
    forwardedBody = forwardedBody.replace(/\*([^*]+)\*/g, '$1');
  }

  // ---------------------------------------------------------------------------
  // Field extraction — fall back to forwardedBody when main body misses the field
  // ---------------------------------------------------------------------------
  const tenantName =
    field(['Name', 'Full Name', 'Submitted By', 'Your Name', 'First and Last Name']) ||
    (forwardedBody ? fieldFromBody(['Name', 'Full Name', 'Submitted By', 'Your Name', 'First and Last Name'], forwardedBody) : '');

  const address =
    field(['Address', 'Property Address', 'Property', 'Location', 'Street Address']) ||
    (forwardedBody ? fieldFromBody(['Address', 'Property Address', 'Property', 'Location', 'Street Address'], forwardedBody) : '');

  const unit =
    field(['Unit', 'Unit #', 'Unit Number', 'Apt', 'Apartment', 'Suite']) ||
    (forwardedBody ? fieldFromBody(['Unit', 'Unit #', 'Unit Number', 'Apt', 'Apartment', 'Suite'], forwardedBody) : '');

  const phone =
    field(['Phone', 'Phone Number', 'Mobile', 'Cell', 'Mobile Number']) ||
    (forwardedBody ? fieldFromBody(['Phone', 'Phone Number', 'Mobile', 'Cell', 'Mobile Number'], forwardedBody) : '');

  let tenantEmail =
    field(['Email', 'Email Address', 'Your Email']) ||
    (forwardedBody ? fieldFromBody(['Email', 'Email Address', 'Your Email'], forwardedBody) : '');

  const prefContact =
    field(['Preferred Contact', 'Preferred Contact Method', 'Contact Method', 'Best Way to Reach']) ||
    (forwardedBody ? fieldFromBody(['Preferred Contact', 'Preferred Contact Method', 'Contact Method', 'Best Way to Reach'], forwardedBody) : '');

  const pets =
    field(['Pets', 'Do you have pets', 'Pets in Unit', 'Have Pets']) ||
    (forwardedBody ? fieldFromBody(['Pets', 'Do you have pets', 'Pets in Unit', 'Have Pets'], forwardedBody) : '');

  const pteRaw =
    field(['Permission to Enter', 'PTE', 'Entry Permission', 'permission to enter']) ||
    (forwardedBody ? fieldFromBody(['Permission to Enter', 'PTE', 'Entry Permission', 'permission to enter'], forwardedBody) : '');

  let description =
    field([
      'Description', 'Issue', 'Problem', 'Repair Needed', 'Request', 'Details', 'Message',
      'Please describe in detail the maintenance problem below',
      'Please describe',
    ]) ||
    (forwardedBody
      ? fieldFromBody([
          'Description', 'Issue', 'Problem', 'Repair Needed', 'Request', 'Details', 'Message',
          'Please describe in detail the maintenance problem below',
          'Please describe',
        ], forwardedBody)
      : '');

  if (!description && forwardedBody) {
    description = forwardedBody
      .replace(/^[-\s]+Forwarded message[-\s]+/i, '')
      .replace(/^[A-Z][^:]+:.*$/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Strip `<mailto:...>` tags from email addresses
  if (tenantEmail) tenantEmail = tenantEmail.replace(/<mailto:[^>]+>/g, '').trim();

  // ---------------------------------------------------------------------------
  // PTE mapping — match exact webform radio-button phrases first, then simple yes/no
  // ---------------------------------------------------------------------------
  let pteGranted: 'Yes' | 'No' | 'Not Applicable' = 'Not Applicable';
  const pteLower = (pteRaw || '').toLowerCase();
  if (pteLower.indexOf('permission to enter my dwelling while i am not there') !== -1) {
    pteGranted = 'Yes';
  } else if (pteLower.indexOf('do not give permission') !== -1 || pteLower.indexOf('without my presence') !== -1) {
    pteGranted = 'No';
  } else if (pteLower === 'yes' || pteLower === 'y') {
    pteGranted = 'Yes';
  } else if (pteLower === 'no' || pteLower === 'n') {
    pteGranted = 'No';
  }

  // ---------------------------------------------------------------------------
  // Pets normalization
  // ---------------------------------------------------------------------------
  let tenantHasPets = 'Unknown';
  const petsLower = (pets || '').toLowerCase();
  if (petsLower === 'yes' || petsLower === 'y') tenantHasPets = 'Yes';
  else if (petsLower === 'no' || petsLower === 'n') tenantHasPets = 'No';

  // ---------------------------------------------------------------------------
  // Preferred contact normalization
  // ---------------------------------------------------------------------------
  let tenantPreferredContact = 'Unknown';
  const prefLower = (prefContact || '').toLowerCase();
  if (prefLower.indexOf('phone') !== -1 || prefLower.indexOf('call') !== -1 || prefLower.indexOf('text') !== -1) {
    tenantPreferredContact = 'Phone';
  } else if (prefLower.indexOf('email') !== -1) {
    tenantPreferredContact = 'Email';
  }

  // ---------------------------------------------------------------------------
  // emailType — scan description + subject for turnover/inspection keywords
  // ---------------------------------------------------------------------------
  let emailType: LaphamParseResult['emailType'] = 'adhoc_workorder';
  const scanText = ((description || '') + ' ' + (subject || '')).toLowerCase();
  if (
    scanText.indexOf('turnover') !== -1 ||
    scanText.indexOf('move out') !== -1 ||
    scanText.indexOf('move-out') !== -1
  ) {
    emailType = 'turnover';
  } else if (scanText.indexOf('inspection') !== -1) {
    emailType = 'inspection';
  }

  // ---------------------------------------------------------------------------
  // serviceCategory — keyword classification, verbatim GAS chain (order matters)
  // ---------------------------------------------------------------------------
  let serviceCategory = 'Unknown';
  if (scanText.indexOf('plumbing') !== -1 || scanText.indexOf('leak') !== -1 || scanText.indexOf('drain') !== -1) {
    serviceCategory = 'Plumbing';
  } else if (scanText.indexOf('electrical') !== -1 || scanText.indexOf('outlet') !== -1 || scanText.indexOf('breaker') !== -1) {
    serviceCategory = 'Electrical';
  } else if (scanText.indexOf('hvac') !== -1 || scanText.indexOf('cooling') !== -1 || scanText.indexOf('heating') !== -1) {
    serviceCategory = 'HVAC';
  } else if (scanText.indexOf('carpentry') !== -1 || scanText.indexOf('lock') !== -1) {
    serviceCategory = 'Carpentry';
  } else if (scanText.indexOf('appliance') !== -1) {
    serviceCategory = 'Appliance';
  } else if (scanText.indexOf('pest') !== -1) {
    serviceCategory = 'General Repair';
  } else if (scanText.indexOf('general') !== -1) {
    serviceCategory = 'General Repair';
  }

  const leadType: LaphamParseResult['leadType'] =
    emailType === 'turnover' ? 'Unit Turnover' : emailType === 'inspection' ? 'Inspection' : 'Unknown';

  // ---------------------------------------------------------------------------
  // senderLookupNeeded — set when address is absent or placeholder
  // ---------------------------------------------------------------------------
  const resolvedAddress = address || 'LOOKUP_BY_SENDER';
  const senderLookupNeeded = !address || address === 'LOOKUP_BY_SENDER';

  return {
    isLaphamForm: true,
    confidence: 'High',
    emailType,
    leadType,
    serviceCategory,
    urgency: 'Standard',
    address: resolvedAddress,
    unit,
    rmName: '',
    rmEmail: '',
    tenantName,
    tenantPhone: phone,
    tenantEmail,
    tenantPreferredContact,
    tenantHasPets,
    pteGranted,
    pteNotes: pteRaw,
    description: description || '(No description — see original email)',
    senderLookupNeeded,
  };
}
