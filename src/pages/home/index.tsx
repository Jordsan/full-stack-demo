import { shallow } from 'zustand/shallow'
import { Button, Select } from '@radix-ui/themes'

import OrderBook from '../../components/order-book'
import { useOrderBookStore } from '../../stores/order-book-store'
import { useWebSocketStore } from '../../stores/websocket-store'
import { HorizontalFlex, StyledSelectTrigger, VerticalFlex } from '../../common/ui'
import type { SymbolOption } from '../../types'

import { Header, SelectLabel } from './ui'

const Home = () => {
  const { selectedSymbol, setSelectedSymbol, setSelectedPrecision, clearData } = useOrderBookStore(
    (state) => ({
      selectedSymbol: state.selectedSymbol,
      setSelectedSymbol: state.setSelectedSymbol,
      setSelectedPrecision: state.setSelectedPrecision,
      clearData: state.clearData,
    }),
    shallow,
  )
  const { status, start, stop, updateParams } = useWebSocketStore(
    (state) => ({
      status: state.status,
      start: state.start,
      stop: state.stop,
      updateParams: state.updateParams,
    }),
    shallow,
  )

  const handleSymbolChange = (value: string) => {
    clearData()
    setSelectedSymbol(value as SymbolOption)
    setSelectedPrecision(value === 'BTC' ? '1' : '0.1')
    updateParams({ coin: value, nSigFigs: null, mantissa: null })
  }

  const handleDemoStartStop = () => {
    clearData()

    if (status === 'open' || status === 'connecting') {
      stop()
    } else {
      start()
    }
  }

  return (
    <VerticalFlex $padding="24px" $rowGap="12px">
      <HorizontalFlex $alignItems="center" $columnGap="24px">
        <Header>Order Book Demo</Header>
        <Button variant="solid" size="1" onClick={handleDemoStartStop}>
          {status === 'open' || status === 'connecting' ? 'Stop Demo' : 'Start Demo'}
        </Button>
      </HorizontalFlex>

      <HorizontalFlex $columnGap="24px" $alignItems="center">
        <HorizontalFlex $columnGap="8px" $alignItems="center">
          <SelectLabel>Symbol</SelectLabel>
          <Select.Root value={selectedSymbol} onValueChange={handleSymbolChange}>
            <StyledSelectTrigger placeholder="Select Symbol" $width="64px" $height="24px" />
            <Select.Content position="popper">
              <Select.Item value="BTC">BTC</Select.Item>
              <Select.Item value="ETH">ETH</Select.Item>
            </Select.Content>
          </Select.Root>
        </HorizontalFlex>
      </HorizontalFlex>

      <OrderBook />
    </VerticalFlex>
  )
}

export default Home
