import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import "./PaymentSuccess.css";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {

    ArrowRight,

    CalendarDays,

    CheckCircle2,

    CreditCard,

    Download,

    FileText,

    Home,

    MapPin,

    PackageCheck,

    Receipt,

    ShieldCheck,

    ShoppingBag,

    Sparkles,

    Star,

    Truck,

    CircleDollarSign,

    BadgeCheck,

    Clock3,

    Gem,

    Phone,

    Mail,

    ChevronRight

} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/* ==========================================================
   Interfaces
========================================================== */

interface Product {

    productID: string;

    name: string;

    image?: string;

    quantity: number;

    price: number;

}

interface ShippingAddress {

    fullName: string;

    phone: string;

    address: string;

    landmark: string;

    city: string;

    state: string;

    country: string;

    pincode: string;

}

interface PaymentSuccessState {

    orderID: string;

    paymentID?: string;

    amount: number;

    subtotal?: number;

    shippingCharge?: number;

    gst?: number;

    discount?: number;

    paymentStatus?: string;

    deliveryMethod?: string;

    createdAt?: string;

    products?: Product[];

    shippingAddress?: ShippingAddress;

}

/* ==========================================================
   Component
========================================================== */

const PaymentSuccess: React.FC = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const payment =
        (location.state as PaymentSuccessState) || null;

    const [loading] =
        useState(false);

    const [showConfetti] =
        useState(true);

    /* =====================================================
       Redirect Protection
    ===================================================== */

    useEffect(() => {

        if (!payment) {

            toast.error(
                "Payment details unavailable."
            );

            navigate("/");

        }

    }, [payment, navigate]);

    /* =====================================================
       Helpers
    ===================================================== */

    const formatCurrency = (

        amount?: number

    ) => {

        return new Intl.NumberFormat(

            "en-IN",

            {

                style: "currency",

                currency: "INR",

                maximumFractionDigits: 0

            }

        ).format(amount || 0);

    };

    const formatDate = (

        date?: string

    ) => {

        if (!date) return "--";

        return new Date(date).toLocaleString(

            "en-IN",

            {

                weekday: "long",

                day: "numeric",

                month: "long",

                year: "numeric",

                hour: "2-digit",

                minute: "2-digit"

            }

        );

    };

    const estimatedDelivery =
        useMemo(() => {

            const date =
                new Date();

            date.setDate(

                date.getDate() + 5

            );

            return date.toLocaleDateString(

                "en-IN",

                {

                    weekday: "long",

                    day: "numeric",

                    month: "long"

                }

            );

        }, []);

    /* =====================================================
       Button Actions
    ===================================================== */

    const downloadInvoice = () => {

        toast.success(

            "Invoice download will be enabled after backend integration."

        );

    };

    const goToOrders = () => {

        navigate("/my-orders");

    };

    const goToTracking = () => {

        navigate(

            "/track-order",

            {

                state: {

                    orderID:

                        payment?.orderID

                }

            }

        );

    };

    const continueShopping = () => {

        navigate("/jewellery");

    };

    const contactSupport = () => {

        navigate("/contact");

    };

    /* =====================================================
       Motion Variants
    ===================================================== */

    const fadeUp = {

        hidden: {

            opacity: 0,

            y: 40

        },

        visible: {

            opacity: 1,

            y: 0,

            transition: {

                duration: .6

            }

        }

    };

    const scaleIn = {

        hidden: {

            opacity: 0,

            scale: .8

        },

        visible: {

            opacity: 1,

            scale: 1,

            transition: {

                duration: .5

            }

        }

    };

    /* =====================================================
       Loader
    ===================================================== */

    if (loading) {

        return (

            <>

                <TopBar />

                <Navbar />

                <div className="payment-success-loader">

                    <div className="payment-loader-circle" />

                    <h2>

                        Preparing Your Luxury Experience...

                    </h2>

                </div>

                <Footer />

            </>

        );

    }

    return (

        <>

            <TopBar />

            <Navbar />

            <main className="payment-success-page">

                        {/* ==========================================================
                Luxury Hero
            ========================================================== */}

            <section className="payment-success-hero">

                <motion.div

                    className="payment-success-bg-glow"

                    animate={{

                        scale: [1, 1.15, 1],

                        opacity: [.35, .65, .35]

                    }}

                    transition={{

                        duration: 6,

                        repeat: Infinity

                    }}

                />

                <motion.div

                    className="payment-success-circle"

                    variants={scaleIn}

                    initial="hidden"

                    animate="visible"

                >

                    <CheckCircle2 />

                </motion.div>

                <motion.div

                    className="payment-success-heading"

                    variants={fadeUp}

                    initial="hidden"

                    animate="visible"

                >

                    <span className="payment-badge">

                        <Sparkles size={15} />

                        Secure Payment Completed

                    </span>

                    <h1>

                        Payment Successful

                    </h1>

                    <p>

                        Thank you for choosing

                        <strong>

                            {" "}HIRANYA Luxury Jewellery

                        </strong>

                        .

                        <br />

                        Your payment has been securely processed and

                        your handcrafted jewellery is now entering

                        our premium fulfilment journey.

                    </p>

                </motion.div>

            </section>

            {/* ==========================================================
                Luxury Statistics
            ========================================================== */}

            <motion.section

                className="payment-stats-grid"

                initial="hidden"

                whileInView="visible"

                viewport={{

                    once: true

                }}

                variants={fadeUp}

            >

                <div className="payment-stat-card">

                    <Receipt />

                    <span>

                        Order ID

                    </span>

                    <h3>

                        {payment?.orderID}

                    </h3>

                </div>

                <div className="payment-stat-card">

                    <CreditCard />

                    <span>

                        Payment ID

                    </span>

                    <h3>

                        {

                            payment?.paymentID ||

                            "Processing..."

                        }

                    </h3>

                </div>

                <div className="payment-stat-card">

                    <CircleDollarSign />

                    <span>

                        Amount Paid

                    </span>

                    <h3>

                        {formatCurrency(

                            payment?.amount

                        )}

                    </h3>

                </div>

                <div className="payment-stat-card">

                    <Truck />

                    <span>

                        Estimated Delivery

                    </span>

                    <h3>

                        {estimatedDelivery}

                    </h3>

                </div>

            </motion.section>

            {/* ==========================================================
                Two Column Layout
            ========================================================== */}

            <section className="payment-main-grid">

                {/* ===============================================
                    LEFT COLUMN
                ================================================ */}

                <div className="payment-left-column">
                                    {/* ===============================================
                    Ordered Products
                ================================================ */}

                <motion.div

                    className="payment-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <ShoppingBag size={22} />

                        <div>

                            <h2>

                                Your Luxury Purchase

                            </h2>

                            <p>

                                Crafted with timeless elegance.

                            </p>

                        </div>

                    </div>

                    <div className="payment-products-list">

                        {

                            payment?.products?.map((product) => (

                                <div

                                    key={product.productID}

                                    className="payment-product-card"

                                >

                                    <div className="payment-product-image">

                                        {

                                            product.image ?

                                                (

                                                    <img

                                                        src={product.image}

                                                        alt={product.name}

                                                    />

                                                )

                                                :

                                                (

                                                    <div className="payment-image-placeholder">

                                                        <Gem />

                                                    </div>

                                                )

                                        }

                                    </div>

                                    <div className="payment-product-details">

                                        <h3>

                                            {product.name}

                                        </h3>

                                        <span>

                                            Quantity :

                                            <strong>

                                                {" "}

                                                {product.quantity}

                                            </strong>

                                        </span>

                                    </div>

                                    <div className="payment-product-price">

                                        {formatCurrency(

                                            product.price *

                                            product.quantity

                                        )}

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </motion.div>

                {/* ===============================================
                    Order Summary
                ================================================ */}

                <motion.div

                    className="payment-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <Receipt size={22} />

                        <div>

                            <h2>

                                Order Summary

                            </h2>

                            <p>

                                Transparent pricing breakdown.

                            </p>

                        </div>

                    </div>

                    <div className="payment-summary-list">

                        <div>

                            <span>

                                Subtotal

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        payment?.subtotal

                                    )

                                }

                            </strong>

                        </div>

                        <div>

                            <span>

                                Shipping

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        payment?.shippingCharge

                                    )

                                }

                            </strong>

                        </div>

                        <div>

                            <span>

                                GST

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        payment?.gst

                                    )

                                }

                            </strong>

                        </div>

                        <div>

                            <span>

                                Discount

                            </span>

                            <strong className="payment-discount">

                                -

                                {

                                    formatCurrency(

                                        payment?.discount

                                    )

                                }

                            </strong>

                        </div>

                        <div className="payment-summary-total">

                            <span>

                                Grand Total

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        payment?.amount

                                    )

                                }

                            </strong>

                        </div>

                    </div>

                </motion.div>

                {/* ===============================================
                    Order Timeline
                ================================================ */}

                <motion.div

                    className="payment-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <Clock3 size={22} />

                        <div>

                            <h2>

                                Order Journey

                            </h2>

                            <p>

                                Follow every stage of your luxury order.

                            </p>

                        </div>

                    </div>

                    <div className="payment-timeline">

                        <div className="timeline-item active">

                            <BadgeCheck />

                            <div>

                                <h4>

                                    Payment Completed

                                </h4>

                                <span>

                                    Your payment has been verified.

                                </span>

                            </div>

                        </div>

                        <div className="timeline-item active">

                            <PackageCheck />

                            <div>

                                <h4>

                                    Order Confirmed

                                </h4>

                                <span>

                                    Our artisans have received your order.

                                </span>

                            </div>

                        </div>

                        <div className="timeline-item">

                            <Gem />

                            <div>

                                <h4>

                                    Quality Inspection

                                </h4>

                                <span>

                                    Authenticity & quality checks.

                                </span>

                            </div>

                        </div>

                        <div className="timeline-item">

                            <Truck />

                            <div>

                                <h4>

                                    Ready To Ship

                                </h4>

                                <span>

                                    Secure luxury packaging in progress.

                                </span>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* LEFT COLUMN END */}

                </div>

                {/* ===============================================
                    RIGHT COLUMN START
                ================================================ */}

                <div className="payment-right-column">
                                    {/* ===============================================
                    Payment Details
                ================================================ */}

                <motion.div

                    className="payment-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <CreditCard size={22} />

                        <div>

                            <h2>

                                Payment Details

                            </h2>

                            <p>

                                Your transaction information.

                            </p>

                        </div>

                    </div>

                    <div className="payment-info-list">

                        <div>

                            <span>

                                Payment Status

                            </span>

                            <strong className="payment-paid">

                                {payment?.paymentStatus || "Paid"}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Payment ID

                            </span>

                            <strong>

                                {payment?.paymentID || "Generating..."}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Order ID

                            </span>

                            <strong>

                                {payment?.orderID}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Transaction Date

                            </span>

                            <strong>

                                {formatDate(payment?.createdAt)}

                            </strong>

                        </div>

                    </div>

                </motion.div>

                {/* ===============================================
                    Delivery Address
                ================================================ */}

                <motion.div

                    className="payment-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <MapPin size={22} />

                        <div>

                            <h2>

                                Delivery Address

                            </h2>

                            <p>

                                Your shipment destination.

                            </p>

                        </div>

                    </div>

                    <div className="payment-address-card">

                        <h3>

                            {

                                payment?.shippingAddress?.fullName

                            }

                        </h3>

                        <p>

                            {

                                payment?.shippingAddress?.address

                            }

                        </p>

                        <p>

                            {

                                payment?.shippingAddress?.landmark

                            }

                        </p>

                        <p>

                            {

                                payment?.shippingAddress?.city

                            }

                            ,

                            {" "}

                            {

                                payment?.shippingAddress?.state

                            }

                        </p>

                        <p>

                            {

                                payment?.shippingAddress?.country

                            }

                            {" - "}

                            {

                                payment?.shippingAddress?.pincode

                            }

                        </p>

                        <p>

                            Phone :

                            {" "}

                            {

                                payment?.shippingAddress?.phone

                            }

                        </p>

                    </div>

                </motion.div>

                {/* ===============================================
                    Concierge Support
                ================================================ */}

                <motion.div

                    className="payment-luxury-card concierge-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <ShieldCheck size={22} />

                        <div>

                            <h2>

                                Luxury Concierge

                            </h2>

                            <p>

                                Dedicated assistance whenever you need.

                            </p>

                        </div>

                    </div>

                    <div className="concierge-list">

                        <div>

                            <Phone size={18} />

                            <span>

                                Premium Customer Support

                            </span>

                        </div>

                        <div>

                            <Mail size={18} />

                            <span>

                                care@hiranya.com

                            </span>

                        </div>

                        <div>

                            <BadgeCheck size={18} />

                            <span>

                                Hallmarked & Certified Jewellery

                            </span>

                        </div>

                    </div>

                </motion.div>

                {/* ===============================================
                    Invoice Card
                ================================================ */}

                <motion.div

                    className="payment-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <div className="payment-card-heading">

                        <FileText size={22} />

                        <div>

                            <h2>

                                Invoice

                            </h2>

                            <p>

                                Download your purchase invoice.

                            </p>

                        </div>

                    </div>

                    <button

                        className="payment-download-btn"

                        onClick={downloadInvoice}

                    >

                        <Download size={18} />

                        Download Invoice

                    </button>

                </motion.div>

                {/* ===============================================
                    Action Buttons
                ================================================ */}

                <motion.div

                    className="payment-action-group"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true
                    }}

                >

                    <button

                        className="payment-primary-btn"

                        onClick={goToTracking}

                    >

                        <Truck size={18} />

                        Track Order

                    </button>

                    <button

                        className="payment-secondary-btn"

                        onClick={goToOrders}

                    >

                        <PackageCheck size={18} />

                        My Orders

                    </button>

                    <button

                        className="payment-secondary-btn"

                        onClick={continueShopping}

                    >

                        <ShoppingBag size={18} />

                        Continue Shopping

                    </button>

                    <button

                        className="payment-outline-btn"

                        onClick={contactSupport}

                    >

                        Contact Concierge

                        <ChevronRight size={18} />

                    </button>

                </motion.div>

                {/* RIGHT COLUMN END */}

                </div>

            </section>
                        {/* ==========================================================
                Luxury Thank You
            ========================================================== */}

            <motion.section

                className="payment-thankyou-section"

                variants={fadeUp}

                initial="hidden"

                whileInView="visible"

                viewport={{
                    once: true
                }}

            >

                <div className="payment-thankyou-content">

                    <span className="payment-thankyou-badge">

                        <Star size={16} />

                        HIRANYA SIGNATURE EXPERIENCE

                    </span>

                    <h2>

                        Thank You For Trusting
                        <span> HIRANYA</span>

                    </h2>

                    <p>

                        Every HIRANYA jewellery piece is handcrafted
                        with precision, authenticity and timeless
                        elegance.

                        <br />

                        Your purchase is now being prepared by our
                        master craftsmen and will soon begin its
                        secure journey to your doorstep.

                    </p>

                </div>

            </motion.section>

            {/* ==========================================================
                Continue Exploring
            ========================================================== */}

            <motion.section

                className="payment-explore-section"

                variants={fadeUp}

                initial="hidden"

                whileInView="visible"

                viewport={{
                    once: true
                }}

            >

                <div className="payment-explore-header">

                    <h2>

                        Continue Exploring Luxury

                    </h2>

                    <p>

                        Discover more timeless jewellery crafted
                        exclusively for you.

                    </p>

                </div>

                <div className="payment-explore-grid">

                    <div

                        className="payment-explore-card"

                        onClick={() => navigate("/jewellery")}

                    >

                        <Gem />

                        <h3>

                            Fine Jewellery

                        </h3>

                        <p>

                            Discover premium rings, necklaces,
                            pendants and earrings.

                        </p>

                        <span>

                            Explore Collection

                            <ChevronRight size={18} />

                        </span>

                    </div>

                    <div

                        className="payment-explore-card"

                        onClick={() => navigate("/collections")}

                    >

                        <Sparkles />

                        <h3>

                            Signature Collections

                        </h3>

                        <p>

                            Exclusive handcrafted collections
                            inspired by timeless elegance.

                        </p>

                        <span>

                            View Collections

                            <ChevronRight size={18} />

                        </span>

                    </div>

                    <div

                        className="payment-explore-card"

                        onClick={() => navigate("/store-locator")}

                    >

                        <MapPin />

                        <h3>

                            Visit Boutique

                        </h3>

                        <p>

                            Experience HIRANYA luxury in our
                            premium stores.

                        </p>

                        <span>

                            Find Store

                            <ChevronRight size={18} />

                        </span>

                    </div>

                </div>

            </motion.section>

        </main>

        <Footer />

    </>

);

};

export default PaymentSuccess;