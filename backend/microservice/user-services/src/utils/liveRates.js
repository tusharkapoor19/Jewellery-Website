// ============================================================================
// LIVE METAL RATE + PRICE COMPUTATION
// ============================================================================
// Product price is NOT stored in the DB anymore. It is calculated on every
// request from:
//    - the product's weight & metal (stored in DB)
//    - the current live gold/silver/platinum rate (fetched from the same
//      public APIs the frontend TopBar ticker uses, with the same USD -> INR
//      conversion and the same "India premium" adjustment) so the price
//      shown to the customer always matches the rate shown on the website.
//
// Formula (per gram):
//   Gold / White Gold / Rose Gold -> price = goldRate * weight + 250 * weight
//   Silver                        -> price = silverRate * weight + 150 * weight
//   Platinum                      -> price = platinumRate * weight + 250 * weight
// ============================================================================

const TROY_OUNCE_GRAMS = 31.1035;

// Same "India approximation" markup the storefront ticker applies on top of
// the raw international rate, so the rate used here matches what the
// customer sees on the site. Platinum jewellery in India is priced the same
// way gold is, so it shares gold's premium (no separate published figure).
const INDIA_GOLD_PREMIUM_PERCENT = 3.91;
const INDIA_SILVER_PREMIUM_PERCENT = 11.4;
const INDIA_PLATINUM_PREMIUM_PERCENT = 3.91;

const GOLD_METALS = ["gold", "white gold", "rose gold"];
const SILVER_METAL = "silver";
const PLATINUM_METAL = "platinum";

const GOLD_MAKING_CHARGE_PER_GRAM = 250;
const SILVER_MAKING_CHARGE_PER_GRAM = 150;
const PLATINUM_MAKING_CHARGE_PER_GRAM = 250;

const CACHE_TTL_MS = 60 * 1000; // refresh at most once a minute

let rateCache = {
    goldRate: 0,
    silverRate: 0,
    platinumRate: 0,
    fetchedAt: 0
};

const fetchJson = async (url) => {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();

};

// Fetches (and caches) the live gold/silver/platinum rate in INR per gram.
const fetchLiveRates = async () => {

    const now = Date.now();

    const cacheIsFresh =
        rateCache.goldRate > 0 &&
        rateCache.silverRate > 0 &&
        rateCache.platinumRate > 0 &&
        now - rateCache.fetchedAt < CACHE_TTL_MS;

    if (cacheIsFresh) {
        return rateCache;
    }

    try {

        const [goldData, silverData, platinumData, currencyData] = await Promise.all([
            fetchJson("https://api.gold-api.com/price/XAU"),
            fetchJson("https://api.gold-api.com/price/XAG"),
            fetchJson("https://api.gold-api.com/price/XPT"),
            fetchJson("https://open.er-api.com/v6/latest/USD")
        ]);

        const usdToInr = currencyData.rates.INR;

        const goldPerGramReal = (goldData.price * usdToInr) / TROY_OUNCE_GRAMS;
        const silverPerGramReal = (silverData.price * usdToInr) / TROY_OUNCE_GRAMS;
        const platinumPerGramReal = (platinumData.price * usdToInr) / TROY_OUNCE_GRAMS;

        const goldRate =
            goldPerGramReal + (goldPerGramReal * INDIA_GOLD_PREMIUM_PERCENT) / 100;

        const silverRate =
            silverPerGramReal + (silverPerGramReal * INDIA_SILVER_PREMIUM_PERCENT) / 100;

        const platinumRate =
            platinumPerGramReal + (platinumPerGramReal * INDIA_PLATINUM_PREMIUM_PERCENT) / 100;

        rateCache = {
            goldRate: Number(goldRate.toFixed(2)),
            silverRate: Number(silverRate.toFixed(2)),
            platinumRate: Number(platinumRate.toFixed(2)),
            fetchedAt: now
        };

    } catch (error) {

        console.error("Live metal rate fetch failed:", error.message);
        // Keep serving the last known good rates instead of breaking pricing.

    }

    return rateCache;

};

// Pure formula — given rates already fetched, compute the final price.
const computeMetalPrice = (metal, weight, rates) => {

    const normalizedMetal = String(metal || "").trim().toLowerCase();
    const safeWeight = Number(weight) || 0;

    if (GOLD_METALS.includes(normalizedMetal)) {

        return Math.round(
            rates.goldRate * safeWeight +
            GOLD_MAKING_CHARGE_PER_GRAM * safeWeight
        );

    }

    if (normalizedMetal === SILVER_METAL) {

        return Math.round(
            rates.silverRate * safeWeight +
            SILVER_MAKING_CHARGE_PER_GRAM * safeWeight
        );

    }

    if (normalizedMetal === PLATINUM_METAL) {

        return Math.round(
            rates.platinumRate * safeWeight +
            PLATINUM_MAKING_CHARGE_PER_GRAM * safeWeight
        );

    }

    return 0;

};

// Convenience helper: fetch rates + compute price for one product.
const getLivePrice = async (metal, weight) => {

    const rates = await fetchLiveRates();

    return computeMetalPrice(metal, weight, rates);

};

module.exports = {
    fetchLiveRates,
    computeMetalPrice,
    getLivePrice
};
