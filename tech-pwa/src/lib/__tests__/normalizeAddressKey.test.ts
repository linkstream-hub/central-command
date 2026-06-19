import { describe, test, expect } from 'vitest';
import { normalizeAddressKey } from '../normalizeAddressKey';

describe('normalizeAddressKey', () => {
  test('strips city/state suffix at first comma boundary', () => {
    expect(normalizeAddressKey('123 Main St, Oakland, CA')).toBe('123 main st||');
  });

  test('extracts embedded unit from address when unit param is empty', () => {
    expect(normalizeAddressKey('456 Elm Ave #2B')).toBe('456 elm ave||2b');
  });

  test('explicit unit param is used; embedded unit not present', () => {
    expect(normalizeAddressKey('789 Oak Drive', '3A')).toBe('789 oak drive||3a');
  });

  test('explicit unit param overrides absence of embedded unit in address', () => {
    // Address has no embedded unit; explicit param populates it
    expect(normalizeAddressKey('100 Pine Rd', '101')).toBe('100 pine rd||101');
  });

  test('normalizes ## to # before unit extraction', () => {
    expect(normalizeAddressKey('3053 Dohr ##4')).toBe('3053 dohr||4');
  });

  test('street-type tokens lowercased and trailing period stripped (Ave., St., Blvd.)', () => {
    expect(normalizeAddressKey('200 Broadway Ave.')).toBe('200 broadway ave||');
    expect(normalizeAddressKey('300 Market St.', '')).toBe('300 market st||');
  });

  test('street type full words normalized (Avenue, Street)', () => {
    expect(normalizeAddressKey('500 Grand Avenue')).toBe('500 grand avenue||');
  });

  test('empty address returns ||', () => {
    expect(normalizeAddressKey('')).toBe('||');
  });

  test('null-like address handled via String() coercion', () => {
    // TypeScript callers won't pass null directly but the port must handle it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(normalizeAddressKey(null as any)).toBe('||');
  });

  test('collapses multiple spaces', () => {
    expect(normalizeAddressKey('40  Moss   Ave  #106')).toBe('40 moss ave||106');
  });

  test('strips non-alphanumeric chars other than # before unit strip', () => {
    // Address with punctuation in street name gets stripped after unit extraction
    expect(normalizeAddressKey('123 Main-St')).toBe('123 mainst||');
  });

  test('embedded unit extraction from real-world Lapham address (40 Moss Ave #106)', () => {
    expect(normalizeAddressKey('40 Moss Ave #106')).toBe('40 moss ave||106');
  });

  test('city suffix stripped including multi-part suffix', () => {
    // "Ave" abbreviation normalizes to "ave" (lowercased, no expansion); city+state stripped at comma
    expect(normalizeAddressKey('3126 College Ave, Berkeley, CA 94705')).toBe('3126 college ave||');
  });
});
