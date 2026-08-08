import SectionHeading from '../../../../components/Common/SectionHeading'
import OptionCard from '../../../../components/Cards/OptionCard'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { materials, getPuritiesForMaterial } from '../../../../data/materials'

export default function MaterialSelector() {
  const { selection, updateSelection } = useDesignContext()

  return (
    <FadeIn>
      <SectionHeading eyebrow="Step 02" title="Choose your metal" description="Sets the base rate for your piece." />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {materials.map((m) => (
          <OptionCard
            key={m.id}
            title={m.name}
            swatch={m.color}
            description={`from ₹${m.ratePerGram.toLocaleString('en-IN')}/g`}
            selected={selection.material === m.id}
            onClick={() => {
              const firstPurity = getPuritiesForMaterial(m.id)[0]
              updateSelection({ material: m.id, purity: firstPurity?.id ?? null })
            }}
          />
        ))}
      </div>
    </FadeIn>
  )
}
