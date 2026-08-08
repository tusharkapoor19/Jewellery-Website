import { CartItem, Coupon } from "../types/cart";
import { DeliveryMethod } from "../components/Checkout/DeliverySection";

export interface PricingResult {

    subtotal: number;

    shipping: number;

    giftWrapCharge: number;

    discount: number;

    gst: number;

    grandTotal: number;

}

const BASE_GOLD_RATE = 9000;
const BASE_SILVER_RATE = 110;

export const getDynamicPrice = (
    price: number,
    metal: string
) => {

    const goldRate =
        Number(localStorage.getItem("goldRate")) ||
        BASE_GOLD_RATE;

    const silverRate =
        Number(localStorage.getItem("silverRate")) ||
        BASE_SILVER_RATE;

    const currentMetal =
        metal.toLowerCase();

    if (

        currentMetal === "gold" ||

        currentMetal === "white gold" ||

        currentMetal === "rose gold"

    ) {

        return Math.round(

            price *

            (goldRate / BASE_GOLD_RATE)

        );

    }

    if (

        currentMetal === "silver"

    ) {

        return Math.round(

            price *

            (silverRate / BASE_SILVER_RATE)

        );

    }

    return price;

};


export const calculatePricing = (

    cartItems: CartItem[],

    selectedCoupon: Coupon | null,

    giftWrap: boolean,

    selectedDelivery: DeliveryMethod = "standard"

): PricingResult => {

    const subtotal = cartItems.reduce(

    (sum, item) => {

        const dynamicPrice = getDynamicPrice(

            item.price,

            item.metal

        );

        return (

            sum +

            dynamicPrice *

            item.quantity

        );

    },

    0

);
    let shipping = 0;

    if (selectedDelivery === "express") {

        shipping = 299;

    }

    else {

        shipping = subtotal >= 9999

            ? 0

            : 99;

    }

    const giftWrapCharge = giftWrap

        ? 250

        : 0;

    let discount = 0;

    if (selectedCoupon) {

        if (selectedCoupon.discountPercentage) {

            discount = Math.round(

                subtotal *

                selectedCoupon.discountPercentage /

                100

            );

        }

        else {

            discount =

                selectedCoupon.discountAmount ||

                0;

        }

    }

    const gst = Math.round(

        (

            subtotal -

            discount +

            shipping +

            giftWrapCharge

        ) * 0.03

    );

    const grandTotal =

        subtotal -

        discount +

        shipping +

        giftWrapCharge +

        gst;

    return {

        subtotal,

        shipping,

        giftWrapCharge,

        discount,

        gst,

        grandTotal

    };

};