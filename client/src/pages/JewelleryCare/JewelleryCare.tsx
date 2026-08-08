import "./JewelleryCare.css";

import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import careHero from "../../assets/images/jewellery-care-hero.jpg";
import careDaily from "../../assets/images/jewellery-cleaning.jpg";
import careStorage from "../../assets/images/jewellery-storage.jpg";
import careProfessional from "../../assets/images/jewellery-professional.jpg";
import careBanner from "../../assets/images/jewellery-care-banner.jpg";

const JewelleryCare = () => {

  const careMethods = [

    {
      title: "Regular Cleaning",
      image: careDaily,
      description:
        "Clean your jewellery gently using a soft microfiber cloth to remove everyday dust, fingerprints and natural oils while preserving its brilliance."
    },

    {
      title: "Safe Storage",
      image: careStorage,
      description:
        "Store every jewellery piece separately in a soft pouch or velvet-lined box to prevent scratches and unwanted tangling."
    },

    {
      title: "Professional Care",
      image: careProfessional,
      description:
        "Schedule periodic professional inspection and polishing to maintain the shine, strength and beauty of your precious jewellery."
    }

  ];

  return (

    <>

      <TopBar />

      <Navbar />

      <section
        className="care-hero"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${careHero})`
        }}
      >

        <div className="care-hero-content">

          <span>

            HIRANYA JEWELLERY CARE

          </span>

          <h1>

            Keep Your Jewellery
            Beautiful Forever

          </h1>

          <p>

            Every handcrafted piece deserves exceptional care.
            Discover expert cleaning, storage and maintenance
            tips to preserve the brilliance and elegance of your
            treasured jewellery for generations.

          </p>

          <div className="hero-buttons">

            <a
              href="#care-methods"
              className="primary-btn"
            >

              Explore Care Guide

            </a>

            <Link
              to="/collections"
              className="secondary-btn"
            >

              Shop Collection

            </Link>

          </div>

        </div>

      </section>

      <section className="importance-section">

        <div className="container">

          <div className="section-heading">

            <span>

              WHY JEWELLERY CARE

            </span>

            <h2>

              Preserve Beauty,
              Shine & Value

            </h2>

            <p>

              Luxury jewellery is more than an accessory—it's an
              investment and a cherished memory. Proper care keeps
              every piece sparkling while protecting its craftsmanship
              for years to come.

            </p>

          </div>

          <div className="importance-grid">

            <div className="importance-card">

              <h3>

                Lasting Shine

              </h3>

              <p>

                Maintain the natural brilliance of gold,
                diamonds and precious gemstones.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Prevent Damage

              </h3>

              <p>

                Reduce scratches, dents and loose settings
                with proper maintenance.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Better Protection

              </h3>

              <p>

                Safe storage prevents accidental wear,
                tangling and unnecessary repairs.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Lifetime Value

              </h3>

              <p>

                Well-maintained jewellery retains its
                beauty and sentimental value for decades.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="methods-section"
        id="care-methods"
      >

        <div className="container">

          <div className="section-heading">

            <span>

              CARE METHODS

            </span>

            <h2>

              Essential Jewellery
              Care Practices

            </h2>

          </div>

          <div className="methods-grid">

            {careMethods.map((method, index) => (

              <div
                className="method-card"
                key={index}
              >

                <img
                  src={method.image}
                  alt={method.title}
                />

                <div className="method-content">

                  <h3>

                    {method.title}

                  </h3>

                  <p>

                    {method.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
            <section className="daily-care-section">

        <div className="container">

          <div className="section-heading">

            <span>

              DAILY CARE

            </span>

            <h2>

              Everyday Jewellery
              Care Routine

            </h2>

            <p>

              A few simple habits can dramatically increase the
              life and brilliance of your favourite jewellery.

            </p>

          </div>

          <div className="steps-grid">

            <div className="step-card">

              <h1>01</h1>

              <h3>

                Wear Last

              </h3>

              <p>

                Put on your jewellery after applying makeup,
                perfume, sunscreen and hairspray to avoid
                chemical exposure.

              </p>

            </div>

            <div className="step-card">

              <h1>02</h1>

              <h3>

                Remove Before Work

              </h3>

              <p>

                Remove rings, bracelets and necklaces before
                exercising, swimming, gardening or household
                cleaning.

              </p>

            </div>

            <div className="step-card">

              <h1>03</h1>

              <h3>

                Wipe Gently

              </h3>

              <p>

                Use a soft microfiber cloth after every wear
                to remove fingerprints, sweat and dust.

              </p>

            </div>

            <div className="step-card">

              <h1>04</h1>

              <h3>

                Store Safely

              </h3>

              <p>

                Place every jewellery piece inside a soft pouch
                or velvet-lined jewellery box separately.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="dos-donts-section">

        <div className="container">

          <div className="section-heading">

            <span>

              DO'S & DON'TS

            </span>

            <h2>

              Best Practices For
              Long Lasting Shine

            </h2>

          </div>

          <div className="dos-donts-grid">

            <div className="dos-card">

              <h3>

                ✓ Do's

              </h3>

              <ul>

                <li>Clean jewellery regularly with a soft cloth.</li>

                <li>Store each piece separately.</li>

                <li>Inspect clasps and settings periodically.</li>

                <li>Use a jewellery box with soft lining.</li>

                <li>Visit professionals for annual inspection.</li>

              </ul>

            </div>

            <div className="donts-card">

              <h3>

                ✕ Don'ts

              </h3>

              <ul>

                <li>Don't expose jewellery to perfumes.</li>

                <li>Don't wear jewellery while swimming.</li>

                <li>Don't store multiple pieces together.</li>

                <li>Don't use harsh household chemicals.</li>

                <li>Don't scrub gemstones aggressively.</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      <section className="metal-care-section">

        <div className="container">

          <div className="section-heading">

            <span>

              EXPERT CARE

            </span>

            <h2>

              Care Guide For
              Different Jewellery

            </h2>

          </div>

          <div className="importance-grid">

            <div className="importance-card">

              <h3>

                Gold Jewellery

              </h3>

              <p>

                Clean with mild soap and lukewarm water,
                then dry gently using a lint-free cloth.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Diamond Jewellery

              </h3>

              <p>

                Brush gently with a soft toothbrush to
                restore maximum brilliance and sparkle.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Gemstone Jewellery

              </h3>

              <p>

                Protect gemstones from extreme heat,
                chemicals and sudden temperature changes.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Pearl Jewellery

              </h3>

              <p>

                Wipe pearls with a soft damp cloth and
                never soak them in cleaning solutions.

              </p>

            </div>

          </div>

        </div>

      </section>
            <section className="faq-section">

        <div className="container">

          <div className="section-heading">

            <span>

              FREQUENTLY ASKED QUESTIONS

            </span>

            <h2>

              Jewellery Care
              FAQs

            </h2>

          </div>

          <div className="faq-grid">

            <div className="faq-card">

              <h3>

                How often should I clean my jewellery?

              </h3>

              <p>

                Wipe your jewellery after every wear and
                perform a gentle deep cleaning every two
                to four weeks depending on usage.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Can I wear jewellery while sleeping?

              </h3>

              <p>

                It's best to remove jewellery before
                sleeping to avoid bending chains,
                damaging settings or accidental scratches.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Is perfume harmful for jewellery?

              </h3>

              <p>

                Yes. Perfumes, lotions and cosmetics can
                dull the shine of precious metals and
                gemstones over time.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Does HIRANYA offer professional cleaning?

              </h3>

              <p>

                Yes. We recommend professional cleaning
                and inspection to restore brilliance and
                ensure every setting remains secure.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="care-cta"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.72)),url(${careBanner})`
        }}
      >

        <div className="care-cta-content">

          <span>

            HIRANYA CARE

          </span>

          <h2>

            Keep Every
            Sparkle Alive

          </h2>

          <p>

            Timeless jewellery deserves timeless care.
            Discover our handcrafted collections designed
            to celebrate life's precious moments with
            lasting beauty and elegance.

          </p>

          <div className="hero-buttons">

            <Link
              to="/collections"
              className="primary-btn"
            >

              Shop Collection

            </Link>

            <Link
              to="/contact"
              className="secondary-btn"
            >

              Contact Expert

            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default JewelleryCare;