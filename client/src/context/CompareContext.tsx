import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";

import { Product } from "../types/product";

interface CompareContextType {
    compareProducts: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productID: string) => void;
    clearCompare: () => void;
    isInCompare: (productID: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(
    undefined
);

const STORAGE_KEY = "hiranya_compare_products";

export const CompareProvider = ({
    children
}: {
    children: ReactNode;
}) => {

    const [compareProducts, setCompareProducts] = useState<Product[]>(() => {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            return saved
                ? JSON.parse(saved)
                : [];

        } catch {

            return [];

        }

    });

    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(compareProducts)
        );

    }, [compareProducts]);

    const addToCompare = (product: Product) => {

        setCompareProducts((current) => {

            if (
                current.some(
                    item =>
                        item.productID === product.productID
                )
            ) {
                return current;
            }

            if (current.length >= 4) {
                return current;
            }

            return [
                ...current,
                product
            ];

        });

    };

    const removeFromCompare = (productID: string) => {

        setCompareProducts((current) =>
            current.filter(
                product =>
                    product.productID !== productID
            )
        );

    };

    const clearCompare = () => {

        setCompareProducts([]);

    };

    const isInCompare = (productID: string) => {

        return compareProducts.some(
            product =>
                product.productID === productID
        );

    };

    return (

        <CompareContext.Provider
            value={{
                compareProducts,
                addToCompare,
                removeFromCompare,
                clearCompare,
                isInCompare
            }}
        >

            {children}

        </CompareContext.Provider>

    );

};

export const useCompare = () => {

    const context = useContext(
        CompareContext
    );

    if (!context) {

        throw new Error(
            "useCompare must be used inside CompareProvider"
        );

    }

    return context;

};