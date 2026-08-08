import "./RingSizeGuide.css";

import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import ringHero from "../../assets/images/ring-size-hero.jpg";
import ringMethod from "../../assets/images/ring-method.jpg";
import ringMeasure from "../../assets/images/ring-measure.jpg";
import ringSizing from "../../assets/images/ring-sizing.jpg";
import ringBanner from "../../assets/images/ring-guide-banner.jpg";

const RingSizeGuide = () => {

  const methods = [

    {
      title: "Existing Ring Method",
      image: ringMethod,
      description:
        "Measure the inside diameter of an existing ring that fits perfectly and compare it with our size chart."
    },

    {
      title: "String Method",
      image: ringMeasure,
      description:
        "Wrap a string around your finger, mark the meeting point and measure the length using a ruler."
    },

    {
      title: "Paper Strip Method",
      image: ringSizing,
      description:
        "Use a thin strip of paper to wrap around your finger and match the circumference with the chart."
    }

  ];

  return (

    <>

      <TopBar />

      <Navbar />

      <section
        className="ring-hero"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${ringHero})`
        }}
      >

        <div className="ring-hero-content">

          <span>

            HIRANYA SIZE GUIDE

          </span>

          <h1>

            Find Your
            Perfect Ring
            Size

          </h1>

          <p>

            Choosing the right ring size ensures
            comfort, elegance and confidence.
            Follow our professional guide to find
            your perfect fit before placing your
            order.

          </p>

          <div className="hero-buttons">

            <a
              href="#methods"
              className="primary-btn"
            >

              Find My Size

            </a>

            <Link
              to="/collections"
              className="secondary-btn"
            >

              Shop Rings

            </Link>

          </div>

        </div>

      </section>

      <section className="importance-section">

        <div className="container">

          <div className="section-heading">

            <span>

              WHY SIZE MATTERS

            </span>

            <h2>

              A Perfect Fit Makes
              Every Moment Better

            </h2>

            <p>

              Selecting the correct ring size is
              essential for both comfort and style.
              A perfectly fitted ring feels secure,
              looks elegant and can be worn every
              day without discomfort.

            </p>

          </div>

          <div className="importance-grid">

            <div className="importance-card">

              <h3>

                Comfortable Fit

              </h3>

              <p>

                Enjoy everyday comfort without
                feeling too tight or too loose.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Secure Wear

              </h3>

              <p>

                A correctly sized ring stays safely
                on your finger throughout the day.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Better Appearance

              </h3>

              <p>

                A properly fitted ring enhances the
                elegance of your jewellery.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Long-Term Comfort

              </h3>

              <p>

                Perfect sizing prevents unnecessary
                pressure and irritation.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="methods-section"
        id="methods"
      >

        <div className="container">

          <div className="section-heading">

            <span>

              MEASUREMENT METHODS

            </span>

            <h2>

              Choose Your
              Preferred Method

            </h2>

          </div>

          <div className="methods-grid">

            {methods.map((method, index) => (

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

      <section className="size-chart-section">

        <div className="container">

          <div className="section-heading">

            <span>

              RING SIZE CHART

            </span>

            <h2>

              International Ring Size Guide

            </h2>

            <p>

              Compare Indian, US and UK ring sizes
              using the reference chart below.

            </p>

          </div>

          <div className="table-wrapper">

            <table className="ring-table">

              <thead>

                <tr>

                  <th>India</th>
                  <th>US</th>
                  <th>UK</th>
                  <th>Diameter (mm)</th>
                  <th>Circumference (mm)</th>

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>10</td>
                  <td>5</td>
                  <td>J½</td>
                  <td>15.7</td>
                  <td>49.3</td>
                </tr>

                <tr>
                  <td>12</td>
                  <td>6</td>
                  <td>L½</td>
                  <td>16.5</td>
                  <td>51.9</td>
                </tr>

                <tr>
                  <td>14</td>
                  <td>7</td>
                  <td>N½</td>
                  <td>17.3</td>
                  <td>54.4</td>
                </tr>

                <tr>
                  <td>16</td>
                  <td>8</td>
                  <td>P½</td>
                  <td>18.1</td>
                  <td>57.0</td>
                </tr>

                <tr>
                  <td>18</td>
                  <td>9</td>
                  <td>R½</td>
                  <td>18.9</td>
                  <td>59.5</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

      <section className="steps-section">

        <div className="container">

          <div className="section-heading">

            <span>

              HOW TO MEASURE

            </span>

            <h2>

              Measure Your Ring
              In Four Easy Steps

            </h2>

          </div>

          <div className="steps-grid">

            <div className="step-card">

              <h1>01</h1>

              <h3>

                Wrap

              </h3>

              <p>

                Wrap a string or paper strip around
                the base of your finger.

              </p>

            </div>

            <div className="step-card">

              <h1>02</h1>

              <h3>

                Mark

              </h3>

              <p>

                Mark the exact point where the ends
                meet comfortably.

              </p>

            </div>

            <div className="step-card">

              <h1>03</h1>

              <h3>

                Measure

              </h3>

              <p>

                Measure the marked length using
                a ruler in millimetres.

              </p>

            </div>

            <div className="step-card">

              <h1>04</h1>

              <h3>

                Compare

              </h3>

              <p>

                Match your measurement with the
                HIRANYA ring size chart.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="tips-section">

        <div className="container">

          <div className="section-heading">

            <span>

              EXPERT TIPS

            </span>

            <h2>

              Tips For Accurate
              Ring Measurement

            </h2>

          </div>

          <div className="importance-grid">

            <div className="importance-card">

              <h3>

                Measure At Night

              </h3>

              <p>

                Fingers are slightly larger during
                the evening.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Avoid Cold Weather

              </h3>

              <p>

                Cold temperatures reduce finger
                size temporarily.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                Measure Twice

              </h3>

              <p>

                Always repeat the measurement for
                better accuracy.

              </p>

            </div>

            <div className="importance-card">

              <h3>

                When In Doubt

              </h3>

              <p>

                Choose the slightly larger size for
                maximum comfort.

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

              Everything You Need
              To Know

            </h2>

          </div>

          <div className="faq-grid">

            <div className="faq-card">

              <h3>

                How tight should my ring fit?

              </h3>

              <p>

                Your ring should slide comfortably
                over your knuckle while fitting
                securely enough that it doesn't fall
                off during daily wear.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Does finger size change?

              </h3>

              <p>

                Yes. Finger size may vary because of
                weather, exercise, hydration and time
                of the day. Measure during the
                evening for the most accurate result.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                What if I am between two sizes?

              </h3>

              <p>

                We recommend choosing the larger
                size for improved comfort,
                especially if your knuckles are
                slightly wider.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Can HIRANYA resize rings?

              </h3>

              <p>

                Yes. Most gold and diamond rings
                can be resized by our jewellery
                experts depending upon the design.

              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="ring-cta"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.70),rgba(0,0,0,.70)),url(${ringBanner})`
        }}
      >

        <div className="ring-cta-content">

          <span>

            HIRANYA COLLECTION

          </span>

          <h2>

            Discover Your
            Perfect Ring

          </h2>

          <p>

            Browse handcrafted engagement,
            wedding and luxury rings designed
            with timeless elegance and crafted
            for every special moment.

          </p>

          <div className="hero-buttons">

            <Link
              to="/collections"
              className="primary-btn"
            >

              Shop Rings

            </Link>

            <Link
              to="/contact"
              className="secondary-btn"
            >

              Talk To Expert

            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default RingSizeGuide;