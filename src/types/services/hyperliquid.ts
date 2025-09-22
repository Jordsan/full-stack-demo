export type SymbolOption = 'BTC' | 'ETH'

export interface PrecisionConfig {
  nSigFigs: number | null
  mantissa: number | null
  value: number
}

export interface WsBook {
  coin: string
  levels: [Array<WsLevel>, Array<WsLevel>]
  time: number
}

export interface WsLevel {
  px: string // price
  sz: string // size
  n: number // number of orders
}

export interface SubscriptionMessage {
  method: 'subscribe'
  subscription: {
    type: 'l2Book'
    coin: string
    nSigFigs: number | null
    mantissa: number | null
  }
}

export interface UnsubscribeMessage {
  method: 'unsubscribe'
  subscription: {
    type: 'l2Book'
    coin: string
    nSigFigs: number | null
    mantissa: number | null
  }
}

export interface WsL2BookMessage {
  channel: 'l2Book'
  data: {
    coin: string
    time: number
    levels: [WsLevel[], WsLevel[]]
  }
}

export type HyperliquidWebSocketClientOptions = {
  url?: string
  coin: string
  nSigFigs: number | null
  mantissa: number | null
}
