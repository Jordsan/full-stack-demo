import type { PrecisionConfig } from '../types'

export const formatNumber = (number: number, decimalPlaces: number = 2) => {
  if (isNaN(number) || number === null) {
    return ''
  }

  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })
}

export const getSortedPrecisionConfig = (config: Record<string, PrecisionConfig>) => {
  return Object.values(config).sort((a, b) => a.value - b.value)
}
