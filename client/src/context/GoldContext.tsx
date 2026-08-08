import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";

interface GoldRateContextType {
    goldRate: number;
    silverRate: number;
    loading: boolean;
}

const GoldRateContext = createContext<GoldRateContextType | undefined>(
    undefined
);

export const GoldRateProvider = ({
    children,
}: {
    children: ReactNode;
}) => {

    const [goldRate, setGoldRate] = useState(0);
    const [silverRate, setSilverRate] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchRates = async () => {

        try {

            const goldRes = await fetch(
                "https://api.gold-api.com/price/XAU"
            );

            const silverRes = await fetch(
                "https://api.gold-api.com/price/XAG"
            );

            const currencyRes = await fetch(
                "https://open.er-api.com/v6/latest/USD"
            );

            const goldData = await goldRes.json();
            const silverData = await silverRes.json();
            const currencyData = await currencyRes.json();

            const usdToInr = currencyData.rates.INR;

            const TROY_OUNCE = 31.1035;

            const goldPerGram =
                (goldData.price * usdToInr) /
                TROY_OUNCE;

            const silverPerGram =
                (silverData.price * usdToInr) /
                TROY_OUNCE;

            setGoldRate(
                Number(goldPerGram.toFixed(2))
            );

            setSilverRate(
                Number(silverPerGram.toFixed(2))
            );

        } catch (error) {

            console.error(
                "Gold Rate Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchRates();

        const interval = setInterval(
            fetchRates,
            60000
        );

        return () =>
            clearInterval(interval);

    }, []);

    return (

        <GoldRateContext.Provider

            value={{

                goldRate,

                silverRate,

                loading

            }}

        >

            {children}

        </GoldRateContext.Provider>

    );

};

export const useGoldRates = () => {

    const context = useContext(
        GoldRateContext
    );

    if (!context) {

        throw new Error(
            "useGoldRates must be used inside GoldRateProvider"
        );

    }

    return context;

};