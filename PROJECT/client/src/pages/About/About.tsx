import "./About.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <main className="about-page">

        <section className="about-hero">

    <div className="hero-overlay">

        <div className="hero-content">

            <span className="hero-tag">
                HOUSE OF LUXURY
            </span>

            <h1>
                Crafting
                <span> Timeless </span>
                Jewellery
            </h1>

            <p>
                At HIRANYA, every masterpiece is designed to celebrate elegance,
                tradition and modern sophistication. Discover jewellery that
                reflects your story with unmatched craftsmanship.
            </p>

            <div className="hero-buttons">
                <Link to="/collections" className="primary-btn">
                    Explore Collection
                </Link>

                <Link to="/brand-story" className="secondary-btn">
                    Our Brand Story
                </Link>

            </div>

        </div>

    </div>

</section>

        <section className="who-we-are">

    <div className="container who-container">

        <div className="who-image">

            <img
                src={require("../../assets/about/who-we-are.jpg")}
                alt="Who We Are"
            />

        </div>

        <div className="who-content">

            <span className="section-tag">
                ABOUT HIRANYA
            </span>

            <h2>
                Jewellery That
                <span> Tells Stories </span>
            </h2>

            <p>
                HIRANYA is more than a jewellery brand. Every design reflects
                timeless beauty, expert craftsmanship and the emotions that make
                every celebration unforgettable.
            </p>

            <p>
                Inspired by tradition and perfected with modern artistry, our
                collections are crafted for those who value elegance, authenticity
                and exceptional quality.
            </p>

            <div className="who-features">

                <div className="feature-card">

                    <h3>500+</h3>

                    <span>Luxury Designs</span>

                </div>

                <div className="feature-card">

                    <h3>100%</h3>

                    <span>Certified Jewellery</span>

                </div>

                <div className="feature-card">

                    <h3>10+</h3>

                    <span>Years of Trust</span>

                </div>

                <div className="feature-card">

                    <h3>24/7</h3>

                    <span>Customer Support</span>

                </div>

            </div>

        </div>

    </div>

</section>
        <section className="story-banner">

    <div className="story-overlay">

        <div className="container">

            <span className="banner-tag">
                OUR PHILOSOPHY
            </span>

            <h2>
                Every Piece Holds
                <span> A Lifetime </span>
                Of Memories
            </h2>

            <p>
                From timeless heirlooms to contemporary masterpieces,
                every HIRANYA creation is crafted to celebrate love,
                milestones and unforgettable moments.
            </p>

        </div>

    </div>

</section>

       <section className="our-story">

    <div className="container">

        <div className="story-heading">

            <span className="section-tag">
                OUR JOURNEY
            </span>

            <h2>
                From Passion To
                <span> Perfection </span>
            </h2>

            <p>
                Every milestone reflects our commitment to timeless elegance,
                innovation and exceptional craftsmanship.
            </p>

        </div>

        <div className="timeline">

            <div className="timeline-item left">

                <div className="timeline-content">

                    <span className="year">
                        2015
                    </span>

                    <h3>
                        The Beginning
                    </h3>

                    <p>
                        HIRANYA was founded with a vision of creating
                        jewellery that celebrates timeless beauty and
                        meaningful moments.
                    </p>

                </div>

            </div>

            <div className="timeline-item right">

                <div className="timeline-content">

                    <span className="year">
                        2018
                    </span>

                    <h3>
                        Premium Craftsmanship
                    </h3>

                    <p>
                        We expanded our team of expert artisans,
                        combining traditional techniques with
                        modern precision.
                    </p>

                </div>

            </div>

            <div className="timeline-item left">

                <div className="timeline-content">

                    <span className="year">
                        2021
                    </span>

                    <h3>
                        Nationwide Trust
                    </h3>

                    <p>
                        Thousands of customers chose HIRANYA
                        for weddings, celebrations and
                        lifelong memories.
                    </p>

                </div>

            </div>

            <div className="timeline-item right">

                <div className="timeline-content">

                    <span className="year">
                        2025
                    </span>

                    <h3>
                        Luxury Redefined
                    </h3>

                    <p>
                        Today we continue to create elegant
                        collections that blend heritage,
                        innovation and modern luxury.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

        <section className="craftsmanship">

    <div className="container craft-container">

        <div className="craft-image">

            <img
                src={require("../../assets/about/craftsmanship.jpg")}
                alt="Craftsmanship"
            />

        </div>

        <div className="craft-content">

            <span className="section-tag">
                OUR CRAFTSMANSHIP
            </span>

            <h2>
                Crafted By
                <span> Master Artisans </span>
            </h2>

            <p>
                Every HIRANYA masterpiece is handcrafted with precision,
                passion and generations of expertise. We combine timeless
                artistry with modern innovation to create jewellery that
                lasts forever.
            </p>

            <div className="craft-grid">

                <div className="craft-card">

                    <h3>01</h3>

                    <h4>Handcrafted Excellence</h4>

                    <p>
                        Every piece is individually crafted by skilled artisans.
                    </p>

                </div>

                <div className="craft-card">

                    <h3>02</h3>

                    <h4>Certified Materials</h4>

                    <p>
                        Only premium gold and certified diamonds are selected.
                    </p>

                </div>

                <div className="craft-card">

                    <h3>03</h3>

                    <h4>Precision Finishing</h4>

                    <p>
                        Every detail is polished to perfection before delivery.
                    </p>

                </div>

                <div className="craft-card">

                    <h3>04</h3>

                    <h4>Lifetime Value</h4>

                    <p>
                        Jewellery designed to become treasured family heirlooms.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

       <section className="values">

    <div className="container">

        <div className="values-heading">

            <span className="section-tag">
                OUR VALUES
            </span>

            <h2>
                What Defines
                <span> HIRANYA </span>
            </h2>

            <p>
                Every masterpiece we create is guided by values that inspire trust,
                elegance and timeless craftsmanship.
            </p>

        </div>

        <div className="values-grid">

            <div className="value-card">

                <div className="value-number">01</div>

                <h3>Authenticity</h3>

                <p>
                    Every jewellery piece is crafted with genuine certified
                    materials and uncompromising quality.
                </p>

            </div>

            <div className="value-card">

                <div className="value-number">02</div>

                <h3>Craftsmanship</h3>

                <p>
                    Every design reflects precision, artistry and years of
                    traditional expertise.
                </p>

            </div>

            <div className="value-card">

                <div className="value-number">03</div>

                <h3>Innovation</h3>

                <p>
                    Modern elegance blended with timeless traditions to create
                    jewellery that never goes out of style.
                </p>

            </div>

            <div className="value-card">

                <div className="value-number">04</div>

                <h3>Trust</h3>

                <p>
                    Thousands of customers trust HIRANYA for life's most
                    precious celebrations.
                </p>

            </div>

        </div>

    </div>

