// Stop/resume command detection from user messages

const STOP_PATTERNS = [
  /\bstop\b/i,
  /\bhalt\b/i,
  /\babort\b/i,
  /\bcancel\b/i,
  /\bpause\b/i,
  /\bdon'?t\s+(do|continue|proceed)/i,
  /\bwait\b/i,
  /\bhold\s+on\b/i,
  /\bno\s*!?\s*$/i,
  /\bstop\s+(that|this|it|now|immediately)\b/i,
];

const RESUME_PATTERNS = [
  /\bresume\b/i,
  /\bcontinue\b/i,
  /\bproceed\b/i,
  /\bgo\s+ahead\b/i,
  /\byes,?\s*(continue|proceed|go)/i,
  /\bunpause\b/i,
  /\bstart\s+again\b/i,
];

export type UserIntent = 'stop' | 'resume' | 'none';

export function detectIntent(message: string): UserIntent {
  const trimmed = message.trim();

  // Check resume first (more specific)
  for (const pattern of RESUME_PATTERNS) {
    if (pattern.test(trimmed)) return 'resume';
  }

  // Then check stop
  for (const pattern of STOP_PATTERNS) {
    if (pattern.test(trimmed)) return 'stop';
  }

  return 'none';
}
