import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import "./TrackOrder.css";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
    ArrowRight,
    CircleCheckBig,
    Clock3,
    Gem,
    MapPin,
    Package,
    Search,
    ShoppingBag,
    Sparkles,
    XCircle
} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import orderService from "../../services/orderService";
import productService from "../../services/productService";


/* ==========================================================
   TYPES
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
    city: string;
    state: string;
    country: string;
    pincode: string;
}

interface Order {
    orderID: string;
    products: Product[];
    shippingAddress: ShippingAddress;
    deliveryMethod: string;
    totalAmount: number;
    orderStatus: string;
    createdAt: string;
}


/* ==========================================================
   COMPONENT
========================================================== */

const TrackOrder: React.FC = () => {

    const navigate = useNavigate();

    const location = useLocation();


    /* ======================================================
       STATE
    ====================================================== */

    const [loading, setLoading] =
        useState(false);

    const [order, setOrder] =
        useState<Order | null>(null);

    const [searchID, setSearchID] =
        useState(
            location.state?.orderID || ""
        );


    /* ======================================================
       LOAD ORDER FROM NAVIGATION
    ====================================================== */

    useEffect(() => {

        const orderID =
            location.state?.orderID;

        if (orderID) {

            setSearchID(orderID);

            fetchOrder(orderID);

        }

    }, [location.state]);


    /* ======================================================
       FETCH ORDER
    ====================================================== */

    const fetchOrder = async (
        orderID: string
    ) => {

        const cleanOrderID =
            orderID.trim();


        if (!cleanOrderID) {

            toast.error(
                "Enter Order ID"
            );

            return;

        }


        try {

            setLoading(true);

            /*
             * Clear previous result first.
             *
             * Example:
             * ORD024 was valid
             * then user searches ORD999
             *
             * ORD024 should not remain visible
             * while ORD999 is being checked.
             */

            setOrder(null);


            console.log(
                "=================================="
            );

            console.log(
                "TRACK ORDER SEARCH:",
                cleanOrderID
            );

            console.log(
                "=================================="
            );


            /* --------------------------------------------------
               GET ORDER
            -------------------------------------------------- */

            const response =
                await orderService.getOrder(
                    cleanOrderID
                );


            const orderData =
                response?.order;


            if (!orderData) {

                throw new Error(
                    "Order not found"
                );

            }


            console.log(
                "ORDER FOUND:",
                orderData
            );


            /*
             * IMPORTANT:
             *
             * Set the order immediately.
             *
             * Even if product image fetching fails,
             * the order itself must remain visible.
             */

            setOrder(orderData);


            /* --------------------------------------------------
               LOAD PRODUCT IMAGES
            -------------------------------------------------- */

            if (
                Array.isArray(
                    orderData.products
                )
            ) {

                const productsWithImages =
                    await Promise.all(

                        orderData.products.map(
                            async (
                                product: Product
                            ) => {

                                /*
                                 * Order already has image.
                                 */

                                if (
                                    product.image
                                ) {

                                    return product;

                                }


                                /*
                                 * Try product service.
                                 */

                                try {

                                    const productData =
                                        await productService.getProductById(
                                            product.productID
                                        );


                                    return {

                                        ...product,

                                        image:
                                            productData?.image ||
                                            ""

                                    };

                                }

                                catch (imageError) {

                                    /*
                                     * VERY IMPORTANT:
                                     *
                                     * Image failure should NOT
                                     * make the order disappear.
                                     */

                                    console.error(
                                        "Product image fetch failed:",
                                        product.productID,
                                        imageError
                                    );


                                    return product;

                                }

                            }
                        )

                    );


                /*
                 * Update only product images.
                 * Order itself is already loaded.
                 */

                setOrder({

                    ...orderData,

                    products:
                        productsWithImages

                });

            }

        }

        catch (error: any) {

            console.error(
                "TRACK ORDER ERROR:",
                error
            );


            /*
             * Only here do we show Order Not Found.
             *
             * This means the actual order API failed.
             */

            setOrder(null);


            if (
                error?.response?.status === 404
            ) {

                toast.error(
                    "Order not found"
                );

            }

            else {

                toast.error(
                    "Unable to find this order."
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    /* ======================================================
       SEARCH ORDER
    ====================================================== */

    const searchOrder = () => {

        const cleanID =
            searchID.trim();

        if (!cleanID) {

            toast.error(
                "Enter Order ID"
            );

            return;

        }

        fetchOrder(cleanID);

    };


    /*
     * IMPORTANT:
     * The search UI is handled as a real form.
     * This makes both the Search button click
     * and Enter key use exactly the same handler.
     */
    const handleSearchSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        searchOrder();

    };

    const handleSearchButtonClick = () => {

        searchOrder();

    };


    /* ======================================================
       HELPERS
    ====================================================== */

    const formatCurrency = (
        amount: number
    ) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(amount);

    };


    const formatDate = (
        date: string
    ) => {

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };


    /* ======================================================
       REJECTED / CANCELLED
    ====================================================== */

    const isRejected =
        order?.orderStatus
            ?.trim()
            .toLowerCase() === "cancelled"
        ||
        order?.orderStatus
            ?.trim()
            .toLowerCase() === "rejected";


    /* ======================================================
       TIMELINE
    ====================================================== */

    const timeline = useMemo(
        () => [

            "Pending",

            "Confirmed",

            "Packed",

            "Shipped",

            "Out For Delivery",

            "Delivered"

        ],
        []
    );


    const activeIndex =
        timeline.indexOf(
            order?.orderStatus ||
            "Pending"
        );


    /* ======================================================
       LOADING
    ====================================================== */

    if (loading) {

        return (

            <>

                <TopBar />

                <Navbar />

                <div className="track-loader">

                    <div className="track-spinner" />

                    <h2>
                        Loading Order...
                    </h2>

                </div>

                <Footer />

            </>

        );

    }


    /* ======================================================
       MAIN
    ====================================================== */

    return (

        <>

            <TopBar />

            <Navbar />


            <main
                className={`track-page ${
                    isRejected
                        ? "track-page--rejected"
                        : ""
                }`}
            >


                {/* ==================================================
                   HERO
                ================================================== */}

                <section className="track-hero">

                    <motion.div
                        className="track-glow"

                        animate={{
                            scale: [
                                1,
                                1.15,
                                1
                            ],

                            opacity: [
                                0.25,
                                0.5,
                                0.25
                            ]
                        }}

                        transition={{
                            duration: 6,
                            repeat: Infinity
                        }}
                    />


                    <motion.div
                        className="track-heading"

                        initial={{
                            opacity: 0,
                            y: 30
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: 0.6
                        }}
                    >

                        <span className="track-badge">

                            <Sparkles
                                size={15}
                            />

                            HIRANYA Tracking

                        </span>


                        <h1>
                            Track Your Order
                        </h1>


                        <p>
                            Stay updated with every
                            step of your luxury
                            jewellery order.
                        </p>

                    </motion.div>

                </section>


                {/* ==================================================
                   SEARCH ORDER
                ================================================== */}

                <section className="track-search-section">

                    <form
                        className="track-search-box"
                        onSubmit={handleSearchSubmit}
                    >

                        <Search
                            size={20}
                        />


                        <input
                            type="text"
                            placeholder="Enter Order ID"
                            value={searchID}

                            onChange={(e) =>
                                setSearchID(
                                    e.target.value
                                )
                            }

                            autoComplete="off"
                            aria-label="Order ID"

                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {

                                    e.preventDefault();

                                    searchOrder();

                                }

                            }}
                        />


                        <button
                            type="button"
                            className="track-search-btn"
                            onClick={handleSearchButtonClick}
                            disabled={loading}
                        >

                            <Search size={17} />

                            {loading
                                ? "Searching..."
                                : "Search"}

                        </button>

                    </form>

                </section>


                {/* ==================================================
                   ORDER FOUND
                ================================================== */}

                {order && (

                    <>


                        {/* ==========================================
                           ORDER HEADER
                        =========================================== */}

                        <section className="track-order-header">

                            <div>

                                <span>
                                    Order ID
                                </span>

                                <h2>
                                    {
                                        order.orderID
                                    }
                                </h2>

                            </div>


                            <div
                                className={`track-status ${
                                    isRejected
                                        ? "rejected"
                                        : order.orderStatus
                                            .replace(
                                                /\s+/g,
                                                ""
                                            )
                                            .toLowerCase()
                                }`}
                            >

                                {
                                    isRejected
                                        ? "Order Rejected"
                                        : order.orderStatus
                                }

                            </div>

                        </section>


                        {/* ==========================================
                           REJECTED MESSAGE
                        =========================================== */}

                        {isRejected && (

                            <motion.section
                                className="track-rejected-card"

                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}

                                transition={{
                                    duration: 0.4
                                }}
                            >

                                <div className="track-rejected-icon">

                                    <XCircle
                                        size={34}
                                    />

                                </div>


                                <div className="track-rejected-content">

                                    <span>
                                        ORDER STATUS
                                    </span>


                                    <h2>
                                        Order Rejected
                                    </h2>


                                    <p>

                                        Unfortunately,
                                        we couldn't process
                                        your order{" "}

                                        <strong>
                                            {order.orderID}
                                        </strong>.

                                    </p>


                                    <p>

                                        Your payment will be
                                        refunded to your
                                        original payment method.

                                    </p>

                                </div>

                            </motion.section>

                        )}


                        {/* ==========================================
                           NORMAL ORDER TIMELINE
                        =========================================== */}

                        {!isRejected && (

                            <section className="track-timeline">

                                {timeline.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={item}
                                            className={`track-step ${
                                                index <= activeIndex
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >

                                            <div className="track-step-icon">

                                                {index <= activeIndex ? (

                                                    <CircleCheckBig />

                                                ) : (

                                                    <Clock3 />

                                                )}

                                            </div>


                                            <span>
                                                {item}
                                            </span>

                                        </div>

                                    )
                                )}

                            </section>

                        )}


                        {/* ==================================================
                           ORDER DETAILS
                        ================================================== */}

                        <section className="track-grid">


                            {/* ==================================================
                               LEFT COLUMN
                            ================================================== */}

                            <div className="track-left">


                                {/* ==========================================
                                   ORDERED PRODUCTS
                                =========================================== */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <Package />

                                        <h3>
                                            Ordered Products
                                        </h3>

                                    </div>


                                    <div className="track-products">

                                        {order.products.map(
                                            (
                                                product
                                            ) => (

                                                <div
                                                    key={
                                                        product.productID
                                                    }
                                                    className="track-product"
                                                >


                                                    {/* PRODUCT IMAGE */}

                                                    <div className="track-product-image">

                                                        {product.image ? (

                                                            <img
                                                                src={
                                                                    product.image
                                                                }

                                                                alt={
                                                                    product.name
                                                                }

                                                                onError={(
                                                                    e
                                                                ) => {

                                                                    e.currentTarget.style.display =
                                                                        "none";

                                                                }}
                                                            />

                                                        ) : (

                                                            <Gem />

                                                        )}

                                                    </div>


                                                    {/* PRODUCT DETAILS */}

                                                    <div className="track-product-info">

                                                        <h4>
                                                            {
                                                                product.name
                                                            }
                                                        </h4>


                                                        <span>
                                                            Qty :{" "}
                                                            {
                                                                product.quantity
                                                            }
                                                        </span>

                                                    </div>


                                                    {/* PRICE */}

                                                    <strong>

                                                        {
                                                            formatCurrency(
                                                                product.price *
                                                                product.quantity
                                                            )
                                                        }

                                                    </strong>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>


                                {/* ==========================================
                                   DELIVERY ADDRESS
                                =========================================== */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <MapPin />

                                        <h3>
                                            Delivery Address
                                        </h3>

                                    </div>


                                    <div className="track-address">

                                        <h4>

                                            {
                                                order
                                                    .shippingAddress
                                                    .fullName
                                            }

                                        </h4>


                                        <p>

                                            {
                                                order
                                                    .shippingAddress
                                                    .address
                                            }

                                        </p>


                                        <p>

                                            {
                                                order
                                                    .shippingAddress
                                                    .city
                                            }

                                            ,{" "}

                                            {
                                                order
                                                    .shippingAddress
                                                    .state
                                            }

                                        </p>


                                        <p>

                                            {
                                                order
                                                    .shippingAddress
                                                    .country
                                            }

                                            {" - "}

                                            {
                                                order
                                                    .shippingAddress
                                                    .pincode
                                            }

                                        </p>


                                        <span>

                                            {
                                                order
                                                    .shippingAddress
                                                    .phone
                                            }

                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                               RIGHT COLUMN
                            ================================================== */}

                            <div className="track-right">


                                {/* ==========================================
                                   ORDER SUMMARY
                                =========================================== */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <ShoppingBag />

                                        <h3>
                                            Order Summary
                                        </h3>

                                    </div>


                                    <div className="track-summary">


                                        {/* ORDER ID */}

                                        <div>

                                            <span>
                                                Order ID
                                            </span>

                                            <strong>
                                                {
                                                    order.orderID
                                                }
                                            </strong>

                                        </div>


                                        {/* ORDER DATE */}

                                        <div>

                                            <span>
                                                Order Date
                                            </span>

                                            <strong>
                                                {
                                                    formatDate(
                                                        order.createdAt
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        {/* DELIVERY
                                            HIDDEN WHEN REJECTED */}

                                        {!isRejected && (

                                            <div>

                                                <span>
                                                    Delivery
                                                </span>

                                                <strong>
                                                    {
                                                        order.deliveryMethod
                                                    }
                                                </strong>

                                            </div>

                                        )}


                                        {/* ESTIMATED DELIVERY
                                            HIDDEN WHEN REJECTED */}

                                        {!isRejected && (

                                            <div>

                                                <span>
                                                    Estimated Delivery
                                                </span>

                                                <strong>
                                                    Based on order status
                                                </strong>

                                            </div>

                                        )}


                                        {/* REFUND
                                            ONLY FOR REJECTED */}

                                        {isRejected && (

                                            <div>

                                                <span>
                                                    Refund
                                                </span>

                                                <strong>
                                                    Refund will be processed
                                                </strong>

                                            </div>

                                        )}


                                        {/* TOTAL */}

                                        <div className="track-total">

                                            <span>
                                                Total Amount
                                            </span>

                                            <strong>
                                                {
                                                    formatCurrency(
                                                        order.totalAmount
                                                    )
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* ==========================================
                                   SUPPORT
                                =========================================== */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <CircleCheckBig />

                                        <h3>
                                            Need Assistance?
                                        </h3>

                                    </div>


                                    <p className="track-help-text">

                                        Our HIRANYA Luxury
                                        Support Team is
                                        available to help
                                        you with order,
                                        delivery, exchange
                                        or jewellery related
                                        queries.

                                    </p>


                                    <button
                                        type="button"
                                        className="track-support-btn"

                                        onClick={() =>
                                            navigate(
                                                "/contact"
                                            )
                                        }
                                    >

                                        Contact Support

                                    </button>

                                </div>

                            </div>

                        </section>


                        {/* ==================================================
                           ACTIONS
                        ================================================== */}

                        <section className="track-actions">


                            <button
                                type="button"
                                className="track-outline-btn"

                                onClick={() =>
                                    navigate(
                                        "/my-orders"
                                    )
                                }
                            >

                                <Package
                                    size={18}
                                />

                                My Orders

                            </button>


                            {/* INVOICE
                                HIDDEN WHEN REJECTED */}

                            {!isRejected && (

                                <button
                                    type="button"
                                    className="track-outline-btn"

                                    onClick={() =>
                                        toast.success(
                                            "Invoice download coming soon."
                                        )
                                    }
                                >

                                    Download Invoice

                                </button>

                            )}


                            <button
                                type="button"
                                className="track-primary-btn"

                                onClick={() =>
                                    navigate(
                                        "/jewellery"
                                    )
                                }
                            >

                                Continue Shopping

                                <ArrowRight
                                    size={18}
                                />

                            </button>

                        </section>

                    </>

                )}


                {/* ==================================================
                   ORDER NOT FOUND
                ================================================== */}

                {!loading && !order && (

                    <section className="track-empty">

                        <Package
                            size={70}
                        />


                        <h2>
                            Order Not Found
                        </h2>


                        <p>
                            We couldn't find any order
                            with the provided Order ID.
                        </p>


                        <button
                            type="button"

                            onClick={() =>
                                navigate(
                                    "/jewellery"
                                )
                            }
                        >

                            Browse Jewellery

                        </button>

                    </section>

                )}

            </main>


            <Footer />

        </>

    );

};


export default TrackOrder;