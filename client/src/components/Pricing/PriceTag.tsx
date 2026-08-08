import { formatINR } from '../../data/prices'

export default function PriceTag({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl md:text-6xl',
  }
  return (
    <span className={`font-mono ${sizes[size]} text-gold-bright tabular-nums`}>{formatINR(value)}</span>
  )
}
