import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  image: string;
  title: string;
  subtitle?: string;
  selected?: boolean;
  favorite?: boolean;
  onClick?: () => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  selected = false,
  favorite = false,
  onClick,
  onToggleFavorite,
}) => {
  return (
    <motion.button
      className={`jewel-card ${selected ? 'jewel-card-selected' : ''}`}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      type="button"
    >
      <div className="jewel-card-thumb">
        <img src={image} alt={title} draggable={false} />
        {onToggleFavorite && (
          <span
            className={`jewel-card-fav ${favorite ? 'is-fav' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(e);
            }}
            role="button"
            aria-label="Toggle favorite"
          >
            {favorite ? '♥' : '♡'}
          </span>
        )}
      </div>
      <div className="jewel-card-title">{title}</div>
      {subtitle && <div className="jewel-card-subtitle">{subtitle}</div>}
    </motion.button>
  );
};

export default Card;
