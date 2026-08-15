/**
 * Lightweight, fully client-side visual analysis of an uploaded reference
 * image. This is NOT a trained ML model — there's no backend here — but a
 * deterministic heuristic pipeline that:
 *   1. Reads pixel data from a downscaled canvas.
 *   2. Measures colour temperature to guess the metal tone (yellow gold vs
 *      white metal vs rose gold).
 *   3. Measures local pixel variance ("visual complexity") as a proxy for
 *      how intricate the piece looks — more edges/detail generally means
 *      more stonework or filigree, which correlates with cost.
 *   4. Measures the fraction of very bright / high-saturation pixels as a
 *      proxy for stone sparkle (diamonds/gems catch and scatter light).
 *
 * The output feeds into estimateFromImage.ts to produce a price range. It is
 * explicitly framed to users as an approximation, not an appraisal.
 */

export interface VisualAnalysis {
  dominantTone: 'yellow-gold' | 'white-metal' | 'rose-gold' | 'mixed'
  complexityScore: number // 0-100
  sparkleScore: number // 0-100
  brightnessAvg: number // 0-255
}

export async function analyzeImage(dataUrl: string): Promise<VisualAnalysis> {
  const img = await loadImage(dataUrl)
  const canvas = document.createElement('canvas')
  const size = 160 // downscale for speed
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    return { dominantTone: 'mixed', complexityScore: 50, sparkleScore: 40, brightnessAvg: 128 }
  }
  ctx.drawImage(img, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)

  let rSum = 0, gSum = 0, bSum = 0
  let brightPixels = 0
  const grays: number[] = []

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    rSum += r; gSum += g; bSum += b
    const gray = 0.299 * r + 0.587 * g + 0.114 * b
    grays.push(gray)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const saturation = max === 0 ? 0 : (max - min) / max
    if (gray > 200 && saturation < 0.25) brightPixels++
  }

  const pixelCount = data.length / 4
  const rAvg = rSum / pixelCount
  const gAvg = gSum / pixelCount
  const bAvg = bSum / pixelCount
  const brightnessAvg = (rAvg + gAvg + bAvg) / 3

  // Local variance (complexity): compare each pixel to its right neighbour.
  let varianceSum = 0
  let count = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size - 1; x++) {
      const idx = y * size + x
      const diff = Math.abs(grays[idx] - grays[idx + 1])
      varianceSum += diff
      count++
    }
  }
  const avgVariance = varianceSum / count
  const complexityScore = Math.round(clamp((avgVariance / 40) * 100, 8, 96))
  const sparkleScore = Math.round(clamp((brightPixels / pixelCount) * 300, 5, 95))

  let dominantTone: VisualAnalysis['dominantTone'] = 'mixed'
  if (rAvg > gAvg * 1.05 && gAvg > bAvg * 1.05 && rAvg - bAvg > 15) dominantTone = 'yellow-gold'
  else if (rAvg > gAvg && rAvg > bAvg && rAvg - gAvg > 10 && gAvg - bAvg < 8) dominantTone = 'rose-gold'
  else if (Math.abs(rAvg - gAvg) < 10 && Math.abs(gAvg - bAvg) < 10) dominantTone = 'white-metal'

  return { dominantTone, complexityScore, sparkleScore, brightnessAvg }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // Reference photos can now come back as a real hosted URL from
    // custom-design-services' /upload-image endpoint (not just a same-
    // origin base64 data URL) — request it CORS-enabled so canvas pixel
    // reads below (getImageData) don't throw a "tainted canvas" error.
    // The backend already sends Access-Control-Allow-Origin via its
    // global cors() middleware, which also covers the static file route.
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous'
    }
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load image'))
    img.src = src
  })
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}
