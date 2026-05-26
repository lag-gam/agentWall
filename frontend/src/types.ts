// Frontend type definitions — mirrors worker types

export type Decision = 'ALLOW' | 'BLOCK' | 'REQUIRE_APPROVAL';

export type SessionStatus = 'active' | 'paused' | 'completed';

export interface RuleResult {
  ruleName: string;
  fired: boolean;
  riskContribution: number;
  reason: string;
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

export interface ScenarioSummary {
  id: string;
  name: string;
  description: string;
  icon: string;
  stepCount: number;
}

export interface ExternalSession extends Session {
  toolCallCount: number;
}

export type WSEvent =
  | { type: 'tool_call'; data: ToolCall }
  | { type: 'chat_message'; data: ChatMessage }
  | { type: 'session_update'; data: Partial<Session> }
  | { type: 'connected'; data: { sessionId: string } };
