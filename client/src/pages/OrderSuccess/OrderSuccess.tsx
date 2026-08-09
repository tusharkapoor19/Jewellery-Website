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
import jsPDF from "jspdf";

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
import productService from "../../services/productService";
/* ==========================================================
   Interfaces
========================================================== */

interface Product {
    productID: string;
    name: string;
    image?: string;
    images?: string[];
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
            console.log("ORDER SUCCESS DATA:", data);
            const subtotal =
    Number(data.subtotal ?? 0);

const shippingCharge =
    Number(data.shippingCharge ?? 0);

const discount =
    Number(data.discount ?? 0);

const gst =
    Number(data.gst ?? 0);

const totalAmount =
    Number(data.totalAmount ?? 0);

/* ==========================================
   Fetch actual product images
========================================== */

const productsWithImages = await Promise.all(
    data.products.map(async (product: Product) => {
        // If order already contains image, keep it
        if (product.image) {
            return product;
        }

        try {
            const productData =
                await productService.getProductById(
                    product.productID
                );

            return {
                ...product,
                image:
                    productData?.image ||
                    productData?.images?.[0] ||
                    ""
            };
        } catch (error) {
            console.error(
                `Failed to fetch image for ${product.productID}`,
                error
            );

            return product;
        }
    })
);

setOrder({
    orderID: data.orderID,

    products: productsWithImages,

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
    subtotal,

shippingCharge:
    shippingCharge,

discount:
    discount,

gst:
    gst,

totalAmount:
    totalAmount,

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

        if (!order) {
            toast.error("Order details are not available.");
            return;
        }

        try {

            const doc = new jsPDF();

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 18;
            let y = 20;

            const addLine = () => {
                doc.setDrawColor(210, 180, 100);
                doc.line(margin, y, pageWidth - margin, y);
                y += 8;
            };

            // ==========================
            // HEADER
            // ==========================

            doc.setFont("helvetica", "bold");
            doc.setFontSize(25);
            doc.setTextColor(180, 135, 35);
            doc.text("HIRANYA", margin, y);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(90, 90, 90);
            doc.text("CRAFTED FOR LUXURY", margin, y + 7);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor(35, 35, 35);
            doc.text("INVOICE", pageWidth - margin - 35, y);

            y += 18;
            addLine();

            // ==========================
            // ORDER DETAILS
            // ==========================

            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);

            doc.setFont("helvetica", "bold");
            doc.text("Order ID", margin, y);
            doc.setFont("helvetica", "normal");
            doc.text(order.orderID, margin + 30, y);

            doc.setFont("helvetica", "bold");
            doc.text("Order Date", pageWidth / 2, y);
            doc.setFont("helvetica", "normal");
            doc.text(
                new Date(order.createdAt).toLocaleDateString("en-IN"),
                pageWidth / 2 + 25,
                y
            );

            y += 8;

            doc.setFont("helvetica", "bold");
            doc.text("Status", margin, y);
            doc.setFont("helvetica", "normal");
            doc.text(order.orderStatus || "Confirmed", margin + 30, y);

            doc.setFont("helvetica", "bold");
            doc.text("Delivery", pageWidth / 2, y);
            doc.setFont("helvetica", "normal");
            doc.text(
                order.deliveryMethod || "Standard Delivery",
                pageWidth / 2 + 25,
                y
            );

            y += 14;
            addLine();

            // ==========================
            // DELIVERY ADDRESS
            // ==========================

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(180, 135, 35);
            doc.text("DELIVERY ADDRESS", margin, y);

            y += 7;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(35, 35, 35);
            doc.text(order.shippingAddress.fullName || "", margin, y);

            y += 5;
            doc.setFont("helvetica", "normal");

            const addressLines = [
                order.shippingAddress.address,
                order.shippingAddress.landmark,
                `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
                `${order.shippingAddress.country} - ${order.shippingAddress.pincode}`,
                `Phone: ${order.shippingAddress.phone}`
            ].filter(Boolean);

            addressLines.forEach((line) => {
                const wrapped = doc.splitTextToSize(line, 85);
                doc.text(wrapped, margin, y);
                y += 5 * wrapped.length;
            });

            y += 7;
            addLine();

            // ==========================
            // PRODUCTS
            // ==========================

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(180, 135, 35);
            doc.text("ORDERED JEWELLERY", margin, y);

            y += 8;

            const itemX = margin;
            const qtyX = pageWidth - 82;
            const priceX = pageWidth - 58;
            const totalX = pageWidth - margin;

            doc.setFillColor(245, 240, 228);
            doc.rect(
                margin,
                y - 5,
                pageWidth - margin * 2,
                10,
                "F"
            );

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(45, 45, 45);

            doc.text("PRODUCT", itemX, y);
            doc.text("QTY", qtyX, y);
            doc.text("PRICE", priceX, y);
            doc.text("TOTAL", totalX, y, { align: "right" });

            y += 9;
            doc.setFont("helvetica", "normal");

            order.products.forEach((product) => {

                if (y > pageHeight - 65) {
                    doc.addPage();
                    y = 20;
                }

                const productName = doc.splitTextToSize(
                    product.name,
                    85
                );

                doc.text(productName, itemX, y);
                doc.text(String(product.quantity), qtyX, y);
                doc.text(
                    `INR ${product.price.toLocaleString("en-IN")}`,
                    priceX,
                    y
                );
                doc.text(
                    `INR ${(product.price * product.quantity).toLocaleString("en-IN")}`,
                    totalX,
                    y,
                    { align: "right" }
                );

                y += Math.max(8, productName.length * 5);

                doc.setDrawColor(225, 225, 225);
                doc.line(
                    margin,
                    y - 3,
                    pageWidth - margin,
                    y - 3
                );
            });

            y += 6;

            // ==========================
            // SUMMARY
            // ==========================

            const summaryX = pageWidth - 78;
            const valueX = pageWidth - margin;

            const addSummaryRow = (
                label: string,
                value: string,
                bold = false
            ) => {

                doc.setFont(
                    "helvetica",
                    bold ? "bold" : "normal"
                );
                doc.setFontSize(bold ? 11 : 9);
                doc.setTextColor(45, 45, 45);

                doc.text(label, summaryX, y);
                doc.text(value, valueX, y, {
                    align: "right"
                });

                y += bold ? 8 : 6;
            };

            addSummaryRow(
                "Subtotal",
                `INR ${(order.subtotal || 0).toLocaleString("en-IN")}`
            );

            addSummaryRow(
                "Shipping",
                `INR ${(order.shippingCharge || 0).toLocaleString("en-IN")}`
            );

            addSummaryRow(
                "GST",
                `INR ${(order.gst || 0).toLocaleString("en-IN")}`
            );

            addSummaryRow(
                "Discount",
                `- INR ${(order.discount || 0).toLocaleString("en-IN")}`
            );

            y += 2;

            doc.setDrawColor(180, 135, 35);
            doc.line(summaryX, y, valueX, y);

            y += 7;

            addSummaryRow(
                "GRAND TOTAL",
                `INR ${(order.totalAmount || 0).toLocaleString("en-IN")}`,
                true
            );

            // ==========================
            // FOOTER
            // ==========================

            const footerY = pageHeight - 25;

            doc.setDrawColor(220, 220, 220);
            doc.line(
                margin,
                footerY - 7,
                pageWidth - margin,
                footerY - 7
            );

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(180, 135, 35);
            doc.text(
                "Thank you for choosing HIRANYA.",
                margin,
                footerY
            );

            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 100, 100);
            doc.text(
                "Premium jewellery crafted with authenticity and timeless elegance.",
                margin,
                footerY + 6
            );

            doc.save(`HIRANYA-Invoice-${order.orderID}.pdf`);

            toast.success("Invoice downloaded successfully.");

        } catch (error) {

            console.error("Invoice generation error:", error);

            toast.error(
                "Unable to generate invoice. Please try again."
            );

        }

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