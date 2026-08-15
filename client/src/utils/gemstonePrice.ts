import { getGemstoneById } from '../data/gemstones'
import type { SelectedGemstone } from '../types'

// Average carat weight assumed per individual stone when the customer
// specifies a *quantity* of stones (e.g. 4 diamonds) rather than a total
// carat weight. Keeps the live estimate roughly sane without asking the
// customer to know exact carat weights per stone.
export const AVG_CARAT_PER_STONE = 0.25

// Default quality/purity grade (0-100) used when the caller doesn't pass
// one — matches the midpoint of each gem's price range, i.e. the same
// price this function returned before the purity slider existed.
export const DEFAULT_GEMSTONE_PURITY = 50

/**
 * Calculates the combined gemstone cost across every gemstone the customer
 * selected, each with its own quantity (count of stones), scaled by a
 * quality/purity grade (0-100) that interpolates within each gem's
 * pricePerCarat range — 0 = commercial/included grade (bottom of range),
 * 100 = flawless/premium grade (top of range).
 */
export function calculateGemstonesCost(
  selectedGemstones: SelectedGemstone[] = [],
  gemstonePurity: number = DEFAULT_GEMSTONE_PURITY
): number {
  const clampedPurity = Math.min(100, Math.max(0, gemstonePurity)) / 100
  return selectedGemstones.reduce((total, sel) => {
    const gem = getGemstoneById(sel.id)
    if (!gem || gem.id === 'none' || !sel.quantity) return total
    const [low, high] = gem.pricePerCarat
    const gradedRate = low + (high - low) * clampedPurity
    return total + Math.round(gradedRate * AVG_CARAT_PER_STONE * sel.quantity)
  }, 0)
}

export function describeGemstoneSelection(selectedGemstones: SelectedGemstone[] = []): string {
  return selectedGemstones
    .map((sel) => `${getGemstoneById(sel.id)?.name ?? sel.id} x${sel.quantity}`)
    .join(', ')
}
