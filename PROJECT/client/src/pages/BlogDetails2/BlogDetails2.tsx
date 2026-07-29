import "./BlogDetails.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import blogBanner2 from "../../assets/images/blog-banner2.jpg";
import blog2 from "../../assets/images/blog2.jpg";
import blogCTA from "../../assets/images/blog-cta.jpg";

const BlogDetails2 = () => {

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

        title: "Latest Gold Jewellery Trends In 2026",

        text: "Discover the latest luxury jewellery trends by HIRANYA.",

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
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${blogBanner2})`
        }}
      >

        <div className="blog-hero-content">

          <span>

            GOLD JEWELLERY TRENDS

          </span>

          <h1>

            Latest Gold
            Jewellery Trends
            In 2026

          </h1>

          <p>

            Discover the most elegant gold jewellery
            styles dominating fashion in 2026.

          </p>

        </div>

      </section>

      <section className="blog-container">

        <div className="breadcrumb">

          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/blogs">Blogs</Link>

          <span>/</span>

          <span>Gold Jewellery Trends</span>

        </div>

        <div className="author-card">

          <img
            src={blog2}
            alt="Gold Jewellery"
          />

          <div>

            <h3>

              HIRANYA Editorial Team

            </h3>

            <p>

              Gold Jewellery Specialists

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

            <li>Minimalist Jewellery</li>

            <li>Layered Necklaces</li>

            <li>Temple Jewellery</li>

            <li>Personalised Pieces</li>

            <li>Dual Tone Jewellery</li>

          </ul>

        </div>

        <div className="blog-intro">

          <p>

            Gold jewellery continues to evolve with
            modern fashion while preserving timeless
            elegance. The year 2026 introduces fresh
            trends that blend traditional craftsmanship
            with contemporary minimalism.

          </p>

        </div>

        <blockquote>

          "Luxury is timeless, but trends give it a
          fresh identity every year."

        </blockquote>
                <section className="blog-content-section">

          <h2>

            Minimalist Gold Jewellery

          </h2>

          <p>

            Minimalism continues to dominate the
            jewellery industry in 2026. Sleek gold
            chains, delicate bracelets and elegant
            rings have become everyday essentials
            because they effortlessly complement
            both casual and formal outfits.

          </p>

          <p>

            Lightweight designs provide comfort
            without compromising sophistication,
            making them perfect for professionals,
            students and jewellery lovers who
            appreciate understated luxury.

          </p>

          <div className="content-image">

            <img
              src={blog2}
              alt="Minimalist Gold Jewellery"
            />

          </div>

        </section>

        <section className="blog-content-section">

          <h2>

            Layered Necklaces

          </h2>

          <p>

            Layering multiple gold chains remains
            one of the biggest fashion statements.
            Combining different chain lengths,
            textures and pendants creates a
            personalized style suitable for every
            occasion.

          </p>

          <p>

            Whether paired with western wear or
            traditional attire, layered necklaces
            add elegance and dimension without
            appearing excessive.

          </p>

          <div className="info-grid">

            <div className="info-card">

              <h3>

                Everyday Wear

              </h3>

              <p>

                Thin gold chains and minimalist
                pendants are perfect for daily
                styling while maintaining elegance.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Statement Pieces

              </h3>

              <p>

                Chunky necklaces and bold cuffs
                continue to trend for weddings,
                parties and festive occasions.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Stackable Bangles

              </h3>

              <p>

                Mixing slim bangles with textured
                bracelets creates a sophisticated
                layered look loved by modern women.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Modern Earrings

              </h3>

              <p>

                Hoops, geometric drops and sleek
                gold studs remain versatile pieces
                for every jewellery collection.

              </p>

            </div>

          </div>

        </section>

        <section className="blog-content-section">

          <h2>

            Temple Jewellery Returns

          </h2>

          <p>

            Traditional temple jewellery has made a
            strong comeback with contemporary
            finishes. Intricate craftsmanship,
            heritage-inspired motifs and antique
            gold textures are increasingly being
            paired with modern fashion.

          </p>

          <p>

            These timeless designs beautifully
            complement bridal wear while also
            becoming statement pieces for festive
            celebrations and cultural events.

          </p>

        </section>

        <section className="blog-content-section">

          <h2>

            Personalised Gold Jewellery

          </h2>

          <p>

            Personalised jewellery continues to gain
            popularity in 2026 as people seek pieces
            that reflect their individuality. Initial
            pendants, engraved bracelets, zodiac
            charms and custom name necklaces have
            become meaningful fashion accessories as
            well as thoughtful gifts.

          </p>

          <p>

            These bespoke creations combine emotional
            value with timeless design, making them
            perfect for birthdays, anniversaries and
            special milestones.

          </p>

        </section>

        <section className="blog-content-section">

          <h2>

            Dual Tone & Rose Gold Jewellery

          </h2>

          <p>

            Dual-tone jewellery featuring yellow,
            white and rose gold combinations is one
            of the strongest trends this year.
            These versatile designs pair beautifully
            with both traditional and western outfits,
            offering unmatched styling flexibility.

          </p>

          <p>

            Rose gold continues to attract jewellery
            lovers because of its warm, romantic tone.
            Combined with diamonds or gemstones, it
            creates elegant pieces suitable for every
            occasion.

          </p>

          <div className="tips-card">

            <h3>

              Expert Trend Tip

            </h3>

            <p>

              Invest in timeless gold jewellery that
              balances current trends with classic
              craftsmanship. Versatile pieces can be
              styled for everyday wear while remaining
              fashionable for years to come.

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

                Learn everything you should know
                before buying your first diamond.

              </p>

            </Link>

            <Link
              to="/blogs/3"
              className="related-card"
            >

              <h3>

                Jewellery Care Tips

              </h3>

              <p>

                Keep your jewellery sparkling with
                professional cleaning and storage
                techniques.

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

            Explore Elegant
            Gold Jewellery
            Collections

          </h2>

          <p>

            Discover handcrafted necklaces,
            bangles, rings, earrings and bridal
            jewellery designed with exceptional
            artistry and timeless luxury.

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

export default BlogDetails2;