import { describe, it, expect } from 'vitest';
import { extractCodes, computeAccessMerge } from '../access-codes';

describe('extractCodes', () => {
  it('extracts unique 3–6 digit codes from text', () => {
    const result = extractCodes('gate 7890 lockbox 2345');
    expect(result).toEqual(expect.arrayContaining(['7890', '2345']));
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no codes present', () => {
    expect(extractCodes('no codes here')).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(extractCodes('')).toEqual([]);
  });

  it('deduplicates repeated codes', () => {
    const result = extractCodes('gate 7890 also 7890');
    expect(result).toEqual(['7890']);
  });

  it('extracts minimum 3-digit codes', () => {
    expect(extractCodes('code 123')).toContain('123');
  });

  it('extracts maximum 6-digit codes', () => {
    expect(extractCodes('gate 123456')).toContain('123456');
  });

  it('does not extract 7-digit or longer numbers', () => {
    expect(extractCodes('number 1234567')).toEqual([]);
  });

  it('does not extract 1-2 digit numbers', () => {
    expect(extractCodes('unit 1 apt 12')).toEqual([]);
  });
});

describe('computeAccessMerge', () => {
  it('returns no_new_codes when inbound codes are already stored', () => {
    const result = computeAccessMerge('gate 7890', 'gate 7890');
    expect(result).toMatchObject({ updated: false, reason: 'no_new_codes' });
  });

  it('merges new inbound code into existing access info', () => {
    const result = computeAccessMerge('gate 7890', 'lockbox 2345');
    expect(result).toMatchObject({
      updated: true,
      merged: 'gate 7890 | lockbox 2345',
      newCodes: ['2345'],
    });
  });

  it('handles null existing — sets merged to inbound', () => {
    const result = computeAccessMerge(null, 'lockbox 2345');
    expect(result).toMatchObject({
      updated: true,
      merged: 'lockbox 2345',
      newCodes: ['2345'],
    });
  });

  it('does not update when inbound has no codes at all', () => {
    const result = computeAccessMerge('gate 7890', 'no codes in here');
    expect(result).toMatchObject({ updated: false, reason: 'no_new_codes' });
  });

  it('does not replace existing info — appends as pipe-separated', () => {
    const result = computeAccessMerge('gate 7890', 'lockbox 2345');
    expect(result.merged).toBe('gate 7890 | lockbox 2345');
    // Must NOT be just the inbound value
    expect(result.merged).not.toBe('lockbox 2345');
  });

  it('returns no_new_codes when inbound code is a subset of existing codes', () => {
    const result = computeAccessMerge('gate 7890 lockbox 2345', 'gate 7890');
    expect(result).toMatchObject({ updated: false, reason: 'no_new_codes' });
  });
});
