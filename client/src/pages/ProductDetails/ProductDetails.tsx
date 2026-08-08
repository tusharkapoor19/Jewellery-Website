import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import ProductGrid from "../../components/ProductGrid/ProductGrid";
import productService from "../../services/productService";
import { Product } from "../../types/product";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  MessageCircle,
  PhoneCall,
  Gem,
  Award,
  Maximize2,
  X,
  ChevronDown,
  Lock,
  Loader2
} from "lucide-react";

import "./ProductDetails.css";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { productID } = useParams<{ productID: string }>();

  // Consuming existing WishlistContext
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
 const {

    addToCart,

    refreshCart

} = useCart();
  // Local Component State
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");

  // UI Interactive States
  const [wishlistActionLoading, setWishlistActionLoading] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [pincodeResult, setPincodeResult] = useState<{ checked: boolean; valid: boolean; text: string } | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const loadProduct = useCallback(async () => {
    if (!productID) return;

    try {
      setLoading(true);
      const data = await productService.getProductById(productID);
      setProduct(data);

      if (data?.image) {
        setSelectedImage(data.image);
      } else if (data?.images && data.images.length > 0) {
        setSelectedImage(data.images[0]);
      }

      if (data?.category) {
        const related = await productService.getProductsByCategory(data.category);
        setRelatedProducts(related.filter((item) => item.productID !== data.productID));
      }
    } catch (error) {
      console.error("Error loading product:", error);
      toast.error("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  }, [productID]);

  useEffect(() => {
    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadProduct]);

  // Directly evaluate wishlist status from context
  const inWishlist = Boolean(product && isWishlisted(product.productID));

  // Wishlist toggle integration with backend token check
  const handleWishlistToggle = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!product || wishlistActionLoading) return;

    try {
      setWishlistActionLoading(true);
      if (inWishlist) {
        await removeFromWishlist(product.productID);
        toast.success("Removed from Wishlist");
      } else {
        await addToWishlist(product.productID);
        toast.success("Saved to your Wishlist");
      }
    } catch (error: unknown) {
      console.error("Wishlist operation failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update wishlist";
      toast.error(errorMessage);
    } finally {
      setWishlistActionLoading(false);
    }
  }, [product, wishlistActionLoading, inWishlist, removeFromWishlist, addToWishlist, navigate]);

  // Frontend Placeholders
  const handleAddToCart = useCallback(

    async () => {

        const token =

            localStorage.getItem("token");

        if (!token) {

            toast.error(

                "Please login first"

            );

            navigate("/login");

            return;

        }

        if (!product) return;

        try {

            await addToCart(

                product.productID,

                quantity

            );

            await refreshCart();

            toast.success(

                `${quantity} item(s) added to your Shopping Bag`

            );

        }

        catch (error: any) {

            toast.error(

                error.message ||

                "Failed to add product"

            );

        }

    },

    [

        product,

        quantity,

        addToCart,

        refreshCart,

        navigate

    ]

);

  const handleBuyNow = useCallback(() => {
    if (!product) return;

    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
    }

    toast.success("Redirecting to Checkout...");

    navigate("/checkout", {
        state: {
            buyNow: true,
            product,
            quantity,
        },
    });

}, [product, quantity, navigate]);

  const handlePincodeCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeResult({
        checked: true,
        valid: false,
        text: "Please enter a valid 6-digit PIN code."
      });
      return;
    }

    const estimatedDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    setPincodeResult({
      checked: true,
      valid: true,
      text: `Insured Safe Delivery available by ${estimatedDate}`
    });
  };

  const handleShare = useCallback(async () => {
    const title = product?.name || "HIRANYA Haute Joaillerie";
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err: unknown) {
        if ((err as DOMException).name !== "AbortError") {
          await navigator.clipboard.writeText(url);
          toast.success("Bespoke link copied to clipboard.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Bespoke link copied to clipboard.");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        toast.error("Failed to copy link.");
      }
    }
  }, [product?.name]);

  const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>
) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/images/products/placeholder.jpg";
};

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="product-details-page">
          <div className="product-container">
            <div className="skeleton-grid">
              <div className="skeleton-gallery-block">
                <div className="skeleton-thumbs">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skel-box skel-thumb" />
                  ))}
                </div>
                <div className="skel-box skel-main-image" />
              </div>
              <div className="skeleton-info-block">
                <div className="skel-box skel-line short" />
                <div className="skel-box skel-line title" />
                <div className="skel-box skel-line price" />
                <div className="skel-box skel-card" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="product-not-found-page">
          <div className="not-found-card">
            <Sparkles size={40} className="gold-text" />
            <h2>Masterpiece Unfound</h2>
            <p>This creation may have been archived or reserved for private viewing.</p>
            <button className="gold-solid-btn" onClick={() => navigate("/collections")}>
              Return to Vault
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const calculatedOriginalPrice = Math.round(product.price * 1.15);

  return (
    <>
      <TopBar />
      <Navbar />

      {/* Fullscreen Lightbox View */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
            <X size={26} />
          </button>
          <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt={product.name} onError={handleImageError} />
          </div>
        </div>
      )}

      <section className="product-details-page">
        <div className="product-container">

          {/* TOP NAVIGATION / BREADCRUMB */}
          <div className="nav-breadcrumb-row">
            <button className="back-link-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={16} />
              <span>Back to Selection</span>
            </button>
            <div className="breadcrumbs">
              <span>Maison</span>
              <span className="sep">/</span>
              <span>{product.collection || "Jewellery"}</span>
              <span className="sep">/</span>
              <span className="current">{product.name}</span>
            </div>
          </div>

          {/* MAIN HERO PRODUCT GRID */}
          <div className="product-hero-grid">

            {/* LEFT: MAISON GALLERY */}
            <div className="product-gallery-section">
              <div className="thumbnail-strip">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-box ${selectedImage === img ? "active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} detail ${idx + 1}`}
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>

              <div className="main-display-container">
                <div className="main-display-frame">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="hero-product-image"
                    onError={handleImageError}
                  />
                  <div className="glass-glare" />

                  <button className="zoom-btn" onClick={() => setIsLightboxOpen(true)} title="Expand Gallery">
                    <Maximize2 size={16} />
                  </button>

                  <div className="gallery-counter">
                    <Sparkles size={12} />
                    <span>{allImages.indexOf(selectedImage) + 1} / {allImages.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SPECIFICATIONS & BUYING ACTIONS */}
            <div className="product-info-section">

              <div className="badge-share-header">
                <div className="badge-group">
                  <span className="collection-tag">
                    {product.collection || "Haute Joaillerie"}
                  </span>
                  <span className={`stock-tag ${product.stock > 0 ? "" : "out"}`}>
                    <span className={product.stock > 0 ? "green-pulse" : "red-pulse"} />
                    {product.stock > 0 ? "In Stock" : "Sold Out"}
                  </span>
                </div>
                <button className="share-icon-btn" onClick={handleShare} title="Share Masterpiece">
                  <Share2 size={16} />
                </button>
              </div>

              <h1 className="product-title-serif">{product.name}</h1>

              <div className="rating-block">
                <div className="gold-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="rating-val">4.9</span>
                <span className="dot">•</span>
                <a href="#reviews" className="review-count">248 Client Reviews</a>
              </div>

              <div className="price-card">
                <div className="price-row">
                  <span className="currency">₹</span>
                  <span className="price-val">{product.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="price-meta">
                  <span className="original">₹{calculatedOriginalPrice.toLocaleString("en-IN")}</span>
                  <span className="tax-notice">Price includes GST & BIS Hallmarking</span>
                </div>
              </div>

              <div className="thin-gold-divider" />

              {/* METADATA STRIP */}
              <div className="spec-quick-strip">
                <div className="quick-spec-item">
                  <Gem size={18} className="gold-text" />
                  <div>
                    <span className="spec-label">Metal</span>
                    <span className="spec-value">{product.metal || "18K Yellow Gold"}</span>
                  </div>
                </div>
                <div className="quick-spec-item">
                  <Award size={18} className="gold-text" />
                  <div>
                    <span className="spec-label">Weight</span>
                    <span className="spec-value">{product.weight ? `${product.weight} g` : "Standard"}</span>
                  </div>
                </div>
                <div className="quick-spec-item">
                  <ShieldCheck size={18} className="gold-text" />
                  <div>
                    <span className="spec-label">Certificate</span>
                    <span className="spec-value">{product.certification || "BIS Hallmarked"}</span>
                  </div>
                </div>
              </div>

              {/* QUANTITY CONTROL */}
              <div className="qty-row">
                <span className="qty-label">Quantity</span>
                <div className="qty-control">
                  <button
                    disabled={quantity <= 1}
                    onClick={handleQuantityDecrease}
                    type="button"
                  >
                    -
                  </button>
                  <span className="qty-num">{quantity}</span>
                  <button onClick={handleQuantityIncrease} type="button">+</button>
                </div>
              </div>

              {/* PRIMARY HIGH-LUXURY ACTIONS */}
              <div className="action-buttons-group">
                <button
                  type="button"
                  className={`wishlist-action-btn ${inWishlist ? "active" : ""}`}
                  onClick={handleWishlistToggle}
                  disabled={wishlistActionLoading}
                >
                  {wishlistActionLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Heart size={18} fill={inWishlist ? "#C8A24D" : "none"} />
                  )}
                  <span>{inWishlist ? "Saved" : "Wishlist"}</span>
                </button>

                <button
                  type="button"
                  className="cart-action-btn"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>Add To Bag</span>
                </button>

                <button
                  type="button"
                  className="buy-action-btn"
                  onClick={handleBuyNow}
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* PINCODE ESTIMATOR */}
              <div className="pincode-box">
                <div className="pincode-head">
                  <MapPin size={16} className="gold-text" />
                  <span>Delivery & Boutique Availability</span>
                </div>
                <form className="pincode-form" onSubmit={handlePincodeCheck}>
                  <input
                    type="text"
                    placeholder="Enter 6-Digit PIN Code"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  />
                  <button type="submit">Check</button>
                </form>
                {pincodeResult && (
                  <p className={`pincode-msg ${pincodeResult.valid ? "success" : "error"}`}>
                    {pincodeResult.valid && <CheckCircle2 size={14} />}
                    {pincodeResult.text}
                  </p>
                )}
              </div>

              {/* ASSURANCE STRIP */}
              <div className="assurance-list">
                <div className="assurance-item">
                  <ShieldCheck size={20} className="gold-text" />
                  <div>
                    <h4>BIS Hallmarked & Certified</h4>
                    <p>Guaranteed 100% purity with individual hallmarks</p>
                  </div>
                </div>
                <div className="assurance-item">
                  <Truck size={20} className="gold-text" />
                  <div>
                    <h4>Insured Pan-India Express</h4>
                    <p>Tamper-proof transit in safety courier care</p>
                  </div>
                </div>
                <div className="assurance-item">
                  <RotateCcw size={20} className="gold-text" />
                  <div>
                    <h4>Lifetime Exchange Policy</h4>
                    <p>Transparent buyback & exchange guarantees</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* TABBED DETAILS & SPECIFICATIONS */}
          <section className="details-tabs-section">
            <div className="tabs-bar">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "care", label: "Jewellery Care" },
                { id: "shipping", label: "Shipping & Exchange" }
              ].map((t) => (
                <button
                  key={t.id}
                  className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="tab-pane-container">
              {activeTab === "description" && (
                <div className="tab-pane">
                  <h3 className="pane-title">Artisanal Craftsmanship</h3>
                  <p className="pane-desc">
                    {product.description ||
                      "Exquisitely crafted in our master atelier, this creation represents the perfect balance of classic heritage and contemporary sophistication. Inspected by expert gemologists to ensure unmatched radiance."}
                  </p>
                  <p className="pane-desc">
                    Delivered in our signature Hiranya velvet-lined wooden presentation box along with a certificate of authenticity.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="tab-pane">
                  <div className="specs-grid">
                    <div className="spec-box">
                      <span className="key">Metal Purity</span>
                      <span className="val">{product.metal || "18K Gold"}</span>
                    </div>
                    <div className="spec-box">
                      <span className="key">Approximate Weight</span>
                      <span className="val">{product.weight ? `${product.weight} Grams` : "Standard Weight"}</span>
                    </div>
                    <div className="spec-box">
                      <span className="key">Collection</span>
                      <span className="val">{product.collection || "Royal Vault"}</span>
                    </div>
                    <div className="spec-box">
                      <span className="key">Authenticity Certificate</span>
                      <span className="val">{product.certification || "BIS Hallmarked"}</span>
                    </div>
                    <div className="spec-box">
                      <span className="key">Product Code</span>
                      <span className="val">{product.productID || "HR-7001"}</span>
                    </div>
                    <div className="spec-box">
                      <span className="key">Hallmark Stamp</span>
                      <span className="val">BIS 750 / 916</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div className="tab-pane">
                  <h3 className="pane-title">Preserving Your Heirloom</h3>
                  <ul className="care-bullets">
                    <li>Store separately in the Hiranya velvet pouch to avoid friction.</li>
                    <li>Avoid direct exposure to perfumes, lotions, and harsh chemicals.</li>
                    <li>Clean gently with warm water, mild soap, and a microfiber cloth.</li>
                  </ul>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="tab-pane">
                  <h3 className="pane-title"> Shipping & Returns</h3>
                  <p className="pane-desc">
                    Every shipment is fully insured in transit and delivered via best logistics available . Adult signature and OTP verification are required at delivery.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* WHY CHOOSE HIRANYA */}
          <section className="why-hiranya-grid-section">
            <div className="section-header">
              <span className="header-subtitle">The Maison Standard</span>
              <h2 className="header-title">Why Choose Hiranya</h2>
              <div className="gold-accent-bar" />
            </div>

            <div className="why-grid">
              <div className="why-card">
                <div className="icon-circle"><Award size={24} /></div>
                <h3>100% Certified</h3>
                <p>Independently tested and hallmarked for absolute purity.</p>
              </div>
              <div className="why-card">
                <div className="icon-circle"><RotateCcw size={24} /></div>
                <h3>Lifetime Exchange</h3>
                <p>Enjoy transparent lifetime buyback and upgrade values.</p>
              </div>
              <div className="why-card">
                <div className="icon-circle"><Truck size={24} /></div>
                <h3>Insured Shipping</h3>
                <p>Fully covered against loss or damage throughout transit.</p>
              </div>
              <div className="why-card">
                <div className="icon-circle"><Lock size={24} /></div>
                <h3>Secure Transactions</h3>
                <p>Encrypted payment pathways for total confidentiality.</p>
              </div>
            </div>
          </section>

          {/* CLIENT REVIEWS */}
          <section id="reviews" className="reviews-section">
            <div className="section-header">
              <span className="header-subtitle">Testimonials</span>
              <h2 className="header-title">What Our Customer's Says</h2>
              <div className="gold-accent-bar" />
            </div>

            <div className="reviews-cards-grid">
              <div className="review-item">
                <div className="review-top">
                  <div>
                    <h4>Ananya Roy</h4>
                    <span className="reviewer-tag">Verified Buyer • Mumbai</span>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="review-body">
                  "The craftsmanship is extraordinary. The gold weight feels substantial and the packaging is truly fit for royalty."
                </p>
              </div>

              <div className="review-item">
                <div className="review-top">
                  <div>
                    <h4>Vikramaditya S.</h4>
                    <span className="reviewer-tag">Verified Buyer • New Delhi</span>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="review-body">
                  "Purchased for my wife’s anniversary. The Hiranya boutique concierge made the entire selection process effortless."
                </p>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="faq-section">
            <div className="section-header">
              <span className="header-subtitle">Concierge FAQ</span>
              <h2 className="header-title">Frequently Asked Questions</h2>
              <div className="gold-accent-bar" />
            </div>

            <div className="faq-container">
              {[
                {
                  q: "How do I verify the authenticity of my piece?",
                  a: "Every creation carries clear laser BIS Hallmark engravings along with an official physical certificate detailing metal purity and diamond specifications."
                },
                {
                  q: "Can I request custom ring sizing or laser engraving?",
                  a: "Yes. Our private ateliers offer custom laser engraving and complimentary re-sizing. Contact our concierge immediately after ordering."
                },
                {
                  q: "What payment methods are supported for high-value purchases?",
                  a: "We support major Credit/Debit cards, Netbanking, UPI, and verified bank wire transfers."
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-card ${activeFaq === idx ? "open" : ""}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="faq-head">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-icon" />
                  </div>
                  {activeFaq === idx && (
                    <div className="faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <section className="related-section">
              <div className="section-header">
                <span className="header-subtitle">Curated Creations</span>
                <h2 className="header-title">You May Also Admire</h2>
                <div className="gold-accent-bar" />
              </div>
              <ProductGrid products={relatedProducts} />
            </section>
          )}

          {/* BOTTOM CONCIERGE BANNER */}
          <section className="bottom-concierge-banner">
            <div className="banner-content">
              <span className="banner-sub">Bespoke Concierge</span>
              <h3>Require Personal Assistance?</h3>
              <p>
                Connect directly with our senior gemologists for private boutique viewings, custom diamond inquiries, or size guidance.
              </p>

              <div className="banner-actions">
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="concierge-btn whatsapp">
                  <MessageCircle size={18} />
                  <span>WhatsApp US </span>
                </a>
                <a href="tel:+911800000000" className="concierge-btn phone">
                  <PhoneCall size={18} />
                  <span>Call Boutique</span>
                </a>
              </div>
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetails;