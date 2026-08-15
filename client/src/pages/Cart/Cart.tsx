import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";
import productService from "../../services/productService";
import { Product } from "../../types";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchActiveOffers, validateOffer as validateOfferApi } from "../../api/offers";
import { ApiError } from "../../api/client";
import {
  calculatePricing
} from "../../utils/pricing";
import {
  ShoppingBag,
  ShieldCheck,
  Gift,
  Truck,
  Minus,
  Plus,
  Trash2,
  Heart,
  ArrowRight,
  TicketPercent,
  Lock,
  ChevronRight
} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useCart } from "../../context/CartContext";

import "./Cart.css";

import cartBanner from "../../assets/images/cart/cart-banner.jpg";

interface Coupon {
  code: string;
  description: string;
  minimumCart: number;
  discountAmount?: number;
  discountPercentage?: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    refreshCart,
    couponCode,
    setCouponCode,
    selectedCoupon,
    setSelectedCoupon,
    giftWrap,
    setGiftWrap
  } = useCart();

  const { addToWishlist, refreshWishlist } = useWishlist();

  const [couponError, setCouponError] = useState<string>("");
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Live, admin-managed offers — created and toggled from the Offers tab
  // in the admin dashboard. Loaded once on mount so the coupon list here
  // (and its "Apply" flow below) always reflects what the admin has set up.
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const activeOffers = await fetchActiveOffers();
        setCoupons(
          activeOffers.map((offer) => ({
            code: offer.code,
            description: offer.description,
            minimumCart: offer.minCartValue,
            discountAmount: offer.discountType === "flat" ? offer.discountValue : undefined,
            discountPercentage:
              offer.discountType === "percentage" ? offer.discountValue : undefined
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    loadOffers();
  }, []);

  const pricing = calculatePricing(cartItems, selectedCoupon, giftWrap);

  const increaseQuantity = (
    productId: string,
    currentQuantity: number,
    size: string = ""
) => {
    if (updateQuantity) {
        updateQuantity(
            productId,
            currentQuantity + 1,
            size
        );
    }
};

  const decreaseQuantity = (
    productId: string,
    currentQuantity: number,
    size: string = ""
) => {
    if (currentQuantity > 1 && updateQuantity) {
        updateQuantity(
            productId,
            currentQuantity - 1,
            size
        );
    }
};

  const applyCoupon = async () => {
    const enteredCode = couponCode.trim().toUpperCase();

    if (!enteredCode) {
      setCouponError("Enter A Coupon Code");
      return;
    }

    setApplyingCoupon(true);
    setCouponError("");

    try {
      // Always confirmed against the backend so a coupon the admin just
      // added, edited, or deactivated is honoured immediately — not just
      // whatever was cached in `coupons` when the page loaded.
      const offer = await validateOfferApi(enteredCode, pricing.subtotal);
      setSelectedCoupon({
        code: offer.code,
        description: offer.description,
        minimumCart: offer.minCartValue,
        discountAmount: offer.discountType === "flat" ? offer.discountValue : undefined,
        discountPercentage:
          offer.discountType === "percentage" ? offer.discountValue : undefined
      });
    } catch (error) {
      setSelectedCoupon(null);
      setCouponError(
        error instanceof ApiError ? error.message : "Failed To Apply Coupon"
      );
    } finally {
      setApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setSelectedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    fetchRecommendations();
  }, [cartItems]);

  const fetchRecommendations = async () => {
    try {
      const products = await productService.getAllProducts();

      const filtered = products.filter(
        (product) =>
          !cartItems.some((item) => item.productId === product.productID)
      );

      setRecommendedProducts(filtered.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveToWishlist = async (productId: string) => {
    try {
      await addToWishlist(productId);
      await removeFromCart(productId);
      await refreshWishlist();
      await refreshCart();
      toast.success("Moved To Wishlist ❤️");
    } catch (error: any) {
      toast.error(error.message || "Failed To Move Product");
    }
  };

  const handleRemoveFromCart = async (
    productId: string,
    size: string = ""
) => {
    try {
        await removeFromCart(productId, size);
        await refreshCart();
        toast.success("Removed From Cart");
    } catch (error: any) {
        toast.error(error.message || "Failed To Remove Product");
    }
};

  return (
    <>
      <TopBar />
      <Navbar />

      <main className="hiranya-cart-page">
        {/* ================= HERO ================= */}
        <section className="hiranya-cart-hero">
          <img src={cartBanner} alt="Luxury Cart" />
          <div className="hero-overlay">
            <div className="container">
              <div className="breadcrumb">
                <Link to="/">Home</Link>
                <ChevronRight size={14} />
                <span>Shopping Bag</span>
              </div>
              <span className="hero-tag">HIRANYA LUXURY EXPERIENCE</span>
              <h1>Your Shopping Bag</h1>
              <p>
                Every masterpiece selected today becomes tomorrow's heirloom.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CART ================= */}
        <section className="hiranya-cart-section">
          <div className="container">
            {!cartItems || cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={48} />
                <h2>Your Shopping Bag is Empty</h2>
                <p>
                  Explore our fine jewellery collections to find your masterpiece.
                </p>

                <Link
                  to="/collections"
                  className="checkout-btn"
                  style={{ maxWidth: "250px", margin: "20px auto 0" }}
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              <div className="cart-grid">
                <div className="cart-items">
                  {cartItems.map((item: any) => (
                    <div key={item.productId} className="cart-item-card">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="item-details">
                        <h3>{item.name}</h3>
                       <p className="item-meta">
  {item.category} &bull; {item.weight}g
</p>

{item.size && (
  <p className="item-size">
    Size: {item.size}
  </p>
)}
                        <div className="item-price-row">
                          ₹{item.price.toLocaleString("en-IN")}
                        </div>

                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              decreaseQuantity(
    item.productId,
    item.quantity,
    item.size || ""
  )
                            }
                            aria-label="Decrease Quantity"
                          >
                            <Minus size={16} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                               increaseQuantity(
    item.productId,
    item.quantity,
    item.size || ""
  )
                            }
                            aria-label="Increase Quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="item-total">
                          ₹{(
  item.price *
  item.quantity
).toLocaleString("en-IN")}
                        </div>

                        <div className="cart-actions">
                          <button
                            onClick={() => handleMoveToWishlist(item.productId)}
                          >
                            <Heart size={16} />
                            Move To Wishlist
                          </button>

                          <button
                            onClick={() =>
    handleRemoveFromCart(
        item.productId,
        item.size || ""
    )
}
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>

                          <button onClick={() => setGiftWrap(!giftWrap)}>
                            <Gift size={16} />
                            {giftWrap ? "Gift Wrap Added" : "Gift Wrap"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-card">
                    <span>ORDER SUMMARY</span>
                    <h2>Luxury Checkout</h2>

                    <div className="summary-row">
                      <p>Subtotal</p>
                      <strong>
                        ₹{pricing.subtotal.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="summary-row">
                      <p>Shipping</p>
                      <strong>
                        {pricing.shipping === 0
                          ? "FREE"
                          : `₹${pricing.shipping.toLocaleString("en-IN")}`}
                      </strong>
                    </div>

                    <div className="summary-row">
                      <p>Gift Wrap</p>
                      <strong>
                        ₹{pricing.giftWrapCharge.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    {pricing.discount > 0 && (
                      <div className="summary-row discount">
                        <p>Coupon Discount</p>
                        <strong>
                          - ₹{pricing.discount.toLocaleString("en-IN")}
                        </strong>
                      </div>
                    )}

                    <hr />

                    <div className="grand-total">
                      <div>
                        <h3>Grand Total</h3>
                        <p>Taxes Included</p>
                      </div>
                      <h2>₹{pricing.grandTotal.toLocaleString("en-IN")}</h2>
                    </div>

                    <div className="coupon-box">
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                      />
                      <button onClick={applyCoupon} disabled={applyingCoupon}>
                        {applyingCoupon ? "Applying..." : "Apply"}
                      </button>
                    </div>

                    {couponError && (
                      <p className="coupon-error">{couponError}</p>
                    )}

                    {coupons.length === 0 && !selectedCoupon && (
                      <p className="coupon-error" style={{ color: "#8a6d2f" }}>
                        No active offers right now — check back soon.
                      </p>
                    )}

                    {selectedCoupon && (
                      <div className="coupon-success">
                        <div>
                          <TicketPercent size={18} />
                          <span>{selectedCoupon.code}</span>
                        </div>
                        <button onClick={removeCoupon}>Remove</button>
                      </div>
                    )}

                    <div className="coupon-list">
                      {coupons.map((coupon) => (
                        <div
                          key={coupon.code}
                          className="coupon-card"
                          onClick={() => {
                            setCouponCode(coupon.code);
                          }}
                        >
                          <h4>{coupon.code}</h4>
                          <p>{coupon.description}</p>
                          <small>
                            Min Cart ₹
                            {coupon.minimumCart.toLocaleString("en-IN")}
                          </small>
                        </div>
                      ))}
                    </div>

                    <button className="checkout-btn" onClick={handleCheckout}>
                      <Lock size={18} />
                      Proceed To Secure Checkout
                      <ArrowRight size={18} />
                    </button>

                    <div className="trust-row">
                      <div>
                        <ShieldCheck size={17} />
                        BIS Certified
                      </div>
                      <div>
                        <Truck size={17} />
                        Insured Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= RECOMMENDATIONS ================= */}
        <section className="recommendation-section">
          <div className="container">
            <div className="section-heading">
              <span>HIRANYA RECOMMENDS</span>
              <h2>You May Also Like</h2>
              <p>
                Complete your luxury collection with these handcrafted
                masterpieces.
              </p>
            </div>
            <div className="recommendation-grid">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.productID} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRUST BADGES ================= */}
        <section className="trust-section">
          <div className="container">
            <div className="trust-grid">
              <div className="trust-card">
                <ShieldCheck size={34} />
                <h3>BIS Hallmarked</h3>
                <p>Every jewellery piece is certified for purity.</p>
              </div>

              <div className="trust-card">
                <Truck size={34} />
                <h3>Free Insured Shipping</h3>
                <p>Fully insured luxury delivery across India.</p>
              </div>

              <div className="trust-card">
                <Gift size={34} />
                <h3>Premium Gift Packaging</h3>
                <p>Complimentary signature luxury gift box.</p>
              </div>

              <div className="trust-card">
                <Lock size={34} />
                <h3>Secure Payments</h3>
                <p>100% encrypted checkout with complete security.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Cart;