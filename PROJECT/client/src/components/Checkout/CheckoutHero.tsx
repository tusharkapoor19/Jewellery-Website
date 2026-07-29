import React from "react";
import {
    ShieldCheck,
    Sparkles,
    Award
} from "lucide-react";

interface CheckoutHeroProps {

    itemCount: number;

}

const CheckoutHero: React.FC<CheckoutHeroProps> = ({

    itemCount

}) => {

    return (

        <section className="hiranya-checkout-hero">

            <div className="hiranya-checkout-hero-bg" />

            <div className="hiranya-checkout-hero-content">

                <div className="hiranya-checkout-badge">

                    <Sparkles size={16} />

                    <span>

                        HIRANYA SECURE CHECKOUT

                    </span>

                </div>

                <h1>

                    Complete Your Purchase

                </h1>

                <p>

                    Every HIRANYA masterpiece is carefully inspected,

                    BIS hallmarked, securely packed and fully insured

                    until it reaches your doorstep.

                </p>

                <div className="hiranya-checkout-highlights">

                    <div className="hiranya-highlight">

                        <ShieldCheck size={18} />

                        <span>

                            256-bit SSL Secure

                        </span>

                    </div>

                    <div className="hiranya-highlight">

                        <Award size={18} />

                        <span>

                            BIS Hallmarked Jewellery

                        </span>

                    </div>

                    <div className="hiranya-highlight">

                        <Sparkles size={18} />

                        <span>

                            {itemCount} Item{itemCount !== 1 ? "s" : ""}

                            {" "}Ready For Checkout

                        </span>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default React.memo(CheckoutHero);