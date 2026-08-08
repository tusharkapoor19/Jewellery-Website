/**
 * Reads a File/Blob and resolves it to a base64 data URL.
 */
export const fileToDataUrl = (file: File | Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

/**
 * Loads a data URL / URL into an HTMLImageElement.
 */
export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });

interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

/**
 * Compresses / resizes an image data URL using an offscreen canvas.
 * Keeps aspect ratio, caps the longest edge to maxWidth/maxHeight.
 */
export const compressImage = async (
  dataUrl: string,
  { maxWidth = 1600, maxHeight = 1600, quality = 0.9 }: CompressOptions = {}
): Promise<string> => {
  const img = await loadImage(dataUrl);
  let { width, height } = img;

  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  width = Math.round(width * ratio);
  height = Math.round(height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;

  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', quality);
};

/**
 * Applies a simple gaussian-like blur to the background using CSS filter
 * baked into a canvas (used for the optional background blur feature).
 */
export const blurImage = async (
  dataUrl: string,
  blurPx = 8
): Promise<string> => {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;
  ctx.filter = `blur(${blurPx}px)`;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.92);
};

/**
 * Center-crops an image to a target aspect ratio (width/height).
 */
export const autoCropToAspect = async (
  dataUrl: string,
  targetAspect = 3 / 4
): Promise<string> => {
  const img = await loadImage(dataUrl);
  const srcAspect = img.width / img.height;

  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (srcAspect > targetAspect) {
    sw = img.height * targetAspect;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / targetAspect;
    sy = (img.height - sh) / 2;
  }

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  return canvas.toDataURL('image/jpeg', 0.92);
};

export const isImageFile = (file: File): boolean => file.type.startsWith('image/');
