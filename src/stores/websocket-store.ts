import { createWithEqualityFn } from 'zustand/traditional'

import { createHyperliquidWebSocketClient } from '../services/hyperliquid-ws'
import type { HyperliquidWebSocketClientOptions } from '../types'

type ConnectionStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error'

type WebSocketStore = {
  status: ConnectionStatus
  error: string | null
  params: Pick<HyperliquidWebSocketClientOptions, 'coin' | 'nSigFigs' | 'mantissa'>
  start: () => void
  stop: () => void
  updateParams: (p: Partial<WebSocketStore['params']>) => void
  addListener: (fn: (data: unknown) => void) => () => void
}

export const useWebSocketStore = createWithEqualityFn<WebSocketStore>((set, get) => {
  const client = createHyperliquidWebSocketClient({ coin: 'BTC', nSigFigs: null, mantissa: null })
  const listeners = new Set<(data: unknown) => void>()

  client.updateEvents({
    onOpen: () => set({ status: 'open', error: null }),
    onClose: () => set({ status: 'closed' }),
    onError: (e) => {
      let msg: string

      if (e instanceof ErrorEvent) {
        msg = e.message
      } else if (e instanceof CloseEvent) {
        msg = e.reason
      } else {
        msg = String(e)
      }

      set({ status: 'error', error: msg })
    },
    onMessage: (e) => {
      let data: unknown = e.data

      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
      } catch (err) {
        console.error(`Error parsing message: ${err}`)
      }

      listeners.forEach((fn) => fn(data))
    },
  })

  return {
    status: 'idle',
    error: null,
    params: { coin: 'BTC', nSigFigs: null, mantissa: null },

    start: () => {
      set({ status: 'connecting', error: null })
      client.start()
    },

    stop: () => {
      client.stop()
      set({ status: 'closed' })
    },

    updateParams: (p) => {
      const next = { ...get().params, ...p }
      set({ params: next })
      client.updateParams(next)
    },

    addListener: (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
  }
}, Object.is)
