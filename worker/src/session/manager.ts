// Session CRUD manager for D1

import type { Session, SessionRow } from '../types';

function rowToSession(row: SessionRow): Session {
  return {
    id: row.id,
    scenarioId: row.scenario_id,
    status: row.status as Session['status'],
    currentStep: row.current_step,
    approvalsGranted: JSON.parse(row.approvals_granted),
    sensitiveFilesAccessed: JSON.parse(row.sensitive_files_accessed),
    chatMessages: JSON.parse(row.chat_messages),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createSession(db: D1Database, scenarioId: string): Promise<Session> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.prepare(
    `INSERT INTO sessions (id, scenario_id, status, current_step, approvals_granted, sensitive_files_accessed, chat_messages, created_at, updated_at)
     VALUES (?, ?, 'active', 0, '[]', '[]', '[]', ?, ?)`
  ).bind(id, scenarioId, now, now).run();

  return {
    id,
    scenarioId,
    status: 'active',
    currentStep: 0,
    approvalsGranted: [],
    sensitiveFilesAccessed: [],
    chatMessages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export async function getSession(db: D1Database, sessionId: string): Promise<Session | null> {
  const row = await db.prepare('SELECT * FROM sessions WHERE id = ?')
    .bind(sessionId)
    .first<SessionRow>();

  return row ? rowToSession(row) : null;
}

export async function updateSession(
  db: D1Database,
  sessionId: string,
  updates: Partial<Pick<Session, 'status' | 'currentStep' | 'approvalsGranted' | 'sensitiveFilesAccessed' | 'chatMessages'>>
): Promise<void> {
  const sets: string[] = [];
  const values: unknown[] = [];

  if (updates.status !== undefined) {
    sets.push('status = ?');
    values.push(updates.status);
  }
  if (updates.currentStep !== undefined) {
    sets.push('current_step = ?');
    values.push(updates.currentStep);
  }
  if (updates.approvalsGranted !== undefined) {
    sets.push('approvals_granted = ?');
    values.push(JSON.stringify(updates.approvalsGranted));
  }
  if (updates.sensitiveFilesAccessed !== undefined) {
    sets.push('sensitive_files_accessed = ?');
    values.push(JSON.stringify(updates.sensitiveFilesAccessed));
  }
  if (updates.chatMessages !== undefined) {
    sets.push('chat_messages = ?');
    values.push(JSON.stringify(updates.chatMessages));
  }

  sets.push("updated_at = datetime('now')");

  if (sets.length === 0) return;

  await db.prepare(
    `UPDATE sessions SET ${sets.join(', ')} WHERE id = ?`
  ).bind(...values, sessionId).run();
}
