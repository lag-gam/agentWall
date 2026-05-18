// AgentFence — Canonical Type Definitions

export type Decision = 'ALLOW' | 'BLOCK' | 'REQUIRE_APPROVAL';

export type SessionStatus = 'active' | 'paused' | 'completed';

export interface RuleResult {
  ruleName: string;
  fired: boolean;
  riskContribution: number;
  reason: string;
}

export interface PolicyDecision {
  decision: Decision;
  riskScore: number;
  triggeredRules: RuleResult[];
  explanation: string;
}

export interface ToolCall {
  id: string;
  sessionId: string;
  stepIndex: number;
  toolName: string;
  toolArgs: Record<string, unknown>;
  decision: Decision;
  riskScore: number;
  triggeredRules: RuleResult[];
  explanation: string;
  result?: string | null;
  createdAt: string;
}

export interface Session {
  id: string;
  scenarioId: string;
  status: SessionStatus;
  currentStep: number;
  approvalsGranted: string[];
  sensitiveFilesAccessed: string[];
  chatMessages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: 'agent' | 'user' | 'system';
  content: string;
  timestamp: string;
  toolCallId?: string;
}

export interface ScenarioStep {
  toolName: string;
  toolArgs: Record<string, unknown>;
  agentReasoning: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: ScenarioStep[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  category: 'read' | 'write' | 'delete' | 'execute' | 'send';
  parameters: Record<string, { type: string; description: string }>;
}

// WebSocket event types
export type WSEvent =
  | { type: 'tool_call'; data: ToolCall }
  | { type: 'chat_message'; data: ChatMessage }
  | { type: 'session_update'; data: Partial<Session> }
  | { type: 'connected'; data: { sessionId: string } };

// D1 row types (snake_case from DB)
export interface SessionRow {
  id: string;
  scenario_id: string;
  status: string;
  current_step: number;
  approvals_granted: string;
  sensitive_files_accessed: string;
  chat_messages: string;
  created_at: string;
  updated_at: string;
}

export interface ToolCallRow {
  id: string;
  session_id: string;
  step_index: number;
  tool_name: string;
  tool_args: string;
  decision: string;
  risk_score: number;
  triggered_rules: string;
  explanation: string;
  result: string | null;
  created_at: string;
}

export interface Env {
  DB: D1Database;
  SESSION_STREAM: DurableObjectNamespace;
  AGENT_SERVER_URL: string;
}
