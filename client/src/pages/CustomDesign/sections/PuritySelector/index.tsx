import SectionHeading from '../../../../components/Common/SectionHeading'
import OptionCard from '../../../../components/Cards/OptionCard'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { getPuritiesForMaterial, getMaterialById } from '../../../../data/materials'
import { getEffectiveRate } from '../../../../utils/metalRates'

export default function PuritySelector() {
  const { selection, updateSelection } = useDesignContext()
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

  return (
    <FadeIn>
      <SectionHeading
        eyebrow="Step 03"
        title={`${material.name} purity`}
        description="Higher purity means a softer metal and a higher rate per gram."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {purities.map((p) => (
          <OptionCard
            key={p.id}
            title={p.label}
            description={`₹${getEffectiveRate(material.id, p.id).toLocaleString('en-IN')}/g`}
            selected={selection.purity === p.id}
            onClick={() => updateSelection({ purity: p.id })}
          />
        ))}
      </div>
    </FadeIn>
  )
}
