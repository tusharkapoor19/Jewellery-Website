import { motion } from 'framer-motion'
import PrimaryButton from '../../../../components/Buttons/PrimaryButton'
import GhostButton from '../../../../components/Buttons/GhostButton'
import { formatINR } from '../../../../data/prices'

interface Props {
  quoteId: string
  total: number
  onDownloadPDF: () => void
  onStartOver: () => void
}

export default function SuccessScreen({ quoteId, total, onDownloadPDF, onStartOver }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg rounded-2xl border border-gold/30 bg-ink-soft p-10 text-center"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-gold/70">Design submitted</p>
      <h2 className="font-display text-3xl text-ivory mt-2">Your quote is ready</h2>
      <p className="mt-2 text-sm text-ivory-dim/60">Reference {quoteId}</p>
      <p className="mt-6 font-mono text-4xl text-gold-bright">{formatINR(total)}</p>
      <p className="mt-2 text-xs text-ivory-dim/40">Estimated total, pending in-studio confirmation.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <PrimaryButton onClick={onDownloadPDF}>Download quotation PDF</PrimaryButton>
        <GhostButton onClick={onStartOver}>Start a new design</GhostButton>
      </div>
    </motion.div>
  )
}
