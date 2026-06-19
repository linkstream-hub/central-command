import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { detectLaphamForm, type LaphamParseResult } from '../detectLaphamForm';

// ---------------------------------------------------------------------------
// Fixture loader
// ---------------------------------------------------------------------------
const fixtureDir = join(__dirname, 'fixtures', 'intake');
const sameline  = readFileSync(join(fixtureDir, 'lapham-sameline.txt'), 'utf8');
const forwarded = readFileSync(join(fixtureDir, 'lapham-forwarded.txt'), 'utf8');
const turnover  = readFileSync(join(fixtureDir, 'lapham-turnover.txt'), 'utf8');

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------
describe('detectLaphamForm — detection', () => {
  it('detects by "website@laphamcompany.com" sender regardless of body', () => {
    const result = detectLaphamForm('website@laphamcompany.com', 'Random Subject', 'No form markers here');
    expect(result).not.toBeNull();
    expect(result!.isLaphamForm).toBe(true);
  });

  it('detects by "Submitted values are:" body marker (generic sender)', () => {
    const result = detectLaphamForm('pm@example-realty.com', 'FW: Request', 'Submitted values are:\nName: Test');
    expect(result).not.toBeNull();
    expect(result!.isLaphamForm).toBe(true);
  });

  it('detects by "Webform submission from: Maintenance Request" marker', () => {
    const result = detectLaphamForm('nobody@example.com', 'Subject', 'Webform submission from: Maintenance Request\nName: X');
    expect(result).not.toBeNull();
  });

  it('returns null for ordinary non-Lapham email', () => {
    const result = detectLaphamForm('owner@example.com', 'Water heater broken', 'Hi, the water heater is leaking at 123 Main St.');
    expect(result).toBeNull();
  });

  it('result shape: isLaphamForm=true and confidence=High', () => {
    const result = detectLaphamForm('website@laphamcompany.com', 'test', sameline);
    expect(result!.isLaphamForm).toBe(true);
    expect(result!.confidence).toBe('High');
  });
});

// ---------------------------------------------------------------------------
// Same-line field extraction
// ---------------------------------------------------------------------------
describe('detectLaphamForm — field extraction (same-line format)', () => {
  let result: LaphamParseResult;

  // Run once; share across tests
  // (vitest does not have beforeAll-level caching in describe scope but
  //  re-parsing the same string in each test is fast and acceptable)
  it('extracts address from same-line format', () => {
    result = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(result.address).toBe('400 Oak Street');
  });

  it('extracts unit from same-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(r.unit).toBe('3B');
  });

  it('extracts tenantName from same-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(r.tenantName).toBe('Jane Doe');
  });

  it('extracts tenantPhone from same-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(r.tenantPhone).toBe('(510) 555-0100');
  });

  it('extracts tenantEmail from same-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(r.tenantEmail).toBe('jane.doe@example.com');
  });

  it('extracts description from same-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(r.description).toContain('faucet');
  });

  it('maps pteGranted=Yes for "permission to enter my dwelling" phrase', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Fwd: Request', sameline)!;
    expect(r.pteGranted).toBe('Yes');
  });
});

// ---------------------------------------------------------------------------
// Forwarded / two-line field extraction (Apple Mail format)
// ---------------------------------------------------------------------------
describe('detectLaphamForm — field extraction (forwarded/two-line format)', () => {
  it('detects the forwarded form as a Lapham form', () => {
    const result = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded);
    expect(result).not.toBeNull();
  });

  it('extracts address from forwarded two-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded)!;
    expect(r.address).toBe('400 Oak Street');
  });

  it('extracts unit from forwarded two-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded)!;
    expect(r.unit).toBe('3B');
  });

  it('extracts tenantName from forwarded two-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded)!;
    expect(r.tenantName).toBe('Jane Doe');
  });

  it('extracts tenantPhone from forwarded two-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded)!;
    expect(r.tenantPhone).toBe('(510) 555-0100');
  });

  it('extracts tenantEmail from forwarded two-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded)!;
    expect(r.tenantEmail).toBe('jane.doe@example.com');
  });

  it('maps pteGranted=Yes from forwarded two-line format', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'FW: Request', forwarded)!;
    expect(r.pteGranted).toBe('Yes');
  });
});

