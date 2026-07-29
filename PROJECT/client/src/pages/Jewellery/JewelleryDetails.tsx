import "./JewelleryDetails.css";

import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  jewelleryProducts,
} from "../Jewellery/jewelleryData";

const JewelleryDetails = () => {

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const product = jewelleryProducts.find(
    (item) => item.id === Number(id)
  );

  const relatedProducts = useMemo(() => {

    if (!product) return [];

    return jewelleryProducts
      .filter(
        (item) =>
          item.category === product.category &&
          item.id !== product.id
      )
      .slice(0, 4);

  }, [product]);

  if (!product) {

    return (

      <>
        <TopBar />
        <Navbar />

        <div className="product-not-found">

          <h1>Product Not Found</h1>

          <p>
            The jewellery piece you are looking for
            does not exist.
          </p>

          <Link
            to="/jewellery"
            className="back-btn"
          >
            Back To Jewellery
          </Link>

        </div>

        <Footer />
      </>

    );

  }

  return (

    <>

      <TopBar />

      <Navbar />

      <section className="details-breadcrumb">

        <Link to="/">Home</Link>

        <span>/</span>

        <Link to="/jewellery">
          Jewellery
        </Link>

        <span>/</span>

        <p>{product.name}</p>

      </section>

      <section className="details-container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-content">

          <span className="details-tag">
            {product.category
              .replaceAll("-", " ")
              .toUpperCase()}
          </span>

          <h1>
            {product.name}
          </h1>

          <div className="details-rating">

            ★★★★★

            <span>(128 Reviews)</span>

          </div>

          <h2>

            ₹ {product.price.toLocaleString()}

          </h2>

          <div className="details-info">

            <p>

              <strong>Purity :</strong>

              {product.purity}

            </p>

            <p>

              <strong>Weight :</strong>

              {product.weight}

            </p>

          </div>

          <p className="details-description">

            {product.description}

          </p>
                    <div className="quantity-wrapper">

            <h3>Quantity</h3>

            <div className="quantity-box">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
              >
                +
              </button>

            </div>

          </div>

          <div className="details-buttons">

            <button className="cart-btn">
              Add To Cart
            </button>

            <button className="buy-btn">
              Buy Now
            </button>

          </div>

        </div>

      </section>

      <section className="specifications">

        <h2>Specifications</h2>

        <div className="spec-grid">

          <div className="spec-card">
            <h4>Product</h4>
            <p>{product.name}</p>
          </div>

          <div className="spec-card">
            <h4>Purity</h4>
            <p>{product.purity}</p>
          </div>

          <div className="spec-card">
            <h4>Weight</h4>
            <p>{product.weight}</p>
          </div>

          <div className="spec-card">
            <h4>Category</h4>
            <p>
              {product.category
                .replaceAll("-", " ")
                .toUpperCase()}
            </p>
          </div>

        </div>

      </section>

      <section className="related-products">

        <div className="section-heading">

          <h2>Related Products</h2>

          <p>
            Discover more handcrafted jewellery
            from the same category.
          </p>

        </div>

        <div className="related-grid">
                      {relatedProducts.map((item) => (

            <div
              key={item.id}
              className="related-card"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <h3>{item.name}</h3>

              <p>{item.weight}</p>

              <h4>
                ₹ {item.price.toLocaleString()}
              </h4>

              <Link
                to={`/jewellery/${item.id}`}
                className="view-related-btn"
              >
                View Details
              </Link>

            </div>

          ))}

        </div>

      </section>

      <section className="newsletter">

        <div className="newsletter-content">

          <h2>Stay Connected</h2>

          <p>
            Be the first to know about new
            collections, exclusive launches
            and festive offers.
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

export default JewelleryDetails;