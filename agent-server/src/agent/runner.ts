import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './system-prompt.js';
import { TOOL_DEFINITIONS } from './tool-definitions.js';
import { executeToolLocally } from '../tools/registry.js';

const client = new Anthropic();

const MAX_ITERATIONS = 20;

interface RunConfig {
  sessionId: string;
  prompt: string;
  workerUrl: string;
}

async function callWorker(url: string, body: Record<string, unknown>): Promise<any> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function waitForApproval(
  workerUrl: string,
  sessionId: string,
  toolCallId: string,
  timeoutMs: number,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const session = await fetch(`${workerUrl}/api/sessions/${sessionId}`).then(r => r.json()) as any;
    if (session.status === 'paused') return false;
    if (session.approvalsGranted?.includes(toolCallId)) return true;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return false;
}

export async function runAgent(config: RunConfig): Promise<void> {
  const { sessionId, prompt, workerUrl } = config;

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: prompt },
  ];

  let stepIndex = 0;

  try {
    while (stepIndex < MAX_ITERATIONS) {
      // Check if session was stopped
      const session = await fetch(`${workerUrl}/api/sessions/${sessionId}`).then(r => r.json()) as any;
      if (session.status === 'paused' || session.status === 'completed') {
        console.log(`[Agent] Session ${sessionId} is ${session.status}, stopping.`);
        break;
      }

      // Call Claude
      console.log(`[Agent] Calling Claude (step ${stepIndex})...`);
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        tools: TOOL_DEFINITIONS,
        messages,
      });

      // Add assistant response to conversation
      messages.push({ role: 'assistant', content: response.content });

      // Extract text blocks for agent reasoning
      const textBlocks = response.content.filter(
        (b): b is Anthropic.TextBlock => b.type === 'text',
      );
      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
      );

      // Send agent reasoning to worker for display
      const reasoning = textBlocks.map(b => b.text).join('\n');
      if (reasoning) {
        await callWorker(`${workerUrl}/api/sessions/${sessionId}/agent-message`, {
          role: 'agent',
          content: reasoning,
        });
      }

      // If no tool calls, agent is done
      if (response.stop_reason === 'end_turn' || toolUseBlocks.length === 0) {
        console.log(`[Agent] Done (stop_reason: ${response.stop_reason})`);
        break;
      }

      // Process each tool call
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const toolUse of toolUseBlocks) {
        console.log(`[Agent] Tool call: ${toolUse.name}`, toolUse.input);

        // Evaluate through worker policy engine
        const policyResult = await callWorker(
          `${workerUrl}/api/sessions/${sessionId}/evaluate`,
          {
            toolName: toolUse.name,
            toolArgs: toolUse.input,
            agentReasoning: reasoning || `Calling ${toolUse.name}`,
            stepIndex,
          },
        );

        stepIndex++;
        console.log(`[Agent] Policy: ${policyResult.decision} (risk: ${policyResult.riskScore})`);

        if (policyResult.decision === 'ALLOW') {
          // Execute tool locally
          const result = await executeToolLocally(
            toolUse.name,
            toolUse.input as Record<string, unknown>,
          );

          // Report result to worker
          await callWorker(`${workerUrl}/api/sessions/${sessionId}/tool-result`, {
            toolCallId: policyResult.toolCallId,
            result,
          });

          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: result,
          });
        } else if (policyResult.decision === 'BLOCK') {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: `BLOCKED by AgentFence: ${policyResult.explanation}. Try a different approach or a less risky action.`,
            is_error: true,
          });
        } else if (policyResult.decision === 'REQUIRE_APPROVAL') {
          console.log(`[Agent] Waiting for approval on ${policyResult.toolCallId}...`);

          const approved = await waitForApproval(
            workerUrl,
            sessionId,
            policyResult.toolCallId,
            120_000,
          );

          if (approved) {
            const result = await executeToolLocally(
              toolUse.name,
              toolUse.input as Record<string, unknown>,
            );

            await callWorker(`${workerUrl}/api/sessions/${sessionId}/tool-result`, {
              toolCallId: policyResult.toolCallId,
              result,
            });

            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: result,
            });
          } else {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: 'Action was not approved by the user. Try a different approach.',
              is_error: true,
            });
          }
        }
      }

      // Add tool results to conversation
      messages.push({ role: 'user', content: toolResults });
    }

    if (stepIndex >= MAX_ITERATIONS) {
      await callWorker(`${workerUrl}/api/sessions/${sessionId}/agent-message`, {
        role: 'system',
        content: 'Agent reached maximum step limit (20). Stopping.',
      });
    }
  } catch (err: any) {
    console.error(`[Agent] Error:`, err);
    await callWorker(`${workerUrl}/api/sessions/${sessionId}/agent-message`, {
      role: 'system',
      content: `Agent error: ${err.message}`,
    }).catch(() => {});
  }

  // Signal done
  await callWorker(`${workerUrl}/api/sessions/${sessionId}/agent-done`, {}).catch(() => {});
  console.log(`[Agent] Session ${sessionId} complete.`);
}
