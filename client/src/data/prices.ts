export const GST_RATE = 0.03 // 3% GST on jewellery in India
export const WASTAGE_RATE = 0.08 // 8% metal wastage charge
export const CURRENCY = 'INR'

export const formatINR = (value: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
