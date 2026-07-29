export interface CartItem {

    productId: string;

    name: string;

    category: string;

    image: string;

    weight: number;

    price: number;

    quantity: number;

    value: number;

}

export interface Coupon {

    code: string;

    description: string;

    minimumCart: number;

    discountAmount?: number;

    discountPercentage?: number;

}

export interface CartResponse {

    cartItems: CartItem[];

    cartValue: number;

}

export interface CartContextType {

    /* ---------------- Cart ---------------- */

    cartItems: CartItem[];

    cartCount: number;

    cartValue: number;

    loading: boolean;

    /* ---------------- Coupon ---------------- */

    couponCode: string;

    setCouponCode: React.Dispatch<React.SetStateAction<string>>;

    selectedCoupon: Coupon | null;

    setSelectedCoupon: React.Dispatch<
        React.SetStateAction<Coupon | null>
    >;

    /* ---------------- Gift ---------------- */

    giftWrap: boolean;

    setGiftWrap: React.Dispatch<
        React.SetStateAction<boolean>
    >;

    /* ---------------- Totals ---------------- */



    /* ---------------- Actions ---------------- */

    refreshCart: () => Promise<void>;

    addToCart: (

        productId: string,

        quantity?: number

    ) => Promise<void>;

    updateQuantity: (

        productId: string,

        quantity: number

    ) => Promise<void>;

    removeFromCart: (

        productId: string

    ) => Promise<void>;

    clearCart: () => void;

}