import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import DragDrop from './DragDrop';
import CameraCapture from './CameraCapture';
import Button from '../Common/Button';
import Loader from '../Loader/Loader';
import { useImageStore } from '../../store/imageStore';
import { fileToDataUrl, compressImage, isImageFile } from '../../utils/image';

const UploadPhoto: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setPhoto = useImageStore((s) => s.setPhoto);
  const isCameraOpen = useImageStore((s) => s.isCameraOpen);
  const openCamera = useImageStore((s) => s.openCamera);
  const closeCamera = useImageStore((s) => s.closeCamera);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncomingFile = async (file: File) => {
    if (!isImageFile(file)) {
      toast.error('Please choose an image file.');
      return;
    }
    setIsLoading(true);
    try {
      const raw = await fileToDataUrl(file);
      const compressed = await compressImage(raw, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.92,
      });
      setPhoto(compressed);
      toast.success('Photo ready! Pick a jewellery design to begin.');
    } catch {
      toast.error('Something went wrong reading that photo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapture = async (dataUrl: string) => {
    setIsLoading(true);
    try {
      const compressed = await compressImage(dataUrl, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.92,
      });
      setPhoto(compressed);
      toast.success('Photo ready! Pick a jewellery design to begin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Paste-to-upload support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items || []).find((i) =>
        i.type.startsWith('image/')
      );
      const file = item?.getAsFile();
      if (file) handleIncomingFile(file);
    };
    const listener = handlePaste as EventListener;
    window.addEventListener('paste', listener);
    return () => window.removeEventListener('paste', listener)
  }, []);

  return (
    <DragDrop onFile={handleIncomingFile} className="upload-hero">
      <motion.div
        className="upload-hero-inner"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="upload-hero-eyebrow">HIRANYA Try-On Studio</span>
        <h2 className="upload-hero-title">
          Try Jewellery <em>Virtually</em>
        </h2>
        <p className="upload-hero-subtitle">
          Upload your photo to start &mdash; drag &amp; drop, paste, or use your camera.
        </p>

        {isLoading ? (
          <Loader label="Preparing your photo…" />
        ) : (
          <div className="upload-hero-actions">
            <Button
              variant="primary"
              size="lg"
              icon="🖼️"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Photo
            </Button>
            <span className="upload-hero-or">or</span>
            <Button variant="secondary" size="lg" icon="📷" onClick={openCamera}>
              Open Camera
            </Button>
          </div>
        )}

        <p className="upload-hero-hint">
          Tip: a clear, front-facing photo with good lighting works best.
        </p>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleIncomingFile(file);
          e.target.value = '';
        }}
      />

      <CameraCapture
        isOpen={isCameraOpen}
        onClose={closeCamera}
        onCapture={handleCapture}
      />
    </DragDrop>
  );
};

export default UploadPhoto;
