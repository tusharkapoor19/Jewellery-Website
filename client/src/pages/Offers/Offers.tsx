import "./Offers.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TicketPercent, Copy } from "lucide-react";
import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { ApiOffer, fetchActiveOffers } from "../../api/offers";

import offersHero from "../../assets/images/offers-hero.jpg";
import featuredOffer from "../../assets/images/offer-feature.jpg";
import offerFestival from "../../assets/images/offer-festival.jpg";
import offerMembership from "../../assets/images/offer-membership.jpg";
import offersBanner from "../../assets/images/offers-banner.jpg";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Offers = () => {

  const [liveOffers, setLiveOffers] = useState<ApiOffer[]>([]);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const offers = await fetchActiveOffers();
        setLiveOffers(offers);
      } catch (error) {
        console.error(error);
      }
    };
    loadOffers();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success(`Copied "${code}" — paste it in your cart`))
      .catch(() => toast.error("Couldn't copy code"));
  };

  const offerCards = [

    {
      title: "10% OFF",
      subtitle: "Wedding Collection",
      icon: "💍",
      description:
        "Celebrate your special day with timeless bridal jewellery and exclusive wedding savings."
    },

    {
      title: "Free Diamond Studs",
      subtitle: "Above ₹2,00,000",
      icon: "💎",
      description:
        "Receive an elegant pair of diamond studs with eligible diamond jewellery purchases."
    },

    {
      title: "Luxury Gift Box",
      subtitle: "Complimentary",
      icon: "🎁",
      description:
        "Every premium purchase comes beautifully packed in our signature luxury gift box."
    },

    {
      title: "Free Shipping",
      subtitle: "Pan India",
      icon: "🚚",
      description:
        "Enjoy fully insured, secure and complimentary delivery on every HIRANYA order."
    },

    {
      title: "No Cost EMI",
      subtitle: "Easy Payments",
      icon: "💳",
      description:
        "Own your dream jewellery today with flexible EMI options from leading banks."
    },

    {
      title: "VIP Rewards",
      subtitle: "Exclusive Members",
      icon: "⭐",
      description:
        "Unlock exclusive launches, birthday rewards and members-only luxury experiences."
    }

  ];

  return (

    <>

      <TopBar />

      <Navbar />

      <section
        className="offers-hero"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.70),rgba(0,0,0,.70)),url(${offersHero})`
        }}
      >

        <div className="offers-hero-content">

          <span>

            HIRANYA EXCLUSIVE

          </span>

          <h1>

            Luxury Offers
            Crafted For You

          </h1>

          <p>

            Discover premium privileges, festive celebrations
            and exclusive jewellery offers designed to make
            every purchase even more memorable.

          </p>

          <div className="hero-buttons">

            <a
              href="#featured-offer"
              className="primary-btn"
            >

              Explore Offers

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

      <section
        className="featured-offer-section"
        id="featured-offer"
      >

        <div className="container">

          <div
            className="featured-offer-card"
            style={{
              backgroundImage:
                `linear-gradient(rgba(0,0,0,.60),rgba(0,0,0,.60)),url(${featuredOffer})`
            }}
          >

            <div className="featured-offer-content">

              <span>

                LIMITED TIME OFFER

              </span>

              <h2>

                Flat ₹5,000 OFF

              </h2>

              <h3>

                On Diamond Jewellery
                Above ₹1,00,000

              </h3>

              <p>

                Experience luxury shopping with our
                exclusive diamond collection and enjoy
                premium savings for a limited time.

              </p>

              <div className="hero-buttons">

                <Link
                  to="/collections"
                  className="primary-btn"
                >

                  Claim Offer

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {liveOffers.length > 0 && (
        <section className="live-offers-section">

          <div className="container">

            <div className="section-heading">

              <span>ACTIVE RIGHT NOW</span>

              <h2>Coupon Codes You Can Use Today</h2>

              <p>
                Tap a code to copy it, then paste it into the coupon box on your
                cart page to see your total update instantly.
              </p>

            </div>

            <div className="live-offers-grid">

              {liveOffers.map((offer) => (

                <div className="live-offer-card" key={offer._id}>

                  <div className="live-offer-card-top">

                    <span className="live-offer-badge">
                      <TicketPercent size={16} />
                      {offer.discountType === "percentage"
                        ? `${offer.discountValue}% OFF`
                        : `${formatCurrency(offer.discountValue)} OFF`}
                    </span>

                  </div>

                  <button
                    type="button"
                    className="live-offer-code"
                    onClick={() => copyCode(offer.code)}
                  >
                    {offer.code}
                    <Copy size={15} />
                  </button>

                  <p>{offer.description}</p>

                  <small>
                    {offer.minCartValue > 0
                      ? `Min cart ${formatCurrency(offer.minCartValue)}`
                      : "No minimum cart value"}
                  </small>

                  <Link to="/cart" className="live-offer-link">
                    Use in cart →
                  </Link>

                </div>

              ))}

            </div>

          </div>

        </section>
      )}

      <section className="offers-grid-section">

        <div className="container">

          <div className="section-heading">

            <span>

              PREMIUM BENEFITS

            </span>

            <h2>

              Exclusive Offers
              Just For You

            </h2>

          </div>

          <div className="offers-grid">

            {offerCards.map((offer, index) => (

              <div
                className="offer-card"
                key={index}
              >

                <div className="offer-icon">

                  {offer.icon}

                </div>

                <h3>

                  {offer.title}

                </h3>

                <h4>

                  {offer.subtitle}

                </h4>

                <p>

                  {offer.description}

                </p>

              </div>

            ))}
                      </div>

        </div>

      </section>

      <section className="festival-section">

        <div className="container">

          <div className="section-heading">

            <span>SEASONAL CELEBRATIONS</span>

            <h2>Festive Luxury Offers</h2>

            <p>
              Celebrate every special occasion with exclusive jewellery
              collections and premium festive privileges.
            </p>

          </div>

          <div className="festival-wrapper">

            <div className="festival-image">

              <img
                src={offerFestival}
                alt="Festival Offers"
              />

            </div>

            <div className="festival-content">

              <div className="festival-card">

                <h3>✨ Akshaya Tritiya</h3>

                <p>

                  Special gold jewellery offers and complimentary
                  luxury gift packaging for every purchase.

                </p>

              </div>

              <div className="festival-card">

                <h3>🪔 Diwali Collection</h3>

                <p>

                  Celebrate the festival of lights with exclusive
                  discounts on premium diamond jewellery.

                </p>

              </div>

              <div className="festival-card">

                <h3>💍 Wedding Season</h3>

                <p>

                  Save more on bridal jewellery sets with luxury
                  benefits crafted for your special moments.

                </p>

              </div>

              <div className="festival-card">

                <h3>❤️ Anniversary Gifts</h3>

                <p>

                  Surprise your loved ones with timeless jewellery
                  and exclusive anniversary offers.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="membership-section">

        <div className="container">

          <div className="membership-wrapper">

            <div className="membership-content">

              <span>HIRANYA PRIVILEGE CLUB</span>

              <h2>

                Become A
                Premium Member

              </h2>

              <p>

                Join our exclusive membership program and unlock
                luxury experiences beyond jewellery shopping.

              </p>

              <ul>

                <li>✔ Early Access To New Collections</li>

                <li>✔ Birthday Luxury Rewards</li>

                <li>✔ Private Jewellery Preview Events</li>

                <li>✔ Dedicated Relationship Manager</li>

                <li>✔ Exclusive Member Discounts</li>

                <li>✔ VIP Customer Support</li>

              </ul>

              <Link
                to="/contact"
                className="primary-btn"
              >

                Join Membership

              </Link>

            </div>

            <div className="membership-image">

              <img
                src={offerMembership}
                alt="Membership"
              />

            </div>

          </div>

        </div>

      </section>

      <section className="why-shop-section">

        <div className="container">

          <div className="section-heading">

            <span>WHY CHOOSE US</span>

            <h2>

              Shop With Complete Confidence

            </h2>

          </div>

          <div className="why-grid">

            <div className="why-card">

              <h3>🏆 BIS Hallmarked Gold</h3>

              <p>

                Every gold jewellery piece is BIS certified
                for complete authenticity.

              </p>

            </div>

            <div className="why-card">

              <h3>💎 Certified Diamonds</h3>

              <p>

                Every diamond comes with trusted
                certification and quality assurance.

              </p>

            </div>

            <div className="why-card">

              <h3>🚚 Free Insured Delivery</h3>

              <p>

                Safe, secure and complimentary delivery
                across India.

              </p>

            </div>

            <div className="why-card">

              <h3>🔄 Easy Exchange</h3>

              <p>

                Flexible exchange policies with
                lifetime customer support.

              </p>

            </div>

            <div className="why-card">

              <h3>🛡 Secure Payments</h3>

              <p>

                Trusted payment gateways with
                complete transaction security.

              </p>

            </div>

            <div className="why-card">

              <h3>✨ Lifetime Service</h3>

              <p>

                Complimentary cleaning, polishing
                and expert jewellery care.

              </p>

            </div>

          </div>

        </div>

      </section>
            <section className="faq-section">

        <div className="container">

          <div className="section-heading">

            <span>FREQUENTLY ASKED QUESTIONS</span>

            <h2>Everything You Need To Know</h2>

          </div>

          <div className="faq-grid">

            <div className="faq-card">

              <h3>Are these offers available online?</h3>

              <p>
                Yes. Most HIRANYA offers are available both online and
                in-store. Some exclusive privileges may be location-specific.
              </p>

            </div>

            <div className="faq-card">

              <h3>Can I combine multiple offers?</h3>

              <p>
                Selected promotions can be combined, while premium campaign
                offers may have separate eligibility conditions.
              </p>

            </div>

            <div className="faq-card">

              <h3>Are EMI options available?</h3>

              <p>
                Yes. We offer convenient No Cost EMI options through leading
                banks and finance partners on eligible purchases.
              </p>

            </div>

            <div className="faq-card">

              <h3>How long are these offers valid?</h3>

              <p>
                Every offer has a limited validity period. Please check the
                individual offer details or contact our jewellery experts.
              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        className="offers-cta"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.72)),url(${offersBanner})`
        }}
      >

        <div className="offers-cta-content">

          <span>LIMITED TIME PRIVILEGES</span>

          <h2>

            Luxury Begins
            With HIRANYA

          </h2>

          <p>

            Explore our finest jewellery collections and enjoy exclusive
            offers, premium craftsmanship and an unforgettable luxury
            shopping experience.

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

export default Offers;