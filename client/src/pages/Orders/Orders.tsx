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

            setOrders(

                response.orders || []

            );

        }

        catch {

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

    /* ======================================================
       Stats
    ====================================================== */

    const totalOrders = orders.length;

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

                order.orderStatus === "Cancelled"

        ).length;

    /* ======================================================
       Filter
    ====================================================== */

    const filteredOrders = useMemo(() => {

        return orders.filter(order => {

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

        });

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

    const downloadInvoice = () => {

        toast.success(

            "Invoice download will be available soon."

        );

    };

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

                        scale: [1, 1.15, 1],

                        opacity: [.30, .55, .30]

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

                    <span>Total Orders</span>

                    <h2>

                        {totalOrders}

                    </h2>

                </div>

                <div className="myorders-stat-card">

                    <BadgeCheck />

                    <span>Delivered</span>

                    <h2>

                        {deliveredOrders}

                    </h2>

                </div>

                <div className="myorders-stat-card">

                    <Clock3 />

                    <span>Pending</span>

                    <h2>

                        {pendingOrders}

                    </h2>

                </div>

                <div className="myorders-stat-card">

                    <XCircle />

                    <span>Cancelled</span>

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

                    filteredOrders.length === 0 ?

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

                                    navigate("/jewellery")

                                }

                            >

                                Explore Jewellery

                                <ArrowRight size={18} />

                            </button>

                        </div>

                    )

                    :

                    (

                        filteredOrders.map((order) => (

                            <motion.div

                                key={order.orderID}

                                className="myorder-card"

                                initial={{

                                    opacity:0,

                                    y:30

                                }}

                                whileInView={{

                                    opacity:1,

                                    y:0

                                }}

                                viewport={{

                                    once:true

                                }}

                                transition={{

                                    duration:.45

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

                                            {order.orderID}

                                        </h2>

                                    </div>

                                    <div
                                        className={`myorder-status ${order.orderStatus
                                            .replace(/\s+/g,"")
                                            .toLowerCase()}`}

                                    >

                                        {order.orderStatus}

                                    </div>

                                </div>

                                {/* =====================================
                                    Products
                                ====================================== */}

                                <div className="myorder-products">

                                    {

                                        order.products.map(product => (

                                            <div

                                                key={product.productID}

                                                className="myorder-product"

                                            >

                                                <div className="myorder-image">

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

                                                            <Gem />

                                                        )

                                                    }

                                                </div>

                                                <div className="myorder-product-info">

                                                    <h3>

                                                        {product.name}

                                                    </h3>

                                                    <span>

                                                        Qty :

                                                        {" "}

                                                        {product.quantity}

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

                                        ))

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

                                            openOrder(order)

                                        }

                                    >

                                        View Details

                                    </button>

                                    <button

                                        className="myorder-secondary"

                                        onClick={() =>

                                            trackOrder(

                                                order.orderID

                                            )

                                        }

                                    >

                                        <Truck size={17} />

                                        Track

                                    </button>

                                    <button

                                        className="myorder-secondary"

                                        onClick={

                                            downloadInvoice

                                        }

                                    >

                                        <Download size={17} />

                                        Invoice

                                    </button>

                                </div>

                            </motion.div>

                        ))

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

                                navigate("/jewellery")

                            }

                        >

                            <ShoppingBag size={18} />

                            Shop Jewellery

                        </button>

                        <button

                            className="myorders-collection-btn"

                            onClick={() =>

                                navigate("/collections")

                            }

                        >

                            <Gem size={18} />

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