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

// A single gemstone chosen by the customer along with how many stones of
// that type they want (e.g. { id: 'diamond', quantity: 4 }).
export interface SelectedGemstone {
  id: GemstoneId
  quantity: number
}

export interface ChatMessage {
  sender: 'customer' | 'admin'
  text: string
  createdAt: string
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
  // Multiple gemstones, each with a specific quantity of stones
  // (e.g. Diamond x4, Pearl x5). Empty array = plain metal piece.
  gemstones: SelectedGemstone[]
  // Quality/clarity grade for the chosen gemstones, 0-100, applied across
  // all selected stones (0 = commercial/included grade, priced at the
  // bottom of each gem's pricePerCarat range; 100 = flawless/premium
  // grade, priced at the top of the range). Mirrors metal `purity` as a
  // "purity" slider for stones. Defaults to 50 (mid-range).
  gemstonePurity: number
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
  // Present when the customer is logged in (their real account id, so the
  // backend doesn't have to fall back to a guest id derived from email).
  // Omitted entirely for guest submissions.
  userId?: string
}

// Shape returned by the custom-design backend (GET /custom-design-save) when
// listing custom design requests — looser than SubmittedDesign since it
// comes back in the nested Mongo schema shape, not the flat frontend one.
// Used by both the customer "My Custom Orders" page and the admin
// dashboard's Custom Design tab.
export interface CustomDesignRecord {
  _id: string
  userId?: string
  // Server-generated, human-friendly identifier (e.g. "CD00001") used to
  // tell one custom design request apart from another.
  customOrderId?: string
  createdAt: string
  updatedAt?: string
  customer?: { fullName?: string; email?: string; phone?: string; address?: string }
  jewellery?: {
    type?: string
    material?: string
    purity?: string
    gemstone?: { name: string; quantity: number }[]
    gemstonePurity?: number
    style?: string
  }
  budget?: { min?: number; max?: number; estimatedPrice?: number }
  estimation?: { totalEstimatedCost?: number; makingCharge?: number; stoneCost?: number; metalCost?: number }
  // Reference photo(s) the customer uploaded, plus any free-text notes —
  // see design/ImageUploader and services/upload/uploadReferenceImage.ts.
  design?: { description?: string; referenceImages?: string[] }
  orderStatus?: string
  adminNotes?: string
  messages?: ChatMessage[]
}
