import styled from 'styled-components'
import { Button, Select } from '@radix-ui/themes'

import type {
  AlignItemsOption,
  CursorOption,
  FlexWrapOption,
  JustifyContentOption,
  OverflowOption,
  OverscrollBehaviorOption,
} from '../types'

interface VerticalFlexProps {
  $flex?: string
  $width?: string
  $height?: string
  $minWidth?: string
  $maxWidth?: string
  $minHeight?: string
  $maxHeight?: string
  $rowGap?: string
  $columnGap?: string
  $marginRight?: string
  $marginBottom?: string
  $marginTop?: string
  $padding?: string
  $alignItems?: AlignItemsOption
  $justifyContent?: JustifyContentOption
  $overflow?: OverflowOption
  $overflowY?: OverflowOption
  $overscrollBehavior?: OverscrollBehaviorOption
  $cursor?: CursorOption
  $position?: string
  $zIndex?: string
}

export const VerticalFlex = styled.div<VerticalFlexProps>`
  flex: ${({ $flex }) => $flex ?? 'unset'};
  height: ${({ $height }) => $height ?? '100%'};
  width: ${({ $width }) => $width ?? 'auto'};
  max-height: ${({ $maxHeight }) => $maxHeight ?? 'unset'};
  min-height: ${({ $minHeight }) => $minHeight ?? 'unset'};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
  min-width: ${({ $minWidth }) => $minWidth ?? 'unset'};
  padding: ${({ $padding }) => $padding ?? '0px'};
  overflow: ${({ $minWidth, $maxWidth, $overflow }) => $overflow ?? ($minWidth || $maxWidth ? 'hidden' : 'visible')};
  overflow-y: ${({ $overflowY }) => $overflowY ?? 'visible'};
  overscroll-behavior: ${({ $overscrollBehavior }) => $overscrollBehavior ?? 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems ?? 'normal'};
  row-gap: ${({ $rowGap }) => $rowGap ?? '0px'};
  column-gap: ${({ $columnGap }) => $columnGap ?? '0px'};
  margin-bottom: ${({ $marginBottom }) => $marginBottom ?? '0px'};
  margin-top: ${({ $marginTop }) => $marginTop ?? '0px'};
  margin-right: ${({ $marginRight }) => $marginRight ?? '0px'};
  cursor: ${({ $cursor }) => $cursor ?? 'inherit'};
  position: ${({ $position }) => $position ?? 'static'};
  z-index: ${({ $zIndex }) => $zIndex ?? 'auto'};
`

interface HorizontalFlexProps {
  $flex?: string
  $backgroundColor?: string
  $borderRadius?: string
  $columnGap?: string
  $rowGap?: string
  $width?: string
  $minWidth?: string
  $maxWidth?: string
  $height?: string
  $minHeight?: string
  $maxHeight?: string
  $padding?: string
  $alignItems?: AlignItemsOption
  $justifyContent?: JustifyContentOption
  $marginBottom?: string
  $marginTop?: string
  $overflow?: OverflowOption
  $cursor?: CursorOption
  $flexWrap?: FlexWrapOption
  $position?: string
  $borderBottom?: string
  $borderTop?: string
}

export const HorizontalFlex = styled.div<HorizontalFlexProps>`
  flex: ${({ $flex }) => $flex ?? 'unset'};
  height: ${({ $height }) => $height ?? 'auto'};
  width: ${({ $width }) => $width ?? 'auto'};
  min-width: ${({ $minWidth }) => $minWidth ?? 'unset'};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
  max-height: ${({ $maxHeight }) => $maxHeight ?? 'unset'};
  min-height: ${({ $minHeight }) => $minHeight ?? 'unset'};
  padding: ${({ $padding }) => $padding ?? 'unset'};
  display: flex;
  flex-direction: row;
  flex-wrap: ${({ $flexWrap }) => $flexWrap ?? 'nowrap'};
  overflow: ${({ $overflow }) => $overflow ?? 'visible'};
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems ?? 'normal'};
  row-gap: ${({ $rowGap }) => $rowGap ?? '0px'};
  column-gap: ${({ $columnGap }) => $columnGap ?? '0px'};
  margin-bottom: ${({ $marginBottom }) => $marginBottom ?? '0px'};
  margin-top: ${({ $marginTop }) => $marginTop ?? '0px'};
  cursor: ${({ $cursor }) => $cursor ?? 'inherit'};
  background-color: ${({ $backgroundColor }) => ($backgroundColor ? $backgroundColor : 'transparent')};
  border-radius: ${({ $borderRadius }) => ($borderRadius ? $borderRadius : '0')};
  position: ${({ $position }) => $position ?? 'static'};
  border-bottom: ${({ $borderBottom }) => $borderBottom ?? 'none'};
  border-top: ${({ $borderTop }) => $borderTop ?? 'none'};
`

interface HorizontalDividerProps {
  $padding?: string
  $width?: string
  $color?: string
}

export const HorizontalDivider = styled.div<HorizontalDividerProps>`
  width: ${({ $width }) => $width ?? '100%'};
  height: 1px;
  min-height: 1px;
  background: ${({ $color }) => $color ?? 'var(--gray-a6)'};
  padding: ${({ $padding }) => $padding ?? 'unset'};
`

interface VerticalDividerProps {
  $color?: string
  $width?: string
}

export const VerticalDivider = styled.div<VerticalDividerProps>`
  width: ${({ $width }) => $width ?? '2px'};
  min-width: ${({ $width }) => $width ?? '2px'};
  align-self: stretch;
  background: ${({ $color }) => $color ?? 'var(--gray-a6)'};
`

export const PageContainer = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: auto;
  overscroll-behavior: none;
`

export interface StyledSelectTriggerProps {
  $width?: string
  $maxWidth?: string
  $height?: string
  $flex?: string
}

export const StyledSelectTrigger = styled(Select.Trigger)<StyledSelectTriggerProps>`
  width: ${({ $width }) => $width ?? 'auto'};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'unset'};
  height: ${({ $height }) => $height ?? '32px'};
  outline: none;
  ${({ $flex }) => $flex && `flex: ${$flex};`}
`

interface StyledButtonProps {
  $padding?: string
  $fontSize?: string
  $fontWeight?: string
  $width?: string
  $color?: string
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  ${({ $padding }) => ($padding ? `padding: ${$padding};` : '')}
  ${({ $fontSize }) => ($fontSize ? `font-size: ${$fontSize};` : '')}
  ${({ $fontWeight }) => ($fontWeight ? `font-weight: ${$fontWeight};` : '')}
  ${({ $width }) => ($width ? `width: ${$width}; max-width: ${$width};` : '')}
  ${({ $color }) => ($color ? `color: ${$color};` : '')}
`
