import SectionHeading from '../../../../components/Common/SectionHeading'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { formatINR } from '../../../../data/prices'

const MIN_BUDGET = 5000
const MAX_BUDGET = 1000000

export default function BudgetEstimator() {
  const { selection, updateSelection, estimate } = useDesignContext()
  const diff = selection.budget - estimate.total
  const withinBudget = diff >= 0

  return (
    <FadeIn>
      <SectionHeading
        eyebrow="Step 06"
        title="What's your budget?"
        description="We'll flag whether your current selections fit within it."
      />
      <div className="mt-8 max-w-xl rounded-2xl border border-line bg-ink-soft p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-ivory-dim/60 text-sm">Your budget</span>
          <span className="font-mono text-3xl text-gold-bright">{formatINR(selection.budget)}</span>
        </div>
        <input
          type="range"
          min={MIN_BUDGET}
          max={MAX_BUDGET}
          step={1000}
          value={selection.budget}
          onChange={(e) => updateSelection({ budget: parseInt(e.target.value, 10) })}
          className="mt-4 w-full accent-[#C9A667]"
        />
        <div className="mt-1 flex justify-between text-[10px] font-mono text-ivory-dim/40">
          <span>{formatINR(MIN_BUDGET)}</span>
          <span>{formatINR(MAX_BUDGET)}</span>
        </div>

        <div
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            withinBudget ? 'border-emerald-bright/40 bg-emerald/20 text-ivory' : 'border-rose/40 bg-rose/10 text-ivory'
          }`}
        >
          {withinBudget ? (
            <>Your current design comes to <strong className="font-mono">{formatINR(estimate.total)}</strong>, {formatINR(Math.abs(diff))} under budget.</>
          ) : (
            <>Your current design comes to <strong className="font-mono">{formatINR(estimate.total)}</strong>, {formatINR(Math.abs(diff))} over budget — try a lighter purity or a smaller stone.</>
          )}
        </div>
      </div>
    </FadeIn>
  )
}
