import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Card from '../Common/Card';
import { JEWELLERY_ITEMS } from '../../data/jewelleryData';
import { useCanvasStore } from '../../store/canvasStore';
import { useImageStore } from '../../store/imageStore';
import { addJewelleryToCanvas, addJewelleryPairToCanvas, getLayersFromCanvas, removeLayersByCategory } from '../../utils/canvas';
import { detectFace, detectHands } from '../../services/ai/bodyLandmarks';
import {
  necklacePlacementFromFace,
  earringPlacementFromFace,
  wristPlacementFromHand,
  fingerPlacementFromHand,
} from '../../utils/landmarkPlacement';
import type { PlacementBounds, PlacementResult } from '../../utils/placement';
import type { JewelleryItem, JewelleryCategoryId } from '../../types/Jewellery';

// Necklace, mangalsutra and chains all sit at the same spot (the neck), so
// they share the same face-detection-driven placement & validation.
const NECK_CATEGORIES = new Set<JewelleryCategoryId>(['necklace', 'mangalsutra', 'chains']);
// Bangles and bracelets both sit at the wrist.
const WRIST_CATEGORIES = new Set<JewelleryCategoryId>(['bangles', 'bracelets']);
// Rings sit on a finger — same hand-detection approach as the wrist group,
// just anchored further out.
const FINGER_CATEGORIES = new Set<JewelleryCategoryId>(['rings']);

// These categories are "one at a time": applying a new one automatically
// removes whichever piece of the same kind is already worn, and their
// position/size comes from real face/hand landmark detection on the
// uploaded photo instead of a fixed proportional guess.
const SMART_FIT_CATEGORIES = new Set<JewelleryCategoryId>([
  ...NECK_CATEGORIES,
  'earrings',
  ...WRIST_CATEGORIES,
  ...FINGER_CATEGORIES,
]);

/**
 * Runs the appropriate landmark detection for a jewellery item's category
 * and turns the result into a placement. Shows a "___ is not detected"
 * toast and returns null when a required feature can't be found — the
 * caller treats null as "don't add the item".
 */
async function resolveSmartPlacement(
  item: JewelleryItem,
  photoDataUrl: string,
  photoBounds: PlacementBounds
): Promise<PlacementResult | [PlacementResult, PlacementResult] | null> {
  if (NECK_CATEGORIES.has(item.categoryId)) {
    const face = await detectFace(photoDataUrl);
    if (!face) {
      toast.error('Face is not detected.');
      return null;
    }
    if (face.missing.length > 0) {
      toast.error(`${face.missing.join(', ')} is not detected.`);
      return null;
    }
    return necklacePlacementFromFace(face, photoBounds);
  }

  if (item.categoryId === 'earrings') {
    const face = await detectFace(photoDataUrl);
    if (!face) {
      toast.error('Face is not detected.');
      return null;
    }
    if (face.missing.includes('Ears')) {
      toast.error('Ears is not detected.');
      return null;
    }
    if (item.anchor === 'ear-left' || item.anchor === 'ear-right') {
      return earringPlacementFromFace(face, photoBounds, item.anchor);
    }
    return earringPlacementFromFace(face, photoBounds, 'ear-both');
  }

  if (WRIST_CATEGORIES.has(item.categoryId)) {
    const hands = await detectHands(photoDataUrl);
    if (!hands || hands.length === 0) {
      toast.error('Hand is not detected.');
      return null;
    }
    return wristPlacementFromHand(hands[0], photoBounds);
  }

  if (FINGER_CATEGORIES.has(item.categoryId)) {
    const hands = await detectHands(photoDataUrl);
    if (!hands || hands.length === 0) {
      toast.error('Hand is not detected.');
      return null;
    }
    return fingerPlacementFromHand(hands[0], photoBounds);
  }

  return null;
}

const JewelleryGrid: React.FC = () => {
  const activeCategory = useCanvasStore((s) => s.activeCategory);
  const searchQuery = useCanvasStore((s) => s.searchQuery);
  const favorites = useCanvasStore((s) => s.favorites);
  const toggleFavorite = useCanvasStore((s) => s.toggleFavorite);
  const addRecentlyViewed = useCanvasStore((s) => s.addRecentlyViewed);
  const setLayers = useCanvasStore((s) => s.setLayers);
  const canvas = useCanvasStore((s) => s.canvas);
  const photoBounds = useImageStore((s) => s.photoBounds);
  const photoDataUrl = useImageStore((s) => s.photoDataUrl);
  const setProcessing = useImageStore((s) => s.setProcessing);

  const items = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return JEWELLERY_ITEMS.filter((item) => {
      const matchesCategory = item.categoryId === activeCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.tags?.some((t) => t.toLowerCase().includes(query));
      return query ? matchesQuery : matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  const handleSelect = async (item: JewelleryItem) => {
    addRecentlyViewed(item.id);

    if (!photoDataUrl) {
      toast('Upload a photo first to try this on!', { icon: '📷' });
      return;
    }
    if (!canvas || !photoBounds) {
      toast.error('Canvas is still loading, try again in a moment.');
      return;
    }

    const isSmartFit = SMART_FIT_CATEGORIES.has(item.categoryId);
    let placementOverride: PlacementResult | undefined;
    let pairOverride: [PlacementResult, PlacementResult] | undefined;

    if (isSmartFit) {
      setProcessing(true);
      try {
        const resolved = await resolveSmartPlacement(item, photoDataUrl, photoBounds);
        if (!resolved) return; // a "___ is not detected" toast was already shown
        if (Array.isArray(resolved)) {
          pairOverride = resolved;
        } else {
          placementOverride = resolved;
        }
      } catch {
        toast.error('Could not analyze your photo. Please try a clearer, front-facing photo.');
        return;
      } finally {
        setProcessing(false);
      }

      // Wearing one at a time: swap out whatever's already on that spot.
      removeLayersByCategory(canvas, item.categoryId);
    }

    try {
      if (pairOverride) {
        await addJewelleryPairToCanvas(canvas, item, pairOverride);
      } else {
        await addJewelleryToCanvas(canvas, item, photoBounds, placementOverride);
      }
      setLayers(getLayersFromCanvas(canvas));
      toast.success(`${item.name} added — drag to adjust!`);
    } catch {
      toast.error('Could not load that design, please try another.');
    }
  };

  return (
    <div className="jewellery-grid-wrap">
      <AnimatePresence mode="popLayout">
        {items.length === 0 ? (
          <motion.p
            className="jewellery-grid-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No designs found{searchQuery ? ` for "${searchQuery}"` : ''}.
          </motion.p>
        ) : (
          <motion.div className="jewellery-grid" layout>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card
                  image={item.thumbnail}
                  title={item.name}
                  subtitle={item.price ? `₹${item.price.toLocaleString('en-IN')}` : undefined}
                  favorite={favorites.includes(item.id)}
                  onClick={() => handleSelect(item)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JewelleryGrid;
