import { useState } from 'react'
import SectionHeading from '../../../../components/Common/SectionHeading'
import FadeIn from '../../../../components/Animations/FadeIn'
import Dropzone from '../../../../components/Upload/Dropzone'
import { useDesignContext } from '../../../../context/DesignContext'
import { uploadReferenceImage } from '../../../../services/upload/uploadReferenceImage'

export default function ImageUploader() {
  const { selection, updateSelection } = useDesignContext()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setBusy(true)
    setError(null)
    try {
      const url = await uploadReferenceImage(file)
      updateSelection({ referenceImage: url })
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <FadeIn>
      <SectionHeading
        eyebrow="Step 07"
        title="Have a reference photo?"
        description="Upload an image of jewellery you love — we'll estimate its price on the next step. Optional."
      />
      <div className="mt-8 max-w-xl">
        <Dropzone onFile={handleFile} previewUrl={selection.referenceImage} busy={busy} />
        {error && <p className="mt-2 text-sm text-rose">{error}</p>}
        {selection.referenceImage && (
          <button
            onClick={() => updateSelection({ referenceImage: null })}
            className="mt-3 font-mono text-xs uppercase tracking-widest text-ivory-dim/50 hover:text-rose"
          >
            Remove image
          </button>
        )}
      </div>
    </FadeIn>
  )
}
