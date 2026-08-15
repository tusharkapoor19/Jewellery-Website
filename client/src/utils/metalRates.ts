import { getMaterialById, getPurityById } from '../data/materials'
import { getCachedRatePerGram } from '../services/pricing/liveMetalRates'
import type { MaterialId } from '../types'

/**
 * Returns the effective INR-per-gram rate for a material at a given purity,
 * using the live bullion rate (see services/pricing/liveMetalRates.ts, the
 * same feed the TopBar ticker uses) rather than the static rates in
 * data/materials.ts. Those static rates are kept only as an offline/initial
 * fallback until the first live fetch resolves.
 * Falls back to the material's base rate if purity is unspecified.
 */
export function getEffectiveRate(materialId: string, purityId?: string | null): number {
  const material = getMaterialById(materialId)
  if (!material) return 0
  const baseRate = getCachedRatePerGram(materialId as MaterialId) || material.ratePerGram
  if (!purityId) return Math.round(baseRate)
  const purity = getPurityById(purityId)
  if (!purity) return Math.round(baseRate)
  return Math.round(baseRate * purity.fineness)
}
