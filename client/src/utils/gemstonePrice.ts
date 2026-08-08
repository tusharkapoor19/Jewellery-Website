import { getGemstoneById } from '../data/gemstones'

/**
 * Calculates a gemstone cost estimate using the midpoint of its per-carat
 * range, scaled by the carat weight the customer selected.
 */
export function calculateGemstoneCost(gemstoneId: string, carat: number): number {
  const gem = getGemstoneById(gemstoneId)
  if (!gem || gem.id === 'none' || carat <= 0) return 0
  const [low, high] = gem.pricePerCarat
  const midpoint = (low + high) / 2
  return Math.round(midpoint * carat)
}

export function gemstoneCostRange(gemstoneId: string, carat: number): [number, number] {
  const gem = getGemstoneById(gemstoneId)
  if (!gem || gem.id === 'none' || carat <= 0) return [0, 0]
  const [low, high] = gem.pricePerCarat
  return [Math.round(low * carat), Math.round(high * carat)]
}
