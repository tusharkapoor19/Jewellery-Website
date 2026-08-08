import { readFileAsDataURL } from '../../utils/helpers'

/**
 * Image upload service. Wire REACT_APP_CLOUDINARY_CLOUD_NAME and
 * REACT_APP_CLOUDINARY_UPLOAD_PRESET in a .env file to enable real Cloudinary
 * uploads. Without those set, the app falls back to a local data-URL so
 * the reference image and AI estimator still work fully offline.
 */
export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string | undefined
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string | undefined

  if (!cloudName || !uploadPreset) {
    return readFileAsDataURL(file)
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    // Fall back gracefully rather than breaking the flow.
    return readFileAsDataURL(file)
  }

  const data = await res.json()
  return data.secure_url as string
}
