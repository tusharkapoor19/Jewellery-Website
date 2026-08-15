import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    Heart,
    ShoppingBag,
    Eye,
    Star,
    ShieldCheck,
    Sparkles,
    GitCompare
} from "lucide-react";

import { toast } from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";

import { Product } from "../../types/product";

import { computeLivePrice } from "../../utils/metalPricing";

import "./ProductCard.css";


interface ProductCardProps {

    product: Product;

}


const ProductCard = ({
    product
}: ProductCardProps) => {

    const navigate = useNavigate();


    /* =====================================================
       WISHLIST
    ===================================================== */

    const [wishlistLoading, setWishlistLoading] =
        useState(false);

    const {
        isWishlisted,
        addToWishlist,
        removeFromWishlist
    } = useWishlist();

    const liked =
        isWishlisted(
            product.productID
        );


    /* =====================================================
       CART
    ===================================================== */

    const {
        addToCart,
        refreshCart
    } = useCart();


    const isAddingRef =
        useRef(false);

    const [isAdding, setIsAdding] =
        useState(false);


    /* =====================================================
       COMPARISON
    ===================================================== */

    const {
        compareProducts,
        addToCompare,
        removeFromCompare,
        isInCompare
    } = useCompare();


    const comparing =
        isInCompare(
            product.productID
        );


    /* =====================================================
       PRODUCT DETAILS
    ===================================================== */

    const openProduct = () => {

        navigate(
            `/product/${product.productID}`
        );

    };


    /* =====================================================
       DYNAMIC PRICE
    ===================================================== */

    const getDynamicPrice = () => {

        return computeLivePrice(
            product.metal,
            product.weight
        );

    };


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const handleAddToCart = async () => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            toast.error(
                "Please login first."
            );

            navigate("/login");

            return;

        }


        if (product.stock <= 0) {

            toast.error(
                "This product is currently out of stock."
            );

            return;

        }


        if (isAddingRef.current) {

            return;

        }


        isAddingRef.current = true;

        setIsAdding(true);


        try {

            await addToCart(
                product.productID
            );

            await refreshCart();


            toast.success(
                "Added to Cart"
            );

        }

        catch (error: any) {

            toast.error(
                error?.message ||
                "Failed to add product"
            );

        }

        finally {

            isAddingRef.current = false;

            setIsAdding(false);

        }

    };


    /* =====================================================
       WISHLIST
    ===================================================== */

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


        if (wishlistLoading) {

            return;

        }


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
                error?.message ||
                "Wishlist Error"
            );

        }

        finally {

            setWishlistLoading(false);

        }

    };


    /* =====================================================
       COMPARE
    ===================================================== */

    const handleCompare = () => {

        /* Remove if already selected */

        if (comparing) {

            removeFromCompare(
                product.productID
            );


            toast.success(
                "Removed from comparison"
            );

            return;

        }


        /* Maximum 4 products */

        if (compareProducts.length >= 4) {

            toast.error(
                "You can compare up to 4 products."
            );

            return;

        }


        addToCompare(
            product
        );


        toast.success(
            "Added to comparison"
        );

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <article className="hiranya-card">


            {/* =================================================
                IMAGE AREA
            ================================================= */}

            <div
                className="hiranya-image-area"
                onClick={openProduct}
            >

                <div className="image-overlay" />


                {/* COLLECTION */}

                <span className="collection-chip">

                    <Sparkles size={13} />

                    {product.collection}

                </span>


                {/* WISHLIST */}

                <button
                    type="button"
                    disabled={wishlistLoading}
                    className={
                        `wishlist-btn ${
                            liked
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={(e) => {

                        e.stopPropagation();

                        toggleWishlist();

                    }}
                    title="Wishlist"
                >

                    <Heart
                        size={19}
                        fill={
                            liked
                                ? "currentColor"
                                : "none"
                        }
                    />

                </button>


                {/* COMPARE */}

                <button
                    type="button"
                    className={
                        `compare-btn ${
                            comparing
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={(e) => {

                        e.stopPropagation();

                        handleCompare();

                    }}
                    title={
                        comparing
                            ? "Remove from comparison"
                            : "Add to comparison"
                    }
                >

                    <GitCompare
                        size={18}
                    />

                </button>


                {/* PRODUCT IMAGE */}

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


                {/* STOCK */}

                {
                    product.stock > 0

                        ?

                        <span className="stock-chip available">

                            In Stock

                        </span>

                        :

                        <span className="stock-chip sold">

                            Sold Out

                        </span>
                }


                {/* QUICK VIEW */}

                <div className="quick-view">

                    <Eye size={18} />

                    Quick View

                </div>

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="hiranya-content">


                {/* RATING */}

                <div className="rating-row">

                    <div className="rating-pill">

                        <Star
                            size={14}
                            fill="currentColor"
                        />

                        4.9

                    </div>


                    <div className="secure-pill">

                        <ShieldCheck
                            size={14}
                        />

                        Certified

                    </div>

                </div>


                {/* PRODUCT NAME */}

                <h3
                    className="hiranya-title"
                    onClick={openProduct}
                >

                    {product.name}

                </h3>


                {/* METAL / CERTIFICATION */}

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


                {/* PRICE */}

                <div className="price-box">

                    <span className="price-label">

                        Starting From

                    </span>


                    <h2>

                        ₹{" "}

                        {
                            getDynamicPrice()
                                .toLocaleString()
                        }

                    </h2>

                </div>


                {/* ACTIONS */}

                <div className="card-actions">


                    {/* ADD TO CART */}

                    <button
                        className="cart-button"
                        onClick={handleAddToCart}
                        disabled={
                            isAdding ||
                            product.stock <= 0
                        }
                    >

                        <ShoppingBag
                            size={18}
                        />


                        {
                            product.stock <= 0

                                ?

                                "Out Of Stock"

                                :

                                isAdding

                                    ?

                                    "Adding..."

                                    :

                                    "Add To Cart"
                        }

                    </button>


                    {/* DETAILS */}

                    <button
                        className="details-button"
                        type="button"
                        onClick={openProduct}
                    >

                        <Eye
                            size={18}
                        />

                        Details

                    </button>

                </div>

            </div>

        </article>

    );

};


export default ProductCard;