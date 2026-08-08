import type { Material, Purity } from '../types'

// Rates reflect live Indian bullion pricing (INR per gram) as of 25 Jul 2026,
// 24K/999-fine basis, sourced from MCX/retail bullion averages. These will
// drift day to day — in production, wire services/pricing/metalRates.ts to
// a live bullion-rate API instead of hardcoding.
export const materials: Material[] = [
  { id: 'gold', name: 'Gold', ratePerGram: 14433, color: '#C9A667' },
  { id: 'silver', name: 'Silver', ratePerGram: 219, color: '#C7CBD1' },
  { id: 'platinum', name: 'Platinum', ratePerGram: 5129, color: '#9DA3A8' },
]

export const purities: Purity[] = [
  { id: 'gold-24k', materialId: 'gold', label: '24K (99.9%)', fineness: 1 },
  { id: 'gold-22k', materialId: 'gold', label: '22K (91.6%)', fineness: 0.916 },
  { id: 'gold-18k', materialId: 'gold', label: '18K (75%)', fineness: 0.75 },
  { id: 'gold-14k', materialId: 'gold', label: '14K (58.5%)', fineness: 0.585 },
  { id: 'silver-925', materialId: 'silver', label: 'Sterling 925', fineness: 0.925 },
  { id: 'silver-999', materialId: 'silver', label: 'Fine 999', fineness: 0.999 },
  { id: 'platinum-950', materialId: 'platinum', label: 'Platinum 950', fineness: 0.95 },
]

export const getMaterialById = (id: string) => materials.find((m) => m.id === id)
export const getPuritiesForMaterial = (materialId: string) =>
  purities.filter((p) => p.materialId === materialId)
export const getPurityById = (id: string) => purities.find((p) => p.id === id)
