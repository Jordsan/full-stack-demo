import type { PrecisionConfig } from '../../types'

export const BTC_PRECISION_CONFIGS: Record<string, PrecisionConfig> = {
  '1': { nSigFigs: null, mantissa: null, value: 1 },
  '10': { nSigFigs: 5, mantissa: null, value: 10 },
  '20': { nSigFigs: 5, mantissa: 2, value: 20 },
  '50': { nSigFigs: 5, mantissa: 5, value: 50 },
  '100': { nSigFigs: 4, mantissa: null, value: 100 },
  '1000': { nSigFigs: 3, mantissa: null, value: 1000 },
  '10000': { nSigFigs: 2, mantissa: null, value: 10000 },
}

export const ETH_PRECISION_CONFIGS: Record<string, PrecisionConfig> = {
  '0.1': { nSigFigs: null, mantissa: null, value: 0.1 },
  '0.2': { nSigFigs: 5, mantissa: 2, value: 0.2 },
  '0.5': { nSigFigs: 5, mantissa: 5, value: 0.5 },
  '1': { nSigFigs: 4, mantissa: null, value: 1 },
  '10': { nSigFigs: 3, mantissa: null, value: 10 },
  '100': { nSigFigs: 2, mantissa: null, value: 100 },
}
