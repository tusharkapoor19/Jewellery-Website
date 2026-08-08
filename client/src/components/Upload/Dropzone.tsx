import { useCallback, useRef, useState } from 'react'
import { isValidImageFile } from '../../utils/validators'

interface Props {
  onFile: (file: File) => void
  previewUrl?: string | null
  busy?: boolean
}

export default function Dropzone({ onFile, previewUrl, busy }: Props) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0]
      if (!file) return
      if (!isValidImageFile(file)) {
        setError('Please upload a JPG, PNG or WEBP under 8MB.')
        return
      }
      setError(null)
      onFile(file)
    },
    [onFile]
  )

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? 'border-gold bg-gold/[0.06]' : 'border-line hover:border-gold/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Reference upload" className="max-h-56 rounded-xl object-contain" />
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path
                  d="M12 16V4m0 0L7 9m5-5l5 5M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-ivory">Drop a reference photo, or click to browse</p>
              <p className="mt-1 text-xs text-ivory-dim/50">JPG, PNG or WEBP · up to 8MB</p>
            </div>
          </>
        )}
        {busy && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-ink/70 backdrop-blur-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-gold animate-pulse">
              Analysing image…
            </span>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-rose">{error}</p>}
    </div>
  )
}
