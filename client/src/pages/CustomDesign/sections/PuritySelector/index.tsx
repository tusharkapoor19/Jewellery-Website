import SectionHeading from '../../../../components/Common/SectionHeading'
import OptionCard from '../../../../components/Cards/OptionCard'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { getPuritiesForMaterial, getMaterialById } from '../../../../data/materials'
import { getEffectiveRate } from '../../../../utils/metalRates'
import { useLiveMetalRates } from '../../../../services/pricing/liveMetalRates'

export default function PuritySelector() {
  const { selection, updateSelection } = useDesignContext()
  // Subscribing here (in addition to DesignContext) just forces this list
  // to re-render with the freshest rate every refresh cycle, same as the
  // TopBar ticker.
  const { loading } = useLiveMetalRates()
  const purities = selection.material ? getPuritiesForMaterial(selection.material) : []
  const material = selection.material ? getMaterialById(selection.material) : undefined

  if (!material) {
    return (
      <FadeIn>
        <SectionHeading eyebrow="Step 03" title="Choose purity" />
        <p className="mt-6 text-ivory-dim/60">Select a metal first to see purity options.</p>
      </FadeIn>
    )
  }

  // Karat labels (Gold) don't self-evidently convey fineness, so we append
  // the live-computed percentage next to them (e.g. "22K (91.6%)"). Silver
  // and platinum purities are already labelled by their fineness number
  // (Sterling 925, Fine 999, Platinum 950), so adding a percentage there
  // would just be a redundant, confusing "(99.9%)" next to "999" — so it's
  // deliberately left off for those materials.
  const purityTitle = (label: string, fineness: number) =>
    material.id === 'gold' ? `${label} (${(fineness * 100).toFixed(1)}%)` : label

  return (
    <FadeIn>
      <SectionHeading
        eyebrow="Step 03"
        title={`${material.name} purity`}
        description="Higher purity means a softer metal and a higher rate per gram."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {purities.map((p) => (
          <OptionCard
            key={p.id}
            title={purityTitle(p.label, p.fineness)}
            description={loading ? 'Loading live rate…' : `₹${getEffectiveRate(material.id, p.id).toLocaleString('en-IN')}/g`}
            selected={selection.purity === p.id}
            onClick={() => updateSelection({ purity: p.id })}
          />
        ))}
      </div>
    </FadeIn>
  )
}
