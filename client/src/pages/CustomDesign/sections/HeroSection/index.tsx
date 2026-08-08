import FadeIn from '../../../../components/Animations/FadeIn'

export default function HeroSection() {
  return (
    <FadeIn className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-3">Design Studio</p>
      <h1 className="font-display text-4xl md:text-6xl text-ivory leading-[1.05] max-w-3xl">
        Build your own piece, priced as you go
      </h1>
      <p className="mt-4 max-w-xl text-ivory-dim/60">
        Choose a jewellery type, metal, purity and stones — the appraisal slip on the right
        updates in real time, so there are no surprises when you're done.
      </p>
    </FadeIn>
  )
}
