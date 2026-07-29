import { fabric } from 'fabric';

export const CANVAS_BG = '#eeeae1';

/**
 * Creates and configures a fabric.Canvas instance with sensible defaults
 * for the try-on editor (object caching, selection styling, etc).
 */
export const createFabricCanvas = (
  el: HTMLCanvasElement,
  width: number,
  height: number
): fabric.Canvas => {
  const canvas = new fabric.Canvas(el, {
    width,
    height,
    backgroundColor: CANVAS_BG,
    preserveObjectStacking: true,
    selection: true,
    stopContextMenu: true,
  });

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = '#c9a24b';
  fabric.Object.prototype.cornerStrokeColor = '#0b0e11';
  fabric.Object.prototype.borderColor = '#c9a24b';
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.cornerSize = 12;
  fabric.Object.prototype.padding = 4;
  fabric.Object.prototype.borderScaleFactor = 2;

  return canvas;
};

/**
 * Loads an image URL as a fabric.Image, wrapped in a promise.
 */
export const loadFabricImage = (url: string): Promise<fabric.Image> =>
  new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      url,
      (img) => {
        if (!img || !img.width || !img.height) {
          reject(new Error('Failed to load jewellery image'));
          return;
        }
        resolve(img);
      },
      { crossOrigin: 'anonymous' }
    );
  });

/**
 * Fits the background photo into the canvas, centered, preserving aspect
 * ratio (contain behaviour), and returns the resulting bounding box.
 */
// export const setBackgroundPhoto = async (
//   canvas: fabric.Canvas,
//   url: string
// ): Promise<{ left: number; top: number; width: number; height: number }> => {
//   const img = await loadFabricImage(url);
//   const canvasWidth = canvas.getWidth();
//   const canvasHeight = canvas.getHeight();

//   const scale = Math.min(
//     canvasWidth / (img.width || 1),
//     canvasHeight / (img.height || 1)
//   );

//   const displayWidth = (img.width || 0) * scale;
//   const displayHeight = (img.height || 0) * scale;
//   const left = (canvasWidth - displayWidth) / 2;
//   const top = (canvasHeight - displayHeight) / 2;

//   img.set({
//     left,
//     top,
//     scaleX: scale,
//     scaleY: scale,
//     selectable: false,
//     evented: false,
//     hoverCursor: 'default',
//   });
//   img.set('data', { isBackground: true });

//   const existingBg = canvas
//     .getObjects()
//     .find((o: any) => o.data?.isBackground);
//   if (existingBg) canvas.remove(existingBg);

//   canvas.add(img);
//   canvas.sendToBack(img);
//   canvas.requestRenderAll();

//   return { left, top, width: displayWidth, height: displayHeight };
// };


export const applyBackgroundImage = (
  canvas: fabric.Canvas,
  img: fabric.Image
): { left: number; top: number; width: number; height: number } => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const scale = Math.min(
    canvasWidth / (img.width || 1),
    canvasHeight / (img.height || 1)
  );

  const displayWidth = (img.width || 0) * scale;
  const displayHeight = (img.height || 0) * scale;
  const left = (canvasWidth - displayWidth) / 2;
  const top = (canvasHeight - displayHeight) / 2;

  img.set({
    left,
    top,
    scaleX: scale,
    scaleY: scale,
    selectable: false,
    evented: false,
    hoverCursor: 'default',
  });
  img.set('data', { isBackground: true });

  const existingBg = canvas.getObjects().find((o: any) => o.data?.isBackground);
  if (existingBg) canvas.remove(existingBg);

  canvas.add(img);
  canvas.sendToBack(img);
  canvas.requestRenderAll();

  return { left, top, width: displayWidth, height: displayHeight };
};

export const setBackgroundPhoto = async (
  canvas: fabric.Canvas,
  url: string
): Promise<{ left: number; top: number; width: number; height: number }> => {
  const img = await loadFabricImage(url);
  return applyBackgroundImage(canvas, img);
};
