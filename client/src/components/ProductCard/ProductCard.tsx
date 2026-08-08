import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
    Heart,
    ShoppingBag,
    Eye,
    Star,
    ShieldCheck,
    Sparkles
} from "lucide-react";

import { Product } from "../../types/product";
import { useWishlist } from "../../context/WishlistContext";

import { toast } from "react-hot-toast";

import "./ProductCard.css";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({
    product
}: ProductCardProps) => {

    const navigate = useNavigate();

    const [wishlistLoading, setWishlistLoading] =
        useState(false);

    const {
        isWishlisted,
        addToWishlist,
        removeFromWishlist
    } = useWishlist();

    const liked = isWishlisted(
        product.productID
    );

    const openProduct = () => {

        navigate(
            `/product/${product.productID}`
        );

    };
    
    const { addToCart, refreshCart } = useCart();

    // ref = instant lock that blocks a second click the moment the first
    // one starts (state updates are not fast enough to prevent a rapid
    // double-click). state = drives the disabled/spinner look on the button.
    const isAddingRef = useRef(false);
    const [isAdding, setIsAdding] = useState(false);
const handleAddToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {

        toast.error("Please login first.");

        navigate("/login");

        return;

    }

    if (isAddingRef.current) return;

    isAddingRef.current = true;
    setIsAdding(true);

    try {

        await addToCart(product.productID);

        await refreshCart();

        toast.success("Added to Cart");

    } catch (error: any) {

        toast.error(
            error.message || "Failed to add product"
        );

    } finally {

        isAddingRef.current = false;
        setIsAdding(false);

    }

};

    const toggleWishlist = async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            toast.error(
                "Please login first."
            );

            navigate("/login");

            return;

        }

        if (wishlistLoading) return;

        try {

            setWishlistLoading(true);

            if (liked) {

                await removeFromWishlist(
                    product.productID
                );

                toast.success(
                    "Removed from Wishlist"
                );

            }

            else {

                await addToWishlist(
                    product.productID
                );

                toast.success(
                    "Added to Wishlist"
                );

            }

        }

        catch (error: any) {

            toast.error(

                error.message ||

                "Wishlist Error"

            );

        }

        finally {

            setWishlistLoading(false);

        }

    };
        return (

        <article className="hiranya-card">

            <div
                className="hiranya-image-area"
                onClick={openProduct}
            >

                <div className="image-overlay" />

                <span className="collection-chip">

                    <Sparkles size={13} />

                    {product.collection}

                </span>

                <button

                    type="button"

                    disabled={wishlistLoading}

                    className={`wishlist-btn ${liked ? "active" : ""}`}

                    onClick={(e) => {

                        e.stopPropagation();

                        toggleWishlist();

                    }}

                >

                    <Heart

                        size={19}

                        fill={liked ? "currentColor" : "none"}

                    />

                </button>

                <img

                    src={product.image}

                    alt={product.name}

                    className="hiranya-image"

                    loading="lazy"

                    onError={(e) => {

                        e.currentTarget.src =
                            "/images/products/placeholder.jpg";

                    }}

                />

                {

                    product.stock > 0 ?

                        <span className="stock-chip available">

                            In Stock

                        </span>

                        :

                        <span className="stock-chip sold">

                            Sold Out

                        </span>

                }

                <div className="quick-view">

                    <Eye size={18} />

                    Quick View

                </div>

            </div>

            <div className="hiranya-content">

                <div className="rating-row">

                    <div className="rating-pill">

                        <Star
                            size={14}
                            fill="currentColor"
                        />

                        4.9

                    </div>

                    <div className="secure-pill">

                        <ShieldCheck size={14} />

                        Certified

                    </div>

                </div>

                <h3

                    className="hiranya-title"

                    onClick={openProduct}

                >

                    {product.name}

                </h3>

                <div className="meta-row">

                    <span className="metal-tag">

                        {product.metal}

                    </span>

                    {

                        product.certification && (

                            <span className="certificate-tag">

                                {product.certification}

                            </span>

                        )

                    }

                </div>

                <div className="price-box">

                    <span className="price-label">

                        Starting From

                    </span>

                    <h2>

                        ₹ {product.price.toLocaleString()}

                    </h2>

                </div>

                <div className="card-actions">

                          <button
    className="cart-button"
    onClick={handleAddToCart}
    disabled={isAdding}
>
    <ShoppingBag size={18}/>
    {isAdding ? "Adding..." : "Add To Cart"}
</button>

                    <button

                        className="details-button"

                        type="button"

                        onClick={openProduct}

                    >

                        <Eye size={18} />

                        Details

                    </button>

                </div>

            </div>

        </article>

    );

};

export default ProductCard;