import { shallow } from 'zustand/shallow'
import { formatNumber } from '../../common/utils'
import { useOrderBookStore } from '../../stores/order-book-store'

import { OrderRowCell, OrderRowContainer } from './ui'
import { memo } from 'react'

interface OrderRowProps {
  side: 'buy' | 'sell'
  price: number
  size: number
  total: number
  fillPercent: number
  isBlank?: boolean
}

const OrderRow = memo((props: OrderRowProps) => {
  const { side, price, size, total, fillPercent, isBlank } = props

  const { selectedSymbol, selectedAmountType } = useOrderBookStore(
    (state) => ({
      selectedSymbol: state.selectedSymbol,
      selectedAmountType: state.selectedAmountType,
    }),
    shallow,
  )

  const decimalPrecisionPrice = selectedSymbol === 'BTC' ? 0 : 1
  const decimalPrecisionSize = selectedAmountType === 'usd' ? 0 : selectedSymbol === 'BTC' ? 5 : 4

  const clampedFill = Math.max(0, Math.min(1, isBlank ? 0 : fillPercent))

  return (
    <OrderRowContainer
      $fillColor={side === 'buy' ? 'var(--jade-a3)' : 'var(--crimson-a3)'}
      style={{ ['--f' as string]: String(clampedFill) }}
    >
      <OrderRowCell $flex="1" $color={side === 'buy' ? 'var(--green-10)' : 'var(--red-10)'}>
        {isBlank ? '-' : formatNumber(price, decimalPrecisionPrice)}
      </OrderRowCell>
      <OrderRowCell $flex="2">{isBlank ? '-' : formatNumber(size, decimalPrecisionSize)}</OrderRowCell>
      <OrderRowCell $flex="2">{isBlank ? '-' : formatNumber(total, decimalPrecisionSize)}</OrderRowCell>
    </OrderRowContainer>
  )
})

export default OrderRow
