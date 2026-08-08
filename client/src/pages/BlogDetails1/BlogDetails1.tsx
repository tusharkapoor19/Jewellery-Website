import "./BlogDetails.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import blogBanner1 from "../../assets/images/blog-banner1.jpg";
import blog1 from "../../assets/images/blog1.jpg";
import blogCTA from "../../assets/images/blog-cta.jpg";

const BlogDetails1 = () => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const updateProgress = () => {

      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const percent = (scrollTop / docHeight) * 100;

      setProgress(percent);

    };

    window.addEventListener("scroll", updateProgress);

    return () =>
      window.removeEventListener("scroll", updateProgress);

  }, []);

  const shareArticle = () => {

    if (navigator.share) {

      navigator.share({

        title: "How To Choose The Perfect Diamond Ring",

        text: "Read this premium jewellery buying guide by HIRANYA.",

        url: window.location.href

      });

    } else {

      navigator.clipboard.writeText(window.location.href);

      alert("Article link copied successfully!");

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
            `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${blogBanner1})`
        }}
      >

        <div className="blog-hero-content">

          <span>

            DIAMOND BUYING GUIDE

          </span>

          <h1>

            How To Choose
            The Perfect
            Diamond Ring

          </h1>

          <p>

            Everything you need to know before
            buying your dream diamond ring.

          </p>

        </div>

      </section>

      <section className="blog-container">

        <div className="breadcrumb">

          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/blogs">Blogs</Link>

          <span>/</span>

          <span>Diamond Ring Guide</span>

        </div>

        <div className="author-card">

          <img
            src={blog1}
            alt="Diamond Ring"
          />

          <div>

            <h3>

              HIRANYA Editorial Team

            </h3>

            <p>

              Luxury Jewellery Experts

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

            <li>Introduction</li>

            <li>Understanding The 4Cs</li>

            <li>Selecting The Right Setting</li>

            <li>Choosing A Budget</li>

            <li>Certification Tips</li>

          </ul>

        </div>

        <div className="blog-intro">

          <p>

            Buying a diamond ring is one of the
            most memorable purchases in life.
            Whether it's for an engagement,
            anniversary or special celebration,
            understanding diamonds helps you
            make a confident investment.

          </p>

        </div>

        <blockquote>

          "A diamond is not just a gemstone —
          it's a timeless symbol of love,
          commitment and elegance."

        </blockquote>
                <section className="blog-content-section">

          <h2>

            Understanding The 4Cs

          </h2>

          <p>

            The quality and value of every diamond
            are determined by four important
            characteristics known as the 4Cs—
            Cut, Color, Clarity and Carat Weight.
            Understanding these factors helps you
            compare diamonds confidently and select
            one that matches both your expectations
            and your budget.

          </p>

          <div className="content-image">

            <img
              src={blog1}
              alt="Diamond Guide"
            />

          </div>

          <div className="info-grid">

            <div className="info-card">

              <h3>

                Cut

              </h3>

              <p>

                The cut determines how brilliantly
                a diamond reflects light. An
                Excellent or Ideal Cut offers the
                highest sparkle and brilliance.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Color

              </h3>

              <p>

                Diamonds are graded from D to Z.
                Near-colorless diamonds offer
                outstanding beauty while providing
                excellent value.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Clarity

              </h3>

              <p>

                Clarity measures internal
                inclusions and external blemishes.
                VS and SI grades often provide an
                ideal balance between quality and
                affordability.

              </p>

            </div>

            <div className="info-card">

              <h3>

                Carat

              </h3>

              <p>

                Carat refers to the weight of the
                diamond. Bigger is not always
                better—a well-cut smaller diamond
                can appear more brilliant than a
                larger poorly cut stone.

              </p>

            </div>

          </div>

        </section>

        <section className="blog-content-section">

          <h2>

            Selecting The Perfect Ring Setting

          </h2>

          <p>

            The setting plays a vital role in both
            the appearance and durability of your
            diamond ring. Solitaire settings offer
            timeless elegance, while halo settings
            enhance the perceived size of the
            center stone. Three-stone rings carry
            symbolic meaning and vintage designs
            provide unmatched character.

          </p>

          <p>

            Consider your daily lifestyle when
            choosing a setting. If the ring will be
            worn every day, select a secure design
            that protects the diamond while
            maintaining comfort throughout the day.

          </p>

        </section>

        <section className="blog-content-section">

          <h2>

            Choosing The Right Budget

          </h2>

          <p>

            A beautiful engagement ring doesn't
            have to exceed your financial comfort.
            Prioritize cut quality first, followed
            by clarity and color. Making informed
            trade-offs often results in a diamond
            that looks exceptional without
            unnecessary expense.

          </p>

          <div className="tips-card">

            <h3>

              Expert Tip

            </h3>

            <p>

              Rather than focusing only on carat
              size, choose an Excellent Cut
              diamond. Superior brilliance often
              makes a diamond appear larger and
              more luxurious than its actual size.

            </p>

          </div>

        </section>
                <section className="blog-content-section">

          <h2>

            Always Buy Certified Diamonds

          </h2>

          <p>

            Certification provides confidence that
            the diamond has been independently
            evaluated. Trusted laboratories like
            GIA and IGI issue detailed grading
            reports covering cut, clarity, color,
            carat weight and other essential
            characteristics.

          </p>

          <p>

            Before making a purchase, verify the
            certificate number and ensure it
            matches the diamond. This guarantees
            authenticity and protects your
            investment for years to come.

          </p>

        </section>

        <section className="blog-content-section">

          <h2>

            Final Buying Advice

          </h2>

          <p>

            Buying a diamond ring should never feel
            overwhelming. By understanding the 4Cs,
            selecting the right setting and
            purchasing certified jewellery, you can
            confidently choose a ring that reflects
            your personality and celebrates life's
            most meaningful moments.

          </p>

        </section>

        <section className="related-blogs">

          <h2>

            Related Articles

          </h2>

          <div className="related-grid">

            <Link
              to="/blogs/2"
              className="related-card"
            >

              <h3>

                Latest Gold Jewellery Trends In 2026

              </h3>

              <p>

                Discover the newest luxury gold
                jewellery trends for every occasion.

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

                Learn professional cleaning and
                storage techniques to keep your
                jewellery shining for years.

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

            Find The Perfect
            Diamond Jewellery

          </h2>

          <p>

            Explore our handcrafted diamond rings,
            earrings, pendants and bridal
            collections designed with timeless
            elegance and exceptional craftsmanship.

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

export default BlogDetails1;