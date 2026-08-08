import type { JewelleryType, Style } from '../types'

/**
 * Estimates a plausible metal weight (in grams) for a chosen jewellery type,
 * nudged by the style's intricacy. More ornate styles (temple, traditional)
 * skew toward the heavier end of the type's realistic range; minimalist
 * styles skew lighter.
 */
export function estimateWeight(jewellery: JewelleryType, style?: Style | null): number {
  const range = jewellery.maxWeight - jewellery.minWeight
  let position = 0.4 // default: slightly below the midpoint

  if (style) {
    if (style.priceMultiplier >= 1.15) position = 0.72
    else if (style.priceMultiplier >= 1.05) position = 0.5
    else position = 0.3
  }

  const weight = jewellery.minWeight + range * position
  return Math.round(weight * 10) / 10
}
