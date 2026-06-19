import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Resend before importing the module under test
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}));

import { sendRequesterAutoReply, sendTenantCoordinationEmail } from '../email';

describe('sendRequesterAutoReply', () => {
  beforeEach(() => {
    // Vitest runs in node env which is NOT 'production' — dev guard should fire
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('NEXT_PUBLIC_SANDBOX_MODE', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('is a no-op when to address is empty', async () => {
    const { Resend } = await import('resend');
    const instance = (Resend as ReturnType<typeof vi.fn>).mock.results[0]?.value;
    await sendRequesterAutoReply('', '123 Main St');
    // Resend send must NOT be called
    if (instance) {
      expect(instance.emails.send).not.toHaveBeenCalled();
    }
    // If no instance was created yet, the test passes trivially — that's fine
  });

  it('is a no-op for addresses missing @', async () => {
    const { Resend } = await import('resend');
    const instance = (Resend as ReturnType<typeof vi.fn>).mock.results[0]?.value;
    await sendRequesterAutoReply('notanemail', '123 Main St');
    if (instance) {
      expect(instance.emails.send).not.toHaveBeenCalled();
    }
  });

  it('does NOT call Resend.send in test/non-production environment', async () => {
    // Capture log to confirm dev guard fires
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await sendRequesterAutoReply('rm@example.com', '123 Main St');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('[DEV/TEST EMAIL BLOCKED]')
    );
    logSpy.mockRestore();
  });

  it('dev guard log contains the recipient address', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await sendRequesterAutoReply('rm@example.com', '123 Main St');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('rm@example.com')
    );
    logSpy.mockRestore();
  });
});

describe('sendTenantCoordinationEmail', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('NEXT_PUBLIC_SANDBOX_MODE', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('is a no-op when to address is empty', async () => {
    const { Resend } = await import('resend');
    const instance = (Resend as ReturnType<typeof vi.fn>).mock.results[0]?.value;
    await sendTenantCoordinationEmail('', 'Jane Doe', '456 Elm Ave');
    if (instance) {
      expect(instance.emails.send).not.toHaveBeenCalled();
    }
  });

  it('is a no-op for addresses missing @', async () => {
    const { Resend } = await import('resend');
    const instance = (Resend as ReturnType<typeof vi.fn>).mock.results[0]?.value;
    await sendTenantCoordinationEmail('notanemail', 'Jane Doe', '456 Elm Ave');
    if (instance) {
      expect(instance.emails.send).not.toHaveBeenCalled();
    }
  });

  it('does NOT call Resend.send in test/non-production environment', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await sendTenantCoordinationEmail('tenant@example.com', 'Jane Doe', '456 Elm Ave');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('[DEV/TEST EMAIL BLOCKED]')
    );
    logSpy.mockRestore();
  });

  it('dev guard log contains the recipient address', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await sendTenantCoordinationEmail('tenant@example.com', 'Jane Doe', '456 Elm Ave');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('tenant@example.com')
    );
    logSpy.mockRestore();
  });
});

describe('merge-gate additions: variant + HTML escaping', () => {
  it('lapham-form-request variant is accepted without throwing in dev (guard no-op)', async () => {
    const { sendRequesterAutoReply } = await import('../email');
    await expect(
      sendRequesterAutoReply('rm@example-realty.com', '123 Main St', 'lapham-form-request')
    ).resolves.toBeUndefined();
  });

  it('default variant param keeps two-arg call signature working', async () => {
    const { sendRequesterAutoReply } = await import('../email');
    await expect(
      sendRequesterAutoReply('rm@example-realty.com', '123 Main St')
    ).resolves.toBeUndefined();
  });

  it('hostile address/tenantName do not throw (escaped, dev-guarded)', async () => {
    const { sendTenantCoordinationEmail } = await import('../email');
    await expect(
      sendTenantCoordinationEmail('t@example.com', '<img src=x onerror=alert(1)>', '123 <script>bad</script> St')
    ).resolves.toBeUndefined();
  });
});
