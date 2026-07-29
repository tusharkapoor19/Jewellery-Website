import "./BlogDetails.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import blogBanner3 from "../../assets/images/blog-banner3.jpg";
import blog3 from "../../assets/images/blog3.jpg";
import blogCTA from "../../assets/images/blog-cta.jpg";

const BlogDetails3 = () => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const updateProgress = () => {

      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((scrollTop / docHeight) * 100);

    };

    window.addEventListener("scroll", updateProgress);

    return () =>
      window.removeEventListener("scroll", updateProgress);

  }, []);

  const shareArticle = () => {

    if (navigator.share) {

      navigator.share({

        title: "Jewellery Care Tips To Keep Your Collection Shining",

        text: "Professional jewellery care guide by HIRANYA.",

        url: window.location.href

      });

    } else {

      navigator.clipboard.writeText(window.location.href);

      alert("Article copied successfully!");

    }

  };

  return (

    <>

      <TopBar />

      <Navbar />

      <div
        className="reading-progress"
        style={{
          width: `${progress}%`
        }}
      />

      <section
        className="blog-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${blogBanner3})`
        }}
      >

        <div className="blog-hero-content">

          <span>

            JEWELLERY CARE GUIDE

          </span>

          <h1>

            Jewellery Care Tips
            To Keep Your
            Collection Shining

          </h1>

          <p>

            Learn professional cleaning, storage
            and maintenance techniques to preserve
            your jewellery's brilliance for years.

          </p>

        </div>

      </section>

      <section className="blog-container">

        <div className="breadcrumb">

          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/blogs">Blogs</Link>

          <span>/</span>

          <span>Jewellery Care Guide</span>

        </div>

        <div className="author-card">

          <img
            src={blog3}
            alt="Jewellery Care"
          />

          <div>

            <h3>

              HIRANYA Editorial Team

            </h3>

            <p>

              Jewellery Care Specialists

            </p>

          </div>

          <button
            onClick={shareArticle}
          >

            Share Article

          </button>

        </div>

        <div className="table-of-content">

          <h2>

            Table Of Contents

          </h2>

          <ul>

            <li>Daily Cleaning</li>

            <li>Proper Storage</li>

            <li>Avoid Chemicals</li>

            <li>Professional Maintenance</li>

            <li>Care Tips</li>

          </ul>

        </div>

        <div className="blog-intro">

          <p>

            Fine jewellery is an investment that
            deserves proper care. Regular cleaning,
            careful storage and periodic
            professional maintenance help preserve
            its sparkle, beauty and value for
            generations.

          </p>

        </div>

        <blockquote>

          "Well-maintained jewellery never loses
          its beauty—it becomes a treasured
          heirloom."

        </blockquote>
                <section className="blog-content-section">

          <h2>

            Daily Cleaning Routine

          </h2>

          <p>

            Regular cleaning helps maintain the
            brilliance of your jewellery. Dust,
            natural skin oils and cosmetic products
            gradually reduce sparkle over time. A
            gentle cleaning routine every few weeks
            keeps your favourite pieces looking as
            beautiful as the day you bought them.

          </p>

          <p>

            Use lukewarm water with a few drops of
            mild soap and gently clean the jewellery
            using a soft-bristled brush. After
            rinsing, dry each piece with a lint-free
            microfiber cloth to avoid scratches.

          </p>

          <div className="content-image">

            <img
              src={blog3}
              alt="Jewellery Cleaning"
            />

          </div>

        </section>

        <section className="blog-content-section">

          <h2>

            Proper Jewellery Storage

          </h2>

          <p>

            Correct storage is equally important as
            cleaning. Storing multiple jewellery
            pieces together may lead to scratches,
            tangling and unnecessary wear.

          </p>

          <p>

            Keep every item in separate soft-lined
            compartments or individual pouches.
            Store valuable jewellery in a cool, dry
            place away from direct sunlight and
            excessive humidity.

          </p>

          <div className="info-grid">

            <div className="info-card">

              <h3>

                Soft Pouches

              </h3>

              <p>

                Store necklaces, bracelets and rings
                separately inside velvet or fabric
                pouches to prevent scratches.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Jewellery Box

              </h3>

              <p>

                Choose a jewellery organizer with
                multiple compartments so every piece
                remains protected and easy to find.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Keep It Dry

              </h3>

              <p>

                Moisture can affect certain metals
                and gemstones, so always store
                jewellery in a dry environment.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Travel Safely

              </h3>

              <p>

                Use dedicated travel jewellery cases
                to prevent tangling, impact damage
                and accidental scratches while
                travelling.

              </p>

            </div>

          </div>

        </section>

        <section className="blog-content-section">

          <h2>

            Avoid Harsh Chemicals

          </h2>

          <p>

            Perfumes, lotions, hair sprays,
            household cleaners and swimming pool
            chlorine can gradually damage jewellery
            finishes. Always wear jewellery after
            applying cosmetics and remove it before
            cleaning, swimming or exercising.

          </p>

          <p>

            These simple precautions greatly extend
            the life and shine of gold, diamonds and
            precious gemstones.

          </p>

        </section>

        <section className="blog-content-section">

          <h2>

            Professional Maintenance

          </h2>

          <p>

            Even with proper home care, professional
            jewellery maintenance is essential.
            Expert jewellers can inspect loose
            settings, worn prongs and hidden damage
            that may not be visible during everyday
            use. Regular inspections help prevent
            costly repairs and protect valuable
            gemstones from accidental loss.

          </p>

          <p>

            Scheduling a professional cleaning once
            or twice a year restores brilliance,
            removes stubborn dirt and ensures your
            jewellery remains in excellent condition
            for many years.

          </p>

          <div className="tips-card">

            <h3>

              Expert Care Tip

            </h3>

            <p>

              Always remove jewellery before
              exercising, swimming, gardening or
              performing household chores. These
              simple habits greatly reduce scratches,
              chemical exposure and accidental
              damage.

            </p>

          </div>

        </section>

        <section className="related-blogs">

          <h2>

            Related Articles

          </h2>

          <div className="related-grid">

            <Link
              to="/blogs/1"
              className="related-card"
            >

              <h3>

                How To Choose The Perfect Diamond Ring

              </h3>

              <p>

                Learn how to select the perfect
                diamond by understanding cut,
                clarity, colour and carat.

              </p>

            </Link>

            <Link
              to="/blogs/2"
              className="related-card"
            >

              <h3>

                Latest Gold Jewellery Trends In 2026

              </h3>

              <p>

                Explore the newest luxury gold
                jewellery styles and fashion trends
                for every occasion.

              </p>

            </Link>

          </div>

        </section>

      </section>

      <section
        className="blog-cta"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.70),rgba(0,0,0,.70)),url(${blogCTA})`
        }}
      >

        <div className="blog-cta-content">

          <span>

            HIRANYA COLLECTION

          </span>

          <h2>

            Discover Timeless
            Jewellery Crafted
            To Last Forever

          </h2>

          <p>

            Explore our premium collection of
            handcrafted gold, diamond and bridal
            jewellery designed with exceptional
            craftsmanship and timeless elegance.

          </p>

          <div className="cta-buttons">

            <Link
              to="/collections"
              className="primary-btn"
            >

              Explore Collection

            </Link>

            <Link
              to="/blogs"
              className="secondary-btn"
            >

              Back To Blogs

            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default BlogDetails3;