import SectionHeading from '../../../../components/Common/SectionHeading'
import OptionCard from '../../../../components/Cards/OptionCard'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { jewelleryTypes } from '../../../../data/jewellery'

export default function JewellerySelector() {
  const { selection, updateSelection } = useDesignContext()

  return (
    <FadeIn>
      <SectionHeading eyebrow="Step 01" title="What are we crafting?" description="Pick the piece you'd like designed." />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jewelleryTypes.map((item) => (
          <OptionCard
            key={item.id}
            title={item.name}
            description={item.description}
            image={item.image}
            selected={selection.jewellery === item.id}
            onClick={() => updateSelection({ jewellery: item.id, weight: 0 })}
          />
        ))}
      </div>
    </FadeIn>
  )
}
