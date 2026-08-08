import './CustomDesign.css'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '../../components/Common/Container'
import StepIndicator from '../../components/Common/StepIndicator'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import GhostButton from '../../components/Buttons/GhostButton'
import LiveLedger from '../../components/Pricing/LiveLedger'
import HeroSection from './sections/HeroSection'
import JewellerySelector from './sections/JewellerySelector'
import MaterialSelector from './sections/MaterialSelector'
import PuritySelector from './sections/PuritySelector'
import GemstoneSelector from './sections/GemstoneSelector'
import StyleSelector from './sections/StyleSelector'
import BudgetEstimator from './sections/BudgetEstimator'
import ImageUploader from './sections/ImageUploader'
import AIPriceEstimator from './sections/AIPriceEstimator'
import ReviewSubmit from './sections/ReviewSubmit'
import { DesignProvider } from '../../context/DesignContext'
import { useDesignFlow } from '../../hooks/useDesignFlow'
import Topbar from "../../components/TopBar/TopBar"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

const STEPS = [
  JewellerySelector,
  MaterialSelector,
  PuritySelector,
  GemstoneSelector,
  StyleSelector,
  BudgetEstimator,
  ImageUploader,
  AIPriceEstimator,
  ReviewSubmit,
]

function CustomDesignFlow() {
  const { step, next, back, goTo, canGoNext, totalSteps } = useDesignFlow()
  const StepComponent = STEPS[step]
  const isFinalStep = step === totalSteps - 1

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="min-h-screen bg-ink pb-24 pt-28">
        <Container>
          <HeroSection />
          <div className="sticky top-0 z-20 -mx-6 mb-10 border-y border-line bg-ink/90 px-6 py-3 backdrop-blur-md md:-mx-10 md:px-10">
            <StepIndicator step={step} onJump={goTo} />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>

              {!isFinalStep && (
                <div className="mt-12 flex items-center justify-between">
                  <GhostButton onClick={back} disabled={step === 0}>
                    Back
                  </GhostButton>
                  <PrimaryButton onClick={next} disabled={!canGoNext}>
                    Continue
                  </PrimaryButton>
                </div>
              )}
            </div>

            <div className="hidden lg:block">
              <LiveLedger />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default function CustomDesign() {
  return (
    <DesignProvider>
      <CustomDesignFlow />
    </DesignProvider>
  )
}
