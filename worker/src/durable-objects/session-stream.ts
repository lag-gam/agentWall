// SessionStream Durable Object — WebSocket Hibernation for live streaming

import type { WSEvent } from '../types';

export class SessionStream implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState, _env: unknown) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/websocket') {
      if (request.headers.get('Upgrade') !== 'websocket') {
        return new Response('Expected WebSocket', { status: 426 });
      }

      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      this.state.acceptWebSocket(server);

      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname === '/broadcast' && request.method === 'POST') {
      const event = await request.json() as WSEvent;
      this.broadcastEvent(event);
      return new Response('OK');
    }

    return new Response('Not found', { status: 404 });
  }

  webSocketMessage(_ws: WebSocket, _message: string | ArrayBuffer): void {
    // Client messages not needed for this MVP — one-way broadcast
  }

  webSocketClose(ws: WebSocket, _code: number, _reason: string, _wasClean: boolean): void {
    ws.close();
  }

  webSocketError(ws: WebSocket, _error: unknown): void {
    ws.close();
  }

  private broadcastEvent(event: WSEvent): void {
    const message = JSON.stringify(event);
    for (const ws of this.state.getWebSockets()) {
      try {
        ws.send(message);
      } catch {
        // Socket already closed
      }
    }
  }
}
