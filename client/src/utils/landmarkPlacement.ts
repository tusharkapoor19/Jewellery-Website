import type { FaceFeatures, HandFeatures, Point } from '../services/ai/bodyLandmarks';
import type { PlacementBounds, PlacementResult } from './placement';

/** Converts a normalized (0-1) landmark point into canvas pixel space. */
const toCanvas = (p: Point, bounds: PlacementBounds) => ({
  x: bounds.left + p.x * bounds.width,
  y: bounds.top + p.y * bounds.height,
});

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

/** Angle (degrees) of the vector from a to b, matching fabric.js's clockwise convention. */
const angleDeg = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

/**
 * Necklace placement anchored just below the chin, sized off real jaw
 * width and rotated to match head tilt — instead of a fixed percentage
 * of the photo.
 */
export function necklacePlacementFromFace(
  face: FaceFeatures,
  bounds: PlacementBounds
): PlacementResult {
  const leftEye = toCanvas(face.leftEye, bounds);
  const rightEye = toCanvas(face.rightEye, bounds);
  const chin = toCanvas(face.chin, bounds);
  const forehead = toCanvas(face.foreheadTop, bounds);
  const jawLeft = toCanvas(face.jawLeft, bounds);
  const jawRight = toCanvas(face.jawRight, bounds);

  const faceHeight = distance(forehead, chin);
  const jawWidth = distance(jawLeft, jawRight);
  const tilt = angleDeg(leftEye, rightEye);

  return {
    left: chin.x,
    top: chin.y + faceHeight * 0.55,
    // A necklace flares out wider than the jaw as it drapes toward the
    // chest. This is close to right already — nudged up ~2% only.
    scaleFactor: Math.max(jawWidth * 1.53, bounds.width * 0.163),
    angle: tilt,
  };
}

/**
 * Earring placement anchored to the detected ear(s).
 *
 * The jewellery artwork for an earring item is a single earring (see the
 * sidebar thumbnails — one stud/jhumka, not two side by side). So
 * `ear-both` must place that SAME image twice, once at each ear, each at
 * single-earring size — not once, stretched to span the distance between
 * the ears. Stretching a single-earring image across the whole face is
 * what was producing the giant centered "pendant" on the nose/mouth.
 *
 * `ear-left` / `ear-right` return a single placement for a single ear.
 * `ear-both` returns a tuple of two placements: left ear, then right ear
 * (mirrored via `flipX`, since real earring pairs are mirror images of
 * each other but the art asset only has one orientation).
 */
export function earringPlacementFromFace(
  face: FaceFeatures,
  bounds: PlacementBounds,
  side: 'ear-left' | 'ear-right'
): PlacementResult;
export function earringPlacementFromFace(
  face: FaceFeatures,
  bounds: PlacementBounds,
  side: 'ear-both'
): [PlacementResult, PlacementResult];
export function earringPlacementFromFace(
  face: FaceFeatures,
  bounds: PlacementBounds,
  side: 'ear-both' | 'ear-left' | 'ear-right'
): PlacementResult | [PlacementResult, PlacementResult] {
  const leftEar = toCanvas(face.leftEar, bounds);
  const rightEar = toCanvas(face.rightEar, bounds);
  const leftEye = toCanvas(face.leftEye, bounds);
  const rightEye = toCanvas(face.rightEye, bounds);
  const tilt = angleDeg(leftEye, rightEye);
  const earSpan = distance(leftEar, rightEar);
  // Single-earring size, same formula used for the single-ear anchors below.
  // 0.3x ear-span was rendering as noticeably smaller than the studs/
  // jhumkas actually are relative to a face — bumped to 0.4x with a
  // higher floor so it reads as an actual piece of jewellery rather than
  // a faint dot near the ear.
  const earScale = Math.max(earSpan * 0.4, bounds.width * 0.1);

  if (side === 'ear-left') {
    return {
      left: leftEar.x,
      top: leftEar.y,
      scaleFactor: earScale,
      angle: tilt,
    };
  }

  if (side === 'ear-right') {
    return {
      left: rightEar.x,
      top: rightEar.y,
      scaleFactor: earScale,
      angle: tilt,
    };
  }

  return [
    {
      left: leftEar.x,
      top: leftEar.y,
      scaleFactor: earScale,
      angle: tilt,
    },
    {
      left: rightEar.x,
      top: rightEar.y,
      scaleFactor: earScale,
      angle: tilt,
      flipX: true,
    },
  ];
}

