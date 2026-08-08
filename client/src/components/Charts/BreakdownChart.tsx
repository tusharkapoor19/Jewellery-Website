import type { PriceBreakdownItem } from '../../types'
import { formatINR } from '../../data/prices'

const COLORS = ['#C9A667', '#1C5A41', '#C99687', '#8A6D3B', '#4A4438']

export default function BreakdownChart({ breakdown }: { breakdown: PriceBreakdownItem[] }) {
  const items = breakdown.filter((b) => b.value > 0)
  const total = items.reduce((sum, i) => sum + i.value, 0) || 1
  const radius = 70
  const circumference = 2 * Math.PI * radius
  let offsetAcc = 0

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <svg viewBox="0 0 180 180" className="h-44 w-44 shrink-0 -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#2a2621" strokeWidth="20" />
        {items.map((item, i) => {
          const fraction = item.value / total
          const dash = fraction * circumference
          const circle = (
            <circle
              key={item.label}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={COLORS[i % COLORS.length]}
              strokeWidth="20"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offsetAcc}
              strokeLinecap="butt"
            />
          )
          offsetAcc += dash
          return circle
        })}
      </svg>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-ivory-dim/70">{item.label}</span>
            <span className="font-mono text-ivory/90 tabular-nums">{formatINR(item.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
