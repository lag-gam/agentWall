import type { ScenarioSummary } from '../types';

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
  activeScenarioId: string | null;
  onSelect: (scenarioId: string) => void;
  onStartAgent: (prompt: string) => void;
}

export function ScenarioSelector({ scenarios, activeScenarioId, onSelect, onStartAgent }: ScenarioSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
