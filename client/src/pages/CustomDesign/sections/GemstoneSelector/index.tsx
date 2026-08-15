import SectionHeading from '../../../../components/Common/SectionHeading'
import FadeIn from '../../../../components/Animations/FadeIn'
import { useDesignContext } from '../../../../context/DesignContext'
import { gemstones } from '../../../../data/gemstones'
import type { GemstoneId } from '../../../../types'

const MIN_QTY = 1
const MAX_QTY = 50

export default function GemstoneSelector() {
  const { selection, updateSelection } = useDesignContext()
  const selectedGemstones = selection.gemstones ?? []
  const gemstonePurity = selection.gemstonePurity ?? 50

  const findQuantity = (id: GemstoneId) => selectedGemstones.find((g) => g.id === id)?.quantity ?? 0

  const isSelected = (id: GemstoneId) => selectedGemstones.some((g) => g.id === id)

  const toggleGemstone = (id: GemstoneId) => {
    if (id === 'none') {
      updateSelection({ gemstones: [] })
      return
    }
    if (isSelected(id)) {
      updateSelection({ gemstones: selectedGemstones.filter((g) => g.id !== id) })
    } else {
      updateSelection({ gemstones: [...selectedGemstones, { id, quantity: 1 }] })
    }
  }

  const setQuantity = (id: GemstoneId, quantity: number) => {
    const clamped = Math.min(MAX_QTY, Math.max(MIN_QTY, quantity))
    updateSelection({
      gemstones: selectedGemstones.map((g) => (g.id === id ? { ...g, quantity: clamped } : g)),
    })
  }

  const isStoneless = selectedGemstones.length === 0

  return (
    <FadeIn>
      <SectionHeading
        eyebrow="Step 04"
        title="Add gemstones"
        description="Optional — select one or more stones and set how many of each you'd like (e.g. Diamond x4, Pearl x5). Leave everything unselected for a plain metal piece."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gemstones.map((g) => {
          if (g.id === 'none') {
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggleGemstone('none')}
                className={`relative flex flex-col rounded-2xl border p-5 text-left transition-colors ${
                  isStoneless ? 'border-gold bg-gold/[0.06]' : 'border-line bg-ink-soft hover:border-gold/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-ivory/20" style={{ backgroundColor: '#3a352c' }} />
                  <h3 className="font-display text-xl text-ivory">{g.name}</h3>
                </div>
                <p className="mt-1.5 text-sm text-ivory-dim/60">Metal only</p>
              </button>
            )
          }

          const selected = isSelected(g.id)
          const quantity = findQuantity(g.id)

          return (
            <div
              key={g.id}
              className={`relative flex flex-col rounded-2xl border p-5 transition-colors ${
                selected ? 'border-gold bg-gold/[0.06]' : 'border-line bg-ink-soft hover:border-gold/40'
              }`}
            >
              <button type="button" onClick={() => toggleGemstone(g.id)} className="flex flex-1 flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-ivory/20" style={{ backgroundColor: g.color }} />
                  <h3 className="font-display text-xl text-ivory">{g.name}</h3>
                  {selected && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-ivory-dim/60">
                  {`₹${g.pricePerCarat[0].toLocaleString('en-IN')}–${g.pricePerCarat[1].toLocaleString('en-IN')}/carat`}
                </p>
              </button>

              {selected && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-ink px-3 py-2">
                  <span className="text-xs text-ivory-dim/60">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(g.id, quantity - 1)}
                      disabled={quantity <= MIN_QTY}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-ivory transition-colors hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={MIN_QTY}
                      max={MAX_QTY}
                      value={quantity}
                      onChange={(e) => setQuantity(g.id, parseInt(e.target.value, 10) || MIN_QTY)}
                      className="w-12 bg-transparent text-center font-mono text-sm text-gold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(g.id, quantity + 1)}
                      disabled={quantity >= MAX_QTY}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-ivory transition-colors hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!isStoneless && (
        <div className="mt-6 max-w-xl rounded-2xl border border-line bg-ink-soft p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold/70 mb-2 font-mono">Your selection</p>
          <p className="text-sm text-ivory-dim/70">
            {selectedGemstones
              .map((g) => `${gemstones.find((gem) => gem.id === g.id)?.name ?? g.id} × ${g.quantity}`)
              .join(', ')}
          </p>
        </div>
      )}

      {!isStoneless && (
        <div className="mt-4 max-w-xl rounded-2xl border border-line bg-ink-soft p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-ivory-dim/60 text-sm">Gemstone purity / quality grade</span>
            <span className="font-mono text-3xl text-gold-bright">{Math.round(gemstonePurity)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={gemstonePurity}
            onChange={(e) => updateSelection({ gemstonePurity: parseInt(e.target.value, 10) })}
            className="mt-4 w-full accent-[#C9A667]"
          />
          <div className="mt-1 flex justify-between text-[10px] font-mono text-ivory-dim/40">
            <span>Commercial (0%)</span>
            <span>Flawless (100%)</span>
          </div>
          <p className="mt-4 text-xs text-ivory-dim/50">
            Sets where within each stone's price range (e.g. Diamond ₹45,000–2,50,000/carat) your stones fall —
            higher clarity/quality costs more per carat.
          </p>
        </div>
      )}
    </FadeIn>
  )
}
