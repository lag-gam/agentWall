import { useEffect } from 'react';
import type { ScenarioSummary, ExternalSession } from '../types';

const SUGGESTED_PROMPTS = [
  {
    label: 'Clean up inbox',
    prompt: 'Clean up my email inbox — archive old newsletters and delete spam',
    color: '#3b82f6',
  },
  {
    label: 'Back up medical records',
    prompt: 'Back up my medical records to backup@datastore.io',
    color: '#ef4444',
  },
  {
    label: 'Free up disk space',
    prompt: 'Check disk usage and free up space by removing unnecessary files',
    color: '#f59e0b',
  },
  {
    label: 'Export financial data',
    prompt: 'Export financial data and email a summary to accountant@firm.com',
    color: '#8b5cf6',
  },
];

interface ScenarioSelectorProps {
  scenarios: ScenarioSummary[];
  externalSessions: ExternalSession[];
  activeScenarioId: string | null;
  activeSessionId: string | null;
  onSelect: (scenarioId: string) => void;
  onStartAgent: (prompt: string) => void;
  onConnectExternal: (sessionId: string) => void;
  onRefreshExternal: () => void;
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function ScenarioSelector({
  scenarios,
  externalSessions,
  activeScenarioId,
  activeSessionId,
  onSelect,
  onStartAgent,
  onConnectExternal,
  onRefreshExternal,
}: ScenarioSelectorProps) {
  // Poll for external sessions every 5 seconds
  useEffect(() => {
    onRefreshExternal();
    const interval = setInterval(onRefreshExternal, 5000);
    return () => clearInterval(interval);
  }, [onRefreshExternal]);

  const activeSessions = externalSessions.filter(s => s.status === 'active');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Live external sessions */}
      {activeSessions.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', color: '#22c55e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            Live Sessions
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {activeSessions.map(s => {
              const source = s.scenarioId.replace('external:', '');
              const isActive = activeSessionId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onConnectExternal(s.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: isActive
                      ? '1px solid #22c55e'
                      : '1px solid #065f4633',
                    background: isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.08)',
                    color: '#e5e7eb',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  title={`External session from ${source} — ${s.toolCallCount} tool calls`}
                >
                  <span style={{
                    padding: '1px 5px',
                    borderRadius: '3px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    fontSize: '10px',
                    fontWeight: 600,
                  }}>
                    {source}
                  </span>
                  <span style={{ opacity: 0.6, fontSize: '10px' }}>
                    {s.toolCallCount} calls
                  </span>
                  <span style={{ opacity: 0.4, fontSize: '10px' }}>
                    {formatTimeAgo(s.createdAt)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggested prompts for agent mode */}
      <div>
        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Try a prompt
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {SUGGESTED_PROMPTS.map(p => (
            <button
              key={p.label}
              onClick={() => onStartAgent(p.prompt)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${p.color}33`,
                background: `${p.color}15`,
                color: '#e5e7eb',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s',
              }}
              title={p.prompt}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scripted scenarios */}
      <div>
        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Scripted demos
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: activeScenarioId === s.id
                  ? '1px solid #3b82f6'
                  : '1px solid #374151',
                background: activeScenarioId === s.id ? 'rgba(59, 130, 246, 0.15)' : '#1f2937',
                color: '#e5e7eb',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title={s.description}
            >
              <span style={{ fontSize: '14px' }}>{s.icon}</span>
              <span>{s.name}</span>
              <span style={{ opacity: 0.4, fontSize: '10px' }}>({s.stepCount})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
