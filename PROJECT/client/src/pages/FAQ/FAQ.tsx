import "./FAQ.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import hero from "../../assets/faq/hero.jpg";
import { useState } from "react";
import careBanner from "../../assets/faq/care-banner.jpg";
import cta from "../../assets/faq/cta.jpg";

const FAQ = () => {
    const faqData = [
        {
            question: "How do I place an order?",
            answer: "Simply browse our collections, select your favourite jewellery piece and complete your purchase through our secure checkout process."
        },

        {
            question: "Is every jewellery piece certified?",
            answer: "Yes. Every HIRANYA diamond jewellery piece is accompanied by an authenticity and certification document."
        },

        {
            question: "Can I customize my jewellery?",
            answer: "Absolutely. We offer bespoke jewellery services where our designers create exclusive pieces tailored to your preferences."
        },

        {
            question: "How long does shipping take?",
            answer: "Domestic orders are usually delivered within 3–7 business days through fully insured premium shipping."
        },

        {
            question: "Do you provide gift packaging?",
            answer: "Yes. Every purchase comes beautifully packed in our signature luxury gift box at no additional cost."
        },

        {
            question: "How do I care for my jewellery?",
            answer: "Store jewellery in a soft pouch, avoid harsh chemicals and clean it gently using a soft microfiber cloth."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (

        <>

            <TopBar />

            <Navbar />

           {/* ==========================
            HERO
========================== */}

<section
    className="faq-hero"
    style={{
        backgroundImage: `linear-gradient(rgba(18,18,18,.45), rgba(18,18,18,.60)), url(${hero})`
    }}
>

    <div className="container">

        <div className="faq-hero-content">

            <span className="faq-subtitle">

                SUPPORT & FAQs

            </span>

            <h1>

                Everything You Need
                <br />
                To Know About
                <br />
                HIRANYA

            </h1>

            <p>

                Find answers to the most frequently asked questions about
                our jewellery collections, orders, shipping, boutique
                appointments and luxury services.

            </p>

            <a
                href="#faq"
                className="hero-btn"
            >

                Explore FAQs

            </a>

        </div>

    </div>

</section>


{/* ==========================
      HELP CATEGORIES
========================== */}

<section className="faq-categories">

    <div className="container">

        <div className="section-heading">

            <span>

                HELP CATEGORIES

            </span>

            <h2>

                Find Answers
                By Category

            </h2>

            <p>

                Browse the most common topics related to shopping,
                jewellery care, orders and luxury services.

            </p>

        </div>

        <div className="categories-grid">

            <div className="category-card">

                <div className="category-icon">

                    💍

                </div>

                <h3>

                    Orders &
                    Appointments

                </h3>

                <p>

                    Place jewellery orders, schedule boutique visits
                    and personalised consultations.

                </p>

            </div>

            <div className="category-card">

                <div className="category-icon">

                    🚚

                </div>

                <h3>

                    Shipping &
                    Delivery

                </h3>

                <p>

                    Learn about delivery timelines, tracking and
                    secure insured shipping.

                </p>

            </div>

            <div className="category-card">

                <div className="category-icon">

                    💎

                </div>

                <h3>

                    Jewellery
                    Care

                </h3>

                <p>

                    Keep your precious jewellery shining beautifully
                    for generations.

                </p>

            </div>

            <div className="category-card">

                <div className="category-icon">

                    ↩

                </div>

                <h3>

                    Returns &
                    Support

                </h3>

                <p>

                    Returns, exchanges, warranty information and
                    dedicated customer support.

                </p>

            </div>

        </div>

    </div>

</section>

           {/* ==========================
        FAQ SECTION
========================== */}

<section
    className="faq-section"
    id="faq"
>

    <div className="container">

        <div className="section-heading">

            <span>

                FREQUENTLY ASKED QUESTIONS

            </span>

            <h2>

                Everything You
                Need To Know

            </h2>

        </div>

        <div className="faq-wrapper">

            {faqData.map((faq: { question: string; answer: string }, index: number) => (

                <div
                    key={index}
                    className={`faq-item ${openIndex === index ? "active" : ""}`}
                >

                    <button
                        className="faq-question"
                        onClick={() =>
                            setOpenIndex(
                                openIndex === index ? null : index
                            )
                        }
                    >

                        <span>

                            {faq.question}

                        </span>

                        <span className="faq-icon">

                            {openIndex === index ? "−" : "+"}

                        </span>

                    </button>

                    <div
                        className={`faq-answer ${openIndex === index ? "show" : ""}`}
                    >

                        <p>

                            {faq.answer}

                        </p>

                    </div>

                </div>

            ))}

        </div>

    </div>

</section>

            {/* ==========================
      JEWELLERY CARE BANNER
========================== */}

<section className="care-banner">

    <div className="container">

        <div className="care-wrapper">

            <div className="care-image">

                <img
                    src={careBanner}
                    alt="Jewellery Care"
                />

            </div>

            <div className="care-content">

                <span>

                    JEWELLERY CARE

                </span>

                <h2>

                    Preserve The Beauty
                    Of Every Precious Piece

                </h2>

                <p>

                    Every HIRANYA creation is designed to last for generations.
                    With proper care and professional maintenance, your jewellery
                    will continue to shine with timeless elegance.

                </p>

                <ul>

                    <li>✔ Store jewellery separately in soft pouches.</li>

                    <li>✔ Avoid perfumes and harsh chemicals.</li>

                    <li>✔ Clean gently using a microfiber cloth.</li>

                    <li>✔ Schedule professional polishing annually.</li>

                </ul>

                <button>

                    View Care Guide

                </button>

            </div>

        </div>

    </div>

</section>

         {/* ==========================
        STILL NEED HELP
========================== */}

<section className="faq-help">

    <div className="container">

        <div className="section-heading">

            <span>

                PERSONAL ASSISTANCE

            </span>

            <h2>

                Still Need Help?

            </h2>

            <p>

                Our jewellery consultants are always available to assist
                you with purchases, appointments and after-sales support.

            </p>

        </div>

        <div className="help-grid">

            <div className="help-card">

                <div className="help-icon">

                    📞

                </div>

                <h3>

                    Call Our Experts

                </h3>

                <p>

                    Speak directly with our jewellery consultants for
                    immediate assistance.

                </p>

                <a href="tel:+911234567890">

                    +91 12345 67890

                </a>

            </div>

            <div className="help-card">

                <div className="help-icon">

                    ✉

                </div>

                <h3>

                    Email Support

                </h3>

                <p>

                    Send your queries anytime and our support team will
                    respond promptly.

                </p>

                <a href="mailto:support@hiranya.com">

                    support@hiranya.com

                </a>

            </div>

            <div className="help-card">

                <div className="help-icon">

                    📍

                </div>

                <h3>

                    Visit A Boutique

                </h3>

                <p>

                    Experience our collections and personalised service
                    at a nearby HIRANYA boutique.

                </p>

                <a href="/store-locator">

                    Find A Store →

                </a>

            </div>

        </div>

    </div>

</section>

            {/* ==========================
            CTA
========================== */}

<section
    className="faq-cta"
    style={{
        backgroundImage: `linear-gradient(rgba(15,15,15,.55), rgba(15,15,15,.60)), url(${cta})`
    }}
>

    <div className="container">

        <div className="faq-cta-content">

            <span>

                HIRANYA EXPERIENCE

            </span>

            <h2>

                Your Perfect Jewellery
                Journey Begins Here

            </h2>

            <p>

                Whether you're searching for a timeless gift,
                planning a special occasion, or looking for
                expert guidance, our jewellery consultants
                are here to make every moment memorable.

            </p>

            <div className="cta-buttons">

                <a
                    href="/contact"
                    className="cta-primary"
                >

                    Contact Us

                </a>

                <a
                    href="/collections"
                    className="cta-secondary"
                >

                    Explore Collection

                </a>

            </div>

        </div>

    </div>

</section>

            <Footer />

        </>

    );

};

export default FAQ;