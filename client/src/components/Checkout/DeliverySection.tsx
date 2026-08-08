import React from "react";

import {
    Truck,
    Zap
} from "lucide-react";

export type DeliveryMethod =
    "standard" |
    "express";

interface DeliverySectionProps {

    selectedDelivery: DeliveryMethod;

    setSelectedDelivery: React.Dispatch<
        React.SetStateAction<DeliveryMethod>
    >;

}

const DeliverySection: React.FC<DeliverySectionProps> = ({

    selectedDelivery,

    setSelectedDelivery

}) => {

    return (

        <section className="hiranya-checkout-section">

            <div className="hiranya-section-header">

                <div>

                    <p className="hiranya-section-tag">

                        STEP 02

                    </p>

                    <h2>

                        Delivery Method

                    </h2>

                </div>

            </div>

            <div className="hiranya-delivery-grid">

                {/* STANDARD */}

                <div

                    className={`

                        hiranya-delivery-card

                        ${

                            selectedDelivery ===

                            "standard"

                                ?

                                "active"

                                :

                                ""

                        }

                    `}

                    onClick={() =>

                        setSelectedDelivery(

                            "standard"

                        )

                    }

                >

                    <div className="hiranya-delivery-top">

                        <div className="hiranya-delivery-icon">

                            <Truck size={22} />

                        </div>

                        <div>

                            <h3>

                                Standard Delivery

                            </h3>

                            <span>

                                3–5 Business Days

                            </span>

                        </div>

                    </div>

                    <div className="hiranya-delivery-price">

                        FREE

                    </div>

                    <p>

                        Fully insured delivery with

                        secure premium packaging.

                    </p>

                </div>

                {/* EXPRESS */}

                <div

                    className={`

                        hiranya-delivery-card

                        ${

                            selectedDelivery ===

                            "express"

                                ?

                                "active"

                                :

                                ""

                        }

                    `}

                    onClick={() =>

                        setSelectedDelivery(

                            "express"

                        )

                    }

                >

                    <div className="hiranya-delivery-top">

                        <div className="hiranya-delivery-icon express">

                            <Zap size={22} />

                        </div>

                        <div>

                            <h3>

                                Express Delivery

                            </h3>

                            <span>

                                1–2 Business Days

                            </span>

                        </div>

                    </div>

                    <div className="hiranya-delivery-price">

                        ₹299

                    </div>

                    <p>

                        Priority dispatch with

                        insured express shipping.

                    </p>

                </div>

            </div>

        </section>

    );

};

export default React.memo(DeliverySection);