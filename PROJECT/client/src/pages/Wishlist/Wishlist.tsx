import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import {
    Sparkles,
    Gem,
    ShieldCheck,
    Truck,
    RefreshCw,
    ArrowRight,
    Heart,
    MessageCircle,
    Phone
} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useWishlist } from "../../context/WishlistContext";

import WishlistCard from "../../components/WishlistCard/WishlistCard";

import "./Wishlist.css";

interface LuxuryStat {

    id: string;

    icon: React.ReactNode;

    title: string;

    subtitle: string;

}

const Wishlist: React.FC = () => {

    const {

        wishlist,

        loading,

        wishlistCount

    } = useWishlist();

    const stats: LuxuryStat[] = useMemo(() => [

        {

            id: "saved",

            icon: <Gem size={24} />,

            title: `${wishlistCount}`,

            subtitle: "Saved Masterpieces"

        },

        {

            id: "certified",

            icon: <ShieldCheck size={24} />,

            title: "100%",

            subtitle: "Certified Jewellery"

        },

        {

            id: "delivery",

            icon: <Truck size={24} />,

            title: "Secure",

            subtitle: "Insured Delivery"

        },

        {

            id: "exchange",

            icon: <RefreshCw size={24} />,

            title: "Lifetime",

            subtitle: "Exchange"

        }

    ], [wishlistCount]);

    return (

        <>

            <TopBar />

            <Navbar />

            <main className="wishlist-page">

                {/* =========================
                    HERO
                ========================= */}

                <section className="wishlist-hero">

                    <div className="wishlist-hero-bg" />

                    <div className="wishlist-hero-overlay" />
                    {/* Floating Luxury Elements */}

           <div className="wishlist-hero-orb orb-1" />

          <div className="wishlist-hero-orb orb-2" />

    <div className="wishlist-hero-orb orb-3" />

                    <div className="wishlist-container">

                        <div className="wishlist-badge">

                            <Sparkles size={15} />

                            HIRANYA

                        </div>

                        <h1 className="wishlist-title">

                            My Wishlist

                        </h1>

                        <p className="wishlist-subtitle">

                            Your Private Jewellery Vault

                        </p>

                        <div className="wishlist-divider">

                            <span />

                        </div>

                        <p className="wishlist-description">

                            Every masterpiece you admire is preserved
                            inside your private luxury collection until
                            you are ready to make it yours.

                        </p>

                        <div className="wishlist-actions">

                            <div className="wishlist-counter">

                                <Heart
                                    size={18}
                                    fill="#C8A24D"
                                />

                                <div>

                                    <h3>

                                        {wishlistCount}

                                    </h3>

                                    <span>

                                        Saved Masterpieces

                                    </span>

                                </div>

                            </div>

                            <Link
                                to="/collections"
                                className="wishlist-primary-btn"
                            >

                                Explore Collection

                                <ArrowRight size={18} />

                            </Link>

                        </div>

                    </div>

                </section>

                {/* =========================
                    LUXURY STATS
                ========================= */}

                <section className="wishlist-stats">

                    <div className="wishlist-container">

                        <div className="wishlist-stats-grid">

                            {

                                stats.map((item) => (

                                    <article
                                        key={item.id}
                                        className="wishlist-stat-card"
                                    >

                                        <div className="wishlist-stat-icon">

                                            {item.icon}

                                        </div>

                                        <div className="wishlist-stat-content">

                                            <h3>

                                                {item.title}

                                            </h3>

                                            <p>

                                                {item.subtitle}

                                            </p>

                                        </div>

                                    </article>

                                ))

                            }

                        </div>

                    </div>

                </section>
                                {/* =========================
                    WISHLIST CONTENT
                ========================= */}

                <section className="wishlist-content">

                    <div className="wishlist-container">

                        {

                            loading ? (

                                <div className="wishlist-grid">

                                    {

                                        Array.from({

                                            length: 4

                                        }).map((_, index) => (

                                            <div

                                                key={index}

                                                className="wishlist-skeleton"

                                            >

                                                <div className="wishlist-skeleton-image" />

                                                <div className="wishlist-skeleton-content">

                                                    <div className="wishlist-skeleton-line large" />

                                                    <div className="wishlist-skeleton-line medium" />

                                                    <div className="wishlist-skeleton-line small" />

                                                    <div className="wishlist-skeleton-buttons">

                                                        <span />

                                                        <span />

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>

                            ) : wishlist.length === 0 ? (

                                <div className="wishlist-empty">

                                    <div className="wishlist-empty-circle">

                                        <Heart

                                            size={70}

                                            strokeWidth={1.4}

                                        />

                                    </div>

                                    <h2>

                                        Your Private Vault Is Waiting

                                    </h2>

                                    <p>

                                        Save timeless masterpieces that inspire
                                        you and create your own exclusive
                                        jewellery collection.

                                    </p>

                                    <Link

                                        to="/collections"

                                        className="wishlist-empty-btn"

                                    >

                                        Discover Collection

                                        <ArrowRight

                                            size={18}

                                        />

                                    </Link>

                                </div>

                            ) : (

                                <>

                                    <div className="wishlist-section-header">

                                        <div>

                                            <span>

                                                PRIVATE COLLECTION

                                            </span>

                                            <h2>

                                                Curated Masterpieces

                                            </h2>

                                        </div>

                                        <p>

                                            {wishlistCount} premium piece

                                            {wishlistCount !== 1 && "s"}

                                            {" "}saved in your personal vault.

                                        </p>

                                    </div>

                                    <div className="wishlist-grid">

                                        {

                                            wishlist.map((item) => (

                                                <WishlistCard

                                                    key={item.productId}

                                                    product={item}

                                                />

                                            ))

                                        }

                                    </div>

                                </>

                            )

                        }

                    </div>

                </section>
                                {/* =========================
                    LUXURY CONCIERGE
                ========================= */}

                <section className="wishlist-concierge">

                    <div className="wishlist-container">

                        <div className="wishlist-concierge-card">

                            <div className="wishlist-concierge-content">

                                <span className="wishlist-concierge-badge">

                                    HIRANYA CONCIERGE

                                </span>

                                <h2>

                                    Need Personal Jewellery Assistance?

                                </h2>

                                <p>

                                    Whether you are choosing an engagement
                                    ring, celebrating a milestone or searching
                                    for the perfect luxury gift, our jewellery
                                    experts are here to guide you with
                                    personalized recommendations.

                                </p>

                                <div className="wishlist-concierge-buttons">

                                    <a

                                        href="https://wa.me/"

                                        target="_blank"

                                        rel="noreferrer"

                                        className="wishlist-whatsapp-btn"

                                    >

                                        <MessageCircle
                                            size={18}
                                        />

                                        WhatsApp Expert

                                    </a>

                                    <a

                                        href="tel:+911800000000"

                                        className="wishlist-call-btn"

                                    >

                                        <Phone
                                            size={18}
                                        />

                                        Call Boutique

                                    </a>

                                </div>

                            </div>

                            <div className="wishlist-concierge-decoration">

                                <div className="gold-circle large" />

                                <div className="gold-circle medium" />

                                <div className="gold-circle small" />

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================
                    TRUST STRIP
                ========================= */}

                <section className="wishlist-trust">

                    <div className="wishlist-container">

                        <div className="wishlist-trust-grid">

                            <div className="wishlist-trust-item">

                                <ShieldCheck
                                    size={24}
                                />

                                <div>

                                    <h4>

                                        Certified Jewellery

                                    </h4>

                                    <p>

                                        Every masterpiece is certified for
                                        complete authenticity.

                                    </p>

                                </div>

                            </div>

                            <div className="wishlist-trust-item">

                                <Truck
                                    size={24}
                                />

                                <div>

                                    <h4>

                                        Secure Delivery

                                    </h4>

                                    <p>

                                        Fully insured luxury shipping across
                                        India.

                                    </p>

                                </div>

                            </div>

                            <div className="wishlist-trust-item">

                                <RefreshCw
                                    size={24}
                                />

                                <div>

                                    <h4>

                                        Lifetime Exchange

                                    </h4>

                                    <p>

                                        Designed to be treasured for
                                        generations.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>
                                {/* =========================
                    NEWSLETTER CTA
                ========================= */}

                <section className="wishlist-newsletter">

                    <div className="wishlist-container">

                        <div className="wishlist-newsletter-card">

                            <div className="wishlist-newsletter-left">

                                <span className="wishlist-newsletter-tag">

                                    HIRANYA EXCLUSIVE

                                </span>

                                <h2>

                                    Never Miss A New Masterpiece

                                </h2>

                                <p>

                                    Be the first to discover limited edition
                                    collections, private launches and exclusive
                                    member-only offers crafted for jewellery
                                    connoisseurs.

                                </p>

                            </div>

                            <div className="wishlist-newsletter-right">

                                <Link

                                    to="/signup"

                                    className="wishlist-primary-btn"

                                >

                                    Become A Member

                                    <ArrowRight
                                        size={18}
                                    />

                                </Link>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================
                    LUXURY QUOTE
                ========================= */}

                <section className="wishlist-quote">

                    <div className="wishlist-container">

                        <div className="wishlist-quote-box">

                            <Sparkles
                                size={22}
                            />

                            <blockquote>

                                "Luxury is not about owning jewellery.
                                It is about owning memories that last
                                forever."

                            </blockquote>

                            <span>

                                — Maison HIRANYA

                            </span>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </>

    );

};

export default Wishlist;