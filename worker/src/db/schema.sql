-- AgentFence D1 Schema

DROP TABLE IF EXISTS approvals;
DROP TABLE IF EXISTS tool_calls;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS fake_files;
DROP TABLE IF EXISTS fake_emails;

CREATE TABLE fake_emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  date TEXT NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0,
  labels TEXT NOT NULL DEFAULT '["inbox"]',
  has_attachment INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE fake_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  content TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'text/plain',
  size_bytes INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  modified_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  scenario_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  current_step INTEGER NOT NULL DEFAULT 0,
  approvals_granted TEXT NOT NULL DEFAULT '[]',
  sensitive_files_accessed TEXT NOT NULL DEFAULT '[]',
  chat_messages TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE tool_calls (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  step_index INTEGER NOT NULL,
  tool_name TEXT NOT NULL,
  tool_args TEXT NOT NULL DEFAULT '{}',
  decision TEXT NOT NULL,
  risk_score INTEGER NOT NULL DEFAULT 0,
  triggered_rules TEXT NOT NULL DEFAULT '[]',
  explanation TEXT NOT NULL DEFAULT '',
  result TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE approvals (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  tool_call_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id),
  FOREIGN KEY (tool_call_id) REFERENCES tool_calls(id)
);

CREATE INDEX idx_tool_calls_session ON tool_calls(session_id);
CREATE INDEX idx_approvals_session ON approvals(session_id);
CREATE INDEX idx_fake_emails_labels ON fake_emails(labels);
