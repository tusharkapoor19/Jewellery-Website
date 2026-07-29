import "./StoreLocator.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import hero from "../../assets/storelocator/hero.jpg";
import flagship from "../../assets/storelocator/flagship.jpg";
import delhi from "../../assets/storelocator/delhi.jpg";
import mumbai from "../../assets/storelocator/mumbai.jpg";
import bangalore from "../../assets/storelocator/bangalore.jpg";
import cta from "../../assets/storelocator/cta.jpg";

const StoreLocator = () => {

    return (

        <>

            <TopBar />

            <Navbar />

            {/* Hero */}
<section
    className="store-hero"
    style={{
        backgroundImage: `linear-gradient(rgba(20,20,20,0.45), rgba(20,20,20,0.55)), url(${hero})`
    }}
>

    <div className="container">

        <div className="hero-content">

            <span className="hero-subtitle">
                HIRANYA BOUTIQUES
            </span>

            <h1>
                Find Your
                <br />
                Nearest Store
            </h1>

            <p>
                Step into a world of timeless elegance. Discover our exclusive
                boutiques across India and experience exceptional craftsmanship,
                personalized service and luxurious jewellery collections.
            </p>

            <a href="#stores" className="hero-btn">
                Explore Stores
            </a>

        </div>

    </div>

</section>

            {/* Featured Store */}

<section className="featured-store">

    <div className="container">

        <div className="featured-wrapper">

            <div className="featured-image">

                <img
                    src={flagship}
                    alt="HIRANYA Flagship Boutique"
                />

            </div>

            <div className="featured-content">

                <span className="featured-tag">
                    FLAGSHIP BOUTIQUE
                </span>

                <h2>
                    New Delhi
                </h2>

                <p>
                    Discover the finest expression of luxury at our flagship
                    boutique in Connaught Place. Explore handcrafted diamond,
                    gold and bridal collections while enjoying a personalized
                    shopping experience.
                </p>

                <div className="store-features">

                    <div className="feature-item">
                        <i className="bi bi-gem"></i>
                        Certified Jewellery
                    </div>

                    <div className="feature-item">
                        <i className="bi bi-person-heart"></i>
                        Private Consultation
                    </div>

                    <div className="feature-item">
                        <i className="bi bi-stars"></i>
                        Bridal Lounge
                    </div>

                    <div className="feature-item">
                        <i className="bi bi-cup-hot"></i>
                        Premium Hospitality
                    </div>

                </div>

                <div className="store-info">

                    <p>
                        <i className="bi bi-geo-alt-fill"></i>
                        Connaught Place, New Delhi - 110001
                    </p>

                    <p>
                        <i className="bi bi-clock-fill"></i>
                        Mon - Sat | 10:00 AM - 8:00 PM
                    </p>

                    <p>
                        <i className="bi bi-telephone-fill"></i>
                        +91 98765 43210
                    </p>

                </div>

                <div className="featured-buttons">

                    <a href="#" className="hero-btn">
                        Book Appointment
                    </a>

                    <a
                        href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline-btn"
                    >
                        Get Directions
                    </a>

                </div>

            </div>

        </div>

    </div>

</section>

        {/* ==========================
        STORE CARDS
========================== */}

<section className="stores-section" id="stores">

    <div className="container">

        <div className="section-heading">

            <span>OUR BOUTIQUES</span>

            <h2>Explore Our Stores</h2>

            <p>
                Experience HIRANYA's timeless craftsmanship at our luxurious
                boutiques located across India's finest cities.
            </p>

        </div>

        <div className="stores-grid">

            {/* Delhi */}

            <div className="store-card">

                <img src={delhi} alt="Delhi Store" />

                <div className="store-content">

                    <h3>New Delhi</h3>

                    <p>
                        <i className="bi bi-geo-alt-fill"></i>
                        Connaught Place, New Delhi
                    </p>

                    <p>
                        <i className="bi bi-clock-fill"></i>
                        Mon - Sat | 10 AM - 8 PM
                    </p>

                    <p>
                        <i className="bi bi-telephone-fill"></i>
                        +91 98765 43210
                    </p>

                    <a
                        href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                        target="_blank"
                        rel="noreferrer"
                        className="store-btn"
                    >
                        View Store
                    </a>

                </div>

            </div>

            {/* Mumbai */}

            <div className="store-card">

                <img src={mumbai} alt="Mumbai Store" />

                <div className="store-content">

                    <h3>Mumbai</h3>

                    <p>
                        <i className="bi bi-geo-alt-fill"></i>
                        Bandra West, Mumbai
                    </p>

                    <p>
                        <i className="bi bi-clock-fill"></i>
                        Mon - Sat | 10 AM - 8 PM
                    </p>

                    <p>
                        <i className="bi bi-telephone-fill"></i>
                        +91 98765 43211
                    </p>

                    <a
                        href="https://maps.google.com/?q=Bandra+West+Mumbai"
                        target="_blank"
                        rel="noreferrer"
                        className="store-btn"
                    >
                        View Store
                    </a>

                </div>

            </div>

            {/* Bengaluru */}

            <div className="store-card">

                <img src={bangalore} alt="Bengaluru Store" />

                <div className="store-content">

                    <h3>Bengaluru</h3>

                    <p>
                        <i className="bi bi-geo-alt-fill"></i>
                        MG Road, Bengaluru
                    </p>

                    <p>
                        <i className="bi bi-clock-fill"></i>
                        Mon - Sat | 10 AM - 8 PM
                    </p>

                    <p>
                        <i className="bi bi-telephone-fill"></i>
                        +91 98765 43212
                    </p>

                    <a
                        href="https://maps.google.com/?q=MG+Road+Bengaluru"
                        target="_blank"
                        rel="noreferrer"
                        className="store-btn"
                    >
                        View Store
                    </a>

                </div>

            </div>

        </div>

    </div>

</section>

          
{/* ==========================
        VISIT US
========================== */}

<section className="store-map">

    <div className="container">

        <div className="map-wrapper">

            <div className="map-content">

                <span>VISIT OUR FLAGSHIP</span>

                <h2>
                    Experience Luxury
                    <br />
                    In Person
                </h2>

                <p>
                    Visit our flagship HIRANYA boutique and discover handcrafted
                    jewellery collections, personalized consultations and an
                    unforgettable luxury shopping experience.
                </p>

                <div className="map-info">

                    <div className="info-box">

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

                    <div className="info-box">

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

                    <div className="info-box">

                        <i className="bi bi-telephone-fill"></i>

                        <div>

                            <h4>Contact</h4>

                            <p>
                                +91 98765 43210
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="map-frame">

                <iframe
                    title="HIRANYA Store"
                    src="https://www.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
                    loading="lazy"
                ></iframe>

            </div>

        </div>

    </div>

</section>

            {/* ==========================
        CTA
========================== */}

<section
    className="store-cta"
    style={{
        backgroundImage: `linear-gradient(rgba(20,20,20,.65), rgba(20,20,20,.65)), url(${cta})`
    }}
>

    <div className="container">

        <div className="cta-content">

            <span>
                EXPERIENCE HIRANYA
            </span>

            <h2>
                Let Us Help You Find
                <br />
                The Perfect Jewellery
            </h2>

            <p>
                Whether you're searching for a timeless engagement ring,
                bridal collection or a meaningful gift, our jewellery
                specialists are ready to assist you with a personalized
                luxury shopping experience.
            </p>

            <div className="cta-buttons">

                <a
                    href="tel:+919876543210"
                    className="hero-btn"
                >
                    <i className="bi bi-telephone-fill"></i>
                    &nbsp;Book Appointment
                </a>

                <a
                    href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-light-btn"
                >
                    <i className="bi bi-geo-alt-fill"></i>
                    &nbsp;Get Directions
                </a>

            </div>

        </div>

    </div>

</section>

            <Footer />

        </>

    );

}

export default StoreLocator;