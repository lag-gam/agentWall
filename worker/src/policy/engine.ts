// AgentFence — Core Policy Engine

import type { PolicyDecision, Session, ScenarioStep, RuleResult } from '../types';
import { ALL_RULES } from './rules';

export function evaluatePolicy(step: ScenarioStep, session: Session): PolicyDecision {
  const ctx = { step, session };

  // Run all rules
  const results: RuleResult[] = ALL_RULES.map(rule => rule(ctx));
  const triggered = results.filter(r => r.fired);

  // Composite risk score (capped at 100)
  let riskScore = Math.min(100, triggered.reduce((sum, r) => sum + r.riskContribution, 0));

  // Decision logic (priority order)
  let decision: PolicyDecision['decision'];
  let explanation: string;

  const isStop = triggered.some(r => r.ruleName === 'stopCommandActive');
  const isDestructive = triggered.some(r => r.ruleName === 'isDestructive');
  const isBulk = triggered.some(r => r.ruleName === 'isBulkAction');
  const isSensitive = triggered.some(r => r.ruleName === 'touchesSensitiveData');
  const isExternal = triggered.some(r => r.ruleName === 'affectsExternalSystem');
  const isReadOnly = isReadOnlyTool(step.toolName);

  // 1. Stop active → BLOCK everything
  if (isStop) {
    decision = 'BLOCK';
    explanation = 'User issued a stop command. All agent actions are blocked until resumed.';
  }
  // 2. Read-only + no sensitive data → ALLOW
  else if (isReadOnly && !isSensitive) {
    decision = 'ALLOW';
    riskScore = Math.min(riskScore, 10);
    explanation = `Read-only operation (${step.toolName}) with no sensitive data involved.`;
  }
  // 3. Destructive + bulk → BLOCK
  else if (isDestructive && isBulk) {
    decision = 'BLOCK';
    explanation = `Blocked: destructive bulk operation. ${triggered.map(r => r.reason).filter(Boolean).join('; ')}`;
  }
  // 4. Sensitive + external → BLOCK (data exfiltration pattern)
  else if (isSensitive && isExternal) {
    decision = 'BLOCK';
    explanation = `Blocked: potential data exfiltration. Sensitive data would be sent to external system. ${triggered.map(r => r.reason).filter(Boolean).join('; ')}`;
  }
  // 5. Threshold-based
  else if (riskScore >= 60) {
    decision = 'BLOCK';
    explanation = `Risk score ${riskScore} exceeds block threshold (60). ${triggered.map(r => r.reason).filter(Boolean).join('; ')}`;
  } else if (riskScore >= 30) {
    decision = 'REQUIRE_APPROVAL';
    explanation = `Risk score ${riskScore} requires human approval. ${triggered.map(r => r.reason).filter(Boolean).join('; ')}`;
  } else {
    decision = 'ALLOW';
    explanation = triggered.length > 0
      ? `Low risk (${riskScore}). ${triggered.map(r => r.reason).filter(Boolean).join('; ')}`
      : `No policy rules triggered. Operation appears safe.`;
  }

  return {
    decision,
    riskScore,
    triggeredRules: results,
    explanation,
  };
}

const READ_ONLY_TOOLS = new Set([
  'gmail.search',
  'gmail.read',
  'read_file',
  'list_files',
  'ls',
  'cat',
  'head',
  'query_database',
  'search',
  'get',
  'view',
]);

function isReadOnlyTool(toolName: string): boolean {
  const lower = toolName.toLowerCase();
  if (READ_ONLY_TOOLS.has(lower)) return true;
  if (lower.startsWith('read') || lower.startsWith('get') || lower.startsWith('list') || lower.startsWith('search')) return true;
  return false;
}
