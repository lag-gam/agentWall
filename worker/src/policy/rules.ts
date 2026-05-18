// AgentFence — 6 Policy Rules

import type { RuleResult, Session, ScenarioStep } from '../types';
import { checkFileName, checkContent } from './sensitive-data';

interface RuleContext {
  step: ScenarioStep;
  session: Session;
}

// Rule 1: isDestructive — checks for destructive operations
export function isDestructive(ctx: RuleContext): RuleResult {
  const { step } = ctx;
  const name = step.toolName.toLowerCase();

  // Destructive tool names
  const destructiveTools = ['delete', 'trash', 'remove', 'drop', 'destroy', 'rm', 'purge'];
  const isDestructiveName = destructiveTools.some(t => name.includes(t));

  // Shell command patterns
  const args = JSON.stringify(step.toolArgs).toLowerCase();
  const dangerousShellPatterns = [
    /rm\s+(-rf?|--recursive)/,
    /del\s+\/[sfq]/i,
    /format\s+[a-z]:/i,
    /drop\s+(table|database)/i,
    /truncate\s+table/i,
    />\s*\/dev\/null/,
    /mkfs\./,
    /dd\s+if=/,
  ];
  const hasDangerousShell = dangerousShellPatterns.some(p => p.test(args));

  const fired = isDestructiveName || hasDangerousShell;

  return {
    ruleName: 'isDestructive',
    fired,
    riskContribution: fired ? 40 : 0,
    reason: fired
      ? `Destructive operation detected: ${isDestructiveName ? step.toolName : 'dangerous shell command'}`
      : '',
  };
}

// Rule 2: isBulkAction — checks for bulk/mass operations
export function isBulkAction(ctx: RuleContext): RuleResult {
  const { step } = ctx;
  const name = step.toolName.toLowerCase();
  const args = step.toolArgs;

  const isBulkName = name.includes('_bulk') || name.includes('_all') || name.includes('batch');
  const hasHighCount = typeof args.count === 'number' && args.count > 10;
  const hasSelectAll = typeof args.query === 'string' &&
    /select\s+\*\s+from/i.test(args.query as string);
  const hasLargeList = Array.isArray(args.ids) && (args.ids as unknown[]).length > 10;

  const fired = isBulkName || hasHighCount || hasSelectAll || hasLargeList;

  return {
    ruleName: 'isBulkAction',
    fired,
    riskContribution: fired ? 25 : 0,
    reason: fired
      ? `Bulk operation: ${isBulkName ? 'bulk tool name' : hasHighCount ? `count=${args.count}` : hasSelectAll ? 'SELECT *' : 'large ID list'}`
      : '',
  };
}

// Rule 3: touchesSensitiveData — checks for PII/medical/financial data
export function touchesSensitiveData(ctx: RuleContext): RuleResult {
  const { step, session } = ctx;
  const args = JSON.stringify(step.toolArgs);

  // Check file arguments
  const fileName = (step.toolArgs.file || step.toolArgs.path || step.toolArgs.filename || '') as string;
  const fileCheck = fileName ? checkFileName(fileName) : { isSensitive: false, categories: [], matchedPatterns: [] };

  // Check content in arguments
  const contentCheck = checkContent(args);

  // Check if session has previously accessed sensitive files
  const hasSensitiveHistory = session.sensitiveFilesAccessed.length > 0;

  // Check if tool args reference previously accessed sensitive files
  const refsSensitiveFile = session.sensitiveFilesAccessed.some(f =>
    args.toLowerCase().includes(f.toLowerCase())
  );

  const fired = fileCheck.isSensitive || contentCheck.isSensitive || refsSensitiveFile;
  const categories = [...new Set([...fileCheck.categories, ...contentCheck.categories])];

  return {
    ruleName: 'touchesSensitiveData',
    fired,
    riskContribution: fired ? 30 : 0,
    reason: fired
      ? `Sensitive data (${categories.join(', ')}): ${[...fileCheck.matchedPatterns, ...contentCheck.matchedPatterns].join(', ')}${refsSensitiveFile ? ' + references previously accessed sensitive file' : ''}`
      : (hasSensitiveHistory ? 'Session has sensitive data history (not directly triggered)' : ''),
  };
}

// Rule 4: affectsExternalSystem — checks for external communication
export function affectsExternalSystem(ctx: RuleContext): RuleResult {
  const { step } = ctx;
  const name = step.toolName.toLowerCase();

  const externalTools: Record<string, number> = {
    'send_email': 30,
    'post_slack': 20,
    'post_webhook': 25,
    'upload_file': 20,
    'publish': 25,
    'share_document': 15,
    'api_call': 20,
  };

  let matchedTool = '';
  let risk = 0;
  for (const [tool, r] of Object.entries(externalTools)) {
    if (name.includes(tool) || name === tool) {
      matchedTool = tool;
      risk = r;
      break;
    }
  }

  // Also check for URLs in args that suggest external calls
  const args = JSON.stringify(step.toolArgs);
  const hasExternalUrl = /https?:\/\/[^\s"]+/.test(args) && !matchedTool;
  if (hasExternalUrl && !matchedTool) {
    matchedTool = 'external URL in args';
    risk = 15;
  }

  const fired = risk > 0;

  return {
    ruleName: 'affectsExternalSystem',
    fired,
    riskContribution: risk,
    reason: fired ? `Affects external system: ${matchedTool}` : '',
  };
}

// Rule 5: lacksRecentApproval — modifier if no approval on file
export function lacksRecentApproval(ctx: RuleContext): RuleResult {
  const { session } = ctx;
  const hasApproval = session.approvalsGranted.length > 0;

  // This is a modifier — only applies additional risk if other rules fired
  return {
    ruleName: 'lacksRecentApproval',
    fired: !hasApproval,
    riskContribution: 0, // modifier only, doesn't add risk on its own
    reason: !hasApproval
      ? 'No approvals granted in this session'
      : `Has ${session.approvalsGranted.length} approval(s)`,
  };
}

// Rule 6: stopCommandActive — user requested stop
export function stopCommandActive(ctx: RuleContext): RuleResult {
  const { session } = ctx;
  const fired = session.status === 'paused';

  return {
    ruleName: 'stopCommandActive',
    fired,
    riskContribution: fired ? 100 : 0,
    reason: fired
      ? 'User issued stop command — all actions blocked'
      : '',
  };
}

export const ALL_RULES = [
  isDestructive,
  isBulkAction,
  touchesSensitiveData,
  affectsExternalSystem,
  lacksRecentApproval,
  stopCommandActive,
];
