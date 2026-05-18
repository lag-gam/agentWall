// Scenario registry

import type { Scenario } from '../types';
import { inboxCleanup } from './inbox-cleanup';
import { medicalLeak } from './medical-leak';
import { shellDisaster } from './shell-disaster';
import { financeExport } from './finance-export';

const SCENARIOS: Record<string, Scenario> = {
  'inbox-cleanup': inboxCleanup,
  'medical-leak': medicalLeak,
  'shell-disaster': shellDisaster,
  'finance-export': financeExport,
};

export function listScenarios(): Scenario[] {
  return Object.values(SCENARIOS);
}

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS[id];
}
