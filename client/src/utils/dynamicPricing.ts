import { computeLivePrice } from "./metalPricing";

// Live, formula-based price: (live rate/gram * weight) + making charge/gram.
// See utils/metalPricing.ts for the exact formula and constants.
export const calculateDynamicPrice = (
    product: any,
    goldRate: number,
    silverRate: number
) => {

    return computeLivePrice(
        product?.metal,
        product?.weight,
        { goldRate, silverRate }
    );

};
