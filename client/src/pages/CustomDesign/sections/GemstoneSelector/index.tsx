import SectionHeading from '../../../../components/Common/SectionHeading'
import OptionCard from '../../../../components/Cards/OptionCard'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { gemstones } from '../../../../data/gemstones'

export default function GemstoneSelector() {
  const { selection, updateSelection } = useDesignContext()
  const isStoneless = !selection.gemstone || selection.gemstone === 'none'

  return (
    <FadeIn>
      <SectionHeading eyebrow="Step 04" title="Add a gemstone" description="Optional — leave as 'No Stone' for a plain metal piece." />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gemstones.map((g) => (
          <OptionCard
            key={g.id}
            title={g.name}
            swatch={g.id === 'none' ? '#3a352c' : g.color}
            description={
              g.id === 'none'
                ? 'Metal only'
                : `₹${g.pricePerCarat[0].toLocaleString('en-IN')}–${g.pricePerCarat[1].toLocaleString('en-IN')}/carat`
            }
            selected={(selection.gemstone ?? 'none') === g.id}
            onClick={() => updateSelection({ gemstone: g.id, carat: g.id === 'none' ? 0 : selection.carat || 0.5 })}
          />
        ))}
      </div>

      {!isStoneless && (
        <div className="mt-8 max-w-sm rounded-2xl border border-line bg-ink-soft p-5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-ivory-dim/70">Carat weight</span>
            <span className="font-mono text-gold">{selection.carat.toFixed(1)} ct</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={selection.carat}
            onChange={(e) => updateSelection({ carat: parseFloat(e.target.value) })}
            className="w-full accent-[#C9A667]"
          />
          <div className="mt-1 flex justify-between text-[10px] font-mono text-ivory-dim/40">
            <span>0.1 ct</span>
            <span>5 ct</span>
          </div>
        </div>
      )}
    </FadeIn>
  )
}
