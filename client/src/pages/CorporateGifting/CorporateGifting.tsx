import "./CorporateGifting.css";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import {
    Gem,
    Gift,
    Handshake,
    ArrowRight,
    Check,
    Package,
    Truck,
    Building2,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

import hero from "../../assets/corporate/hero.jpg";
import executive from "../../assets/corporate/executive.jpg";
import employee from "../../assets/corporate/employee.jpg";
import customization from "../../assets/corporate/customization.jpg";
import benefits from "../../assets/corporate/benefits.jpg";
import cta from "../../assets/corporate/cta.jpg";

interface FormData {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    quantity: string;
    budget: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    companyName?: string;
    email?: string;
    phone?: string;
    quantity?: string;
    budget?: string;
    message?: string;
}

const CorporateGifting = () => {

    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        quantity: "",
        budget: "",
        message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Prevent leading spaces
        if (processedValue.startsWith(" ")) {
            processedValue = processedValue.trimStart();
        }

        // Prevent double spaces while typing (except message if appropriate, but requested globally)
        processedValue = processedValue.replace(/  +/g, " ");

        // Field specific typing constraints/sanitization
        if (name === "fullName") {
            // Only allow alphabets and spaces
            processedValue = processedValue.replace(/[^A-Za-z\s]/g, "");
        } else if (name === "phone") {
            // Only numbers allowed, max 10 digits
            processedValue = processedValue.replace(/\D/g, "").slice(0, 10);
        } else if (name === "quantity") {
            // Integer only, no decimals, no negatives
            processedValue = processedValue.replace(/\D/g, "");
        } else if (name === "budget") {
            // Numeric only, no negatives
            processedValue = processedValue.replace(/[^0-9.]/g, "");
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // FULL NAME
        const trimmedFullName = formData.fullName.trim();
        if (!trimmedFullName) {
            newErrors.fullName = "Full Name is required.";
        } else if (trimmedFullName.length < 3 || trimmedFullName.length > 50) {
            newErrors.fullName = "Full Name must be between 3 and 50 characters.";
        } else if (!/^[A-Za-z\s]+$/.test(trimmedFullName)) {
            newErrors.fullName = "Only alphabets and spaces are allowed.";
        }

        // COMPANY NAME
        const trimmedCompanyName = formData.companyName.trim();
        if (!trimmedCompanyName) {
            newErrors.companyName = "Company Name is required.";
        } else if (trimmedCompanyName.length < 2 || trimmedCompanyName.length > 80) {
            newErrors.companyName = "Company Name must be between 2 and 80 characters.";
        } else if (!/^[A-Za-z0-9\s&\-\.]+$/.test(trimmedCompanyName)) {
            newErrors.companyName = "Invalid characters in Company Name.";
        }

        // EMAIL
        const trimmedEmail = formData.email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail) {
            newErrors.email = "Email Address is required.";
        } else if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 100) {
            newErrors.email = "Please enter a valid email address (max 100 chars).";
        }

        // PHONE
        if (!formData.phone) {
            newErrors.phone = "Phone Number is required.";
        } else if (!/^[6-7-8-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Must be exactly 10 digits and start with 6, 7, 8, or 9.";
        }

        // ESTIMATED QUANTITY
        if (formData.quantity === "") {
            newErrors.quantity = "Estimated Quantity is required.";
        } else {
            const qtyNum = Number(formData.quantity);
            if (!Number.isInteger(qtyNum) || qtyNum < 1 || qtyNum > 100000) {
                newErrors.quantity = "Quantity must be an integer between 1 and 100,000.";
            }
        }

        // BUDGET
        if (formData.budget === "") {
            newErrors.budget = "Budget is required.";
        } else {
            const budgetNum = Number(formData.budget);
            if (isNaN(budgetNum) || budgetNum < 1000 || budgetNum > 100000000) {
                newErrors.budget = "Budget must be between ₹1,000 and ₹10,00,00,000.";
            }
        }

        // MESSAGE
        const trimmedMessage = formData.message.trim();
        if (!trimmedMessage) {
            newErrors.message = "Message is required.";
        } else if (trimmedMessage.length < 20 || trimmedMessage.length > 1000) {
            newErrors.message = "Message must be between 20 and 1000 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmitted(true);
        } else {
            toast.error("Please correct the highlighted fields.");
        }
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

                                    Enquire Now <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />

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

                                    Enquire Now <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />

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
                                <Gem size={30} strokeWidth={1.6} />
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
                                <Gift size={30} strokeWidth={1.6} />
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
                                <Handshake size={30} strokeWidth={1.6} />
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

                            <li><Package size={17} strokeWidth={1.7} /> Attractive Bulk Pricing</li>

                            <li><ShieldCheck size={17} strokeWidth={1.7} /> BIS Hallmarked Jewellery</li>

                            <li><Gift size={17} strokeWidth={1.7} /> Luxury Gift Packaging</li>

                            <li><Truck size={17} strokeWidth={1.7} /> PAN India Delivery</li>

                            <li><Building2 size={17} strokeWidth={1.7} /> Dedicated Relationship Manager</li>

                            <li><CreditCard size={17} strokeWidth={1.7} /> Secure Payment Options</li>

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

                            <div className="cg-success-icon"><Check size={28} strokeWidth={2} /></div>

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

                            onSubmit={handleSubmit}

                        >

                            <div className="cg-input-grid">

                                <div className="cg-input-wrapper">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        style={errors.fullName ? { borderColor: "red" } : undefined}
                                    />
                                    {errors.fullName && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.fullName}</span>}
                                </div>

                                <div className="cg-input-wrapper">
                                    <input
                                        type="text"
                                        name="companyName"
                                        placeholder="Company Name"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        style={errors.companyName ? { borderColor: "red" } : undefined}
                                    />
                                    {errors.companyName && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.companyName}</span>}
                                </div>

                                <div className="cg-input-wrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={errors.email ? { borderColor: "red" } : undefined}
                                    />
                                    {errors.email && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.email}</span>}
                                </div>

                                <div className="cg-input-wrapper">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={errors.phone ? { borderColor: "red" } : undefined}
                                    />
                                    {errors.phone && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
                                </div>

                                <div className="cg-input-wrapper">
                                    <input
                                        type="text"
                                        name="quantity"
                                        placeholder="Estimated Quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        style={errors.quantity ? { borderColor: "red" } : undefined}
                                    />
                                    {errors.quantity && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.quantity}</span>}
                                </div>

                                <div className="cg-input-wrapper">
                                    <input
                                        type="text"
                                        name="budget"
                                        placeholder="Budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        style={errors.budget ? { borderColor: "red" } : undefined}
                                    />
                                    {errors.budget && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.budget}</span>}
                                </div>

                            </div>

                            <div className="cg-textarea-wrapper">
                                <textarea

                                    rows={6}
                                    name="message"
                                    placeholder="Tell us about your corporate gifting requirements..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={errors.message ? { borderColor: "red" } : undefined}

                                ></textarea>
                                {errors.message && <span className="cg-error-msg" style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.message}</span>}
                            </div>

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