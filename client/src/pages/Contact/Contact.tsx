import "./Contact.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import hero from "../../assets/contact/hero.jpg";
import consultation from "../../assets/contact/consultation.jpg";
import cta from "../../assets/contact/cta.jpg";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
}

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Refs for auto-focusing the first invalid field
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Prevent leading spaces
        if (processedValue.startsWith(" ")) {
            processedValue = processedValue.trimStart();
        }

        // Prevent multiple consecutive spaces
        processedValue = processedValue.replace(/  +/g, " ");

        // Field specific typing sanitizations
        if (name === "fullName") {
            processedValue = processedValue.replace(/[^A-Za-z\s]/g, "");
        } else if (name === "phone") {
            processedValue = processedValue.replace(/\D/g, "").slice(0, 10);
        } else if (name === "email") {
            processedValue = processedValue.toLowerCase();
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear error when typing
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
        const trimmedFullName = formData.fullName.trim().replace(/  +/g, " ");
        if (!trimmedFullName) {
            newErrors.fullName = "Full Name is required.";
        } else if (trimmedFullName.length < 3 || trimmedFullName.length > 50) {
            newErrors.fullName = "Full Name must be between 3 and 50 characters.";
        } else if (!/^[A-Za-z\s]+$/.test(trimmedFullName)) {
            newErrors.fullName = "Only alphabets and spaces are allowed. No numbers or special characters.";
        }

        // EMAIL
        const trimmedEmail = formData.email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail) {
            newErrors.email = "Email Address is required.";
        } else if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 100) {
            newErrors.email = "Please enter a valid email address (max 100 characters).";
        }

        // PHONE
        const trimmedPhone = formData.phone.trim();
        if (!trimmedPhone) {
            newErrors.phone = "Phone Number is required.";
        } else if (!/^[6789]\d{9}$/.test(trimmedPhone)) {
            newErrors.phone = "Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.";
        }

        // SUBJECT
        const trimmedSubject = formData.subject.trim().replace(/  +/g, " ");
        if (!trimmedSubject) {
            newErrors.subject = "Subject is required.";
        } else if (trimmedSubject.length < 5 || trimmedSubject.length > 100) {
            newErrors.subject = "Subject must be between 5 and 100 characters.";
        }

        // MESSAGE
        const trimmedMessage = formData.message.trim().replace(/  +/g, " ");
        if (!trimmedMessage) {
            newErrors.message = "Message is required.";
        } else if (trimmedMessage.length < 20 || trimmedMessage.length > 1000) {
            newErrors.message = "Message must be between 20 and 1000 characters.";
        }

        setErrors(newErrors);

        // Auto-focus first invalid field
        if (Object.keys(newErrors).length > 0) {
            if (newErrors.fullName) fullNameRef.current?.focus();
            else if (newErrors.email) emailRef.current?.focus();
            else if (newErrors.phone) phoneRef.current?.focus();
            else if (newErrors.subject) subjectRef.current?.focus();
            else if (newErrors.message) messageRef.current?.focus();
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        // Sanitize all values before validation/submit
        const sanitizedData = {
            fullName: formData.fullName.trim().replace(/  +/g, " "),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            subject: formData.subject.trim().replace(/  +/g, " "),
            message: formData.message.trim().replace(/  +/g, " ")
        };

        setFormData(sanitizedData);

        if (validateForm()) {
            setIsSubmitting(true);
            const loadingToast = toast.loading("Sending your message...");

            // Simulate API request / submission
            setTimeout(() => {
                toast.dismiss(loadingToast);
                toast.success("Your message has been sent successfully!");
                setIsSubmitting(false);
                setSubmitted(true);
            }, 1000);
        } else {
            toast.error("Please correct the highlighted fields.");
        }
    };

    return (

        <>

            <TopBar />

            <Navbar />

            {/* ==========================
          HERO
========================== */}

<section
    className="contact-hero"
    style={{
        backgroundImage: `linear-gradient(rgba(20,20,20,.45), rgba(20,20,20,.55)), url(${hero})`
    }}
>

    <div className="container">

        <div className="hero-content">

            <span className="hero-subtitle">
                CONTACT HIRANYA
            </span>

            <h1>
                Let's Create
                <br />
                Something Timeless
            </h1>

            <p>
                Whether you're searching for the perfect jewellery,
                planning a bridal consultation or have a question about
                our collections, our experts are here to assist you with
                a truly personalized luxury experience.
            </p>

            <a href="#contact-form" className="hero-btn">
                Get In Touch
            </a>

        </div>

    </div>

</section>

           
{/* ==========================
      CONTACT INFO
========================== */}

<section className="contact-info">

    <div className="container">

        <div className="section-heading">

            <span>GET IN TOUCH</span>

            <h2>We're Always Here To Help</h2>

            <p>
                Whether you have questions about our collections,
                appointments or personalized services, our team is
                ready to assist you.
            </p>

        </div>

        <div className="info-grid">

            <div className="info-card">

                <div className="info-icon">

                    <i className="bi bi-geo-alt-fill"></i>

                </div>

                <h3>Visit Our Boutique</h3>

                <p>
                    Connaught Place
                    <br />
                    New Delhi - 110001
                </p>

            </div>

            <div className="info-card">

                <div className="info-icon">

                    <i className="bi bi-telephone-fill"></i>

                </div>

                <h3>Call Us</h3>

                <p>
                    +91 98765 43210
                    <br />
                    +91 98765 43211
                </p>

            </div>

            <div className="info-card">

                <div className="info-icon">

                    <i className="bi bi-envelope-fill"></i>

                </div>

                <h3>Email Us</h3>

                <p>
                    support@hiranya.com
                    <br />
                    care@hiranya.com
                </p>

            </div>

            <div className="info-card">

                <div className="info-icon">

                    <i className="bi bi-clock-fill"></i>

                </div>

                <h3>Working Hours</h3>

                <p>
                    Monday - Saturday
                    <br />
                    10:00 AM - 8:00 PM
                </p>

            </div>

        </div>

    </div>

</section>

{/* ==========================
      CONTACT FORM
========================== */}

<section
    className="contact-form-section"
    id="contact-form"
>

    <div className="container">

        <div className="contact-wrapper">

            <div className="contact-image">

                <img
                    src={consultation}
                    alt="Luxury Consultation"
                />

            </div>

            <div className="contact-form">

    <span>BOOK A CONSULTATION</span>

    <h2>
        We'd Love To
        <br />
        Hear From You
    </h2>

    <p>
        Complete the form below and our jewellery consultants
        will contact you shortly to assist with your enquiry.
    </p>

    {

    submitted ? (

        <div className="success-message">

            <i className="bi bi-check-circle-fill"></i>

            <h2>Thank You!</h2>

            <p>
                Your message has been received successfully.
                <br /><br />
                Our jewellery consultants will contact you shortly.
            </p>

            <button
                onClick={() => setSubmitted(false)}
            >
                Send Another Message
            </button>

        </div>

    ) : (

        <form onSubmit={handleSubmit}>

            <div className="input-row">

                <div className="input-group" style={{ width: "100%" }}>
                    <input
                        ref={fullNameRef}
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        style={errors.fullName ? { borderColor: "red" } : undefined}
                    />
                    {errors.fullName && <span style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.fullName}</span>}
                </div>

                <div className="input-group" style={{ width: "100%" }}>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        style={errors.email ? { borderColor: "red" } : undefined}
                    />
                    {errors.email && <span style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.email}</span>}
                </div>

            </div>

            <div className="input-row">

                <div className="input-group" style={{ width: "100%" }}>
                    <input
                        ref={phoneRef}
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        style={errors.phone ? { borderColor: "red" } : undefined}
                    />
                    {errors.phone && <span style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
                </div>

                <div className="input-group" style={{ width: "100%" }}>
                    <input
                        ref={subjectRef}
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        style={errors.subject ? { borderColor: "red" } : undefined}
                    />
                    {errors.subject && <span style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.subject}</span>}
                </div>

            </div>

            <div className="input-group" style={{ width: "100%" }}>
                <textarea
                    ref={messageRef}
                    rows={6}
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    style={errors.message ? { borderColor: "red" } : undefined}
                ></textarea>
                {errors.message && <span style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>{errors.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>

        </form>

    )

    }

</div>
        {/* close contact-wrapper/container/section for contact form */}
        </div>
      </div>

    </section>

        {/* ==========================
    WHY CONTACT HIRANYA
========================== */}

<section className="contact-services">

    <div className="container">

        <div className="section-heading">

            <span>WHY CHOOSE HIRANYA</span>

            <h2>Luxury Services Crafted For You</h2>

            <p>
                Every interaction at HIRANYA is designed to deliver elegance,
                expertise and a personalized experience for every customer.
            </p>

        </div>

        <div className="services-grid">

            <div className="service-card">

                <div className="service-icon">

                    <i className="bi bi-gem"></i>

                </div>

                <h3>Jewellery Consultation</h3>

                <p>
                    Receive expert guidance to choose timeless jewellery that
                    perfectly matches your style and occasion.
                </p>

            </div>

            <div className="service-card">

                <div className="service-icon">

                    <i className="bi bi-heart-fill"></i>

                </div>

                <h3>Bridal Assistance</h3>

                <p>
                    Explore exclusive bridal collections with personalized
                    recommendations from our specialists.
                </p>

            </div>

            <div className="service-card">

                <div className="service-icon">

                    <i className="bi bi-gift-fill"></i>

                </div>

                <h3>Gift Guidance</h3>

                <p>
                    Discover meaningful jewellery gifts curated for birthdays,
                    anniversaries and life's precious celebrations.
                </p>

            </div>

            <div className="service-card">

                <div className="service-icon">

                    <i className="bi bi-stars"></i>

                </div>

                <h3>Jewellery Care</h3>

                <p>
                    Learn how to maintain the brilliance of your treasured
                    jewellery with professional care recommendations.
                </p>

            </div>

        </div>

    </div>

</section>

{/* ==========================
           MAP
========================== */}

<section className="contact-map">

    <div className="container">

        <div className="map-wrapper">

            <div className="map-content">

                <span>VISIT OUR FLAGSHIP</span>

                <h2>
                    Experience HIRANYA
                    <br />
                    In Person
                </h2>

                <p>
                    Visit our flagship boutique and immerse yourself in a world
                    of timeless craftsmanship, exceptional hospitality and
                    luxurious jewellery collections designed for every
                    celebration.
                </p>

                <div className="map-details">

                    <div className="detail-item">

                        <i className="bi bi-geo-alt-fill"></i>

                        <div>

                            <h4>Address</h4>

                            <p>
                                Connaught Place,
                                <br />
                                New Delhi - 110001
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <i className="bi bi-clock-fill"></i>

                        <div>

                            <h4>Opening Hours</h4>

                            <p>
                                Monday - Saturday
                                <br />
                                10:00 AM - 8:00 PM
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <i className="bi bi-telephone-fill"></i>

                        <div>

                            <h4>Customer Care</h4>

                            <p>
                                +91 98765 43210
                            </p>

                        </div>

                    </div>

                </div>

            </div>
{/* ==========================
           CTA
========================== */}

<section
    className="contact-cta"
    style={{
        backgroundImage: `linear-gradient(rgba(20,20,20,.68), rgba(20,20,20,.68)), url(${cta})`
    }}
>

    <div className="container">

        <div className="cta-content">

            <span>HIRANYA EXPERIENCE</span>

            <h2>
                Your Perfect Jewellery
                <br />
                Journey Begins Here
            </h2>

            <p>
                Whether you're planning a special celebration, searching for
                timeless jewellery or seeking a personalized consultation,
                our experts are ready to assist you with elegance and care.
            </p>

            <div className="cta-buttons">

                <a
                    href="tel:+919876543210"
                    className="hero-btn"
                >
                    <i className="bi bi-telephone-fill"></i>
                    {" "}
                    Call Us
                </a>

                <a
                    href="mailto:support@hiranya.com"
                    className="outline-light-btn"
                >
                    <i className="bi bi-envelope-fill"></i>
                    {" "}
                    Email Us
                </a>

            </div>

        </div>

    </div>

</section>

            <div className="map-frame">

                <iframe
                    title="HIRANYA Boutique"
                    src="https://www.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
                    loading="lazy"
                ></iframe>

            </div>

        </div>

    </div>

</section>


            <Footer />

        </>

    );

};

export default Contact;