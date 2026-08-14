import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../../components/Common/Container'
import SectionHeading from '../../components/Common/SectionHeading'
import Topbar from "../../components/TopBar/TopBar"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import GhostButton from '../../components/Buttons/GhostButton'
import FadeIn from '../../components/Animations/FadeIn'
import { jewelleryTypes } from '../../data/jewellery'

const PROCESS = [
  { label: 'Configure', detail: 'Pick your piece, metal, purity and stones.' },
  { label: 'Estimate', detail: 'See a live, itemised price as you choose.' },
  { label: 'Preview', detail: 'Rotate a 3D render in your chosen finish.' },
  { label: 'Quote', detail: 'Get a downloadable PDF quotation instantly.' },
]

const TRUST = [
  { stat: 'BIS Hallmarked', detail: 'Every piece certified for purity' },
  { stat: '15-Day Craft', detail: 'From confirmed design to delivery' },
  { stat: 'Lifetime Exchange', detail: 'On gold and platinum pieces' },
]

export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="bg-ink">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-gold/10 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-emerald/20 blur-[140px]" />
          <Container className="relative">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
              <FadeIn>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-5">Bespoke Fine Jewellery</p>
                <h1 className="font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
                  Design it your way.
                  <br />
                  <span className="gold-text">Know the price</span> before you commit.
                </h1>
                <p className="mt-6 max-w-md text-ivory-dim/60">
                  Hiranya is a made-to-order atelier. Choose the metal, purity, stones and style —
                  watch a live appraisal slip total up as you go, then preview your piece in 3D
                  before we craft it.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link to="/design">
                    <PrimaryButton>Start designing</PrimaryButton>
                  </Link>
                  <a href="#process">
                    <GhostButton>See how it works</GhostButton>
                  </a>
                  <Link to="/my-custom-orders">
                    <GhostButton>View my orders</GhostButton>
                  </Link>
                </div>
                <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
                  {TRUST.map((t) => (
                    <div key={t.stat}>
                      <p className="font-display text-xl text-gold-bright">{t.stat}</p>
                      <p className="mt-1 text-xs text-ivory-dim/50">{t.detail}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="relative">
                  <div className="overflow-hidden rounded-[2rem] border border-line">
                    <img
                      src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1000&q=80"
                      alt="Handcrafted gold ring with diamond"
                      className="h-[520px] w-full object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute -bottom-6 -left-6 rounded-2xl border border-gold/30 bg-ink-soft/95 backdrop-blur-sm px-6 py-4 shadow-2xl"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gold/70">Live estimate</p>
                    <p className="font-mono text-2xl text-gold-bright mt-1">₹68,400</p>
                    <p className="text-xs text-ivory-dim/40 mt-0.5">18K Gold · 0.6ct Diamond</p>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Jewellery categories */}
        <section className="border-t border-line py-24">
          <Container>
            <SectionHeading eyebrow="Categories" title="Ten pieces, endless combinations" description="Start from any category — every path leads through the same transparent pricing engine." />
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {jewelleryTypes.map((j, i) => (
                <FadeIn key={j.id} delay={i * 0.05}>
                  <Link to="/design" className="group block overflow-hidden rounded-2xl border border-line">
                    <div className="h-32 overflow-hidden">
                      <img
                        src={j.image}
                        alt={j.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <p className="px-4 py-3 font-display text-lg text-ivory">{j.name}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section id="process" className="border-t border-line py-24">
          <Container>
            <SectionHeading eyebrow="The process" title="Four steps to a finished quotation" />
            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <FadeIn key={p.label} delay={i * 0.1}>
                  <div className="relative border-l border-line pl-6">
                    <span className="font-mono text-xs text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-2xl text-ivory mt-2">{p.label}</h3>
                    <p className="mt-2 text-sm text-ivory-dim/60">{p.detail}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* AI Estimation callout */}
        <section className="border-t border-line py-24">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <FadeIn>
                <div className="overflow-hidden rounded-[2rem] border border-line">
                  <img
                    src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=1000&q=80"
                    alt="Jewellery being appraised"
                    className="h-[380px] w-full object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4">Upload & Estimate</p>
                <h2 className="font-display text-4xl text-ivory md:text-5xl leading-tight">
                  Seen a piece you love? Upload it.
                </h2>
                <p className="mt-5 max-w-md text-ivory-dim/60">
                  Drop in a reference photo and our vision-based estimator reads its metal tone,
                  stonework and complexity — then prices it against our live catalog rates, in
                  seconds.
                </p>
                <Link to="/design" className="inline-block mt-8">
                  <PrimaryButton>Try the AI estimator</PrimaryButton>
                </Link>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="border-t border-line py-28">
          <Container className="text-center">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-6xl text-ivory">
                Your piece, <span className="gold-text">priced honestly</span>, from the first click.
              </h2>
              <Link to="/design" className="inline-block mt-9">
                <PrimaryButton>Start designing — it's free</PrimaryButton>
              </Link>
            </FadeIn>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  )
}
