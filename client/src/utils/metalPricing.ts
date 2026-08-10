// ============================================================================
// LIVE METAL PRICE FORMULA
// ============================================================================
// Product price is no longer stored in the DB — it's calculated in the
// browser from the product's weight/metal and the live gold/silver/platinum
// rate that is already fetched & shown on the site (the TopBar ticker writes
// the final, already-converted INR/gram rate to localStorage — this reads
// that same value so the price shown always matches the rate shown).
//
// Formula (per gram):
//   Gold / White Gold / Rose Gold -> price = goldRate * weight + 250 * weight
//   Silver                        -> price = silverRate * weight + 150 * weight
//   Platinum                      -> price = platinumRate * weight + 250 * weight
// ============================================================================

export const GOLD_METALS = ["gold", "white gold", "rose gold"];
export const SILVER_METAL = "silver";
export const PLATINUM_METAL = "platinum";

export const GOLD_MAKING_CHARGE_PER_GRAM = 250;
export const SILVER_MAKING_CHARGE_PER_GRAM = 150;
export const PLATINUM_MAKING_CHARGE_PER_GRAM = 250;

export interface MetalRates {
    goldRate: number; // INR per gram — final rate shown on the website
    silverRate: number; // INR per gram — final rate shown on the website
    platinumRate: number; // INR per gram — final rate shown on the website
}

// Reads the live rates already fetched & shown by the TopBar ticker.
export const getLiveMetalRates = (): MetalRates => ({
    goldRate: Number(localStorage.getItem("goldRate")) || 0,
    silverRate: Number(localStorage.getItem("silverRate")) || 0,
    platinumRate: Number(localStorage.getItem("platinumRate")) || 0
});

export const computeLivePrice = (
    metal: string | undefined,
    weight: number | undefined,
    rates: MetalRates = getLiveMetalRates()
): number => {

    const normalizedMetal = (metal || "").trim().toLowerCase();
    const safeWeight = Number(weight) || 0;

    if (GOLD_METALS.includes(normalizedMetal)) {

        if (!rates.goldRate) return 0;

        return Math.round(
            rates.goldRate * safeWeight +
            GOLD_MAKING_CHARGE_PER_GRAM * safeWeight
        );

    }

    if (normalizedMetal === SILVER_METAL) {

        if (!rates.silverRate) return 0;

        return Math.round(
            rates.silverRate * safeWeight +
            SILVER_MAKING_CHARGE_PER_GRAM * safeWeight
        );

    }

    if (normalizedMetal === PLATINUM_METAL) {

        if (!rates.platinumRate) return 0;

        return Math.round(
            rates.platinumRate * safeWeight +
            PLATINUM_MAKING_CHARGE_PER_GRAM * safeWeight
        );

    }

    return 0;

};
