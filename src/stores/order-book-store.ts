import { createWithEqualityFn } from 'zustand/traditional'

import type { SymbolOption, WsLevel } from '../types'

type OrderBookStore = {
  selectedSymbol: SymbolOption
  setSelectedSymbol: (val: SymbolOption) => void
  selectedPrecision: string | null
  setSelectedPrecision: (val: string | null) => void
  selectedAmountType: 'amount' | 'usd'
  setSelectedAmountType: (val: 'amount' | 'usd') => void
  bids: WsLevel[]
  setBids: (val: WsLevel[]) => void
  asks: WsLevel[]
  setAsks: (val: WsLevel[]) => void
  clearData: () => void
}

export const useOrderBookStore = createWithEqualityFn<OrderBookStore>(
  (set) => ({
    selectedSymbol: 'BTC',
    setSelectedSymbol: (val) => set({ selectedSymbol: val }),
    selectedPrecision: '1',
    setSelectedPrecision: (val) => set({ selectedPrecision: val }),
    selectedAmountType: 'amount',
    setSelectedAmountType: (val) => set({ selectedAmountType: val }),
    bids: [],
    setBids: (val) => set({ bids: val }),
    asks: [],
    setAsks: (val) => set({ asks: val }),
    clearData: () => set({ bids: [], asks: [] }),
  }),
  Object.is,
)
