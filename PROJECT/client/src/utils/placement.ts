import type { AnchorType } from '../types/Jewellery';

export interface PlacementBounds {
  /** left edge of the photo on the canvas */
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PlacementResult {
  left: number;
  top: number;
  scaleFactor: number;
  angle: number;
}

/**
 * Returns a sensible default position/scale for a jewellery item based on
 * simple proportional anchoring against the uploaded photo's bounding box.
 * No face/hand detection is used — the user fine-tunes placement manually
 * with the canvas controls (drag, resize, rotate) after it's added.
 */
export const getDefaultPlacement = (
  anchor: AnchorType,
  bounds: PlacementBounds
): PlacementResult => {
  const { left, top, width, height } = bounds;

  switch (anchor) {
    case 'neck':
      return {
        left: left + width * 0.5,
        top: top + height * 0.62,
        scaleFactor: width * 0.34,
        angle: 0,
      };
    case 'chest':
      return {
        left: left + width * 0.5,
        top: top + height * 0.72,
        scaleFactor: width * 0.22,
        angle: 0,
      };
    case 'ear-both':
      return {
        left: left + width * 0.5,
        top: top + height * 0.34,
        scaleFactor: width * 0.42,
        angle: 0,
      };
    case 'ear-left':
      return {
        left: left + width * 0.26,
        top: top + height * 0.34,
        scaleFactor: width * 0.14,
        angle: 0,
      };
    case 'ear-right':
      return {
        left: left + width * 0.74,
        top: top + height * 0.34,
        scaleFactor: width * 0.14,
        angle: 0,
      };
    case 'nose':
      return {
        left: left + width * 0.5,
        top: top + height * 0.4,
        scaleFactor: width * 0.06,
        angle: 0,
      };
    case 'finger':
      return {
        left: left + width * 0.5,
        top: top + height * 0.5,
        scaleFactor: width * 0.14,
        angle: 0,
      };
    case 'wrist':
      return {
        left: left + width * 0.5,
        top: top + height * 0.55,
        scaleFactor: width * 0.2,
        angle: 0,
      };
    default:
      return {
        left: left + width * 0.5,
        top: top + height * 0.5,
        scaleFactor: width * 0.25,
        angle: 0,
      };
  }
};
