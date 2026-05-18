import { useState, useCallback, useRef } from 'react';
import type { Session, ToolCall, ChatMessage, ScenarioSummary, WSEvent } from '../types';
import { useWebSocket } from './useWebSocket';

const API = '/api';

interface SessionState {
  session: Session | null;
  toolCalls: ToolCall[];
  scenarios: ScenarioSummary[];
  selectedToolCall: ToolCall | null;
  stepping: boolean;
  autoPlay: boolean;
  error: string | null;
}

export function useSession() {
  const [state, setState] = useState<SessionState>({
    session: null,
    toolCalls: [],
    scenarios: [],
    selectedToolCall: null,
    stepping: false,
    autoPlay: false,
    error: null,
  });

  const autoPlayRef = useRef(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWSEvent = useCallback((event: WSEvent) => {
    switch (event.type) {
      case 'tool_call':
        setState(prev => {
          const existing = prev.toolCalls.findIndex(tc => tc.id === event.data.id);
          const toolCalls = existing >= 0
            ? prev.toolCalls.map((tc, i) => i === existing ? event.data : tc)
            : [...prev.toolCalls, event.data];
          return { ...prev, toolCalls };
        });
        break;
      case 'chat_message':
        setState(prev => {
          if (!prev.session) return prev;
          return {
            ...prev,
            session: {
              ...prev.session,
              chatMessages: [...prev.session.chatMessages, event.data],
            },
          };
        });
        break;
      case 'session_update':
        setState(prev => {
          if (!prev.session) return prev;
          return {
            ...prev,
            session: { ...prev.session, ...event.data },
          };
        });
        break;
    }
  }, []);

  useWebSocket(state.session?.id ?? null, handleWSEvent);

  const fetchScenarios = useCallback(async () => {
    try {
      const res = await fetch(`${API}/scenarios`);
      const data = await res.json() as ScenarioSummary[];
      setState(prev => ({ ...prev, scenarios: data }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to fetch scenarios' }));
    }
  }, []);

  const createSession = useCallback(async (scenarioId: string) => {
    try {
      // Stop any running auto-play
      autoPlayRef.current = false;
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }

      const res = await fetch(`${API}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId }),
      });
      const session = await res.json() as Session;
      setState(prev => ({
        ...prev,
        session,
        toolCalls: [],
        selectedToolCall: null,
        stepping: false,
        autoPlay: false,
        error: null,
      }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to create session' }));
    }
  }, []);

  const startAgent = useCallback(async (prompt: string) => {
    try {
      autoPlayRef.current = false;
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }

      const res = await fetch(`${API}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const session = await res.json() as Session;
      setState(prev => ({
        ...prev,
        session,
        toolCalls: [],
        selectedToolCall: null,
        stepping: false,
        autoPlay: false,
        error: null,
      }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to start agent' }));
    }
  }, []);

  const step = useCallback(async () => {
    if (!state.session) return;

    setState(prev => ({ ...prev, stepping: true }));

    try {
      const res = await fetch(`${API}/sessions/${state.session.id}/step`, {
        method: 'POST',
      });
      const data = await res.json();

      if ('done' in data) {
        setState(prev => ({
          ...prev,
          stepping: false,
          autoPlay: false,
          session: prev.session ? { ...prev.session, status: 'completed' } : null,
        }));
        autoPlayRef.current = false;
        return;
      }

      const toolCall = data as ToolCall;
      setState(prev => ({
        ...prev,
        toolCalls: [...prev.toolCalls, toolCall],
        selectedToolCall: toolCall,
        stepping: false,
        session: prev.session
          ? { ...prev.session, currentStep: prev.session.currentStep + 1 }
          : null,
      }));

      // Refresh session state from server
      const sessionRes = await fetch(`${API}/sessions/${state.session.id}`);
      const updatedSession = await sessionRes.json() as Session;
      setState(prev => ({ ...prev, session: updatedSession }));

      // Continue auto-play if active
      if (autoPlayRef.current) {
        autoPlayTimerRef.current = setTimeout(() => {
          if (autoPlayRef.current) {
            step();
          }
        }, 1500);
      }
    } catch (err) {
      setState(prev => ({ ...prev, stepping: false, error: 'Step failed' }));
    }
  }, [state.session]);

  const sendMessage = useCallback(async (message: string) => {
    if (!state.session) return;

    try {
      const res = await fetch(`${API}/sessions/${state.session.id}/user-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json() as { intent: string; status: string };

      // Refresh session
      const sessionRes = await fetch(`${API}/sessions/${state.session.id}`);
      const updatedSession = await sessionRes.json() as Session;
      setState(prev => ({ ...prev, session: updatedSession }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to send message' }));
    }
  }, [state.session]);

  const approve = useCallback(async (toolCallId: string) => {
    if (!state.session) return;

    try {
      await fetch(`${API}/sessions/${state.session.id}/approve/${toolCallId}`, {
        method: 'POST',
      });

      setState(prev => ({
        ...prev,
        toolCalls: prev.toolCalls.map(tc =>
          tc.id === toolCallId ? { ...tc, decision: 'ALLOW' as const } : tc
        ),
      }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to approve' }));
    }
  }, [state.session]);

  const selectToolCall = useCallback((tc: ToolCall | null) => {
    setState(prev => ({ ...prev, selectedToolCall: tc }));
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setState(prev => {
      const newAutoPlay = !prev.autoPlay;
      autoPlayRef.current = newAutoPlay;
      if (!newAutoPlay && autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return { ...prev, autoPlay: newAutoPlay };
    });

    // Start stepping if turning on
    if (!autoPlayRef.current) {
      // Was just toggled on in setState
      setTimeout(() => {
        if (autoPlayRef.current) step();
      }, 0);
    }
  }, [step]);

  const isAgentMode = state.session?.scenarioId === 'agent';
  const agentRunning = isAgentMode && state.session?.status === 'active';

  return {
    ...state,
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
  };
}
