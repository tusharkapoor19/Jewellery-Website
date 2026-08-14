import { getGemstoneById } from '../data/gemstones'
import type { SelectedGemstone } from '../types'

// Average carat weight assumed per individual stone when the customer
// specifies a *quantity* of stones (e.g. 4 diamonds) rather than a total
// carat weight. Keeps the live estimate roughly sane without asking the
// customer to know exact carat weights per stone.
export const AVG_CARAT_PER_STONE = 0.25

/**
 * Calculates the combined gemstone cost across every gemstone the customer
 * selected, each with its own quantity (count of stones).
 */
export function calculateGemstonesCost(selectedGemstones: SelectedGemstone[] = []): number {
  return selectedGemstones.reduce((total, sel) => {
    const gem = getGemstoneById(sel.id)
    if (!gem || gem.id === 'none' || !sel.quantity) return total
    const [low, high] = gem.pricePerCarat
    const midpoint = (low + high) / 2
    return total + Math.round(midpoint * AVG_CARAT_PER_STONE * sel.quantity)
  }, 0)
}

export function describeGemstoneSelection(selectedGemstones: SelectedGemstone[] = []): string {
  return selectedGemstones
    .map((sel) => `${getGemstoneById(sel.id)?.name ?? sel.id} x${sel.quantity}`)
    .join(', ')
}
