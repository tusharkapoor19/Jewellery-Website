import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { useWishlist } from "../../context/WishlistContext";
import { WishlistItem } from '../../types/wishlist';
import './WishlistCard.css';
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

interface WishlistCardProps {
  product: WishlistItem;
  onToast?: (message: string) => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ product, onToast }) => {
  const navigate = useNavigate();
  const {

    removeFromWishlist,

    refreshWishlist

} = useWishlist();

const {

    addToCart,

    refreshCart

} = useCart();
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const isMovingRef = useRef(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const {
    productId,
    name,
    category,
    image,
    weight,
    price,
  } = product;

  // Format currency into Indian Rupees (INR) with luxury formatting
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  const handleRemoveFromWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isRemoving) return;

    try {
      setIsRemoving(true);
      await removeFromWishlist(productId);
      await refreshWishlist();
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleNavigateToDetails = () => {
    navigate(`/product/${productId}`);
  };

  const handleMoveToBag = async (
    e: React.MouseEvent<HTMLButtonElement>
) => {

    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {

        toast.error("Please login first");

        navigate("/login");

        return;

    }

    if (isMovingRef.current) return;
    isMovingRef.current = true;
    setIsMoving(true);

    try {

        await addToCart(productId, 1);

        await removeFromWishlist(productId);

        await refreshWishlist();

        await refreshCart();

        toast.success("Moved to Shopping Bag");

    }

    catch (error: any) {

        toast.error(

            error.message ||

            "Failed to move item"

        );

    }

    finally {

        isMovingRef.current = false;
        setIsMoving(false);

    }

};

  return (
    <article
      className={`hiranya-wishlist-card ${isRemoving ? 'hiranya-card-removing' : ''}`}
      onClick={handleNavigateToDetails}
      aria-label={`${name} - ${formattedPrice}`}
    >
      {/* Luxury Top Image Container */}
      <div className="hiranya-card-image-wrapper">
        {/* Soft Skeleton loader until full resolution renders */}
        {!imageLoaded && <div className="hiranya-image-skeleton" aria-hidden="true" />}

        <img
          src={image}
          alt={name}
          className={`hiranya-card-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Ambient Glass Overlay */}
        <div className="hiranya-card-overlay" aria-hidden="true" />

        {/* Top Left Badges Container */}
        <div className="hiranya-badge-container">
          {category && (
            <span className="hiranya-badge hiranya-badge-collection">
              <Sparkles className="hiranya-badge-icon" size={11} aria-hidden="true" />
              {category}
            </span>
          )}

          {weight > 0 && (
            <span className="hiranya-badge hiranya-badge-metal">
              {weight}g
            </span>
          )}
        </div>

        {/* Top Right Wishlist Action */}
        <button
          type="button"
          className="hiranya-wishlist-heart-btn"
          onClick={handleRemoveFromWishlist}
          disabled={isRemoving}
          aria-label={`Remove ${name} from wishlist`}
          title="Remove from Wishlist"
        >
          <Heart className="hiranya-heart-icon filled" size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Product Information */}
      <div className="hiranya-card-content">
        <div className="hiranya-card-header">
          <span className="hiranya-card-subtitle">{category} &bull; {weight}g</span>
          <h3 className="hiranya-card-title">{name}</h3>
        </div>

        <div className="hiranya-card-pricing">
          <span className="hiranya-price-label">Starting From</span>
          <span className="hiranya-price-value">{formattedPrice}</span>
        </div>

        {/* Dual Luxury Action Buttons */}
        <div className="hiranya-card-actions">
          <button
            type="button"
            className="hiranya-btn hiranya-btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigateToDetails();
            }}
            aria-label={`View details for ${name}`}
          >
            <Eye size={15} aria-hidden="true" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            className="hiranya-btn hiranya-btn-primary"
            onClick={handleMoveToBag}
            aria-label={`Move ${name} to bag`}
            disabled={isMoving}
          >
            <ShoppingBag size={15} aria-hidden="true" />
            <span>{isMoving ? "Moving..." : "Move To Bag"}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default WishlistCard;