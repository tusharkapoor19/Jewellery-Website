import "./HallmarkCertification.css";

import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import hallmarkHero from "../../assets/images/hallmark-hero.jpg";
import bisHallmark from "../../assets/images/bis-hallmark.jpg";
import goldPurity from "../../assets/images/gold-purity.jpg";
import certification from "../../assets/images/diamond-certification.jpg";
import hallmarkBanner from "../../assets/images/hallmark-banner.jpg";

const HallmarkCertification = () => {

  const hallmarkFeatures = [

    {
      title: "BIS Certified",
      image: bisHallmark,
      description:
        "Every HIRANYA gold jewellery piece follows BIS hallmark standards, ensuring authenticity, purity and customer confidence."
    },

    {
      title: "Gold Purity",
      image: goldPurity,
      description:
        "Our jewellery is available in certified 24K, 22K, 18K and 14K gold with clearly marked purity for complete transparency."
    },

    {
      title: "Diamond Certification",
      image: certification,
      description:
        "Selected diamond jewellery includes trusted certifications from reputed gemological laboratories for verified quality."
    }

  ];

  return (

    <>

      <TopBar />

      <Navbar />

      <section
        className="hallmark-hero"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.68),rgba(0,0,0,.68)),url(${hallmarkHero})`
        }}
      >

        <div className="hallmark-hero-content">

          <span>

            HIRANYA CERTIFICATION

          </span>

          <h1>

            Hallmarked
            Jewellery You
            Can Trust

          </h1>

          <p>

            Every masterpiece at HIRANYA is crafted
            with exceptional precision and backed by
            trusted hallmarking standards, ensuring
            complete authenticity, purity and lasting
            confidence with every purchase.

          </p>

          <div className="hero-buttons">

            <a
              href="#hallmark-features"
              className="primary-btn"
            >

              Learn More

            </a>

            <Link
              to="/collections"
              className="secondary-btn"
            >

              Shop Jewellery

            </Link>

          </div>

        </div>

      </section>

      <section className="importance-section">

        <div className="container">

          <div className="section-heading">

            <span>

              WHY HALLMARKING

            </span>

            <h2>

              Your Assurance
              Of Quality

            </h2>

            <p>

              Hallmarking guarantees the purity of
              precious metals and helps customers
              purchase jewellery with complete trust,
              transparency and confidence.

            </p>

          </div>

          <div className="importance-grid">

            <div className="importance-card">

              <h3>

                Guaranteed Purity

              </h3>

              <p>

                Every gold jewellery piece is tested
                according to recognised standards.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Authentic Purchase

              </h3>

              <p>

                Hallmarking protects customers against
                misleading purity claims.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Trusted Standards

              </h3>

              <p>

                Certified jewellery offers greater
                confidence while purchasing.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Lifetime Value

              </h3>

              <p>

                Certified jewellery maintains its
                quality, trust and long-term value.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="methods-section"
        id="hallmark-features"
      >

        <div className="container">

          <div className="section-heading">

            <span>

              CERTIFICATION

            </span>

            <h2>

              Understanding
              Hallmark Standards

            </h2>

          </div>

          <div className="methods-grid">

            {hallmarkFeatures.map((feature, index) => (

              <div
                className="method-card"
                key={index}
              >

                <img
                  src={feature.image}
                  alt={feature.title}
                />

                <div className="method-content">

                  <h3>

                    {feature.title}

                  </h3>

                  <p>

                    {feature.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
            <section className="purity-section">

        <div className="container">

          <div className="section-heading">

            <span>

              GOLD PURITY

            </span>

            <h2>

              Understanding
              Gold Karats

            </h2>

            <p>

              Different gold purities are designed for
              different lifestyles, jewellery styles and
              durability requirements.

            </p>

          </div>

          <div className="importance-grid">

            <div className="importance-card">

              <h3>

                24K Gold

              </h3>

              <p>

                99.9% pure gold with a rich yellow
                appearance. Ideal for investment and
                traditional jewellery.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                22K Gold

              </h3>

              <p>

                91.6% pure gold offering an excellent
                balance between purity and strength,
                perfect for fine jewellery.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                18K Gold

              </h3>

              <p>

                75% pure gold blended with alloy
                metals for greater durability and
                elegant diamond jewellery.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                14K Gold

              </h3>

              <p>

                58.5% pure gold providing exceptional
                durability for everyday luxury wear.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="hallmark-components-section">

        <div className="container">

          <div className="section-heading">

            <span>

              BIS HALLMARK

            </span>

            <h2>

              Components Of
              A Hallmark

            </h2>

          </div>

          <div className="steps-grid">

            <div className="step-card">

              <h1>01</h1>

              <h3>

                BIS Logo

              </h3>

              <p>

                Confirms the jewellery has been
                certified under BIS hallmarking
                standards.

              </p>

            </div>

            <div className="step-card">

              <h1>02</h1>

              <h3>

                Purity Mark

              </h3>

              <p>

                Indicates the purity level such as
                22K916, 18K750 or 14K585.

              </p>

            </div>

            <div className="step-card">

              <h1>03</h1>

              <h3>

                Assaying Centre

              </h3>

              <p>

                Identifies the authorised BIS
                hallmarking centre that tested the
                jewellery.

              </p>

            </div>

            <div className="step-card">

              <h1>04</h1>

              <h3>

                Jeweller ID

              </h3>

              <p>

                Displays the registered jeweller's
                identification for complete
                traceability.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="diamond-section">

        <div className="container">

          <div className="section-heading">

            <span>

              DIAMOND CERTIFICATION

            </span>

            <h2>

              Trusted
              International Standards

            </h2>

          </div>

          <div className="methods-grid">

            <div className="method-card">

              <div className="method-content">

                <h3>

                  GIA

                </h3>

                <p>

                  The Gemological Institute of America
                  is recognised globally for accurate,
                  unbiased diamond grading.

                </p>

              </div>

            </div>

            <div className="method-card">

              <div className="method-content">

                <h3>

                  IGI

                </h3>

                <p>

                  International Gemological Institute
                  provides detailed grading reports for
                  diamonds and fine jewellery.

                </p>

              </div>

            </div>

            <div className="method-card">

              <div className="method-content">

                <h3>

                  SGL

                </h3>

                <p>

                  Solitaires and Gemological
                  Laboratories offer reliable gemstone
                  authentication and certification.

                </p>

              </div>

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

              Hallmark &
              Certification FAQs

            </h2>

          </div>

          <div className="faq-grid">

            <div className="faq-card">

              <h3>

                What is BIS Hallmark?

              </h3>

              <p>

                BIS Hallmark is a government-recognised
                certification that verifies the purity
                of precious metal jewellery and provides
                assurance of authenticity.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Why is hallmarking important?

              </h3>

              <p>

                Hallmarking protects buyers by ensuring
                that the jewellery contains the purity
                of gold claimed by the jeweller.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Are HIRANYA diamonds certified?

              </h3>

              <p>

                Yes. Selected diamond jewellery is
                accompanied by trusted laboratory
                certification wherever applicable.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                How can I verify my jewellery?

              </h3>

              <p>

                You can verify hallmark details through
                the BIS Care App or by checking the
                hallmark markings present on your
                jewellery piece.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="hallmark-cta"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.72)),url(${hallmarkBanner})`
        }}
      >

        <div className="hallmark-cta-content">

          <span>

            HIRANYA PROMISE

          </span>

          <h2>

            Certified Elegance.
            Trusted Forever.

          </h2>

          <p>

            Every HIRANYA creation reflects exceptional
            craftsmanship, certified purity and timeless
            luxury. Shop confidently knowing every piece
            meets the highest standards of authenticity.

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

export default HallmarkCertification;