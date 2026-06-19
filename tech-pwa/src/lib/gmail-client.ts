import { google, type gmail_v1 } from 'googleapis';

export function getGmailClient() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing Gmail credentials. GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN must be configured.'
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });
  return google.gmail({ version: 'v1', auth: oauth2Client });
}

function getHeader(headers: { name: string; value: string }[], name: string): string {
  const found = headers.find(h => h.name?.toLowerCase() === name.toLowerCase());
  return found ? found.value : '';
}

function extractEmail(headerValue: string): string {
  if (!headerValue) return '';
  const match = headerValue.match(/<([^>]+)>/);
  return (match ? match[1] : headerValue).trim().toLowerCase();
}

function stripHtml(html: string): string {
  return html
    // Remove style blocks entirely
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Block-level closing tags → newline (preserves paragraph structure)
    .replace(/<\/(p|div|tr|li|blockquote|h[1-6])>/gi, '\n')
    // <br> → newline
    .replace(/<br\s*\/?>/gi, '\n')
    // Opening block tags → strip (newline already added by closing tag)
    .replace(/<(p|div|tr|li|blockquote|h[1-6])[^>]*>/gi, '')
    // All remaining tags → space
    .replace(/<[^>]*>/g, ' ')
    // Decode common HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Collapse horizontal whitespace (preserve newlines)
    .replace(/[^\S\n]+/g, ' ')
    // Collapse 3+ consecutive newlines to 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Cleans an email body for display in the comms thread:
 * - Strips RFC 3676 signature separator (-- ) and everything after
 * - Preserves forwarded message content — dispatchers need form data and WO context
 *   that is often only available in the forwarded email body
 */
function cleanEmailBody(text: string): string {
  let cleaned = text;

  // RFC 3676 signature separator — strip signature block
  const sigIdx = cleaned.search(/\n-- ?\n/);
  if (sigIdx > 0) {
    cleaned = cleaned.substring(0, sigIdx).trim();
  }

  return cleaned.trim();
}

function extractBody(payload: gmail_v1.Schema$MessagePart | null | undefined): string {
  if (!payload) return '';

  // If it's a simple text message
  if (payload.mimeType === 'text/plain' && payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64url').toString('utf8');
  }

  if (payload.mimeType === 'text/html' && payload.body?.data) {
    const html = Buffer.from(payload.body.data, 'base64url').toString('utf8');
    return stripHtml(html);
  }

  // If there are parts
  if (payload.parts) {
    // 1. Try to find text/plain first
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return Buffer.from(part.body.data, 'base64url').toString('utf8');
      }
    }
    // 2. Try to find text/html if no text/plain is found — strip tags
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        const html = Buffer.from(part.body.data, 'base64url').toString('utf8');
        return stripHtml(html);
      }
    }
    // 3. Fallback: recursively search in subparts (multipart/alternative, multipart/mixed, etc.)
    for (const part of payload.parts) {
      const body = extractBody(part);
      if (body) return body;
    }
  }

  return '';
}

export interface ParsedGmailMessage {
  messageId: string;
  threadId: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  bodyPreview: string;
  fullBody: string;
  sentAt: Date;
}

