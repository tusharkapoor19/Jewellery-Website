import SectionHeading from '../../../../components/Common/SectionHeading'
import { useDesignContext } from '../../../../context/DesignContext'
import { jewelleryTypes } from '../../../../data/jewellery'

export default function SimilarDesigns() {
  const { selection } = useDesignContext()
  const others = jewelleryTypes.filter((j) => j.id !== selection.jewellery).slice(0, 3)
  const current = jewelleryTypes.find((j) => j.id === selection.jewellery)
  const suggestions = current ? [current, ...others].slice(0, 4) : others

  return (
    <div>
      <SectionHeading eyebrow="You might also like" title="Similar designs" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {suggestions.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-xl border border-line">
            <div className="h-28 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <p className="px-3 py-2 text-xs text-ivory-dim/70">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
