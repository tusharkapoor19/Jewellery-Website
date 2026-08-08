import type { DesignSelection, PriceEstimate, PriceBreakdownItem } from '../types'
import { getJewelleryById } from '../data/jewellery'
import { getStyleById } from '../data/styles'
import { GST_RATE, WASTAGE_RATE } from '../data/prices'
import { getEffectiveRate } from './metalRates'
import { calculateGemstoneCost } from './gemstonePrice'
import { estimateWeight } from './estimateWeight'

/**
 * Computes a full, itemised price estimate from the customer's current
 * design selections. This is the single source of truth for pricing shown
 * across BudgetEstimator, CostBreakdown, AIPriceEstimator and the PDF quote.
 */
export function calculatePriceEstimate(selection: DesignSelection): PriceEstimate {
  const jewellery = selection.jewellery ? getJewelleryById(selection.jewellery) : undefined
  const style = selection.style ? getStyleById(selection.style) : undefined

  const weight =
    selection.weight ||
    (jewellery ? estimateWeight(jewellery, style) : 5)

  const rate = getEffectiveRate(selection.material ?? 'gold', selection.purity)
  const baseMetalCost = rate * weight
  const wastage = baseMetalCost * WASTAGE_RATE
  const metalCost = Math.round(baseMetalCost + wastage)

  const makingCharges = jewellery ? Math.round(jewellery.makingChargePerGram * weight) : 0

  const gemstoneCost = calculateGemstoneCost(selection.gemstone ?? 'none', selection.carat || 0)

  const subtotal = metalCost + makingCharges + gemstoneCost
  const styleMultiplier = style ? style.priceMultiplier : 1
  const styleMarkup = Math.round(subtotal * (styleMultiplier - 1))

  const preTax = subtotal + styleMarkup
  const gst = Math.round(preTax * GST_RATE)
  const total = preTax + gst

  const breakdown: PriceBreakdownItem[] = [
    { label: 'Metal cost', value: metalCost, detail: `${weight}g @ ${rate.toLocaleString('en-IN')}/g incl. wastage` },
    { label: 'Making charges', value: makingCharges, detail: jewellery ? `${jewellery.makingChargePerGram.toLocaleString('en-IN')}/g` : undefined },
    { label: 'Gemstone cost', value: gemstoneCost, detail: selection.carat ? `${selection.carat} carat` : undefined },
    { label: 'Style & craftsmanship', value: styleMarkup, detail: style ? style.name : undefined },
    { label: 'GST (3%)', value: gst },
  ]

  return {
    metalCost,
    makingCharges,
    gemstoneCost,
    styleMarkup,
    gst,
    total,
    low: Math.round(total * 0.9),
    high: Math.round(total * 1.12),
    breakdown,
  }
}
