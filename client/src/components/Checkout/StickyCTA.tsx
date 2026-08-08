import React from "react";

import {
    ArrowRight
} from "lucide-react";

interface StickyCTAProps {

    total: number;

    loading: boolean;

    onProceed: () => void;

}

const StickyCTA: React.FC<StickyCTAProps> = ({

    total,

    loading,

    onProceed

}) => {

    return (

        <div className="hiranya-mobile-sticky-bar">

            <div className="hiranya-mobile-price">

                <span>

                    Grand Total

                </span>

                <strong>

                    ₹{total.toLocaleString("en-IN")}

                </strong>

            </div>

            <button

                type="button"

                className="hiranya-mobile-pay-btn"

                disabled={loading}

                onClick={onProceed}

            >

                {

                    loading

                    ?

                    "Processing..."

                    :

                    <>

                        Continue To Payment

                        <ArrowRight

                            size={18}

                        />

                    </>

                }

            </button>

        </div>

    );

};

export default React.memo(StickyCTA);