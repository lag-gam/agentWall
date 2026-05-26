// Palisade OpenClaw Plugin — Runtime guardrails for AI agents
//
// Usage in openclaw.json:
//   { "plugins": ["palisade-openclaw"] }
//
// Environment:
//   PALISADE_URL     — Palisade worker URL (default: http://localhost:8787)
//   PALISADE_API_KEY — Optional API key for authentication
//   PALISADE_SOURCE  — Agent source identifier (default: "openclaw")
//   PALISADE_TIMEOUT — Approval timeout in ms (default: 300000 = 5 min)

import { PalisadeClient } from './client';
import { pollForApproval } from './approval';
import type {
  OpenClawPlugin,
  OpenClawPluginContext,
  OpenClawHookResult,
} from './types';

// Re-export types for consumers
export { PalisadeClient } from './client';
export { pollForApproval } from './approval';
export type { PolicyResult, Decision, RuleResult, ApprovalStatus } from './types';

// Plugin state — lazy-initialized on first tool call
let client: PalisadeClient | null = null;
let sessionId: string | null = null;
let stepCounter = 0;

function getClient(): PalisadeClient {
  if (!client) {
    const baseUrl = process.env.PALISADE_URL || 'http://localhost:8787';
    const apiKey = process.env.PALISADE_API_KEY;
    client = new PalisadeClient(baseUrl, apiKey);
  }
  return client;
}

async function ensureSession(): Promise<string> {
  if (sessionId) return sessionId;

  const c = getClient();
  const source = process.env.PALISADE_SOURCE || 'openclaw';
  const session = await c.createSession(source);
  sessionId = session.id;

  console.log(`[palisade] Session created: ${sessionId}`);
  console.log(`[palisade] Dashboard: open the Palisade frontend and connect to this session`);

  return sessionId;
}

/**
 * The before_tool_call hook — evaluates every tool call against Palisade's policy engine.
 *
 * Returns:
 *   undefined          → ALLOW (pass-through, let the tool execute)
 *   { block: true }    → BLOCK (prevent tool execution)
 *   { requireApproval} → REQUIRE_APPROVAL (wait for human approval in dashboard)
 */
async function beforeToolCall(ctx: OpenClawPluginContext): Promise<OpenClawHookResult> {
  try {
    const sid = await ensureSession();
    const c = getClient();
    const currentStep = stepCounter++;

    // Send agent reasoning to dashboard
    await c.sendAgentMessage(sid, 'agent', `Executing: ${ctx.toolName}`).catch(() => {});

    // Evaluate against policy engine
    const result = await c.evaluate(
      sid,
      ctx.toolName,
      ctx.toolArgs,
      `Agent calling ${ctx.toolName}`,
      currentStep,
    );

    console.log(
      `[palisade] ${ctx.toolName} → ${result.decision} (risk: ${result.riskScore})` +
      (result.explanation ? ` — ${result.explanation}` : ''),
    );

    switch (result.decision) {
      case 'ALLOW':
        return undefined; // pass-through

      case 'BLOCK':
        return {
          block: true,
          blockReason: `[Palisade] BLOCKED (risk score: ${result.riskScore}): ${result.explanation}`,
        };

      case 'REQUIRE_APPROVAL': {
        console.log(`[palisade] Waiting for approval in dashboard for: ${ctx.toolName}`);

        const timeoutMs = parseInt(process.env.PALISADE_TIMEOUT || '300000', 10);
        const approved = await pollForApproval(c, sid, result.toolCallId, timeoutMs);

        if (approved) {
          console.log(`[palisade] Approved: ${ctx.toolName}`);
          return undefined; // pass-through after approval
        }

        return {
          block: true,
          blockReason: `[Palisade] Not approved within timeout: ${ctx.toolName}`,
        };
      }

      default:
        return undefined;
    }
  } catch (err) {
    // If Palisade is unreachable, fail open with a warning
    console.error(`[palisade] Error evaluating ${ctx.toolName}:`, err);
    console.warn('[palisade] Failing open — tool call will proceed without policy check');
    return undefined;
  }
}

/**
 * The after_tool_call hook — reports tool results back to Palisade for audit trail.
 */
async function afterToolCall(ctx: OpenClawPluginContext & { result: unknown }): Promise<void> {
  if (!sessionId) return;

  try {
    const c = getClient();
    const resultStr = typeof ctx.result === 'string'
      ? ctx.result
      : JSON.stringify(ctx.result, null, 2);

    // Report result (best-effort, don't block the agent)
    await c.reportToolResult(sessionId, ctx.toolName, resultStr).catch(() => {});
  } catch {
    // Non-critical — don't interrupt the agent
  }
}

/**
 * The plugin export — register hooks with OpenClaw.
 */
const plugin: OpenClawPlugin = {
  name: 'palisade',
  version: '0.1.0',
  hooks: {
    before_tool_call: beforeToolCall,
    after_tool_call: afterToolCall,
  },
};

export default plugin;
