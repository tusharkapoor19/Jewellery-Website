import SectionHeading from '../../../../components/Common/SectionHeading'
import OptionCard from '../../../../components/Cards/OptionCard'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { styles } from '../../../../data/styles'

export default function StyleSelector() {
  const { selection, updateSelection } = useDesignContext()

  return (
    <FadeIn>
      <SectionHeading eyebrow="Step 05" title="Pick a design style" description="Influences craftsmanship complexity and cost." />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {styles.map((s) => (
          <OptionCard
            key={s.id}
            title={s.name}
            description={s.description}
            badge={s.priceMultiplier > 1 ? `+${Math.round((s.priceMultiplier - 1) * 100)}%` : undefined}
            selected={selection.style === s.id}
            onClick={() => updateSelection({ style: s.id })}
          />
        ))}
      </div>
    </FadeIn>
  )
}
