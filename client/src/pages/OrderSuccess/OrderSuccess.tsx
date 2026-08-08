import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import "./OrderSuccess.css";

import {
    useLocation,
    useNavigate
} from "react-router-dom";
import orderService from "../../services/orderService";
import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {

    ArrowRight,

    BadgeCheck,

    CalendarDays,

    CheckCircle2,

    ChevronRight,

    Clock3,

    Download,

    FileText,

    Gem,

    Home,

    Mail,

    MapPin,

    PackageCheck,

    Phone,

    Receipt,

    ShieldCheck,

    ShoppingBag,

    Sparkles,

    Star,

    Truck,

    CircleDollarSign

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

interface OrderSuccessState {

    orderID: string;

    products: Product[];

    shippingAddress: ShippingAddress;

    deliveryMethod: string;

    subtotal: number;

    shippingCharge: number;

    discount: number;

    gst: number;

    totalAmount: number;

    orderStatus: string;

    createdAt: string;

}

/* ==========================================================
   Component
========================================================== */

const OrderSuccess: React.FC = () => {

    const navigate = useNavigate();

    const location = useLocation();

const orderID = location.state?.orderID;

const [order, setOrder] =
    useState<OrderSuccessState | null>(null);

const [loading, setLoading] =
    useState(true);

    const [showAnimation] =
        useState(true);

    /* =====================================================
       Redirect Protection
    ===================================================== */

    useEffect(() => {

    if (!orderID) {

        toast.error("Order not found.");

        navigate("/");

        return;

    }

    const loadOrder = async () => {

        try {

            setLoading(true);

            const response =
                await orderService.getOrder(orderID);

            if (!response.success) {

                throw new Error(
                    response.message
                );

            }

            const data = response.order;

            setOrder({

                orderID: data.orderID,

                products: data.products,

                shippingAddress: {

                    fullName:
                        data.shippingAddress.fullName,

                    phone:
                        data.shippingAddress.phone,

                    address:
                        data.shippingAddress.addressLine1,

                    landmark:
                        data.shippingAddress.addressLine2 || "",

                    city:
                        data.shippingAddress.city,

                    state:
                        data.shippingAddress.state,

                    country:
                        data.shippingAddress.country,

                    pincode:
                        data.shippingAddress.postalCode

                },

                deliveryMethod:
                    data.deliveryMethod,

                subtotal:
                    data.subtotal,

                shippingCharge:
                    data.shippingCharge,

                discount:
                    data.discount,

                gst:
                    data.gst,

                totalAmount:
                    data.totalAmount,

                orderStatus:
                    data.orderStatus,

                createdAt:
                    data.createdAt

            });

        }

        catch (error: any) {

            toast.error(

                error.message ||

                "Unable to load order."

            );

            navigate("/");

        }

        finally {

            setLoading(false);

        }

    };

    loadOrder();

}, [orderID, navigate]);

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
       Actions
    ===================================================== */

    const downloadInvoice = () => {

        toast.success(

            "Invoice download will be available after backend integration."

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

                        order?.orderID

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

                <div className="order-success-loader">

                    <div className="order-loader-circle" />

                    <h2>

                        Preparing Your Order...

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

            <main className="order-success-page">
                            {/* ==========================================================
                Luxury Hero
            ========================================================== */}

            <section className="order-success-hero">

                <motion.div

                    className="order-success-bg-glow"

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

                    className="order-success-circle"

                    variants={scaleIn}

                    initial="hidden"

                    animate="visible"

                >

                    <PackageCheck />

                </motion.div>

                <motion.div

                    className="order-success-heading"

                    variants={fadeUp}

                    initial="hidden"

                    animate="visible"

                >

                    <span className="order-success-badge">

                        <Sparkles size={15} />

                        Order Confirmed Successfully

                    </span>

                    <h1>

                        Thank You For Your Order

                    </h1>

                    <p>

                        Your luxury jewellery order has been confirmed
                        successfully.

                        <br />

                        Our artisans have started preparing your
                        handcrafted masterpiece.

                    </p>

                </motion.div>

            </section>

            {/* ==========================================================
                Order Information Cards
            ========================================================== */}

            <motion.section

                className="order-info-grid"

                initial="hidden"

                whileInView="visible"

                viewport={{

                    once: true

                }}

                variants={fadeUp}

            >

                <div className="order-info-card">

                    <Receipt />

                    <span>

                        Order ID

                    </span>

                    <h3>

                        {order?.orderID}

                    </h3>

                </div>

                <div className="order-info-card">

                    <BadgeCheck />

                    <span>

                        Order Status

                    </span>

                    <h3>

                        {

                            order?.orderStatus ||

                            "Pending"

                        }

                    </h3>

                </div>

                <div className="order-info-card">

                    <CircleDollarSign />

                    <span>

                        Total Paid

                    </span>

                    <h3>

                        {

                            formatCurrency(

                                order?.totalAmount

                            )

                        }

                    </h3>

                </div>

                <div className="order-info-card">

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
                Main Grid
            ========================================================== */}

            <section className="order-main-grid">

                {/* ==========================================
                    LEFT COLUMN
                =========================================== */}

                <div className="order-left-column">
                                    {/* ===============================================
                    Ordered Products
                ================================================ */}

                <motion.div

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

                        <ShoppingBag size={22} />

                        <div>

                            <h2>

                                Ordered Jewellery

                            </h2>

                            <p>

                                Your handcrafted luxury collection.

                            </p>

                        </div>

                    </div>

                    <div className="order-products-list">

                        {

                            order?.products?.map((product) => (

                                <div

                                    key={product.productID}

                                    className="order-product-card"

                                >

                                    <div className="order-product-image">

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

                                                <div className="order-image-placeholder">

                                                    <Gem />

                                                </div>

                                            )

                                        }

                                    </div>

                                    <div className="order-product-details">

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

                                    <div className="order-product-price">

                                        {

                                            formatCurrency(

                                                product.price *

                                                product.quantity

                                            )

                                        }

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

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

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

                    <div className="order-summary-list">

                        <div>

                            <span>

                                Subtotal

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        order?.subtotal

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

                                        order?.shippingCharge

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

                                        order?.gst

                                    )

                                }

                            </strong>

                        </div>

                        <div>

                            <span>

                                Discount

                            </span>

                            <strong className="order-discount">

                                -

                                {

                                    formatCurrency(

                                        order?.discount

                                    )

                                }

                            </strong>

                        </div>

                        <div className="order-summary-total">

                            <span>

                                Grand Total

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        order?.totalAmount

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

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

                        <Clock3 size={22} />

                        <div>

                            <h2>

                                Order Journey

                            </h2>

                            <p>

                                Track every step of your luxury order.

                            </p>

                        </div>

                    </div>

                    <div className="order-timeline">

                        <div className="timeline-item active">

                            <BadgeCheck />

                            <div>

                                <h4>

                                    Order Confirmed

                                </h4>

                                <span>

                                    Your order has been placed successfully.

                                </span>

                            </div>

                        </div>

                        <div className="timeline-item active">

                            <PackageCheck />

                            <div>

                                <h4>

                                    Processing

                                </h4>

                                <span>

                                    Our artisans are preparing your jewellery.

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

                                    Hallmark and quality verification.

                                </span>

                            </div>

                        </div>

                        <div className="timeline-item">

                            <Truck />

                            <div>

                                <h4>

                                    Ready For Dispatch

                                </h4>

                                <span>

                                    Secure packaging and shipment preparation.

                                </span>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* LEFT COLUMN END */}

                </div>

                {/* ===============================================
                    RIGHT COLUMN
                ================================================ */}

                <div className="order-right-column">
                                    {/* ===============================================
                    Delivery Address
                ================================================ */}

                <motion.div

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

                        <MapPin size={22} />

                        <div>

                            <h2>

                                Delivery Address

                            </h2>

                            <p>

                                Where your luxury order will arrive.

                            </p>

                        </div>

                    </div>

                    <div className="order-address-card">

                        <h3>

                            {order?.shippingAddress?.fullName}

                        </h3>

                        <p>

                            {order?.shippingAddress?.address}

                        </p>

                        {

                            order?.shippingAddress?.landmark && (

                                <p>

                                    {order.shippingAddress.landmark}

                                </p>

                            )

                        }

                        <p>

                            {order?.shippingAddress?.city},{" "}

                            {order?.shippingAddress?.state}

                        </p>

                        <p>

                            {order?.shippingAddress?.country} - {" "}

                            {order?.shippingAddress?.pincode}

                        </p>

                        <p>

                            Phone : {" "}

                            {order?.shippingAddress?.phone}

                        </p>

                    </div>

                </motion.div>

                {/* ===============================================
                    Order Details
                ================================================ */}

                <motion.div

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

                        <PackageCheck size={22} />

                        <div>

                            <h2>

                                Order Details

                            </h2>

                            <p>

                                Complete order information.

                            </p>

                        </div>

                    </div>

                    <div className="order-info-list">

                        <div>

                            <span>Order ID</span>

                            <strong>{order?.orderID}</strong>

                        </div>

                        <div>

                            <span>Status</span>

                            <strong className="order-status-success">

                                {order?.orderStatus}

                            </strong>

                        </div>

                        <div>

                            <span>Delivery</span>

                            <strong>

                                {order?.deliveryMethod}

                            </strong>

                        </div>

                        <div>

                            <span>Order Date</span>

                            <strong>

                                {formatDate(order?.createdAt)}

                            </strong>

                        </div>

                        <div>

                            <span>Estimated Delivery</span>

                            <strong>

                                {estimatedDelivery}

                            </strong>

                        </div>

                    </div>

                </motion.div>

                {/* ===============================================
                    Luxury Benefits
                ================================================ */}

                <motion.div

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

                        <Gem size={22} />

                        <div>

                            <h2>

                                HIRANYA Promise

                            </h2>

                            <p>

                                Luxury with complete peace of mind.

                            </p>

                        </div>

                    </div>

                    <div className="order-benefits-list">

                        <div>

                            <ShieldCheck />

                            <span>

                                BIS Hallmarked Jewellery

                            </span>

                        </div>

                        <div>

                            <PackageCheck />

                            <span>

                                Secure Luxury Packaging

                            </span>

                        </div>

                        <div>

                            <Truck />

                            <span>

                                Fully Insured Shipping

                            </span>

                        </div>

                        <div>

                            <BadgeCheck />

                            <span>

                                Quality Checked Before Dispatch

                            </span>

                        </div>

                    </div>

                </motion.div>

                {/* ===============================================
                    Support
                ================================================ */}

                <motion.div

                    className="order-luxury-card"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <div className="order-card-heading">

                        <Phone size={22} />

                        <div>

                            <h2>

                                Need Assistance?

                            </h2>

                            <p>

                                Our luxury concierge is always available.

                            </p>

                        </div>

                    </div>

                    <div className="order-support-list">

                        <div>

                            <Phone />

                            <span>

                                Premium Customer Support

                            </span>

                        </div>

                        <div>

                            <Mail />

                            <span>

                                care@hiranya.com

                            </span>

                        </div>

                    </div>

                </motion.div>

                {/* ===============================================
                    Action Buttons
                ================================================ */}

                <motion.div

                    className="order-action-group"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{ once: true }}

                >

                    <button

                        className="order-primary-btn"

                        onClick={goToTracking}

                    >

                        <Truck size={18} />

                        Track Order

                    </button>

                    <button

                        className="order-secondary-btn"

                        onClick={downloadInvoice}

                    >

                        <Download size={18} />

                        Download Invoice

                    </button>

                    <button

                        className="order-secondary-btn"

                        onClick={goToOrders}

                    >

                        <ShoppingBag size={18} />

                        My Orders

                    </button>

                    <button

                        className="order-outline-btn"

                        onClick={continueShopping}

                    >

                        Continue Shopping

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

                className="order-thankyou-section"

                variants={fadeUp}

                initial="hidden"

                whileInView="visible"

                viewport={{
                    once: true
                }}

            >

                <div className="order-thankyou-content">

                    <span className="order-thankyou-badge">

                        <Star size={16} />

                        HIRANYA SIGNATURE EXPERIENCE

                    </span>

                    <h2>

                        Thank You For Choosing
                        <span> HIRANYA</span>

                    </h2>

                    <p>

                        Every HIRANYA masterpiece is handcrafted
                        with exceptional artistry, authenticity
                        and timeless elegance.

                        <br />

                        Your order is now being carefully prepared
                        by our master craftsmen and will soon begin
                        its secure journey to your doorstep.

                    </p>

                </div>

            </motion.section>

            {/* ==========================================================
                Continue Exploring
            ========================================================== */}

            <motion.section

                className="order-explore-section"

                variants={fadeUp}

                initial="hidden"

                whileInView="visible"

                viewport={{
                    once: true
                }}

            >

                <div className="order-explore-header">

                    <h2>

                        Continue Exploring Luxury

                    </h2>

                    <p>

                        Discover timeless jewellery crafted
                        exclusively for you.

                    </p>

                </div>

                <div className="order-explore-grid">

                    <div

                        className="order-explore-card"

                        onClick={() => navigate("/jewellery")}

                    >

                        <Gem />

                        <h3>

                            Fine Jewellery

                        </h3>

                        <p>

                            Explore our premium collection
                            of rings, necklaces, bracelets
                            and earrings.

                        </p>

                        <span>

                            Shop Now

                            <ChevronRight size={18} />

                        </span>

                    </div>

                    <div

                        className="order-explore-card"

                        onClick={() => navigate("/collections")}

                    >

                        <Sparkles />

                        <h3>

                            Signature Collections

                        </h3>

                        <p>

                            Discover exclusive handcrafted
                            collections inspired by elegance.

                        </p>

                        <span>

                            Explore

                            <ChevronRight size={18} />

                        </span>

                    </div>

                    <div

                        className="order-explore-card"

                        onClick={() => navigate("/store-locator")}

                    >

                        <MapPin />

                        <h3>

                            Visit Boutique

                        </h3>

                        <p>

                            Experience luxury jewellery in
                            our premium HIRANYA boutiques.

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

export default OrderSuccess;