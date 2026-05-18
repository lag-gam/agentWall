export async function sendEmail(args: {
  to: string;
  subject: string;
  body: string;
  attachment?: string;
}): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fallback: log-only mode
    console.log(`[EMAIL SIMULATED] To: ${args.to}, Subject: ${args.subject}`);
    return JSON.stringify({
      status: 'sent_simulated',
      to: args.to,
      subject: args.subject,
      note: 'RESEND_API_KEY not set — email logged but not actually sent',
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AgentFence Demo <onboarding@resend.dev>',
        to: args.to,
        subject: `[AgentFence Demo] ${args.subject}`,
        text: args.body,
      }),
    });

    const result = await response.json() as Record<string, unknown>;

    if (!response.ok) {
      return JSON.stringify({ status: 'error', details: result });
    }

    return JSON.stringify({ status: 'sent', id: result.id, to: args.to });
  } catch (err: any) {
    return JSON.stringify({ status: 'error', message: err.message });
  }
}
