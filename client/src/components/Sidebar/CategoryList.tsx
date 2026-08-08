import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/jewelleryData';
import { useCanvasStore } from '../../store/canvasStore';
import type { JewelleryCategoryId } from '../../types/Jewellery';

const CategoryList: React.FC = () => {
  const activeCategory = useCanvasStore((s) => s.activeCategory);
  const setActiveCategory = useCanvasStore((s) => s.setActiveCategory);

  return (
    <nav className="category-list">
      {CATEGORIES.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <motion.button
            key={category.id}
            className={`category-item ${isActive ? 'category-item-active' : ''}`}
            onClick={() => setActiveCategory(category.id as JewelleryCategoryId)}
            whileTap={{ scale: 0.96 }}
            type="button"
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
            {isActive && (
              <motion.span
                layoutId="category-active-pill"
                className="category-active-pill"
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
};

export default CategoryList;
