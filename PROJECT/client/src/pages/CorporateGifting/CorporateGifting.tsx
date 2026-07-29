import "./CorporateGifting.css";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

import hero from "../../assets/corporate/hero.jpg";
import executive from "../../assets/corporate/executive.jpg";
import employee from "../../assets/corporate/employee.jpg";
import customization from "../../assets/corporate/customization.jpg";
import benefits from "../../assets/corporate/benefits.jpg";
import cta from "../../assets/corporate/cta.jpg";

const CorporateGifting = () => {

    const [submitted, setSubmitted] = useState(false);

    // Smooth-scrolls to any section by id. Used by every CTA button
    // so "Request Quote", "View Collection" and "Contact Our Team"
    // all reliably take the user to the right place on the page.
    const scrollToId = (id: string) => {

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth"
            });

    };

    return (

        <>

            <TopBar />

            <Navbar />

            <main className="cg">

                {/* ================= HERO ================= */}

                <section className="cg-hero">

                    <img
                        src={hero}
                        alt="Corporate Gifting"
                        className="cg-hero-img"
                    />

                    <div className="cg-hero-overlay"></div>

                    <div className="cg-hero-content">

                        <span>

                            HIRANYA CORPORATE GIFTING

                        </span>

                        <h1>

                            Luxury Jewellery
                            Gifting That
                            Strengthens
                            Relationships

                        </h1>

                        <p>

                            Celebrate success, reward excellence,
                            and leave unforgettable impressions with
                            handcrafted luxury jewellery curated for
                            businesses, executives and valued clients.

                        </p>

                        <div className="cg-btns">

                            <button
                                className="cg-primary"
                                onClick={() => scrollToId("quote-form")}
                            >

                                Request Quote

                            </button>

                            <button
                                className="cg-secondary"
                                onClick={() => scrollToId("collections")}
                            >

                                View Collection

                            </button>

                        </div>

                    </div>

                </section>

                {/* ================= STATS ================= */}

                <section className="cg-stats">

                    <div className="cg-stat">

                        <h2>500+</h2>

                        <p>Corporate Clients</p>

                    </div>

                    <div className="cg-stat">

                        <h2>10K+</h2>

                        <p>Luxury Gifts Delivered</p>

                    </div>

                    <div className="cg-stat">

                        <h2>99%</h2>

                        <p>Client Satisfaction</p>

                    </div>

                    <div className="cg-stat">

                        <h2>24×7</h2>

                        <p>Dedicated Support</p>

                    </div>

                </section>

                {/* ================= COLLECTIONS ================= */}

                <section id="collections" className="cg-collections">

                    <div className="cg-heading">

                        <span>

                            PREMIUM COLLECTIONS

                        </span>

                        <h2>

                            Curated Jewellery
                            For Every Corporate Occasion

                        </h2>

                        <p>

                            Discover thoughtfully designed gifting
                            collections tailored for executives,
                            employees and prestigious clients.

                        </p>

                    </div>

                    <div className="cg-card-grid">

                        <div className="cg-card">

                            <div className="cg-card-image">

                                <img
                                    src={executive}
                                    alt="Executive Gifts"
                                />

                            </div>

                            <div className="cg-card-body">

                                <h3>

                                    Executive Gifts

                                </h3>

                                <p>

                                    Premium jewellery collections
                                    crafted for founders,
                                    directors and business leaders.

                                </p>

                                <button
                                    className="cg-card-link"
                                    onClick={() => scrollToId("quote-form")}
                                >

                                    Enquire Now →

                                </button>

                            </div>

                        </div>

                        <div className="cg-card">

                            <div className="cg-card-image">

                                <img
                                    src={employee}
                                    alt="Employee Rewards"
                                />

                            </div>

                            <div className="cg-card-body">

                                <h3>

                                    Employee Rewards

                                </h3>

                                <p>

                                    Celebrate dedication and
                                    achievements with timeless
                                    jewellery gifts.

                                </p>

                                <button
                                    className="cg-card-link"
                                    onClick={() => scrollToId("quote-form")}
                                >

                                    Enquire Now →

                                </button>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= WHY HIRANYA ================= */}

                <section className="cg-why">

                    <div className="cg-heading">

                        <span>

                            WHY HIRANYA

                        </span>

                        <h2>

                            Corporate Gifting
                            Beyond Expectations

                        </h2>

                        <p>

                            Every gift tells a story of appreciation,
                            trust and excellence. Our handcrafted
                            jewellery collections are designed to
                            strengthen professional relationships
                            while reflecting your brand's prestige.

                        </p>

                    </div>

                    <div className="cg-why-grid">

                        <div className="cg-why-card">

                            <div className="cg-icon">

                                💎

                            </div>

                            <h3>

                                Premium Craftsmanship

                            </h3>

                            <p>

                                Every jewellery piece is handcrafted
                                with exceptional precision using
                                premium materials and timeless designs.

                            </p>

                        </div>

                        <div className="cg-why-card">

                            <div className="cg-icon">

                                🎁

                            </div>

                            <h3>

                                Luxury Packaging

                            </h3>

                            <p>

                                Elegant premium gift boxes create an
                                unforgettable unboxing experience for
                                every recipient.

                            </p>

                        </div>

                        <div className="cg-why-card">

                            <div className="cg-icon">

                                🤝

                            </div>

                            <h3>

                                Dedicated Corporate Support

                            </h3>

                            <p>

                                From planning to delivery, our
                                specialists ensure a seamless gifting
                                experience for every order.

                            </p>

                        </div>

                    </div>

                </section>

                {/* ================= CUSTOMIZATION ================= */}

                <section className="cg-custom">

                    <div className="cg-custom-image">

                        <img

                            src={customization}

                            alt="Customization"

                        />

                    </div>

                    <div className="cg-custom-content">

                        <span>

                            PERSONALIZED EXPERIENCE

                        </span>

                        <h2>

                            Tailored Corporate
                            Gifting Solutions

                        </h2>

                        <p>

                            We understand that every organization is
                            unique. That's why we offer personalized
                            gifting experiences that perfectly align
                            with your company's identity and values.

                        </p>

                        <div className="cg-list">

                            <div>

                                Personalized Message Cards

                            </div>

                            <div>

                                Premium Gift Wrapping

                            </div>

                            <div>

                                Company Logo Branding

                            </div>

                            <div>

                                Exclusive Jewellery Collections

                            </div>

                            <div>

                                Bulk Order Customization

                            </div>

                            <div>

                                PAN India Delivery

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= PROCESS ================= */}

                <section className="cg-process">

                    <div className="cg-heading">

                        <span>

                            SIMPLE PROCESS

                        </span>

                        <h2>

                            From Consultation
                            To Delivery

                        </h2>

                        <p>

                            Our dedicated corporate team ensures
                            a smooth and personalized gifting
                            journey from start to finish.

                        </p>

                    </div>

                    <div className="cg-process-grid">

                        <div className="cg-step">

                            <div className="cg-step-number">

                                01

                            </div>

                            <h3>

                                Consultation

                            </h3>

                            <p>

                                Discuss your gifting requirements,
                                quantity and budget.

                            </p>

                        </div>

                        <div className="cg-step">

                            <div className="cg-step-number">

                                02

                            </div>

                            <h3>

                                Collection Selection

                            </h3>

                            <p>

                                Choose premium jewellery curated
                                specifically for your business.

                            </p>

                        </div>

                        <div className="cg-step">

                            <div className="cg-step-number">

                                03

                            </div>

                            <h3>

                                Personalization

                            </h3>

                            <p>

                                Add elegant packaging, company
                                branding and greeting cards.

                            </p>

                        </div>

                        <div className="cg-step">

                            <div className="cg-step-number">

                                04

                            </div>

                            <h3>

                                Secure Delivery

                            </h3>

                            <p>

                                Carefully packed and delivered
                                anywhere across India.

                            </p>

                        </div>

                    </div>

                </section>

                {/* ================= BENEFITS ================= */}

                <section className="cg-benefits">

                    <div className="cg-benefits-content">

                        <span>

                            WHY COMPANIES TRUST US

                        </span>

                        <h2>

                            Premium Corporate
                            Gifting Benefits

                        </h2>

                        <p>

                            Every order receives exceptional
                            attention, premium quality and
                            personalized service.

                        </p>

                        <ul>

                            <li>

                                Attractive Bulk Pricing

                            </li>

                            <li>

                                BIS Hallmarked Jewellery

                            </li>

                            <li>

                                Luxury Gift Packaging

                            </li>

                            <li>

                                PAN India Delivery

                            </li>

                            <li>

                                Dedicated Relationship Manager

                            </li>

                            <li>

                                Secure Payment Options

                            </li>

                        </ul>

                    </div>

                    <div className="cg-benefits-image">

                        <img

                            src={benefits}

                            alt="Benefits"

                        />

                    </div>

                </section>

                {/* ================= TESTIMONIALS ================= */}

                <section className="cg-testimonials">

                    <div className="cg-heading">

                        <span>CLIENT TESTIMONIALS</span>

                        <h2>

                            Trusted By Businesses
                            Across India

                        </h2>

                    </div>

                    <div className="cg-testimonial-grid">

                        <div className="cg-testimonial">

                            <p>

                                "HIRANYA delivered beautifully crafted jewellery gifts for our leadership team. The quality and presentation exceeded our expectations."

                            </p>

                            <h4>— ABC Technologies</h4>

                        </div>

                        <div className="cg-testimonial">

                            <p>

                                "The customized packaging and timely delivery made our festive gifting campaign a huge success."

                            </p>

                            <h4>— Zenith Industries</h4>

                        </div>

                        <div className="cg-testimonial">

                            <p>

                                "Professional service, luxury products and exceptional support from consultation to delivery."

                            </p>

                            <h4>— Horizon Group</h4>

                        </div>

                    </div>

                </section>

                {/* ================= INQUIRY FORM ================= */}

                <section
                    id="quote-form"
                    className="cg-form-section"
                >

                    <div className="cg-heading">

                        <span>GET IN TOUCH</span>

                        <h2>

                            Request A
                            Corporate Quote

                        </h2>

                    </div>

                    {submitted ? (

                        <div className="cg-form-success">

                            <div className="cg-success-icon">✓</div>

                            <h3>We've Received Your Message</h3>

                            <p>

                                Thank you for reaching out to HIRANYA.
                                We will contact you soon.

                            </p>

                            <button

                                className="cg-primary"

                                onClick={() => setSubmitted(false)}

                            >

                                Submit Another Enquiry

                            </button>

                        </div>

                    ) : (

                        <form

                            className="cg-form"

                            onSubmit={(e) => {

                                e.preventDefault();

                                setSubmitted(true);

                            }}

                        >

                            <div className="cg-input-grid">

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Estimated Quantity"
                                />

                                <input
                                    type="text"
                                    placeholder="Budget"
                                />

                            </div>

                            <textarea

                                rows={6}

                                placeholder="Tell us about your corporate gifting requirements..."

                            ></textarea>

                            <button type="submit">

                                Request Quote

                            </button>

                        </form>

                    )}

                </section>

                {/* ================= CTA ================= */}

                <section className="cg-cta">

                    <img

                        src={cta}

                        alt="Luxury"

                    />

                    <div className="cg-cta-overlay"></div>

                    <div className="cg-cta-content">

                        <span>

                            EXCLUSIVE CORPORATE SOLUTIONS

                        </span>

                        <h2>

                            Let's Create
                            Memorable
                            Luxury Gifts

                        </h2>

                        <p>

                            Partner with HIRANYA to deliver
                            premium gifting experiences your
                            employees, executives and clients
                            will remember forever.

                        </p>

                        <button onClick={() => scrollToId("quote-form")}>

                            Contact Our Team

                        </button>

                    </div>

                </section>

            </main>

            <Newsletter />

            <Footer />

        </>

    );

};

export default CorporateGifting;
