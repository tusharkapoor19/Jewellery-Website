import "./Contact.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import hero from "../../assets/contact/hero.jpg";
import consultation from "../../assets/contact/consultation.jpg";
import cta from "../../assets/contact/cta.jpg";
import { useState } from "react";

const Contact = () => {
const [submitted, setSubmitted] = useState(false);
 const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        setSubmitted(true);

    }
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

                <input
                    type="text"
                    placeholder="Full Name"
                    required
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    required
                />

            </div>

            <div className="input-row">

                <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                />

                <input
                    type="text"
                    placeholder="Subject"
                    required
                />

            </div>

            <textarea
                rows={6}
                placeholder="Write your message..."
                required
            ></textarea>

            <button type="submit">
                Send Message
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