import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { DesignSelection, PriceEstimate } from '../types'
import { calculatePriceEstimate } from '../utils/priceCalculator'
import { useLiveMetalRates } from '../services/pricing/liveMetalRates'

const initialSelection: DesignSelection = {
  jewellery: null,
  material: null,
  purity: null,
  gemstones: [],
  gemstonePurity: 50,
  style: null,
  budget: 100000,
  referenceImage: null,
  weight: 0,
}

interface DesignContextValue {
  selection: DesignSelection
  updateSelection: (patch: Partial<DesignSelection>) => void
  resetSelection: () => void
  estimate: PriceEstimate
  step: number
  setStep: (step: number) => void
}

const DesignContext = createContext<DesignContextValue | undefined>(undefined)

export function DesignProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<DesignSelection>(initialSelection)
  const [step, setStep] = useState(0)
  // Subscribing to the live rate feed here means the price estimate
  // recomputes on every 60s rate refresh too, not just when the customer
  // changes a selection — so the total stays in sync with the live rate
  // shown in the TopBar ticker and the Material/Purity steps.
  const { rates } = useLiveMetalRates()

  const updateSelection = (patch: Partial<DesignSelection>) => {
    setSelection((prev) => ({ ...prev, ...patch }))
  }

  const resetSelection = () => {
    setSelection(initialSelection)
    setStep(0)
  }

  const estimate = useMemo(() => calculatePriceEstimate(selection), [selection, rates])

  const value: DesignContextValue = {
    selection,
    updateSelection,
    resetSelection,
    estimate,
    step,
    setStep,
  }

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export function useDesignContext(): DesignContextValue {
  const ctx = useContext(DesignContext)
  if (!ctx) throw new Error('useDesignContext must be used within a DesignProvider')
  return ctx
}
