import { CUSTOM_DESIGN_API_BASE } from '../../config'
import { readFileAsDataURL } from '../../utils/helpers'

/**
 * Uploads a Custom Design "reference photo" using the exact same
 * pattern as the admin catalogue's product image upload
 * (client/src/api/products.ts#uploadProductImage): a multipart FormData
 * POST with field name "image" to a backend `/upload-image` route that
 * returns `{ url }`, with a client-side base64 data-URL fallback if the
 * request fails for any reason (offline, backend down, etc.) so the
 * upload step never blocks the customer from continuing.
 *
 * Hits custom-design-services' own `/upload-image` route (see
 * backend/microservice/custom-design-services/src/routes/customDesignRoutes.js
 * + middleware/upload.js), which actually persists the file to disk and
 * serves it back statically — unlike the previous Cloudinary-only flow,
 * which silently fell back to base64 whenever Cloudinary env vars weren't
 * configured (the default, since none ship in this repo).
 */
export async function uploadReferenceImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch(`${CUSTOM_DESIGN_API_BASE}/upload-image`, {
      method: 'POST',
      body: formData, // no Content-Type header — browser sets the multipart boundary
    })

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return await readFileAsDataURL(file)
    }

    const data = await response.json()
    if (!response.ok || !data?.data?.url) {
      throw new Error(data?.message || 'Image upload failed')
    }
    return data.data.url as string
  } catch {
    // Network error, backend down, or bad response — fall back to a local
    // data URL so the customer can still preview + submit their photo.
    return readFileAsDataURL(file)
  }
}
