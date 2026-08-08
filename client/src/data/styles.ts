import type { Style } from '../types'

export const styles: Style[] = [
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Kundan, meenakari and temple-inspired motifs.',
    priceMultiplier: 1.18,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines with a contemporary finish.',
    priceMultiplier: 1.05,
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Understated, everyday-wearable silhouettes.',
    priceMultiplier: 0.95,
  },
  {
    id: 'antique',
    name: 'Antique',
    description: 'Oxidised finish with heritage detailing.',
    priceMultiplier: 1.12,
  },
  {
    id: 'fusion',
    name: 'Indo-Western Fusion',
    description: 'Traditional motifs on modern settings.',
    priceMultiplier: 1.1,
  },
  {
    id: 'temple',
    name: 'Temple',
    description: 'Deity and nature motifs in high relief.',
    priceMultiplier: 1.22,
  },
]

export const getStyleById = (id: string) => styles.find((s) => s.id === id)
