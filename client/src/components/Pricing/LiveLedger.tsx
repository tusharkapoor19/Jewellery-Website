import { motion, AnimatePresence } from 'framer-motion'
import { useDesignContext } from '../../context/DesignContext'
import { formatINR } from '../../data/prices'
import { getJewelleryById } from '../../data/jewellery'

/**
 * The design's signature UI element: a sticky "appraisal slip" that updates
 * live as the customer moves through the configurator, styled like a
 * jeweller's weighing ticket rather than a generic price card.
 */
export default function LiveLedger() {
  const { selection, estimate } = useDesignContext()
  const jewellery = selection.jewellery ? getJewelleryById(selection.jewellery) : undefined

  return (
    <div className="sticky top-24 rounded-2xl border border-line bg-ink-soft/80 backdrop-blur-sm">
      <div className="border-b border-dashed border-line px-6 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70">Live Appraisal Slip</p>
        <h3 className="font-display text-2xl text-ivory mt-1">
          {jewellery ? jewellery.name : 'Your design'}
        </h3>
      </div>

      <div className="px-6 py-4 space-y-2.5">
        {estimate.breakdown.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-ivory-dim/60">{item.label}</span>
            <span className="font-mono text-ivory/90 tabular-nums">
              {item.value > 0 ? formatINR(item.value) : '—'}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-line px-6 py-5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-ivory-dim/70">Estimated Total</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={estimate.total}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="ledger-underline font-mono text-2xl text-gold-bright tabular-nums"
            >
              {formatINR(estimate.total)}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-xs text-ivory-dim/40">
          Range {formatINR(estimate.low)} – {formatINR(estimate.high)}
        </p>
      </div>
    </div>
  )
}
