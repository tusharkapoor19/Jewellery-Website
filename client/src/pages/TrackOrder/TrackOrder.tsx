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

    CalendarDays,

    CircleCheckBig,

    Clock3,

    Gem,

    MapPin,

    Package,

    Search,

    ShoppingBag,

    Sparkles,

    Truck

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

const TrackOrder: React.FC = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [

        order,

        setOrder

    ] = useState<Order | null>(null);

    const [

        searchID,

        setSearchID

    ] = useState(

        location.state?.orderID || ""

    );

    /* ======================================================
       Load Order
    ====================================================== */

useEffect(() => {

    if (location.state?.orderID) {

        fetchOrder(location.state.orderID);

    } else {

        setLoading(false);

    }

}, [location.state]);
    const fetchOrder = async (
    orderID: string
) => {

    try {

        setLoading(true);

        const response =
            await orderService.getOrder(orderID);

        const orderData = response.order;

        const productsWithImages =
            await Promise.all(

                orderData.products.map(
                    async (product: Product) => {

                        // Image already available
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

                    }
                )

            );

        setOrder({
            ...orderData,
            products: productsWithImages
        });

    }

    catch (error) {

        console.error(
            "Track Order Error:",
            error
        );

        toast.error(
            "Unable to find this order."
        );

        setOrder(null);

    }

    finally {

        setLoading(false);

    }

};

    /* ======================================================
       Search
    ====================================================== */

    const searchOrder = () => {

        if (

            !searchID.trim()

        ) {

            return toast.error(

                "Enter Order ID"

            );

        }

        fetchOrder(

            searchID.trim()

        );

    };

    /* ======================================================
       Helpers
    ====================================================== */

    const formatCurrency = (

        amount:number

    ) =>

        new Intl.NumberFormat(

            "en-IN",

            {

                style:"currency",

                currency:"INR",

                maximumFractionDigits:0

            }

        ).format(amount);

    const formatDate = (

        date:string

    ) =>

        new Date(date).toLocaleDateString(

            "en-IN",

            {

                day:"numeric",

                month:"long",

                year:"numeric"

            }

        );

    /* ======================================================
       Timeline
    ====================================================== */

    const timeline = useMemo(()=>

        [

            "Pending",

            "Confirmed",

            "Packed",

            "Shipped",

            "Out For Delivery",

            "Delivered"

        ]

    ,[]);

    const activeIndex =

        timeline.indexOf(

            order?.orderStatus || "Pending"

        );

    if(loading){

        return(

            <>

                <TopBar/>

                <Navbar/>

                <div className="track-loader">

                    <div className="track-spinner"/>

                    <h2>

                        Loading Order...

                    </h2>

                </div>

                <Footer/>

            </>

        );

    }

    return(

        <>

            <TopBar/>

            <Navbar/>

            <main className="track-page">
                          {/* ==========================================================
                Hero
            ========================================================== */}

            <section className="track-hero">

                <motion.div

                    className="track-glow"

                    animate={{

                        scale:[1,1.15,1],

                        opacity:[.25,.5,.25]

                    }}

                    transition={{

                        duration:6,

                        repeat:Infinity

                    }}

                />

                <motion.div

                    className="track-heading"

                    initial={{

                        opacity:0,

                        y:30

                    }}

                    animate={{

                        opacity:1,

                        y:0

                    }}

                    transition={{

                        duration:.6

                    }}

                >

                    <span className="track-badge">

                        <Sparkles size={15}/>

                        HIRANYA Tracking

                    </span>

                    <h1>

                        Track Your Order

                    </h1>

                    <p>

                        Stay updated with every step of your luxury
                        jewellery order.

                    </p>

                </motion.div>

            </section>

            {/* ==========================================================
                Search
            ========================================================== */}

            <section className="track-search-section">

                <div className="track-search-box">

                    <Search size={18}/>

                    <input

                        type="text"

                        placeholder="Enter Order ID"

                        value={searchID}

                        onChange={(e)=>

                            setSearchID(

                                e.target.value

                            )

                        }

                    />

                    <button

                        onClick={searchOrder}

                    >

                        Search

                    </button>

                </div>

            </section>

            {

                order &&

                (

                    <>

                        {/* =============================================
                            Order Header
                        ============================================== */}

                        <section className="track-order-header">

                            <div>

                                <span>

                                    Order ID

                                </span>

                                <h2>

                                    {order.orderID}

                                </h2>

                            </div>

                            <div

                                className={`track-status ${order.orderStatus

                                    .replace(/\s+/g,"")

                                    .toLowerCase()}`}

                            >

                                {

                                    order.orderStatus

                                }

                            </div>

                        </section>

                        {/* =============================================
                            Timeline
                        ============================================== */}

                        <section className="track-timeline">

                            {

                                timeline.map(

                                    (

                                        item,

                                        index

                                    )=>

                                (

                                    <div

                                        key={item}

                                        className={`track-step

                                        ${

                                            index<=activeIndex

                                            ?

                                            "active"

                                            :

                                            ""

                                        }`}

                                    >

                                        <div

                                            className="track-step-icon"

                                        >

                                            {

                                                index<=activeIndex

                                                ?

                                                <CircleCheckBig/>

                                                :

                                                <Clock3/>

                                            }

                                        </div>

                                        <span>

                                            {item}

                                        </span>

                                    </div>

                                )

                                )

                            }

                        </section>
                                                {/* =============================================
                            Order Details
                        ============================================== */}

                        <section className="track-grid">

                            {/* ==========================================
                                Left
                            =========================================== */}

                            <div className="track-left">

                                {/* Products */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <Package />

                                        <h3>

                                            Ordered Products

                                        </h3>

                                    </div>

                                    <div className="track-products">

                                        {

                                            order.products.map(product=>(

                                                <div

                                                    key={product.productID}

                                                    className="track-product"

                                                >

                                                    <div className="track-product-image">

                                                        {

                                                            product.image

                                                            ?

                                                            (

                                                                <img

                                                                    src={product.image}

                                                                    alt={product.name}

                                                                />

                                                            )

                                                            :

                                                            (

                                                                <Gem/>

                                                            )

                                                        }

                                                    </div>

                                                    <div className="track-product-info">

                                                        <h4>

                                                            {product.name}

                                                        </h4>

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

                                </div>

                                {/* Delivery Address */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <MapPin/>

                                        <h3>

                                            Delivery Address

                                        </h3>

                                    </div>

                                    <div className="track-address">

                                        <h4>

                                            {

                                                order.shippingAddress.fullName

                                            }

                                        </h4>

                                        <p>

                                            {

                                                order.shippingAddress.address

                                            }

                                        </p>

                                        <p>

                                            {

                                                order.shippingAddress.city

                                            }

                                            ,

                                            {" "}

                                            {

                                                order.shippingAddress.state

                                            }

                                        </p>

                                        <p>

                                            {

                                                order.shippingAddress.country

                                            }

                                            -

                                            {

                                                order.shippingAddress.pincode

                                            }

                                        </p>

                                        <span>

                                            {

                                                order.shippingAddress.phone

                                            }

                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ==========================================
                                Right
                            =========================================== */}

                            <div className="track-right">

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <ShoppingBag/>

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
                                    Need Help
                                =========================================== */}

                                <div className="track-card">

                                    <div className="track-card-title">

                                        <CircleCheckBig />

                                        <h3>

                                            Need Assistance?

                                        </h3>

                                    </div>

                                    <p className="track-help-text">

                                        Our HIRANYA Luxury Support Team is
                                        available to help you with order,
                                        delivery, exchange or any jewellery
                                        related queries.

                                    </p>

                                    <button

                                        className="track-support-btn"

                                        onClick={()=>

                                            navigate("/contact")

                                        }

                                    >

                                        Contact Support

                                    </button>

                                </div>

                            </div>

                        </section>

                        {/* =============================================
                            Bottom Buttons
                        ============================================== */}

                        <section className="track-actions">

                            <button

                                className="track-outline-btn"

                                onClick={()=>

                                    navigate("/my-orders")

                                }

                            >

                                <Package size={18}/>

                                My Orders

                            </button>

                            <button

                                className="track-outline-btn"

                                onClick={()=>

                                    toast.success(

                                        "Invoice download coming soon."

                                    )

                                }

                            >

                                Download Invoice

                            </button>

                            <button

                                className="track-primary-btn"

                                onClick={()=>

                                    navigate("/jewellery")

                                }

                            >

                                Continue Shopping

                                <ArrowRight size={18}/>

                            </button>

                        </section>

                    </>

                )

            }

            {

                !loading && !order &&

                (

                    <section className="track-empty">

                        <Package size={70} />

                        <h2>

                            Order Not Found

                        </h2>

                        <p>

                            We couldn't find any order with the
                            provided Order ID.

                        </p>

                        <button

                            onClick={()=>

                                navigate("/jewellery")

                            }

                        >

                            Browse Jewellery

                        </button>

                    </section>

                )

            }

            </main>

            <Footer/>

        </>

    );

};

export default TrackOrder;