/**
 * Bangle/bracelet placement anchored to a detected wrist, sized off the
 * real hand width and rotated to match the wrist/forearm tilt.
 */
export function wristPlacementFromHand(
  hand: HandFeatures,
  bounds: PlacementBounds
): PlacementResult {
  const wrist = toCanvas(hand.wrist, bounds);
  const middleMcp = toCanvas(hand.middleMcp, bounds);
  const indexMcp = toCanvas(hand.indexMcp, bounds);
  const pinkyMcp = toCanvas(hand.pinkyMcp, bounds);

  const handWidth = distance(indexMcp, pinkyMcp);
  // The hand points from wrist toward fingers; a bangle sits perpendicular
  // to that axis, so rotate the (typically horizontally-drawn) art by -90°
  // relative to it.
  const forwardAngle = angleDeg(wrist, middleMcp);
  // Previous value (handWidth * 0.6) was walked back too far after fixing
  // the "spills past the hand" bug — it ended up rendering as a thin
  // sliver covering well under half the visible wrist. 0.6 undershot the
  // real wrist width; 1.15 (the original, overflowing value) overshot it.
  // 0.95 lands the bracelet's width close to the actual wrist span
  // without exceeding the base-knuckle span that was causing the overflow.
  const wristWidthEstimate = handWidth * 0.95;

  return {
    left: wrist.x,
    top: wrist.y,
    scaleFactor: Math.max(wristWidthEstimate, bounds.width * 0.14),
    angle: forwardAngle - 90,
  };
}

/**
 * Ring placement anchored to the base of the ring finger (its default
 * finger, since a jewellery item doesn't specify which one), sized off
 * the real hand width and rotated to match the finger's tilt.
 */
export function fingerPlacementFromHand(
  hand: HandFeatures,
  bounds: PlacementBounds
): PlacementResult {
  const mcp = toCanvas(hand.ringFingerMcp, bounds);
  const pip = toCanvas(hand.ringFingerPip, bounds);
  const indexMcp = toCanvas(hand.indexMcp, bounds);
  const pinkyMcp = toCanvas(hand.pinkyMcp, bounds);

  const handWidth = distance(indexMcp, pinkyMcp);
  // mcp -> pip points "up the finger". Ring artwork is authored upright
  // (angle 0 = correctly oriented on a finger pointing straight up, same
  // as the no-detection default placement, which also uses angle 0). A
  // finger pointing straight up yields fingerAngle ≈ -90 (atan2 in
  // y-down canvas space), so without this +90 correction the ring was
  // rendered a quarter-turn off from the finger's actual tilt. (Bangles
  // don't need this because a bangle's ellipse looks the same rotated
  // 180°, which masked the same kind of offset there.)
  const fingerAngle = angleDeg(mcp, pip) + 90;

  return {
    left: (mcp.x + pip.x) / 2,
    top: (mcp.y + pip.y) / 2,
    // handWidth spans 4 fingers at the base knuckles, so a single finger
    // is roughly handWidth/4 ≈ handWidth*0.25 wide. A worn ring's visible
    // footprint (band + any raised stone/setting) is a bit wider than the
    // bare finger — 0.34x was still landing as a thin, barely-visible
    // band, so bumped to 0.44x with a higher floor to make it read
    // clearly on the finger.
    scaleFactor: Math.max(handWidth * 0.44, bounds.width * 0.07),
    angle: fingerAngle,
  };
}