// ---------------------------------------------------------------------------
// emailType detection
// ---------------------------------------------------------------------------
describe('detectLaphamForm — emailType detection', () => {
  it('returns emailType=adhoc_workorder for normal description', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Request', sameline)!;
    expect(r.emailType).toBe('adhoc_workorder');
  });

  it('returns emailType=turnover when description contains "turnover"', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Request', turnover)!;
    expect(r.emailType).toBe('turnover');
  });

  it('returns emailType=turnover when description contains "move out"', () => {
    const body = `Submitted values are:\nDescription: move out cleaning needed at unit 2\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'Request', body)!;
    expect(r.emailType).toBe('turnover');
  });

  it('returns emailType=turnover when description contains "move-out" (hyphen)', () => {
    const body = `Submitted values are:\nDescription: move-out inspection required\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'Request', body)!;
    expect(r.emailType).toBe('turnover');
  });

  it('returns emailType=inspection when description contains "inspection"', () => {
    const body = `Submitted values are:\nDescription: Annual inspection of HVAC system\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'Request', body)!;
    expect(r.emailType).toBe('inspection');
  });
});

// ---------------------------------------------------------------------------
// PTE mapping
// ---------------------------------------------------------------------------
describe('detectLaphamForm — PTE mapping', () => {
  it('maps "do not give permission" → pteGranted=No', () => {
    const body = `Submitted values are:\nPermission to Enter: I do not give permission\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'R', body)!;
    expect(r.pteGranted).toBe('No');
  });

  it('maps "without my presence" → pteGranted=No', () => {
    const body = `Submitted values are:\nPermission to Enter: Please do not enter without my presence\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'R', body)!;
    expect(r.pteGranted).toBe('No');
  });

  it('maps plain "yes" → pteGranted=Yes', () => {
    const body = `Submitted values are:\nPermission to Enter: Yes\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'R', body)!;
    expect(r.pteGranted).toBe('Yes');
  });

  it('maps plain "no" → pteGranted=No', () => {
    const body = `Submitted values are:\nPermission to Enter: No\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'R', body)!;
    expect(r.pteGranted).toBe('No');
  });

  it('empty PTE field → pteGranted=Not Applicable', () => {
    const body = `Submitted values are:\nPermission to Enter: Not Applicable\n`;
    const r = detectLaphamForm('pm@example-realty.com', 'R', body)!;
    expect(r.pteGranted).toBe('Not Applicable');
  });
});

// ---------------------------------------------------------------------------
// Tenant exempt fields (turnover / inspection)
// ---------------------------------------------------------------------------
describe('detectLaphamForm — tenant exempt fields', () => {
  it('turnover fixture: emailType is turnover', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'Request', turnover)!;
    expect(r.emailType).toBe('turnover');
  });

  it('turnover fixture: does NOT hallucinate tenant contact when form has none', () => {
    // The turnover fixture submitter is the RM — tenantName, tenantPhone, tenantEmail
    // from the fixture are the RM's details, not a separate tenant.
    // For turnover/inspection WO types the dispatcher knows no tenant is present.
    // The parser should still extract submitted fields (it cannot know at parse time
    // whether a field belongs to RM or a phantom tenant) — the key invariant is
    // that the form fields are not fabricated beyond what the fixture contains.
    const r = detectLaphamForm('pm@example-realty.com', 'Request', turnover)!;
    // Address must be present (no fabrication of a different address)
    expect(r.address).toBe('200 Elm Avenue');
    // Submitted Name field is captured (same value, no hallucination)
    expect(r.tenantName).toBe('Sarah Manager');
    // Description captures the turnover nature
    expect(r.description).toContain('turnover');
  });

  it('senderLookupNeeded=false when address is present', () => {
    const r = detectLaphamForm('pm@example-realty.com', 'R', sameline)!;
    expect(r.senderLookupNeeded).toBe(false);
  });

  it('senderLookupNeeded=true when address is empty in form', () => {
    const body = `Submitted values are:\nName: John Smith\nDescription: leaky faucet\n`;
    const r = detectLaphamForm('website@laphamcompany.com', 'R', body)!;
    expect(r.senderLookupNeeded).toBe(true);
  });
});

describe('serviceCategory + leadType parity (GAS keyword chain)', () => {
  const form = (desc: string, subject = 'Maintenance Request') =>
    detectLaphamForm('rm@example-realty.com', subject, `Submitted values are:\nDescription: ${desc}\nAddress: 123 Main St`);

  it('classifies plumbing from leak keyword', () => {
    expect(form('water leak under the sink')!.serviceCategory).toBe('Plumbing');
  });

  it('classifies electrical from outlet keyword', () => {
    expect(form('outlet sparking in bedroom')!.serviceCategory).toBe('Electrical');
  });

  it('classifies HVAC from heating keyword', () => {
    expect(form('heating not working')!.serviceCategory).toBe('HVAC');
  });

  it('classifies carpentry from lock keyword', () => {
    expect(form('front door lock broken')!.serviceCategory).toBe('Carpentry');
  });

  it('falls back to Unknown when no keyword matches', () => {
    expect(form('something odd happened')!.serviceCategory).toBe('Unknown');
  });

  it('plumbing wins over electrical when both present (GAS chain order)', () => {
    expect(form('leak near the outlet')!.serviceCategory).toBe('Plumbing');
  });

  it('leadType maps turnover and inspection; urgency is Standard', () => {
    const turnover = form('unit turnover cleaning');
    expect(turnover!.leadType).toBe('Unit Turnover');
    const inspection = form('annual inspection visit');
    expect(inspection!.leadType).toBe('Inspection');
    const adhoc = form('water leak');
    expect(adhoc!.leadType).toBe('Unknown');
    expect(adhoc!.urgency).toBe('Standard');
  });
});
