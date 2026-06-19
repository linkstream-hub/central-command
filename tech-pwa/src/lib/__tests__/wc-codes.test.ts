import { describe, test, expect } from 'vitest';
import { resolveWCCode } from '../wc-codes';

describe('resolveWCCode', () => {
  test('returns high tier when wage meets threshold', () => {
    expect(resolveWCCode('Electrical', 36)).toBe('5140-1');
    expect(resolveWCCode('Plumbing', 40)).toBe('5187-1');
    expect(resolveWCCode('Carpentry', 41)).toBe('5432-1');
    expect(resolveWCCode('Painting', 32)).toBe('5482-1');
  });

  test('returns low tier when wage below threshold', () => {
    expect(resolveWCCode('Electrical', 35.99)).toBe('5190-1');
    expect(resolveWCCode('Plumbing', 20)).toBe('5183-1');
    expect(resolveWCCode('Carpentry', 30)).toBe('5403-1');
  });

  test('falls back to General Repair for unknown category', () => {
    expect(resolveWCCode('Underwater Welding', 50)).toBe('5432-1');
    expect(resolveWCCode('', 10)).toBe('5403-1');
  });

  test('treats null/undefined/zero wage as lowest tier', () => {
    expect(resolveWCCode('Electrical', null)).toBe('5190-1');
    expect(resolveWCCode('Electrical', undefined)).toBe('5190-1');
    expect(resolveWCCode('Electrical', 0)).toBe('5190-1');
  });

  test('single-tier categories return their only code at any wage', () => {
    expect(resolveWCCode('Finish Carpentry', 0)).toBe('5146-1');
    expect(resolveWCCode('Finish Carpentry', 100)).toBe('5146-1');
    expect(resolveWCCode('Janitorial', 15)).toBe('9015-1');
    expect(resolveWCCode('Turnover', 25)).toBe('9015-1');
    expect(resolveWCCode('Multi-trade', 30)).toBe('9015-1');
  });
});
