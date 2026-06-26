// Shared comms utilities — single source of truth for stakeholder derivation.
// Used by: /api/comms/[jobId]/route.ts and /api/comms/inbound/route.ts

export function extractEmailAddress(raw: string): string {
  if (!raw) return '';
  const match = raw.match(/<([^>]+)>/);
  return match ? match[1].toLowerCase().trim() : raw.toLowerCase().trim();
}

export function deriveStakeholder(
  fromEmail: string,
  toEmail: string,
  rmEmail?: string,
  tenantEmail?: string,
): 'REQUESTER' | 'TENANT' | 'TECH' {
  const from   = extractEmailAddress(fromEmail);
  const to     = extractEmailAddress(toEmail);
  const rm     = rmEmail     ? extractEmailAddress(rmEmail)     : '';
  const tenant = tenantEmail ? extractEmailAddress(tenantEmail) : '';

  if (rm     && (from === rm     || to === rm))     return 'REQUESTER';
  if (tenant && (from === tenant || to === tenant)) return 'TENANT';
  return 'TECH';
}
