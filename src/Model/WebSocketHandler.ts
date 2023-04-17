export class WebSocketHandler {
  private ws: WebSocket | null;
  private reconnectInterval: ReturnType<typeof setInterval> | null;

  constructor(
    private url: string,
    private onOpen: () => void,
    private onMessage: (message: MessageEvent) => void,
    private onClose: (event: CloseEvent) => void,
    private onError: (event: Event) => void,
  ) {
    this.ws = null;
    this.reconnectInterval = null;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.onOpen();
    };

    this.ws.onmessage = message => {
      this.onMessage(message);
    };

    this.ws.onclose = event => {
      this.onClose(event);
    };

    this.ws.onerror = event => {
      this.onError(event);
      this.reconnect();
    };
  }

  private reconnect() {
    this.reconnectInterval = setInterval(() => {
      if (!this.ws) {
        this.connect();
      } else if (this.reconnectInterval) {
        clearInterval(this.reconnectInterval);
      }
    }, 3000);
  }
  public send(data: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }
  }
  public close() {
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
    }
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
  }
}
