export * from "./product";
/*export * from "./auth";
export * from "./user";
export * from "./order";
export * from "./category";
export * from "./common";*/
export type JewelleryId = 'ring' | 'necklace' | 'pendant' | 'earrings' | 'bracelet' | 'bangle'

export interface JewelleryType {
  id: JewelleryId
  name: string
  description: string
  minWeight: number // grams
  maxWeight: number // grams
  makingChargePerGram: number // INR
  image: string
}

export type MaterialId = 'gold' | 'silver' | 'platinum'

export interface Material {
  id: MaterialId
  name: string
  ratePerGram: number // INR, at 24k/base purity
  color: string
}

export interface Purity {
  id: string
  materialId: MaterialId
  label: string
  fineness: number // 0-1 multiplier applied to base rate
}

export type GemstoneId = 'none' | 'diamond' | 'ruby' | 'emerald' | 'sapphire' | 'pearl' | 'polki'

export interface Gemstone {
  id: GemstoneId
  name: string
  pricePerCarat: [number, number] // range
  color: string
}

export type StyleId = 'traditional' | 'modern' | 'minimalist' | 'antique' | 'fusion' | 'temple'

export interface Style {
  id: StyleId
  name: string
  description: string
  priceMultiplier: number
}

export interface DesignSelection {
  jewellery: JewelleryId | null
  material: MaterialId | null
  purity: string | null
  gemstone: GemstoneId | null
  carat: number
  style: StyleId | null
  budget: number
  referenceImage: string | null
  weight: number
}

export interface PriceBreakdownItem {
  label: string
  value: number
  detail?: string
}

export interface PriceEstimate {
  metalCost: number
  makingCharges: number
  gemstoneCost: number
  styleMarkup: number
  gst: number
  total: number
  low: number
  high: number
  breakdown: PriceBreakdownItem[]
}

export interface AIImageEstimate {
  detectedCategory: string
  complexityScore: number // 0-100
  estimatedWeightRange: [number, number]
  estimatedPriceRange: [number, number]
  confidence: number // 0-100
  notes: string[]
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  city: string
  notes: string
}

export interface SubmittedDesign extends DesignSelection {
  id: string
  customer: CustomerInfo
  createdAt: string
  estimate: PriceEstimate
}
