import "./BehindTheCraft.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import artisan from "../../assets/behindcraft/artisan.jpg";
import design from "../../assets/behindcraft/design.jpg";
import craftsmanship from "../../assets/behindcraft/craftsmanship.jpg";
import quality from "../../assets/behindcraft/quality.jpg";
import gallery1 from "../../assets/behindcraft/gallery1.jpg";
import gallery2 from "../../assets/behindcraft/gallery2.jpg";

const BehindTheCraft = () => {

    return (

        <>

            <TopBar />

            <Navbar />

            {/* Hero */}

           <section className="craft-hero">

    <div className="hero-overlay">

        <div className="container">

            <div className="craft-hero-content">

                <span>
                    BEHIND THE CRAFT
                </span>

                <h1>
                    Where Every
                    <br />
                    Detail Matters
                </h1>

                <p>
                    Discover the artistry, precision and passion behind every
                    HIRANYA creation—from the first sketch to the final sparkle.
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

            {/* Our Process */}

           <section className="craft-process">

    <div className="container">

        <div className="process-grid">

            <div className="process-image">

                <img src={artisan} alt="Jewellery Artisan" />
            

            </div>

            <div className="process-content">

                <span>OUR PROCESS</span>

                <h2>
                    Every Masterpiece
                    Begins With
                    Human Hands
                </h2>

                <p>
                    At HIRANYA, every piece starts with an idea and is
                    transformed through the dedication of experienced
                    artisans. From the first sketch to the final polish,
                    every detail is carefully perfected.
                </p>

                <p>
                    We combine traditional craftsmanship with modern
                    precision, ensuring every creation reflects elegance,
                    quality and timeless beauty.
                </p>

                <div className="craft-highlight">

                    <h3>
                        Handcrafted Excellence
                    </h3>

                    <p>
                        Every jewel is individually inspected, refined and
                        finished to meet our uncompromising standards of luxury.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

            {/* Craft Journey */}

            <section className="craft-journey">

    <div className="container">

        <div className="section-heading">

            <span>THE JOURNEY</span>

            <h2>
                From Sketch To Sparkle
            </h2>

            <p>
                Every HIRANYA creation passes through a thoughtful process,
                combining creativity, craftsmanship and uncompromising quality.
            </p>

        </div>

        <div className="craft-cards">

            <div className="craft-card">

                <img src={design} alt="Design" />

                <h3>Design & Sketch</h3>

                <p>
                    Every masterpiece begins as a hand-drawn concept,
                    inspired by timeless elegance and contemporary luxury.
                </p>

            </div>

            <div className="craft-card">

<img src={craftsmanship} alt="Craftsmanship" />

                <h3>Handcrafted</h3>

                <p>
                    Skilled artisans carefully shape every detail using
                    traditional techniques refined over generations.
                </p>

            </div>

            <div className="craft-card">
<img src={quality} alt="Quality" />

                <h3>Quality Check</h3>

                <p>
                    Every creation is inspected to ensure exceptional
                    brilliance, comfort and lasting perfection.
                </p>

            </div>

        </div>

    </div>

</section>
            {/* Editorial Gallery */}

            <section className="craft-gallery">

    <div className="container">

        <div className="gallery-content">

            <div className="gallery-left">

                <img src={gallery1} alt="Jewellery Craft" />

            </div>

            <div className="gallery-right">

                <div className="gallery-text">

                    <span>THE ART OF DETAIL</span>

                    <h2>
                        Crafted By
                        Passion,
                        Perfected
                        By Precision
                    </h2>

                    <p>
                        Every curve, every setting and every polish is
                        completed with patience and expertise, ensuring
                        every HIRANYA jewel reflects timeless luxury.
                    </p>

                </div>

               <img src={gallery2} alt="Luxury Jewellery" />

            </div>

        </div>

    </div>

</section>

            {/* CTA */}

           <section className="craft-cta">

    <div className="craft-cta-overlay">

        <div className="container">

            <div className="craft-cta-content">

                <span>EXPERIENCE THE DIFFERENCE</span>

                <h2>
                    Crafted With Passion.
                    <br />
                    Worn With Pride.
                </h2>

                <p>
                    Every HIRANYA creation is a reflection of exceptional
                    craftsmanship, timeless elegance and uncompromising quality.
                    Discover jewellery designed to last for generations.
                </p>

                <div className="craft-cta-buttons">

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

export default BehindTheCraft;