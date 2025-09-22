import type { SubscriptionMessage, UnsubscribeMessage, HyperliquidWebSocketClientOptions } from '../types'

export type HyperliquidWebSocketClientEvents = {
  onOpen?: () => void
  onClose?: (event: CloseEvent) => void
  onError?: (event: Event) => void
  onMessage?: (event: MessageEvent) => void
}

export class HyperliquidWebSocketClient {
  private websocket: WebSocket | null = null
  private url: string
  private coin: string
  private nSigFigs: number | null
  private mantissa: number | null
  private isStarted: boolean = false

  private events: HyperliquidWebSocketClientEvents

  constructor(options: HyperliquidWebSocketClientOptions, events: HyperliquidWebSocketClientEvents = {}) {
    this.url = options.url ?? 'wss://api.hyperliquid.xyz/ws'
    this.coin = options.coin
    this.nSigFigs = options.nSigFigs
    this.mantissa = options.mantissa
    this.events = events
  }

  public start() {
    if (this.isStarted) {
      return
    }

    this.isStarted = true
    this.connectAndSubscribe()
  }

  public stop() {
    if (!this.isStarted) {
      return
    }

    this.isStarted = false
    this.disconnect()
  }

  public updateParams(params: Partial<Pick<HyperliquidWebSocketClientOptions, 'coin' | 'nSigFigs' | 'mantissa'>>) {
    const prev = { coin: this.coin, nSigFigs: this.nSigFigs, mantissa: this.mantissa }
    const next = {
      coin: params.coin ?? this.coin,
      nSigFigs: params.nSigFigs ?? null,
      mantissa: params.mantissa ?? null,
    }

    const changed = next.coin !== prev.coin || next.nSigFigs !== prev.nSigFigs || next.mantissa !== prev.mantissa

    this.coin = next.coin
    this.nSigFigs = next.nSigFigs
    this.mantissa = next.mantissa

    if (!this.isStarted || !changed) {
      return
    }

    // If socket is open, do in-place resubscribe; otherwise onopen will subscribe with latest params
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.sendUnsubscribe(prev)
      this.sendSubscribe(next)
    }
  }

  public updateEvents(events: HyperliquidWebSocketClientEvents) {
    this.events = { ...this.events, ...events }
  }

  private connectAndSubscribe() {
    this.disconnect()

    this.websocket = new WebSocket(this.url)

    this.websocket.onopen = () => {
      this.sendSubscribe()
      this.events.onOpen?.()
    }

    this.websocket.onclose = (event) => {
      this.events.onClose?.(event)
    }

    this.websocket.onerror = (event) => {
      this.events.onError?.(event)
    }

    this.websocket.onmessage = (event) => {
      this.events.onMessage?.(event)
    }
  }

  private disconnect() {
    if (this.websocket) {
      try {
        if (this.websocket.readyState === WebSocket.OPEN) {
          this.sendUnsubscribe()
        }
      } catch (err) {
        console.error(`Error sending unsubscribe message: ${err}`)
      }

      try {
        this.websocket.close()
      } catch (err) {
        console.error(`Error closing websocket: ${err}`)
      }

      this.websocket = null
    }
  }

  private sendSubscribe(params?: { coin: string; nSigFigs: number | null; mantissa: number | null }) {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      return
    }

    const payload = params ?? { coin: this.coin, nSigFigs: this.nSigFigs, mantissa: this.mantissa }

    const message: SubscriptionMessage = {
      method: 'subscribe',
      subscription: {
        type: 'l2Book',
        coin: payload.coin,
        nSigFigs: payload.nSigFigs,
        mantissa: payload.mantissa,
      },
    }

    this.websocket.send(JSON.stringify(message))
  }

  private sendUnsubscribe(params?: { coin: string; nSigFigs: number | null; mantissa: number | null }) {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      return
    }

    const payload = params ?? { coin: this.coin, nSigFigs: this.nSigFigs, mantissa: this.mantissa }

    const message: UnsubscribeMessage = {
      method: 'unsubscribe',
      subscription: {
        type: 'l2Book',
        coin: payload.coin,
        nSigFigs: payload.nSigFigs,
        mantissa: payload.mantissa,
      },
    }
    this.websocket.send(JSON.stringify(message))
  }
}

export const createHyperliquidWebSocketClient = (
  options: HyperliquidWebSocketClientOptions,
  events: HyperliquidWebSocketClientEvents = {},
) => new HyperliquidWebSocketClient(options, events)
