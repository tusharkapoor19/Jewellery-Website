import { motion } from 'framer-motion'

export default function ConfidenceMeter({ value, label = 'Estimate confidence' }: { value: number; label?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-ivory-dim/60 font-mono uppercase tracking-widest">{label}</span>
        <span className="font-mono text-gold">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
        />
      </div>
    </div>
  )
}
