import "./Payment.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Payment = () => {

    return (

        <>

            <TopBar />

            <Navbar />

            <main className="payment-page">

                {/* Hero */}

                <section className="payment-hero">

                    <div className="container">

                        <span className="payment-badge">

                            HIRANYA SECURE CHECKOUT

                        </span>

                        <h1>

                            Complete Your Luxury Purchase

                        </h1>

                        <p>

                            Secure checkout protected with
                            premium encryption, insured delivery
                            and trusted payment gateway.

                        </p>

                    </div>

                </section>

                {/* Checkout Layout */}

                <section className="payment-section">

                    <div className="container">

                        <div className="payment-wrapper">

                            <div className="payment-left">

                                {/* Products */}

                                <div className="payment-card">

                                    <h2>

                                        Your Jewellery

                                    </h2>

                                </div>

                                {/* Address */}

                                <div className="payment-card">

                                    <h2>

                                        Delivery Address

                                    </h2>

                                </div>

                                {/* Payment */}

                                <div className="payment-card">

                                    <h2>

                                        Payment Method

                                    </h2>

                                </div>

                            </div>

                            <div className="payment-right">

                                <div className="summary-card">

                                    <h2>

                                        Order Summary

                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </>

    );

};

export default Payment;