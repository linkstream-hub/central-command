import PostalMime from "postal-mime";

export default {
  async email(message, env) {
    const email = await new PostalMime().parse(message.raw);
    
    // Fallback securely if env vars are missing
    if (!env.NEXT_APP_INTAKE_URL || !env.EMAIL_INBOUND_TOKEN) {
      console.error("Missing required environment variables.");
      return;
    }

    await fetch(env.NEXT_APP_INTAKE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-email-token": env.EMAIL_INBOUND_TOKEN,
      },
      body: JSON.stringify({
        subject: email.subject ?? "",
        bodyText: email.text ?? "",
        // MUST use header (email.from.address), not envelope (message.from)
        // Gmail SRS rewrites envelope; Lapham bypass depends on real sender address
        sender: email.from?.address ?? message.from, 
        messageId: email.messageId ?? "",
      }),
    });
  },
};
