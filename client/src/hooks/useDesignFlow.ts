import { useDesignContext } from '../context/DesignContext'

export const STEP_LABELS = [
  'Jewellery',
  'Material',
  'Purity',
  'Stones',
  'Style',
  'Budget',
  'Reference',
  'AI Estimate',
  'Review & Submit',
]

export function useDesignFlow() {
  const { step, setStep, selection } = useDesignContext()

  const canGoNext = (): boolean => {
    switch (step) {
      case 0: return !!selection.jewellery
      case 1: return !!selection.material
      case 2: return !!selection.purity
      case 3: return true // stones optional
      case 4: return !!selection.style
      case 5: return selection.budget > 0
      default: return true
    }
  }

  const next = () => setStep(Math.min(step + 1, STEP_LABELS.length - 1))
  const back = () => setStep(Math.max(step - 1, 0))
  const goTo = (index: number) => setStep(Math.max(0, Math.min(index, STEP_LABELS.length - 1)))

  return { step, next, back, goTo, canGoNext: canGoNext(), totalSteps: STEP_LABELS.length }
}
