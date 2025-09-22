import styled from 'styled-components'

export const OrderBookContainer = styled.div`
  width: 380px;
  height: auto;
  border: 1px solid var(--indigo-a9);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 4px;
`

interface OrderBookHeaderTextProps {
  $flex?: string
}

export const OrderBookHeaderText = styled.span<OrderBookHeaderTextProps>`
  flex: ${({ $flex }) => $flex ?? '1'};
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-a10);

  &:first-child {
    text-align: left;
    padding-left: 4px;
  }

  &:nth-child(2) {
    text-align: right;
    padding-left: 4px;
    padding-right: 4px;
  }

  &:last-child {
    text-align: right;
    padding-right: 4px;
  }
`

interface OrderRowContainerProps {
  $fillColor: string
}

export const OrderRowContainer = styled.div<OrderRowContainerProps>`
  position: relative;
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-a6);
  padding: 1px 0px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--gray-a3);
    font-weight: 800;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $fillColor }) => $fillColor};
    transform-origin: left center;
    transform: scaleX(var(--f, 0));
    will-change: transform;
    pointer-events: none;
    z-index: 0;
  }

  > span {
    position: relative;
    z-index: 1;
  }
`

interface OrderRowCellProps {
  $color?: string
  $flex?: string
}

export const OrderRowCell = styled.span<OrderRowCellProps>`
  flex: ${({ $flex }) => $flex ?? '1'};
  font-family: 'JetBrains Mono';
  font-size: 14px;
  font-weight: 400;
  color: ${({ $color }) => $color ?? 'white'};
  max-width: calc(100% / 5 * 2);

  &:first-child {
    text-align: left;
    padding-left: 4px;
  }

  &:nth-child(2) {
    text-align: right;
    padding-left: 4px;
    padding-right: 4px;
  }

  &:last-child {
    text-align: right;
    padding-right: 4px;
  }
`

export const OrderBookSpreadRow = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 48px;
  border-bottom: 1px solid var(--gray-a6);
  background-color: var(--gray-a6);
`

export const OrderBookSpreadRowText = styled.span`
  width: 64px;
  color: white;
  font-size: 14px;
  font-weight: 500;

  &:first-child {
    text-align: right;
  }

  &:nth-child(2) {
    text-align: center;
  }

  &:last-child {
    text-align: left;
  }
`
