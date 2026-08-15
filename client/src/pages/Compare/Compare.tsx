import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    GitCompare,
    X,
    ShoppingBag,
    Check,
    AlertCircle
} from "lucide-react";

import { useCompare } from "../../context/CompareContext";
import { computeLivePrice } from "../../utils/metalPricing";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Compare.css";


const Compare = () => {

    const navigate = useNavigate();

    const {
        compareProducts,
        removeFromCompare,
        clearCompare
    } = useCompare();


    /* =====================================================
       PRICE
    ===================================================== */

    const getPrice = (product: any) => {

        return computeLivePrice(
            product.metal,
            product.weight
        );

    };


    /* =====================================================
       STOCK
    ===================================================== */

    const getStockText = (
        stock: number
    ) => {

        if (stock <= 0) {

            return "Sold Out";

        }

        if (stock <= 5) {

            return `Only ${stock} left`;

        }

        return "In Stock";

    };


    /* =====================================================
       OPEN PRODUCT
    ===================================================== */

    const openProduct = (
        productID: string
    ) => {

        navigate(
            `/product/${productID}`
        );

    };


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    if (compareProducts.length === 0) {

        return (

            <>

                <TopBar />

                <Navbar />


                <main className="compare-page empty-compare">

                    <div className="empty-compare-icon">

                        <GitCompare size={42} />

                    </div>


                    <span className="compare-eyebrow">

                        HIRANYA • PRODUCT COMPARISON

                    </span>


                    <h1>

                        No Products To Compare

                    </h1>


                    <p>

                        Select two or more jewellery
                        pieces to compare their details,
                        pricing and specifications.

                    </p>


                    <button
                        type="button"
                        className="browse-jewellery-btn"
                        onClick={() =>
                            navigate("/jewellery")
                        }
                    >

                        Browse Jewellery

                    </button>

                </main>


                <Footer />

            </>

        );

    }


    /* =====================================================
       MAIN PAGE
    ===================================================== */

    return (

        <>

            {/* =================================================
                TOP BAR
            ================================================= */}

            <TopBar />


            {/* =================================================
                NAVBAR
            ================================================= */}

            <Navbar />


            {/* =================================================
                PAGE
            ================================================= */}

            <main className="compare-page">


                {/* =================================================
                    TOP NAVIGATION
                ================================================= */}

                <div className="compare-topbar">


                    <button
                        type="button"
                        className="compare-back-btn"
                        onClick={() =>
                            navigate(-1)
                        }
                    >

                        <ArrowLeft size={17} />

                        Back

                    </button>


                    <button
                        type="button"
                        className="compare-clear-all"
                        onClick={clearCompare}
                    >

                        Clear Comparison

                    </button>

                </div>


                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="compare-header">

                    <span className="compare-eyebrow">

                        HIRANYA • CURATED COMPARISON

                    </span>


                    <h1>

                        Compare Jewellery

                    </h1>


                    <p>

                        Compare craftsmanship,
                        materials, weight and live
                        pricing to find the piece
                        that's perfect for you.

                    </p>


                    <div className="compare-count">

                        <GitCompare size={15} />

                        {compareProducts.length}

                        {" "}

                        {
                            compareProducts.length === 1
                                ? "Product"
                                : "Products"
                        }

                        {" "}

                        Selected

                    </div>

                </header>


                {/* =================================================
                    COMPARISON TABLE
                ================================================= */}

                <section className="comparison-container">


                    {/* =================================================
                        SPECIFICATION COLUMN
                    ================================================= */}

                    <div className="comparison-specs">


                        <div className="spec-product-space">

                            <span>
                                PRODUCT
                            </span>

                        </div>


                        <div className="spec-row">
                            Price
                        </div>


                        <div className="spec-row">
                            Category
                        </div>


                        <div className="spec-row">
                            Collection
                        </div>


                        <div className="spec-row">
                            Metal
                        </div>


                        <div className="spec-row">
                            Weight
                        </div>


                        <div className="spec-row">
                            Stock
                        </div>


                        <div className="spec-row">
                            Certification
                        </div>


                        <div className="spec-row">
                            Description
                        </div>


                        <div className="spec-action-space">

                            Action

                        </div>


                    </div>


                    {/* =================================================
                        PRODUCTS
                    ================================================= */}

                    {compareProducts.map(
                        (product) => (

                            <article
                                className="comparison-product"
                                key={product.productID}
                            >


                                {/* PRODUCT HEADER */}

                                <div className="comparison-product-header">


                                    <div className="comparison-image-wrapper">

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="comparison-product-image"
                                            onError={(e) => {

                                                e.currentTarget.src =
                                                    "/images/products/placeholder.jpg";

                                            }}
                                        />


                                        <button
                                            type="button"
                                            className="comparison-remove"
                                            onClick={() =>
                                                removeFromCompare(
                                                    product.productID
                                                )
                                            }
                                            title="Remove from comparison"
                                        >

                                            <X size={16} />

                                        </button>

                                    </div>


                                    <h2>

                                        {product.name}

                                    </h2>


                                    <span className="comparison-product-id">

                                        {product.productID}

                                    </span>

                                </div>


                                {/* PRICE */}

                                <div className="comparison-value price-value">

                                    <span>

                                        ₹{" "}

                                        {
                                            getPrice(
                                                product
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        }

                                    </span>


                                    <small>

                                        Live calculated price

                                    </small>

                                </div>


                                {/* CATEGORY */}

                                <div className="comparison-value">

                                    {product.category}

                                </div>


                                {/* COLLECTION */}

                                <div className="comparison-value">

                                    {product.collection}

                                </div>


                                {/* METAL */}

                                <div className="comparison-value metal-value">

                                    {product.metal}

                                </div>


                                {/* WEIGHT */}

                                <div className="comparison-value weight-value">

                                    {product.weight}

                                    <span>
                                        g
                                    </span>

                                </div>


                                {/* STOCK */}

                                <div className="comparison-value">

                                    {
                                        product.stock > 0
                                            ? (

                                                <span className="stock-status available">

                                                    <Check
                                                        size={14}
                                                    />

                                                    {
                                                        getStockText(
                                                            product.stock
                                                        )
                                                    }

                                                </span>

                                            )
                                            : (

                                                <span className="stock-status unavailable">

                                                    <AlertCircle
                                                        size={14}
                                                    />

                                                    Sold Out

                                                </span>

                                            )
                                    }

                                </div>


                                {/* CERTIFICATION */}

                                <div className="comparison-value">

                                    {
                                        product.certification
                                            ? (

                                                <span className="certification-value">

                                                    <Check
                                                        size={14}
                                                    />

                                                    {
                                                        product.certification
                                                    }

                                                </span>

                                            )
                                            : (

                                                <span className="certification-value">

                                                    <Check
                                                        size={14}
                                                    />

                                                    Certified Jewellery

                                                </span>

                                            )
                                    }

                                </div>


                                {/* DESCRIPTION */}

                                <div className="comparison-value description-value">

                                    {
                                        product.description ||
                                        "Handcrafted jewellery designed with timeless elegance and premium craftsmanship."
                                    }

                                </div>


                                {/* ACTION */}

                                <div className="comparison-action">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openProduct(
                                                product.productID
                                            )
                                        }
                                    >

                                        <ShoppingBag
                                            size={17}
                                        />

                                        View Product

                                    </button>

                                </div>

                            </article>

                        )
                    )}


                    {/* =================================================
                        EMPTY SLOTS
                    ================================================= */}

                    {
                        Array.from({
                            length:
                                4 -
                                compareProducts.length
                        }).map(
                            (_, index) => (

                                <div
                                    className="comparison-empty-slot"
                                    key={`empty-${index}`}
                                >

                                    <div>

                                        <GitCompare
                                            size={24}
                                        />


                                        <span>

                                            Add Product

                                        </span>


                                        <small>

                                            Compare another piece

                                        </small>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    "/jewellery"
                                                )
                                            }
                                        >

                                            Browse

                                        </button>

                                    </div>

                                </div>

                            )
                        )
                    }

                </section>


                {/* =================================================
                    BOTTOM NOTE
                ================================================= */}

                <section className="comparison-note">

                    <GitCompare size={18} />

                    <p>

                        Prices are calculated dynamically
                        using the current metal rate and
                        product weight. Final jewellery
                        pricing may vary based on applicable
                        making charges and taxes.

                    </p>

                </section>


            </main>


            {/* =================================================
                FOOTER
            ================================================= */}

            <Footer />

        </>

    );

};


export default Compare;