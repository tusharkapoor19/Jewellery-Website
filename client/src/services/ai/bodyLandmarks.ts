/**
 * Client-side face & hand landmark detection for the virtual try-on flow.
 *
 * This intentionally does NOT call any backend — everything runs in the
 * browser using Google's MediaPipe Tasks Vision (a WASM + ML runtime).
 * The library and its models are fetched lazily, on first use, from
 * MediaPipe's public CDN via a plain runtime `import()` (not a bundler
 * dependency), so no build configuration changes are required. The
 * `webpackIgnore` comment tells webpack not to try to statically resolve
 * this remote URL and to let the browser's native dynamic import handle
 * it instead.
 *
 * Detector instances are created once and cached for the page's lifetime.
 * Detection results are cached per photo (by data URL) so re-clicking
 * different jewellery on the same photo doesn't re-run detection.
 */

const VISION_VERSION = '0.10.14';
const VISION_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VISION_VERSION}`;
const VISION_BUNDLE_URL = `${VISION_BASE}/vision_bundle.mjs`;
const VISION_WASM_BASE = `${VISION_BASE}/wasm`;

const FACE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const HAND_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

export interface Point {
  x: number;
  y: number;
  z?: number;
}

export type MissingFeature = 'Eyes' | 'Ears' | 'Nose';

export interface FaceFeatures {
  /** Screen-left / screen-right, i.e. not mirrored, not anatomical. */
  leftEye: Point;
  rightEye: Point;
  leftEar: Point;
  rightEar: Point;
  nose: Point;
  chin: Point;
  foreheadTop: Point;
  jawLeft: Point;
  jawRight: Point;
  /** Which of the eyes/ears/nose landmark groups fell outside the photo. */
  missing: MissingFeature[];
}

export interface HandFeatures {
  wrist: Point;
  middleMcp: Point;
  indexMcp: Point;
  pinkyMcp: Point;
  /** Base and first-knuckle of the ring finger — used as the default finger for ring placement. */
  ringFingerMcp: Point;
  ringFingerPip: Point;
}

let visionModulePromise: Promise<any> | null = null;
let faceLandmarkerPromise: Promise<any> | null = null;
let handLandmarkerPromise: Promise<any> | null = null;

const faceCache = new Map<string, FaceFeatures | null>();
const handCache = new Map<string, HandFeatures[] | null>();

async function loadVisionModule(): Promise<any> {
  if (!visionModulePromise) {
    visionModulePromise = import(/* webpackIgnore: true */ VISION_BUNDLE_URL);
  }
  return visionModulePromise;
}

async function getFaceLandmarker(): Promise<any> {
  if (!faceLandmarkerPromise) {
    faceLandmarkerPromise = (async () => {
      const vision = await loadVisionModule();
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(VISION_WASM_BASE);
      const baseOptions = { modelAssetPath: FACE_MODEL_URL };
      try {
        return await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { ...baseOptions, delegate: 'GPU' },
          runningMode: 'IMAGE',
          numFaces: 1,
        });
      } catch {
        return await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { ...baseOptions, delegate: 'CPU' },
          runningMode: 'IMAGE',
          numFaces: 1,
        });
      }
    })();
  }
  return faceLandmarkerPromise;
}

async function getHandLandmarker(): Promise<any> {
  if (!handLandmarkerPromise) {
    handLandmarkerPromise = (async () => {
      const vision = await loadVisionModule();
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(VISION_WASM_BASE);
      const baseOptions = { modelAssetPath: HAND_MODEL_URL };
      try {
        return await vision.HandLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { ...baseOptions, delegate: 'GPU' },
          runningMode: 'IMAGE',
          numHands: 2,
        });
      } catch {
        return await vision.HandLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { ...baseOptions, delegate: 'CPU' },
          runningMode: 'IMAGE',
          numHands: 2,
        });
      }
    })();
  }
  return handLandmarkerPromise;
}

function loadImageElement(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image-load-failed'));
    img.src = dataUrl;
  });
}

// Tolerance around the [0,1] normalized frame — MediaPipe will happily
// extrapolate landmark coordinates slightly past the image edges, so a
// feature is only treated as "missing" once it's clearly outside. Side-of
// -face points (used for ears) sit close to the frame edge even in a
// well-framed photo, so they get a more generous margin than eyes/nose.
const IN_FRAME_MARGIN = 0.04;
const EAR_IN_FRAME_MARGIN = 0.12;
const inFrame = (p: Point, margin = IN_FRAME_MARGIN) =>
  p.x >= -margin && p.x <= 1 + margin && p.y >= -margin && p.y <= 1 + margin;

// Indices from MediaPipe's standard 468-point face mesh topology.
const IDX = {
  eyeGroupA: [33, 133],
  eyeGroupB: [362, 263],
  // Temple/cheek points give a good X (how far out the ear is); the jaw
  // corner is far more reliably in-frame and sits close to earlobe height,
  // so it anchors both the "is an ear here at all" check and the Y coord.
  templeA: [234, 127, 93],
  templeB: [454, 356, 323],
  noseTip: 1,
  chin: 152,
  foreheadTop: 10,
  jawA: 172,
  jawB: 397,
};

const avg = (points: Point[]): Point => ({
  x: points.reduce((s, p) => s + p.x, 0) / points.length,
  y: points.reduce((s, p) => s + p.y, 0) / points.length,
  z: points.reduce((s, p) => s + (p.z || 0), 0) / points.length,
});

function extractFaceFeatures(landmarks: Point[]): FaceFeatures {
  const eyeGroupA = avg(IDX.eyeGroupA.map((i) => landmarks[i]));
  const eyeGroupB = avg(IDX.eyeGroupB.map((i) => landmarks[i]));
  const [leftEye, rightEye] = eyeGroupA.x <= eyeGroupB.x ? [eyeGroupA, eyeGroupB] : [eyeGroupB, eyeGroupA];

  const nose = landmarks[IDX.noseTip];
  const chin = landmarks[IDX.chin];
  const foreheadTop = landmarks[IDX.foreheadTop];

  const jawA = landmarks[IDX.jawA];
  const jawB = landmarks[IDX.jawB];
  const [jawLeft, jawRight] = jawA.x <= jawB.x ? [jawA, jawB] : [jawB, jawA];

  const templeA = avg(IDX.templeA.map((i) => landmarks[i]));
  const templeB = avg(IDX.templeB.map((i) => landmarks[i]));
  // Earlobe approximation: temple's X (how far to the side), blended with
  // the jaw corner's Y (earlobes sit roughly level with the jaw corner,
  // not up at cheekbone height).
  const earPointA: Point = { x: templeA.x, y: (templeA.y + jawA.y) / 2, z: templeA.z };
  const earPointB: Point = { x: templeB.x, y: (templeB.y + jawB.y) / 2, z: templeB.z };
  const [leftEar, rightEar] = earPointA.x <= earPointB.x ? [earPointA, earPointB] : [earPointB, earPointA];

  const missing: MissingFeature[] = [];
  if (!inFrame(leftEye) || !inFrame(rightEye)) missing.push('Eyes');
  // Gate ear presence on the jaw corners (very reliably visible on any
  // front-facing photo) rather than the side-of-face temple points, which
  // sit right at the frame edge and would otherwise flag "missing" often.
  if (!inFrame(jawLeft, EAR_IN_FRAME_MARGIN) || !inFrame(jawRight, EAR_IN_FRAME_MARGIN)) missing.push('Ears');
  if (!inFrame(nose)) missing.push('Nose');

  return { leftEye, rightEye, leftEar, rightEar, nose, chin, foreheadTop, jawLeft, jawRight, missing };
}

/**
 * Detects the (single) face in a photo and reports which of the
 * eyes / ears / nose landmark groups are usable. Returns `null` only
 * when no face at all could be found in the photo.
 */
export async function detectFace(photoDataUrl: string): Promise<FaceFeatures | null> {
  if (faceCache.has(photoDataUrl)) return faceCache.get(photoDataUrl) ?? null;

  const [landmarker, img] = await Promise.all([getFaceLandmarker(), loadImageElement(photoDataUrl)]);
  const result = landmarker.detect(img);
  const raw: Point[] | undefined = result?.faceLandmarks?.[0];

  const features = raw && raw.length > 0 ? extractFaceFeatures(raw) : null;
  faceCache.set(photoDataUrl, features);
  return features;
}

/**
 * Detects hands in a photo and returns wrist/palm/finger landmarks for
 * bangle, bracelet & ring placement. Returns `null` when no hand could be
 * found.
 */
export async function detectHands(photoDataUrl: string): Promise<HandFeatures[] | null> {
  if (handCache.has(photoDataUrl)) return handCache.get(photoDataUrl) ?? null;

  const [landmarker, img] = await Promise.all([getHandLandmarker(), loadImageElement(photoDataUrl)]);
  const result = landmarker.detect(img);
  const hands: Point[][] = result?.landmarks ?? [];

  if (!hands.length) {
    handCache.set(photoDataUrl, null);
    return null;
  }

  const features = hands.map((points) => ({
    wrist: points[0],
    middleMcp: points[9],
    indexMcp: points[5],
    pinkyMcp: points[17],
    ringFingerMcp: points[13],
    ringFingerPip: points[14],
  }));

  handCache.set(photoDataUrl, features);
  return features;
}

/** Clears cached detections — call this whenever the user replaces their photo. */
export function clearLandmarkCache(): void {
  faceCache.clear();
  handCache.clear();
}
