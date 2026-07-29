import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import {
  startCameraStream,
  stopCameraStream,
  captureFrame,
  type FacingMode,
} from '../../services/camera';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('user');
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setIsReady(false);
    setError(null);

    (async () => {
      try {
        stopCameraStream(streamRef.current);
        const stream = await startCameraStream({ facingMode, hd: true });
        if (cancelled) {
          stopCameraStream(stream);
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsReady(true);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    })();

    return () => {
      cancelled = true;
      stopCameraStream(streamRef.current);
      streamRef.current = null;
    };
  }, [isOpen, facingMode]);

  const handleCapture = () => {
    if (!videoRef.current || !isReady) return;
    const dataUrl = captureFrame(videoRef.current, facingMode === 'user');
    if (!dataUrl) {
      toast.error('Could not capture photo, please try again.');
      return;
    }
    onCapture(dataUrl);
    toast.success('Photo captured!');
    onClose();
  };

  const handleSwitchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Take a photo" maxWidth={640}>
      <div className="camera-capture">
        {error ? (
          <div className="camera-error">
            <p>{error}</p>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="camera-viewport">
              <video
                ref={videoRef}
                muted
                playsInline
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              />
              {!isReady && <div className="camera-loading">Starting camera…</div>}
              <div className="camera-oval-guide" />
            </div>
            <div className="camera-controls">
              <Button variant="ghost" onClick={handleSwitchCamera} icon="🔄">
                Switch camera
              </Button>
              <button
                className="camera-shutter"
                onClick={handleCapture}
                disabled={!isReady}
                aria-label="Capture photo"
              >
                <span />
              </button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CameraCapture;
