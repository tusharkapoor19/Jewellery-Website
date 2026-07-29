import "./Jewellery.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import heroImage from "../../assets/images/hero/HERO.png";

import {
  jewelleryProducts,
  JewelleryProduct,
} from "./jewelleryData";

const scrollToHash = () => {

  const hash = window.location.hash.replace("#", "");

  if (!hash) {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;

  }

  setTimeout(() => {

    const element = document.getElementById(hash);

    if (!element) return;

    const navbarHeight = 90;

    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

  }, 150);

};

const ProductCard = ({
  product,
}: {
  product: JewelleryProduct;
}) => {

  const navigate = useNavigate();

  return (

    <div className="collection-card">

      <div className="collection-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="collection-overlay">

          <button className="icon-btn">
            <i className="bi bi-heart"></i>
          </button>

          <button
            className="icon-btn"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            <i className="bi bi-eye"></i>
          </button>

        </div>

      </div>

      <div className="collection-content">

        <h3>{product.name}</h3>

        <p>{product.weight}</p>

        <h4>
          ₹ {product.price.toLocaleString()}
        </h4>

        <Link
          to={`/product/${product.id}`}
          className="view-btn"
        >
          View Details
        </Link>

      </div>

    </div>

  );

};

type SectionProps = {
  id: string;
  title: string;
  description: string;
  category: string;
};

const JewellerySection = ({
  id,
  title,
  description,
  category,
}: SectionProps) => {

  const products = jewelleryProducts.filter(
    (item) => item.category === category
  );

  return (

    <section
      id={id}
      className="collection-section"
    >

      <div className="section-heading">

        <h2>{title}</h2>

        <p>{description}</p>

      </div>

      <div className="collection-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

};

const Jewellery = () => {

  useEffect(() => {

    scrollToHash();

    window.addEventListener(
      "hashchange",
      scrollToHash
    );

    return () => {

      window.removeEventListener(
        "hashchange",
        scrollToHash
      );

    };

  }, []);

  return (

    <>

      <TopBar />

      <Navbar />

      <section className="collections-hero">

        <img
          src={heroImage}
          alt="HIRANYA Jewellery"
        />

        <div className="hero-overlay">

          <span>Luxury Jewellery</span>

          <h1>
            Explore Premium Jewellery
          </h1>

          <p>
            Discover handcrafted jewellery
            designed with elegance, purity
            and timeless craftsmanship.
          </p>

          <a
            href="#all-jewellery"
            className="hero-btn"
          >
            Explore Jewellery
          </a>

        </div>

      </section>

      <section
        id="all-jewellery"
        className="collections-title"
      >

        <h1>All Jewellery</h1>

        <p>
          Browse our complete collection of
          handcrafted jewellery for every
          occasion and every generation.
        </p>

      </section>
            <JewellerySection
        id="rings"
        title="Rings"
        description="Elegant rings crafted with timeless beauty, perfect for everyday wear, engagements and memorable celebrations."
        category="rings"
      />

      <JewellerySection
        id="earrings"
        title="Earrings"
        description="Discover graceful earrings that add sparkle and sophistication to every outfit and occasion."
        category="earrings"
      />

      <JewellerySection
        id="necklaces"
        title="Necklaces"
        description="Luxury necklaces designed to enhance your elegance with exceptional craftsmanship."
        category="necklaces"
      />

      <JewellerySection
        id="pendants"
        title="Pendants"
        description="Beautiful pendants that blend modern style with timeless traditions."
        category="pendants"
      />

      <JewellerySection
        id="mangalsutra"
        title="Mangalsutra"
        description="Celebrate everlasting love with our beautifully handcrafted mangalsutra collection."
        category="mangalsutra"
      />

      <JewellerySection
        id="chains"
        title="Chains"
        description="Premium gold chains crafted with precision for daily elegance and luxury."
        category="chains"
      />

      <JewellerySection
        id="bracelets"
        title="Bracelets"
        description="Stylish bracelets crafted for comfort, elegance and modern sophistication."
        category="bracelets"
      />

      <JewellerySection
        id="bangles"
        title="Bangles"
        description="Traditional and contemporary bangles designed for every celebration."
        category="bangles"
      />

      <JewellerySection
        id="nose-pins"
        title="Nose Pins"
        description="Elegant nose pins crafted to add charm and grace to your everyday look."
        category="nose-pins"
      />

      <JewellerySection
        id="anklets"
        title="Anklets"
        description="Graceful anklets designed with intricate detailing and timeless beauty."
        category="anklets"
      />
            <JewellerySection
        id="mens-jewellery"
        title="Men's Jewellery"
        description="Premium jewellery designed for modern men with timeless elegance, confidence and everyday sophistication."
        category="mens-jewellery"
      />

      <JewellerySection
        id="kids-jewellery"
        title="Kids Jewellery"
        description="Cute, lightweight and beautifully crafted jewellery specially designed for little stars."
        category="kids-jewellery"
      />

      <JewellerySection
        id="idols-coins"
        title="Idols & Coins"
        description="Sacred idols and premium gold coins crafted for gifting, festivals, investments and blessings."
        category="idols-coins"
      />

      <section className="why-hiranya">

        <div className="why-heading">

          <span>WHY HIRANYA</span>

          <h2>
            Crafted With Trust,
            Designed For Generations
          </h2>

          <p>
            Every HIRANYA masterpiece is handcrafted
            using ethically sourced materials and
            unmatched craftsmanship to create
            jewellery that lasts forever.
          </p>

        </div>

        <div className="why-grid">

          <div className="why-card">

            <i className="bi bi-patch-check-fill"></i>

            <h3>Certified Purity</h3>

            <p>
              Every jewellery piece comes with BIS
              Hallmark certification.
            </p>

          </div>

          <div className="why-card">

            <i className="bi bi-truck"></i>

            <h3>Free Shipping</h3>

            <p>
              Secure insured delivery across India
              with premium packaging.
            </p>

          </div>

          <div className="why-card">

            <i className="bi bi-arrow-repeat"></i>

            <h3>Easy Exchange</h3>

            <p>
              Hassle-free exchange and lifetime
              support for every purchase.
            </p>

          </div>

          <div className="why-card">

            <i className="bi bi-shield-lock"></i>

            <h3>100% Secure</h3>

            <p>
              Safe payment methods protected with
              advanced encryption.
            </p>

          </div>

        </div>

      </section>

      <section className="newsletter">

        <div className="newsletter-content">

          <h2>Stay Connected</h2>

          <p>
            Be the first to know about new
            collections, exclusive launches and
            festive offers.
          </p>

          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              Subscribe
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default Jewellery;