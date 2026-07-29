import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Card from '../Common/Card';
import { JEWELLERY_ITEMS } from '../../data/jewelleryData';
import { useCanvasStore } from '../../store/canvasStore';
import { useImageStore } from '../../store/imageStore';
import { addJewelleryToCanvas, getLayersFromCanvas } from '../../utils/canvas';
import type { JewelleryItem } from '../../types/Jewellery';

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

    try {
      await addJewelleryToCanvas(canvas, item, photoBounds);
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
