import type { AIImageEstimate, DesignSelection } from '../../types'
import { analyzeImage } from '../ai/imageAnalyzer'
import { jewelleryTypes, getJewelleryById } from '../../data/jewellery'
import { materials } from '../../data/materials'
import { calculatePriceEstimate } from '../../utils/priceCalculator'

/**
 * Produces a price estimate for an uploaded reference photo by combining:
 *  - the customer's already-chosen jewellery type (if any) — falls back to
 *    a reasonable guess (ring/pendant) based on aspect ratio isn't available
 *    client-side without a real model, so we default sensibly.
 *  - the visual complexity/sparkle score from imageAnalyzer
 *  - live catalog rates from priceCalculator, so the number is internally
 *    consistent with the manual configurator.
 */
export async function estimateFromImage(
  dataUrl: string,
  selection: DesignSelection
): Promise<AIImageEstimate> {
  const analysis = await analyzeImage(dataUrl)

  const fallbackCategory = jewelleryTypes.find((j) => j.id === 'ring') ?? jewelleryTypes[0]
  const category = (selection.jewellery ? getJewelleryById(selection.jewellery) : undefined) ?? fallbackCategory

  const guessedMaterialId =
    analysis.dominantTone === 'white-metal'
      ? 'platinum'
      : 'gold'
  const material = materials.find((m) => m.id === guessedMaterialId) ?? materials[0]

  // Weight guess: complexity nudges weight up (more metal/detail in frame).
  const range = category.maxWeight - category.minWeight
  const weight = Math.round((category.minWeight + range * (0.3 + analysis.complexityScore / 250)) * 10) / 10

  // Sparkle score nudges an implied gemstone quantity (small accent stones).
  const impliedCarat = Math.round((analysis.sparkleScore / 100) * 1.2 * 10) / 10
  const impliedQuantity = Math.max(1, Math.round(impliedCarat * 4))

  const syntheticSelection: DesignSelection = {
    jewellery: category.id,
    material: material.id,
    purity: selection.purity ?? (material.id === 'gold' ? 'gold-22k' : 'platinum-950'),
    gemstones: impliedCarat > 0.15 ? [{ id: 'diamond', quantity: impliedQuantity }] : [],
    style: selection.style ?? (analysis.complexityScore > 60 ? 'traditional' : 'modern'),
    budget: selection.budget,
    referenceImage: dataUrl,
    weight,
  }

  const estimate = calculatePriceEstimate(syntheticSelection)

  const notes: string[] = [
    `Detected a predominantly ${analysis.dominantTone.replace('-', ' ')} tone.`,
    analysis.sparkleScore > 45
      ? 'High light-reflectance detected — likely faceted stonework.'
      : 'Low reflectance detected — likely a matte or lightly-set piece.',
    analysis.complexityScore > 60
      ? 'Dense surface detail suggests intricate craftsmanship (filigree, pave, or engraving).'
      : 'Clean, low-detail surface suggests a minimal or streamlined design.',
  ]

  return {
    detectedCategory: category.name,
    complexityScore: analysis.complexityScore,
    estimatedWeightRange: [Math.max(category.minWeight, weight - 1.5), Math.min(category.maxWeight, weight + 1.5)],
    estimatedPriceRange: [estimate.low, estimate.high],
    confidence: Math.round(55 + analysis.complexityScore / 5),
    notes,
  }
}
