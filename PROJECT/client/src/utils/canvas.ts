import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { loadFabricImage } from '../services/fabric';
import { getDefaultPlacement, type PlacementBounds } from './placement';
import type { JewelleryItem } from '../types/Jewellery';

export interface AddJewelleryResult {
  object: fabric.Image;
  layerId: string;
}

/**
 * Adds a jewellery PNG/SVG image onto the canvas at a sensible default
 * position derived from the photo bounds, ready for manual fine-tuning.
 */
export const addJewelleryToCanvas = async (
  canvas: fabric.Canvas,
  item: JewelleryItem,
  photoBounds: PlacementBounds
): Promise<AddJewelleryResult> => {
  const img = await loadFabricImage(item.image);
  const placement = getDefaultPlacement(item.anchor, photoBounds);
  const layerId = uuidv4();

  const naturalWidth = img.width || 200;
  const scale = (placement.scaleFactor / naturalWidth) * item.defaultScale;

  img.set({
    left: placement.left,
    top: placement.top,
    originX: 'center',
    originY: 'center',
    scaleX: scale,
    scaleY: scale,
    angle: placement.angle,
    opacity: 1,
    hasControls: true,
    hasBorders: true,
    lockScalingFlip: true,
  });

  img.set('data', {
    layerId,
    jewelleryId: item.id,
    categoryId: item.categoryId,
    name: item.name,
    thumbnail: item.thumbnail,
    isBackground: false,
  });

  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.requestRenderAll();

  return { object: img, layerId };
};

export const getObjectByLayerId = (
  canvas: fabric.Canvas,
  layerId: string
): fabric.Object | undefined =>
  canvas.getObjects().find((o: any) => o.data?.layerId === layerId);

export const deleteActiveObject = (canvas: fabric.Canvas): void => {
  const active = canvas.getActiveObjects();
  active.forEach((obj) => {
    if ((obj as any).data?.isBackground) return;
    canvas.remove(obj);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const deleteLayer = (canvas: fabric.Canvas, layerId: string): void => {
  const obj = getObjectByLayerId(canvas, layerId);
  if (obj) {
    canvas.remove(obj);
    canvas.requestRenderAll();
  }
};

export const duplicateActiveObject = (canvas: fabric.Canvas): void => {
  const active = canvas.getActiveObject();
  if (!active || (active as any).data?.isBackground) return;

  active.clone((cloned: fabric.Object) => {
    const newLayerId = uuidv4();
    cloned.set({
      left: (active.left || 0) + 20,
      top: (active.top || 0) + 20,
    });
    cloned.set('data', { ...(active as any).data, layerId: newLayerId });
    canvas.add(cloned);
    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
  });
};

export const flipActiveObject = (
  canvas: fabric.Canvas,
  axis: 'horizontal' | 'vertical'
): void => {
  const active = canvas.getActiveObject();
  if (!active) return;
  if (axis === 'horizontal') {
    active.set('flipX', !active.flipX);
  } else {
    active.set('flipY', !active.flipY);
  }
  canvas.requestRenderAll();
};

export const rotateActiveObjectBy = (
  canvas: fabric.Canvas,
  deltaDegrees: number
): void => {
  const active = canvas.getActiveObject();
  if (!active) return;
  const current = active.angle || 0;
  active.rotate(current + deltaDegrees);
  canvas.requestRenderAll();
};

export const setActiveObjectOpacity = (
  canvas: fabric.Canvas,
  opacity: number
): void => {
  const active = canvas.getActiveObject();
  if (!active) return;
  active.set('opacity', opacity);
  canvas.requestRenderAll();
};

export const setLayerLocked = (
  canvas: fabric.Canvas,
  layerId: string,
  locked: boolean
): void => {
  const obj = getObjectByLayerId(canvas, layerId);
  if (!obj) return;
  obj.set({
    lockMovementX: locked,
    lockMovementY: locked,
    lockScalingX: locked,
    lockScalingY: locked,
    lockRotation: locked,
    hasControls: !locked,
    selectable: !locked,
  });
  canvas.requestRenderAll();
};

export const setLayerVisible = (
  canvas: fabric.Canvas,
  layerId: string,
  visible: boolean
): void => {
  const obj = getObjectByLayerId(canvas, layerId);
  if (!obj) return;
  obj.set('visible', visible);
  canvas.requestRenderAll();
};

export const reorderLayerToIndex = (
  canvas: fabric.Canvas,
  layerId: string,
  index: number
): void => {
  const obj = getObjectByLayerId(canvas, layerId);
  if (!obj) return;
  canvas.moveTo(obj, index);
  canvas.requestRenderAll();
};

export const bringForward = (canvas: fabric.Canvas): void => {
  const active = canvas.getActiveObject();
  if (!active) return;
  canvas.bringForward(active);
  canvas.requestRenderAll();
};

export const sendBackward = (canvas: fabric.Canvas): void => {
  const active = canvas.getActiveObject();
  if (!active) return;
  const objects = canvas.getObjects();
  const bg = objects.find((o: any) => o.data?.isBackground);
  const bgIndex = bg ? objects.indexOf(bg) : -1;
  if (objects.indexOf(active) <= bgIndex + 1) return;
  canvas.sendBackwards(active);
  canvas.requestRenderAll();
};

export const zoomCanvasTo = (canvas: fabric.Canvas, zoom: number): void => {
  const clamped = Math.min(Math.max(zoom, 0.3), 3);
  const center = canvas.getCenter();
  canvas.zoomToPoint(new fabric.Point(center.left, center.top), clamped);
  canvas.requestRenderAll();
};

export const exportCanvasDataUrl = (
  canvas: fabric.Canvas,
  format: 'jpeg' | 'png' = 'jpeg',
  multiplier = 2
): string => {
  const active = canvas.getActiveObject();
  canvas.discardActiveObject();
  canvas.requestRenderAll();

  const dataUrl = canvas.toDataURL({
    format,
    quality: 1,
    multiplier,
  });

  if (active) {
    canvas.setActiveObject(active);
    canvas.requestRenderAll();
  }

  return dataUrl;
};

export interface ImageAdjustments {
  brightness: number; // -1 to 1
  contrast: number; // -1 to 1
  saturation: number; // -1 to 1
}

/**
 * Rebuilds the fabric image filter pipeline (brightness/contrast/saturation)
 * on the active object, if it's an image. Safe no-op otherwise.
 */
export const setActiveObjectAdjustments = (
  canvas: fabric.Canvas,
  { brightness, contrast, saturation }: ImageAdjustments
): void => {
  const active = canvas.getActiveObject() as fabric.Image | undefined;
  if (!active || active.type !== 'image') return;

  const filters: any[] = [];
  if (brightness !== 0) {
    filters.push(new fabric.Image.filters.Brightness({ brightness }));
  }
  if (contrast !== 0) {
    filters.push(new fabric.Image.filters.Contrast({ contrast }));
  }
  if (saturation !== 0) {
    filters.push(new fabric.Image.filters.Saturation({ saturation }));
  }

  active.filters = filters;
  active.applyFilters();
  canvas.requestRenderAll();
};

export const getLayersFromCanvas = (canvas: fabric.Canvas) =>
  canvas
    .getObjects()
    .filter((o: any) => !o.data?.isBackground)
    .map((o: any) => ({
      layerId: o.data?.layerId as string,
      jewelleryId: o.data?.jewelleryId as string,
      categoryId: o.data?.categoryId,
      name: o.data?.name as string,
      thumbnail: o.data?.thumbnail as string,
      locked: !!o.lockMovementX,
      visible: o.visible !== false,
      opacity: o.opacity ?? 1,
    }))
    .reverse();
