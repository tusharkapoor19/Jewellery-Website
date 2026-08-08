import type { JewelleryType } from '../types'

export const jewelleryTypes: JewelleryType[] = [
  {
    id: 'ring',
    name: 'Ring',
    description: 'Solitaires, bands and cocktail rings crafted to size.',
    minWeight: 2,
    maxWeight: 9,
    makingChargePerGram: 650,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  },
  {
    id: 'necklace',
    name: 'Necklace',
    description: 'Statement chains, chokers and bridal sets.',
    minWeight: 15,
    maxWeight: 60,
    makingChargePerGram: 480,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
  },
  {
    id: 'pendant',
    name: 'Pendant',
    description: 'Everyday pendants to heirloom centrepieces.',
    minWeight: 3,
    maxWeight: 12,
    makingChargePerGram: 550,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Studs, hoops and jhumkas, made in pairs.',
    minWeight: 4,
    maxWeight: 16,
    makingChargePerGram: 600,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
  },
  {
    id: 'bracelet',
    name: 'Bracelet',
    description: 'Tennis bracelets, cuffs and link chains.',
    minWeight: 8,
    maxWeight: 25,
    makingChargePerGram: 520,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
  },
  {
    id: 'bangle',
    name: 'Bangle',
    description: 'Single pieces or bridal sets, kada to slim-cut.',
    minWeight: 12,
    maxWeight: 45,
    makingChargePerGram: 500,
    image: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=800&q=80',
  },
]

export const getJewelleryById = (id: string) => jewelleryTypes.find((j) => j.id === id)
