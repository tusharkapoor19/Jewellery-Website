import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback
} from "react";

import axios from "axios";
import cartService from "../services/cartService";

import {
    CartContextType,
    CartItem,
    Coupon
} from "../types/cart";

const CartContext = createContext<CartContextType | null>(null);

interface Props {
    children: ReactNode;
}

export const CartProvider = ({
    children
}: Props) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartValue, setCartValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const [couponCode, setCouponCode] = useState("");
    const [selectedCoupon, setSelectedCoupon] =
        useState<Coupon | null>(null);

    const [giftWrap, setGiftWrap] =
        useState(false);


    /* =====================================================
       REFRESH CART
    ===================================================== */

    const refreshCart = useCallback(async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            setCartItems([]);
            setCartValue(0);

            return;

        }

        try {

            setLoading(true);

            const data =
                await cartService.getCart();

            /*
             * Make sure old/stale state is completely
             * replaced by latest backend cart.
             */

            setCartItems(
                Array.isArray(data?.cartItems)
                    ? data.cartItems
                    : []
            );

            setCartValue(
                Number(data?.cartValue || 0)
            );

        }

        catch (error) {

            console.error(
                "REFRESH CART ERROR:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    }, []);


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const addToCart = async (
        productId: string,
        quantity: number = 1,
        size: string = ""
    ) => {

        await cartService.addToCart(
            productId,
            quantity,
            size
        );

        /*
         * Immediately sync UI with backend.
         */

        await refreshCart();


        /* ==========================
           CREATE NOTIFICATION
        ========================== */

        try {

            const token =
                localStorage.getItem("token");

            if (!token) return;


            const profileResponse =
                await axios.get(
                    "http://localhost:5005/profile/profile",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const userId =
                profileResponse.data.user.id;


            await axios.post(
                "http://localhost:5007/notifications",
                {
                    userId,

                    title:
                        "Cart Updated 🛒",

                    message:
                        "Product added to your cart successfully."
                }
            );


            console.log(
                "Cart Notification Created"
            );

        }

        catch (error) {

            console.error(
                "Cart Notification Error:",
                error
            );

        }

    };


    /* =====================================================
       UPDATE QUANTITY
    ===================================================== */

    const updateQuantity = async (
        productId: string,
        quantity: number,
        size: string = ""
    ) => {

        await cartService.updateQuantity(
            productId,
            quantity,
            size
        );

        await refreshCart();

    };


    /* =====================================================
       REMOVE FROM CART
    ===================================================== */

    const removeFromCart = async (
        productId: string,
        size: string = ""
    ) => {

        await cartService.removeFromCart(
            productId,
            size
        );

        await refreshCart();

    };


    /* =====================================================
       CLEAR CART
    ===================================================== */

    const clearCart = () => {

        setCartItems([]);

        setCartValue(0);

    };


    /* =====================================================
       INITIAL + LIVE CART SYNC
    ===================================================== */

    useEffect(() => {

        /*
         * Load cart immediately when provider mounts.
         */

        refreshCart();


        /*
         * Keep cart synchronized with backend.
         */

        const interval =
            window.setInterval(() => {

                refreshCart();

            }, 5000);


        /*
         * Login / logout / auth changes.
         */

        const handleAuthChange = () => {

            refreshCart();

        };


        /*
         * When user returns to tab/page,
         * immediately fetch latest cart.
         */

        const handleVisibilityChange = () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                refreshCart();

            }

        };


        window.addEventListener(
            "auth-change",
            handleAuthChange
        );


        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );


        return () => {

            window.clearInterval(
                interval
            );


            window.removeEventListener(
                "auth-change",
                handleAuthChange
            );


            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );

        };

    }, [refreshCart]);


    /* =====================================================
       CONTEXT
    ===================================================== */

    return (

        <CartContext.Provider
            value={{

                cartItems,

                cartCount:
                    cartItems.length,

                cartValue,

                loading,

                couponCode,

                setCouponCode,

                selectedCoupon,

                setSelectedCoupon,

                giftWrap,

                setGiftWrap,

                refreshCart,

                addToCart,

                updateQuantity,

                removeFromCart,

                clearCart

            }}
        >

            {children}

        </CartContext.Provider>

    );

};


/* ==========================================================
   useCart
========================================================== */

export const useCart = () => {

    const context =
        useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }

    return context;

};