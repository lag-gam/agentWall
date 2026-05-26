// Approval polling — waits for human approval via the Palisade dashboard

import type { PalisadeClient } from './client';

const DEFAULT_POLL_INTERVAL_MS = 1000;
const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Polls the Palisade worker for approval status.
 * Returns true if approved, false if denied or timed out.
 */
export async function pollForApproval(
  client: PalisadeClient,
  sessionId: string,
  toolCallId: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
  pollIntervalMs: number = DEFAULT_POLL_INTERVAL_MS,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const status = await client.checkApprovalStatus(sessionId, toolCallId);

      if (status === 'approved') return true;
      if (status === 'denied') return false;

      // Still pending — wait before next poll
    } catch (err) {
      // Network error — log and continue polling
      console.warn(`[palisade] Approval poll error: ${err}`);
    }

    await sleep(pollIntervalMs);
  }

  // Timed out waiting for approval
  console.warn(`[palisade] Approval timed out after ${timeoutMs}ms for tool call ${toolCallId}`);
  return false;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
