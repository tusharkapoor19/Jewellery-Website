import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import "./Orders.css";

import {
    useNavigate
} from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    Clock3,
    Download,
    Filter,
    Gem,
    MapPin,
    Package,
    PackageCheck,
    Search,
    ShoppingBag,
    Sparkles,
    Truck,
    XCircle
} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import orderService from "../../services/orderService";
import productService from "../../services/productService";


/* ==========================================================
   Interfaces
========================================================== */

interface Product {

    productID: string;

    name: string;

    image?: string;

    quantity: number;

    price: number;

    size?: string;

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

const MyOrders: React.FC = () => {

    const navigate = useNavigate();


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        orders,
        setOrders
    ] = useState<Order[]>([]);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        status,
        setStatus
    ] = useState("All");


    /* ======================================================
       Load Orders
    ====================================================== */

    useEffect(() => {

        fetchOrders();

    }, []);


    const fetchOrders = async () => {

        try {

            setLoading(true);


            const response =
                await orderService.getMyOrders();


            const ordersData =
                response.orders || [];


            const ordersWithImages =
                await Promise.all(

                    ordersData.map(
                        async (order: Order) => {

                            const productsWithImages =
                                await Promise.all(

                                    order.products.map(
                                        async (
                                            product: Product
                                        ) => {

                                            /*
                                             * If image already exists,
                                             * use it directly.
                                             */

                                            if (
                                                product.image
                                            ) {

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

                                            }

                                            catch (error) {

                                                console.error(
                                                    `Failed to fetch image for ${product.productID}`,
                                                    error
                                                );


                                                return product;

                                            }

                                        }
                                    )

                                );


                            return {

                                ...order,

                                products:
                                    productsWithImages

                            };

                        }

                    )

                );


            setOrders(
                ordersWithImages
            );

        }

        catch (error) {

            console.error(
                "My Orders Error:",
                error
            );


            toast.error(
                "Unable to load your orders."
            );

        }

        finally {

            setLoading(false);

        }

    };


    /* ======================================================
       Helpers
    ====================================================== */


    const formatCurrency = (
        amount: number
    ) =>

        new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(amount);


    const formatDate = (
        date: string
    ) =>

        new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    /*
     * ======================================================
     * REJECTED STATUS HELPER
     * ======================================================
     *
     * Backend uses "Cancelled".
     * We also support "Rejected" in case backend
     * sends that value in future.
     */

    const isOrderRejected = (
        order: Order
    ) => {

        const currentStatus =
            order.orderStatus
                ?.trim()
                .toLowerCase();


        return (
            currentStatus === "cancelled" ||
            currentStatus === "rejected"
        );

    };


    /* ======================================================
       Stats
    ====================================================== */

    const totalOrders =
        orders.length;


    const deliveredOrders =
        orders.filter(
            order =>
                order.orderStatus === "Delivered"
        ).length;


    const pendingOrders =
        orders.filter(
            order =>
                order.orderStatus === "Pending"
        ).length;


    const cancelledOrders =
        orders.filter(
            order =>
                isOrderRejected(order)
        ).length;


    /* ======================================================
       Filter
    ====================================================== */

    const filteredOrders =
        useMemo(() => {

            return orders.filter(
                order => {

                    const matchSearch =
                        order.orderID
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );


                    const matchStatus =
                        status === "All"
                        ||
                        order.orderStatus === status;


                    return (
                        matchSearch
                        &&
                        matchStatus
                    );

                }
            ).sort(
                (a, b) => {

                    /*
                     * Newest order first — ORD023 before ORD001.
                     * Order IDs are "ORD" + a zero-padded number
                     * (see order_svc.js createorder), so pulling
                     * the numeric part out and comparing it
                     * descending sorts newest-to-oldest reliably
                     * even once the number grows past 3 digits.
                     */

                    const numA =
                        parseInt(
                            a.orderID.replace(/\D/g, ""),
                            10
                        ) || 0;

                    const numB =
                        parseInt(
                            b.orderID.replace(/\D/g, ""),
                            10
                        ) || 0;

                    return numB - numA;

                }
            );

        }, [
            orders,
            search,
            status
        ]);


    /* ======================================================
       Navigation
    ====================================================== */

    const openOrder = (
        order: Order
    ) => {

        navigate(
            "/order-success",
            {
                state: order
            }
        );

    };


    const trackOrder = (
        orderID: string
    ) => {

        navigate(
            "/track-order",
            {
                state: {
                    orderID
                }
            }
        );

    };


    /* ======================================================
       Invoice
    ====================================================== */

    const invoiceCurrency = (
        amount: number
    ) =>
        `Rs. ${Number(
            amount || 0
        ).toLocaleString("en-IN")}`;


    const downloadInvoice = (
        order: Order
    ) => {

        /*
         * Safety:
         * Rejected orders should not generate an invoice.
         */

        if (
            isOrderRejected(order)
        ) {

            toast.error(
                "Invoice is unavailable for rejected orders."
            );

            return;

        }


        try {

            const doc =
                new jsPDF();


            /* ==========================================
               COLORS
            ========================================== */

            const gold:
                [number, number, number] =
                [166, 126, 42];

            const dark:
                [number, number, number] =
                [35, 35, 35];

            const lightGold:
                [number, number, number] =
                [245, 239, 222];

            const grey:
                [number, number, number] =
                [105, 105, 105];


            /* ==========================================
               HEADER
            ========================================== */

            doc.setFillColor(
                ...lightGold
            );

            doc.rect(
                0,
                0,
                210,
                42,
                "F"
            );


            doc.setTextColor(
                ...gold
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(25);

            doc.text(
                "HIRANYA",
                18,
                22
            );


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(9);

            doc.text(
                "CRAFTED FOR LUXURY",
                19,
                30
            );


            doc.setTextColor(
                ...dark
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(19);

            doc.text(
                "INVOICE",
                145,
                19
            );


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(9);


            doc.text(
                `Order ID: ${order.orderID}`,
                145,
                27
            );


            doc.text(
                `Date: ${formatDate(
                    order.createdAt
                )}`,
                145,
                34
            );


            /* ==========================================
               ORDER STATUS
            ========================================== */

            doc.setTextColor(
                ...gold
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(9);


            doc.text(
                `STATUS: ${order.orderStatus.toUpperCase()}`,
                18,
                52
            );


            doc.text(
                `DELIVERY: ${order.deliveryMethod.toUpperCase()}`,
                130,
                52
            );


            /* ==========================================
               DELIVERY ADDRESS
            ========================================== */

            doc.setDrawColor(
                ...gold
            );

            doc.line(
                18,
                58,
                192,
                58
            );


            doc.setTextColor(
                ...gold
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(11);


            doc.text(
                "DELIVERY ADDRESS",
                18,
                69
            );


            doc.setTextColor(
                ...dark
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(10);


            doc.text(
                order.shippingAddress.fullName || "",
                18,
                78
            );


            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(9);


            doc.text(
                order.shippingAddress.phone || "",
                18,
                85
            );


            doc.text(
                order.shippingAddress.address || "",
                18,
                92
            );


            doc.text(
                `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
                18,
                99
            );


            doc.text(
                `${order.shippingAddress.country} - ${order.shippingAddress.pincode}`,
                18,
                106
            );


            /* ==========================================
               PRODUCTS
            ========================================== */

            doc.setTextColor(
                ...gold
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(11);


            doc.text(
                "ORDERED JEWELLERY",
                18,
                119
            );


            autoTable(
                doc,
                {

                    startY: 125,

                    head: [[
                        "PRODUCT",
                        "SIZE",
                        "QTY",
                        "PRICE",
                        "TOTAL"
                    ]],

                    body:
                        order.products.map(
                            product => [

                                product.name,

                                product.size ||
                                    "—",

                                String(
                                    product.quantity
                                ),

                                invoiceCurrency(
                                    product.price
                                ),

                                invoiceCurrency(
                                    product.price *
                                    product.quantity
                                )

                            ]
                        ),

                    theme: "grid",

                    styles: {
                        fontSize: 9,
                        cellPadding: 4,
                        textColor: dark
                    },

                    headStyles: {
                        fillColor: gold,
                        textColor: [
                            255,
                            255,
                            255
                        ],
                        fontStyle: "bold",
                        halign: "center"
                    },

                    columnStyles: {

                        0: {
                            cellWidth: 68
                        },

                        1: {
                            cellWidth: 22,
                            halign: "center"
                        },

                        2: {
                            cellWidth: 16,
                            halign: "center"
                        },

                        3: {
                            cellWidth: 34,
                            halign: "right"
                        },

                        4: {
                            cellWidth: 34,
                            halign: "right"
                        }

                    },

                    alternateRowStyles: {
                        fillColor: [
                            250,
                            248,
                            243
                        ]
                    }

                }
            );


            /* ==========================================
               SUMMARY
            ========================================== */

            const finalY =
                (doc as any)
                    .lastAutoTable
                    .finalY + 16;


            doc.setDrawColor(
                ...gold
            );

            doc.line(
                115,
                finalY - 6,
                192,
                finalY - 6
            );


            doc.setTextColor(
                ...grey
            );

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(10);


            doc.text(
                "Subtotal",
                125,
                finalY
            );


            doc.text(
                invoiceCurrency(
                    order.subtotal
                ),
                192,
                finalY,
                {
                    align: "right"
                }
            );


            doc.text(
                "Shipping",
                125,
                finalY + 9
            );


            doc.text(
                invoiceCurrency(
                    order.shippingCharge
                ),
                192,
                finalY + 9,
                {
                    align: "right"
                }
            );


            doc.text(
                "Discount",
                125,
                finalY + 18
            );


            doc.text(
                `-${invoiceCurrency(
                    order.discount
                )}`,
                192,
                finalY + 18,
                {
                    align: "right"
                }
            );


            doc.text(
                "GST",
                125,
                finalY + 27
            );


            doc.text(
                invoiceCurrency(
                    order.gst
                ),
                192,
                finalY + 27,
                {
                    align: "right"
                }
            );


            /* ==========================================
               GRAND TOTAL
            ========================================== */

            doc.setDrawColor(
                ...gold
            );

            doc.line(
                115,
                finalY + 35,
                192,
                finalY + 35
            );


            doc.setTextColor(
                ...dark
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(13);


            doc.text(
                "GRAND TOTAL",
                125,
                finalY + 48
            );


            doc.setTextColor(
                ...gold
            );

            doc.setFontSize(16);


            doc.text(
                invoiceCurrency(
                    order.totalAmount
                ),
                192,
                finalY + 48,
                {
                    align: "right"
                }
            );


            /* ==========================================
               FOOTER
            ========================================== */

            doc.setFillColor(
                ...lightGold
            );

            doc.rect(
                0,
                270,
                210,
                27,
                "F"
            );


            doc.setTextColor(
                ...gold
            );

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setFontSize(10);


            doc.text(
                "THANK YOU FOR CHOOSING HIRANYA",
                105,
                281,
                {
                    align: "center"
                }
            );


            doc.setTextColor(
                ...grey
            );

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(8);


            doc.text(
                "Every masterpiece selected today becomes part of your story.",
                105,
                288,
                {
                    align: "center"
                }
            );


            /* ==========================================
               SAVE
            ========================================== */

            doc.save(
                `HIRANYA-Invoice-${order.orderID}.pdf`
            );


            toast.success(
                "Invoice downloaded successfully!"
            );

        }

        catch (error) {

            console.error(
                "Invoice generation error:",
                error
            );


            toast.error(
                "Unable to generate invoice."
            );

        }

    };


    /* ======================================================
       Loading
    ====================================================== */

    if (loading) {

        return (

            <>

                <TopBar />

                <Navbar />


                <div className="myorders-loader">

                    <div className="myorders-spinner" />

                    <h2>
                        Loading Your Orders...
                    </h2>

                </div>


                <Footer />

            </>

        );

    }


    /* ======================================================
       UI
    ====================================================== */

    return (

        <>

            <TopBar />

            <Navbar />


            <main className="myorders-page">


                {/* ==========================================================
                    Hero Section
                ========================================================== */}

                <section className="myorders-hero">

                    <motion.div
                        className="myorders-glow"

                        animate={{
                            scale: [
                                1,
                                1.15,
                                1
                            ],
                            opacity: [
                                .30,
                                .55,
                                .30
                            ]
                        }}

                        transition={{
                            duration: 6,
                            repeat: Infinity
                        }}
                    />


                    <motion.div
                        className="myorders-heading"

                        initial={{
                            opacity: 0,
                            y: 40
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: .6
                        }}
                    >

                        <span className="myorders-badge">

                            <Sparkles size={15} />

                            HIRANYA Orders

                        </span>


                        <h1>
                            My Orders
                        </h1>


                        <p>
                            Track, manage and revisit every luxury purchase
                            from your HIRANYA collection.
                        </p>

                    </motion.div>

                </section>


                {/* ==========================================================
                    Statistics
                ========================================================== */}

                <section className="myorders-stats">


                    <div className="myorders-stat-card">

                        <ShoppingBag />

                        <span>
                            Total Orders
                        </span>

                        <h2>
                            {totalOrders}
                        </h2>

                    </div>


                    <div className="myorders-stat-card">

                        <BadgeCheck />

                        <span>
                            Delivered
                        </span>

                        <h2>
                            {deliveredOrders}
                        </h2>

                    </div>


                    <div className="myorders-stat-card">

                        <Clock3 />

                        <span>
                            Pending
                        </span>

                        <h2>
                            {pendingOrders}
                        </h2>

                    </div>


                    <div className="myorders-stat-card">

                        <XCircle />

                        <span>
                            Rejected
                        </span>

                        <h2>
                            {cancelledOrders}
                        </h2>

                    </div>


                </section>


                {/* ==========================================================
                    Search & Filter
                ========================================================== */}

                <section className="myorders-toolbar">


                    <div className="myorders-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search by Order ID..."
                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="myorders-filter">

                        <Filter size={18} />

                        <select
                            value={status}

                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option>
                                All
                            </option>

                            <option>
                                Pending
                            </option>

                            <option>
                                Confirmed
                            </option>

                            <option>
                                Packed
                            </option>

                            <option>
                                Shipped
                            </option>

                            <option>
                                Out For Delivery
                            </option>

                            <option>
                                Delivered
                            </option>

                            <option>
                                Cancelled
                            </option>

                        </select>

                    </div>

                </section>


                {/* ==========================================================
                    Orders Container
                ========================================================== */}

                <section className="myorders-container">

                    {
                        filteredOrders.length === 0

                        ?

                        (

                            <div className="myorders-empty">

                                <Package size={70} />

                                <h2>
                                    No Orders Found
                                </h2>

                                <p>
                                    We couldn't find any orders matching
                                    your search.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/jewellery"
                                        )
                                    }
                                >

                                    Explore Jewellery

                                    <ArrowRight size={18} />

                                </button>

                            </div>

                        )

                        :

                        (

                            filteredOrders.map(
                                (order) => {

                                    const isRejected =
                                        isOrderRejected(
                                            order
                                        );


                                    return (

                                        <motion.div

                                            key={
                                                order.orderID
                                            }

                                            className="myorder-card"

                                            initial={{
                                                opacity: 0,
                                                y: 30
                                            }}

                                            whileInView={{
                                                opacity: 1,
                                                y: 0
                                            }}

                                            viewport={{
                                                once: true
                                            }}

                                            transition={{
                                                duration: .45
                                            }}
                                        >


                                            {/* =====================================
                                                Header
                                            ====================================== */}

                                            <div className="myorder-header">

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
                                                    className={`myorder-status ${
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

                                            </div>


                                            {/* =====================================
                                                Rejected Message
                                            ====================================== */}

                                            {
                                                isRejected && (

                                                    <div className="myorder-rejected-message">

                                                        <XCircle
                                                            size={22}
                                                        />

                                                        <div>

                                                            <strong>
                                                                Order Rejected
                                                            </strong>

                                                            <p>
                                                                Unfortunately,
                                                                we couldn't
                                                                process this
                                                                order.
                                                                Your payment
                                                                will be refunded
                                                                to your original
                                                                payment method.
                                                            </p>

                                                        </div>

                                                    </div>

                                                )
                                            }


                                            {/* =====================================
                                                Products
                                            ====================================== */}

                                            <div className="myorder-products">

                                                {

                                                    order.products.map(
                                                        product => (

                                                            <div

                                                                key={
                                                                    product.productID
                                                                }

                                                                className="myorder-product"
                                                            >

                                                                <div className="myorder-image">

                                                                    {

                                                                        product.image

                                                                        ?

                                                                        (

                                                                            <img
                                                                                src={
                                                                                    product.image
                                                                                }
                                                                                alt={
                                                                                    product.name
                                                                                }
                                                                            />

                                                                        )

                                                                        :

                                                                        (

                                                                            <Gem />

                                                                        )

                                                                    }

                                                                </div>


                                                                <div className="myorder-product-info">

                                                                    <h3>
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </h3>

                                                                    <span>

                                                                        Qty :

                                                                        {" "}

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
                                                    )

                                                }

                                            </div>


                                            {/* =====================================
                                                Footer Info
                                            ====================================== */}

                                            <div className="myorder-footer">


                                                <div className="myorder-footer-item">

                                                    <CalendarDays />

                                                    <div>

                                                        <span>
                                                            Ordered On
                                                        </span>

                                                        <strong>

                                                            {
                                                                formatDate(
                                                                    order.createdAt
                                                                )
                                                            }

                                                        </strong>

                                                    </div>

                                                </div>


                                                <div className="myorder-footer-item">

                                                    <Truck />

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

                                                </div>


                                                <div className="myorder-footer-item">

                                                    <MapPin />

                                                    <div>

                                                        <span>
                                                            Deliver To
                                                        </span>

                                                        <strong>
                                                            {
                                                                order.shippingAddress.city
                                                            }
                                                        </strong>

                                                    </div>

                                                </div>


                                                <div className="myorder-footer-item">

                                                    <PackageCheck />

                                                    <div>

                                                        <span>
                                                            Grand Total
                                                        </span>

                                                        <strong className="myorder-total">

                                                            {
                                                                formatCurrency(
                                                                    order.totalAmount
                                                                )
                                                            }

                                                        </strong>

                                                    </div>

                                                </div>


                                            </div>


                                            {/* =====================================
                                                Buttons
                                            ====================================== */}

                                            <div className="myorder-actions">


                                                <button
                                                    className="myorder-primary"

                                                    onClick={() =>
                                                        openOrder(
                                                            order
                                                        )
                                                    }
                                                >

                                                    View Details

                                                </button>


                                                {
                                                    !isRejected && (

                                                        <button
                                                            className="myorder-secondary"

                                                            onClick={() =>
                                                                trackOrder(
                                                                    order.orderID
                                                                )
                                                            }
                                                        >

                                                            <Truck
                                                                size={17}
                                                            />

                                                            Track

                                                        </button>

                                                    )
                                                }


                                                {
                                                    !isRejected && (

                                                        <button
                                                            className="myorder-secondary"

                                                            onClick={() =>
                                                                downloadInvoice(
                                                                    order
                                                                )
                                                            }
                                                        >

                                                            <Download
                                                                size={17}
                                                            />

                                                            Invoice

                                                        </button>

                                                    )
                                                }


                                            </div>


                                        </motion.div>

                                    );

                                }
                            )

                        )
                    }

                </section>


                {/* ==========================================================
                    Luxury CTA
                ========================================================== */}

                <motion.section
                    className="myorders-cta"

                    initial={{
                        opacity: 0,
                        y: 40
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    transition={{
                        duration: .6
                    }}
                >

                    <div className="myorders-cta-content">

                        <span className="myorders-cta-badge">

                            <Sparkles size={15} />

                            HIRANYA LUXURY EXPERIENCE

                        </span>


                        <h2>
                            Continue Your Luxury Journey
                        </h2>


                        <p>
                            Discover handcrafted jewellery collections,
                            timeless elegance and premium craftsmanship
                            created exclusively for you.
                        </p>


                        <div className="myorders-cta-buttons">


                            <button

                                className="myorders-shop-btn"

                                onClick={() =>
                                    navigate(
                                        "/jewellery"
                                    )
                                }
                            >

                                <ShoppingBag
                                    size={18}
                                />

                                Shop Jewellery

                            </button>


                            <button

                                className="myorders-collection-btn"

                                onClick={() =>
                                    navigate(
                                        "/collections"
                                    )
                                }
                            >

                                <Gem
                                    size={18}
                                />

                                View Collections

                            </button>


                        </div>

                    </div>

                </motion.section>


                {/* ==========================================================
                    Premium Services
                ========================================================== */}

                <section className="myorders-services">


                    <div className="myorders-service-card">

                        <PackageCheck />

                        <h3>
                            Secure Delivery
                        </h3>

                        <p>
                            Every order is insured and securely packed
                            before dispatch.
                        </p>

                    </div>


                    <div className="myorders-service-card">

                        <BadgeCheck />

                        <h3>
                            Certified Jewellery
                        </h3>

                        <p>
                            BIS Hallmarked jewellery with authenticity
                            certificate included.
                        </p>

                    </div>


                    <div className="myorders-service-card">

                        <Truck />

                        <h3>
                            Live Tracking
                        </h3>

                        <p>
                            Track every stage of your order from
                            confirmation to delivery.
                        </p>

                    </div>


                </section>


            </main>


            <Footer />

        </>

    );

};


export default MyOrders;