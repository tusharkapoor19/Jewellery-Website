import React from "react";
import { Coupon } from "../../types/cart";
import {
    Tag,
    Truck,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
interface SummaryProduct {

    id: string;

    image: string;

    name: string;

    metal?: string;

    weight?: string;

    quantity: number;

    price: number;

}

interface SummarySectionProps {

    products: SummaryProduct[];

    subtotal: number;

    discount: number;

    shipping: number;

    giftCharges: number;

    gst: number;

    total: number;

    itemCount: number;

    selectedCoupon: Coupon | null;

    onProceed: () => void;

    loading: boolean;

}
const SummarySection: React.FC<SummarySectionProps> = ({

    products,

    subtotal,

    discount,

    shipping,

    giftCharges,

    gst,

    total,

    itemCount,

   selectedCoupon,
   
    onProceed,

    loading

}) => {

    return (

        <aside className="hiranya-summary">

            <div className="hiranya-summary-card">

                <h2>

                    Order Summary

                </h2>

                <div className="hiranya-summary-items">

                    <span>

                        {itemCount}

                        {" "}

                        Item

                        {itemCount !== 1 ? "s" : ""}

                    </span>

                </div>
                {products.map((product) => (

    <div

        key={product.id}

        className="hiranya-summary-product"

    >

        <img

            src={product.image}

            alt={product.name}

            className="hiranya-summary-image"

        />

        <div className="hiranya-summary-product-info">

            <h4>

                {product.name}

            </h4>

            <p>

                {product.metal}

            </p>

            <span>

                Qty : {product.quantity}

            </span>

        </div>

        <strong>

            ₹{product.price.toLocaleString("en-IN")}

        </strong>

    </div>

))}
                <div className="hiranya-price-breakdown">

                    <div>

                        <span>

                            Subtotal

                        </span>

                        <strong>

                            ₹{subtotal.toLocaleString("en-IN")}

                        </strong>

                    </div>

                    <div>

                        <span>

                            Discount

                        </span>

                        <strong>

                            - ₹{discount.toLocaleString("en-IN")}

                        </strong>

                    </div>

                    <div>

                        <span>

                            Shipping

                        </span>

                        <strong>

                            {

                                shipping === 0

                                ?

                                "FREE"

                                :

                                `₹${shipping.toLocaleString("en-IN")}`

                            }

                        </strong>

                    </div>

                    <div>

                        <span>

                            Gift Services

                        </span>

                        <strong>

                            ₹{giftCharges.toLocaleString("en-IN")}

                        </strong>

                    </div>

                    <div>

                        <span>

                            GST

                        </span>

                        <strong>

                            ₹{gst.toLocaleString("en-IN")}

                        </strong>

                    </div>

                </div>

                <div className="hiranya-summary-total">

                    <span>

                        Grand Total

                    </span>

                    <strong>

                        ₹{total.toLocaleString("en-IN")}

                    </strong>

                </div>

                <div className="hiranya-delivery-info">

                    <Truck size={18} />

                    <div>

                        <h4>

                            Estimated Delivery

                        </h4>

                        <p>

                            3–5 Business Days

                        </p>

                    </div>

                </div>

                <div className="hiranya-security">

                    <ShieldCheck size={18} />

                    <span>

                        100% Secure Checkout

                    </span>

                </div>

                <button

                    className="hiranya-payment-btn"

                    disabled={loading}

                    onClick={() => {
                        console.log("Summary Button Clicked");
                        onProceed();
                    }}

                >

                    {

                        loading

                        ?

                        "Processing..."

                        :

                        <>

                            Continue To Payment

                            <ArrowRight size={18} />

                        </>

                    }

                </button>

            </div>

        </aside>

    );

};

export default React.memo(SummarySection);