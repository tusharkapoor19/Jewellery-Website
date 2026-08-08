import { getMaterialById, getPurityById } from '../data/materials'

/**
 * Returns the effective INR-per-gram rate for a material at a given purity.
 * Falls back to the material's base rate if purity is unspecified.
 */
export function getEffectiveRate(materialId: string, purityId?: string | null): number {
  const material = getMaterialById(materialId)
  if (!material) return 0
  if (!purityId) return material.ratePerGram
  const purity = getPurityById(purityId)
  if (!purity) return material.ratePerGram
  return Math.round(material.ratePerGram * purity.fineness)
}
