import { computeLivePrice, MetalRates } from "./metalPricing";

// Live, formula-based price: (live rate/gram * weight) + making charge/gram.
// See utils/metalPricing.ts for the exact formula and constants.
export const calculateDynamicPrice = (
    product: any,
    goldRate: number,
    silverRate: number,
    platinumRate: number = 0
) => {

    const rates: MetalRates = { goldRate, silverRate, platinumRate };

    return computeLivePrice(
        product?.metal,
        product?.weight,
        rates
    );

};
