import React from "react";
import {
    ShoppingBag,
    MapPinned,
    CreditCard,
    BadgeCheck
} from "lucide-react";

interface CheckoutStepperProps {

    currentStep: 1 | 2 | 3 | 4;

}

interface Step {

    id: 1 | 2 | 3 | 4;

    title: string;

    icon: React.ReactNode;

}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({

    currentStep

}) => {

    const steps: Step[] = [

        {

            id: 1,

            title: "Cart",

            icon: <ShoppingBag size={18} />

        },

        {

            id: 2,

            title: "Checkout",

            icon: <MapPinned size={18} />

        },

        {

            id: 3,

            title: "Payment",

            icon: <CreditCard size={18} />

        },

        {

            id: 4,

            title: "Success",

            icon: <BadgeCheck size={18} />

        }

    ];

    return (

        <section className="hiranya-checkout-stepper">

            {

                steps.map((step, index) => {

                    const completed =

                        step.id < currentStep;

                    const active =

                        step.id === currentStep;

                    return (

                        <React.Fragment

                            key={step.id}

                        >

                            <div

                                className={

                                    `hiranya-step ${

                                        completed

                                            ? "completed"

                                            : active

                                            ? "active"

                                            : ""

                                    }`

                                }

                            >

                                <div className="hiranya-step-circle">

                                    {

                                        completed

                                            ?

                                            "✓"

                                            :

                                            step.icon

                                    }

                                </div>

                                <span>

                                    {step.title}

                                </span>

                            </div>

                            {

                                index !==

                                steps.length - 1 && (

                                    <div

                                        className={

                                            `hiranya-step-line ${

                                                step.id < currentStep

                                                    ?

                                                    "filled"

                                                    :

                                                    ""

                                            }`

                                        }

                                    />

                                )

                            }

                        </React.Fragment>

                    );

                })

            }

        </section>

    );

};

export default React.memo(CheckoutStepper);