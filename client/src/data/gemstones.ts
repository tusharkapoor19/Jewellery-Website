import type { Gemstone } from '../types'

export const gemstones: Gemstone[] = [
  { id: 'none', name: 'No Stone', pricePerCarat: [0, 0], color: 'transparent' },
  { id: 'diamond', name: 'Diamond', pricePerCarat: [45000, 250000], color: '#F7FAFF' },
  { id: 'ruby', name: 'Ruby', pricePerCarat: [8000, 60000], color: '#9B111E' },
  { id: 'emerald', name: 'Emerald', pricePerCarat: [6000, 45000], color: '#0F5132' },
  { id: 'sapphire', name: 'Sapphire', pricePerCarat: [7000, 50000], color: '#1B4B93' },
  { id: 'pearl', name: 'Pearl', pricePerCarat: [500, 4500], color: '#F2EFE6' },
  { id: 'polki', name: 'Polki (Uncut Diamond)', pricePerCarat: [12000, 40000], color: '#EDE3C8' },
]

export const getGemstoneById = (id: string) => gemstones.find((g) => g.id === id)
