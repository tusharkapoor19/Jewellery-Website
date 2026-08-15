import { useEffect, useState } from 'react'
import { materials } from '../../data/materials'
import type { MaterialId } from '../../types'

/**
 * Single source of truth for live bullion rates, shared by the TopBar
 * ticker and the Custom Design configurator (MaterialSelector,
 * PuritySelector, CostBreakdown, AIPriceEstimator, etc.) so every price
 * shown across the app is computed from the *same* live rate instead of
 * each component fetching independently and drifting apart.
 *
 * Rates are INR-per-gram, gold quoted at 24K/999-fine (matches the
 * ratePerGram basis documented on types.Material), silver and platinum at
 * their spot purity — purity-specific rates are derived from these via
 * getEffectiveRate() in utils/metalRates.ts.
 */

const TROY_OUNCE_TO_GRAM = 31.1035

// India market premiums over international spot (import duty, GST on
// bullion, dealer margin) — same figures the TopBar ticker has always used.
const GOLD_PREMIUM = 14.9
const SILVER_PREMIUM = 18.46
const PLATINUM_PREMIUM = 14

const REFRESH_INTERVAL_MS = 60000

export interface LiveMetalRates {
  gold: number
  silver: number
  platinum: number
}

// Static fallback (from data/materials.ts) used until the first live fetch
// resolves, or if the live fetch fails (offline, rate-limited, etc.) — so
// pricing never breaks, it just temporarily shows the last-known-good rate.
const staticFallback: LiveMetalRates = {
  gold: materials.find((m) => m.id === 'gold')?.ratePerGram ?? 0,
  silver: materials.find((m) => m.id === 'silver')?.ratePerGram ?? 0,
  platinum: materials.find((m) => m.id === 'platinum')?.ratePerGram ?? 0,
}

let cachedRates: LiveMetalRates = { ...staticFallback }
let hasFetchedOnce = false
let inFlight: Promise<LiveMetalRates> | null = null
const subscribers = new Set<(rates: LiveMetalRates) => void>()

function readCachedFromStorage(): LiveMetalRates | null {
  try {
    const gold = Number(localStorage.getItem('goldRate'))
    const silver = Number(localStorage.getItem('silverRate'))
    const platinum = Number(localStorage.getItem('platinumRate'))
    if (gold > 0 && silver > 0 && platinum > 0) {
      return { gold, silver, platinum }
    }
  } catch {
    // localStorage unavailable (SSR / privacy mode) — ignore.
  }
  return null
}

// Prime the in-memory cache from localStorage synchronously (written by a
// previous fetch, possibly this session's TopBar mount) so the very first
// render already shows a real rate instead of the static fallback.
const stored = readCachedFromStorage()
if (stored) {
  cachedRates = stored
  hasFetchedOnce = true
}

function notify() {
  subscribers.forEach((cb) => cb(cachedRates))
}

async function fetchLiveMetalRates(): Promise<LiveMetalRates> {
  if (inFlight) return inFlight

  inFlight = (async () => {
    try {
      const [goldRes, silverRes, platinumRes, currencyRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU'),
        fetch('https://api.gold-api.com/price/XAG'),
        fetch('https://api.gold-api.com/price/XPT'),
        fetch('https://open.er-api.com/v6/latest/USD'),
      ])

      if (!goldRes.ok || !silverRes.ok || !platinumRes.ok || !currencyRes.ok) {
        throw new Error('Unable to fetch metal prices')
      }

      const [goldData, silverData, platinumData, currencyData] = await Promise.all([
        goldRes.json(),
        silverRes.json(),
        platinumRes.json(),
        currencyRes.json(),
      ])

      const usdToInr = Number(currencyData?.rates?.INR)
      if (!usdToInr) throw new Error('USD to INR rate unavailable')

      const goldSpot = (Number(goldData.price) * usdToInr) / TROY_OUNCE_TO_GRAM
      const silverSpot = (Number(silverData.price) * usdToInr) / TROY_OUNCE_TO_GRAM
      const platinumSpot = (Number(platinumData.price) * usdToInr) / TROY_OUNCE_TO_GRAM

      const gold = goldSpot * (1 + GOLD_PREMIUM / 100)
      const silver = silverSpot * (1 + SILVER_PREMIUM / 100)
      const platinum = platinumSpot * (1 + PLATINUM_PREMIUM / 100)

      cachedRates = { gold, silver, platinum }
      hasFetchedOnce = true

      try {
        localStorage.setItem('goldRate', String(gold))
        localStorage.setItem('silverRate', String(silver))
        localStorage.setItem('platinumRate', String(platinum))
      } catch {
        // ignore storage failures
      }

      notify()
      return cachedRates
    } catch (error) {
      console.error('Live metal rate fetch failed, using last-known rate:', error)
      return cachedRates
    } finally {
      inFlight = null
    }
  })()

  return inFlight
}

// Synchronous getter — safe to call from non-React code (e.g.
// utils/metalRates.ts's calculatePriceEstimate) since it just reads
// whatever the shared cache currently holds.
export function getCachedRatePerGram(materialId: MaterialId): number {
  return cachedRates[materialId] ?? staticFallback[materialId] ?? 0
}

export function hasLiveRates(): boolean {
  return hasFetchedOnce
}

/**
 * React hook: fetches live rates on mount (if not already cached this
 * session), refreshes every 60s, and re-renders the calling component
 * whenever new rates come in. Multiple components mounting this
 * simultaneously share a single in-flight request.
 */
export function useLiveMetalRates() {
  const [rates, setRates] = useState<LiveMetalRates>(cachedRates)
  const [loading, setLoading] = useState(!hasFetchedOnce)

  useEffect(() => {
    let cancelled = false
    subscribers.add(setRates)

    const run = async () => {
      const result = await fetchLiveMetalRates()
      if (!cancelled) {
        setRates(result)
        setLoading(false)
      }
    }
    run()

    const interval = setInterval(run, REFRESH_INTERVAL_MS)

    return () => {
      cancelled = true
      subscribers.delete(setRates)
      clearInterval(interval)
    }
  }, [])

  return { rates, loading }
}