export async function getNewMessages(startHistoryId: string): Promise<{
  messages: ParsedGmailMessage[];
  latestHistoryId: string;
}> {
  const gmail = getGmailClient();

  // Fetch history list
  const historyResponse = await gmail.users.history.list({
    userId: 'me',
    startHistoryId,
    historyTypes: ['messageAdded'],
  });

  const historyList = historyResponse.data.history || [];
  const latestHistoryId = historyResponse.data.historyId || startHistoryId;

  // Find all unique message IDs from messagesAdded
  const messageIds = new Set<string>();
  for (const item of historyList) {
    const messagesAdded = item.messagesAdded || [];
    for (const add of messagesAdded) {
      if (add.message?.id) {
        messageIds.add(add.message.id);
      }
    }
  }

  const parsedMessages: ParsedGmailMessage[] = [];

  // Fetch details for each message
  for (const messageId of messageIds) {
    try {
      const messageResponse = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
      });

      const msg = messageResponse.data;
      if (!msg || !msg.payload) continue;

      const headers = (msg.payload.headers || []) as { name: string; value: string }[];
      const fromRaw = getHeader(headers, 'From');
      const toRaw = getHeader(headers, 'To');
      const subject = getHeader(headers, 'Subject');
      const dateRaw = getHeader(headers, 'Date');

      const fromEmail = extractEmail(fromRaw);
      const toEmail = extractEmail(toRaw);

      const fullBody = cleanEmailBody(extractBody(msg.payload));
      const bodyPreview = fullBody.substring(0, 500);

      let sentAt = new Date();
      if (dateRaw) {
        const parsed = new Date(dateRaw);
        if (!isNaN(parsed.getTime())) {
          sentAt = parsed;
        }
      }

      parsedMessages.push({
        messageId,
        threadId: msg.threadId || '',
        fromEmail,
        toEmail,
        subject,
        bodyPreview,
        fullBody,
        sentAt,
      });
    } catch (err) {
      console.error(`Failed to fetch details for Gmail message ${messageId}:`, err);
    }
  }

  return {
    messages: parsedMessages,
    latestHistoryId,
  };
}

export async function getCurrentHistoryId(): Promise<string> {
  const gmail = getGmailClient();
  const profileResponse = await gmail.users.getProfile({
    userId: 'me',
  });
  const historyId = profileResponse.data.historyId;
  if (!historyId) {
    throw new Error('Gmail getProfile did not return a historyId');
  }
  return historyId;
}

export interface ParsedGmailThread {
  threadId: string;
  messages: ParsedGmailMessage[];
}

export async function getThreadByMessageId(messageId: string): Promise<ParsedGmailThread> {
  const gmail = getGmailClient();

  // 1. Get the threadId from the message
  const msgResponse = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'minimal',
  });
  const threadId = msgResponse.data.threadId;
  if (!threadId) {
    throw new Error(`Gmail message ${messageId} has no threadId`);
  }

  // 2. Get all messages in the thread
  const threadResponse = await gmail.users.threads.get({
    userId: 'me',
    id: threadId,
    format: 'full',
  });

  const threadMessages = threadResponse.data.messages || [];
  const parsedMessages: ParsedGmailMessage[] = [];

  for (const msg of threadMessages) {
    if (!msg || !msg.payload) continue;

    const headers = (msg.payload.headers || []) as { name: string; value: string }[];
    const fromRaw = getHeader(headers, 'From');
    const toRaw   = getHeader(headers, 'To');
    const subject = getHeader(headers, 'Subject');
    const dateRaw = getHeader(headers, 'Date');

    const fromEmail = extractEmail(fromRaw);
    const toEmail   = extractEmail(toRaw);

    const fullBody    = cleanEmailBody(extractBody(msg.payload));
    const bodyPreview = fullBody.substring(0, 500);

    let sentAt = new Date();
    if (dateRaw) {
      const parsed = new Date(dateRaw);
      if (!isNaN(parsed.getTime())) {
        sentAt = parsed;
      }
    }

    parsedMessages.push({
      messageId:   msg.id || '',
      threadId,
      fromEmail,
      toEmail,
      subject,
      bodyPreview,
      fullBody,
      sentAt,
    });
  }

  return { threadId, messages: parsedMessages };
}

export async function getThreadMessageIds(threadId: string): Promise<string[]> {
  const gmail = getGmailClient();

  const threadResponse = await gmail.users.threads.get({
    userId: 'me',
    id: threadId,
    format: 'minimal',
  });

  const threadMessages = threadResponse.data.messages || [];
  return threadMessages
    .map(m => m.id || '')
    .filter(id => id !== '');
}
