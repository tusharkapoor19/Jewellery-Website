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
    Download,
    Gem,
    MapPin,
    Package,
    Search,
    ShoppingBag,
    Sparkles,
    XCircle
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    landmark?: string;
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

    subtotal?: number;

    shippingCharge?: number;

    discount?: number;

    gst?: number;

    totalAmount: number;

    orderStatus: string;

    paymentStatus?: string;

    hideInvoice?: boolean;

    createdAt: string;

    updatedAt?: string;
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


            /* ----------------------------------------------
               GET ORDER
            ---------------------------------------------- */

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
             * Set order immediately.
             *
             * Product image failure should
             * never hide the complete order.
             */

            setOrder(orderData);


            /* ----------------------------------------------
               LOAD PRODUCT IMAGES
            ---------------------------------------------- */

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
                                 * Image already exists
                                 */

                                if (
                                    product.image
                                ) {

                                    return product;

                                }


                                /*
                                 * Fetch image from
                                 * Product Service
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

                                catch (
                                    imageError
                                ) {

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


                setOrder({

                    ...orderData,

                    products:
                        productsWithImages

                });

            }

        }

        catch (
            error: any
        ) {

            console.error(
                "TRACK ORDER ERROR:",
                error
            );


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
     * Form submit handles:
     *
     * 1. Search button click
     * 2. Enter key
     *
     * So both work correctly.
     */

    const handleSearchSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

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

        if (!date) {

            return "-";

        }


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
       INVOICE DOWNLOAD
    ====================================================== */

    const downloadInvoice = (
        selectedOrder: Order
    ) => {

        try {

            /* ----------------------------------------------
               PDF
            ---------------------------------------------- */

            const doc =
                new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4"
                });


            const pageWidth = 210;

            const gold: [
                number,
                number,
                number
            ] = [
                178,
                132,
                38
            ];


            const dark: [
                number,
                number,
                number
            ] = [
                20,
                28,
                45
            ];


            const cream: [
                number,
                number,
                number
            ] = [
                248,
                244,
                230
            ];


            const grey: [
                number,
                number,
                number
            ] = [
                95,
                95,
                95
            ];


            /* ----------------------------------------------
               INVOICE CURRENCY
            ---------------------------------------------- */

            const formatRs = (
                amount: number = 0
            ) => {

                return `Rs. ${amount.toLocaleString(
                    "en-IN"
                )}`;

            };


            const address =
                selectedOrder.shippingAddress;


            /* ==================================================
               PREMIUM HEADER
            ================================================== */

            doc.setFillColor(
                ...cream
            );

            doc.rect(
                0,
                0,
                pageWidth,
                42,
                "F"
            );


            /* ----------------------------------------------
               HIRANYA
            ---------------------------------------------- */

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(25);

            doc.setTextColor(
                ...gold
            );

            doc.text(
                "HIRANYA",
                14,
                17
            );


            /* ----------------------------------------------
               TAGLINE
            ---------------------------------------------- */

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(8.5);

            doc.text(
                "CRAFTED FOR LUXURY",
                15,
                25
            );


            /* ----------------------------------------------
               INVOICE TITLE
            ---------------------------------------------- */

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(21);

            doc.setTextColor(
                ...dark
            );

            doc.text(
                "INVOICE",
                195,
                15,
                {
                    align: "right"
                }
            );


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(8.5);

            doc.text(
                `Order ID: ${selectedOrder.orderID}`,
                195,
                24,
                {
                    align: "right"
                }
            );


            doc.text(
                `Date: ${formatDate(
                    selectedOrder.createdAt
                )}`,
                195,
                31,
                {
                    align: "right"
                }
            );


            /* ==================================================
               STATUS / DELIVERY
            ================================================== */

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(8.5);

            doc.setTextColor(
                ...gold
            );


            doc.text(
                `STATUS: ${(
                    selectedOrder.orderStatus ||
                    "PENDING"
                ).toUpperCase()}`,
                14,
                57
            );


            doc.text(
                `DELIVERY: ${(
                    selectedOrder.deliveryMethod ||
                    "STANDARD"
                ).toUpperCase()}`,
                118,
                57
            );


            doc.setDrawColor(
                ...gold
            );

            doc.setLineWidth(
                0.35
            );

            doc.line(
                14,
                64,
                196,
                64
            );


            /* ==================================================
               DELIVERY ADDRESS
            ================================================== */

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(11);

            doc.setTextColor(
                ...gold
            );

            doc.text(
                "DELIVERY ADDRESS",
                14,
                77
            );


            let addressY = 87;


            doc.setTextColor(
                ...dark
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(9.5);


            doc.text(
                address?.fullName || "-",
                14,
                addressY
            );


            addressY += 8;


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(9);


            if (
                address?.phone
            ) {

                doc.text(
                    address.phone,
                    14,
                    addressY
                );

                addressY += 7;

            }


            if (
                address?.address
            ) {

                const addressLines =
                    doc.splitTextToSize(
                        address.address,
                        170
                    );


                doc.text(
                    addressLines,
                    14,
                    addressY
                );


                addressY +=
                    addressLines.length *
                    5 +
                    2;

            }


            if (
                address?.landmark
            ) {

                doc.text(
                    address.landmark,
                    14,
                    addressY
                );

                addressY += 7;

            }


            const cityState =
                [
                    address?.city,
                    address?.state
                ]
                    .filter(Boolean)
                    .join(", ");


            if (cityState) {

                doc.text(
                    cityState,
                    14,
                    addressY
                );

                addressY += 7;

            }


            if (
                address?.country ||
                address?.pincode
            ) {

                doc.text(
                    `${address?.country || "India"} - ${
                        address?.pincode || ""
                    }`,
                    14,
                    addressY
                );

                addressY += 7;

            }


            /* ==================================================
               ORDERED JEWELLERY
            ================================================== */

            const jewelleryTitleY =
                Math.max(
                    addressY + 13,
                    112
                );


            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(11);

            doc.setTextColor(
                ...gold
            );


            doc.text(
                "ORDERED JEWELLERY",
                14,
                jewelleryTitleY
            );


            /* ==================================================
               PRODUCT TABLE
            ================================================== */

            const rows =
                selectedOrder.products.map(
                    (
                        product
                    ) => [

                        product.name,

                        "—",

                        String(
                            product.quantity
                        ),

                        formatRs(
                            product.price
                        ),

                        formatRs(
                            product.price *
                            product.quantity
                        )

                    ]
                );


            autoTable(
                doc,
                {

                    startY:
                        jewelleryTitleY + 9,

                    margin: {
                        left: 10,
                        right: 10
                    },

                    head: [
                        [
                            "PRODUCT",
                            "SIZE",
                            "QTY",
                            "PRICE",
                            "TOTAL"
                        ]
                    ],

                    body: rows,

                    theme:
                        "grid",

                    styles: {

                        font:
                            "helvetica",

                        fontSize: 8.5,

                        cellPadding: 4,

                        textColor:
                            dark,

                        lineColor: [
                            205,
                            205,
                            205
                        ],

                        lineWidth:
                            0.2,

                        valign:
                            "middle"

                    },

                    headStyles: {

                        fillColor:
                            gold,

                        textColor: [
                            255,
                            255,
                            255
                        ],

                        fontStyle:
                            "bold",

                        halign:
                            "center",

                        fontSize:
                            8.5

                    },

                    bodyStyles: {

                        minCellHeight:
                            14

                    },

                    alternateRowStyles: {

                        fillColor: [
                            250,
                            249,
                            246
                        ]

                    },

                    columnStyles: {

                        0: {
                            cellWidth: 76,
                            halign: "left"
                        },

                        1: {
                            cellWidth: 24,
                            halign: "center"
                        },

                        2: {
                            cellWidth: 18,
                            halign: "center"
                        },

                        3: {
                            cellWidth: 35,
                            halign: "right"
                        },

                        4: {
                            cellWidth: 35,
                            halign: "right"
                        }

                    }

                }
            );


            /* ==================================================
               TOTALS
            ================================================== */

            const tableEndY =
                (
                    doc as any
                ).lastAutoTable?.finalY ||
                150;


            let totalsY =
                tableEndY + 15;


            const subtotal =
                selectedOrder.subtotal ??
                selectedOrder.products.reduce(
                    (
                        total,
                        product
                    ) =>
                        total +
                        (
                            product.price *
                            product.quantity
                        ),
                    0
                );


            const shipping =
                selectedOrder.shippingCharge ??
                0;


            const discount =
                selectedOrder.discount ??
                0;


            const gst =
                selectedOrder.gst ??
                0;


            /* ----------------------------------------------
               TOP GOLD LINE
            ---------------------------------------------- */

            doc.setDrawColor(
                ...gold
            );

            doc.setLineWidth(
                0.35
            );

            doc.line(
                105,
                totalsY - 5,
                196,
                totalsY - 5
            );


            /* ----------------------------------------------
               TOTAL ROW HELPER
            ---------------------------------------------- */

            const drawTotalRow = (
                label: string,
                value: string,
                y: number,
                bold = false
            ) => {

                doc.setFont(
                    "helvetica",
                    bold
                        ? "bold"
                        : "normal"
                );


                doc.setFontSize(
                    bold
                        ? 10.5
                        : 8.5
                );


                if (bold) {

                    doc.setTextColor(
                        ...dark
                    );

                }

                else {

                    doc.setTextColor(
                        ...grey
                    );

                }


                doc.text(
                    label,
                    115,
                    y
                );


                doc.text(
                    value,
                    196,
                    y,
                    {
                        align: "right"
                    }
                );

            };


            /* ----------------------------------------------
               SUBTOTAL
            ---------------------------------------------- */

            drawTotalRow(
                "Subtotal",
                formatRs(
                    subtotal
                ),
                totalsY + 5
            );


            totalsY += 10;


            /* ----------------------------------------------
               SHIPPING
            ---------------------------------------------- */

            drawTotalRow(
                "Shipping",
                formatRs(
                    shipping
                ),
                totalsY
            );


            totalsY += 10;


            /* ----------------------------------------------
               DISCOUNT
            ---------------------------------------------- */

            drawTotalRow(
                "Discount",
                `-${formatRs(
                    discount
                )}`,
                totalsY
            );


            totalsY += 10;


            /* ----------------------------------------------
               GST
            ---------------------------------------------- */

            drawTotalRow(
                "GST",
                formatRs(
                    gst
                ),
                totalsY
            );


            totalsY += 11;


            /* ----------------------------------------------
               TOTAL LINE
            ---------------------------------------------- */

            doc.setDrawColor(
                ...gold
            );

            doc.setLineWidth(
                0.35
            );

            doc.line(
                105,
                totalsY - 5,
                196,
                totalsY - 5
            );


            /* ----------------------------------------------
               TOTAL
            ---------------------------------------------- */

            drawTotalRow(
                "TOTAL",
                formatRs(
                    selectedOrder.totalAmount
                ),
                totalsY + 4,
                true
            );


            /* ==================================================
               PAYMENT STATUS
            ================================================== */

            const paymentY =
                totalsY + 22;


            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(
                8.5
            );

            doc.setTextColor(
                ...gold
            );


            doc.text(
                "PAYMENT STATUS",
                14,
                paymentY
            );


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setTextColor(
                ...dark
            );


            doc.text(
                selectedOrder.paymentStatus ||
                "Pending",
                14,
                paymentY + 7
            );


            /* ==================================================
               FOOTER
            ================================================== */

            doc.setDrawColor(
                220,
                220,
                220
            );

            doc.setLineWidth(
                0.2
            );


            doc.line(
                14,
                274,
                196,
                274
            );


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(
                7.5
            );

            doc.setTextColor(
                115,
                115,
                115
            );


            doc.text(
                "Thank you for choosing HIRANYA Jewellery.",
                105,
                282,
                {
                    align: "center"
                }
            );


            doc.text(
                "This is a computer-generated invoice and does not require a signature.",
                105,
                288,
                {
                    align: "center"
                }
            );


            /* ==================================================
               DOWNLOAD
            ================================================== */

            doc.save(
                `HIRANYA-Invoice-${selectedOrder.orderID}.pdf`
            );


            toast.success(
                "Invoice downloaded successfully"
            );

        }

        catch (
            error
        ) {

            console.error(
                "Invoice generation error:",
                error
            );


            toast.error(
                "Unable to generate invoice"
            );

        }

    };


    /* ======================================================
       REJECTED / CANCELLED
    ====================================================== */

    const isRejected =
        order?.orderStatus
            ?.trim()
            .toLowerCase() ===
            "cancelled"
        ||
        order?.orderStatus
            ?.trim()
            .toLowerCase() ===
            "rejected";


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
                   SEARCH
                ================================================== */}

                <section className="track-search-section">

                    <form
                        className="track-search-box"
                        onSubmit={
                            handleSearchSubmit
                        }
                    >

                        <Search
                            size={20}
                        />


                        <input
                            type="text"

                            placeholder="Enter Order ID"

                            value={
                                searchID
                            }

                            onChange={(
                                e
                            ) =>
                                setSearchID(
                                    e.target.value
                                )
                            }

                            autoComplete="off"

                            aria-label="Order ID"
                        />


                        <button
                            type="submit"

                            className="track-search-btn"

                            disabled={
                                loading ||
                                !searchID.trim()
                            }
                        >

                            <Search
                                size={17}
                            />

                            {
                                loading
                                    ? "Searching..."
                                    : "Search"
                            }

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
                           REJECTED
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
                                            {
                                                order.orderID
                                            }
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
                           TIMELINE
                        =========================================== */}

                        {!isRejected && (

                            <section className="track-timeline">

                                {timeline.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                item
                                            }

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
                               LEFT
                            ================================================== */}

                            <div className="track-left">


                                {/* ==========================================
                                   PRODUCTS
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
                                   ADDRESS
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


                                        {order
                                            .shippingAddress
                                            .landmark && (

                                            <p>

                                                {
                                                    order
                                                        .shippingAddress
                                                        .landmark
                                                }

                                            </p>

                                        )}


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
                               RIGHT
                            ================================================== */}

                            <div className="track-right">


                                {/* ==========================================
                                   SUMMARY
                                =========================================== */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <ShoppingBag />

                                        <h3>
                                            Order Summary
                                        </h3>

                                    </div>


                                    <div className="track-summary">


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


                            {/* MY ORDERS */}

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


                            {/* DOWNLOAD INVOICE */}

                            {!isRejected &&
                                !order.hideInvoice && (

                                    <button
                                        type="button"

                                        className="track-outline-btn"

                                        onClick={() =>
                                            downloadInvoice(
                                                order
                                            )
                                        }
                                    >

                                        <Download
                                            size={18}
                                        />

                                        Download Invoice

                                    </button>

                                )}


                            {/* CONTINUE SHOPPING */}

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

                {!loading &&
                    !order && (

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