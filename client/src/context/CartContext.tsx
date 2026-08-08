import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";
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
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (
        productId: string,
        quantity: number = 1
    ) => {
        await cartService.addToCart(
            productId,
            quantity
        );
        await refreshCart();
    };

    const updateQuantity = async (
        productId: string,
        quantity: number
    ) => {
        await cartService.updateQuantity(
            productId,
            quantity
        );
        await refreshCart();
    };

    const removeFromCart = async (
        productId: string
    ) => {
        await cartService.removeFromCart(
            productId
        );
        await refreshCart();
    };

    const clearCart = () => {
        setCartItems([]);
        setCartValue(0);
    };

    useEffect(() => {
        refreshCart();
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