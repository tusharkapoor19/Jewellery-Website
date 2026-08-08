export type FacingMode = 'user' | 'environment';

export interface CameraStreamOptions {
  facingMode?: FacingMode;
  hd?: boolean;
}

/**
 * Requests a camera media stream. Throws a friendly error message on
 * permission denial or when no camera is available.
 */
export const startCameraStream = async ({
  facingMode = 'user',
  hd = true,
}: CameraStreamOptions = {}): Promise<MediaStream> => {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Camera is not supported in this browser.');
  }

  const constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode,
      width: hd ? { ideal: 1920 } : { ideal: 1280 },
      height: hd ? { ideal: 1080 } : { ideal: 720 },
    },
  };

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    const error = err as DOMException;
    if (error.name === 'NotAllowedError') {
      throw new Error('Camera permission denied. Please allow camera access.');
    }
    if (error.name === 'NotFoundError') {
      throw new Error('No camera was found on this device.');
    }
    throw new Error('Unable to access the camera.');
  }
};

export const stopCameraStream = (stream: MediaStream | null): void => {
  stream?.getTracks().forEach((track) => track.stop());
};

/**
 * Captures the current frame of a <video> element to a JPEG data URL.
 */
export const captureFrame = (
  video: HTMLVideoElement,
  mirror = true
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (mirror) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.95);
};

export const getAvailableCameras = async (): Promise<MediaDeviceInfo[]> => {
  if (!navigator.mediaDevices?.enumerateDevices) return [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((d) => d.kind === 'videoinput');
};
