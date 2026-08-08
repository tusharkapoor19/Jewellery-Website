import SectionHeading from '../../../../components/Common/SectionHeading'
import BreakdownChart from '../../../../components/Charts/BreakdownChart'
import PriceTag from '../../../../components/Pricing/PriceTag'
import { useDesignContext } from '../../../../context/DesignContext'

export default function CostBreakdown() {
  const { estimate } = useDesignContext()

  return (
    <div>
      <SectionHeading eyebrow="Cost breakdown" title="Where your money goes" />
      <div className="mt-6 rounded-2xl border border-line bg-ink-soft p-6">
        <BreakdownChart breakdown={estimate.breakdown} />
        <div className="mt-6 border-t border-dashed border-line pt-5 flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-ivory-dim/60">Total estimate</span>
          <PriceTag value={estimate.total} size="md" />
        </div>
      </div>
    </div>
  )
}
