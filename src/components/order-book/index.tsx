import { useEffect, useMemo } from 'react'
import { Select } from '@radix-ui/themes'
import { shallow } from 'zustand/shallow'

import { useWebSocketStore } from '../../stores/websocket-store'
import { useOrderBookStore } from '../../stores/order-book-store'
import { HorizontalDivider, HorizontalFlex, StyledButton, StyledSelectTrigger } from '../../common/ui'
import { formatNumber, getSortedPrecisionConfig } from '../../common/utils'
import type { WsL2BookMessage } from '../../types'

import { OrderBookContainer, OrderBookHeaderText, OrderBookSpreadRow, OrderBookSpreadRowText } from './ui'
import { BTC_PRECISION_CONFIGS, ETH_PRECISION_CONFIGS } from './constants'
import OrderRow from './OrderRow'

const OrderBook = () => {
  const {
    bids,
    asks,
    selectedSymbol,
    selectedPrecision,
    selectedAmountType,
    setBids,
    setAsks,
    setSelectedPrecision,
    setSelectedAmountType,
  } = useOrderBookStore(
    (state) => ({
      bids: state.bids,
      asks: state.asks,
      selectedPrecision: state.selectedPrecision,
      selectedSymbol: state.selectedSymbol,
      selectedAmountType: state.selectedAmountType,
      setBids: state.setBids,
      setAsks: state.setAsks,
      setSelectedPrecision: state.setSelectedPrecision,
      setSelectedAmountType: state.setSelectedAmountType,
    }),
    shallow,
  )
  const { addListener, updateParams } = useWebSocketStore(
    (state) => ({
      addListener: state.addListener,
      updateParams: state.updateParams,
    }),
    shallow,
  )

  useEffect(() => {
    const off = addListener((msg) => {
      if (
        typeof msg === 'object' &&
        msg !== null &&
        (msg as WsL2BookMessage).channel === 'l2Book' &&
        (msg as WsL2BookMessage).data?.levels
      ) {
        const data = (msg as WsL2BookMessage).data
        const bids = data.levels[0] ?? []
        const asks = data.levels[1] ?? []

        setBids(bids)
        setAsks(asks)
      }
    })

    return off
  }, [setBids, setAsks, addListener])

  const topAsks = useMemo(() => {
    let totalCoin = 0
    let totalUsd = 0

    const unsortedAsks = asks.slice(0, 12).map((ask) => {
      const price = parseFloat(ask.px)
      const sizeCoin = parseFloat(ask.sz)
      const sizeUsd = sizeCoin * price

      totalCoin += sizeCoin
      totalUsd += sizeUsd

      const total = selectedAmountType === 'usd' ? totalUsd : totalCoin
      const size = selectedAmountType === 'usd' ? sizeUsd : sizeCoin

      return { price, size, total }
    })

    return unsortedAsks.reverse()
  }, [asks, selectedAmountType])

  const topBids = useMemo(() => {
    let totalCoin = 0
    let totalUsd = 0

    return bids.slice(0, 12).map((bid) => {
      const price = parseFloat(bid.px)
      const sizeCoin = parseFloat(bid.sz)
      const sizeUsd = sizeCoin * price

      totalCoin += sizeCoin
      totalUsd += sizeUsd

      const total = selectedAmountType === 'usd' ? totalUsd : totalCoin
      const size = selectedAmountType === 'usd' ? sizeUsd : sizeCoin

      return { price, size, total }
    })
  }, [bids, selectedAmountType])

  const spreadData = useMemo(() => {
    if (topBids.length === 0 || topAsks.length === 0) {
      return { spread: '-', spreadPercentage: '-' }
    }

    const bestBid = topBids[0]
    const bestAsk = topAsks[topAsks.length - 1]

    const spread = bestAsk.price - bestBid.price
    const spreadPercentage = (spread / ((bestBid.price + bestAsk.price) / 2)) * 100

    const formattedSpread = formatNumber(spread, selectedSymbol === 'BTC' ? 0 : 1)
    const formattedSpreadPercentage = `${formatNumber(spreadPercentage, 3)}%`

    return { spread: formattedSpread, spreadPercentage: formattedSpreadPercentage }
  }, [topBids, topAsks, selectedSymbol])

  const maxTotal = useMemo(
    () =>
      Math.max(
        topBids.reduce((max, bid) => Math.max(max, bid.total), 0),
        topAsks.reduce((max, ask) => Math.max(max, ask.total), 0),
      ),
    [topBids, topAsks],
  )

  const handlePrecisionChange = (value: string) => {
    setSelectedPrecision(value)

    const correspondingConfig = selectedSymbol === 'BTC' ? BTC_PRECISION_CONFIGS[value] : ETH_PRECISION_CONFIGS[value]

    updateParams({ nSigFigs: correspondingConfig.nSigFigs, mantissa: correspondingConfig.mantissa })
  }

  return (
    <OrderBookContainer>
      <HorizontalFlex $width="100%" $alignItems="center" $justifyContent="space-between" $padding="4px 8px 4px 8px">
        <Select.Root value={selectedPrecision ?? ''} onValueChange={handlePrecisionChange}>
          <StyledSelectTrigger $width="auto" $height="24px" />
          <Select.Content position="popper">
            {selectedSymbol === 'BTC'
              ? getSortedPrecisionConfig(BTC_PRECISION_CONFIGS).map((config) => (
                  <Select.Item key={config.value} value={config.value.toString()}>
                    {formatNumber(config.value, 0)}
                  </Select.Item>
                ))
              : getSortedPrecisionConfig(ETH_PRECISION_CONFIGS).map((config) => (
                  <Select.Item key={config.value} value={config.value.toString()}>
                    {formatNumber(config.value, 1)}
                  </Select.Item>
                ))}
          </Select.Content>
        </Select.Root>

        <HorizontalFlex $alignItems="center" $columnGap="16px">
          <StyledButton
            variant="ghost"
            size="1"
            $color={selectedAmountType === 'usd' ? 'var(--indigo-a10)' : 'var(--gray-a9)'}
            onClick={() => setSelectedAmountType('usd')}
            $padding="0px"
            $fontWeight="600"
            $width="32px"
          >
            USD
          </StyledButton>
          <StyledButton
            variant="ghost"
            size="1"
            $color={selectedAmountType === 'amount' ? 'var(--indigo-a10)' : 'var(--gray-a9)'}
            onClick={() => setSelectedAmountType('amount')}
            $padding="0px"
            $fontWeight="600"
            $width="32px"
          >
            {selectedSymbol.toUpperCase()}
          </StyledButton>
        </HorizontalFlex>
      </HorizontalFlex>

      <HorizontalDivider $color="var(--indigo-a9)" />

      <HorizontalFlex
        $width="100%"
        $height="32px"
        $alignItems="center"
        $justifyContent="space-between"
        $borderBottom="1px solid var(--gray-a6)"
      >
        <OrderBookHeaderText $flex="1">Price</OrderBookHeaderText>
        <OrderBookHeaderText $flex="2">Size ({selectedAmountType === 'usd' ? 'USD' : selectedSymbol.toUpperCase()})</OrderBookHeaderText>
        <OrderBookHeaderText $flex="2">Total ({selectedAmountType === 'usd' ? 'USD' : selectedSymbol.toUpperCase()})</OrderBookHeaderText>
      </HorizontalFlex>

      {/* Asks */}
      {topAsks.length === 0
        ? Array.from({ length: 12 }).map((_, i) => (
            <OrderRow key={`ask-${i}-0`} side="sell" price={0} size={0} total={0} fillPercent={0} isBlank />
          ))
        : topAsks.map((row, i) => (
            <OrderRow
              key={`ask-${i}-${row.price}`}
              side="sell"
              price={row.price}
              size={row.size}
              total={row.total}
              fillPercent={row.total / maxTotal}
            />
          ))}

      {/* Spread */}
      <OrderBookSpreadRow>
        <OrderBookSpreadRowText>Spread</OrderBookSpreadRowText>
        <OrderBookSpreadRowText>{spreadData.spread}</OrderBookSpreadRowText>
        <OrderBookSpreadRowText>{spreadData.spreadPercentage}</OrderBookSpreadRowText>
      </OrderBookSpreadRow>

      {/* Bids */}
      {topBids.length === 0
        ? Array.from({ length: 12 }).map((_, i) => (
            <OrderRow key={`bid-${i}-0`} side="buy" price={0} size={0} total={0} fillPercent={0} isBlank />
          ))
        : topBids.map((row, i) => (
            <OrderRow
              key={`bid-${i}-${row.price}`}
              side="buy"
              price={row.price}
              size={row.size}
              total={row.total}
              fillPercent={row.total / maxTotal}
            />
          ))}
    </OrderBookContainer>
  )
}

export default OrderBook