</section>

        <section className="gallery">

    <div className="container">

        <div className="gallery-heading">

            <span className="section-tag">
                OUR COLLECTION
            </span>

            <h2>
                Timeless
                <span> Elegance </span>
            </h2>

            <p>
                Every masterpiece reflects the perfect balance of artistry,
                luxury and timeless sophistication.
            </p>

        </div>

        <div className="gallery-grid">

            <div className="gallery-item large">

                <img
                    src={require("../../assets/about/gallery1.jpg")}
                    alt="Gallery 1"
                />

            </div>

            <div className="gallery-item">

                <img
                    src={require("../../assets/about/gallery2.jpg")}
                    alt="Gallery 2"
                />

            </div>

            <div className="gallery-item">

                <img
                    src={require("../../assets/about/gallery3.jpg")}
                    alt="Gallery 3"
                />

            </div>

            <div className="gallery-item wide">

                <img
                    src={require("../../assets/about/gallery4.jpg")}
                    alt="Gallery 4"
                />

            </div>

            <div className="gallery-item">

                <img
                    src={require("../../assets/about/gallery5.jpg")}
                    alt="Gallery 5"
                />

            </div>

            <div className="gallery-item large">

                <img
                    src={require("../../assets/about/gallery6.jpg")}
                    alt="Gallery 6"
                />

            </div>

        </div>

    </div>

</section>

       <section className="statistics">

    <div className="container">

        <div className="statistics-heading">

            <span className="section-tag">
                HIRANYA IN NUMBERS
            </span>

            <h2>
                Excellence Built
                <span> Over Time </span>
            </h2>

            <p>
                Every number represents years of trust, precision,
                exceptional craftsmanship and customer satisfaction.
            </p>

        </div>

        <div className="stats-grid">

            <div className="stat-card">

                <h3>500+</h3>

                <span>Exclusive Designs</span>

            </div>

            <div className="stat-card">

                <h3>15K+</h3>

                <span>Happy Customers</span>

            </div>

            <div className="stat-card">

                <h3>100%</h3>

                <span>Certified Jewellery</span>

            </div>

            <div className="stat-card">

                <h3>10+</h3>

                <span>Years Of Excellence</span>

            </div>

        </div>

    </div>

</section>

        <section className="promise">

    <div className="container promise-container">

        <div className="promise-left">

            <span className="section-tag">
                OUR PROMISE
            </span>

            <h2>
                Luxury You Can
                <span> Trust </span>
            </h2>

            <p>
                Every HIRANYA creation is designed with precision, certified
                quality and timeless elegance. Our commitment goes beyond
                jewellery—it is about creating memories that last forever.
            </p>

        </div>

        <div className="promise-right">

            <div className="promise-card">

                <div className="promise-icon">
                    ◆
                </div>

                <div>

                    <h3>Certified Jewellery</h3>

                    <p>
                        Every product is quality checked and certified.
                    </p>

                </div>

            </div>

            <div className="promise-card">

                <div className="promise-icon">
                    ◆
                </div>

                <div>

                    <h3>Secure Payments</h3>

                    <p>
                        Multiple trusted payment methods with complete security.
                    </p>

                </div>

            </div>

            <div className="promise-card">

                <div className="promise-icon">
                    ◆
                </div>

                <div>

                    <h3>Elegant Packaging</h3>

                    <p>
                        Luxury gift boxes designed for unforgettable moments.
                    </p>

                </div>

            </div>

            <div className="promise-card">

                <div className="promise-icon">
                    ◆
                </div>

                <div>

                    <h3>Fast Delivery</h3>

                    <p>
                        Safe and insured delivery across India.
                    </p>

                </div>

            </div>

            <div className="promise-card">

                <div className="promise-icon">
                    ◆
                </div>

                <div>

                    <h3>Lifetime Support</h3>

                    <p>
                        Dedicated customer care before and after every purchase.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

        <section className="cta">

    <div className="cta-overlay">

        <div className="container">

            <div className="cta-content">

                <span className="section-tag">
                    DISCOVER HIRANYA
                </span>

                <h2>
                    Celebrate Every Moment
                    <span> With Timeless Luxury </span>
                </h2>

                <p>
                    Discover handcrafted jewellery designed to celebrate love,
                    milestones and unforgettable memories. Find the perfect piece
                    that reflects your elegance and individuality.
                </p>

                <div className="cta-buttons">

                   <Link to="/collections" className="primary-btn">
    Explore Collection
</Link>

<Link to="/contact" className="secondary-btn">
    Contact Us
</Link>

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

export default About;