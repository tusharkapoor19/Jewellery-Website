import { useEffect, useState } from 'react'
import SectionHeading from '../../../../components/Common/SectionHeading'
import FadeIn from '../../../../components/Animations/FadeIn'
import Loader from '../../../../components/Common/Loader'
import ConfidenceMeter from '../../../../components/AI/ConfidenceMeter'
import { useDesignContext } from '../../../../context/DesignContext'
import { estimateFromImage } from '../../../../services/pricing/estimateFromImage'
import { formatINR } from '../../../../data/prices'
import type { AIImageEstimate } from '../../../../types'

export default function AIPriceEstimator() {
  const { selection } = useDesignContext()
  const [result, setResult] = useState<AIImageEstimate | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selection.referenceImage) {
      setResult(null)
      return
    }
    let cancelled = false
    setLoading(true)
    estimateFromImage(selection.referenceImage, selection)
      .then((res) => {
        if (!cancelled) setResult(res)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.referenceImage])

  if (!selection.referenceImage) {
    return (
      <FadeIn>
        <SectionHeading eyebrow="Step 08" title="AI Price Estimation" />
        <p className="mt-6 text-ivory-dim/60 max-w-md">
          No reference image was uploaded — skip this step, or go back to upload one and we'll
          estimate its price from the photo.
        </p>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <SectionHeading
        eyebrow="Step 08"
        title="AI Price Estimation"
        description="A vision-based read of your reference photo, cross-checked against our catalog rates."
      />

      {loading && <Loader label="Analysing reference image" />}

      {!loading && result && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-ink-soft p-6">
            <img
              src={selection.referenceImage}
              alt="Reference"
              className="mb-5 h-48 w-full rounded-xl object-cover"
            />
            <p className="font-mono text-[10px] uppercase tracking-widest text-gold/70">Detected category</p>
            <p className="font-display text-2xl text-ivory mt-1">{result.detectedCategory}</p>
            <div className="mt-5">
              <ConfidenceMeter value={result.confidence} />
            </div>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-gold/[0.05] p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gold/70">Estimated price range</p>
            <p className="font-mono text-3xl text-gold-bright mt-2">
              {formatINR(result.estimatedPriceRange[0])} – {formatINR(result.estimatedPriceRange[1])}
            </p>
            <p className="mt-1 text-xs text-ivory-dim/50">
              Estimated weight {result.estimatedWeightRange[0].toFixed(1)}–{result.estimatedWeightRange[1].toFixed(1)}g
            </p>
            <ul className="mt-5 space-y-2">
              {result.notes.map((note) => (
                <li key={note} className="flex gap-2 text-sm text-ivory-dim/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] text-ivory-dim/40">
              This is a heuristic visual estimate, not a certified appraisal. Final pricing is confirmed
              in-studio against live rates and stone certification.
            </p>
          </div>
        </div>
      )}
    </FadeIn>
  )
}
