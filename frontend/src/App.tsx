import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { AgentChat } from './components/AgentChat';
import { ToolCallStream } from './components/ToolCallStream';
import { DecisionDetail } from './components/DecisionDetail';
import { ScenarioSelector } from './components/ScenarioSelector';
import { useSession } from './hooks/useSession';

export default function App() {
  const {
    session,
    toolCalls,
    scenarios,
    selectedToolCall,
    stepping,
    autoPlay,
    error,
    isAgentMode,
    agentRunning,
    fetchScenarios,
    createSession,
    startAgent,
    step,
    sendMessage,
    approve,
    selectToolCall,
    toggleAutoPlay,
  } = useSession();

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  const scenarioComplete = session?.status === 'completed';

  const header = (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>&#x1f6e1;</span>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>AgentFence</h1>
          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '4px' }}>
            Runtime Guardrails for AI Agents
          </span>
        </div>
        {error && (
          <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>
        )}
      </div>
      <ScenarioSelector
        scenarios={scenarios}
        activeScenarioId={session?.scenarioId ?? null}
        onSelect={createSession}
        onStartAgent={startAgent}
      />
    </div>
  );

  return (
    <Layout
      header={header}
      left={
        <AgentChat
          messages={session?.chatMessages ?? []}
          sessionStatus={session?.status ?? null}
          stepping={stepping}
          autoPlay={autoPlay}
          scenarioComplete={scenarioComplete ?? false}
          isAgentMode={isAgentMode}
          agentRunning={agentRunning}
          onStep={step}
          onSendMessage={sendMessage}
          onToggleAutoPlay={toggleAutoPlay}
          onStartAgent={startAgent}
        />
      }
      middle={
        <ToolCallStream
          toolCalls={toolCalls}
          selectedId={selectedToolCall?.id ?? null}
          onSelect={selectToolCall}
        />
      }
      right={
        <DecisionDetail
          toolCall={selectedToolCall}
          session={session}
          onApprove={approve}
        />
      }
    />
  );
}
