import { X, ArrowRight, GitCompare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCompare } from "../../context/CompareContext";

import "./CompareBar.css";


const CompareBar = () => {

    const navigate = useNavigate();

    const {
        compareProducts,
        removeFromCompare,
        clearCompare
    } = useCompare();


    /* Don't show anything when nothing is selected */

    if (compareProducts.length === 0) {
        return null;
    }


    /* Open comparison page */

    const handleCompare = () => {

        if (compareProducts.length < 2) {
            return;
        }

        navigate("/compare");

    };


    return (

        <div className="compare-bar">

            <div className="compare-bar-inner">


                {/* LEFT */}

                <div className="compare-info">

                    <div className="compare-icon">

                        <GitCompare size={20} />

                    </div>


                    <div>

                        <h3>
                            Compare Products
                        </h3>

                        <span>
                            {compareProducts.length} of 4 selected
                        </span>

                    </div>

                </div>


                {/* PRODUCTS */}

                <div className="compare-products">

                    {compareProducts.map((product) => (

                        <div
                            className="compare-product"
                            key={product.productID}
                        >

                            <div className="compare-product-image">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                            </div>


                            <div className="compare-product-info">

                                <span className="compare-product-name">

                                    {product.name}

                                </span>

                                <span className="compare-product-metal">

                                    {product.metal}

                                </span>

                            </div>


                            <button
                                type="button"
                                className="compare-remove"
                                onClick={() =>
                                    removeFromCompare(
                                        product.productID
                                    )
                                }
                                title="Remove"
                            >

                                <X size={15} />

                            </button>

                        </div>

                    ))}

                </div>


                {/* RIGHT ACTIONS */}

                <div className="compare-actions">


                    <button
                        type="button"
                        className="compare-clear-btn"
                        onClick={clearCompare}
                    >

                        <Trash2 size={16} />

                        Clear All

                    </button>


                    <button
                        type="button"
                        className="compare-now-btn"
                        disabled={
                            compareProducts.length < 2
                        }
                        onClick={handleCompare}
                    >

                        <span>

                            Compare Now

                        </span>

                        <ArrowRight size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

};


export default CompareBar;