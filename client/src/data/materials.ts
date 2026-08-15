import type { Material, Purity } from '../types'

// Base (24K/999-fine-equivalent) rates, INR per gram. These are only the
// *initial/offline fallback* shown before the first live rate loads (or if
// the live fetch fails) — actual pricing everywhere in the app comes from
// services/pricing/liveMetalRates.ts, the same live bullion feed the
// TopBar ticker uses, via utils/metalRates.ts#getEffectiveRate.
export const materials: Material[] = [
  { id: 'gold', name: 'Gold', ratePerGram: 14433, color: '#C9A667' },
  { id: 'silver', name: 'Silver', ratePerGram: 219, color: '#C7CBD1' },
  { id: 'platinum', name: 'Platinum', ratePerGram: 5129, color: '#9DA3A8' },
]

// Note: 24K (99.9% fine) gold is intentionally not offered here — it's too
// soft to be worked into jewellery and is only ever sold as coins/bars, so
// the customiser only offers the purities jewellery is actually made in.
export const purities: Purity[] = [
  { id: 'gold-22k', materialId: 'gold', label: '22K', fineness: 0.916 },
  { id: 'gold-18k', materialId: 'gold', label: '18K', fineness: 0.75 },
  { id: 'gold-14k', materialId: 'gold', label: '14K', fineness: 0.585 },
  { id: 'silver-925', materialId: 'silver', label: 'Sterling 925', fineness: 0.925 },
  { id: 'silver-999', materialId: 'silver', label: 'Fine 999', fineness: 0.999 },
  { id: 'platinum-950', materialId: 'platinum', label: 'Platinum 950', fineness: 0.95 },
]

export const getMaterialById = (id: string) => materials.find((m) => m.id === id)
export const getPuritiesForMaterial = (materialId: string) =>
  purities.filter((p) => p.materialId === materialId)
export const getPurityById = (id: string) => purities.find((p) => p.id === id)
