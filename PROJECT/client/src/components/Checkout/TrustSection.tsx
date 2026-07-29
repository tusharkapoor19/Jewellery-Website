import React from "react";

import {
    ShieldCheck,
    Award,
    RotateCcw,
    Truck,
    LockKeyhole,
    BadgeCheck
} from "lucide-react";

const TrustSection: React.FC = () => {

    const features = [

        {
            icon: <Award size={20} />,
            title: "BIS Hallmarked",
            subtitle: "Certified Genuine Jewellery"
        },

        {
            icon: <ShieldCheck size={20} />,
            title: "100% Secure",
            subtitle: "SSL Encrypted Checkout"
        },

        {
            icon: <Truck size={20} />,
            title: "Free Shipping",
            subtitle: "Insured Delivery Across India"
        },

        {
            icon: <RotateCcw size={20} />,
            title: "Easy Returns",
            subtitle: "Hassle-Free Return Policy"
        },

        {
            icon: <BadgeCheck size={20} />,
            title: "Lifetime Exchange",
            subtitle: "On Eligible Jewellery"
        },

        {
            icon: <LockKeyhole size={20} />,
            title: "Safe Payments",
            subtitle: "Protected Payment Gateway"
        }

    ];

    return (

        <section className="hiranya-trust-section">

            <div className="hiranya-trust-header">

                <span>

                    WHY SHOP WITH HIRANYA

                </span>

                <h2>

                    Shop With Complete Confidence

                </h2>

                <p>

                    Every HIRANYA masterpiece is authenticated,
                    securely packed, insured and delivered with
                    the highest standards of craftsmanship and care.

                </p>

            </div>

            <div className="hiranya-trust-grid">

                {

                    features.map(

                        (

                            feature,

                            index

                        ) => (

                            <div

                                key={index}

                                className="hiranya-trust-card"

                            >

                                <div className="hiranya-trust-icon">

                                    {

                                        feature.icon

                                    }

                                </div>

                                <div>

                                    <h4>

                                        {

                                            feature.title

                                        }

                                    </h4>

                                    <p>

                                        {

                                            feature.subtitle

                                        }

                                    </p>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

            <div className="hiranya-security-strip">

                <LockKeyhole size={18} />

                <span>

                    Payments are protected using
                    256-bit SSL encryption.

                </span>

            </div>

        </section>

    );

};

export default React.memo(TrustSection);