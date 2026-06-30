import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, it, expect } from 'vitest';

describe('Server-only routes should not use NEXT_PUBLIC_ secrets', () => {
  const routesToTest = [
    '../../auth.ts',
    '../../app/api/gas/route.ts',
    '../../app/api/comms/[jobId]/route.ts'
  ];

  routesToTest.forEach(route => {
    it(`should not expose DASHBOARD_API_URL via NEXT_PUBLIC_ in ${route}`, () => {
      const filePath = join(__dirname, route);
      const content = readFileSync(filePath, 'utf8');
      
      // Should NOT contain the public prefix version
      expect(content).not.toContain('NEXT_PUBLIC_DASHBOARD_API_URL');
      
      // Should contain the server-only version
      expect(content).toContain('process.env.DASHBOARD_API_URL');
    });
  });
});
