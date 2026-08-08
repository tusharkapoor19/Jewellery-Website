const BASE_GOLD_RATE = 9000;
const BASE_SILVER_RATE = 110;

export const calculateDynamicPrice = (
    product: any,
    goldRate: number,
    silverRate: number
) => {

    if (!goldRate || !silverRate) {
        return product.price;
    }

    // GOLD
    if (
        product.metal?.toLowerCase() === "gold" ||
        product.metal?.toLowerCase() === "white gold" ||
        product.metal?.toLowerCase() === "rose gold"
    ) {

        return Math.round(
            product.price *
            (goldRate / BASE_GOLD_RATE)
        );

    }

    // SILVER
    if (
        product.metal?.toLowerCase() === "silver"
    ) {

        return Math.round(
            product.price *
            (silverRate / BASE_SILVER_RATE)
        );

    }

    // Platinum / Others
    return product.price;

};