import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
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
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [giftWrap, setGiftWrap] = useState(false);

    const refreshCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            setCartItems([]);
            setCartValue(0);

            return;

        }

        try {

            setLoading(true);

            const data = await cartService.getCart();

            setCartItems(data.cartItems);

            setCartValue(data.cartValue);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

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

        await refreshCart();

        // ==========================
        // CREATE NOTIFICATION
        // ==========================

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const profileResponse = await axios.get(
                "http://localhost:5005/profile/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const userId = profileResponse.data.user.id;

            await axios.post(
                "http://localhost:5007/notifications",
                {
                    userId,
                    title: "Cart Updated 🛒",
                    message: "Product added to your cart successfully."
                }
            );

            console.log("Cart Notification Created");

        }

        catch (error) {

            console.error(
                "Cart Notification Error:",
                error
            );

        }

    };
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

    const clearCart = () => {

        setCartItems([]);

        setCartValue(0);

    };

    useEffect(() => {
    refreshCart();

    const interval = setInterval(() => {
        refreshCart();
    }, 5000);

    return () => clearInterval(interval);
}, []);

    return (

        <CartContext.Provider

            value={{

                cartItems,

                cartCount: cartItems.length,

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

export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }

    return context;

};