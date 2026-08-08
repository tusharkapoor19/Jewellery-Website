import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  title: string
  description?: string
  selected: boolean
  onClick: () => void
  image?: string
  swatch?: string
  badge?: string
  icon?: ReactNode
}

export default function OptionCard({ title, description, selected, onClick, image, swatch, badge, icon }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border text-left transition-colors ${
        selected ? 'border-gold bg-gold/[0.06]' : 'border-line bg-ink-soft hover:border-gold/40'
      }`}
    >
      {image && (
        <div className="relative h-36 w-full overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-center gap-2">
          {swatch && (
            <span
              className="h-4 w-4 rounded-full border border-ivory/20"
              style={{ backgroundColor: swatch }}
            />
          )}
          {icon}
          <h3 className="font-display text-xl text-ivory">{title}</h3>
          {badge && (
            <span className="ml-auto rounded-full bg-emerald/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ivory/80">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-ivory-dim/60">{description}</p>}
      </div>
      {selected && (
        <motion.div
          layoutId="option-selected-indicator"
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}
