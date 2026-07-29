import "./BrandStory.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";
import brandHero from "../../assets/brandstory/brand-hero.jpg";
import beginning from "../../assets/brandstory/beginning.jpg";
import quoteBanner from "../../assets/brandstory/quote-banner.jpg";
import journey1 from "../../assets/brandstory/journey1.jpg";
import journey2 from "../../assets/brandstory/journey2.jpg";
import journey3 from "../../assets/brandstory/journey3.jpg";
import gallery1 from "../../assets/brandstory/gallery1.jpg";
import gallery2 from "../../assets/brandstory/gallery2.jpg";
import gallery3 from "../../assets/brandstory/gallery3.jpg";
import gallery4 from "../../assets/brandstory/gallery4.jpg";
import cta from "../../assets/brandstory/cta.jpg";

const BrandStory = () => {

    return (

        <>

            <TopBar />

            <Navbar />

            {/* Hero */}
             
           <section className="brand-hero">

    <div className="hero-overlay">

        <div className="container">

            <div className="brand-hero-content">

                <span className="hero-subtitle">
                    OUR BRAND STORY
                </span>

                <h1>
                    Every Piece
                    <br />
                    Tells A Story
                </h1>

                <p>
                    Crafted with passion, inspired by heritage, and designed
                    for the moments that become lifelong memories.
                </p>

                <div className="hero-buttons">

                    <a href="/collections" className="primary-btn">
                        Explore Collection
                    </a>

                    <a href="/contact" className="secondary-btn">
                        Contact Us
                    </a>

                </div>

            </div>

        </div>

    </div>

</section>

            {/* Beginning */}

           <section className="brand-beginning">

    <div className="container">

        <div className="beginning-grid">

            <div className="beginning-image">

                <img
                    src={require("../../assets/brandstory/beginning.jpg")}
                    alt="Our Beginning"
                />

            </div>

            <div className="beginning-content">

                <span>OUR BEGINNING</span>

                <h2>
                    Where Passion
                    <br />
                    Became HIRANYA
                </h2>

                <p>
                    HIRANYA began with a simple vision—to create jewellery
                    that feels personal, timeless and unforgettable.
                    Every design is inspired by tradition while embracing
                    modern elegance for today's generation.
                </p>

                <p>
                    From carefully selected gemstones to handcrafted
                    detailing, every creation reflects dedication,
                    artistry and the emotions behind life's
                    most cherished celebrations.
                </p>

                <div className="story-highlight">

                    <h3>✨ Crafted with Heart</h3>

                    <p>
                        Every masterpiece is designed to become a
                        treasured memory passed from one generation
                        to the next.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

            {/* Quote Banner */}

            <section className="quote-banner">

    <div className="quote-overlay">

        <div className="container">

            <div className="quote-content">

                <span>OUR PHILOSOPHY</span>

                <h2>
                    "Luxury isn't measured by gold,
                    <br />
                    but by the memories it carries."
                </h2>

            </div>

        </div>

    </div>

</section>

            {/* Journey */}

           <section className="brand-journey">

    <div className="container">

        <div className="section-heading">

            <span>OUR JOURNEY</span>

            <h2>From An Idea To A Timeless Legacy</h2>

            <p>
                Every milestone reflects our dedication to creating jewellery
                that celebrates life's most treasured moments.
            </p>

        </div>

        <div className="journey-grid">

            <div className="journey-card">

                <div className="journey-number">
                    01
                </div>

                <img
                    src={require("../../assets/brandstory/journey1.jpg")}
                    alt="Dream"
                />

                <h3>The Dream</h3>

                <p>
                    HIRANYA started with a belief that every jewel should carry
                    emotion, elegance and a story worth remembering.
                </p>

            </div>

            <div className="journey-card">

                <div className="journey-number">
                    02
                </div>

                <img
                    src={require("../../assets/brandstory/journey2.jpg")}
                    alt="Craftsmanship"
                />

                <h3>The Craft</h3>

                <p>
                    Skilled artisans transform precious materials into
                    masterpieces through patience, precision and passion.
                </p>

            </div>

            <div className="journey-card">

                <div className="journey-number">
                    03
                </div>

                <img
                    src={require("../../assets/brandstory/journey3.jpg")}
                    alt="Legacy"
                />

                <h3>The Legacy</h3>

                <p>
                    Today every creation becomes a part of unforgettable
                    celebrations, cherished memories and family traditions.
                </p>

            </div>

        </div>

    </div>

</section>

            {/* Legacy Gallery */}

            <section className="legacy-gallery">

    <div className="container">

        <div className="section-heading">

            <span>OUR LEGACY</span>

            <h2>Moments That Shine Forever</h2>

            <p>
                Every creation reflects timeless elegance, exceptional
                craftsmanship and the emotions behind life's most
                unforgettable celebrations.
            </p>

        </div>

        <div className="gallery-grid">

            <div className="gallery-item large">

                <img
                    src={require("../../assets/brandstory/gallery1.jpg")}
                    alt="Luxury Jewellery"
                />

            </div>

            <div className="gallery-item">

                <img
                    src={require("../../assets/brandstory/gallery2.jpg")}
                    alt="Diamond Collection"
                />

            </div>

            <div className="gallery-item">

                <img
                    src={require("../../assets/brandstory/gallery3.jpg")}
                    alt="Elegant Bride"
                />

            </div>

            <div className="gallery-item wide">

                <img
                    src={require("../../assets/brandstory/gallery4.jpg")}
                    alt="Luxury Heritage"
                />

            </div>

        </div>

    </div>

</section>

            {/* CTA */}

          <section className="brand-cta">

    <div className="cta-overlay">

        <div className="container">

            <div className="brand-cta-content">

                <span>BEGIN YOUR STORY</span>

                <h2>
                    Every Celebration
                    <br />
                    Deserves Something Timeless
                </h2>

                <p>
                    Discover handcrafted jewellery designed to celebrate love,
                    milestones and the moments you'll treasure forever.
                </p>

                <div className="cta-buttons">

                    <a href="/collections" className="primary-btn">
                        Explore Collection
                    </a>

                    <a href="/contact" className="secondary-btn">
                        Contact Us
                    </a>

                </div>

            </div>

        </div>

    </div>

</section>

            <Footer />

        </>

    );

}

export default BrandStory;