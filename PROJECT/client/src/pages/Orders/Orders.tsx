import "./Orders.css";

import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Orders = () => {

  return (

    <>

      <TopBar />

      <Navbar />

      <section className="orders-section">

        <div className="orders-container">

          {/* Hero */}

          <div className="orders-hero">

            <div className="orders-icon">

              <i className="fa-solid fa-box"></i>

            </div>

            <div className="orders-content">

              <span>

                HIRANYA ORDERS

              </span>

              <h1>

                My Orders

              </h1>

              <p>

                Track your luxury jewellery
                purchases and stay updated
                with every order placed at
                HIRANYA.

              </p>

            </div>

          </div>

          {/* Empty State */}

          <div className="orders-card">

            <i className="fa-solid fa-box-open empty-icon"></i>

            <h2>

              No Orders Yet

            </h2>

            <p>

              You haven't placed any orders
              yet.

              <br />

              Start exploring our premium
              jewellery collections and find
              something truly special.

            </p>

            <Link
              to="/jewellery"
              className="shop-btn"
            >

              Explore Jewellery

            </Link>

          </div>

          {/* Benefits */}

          <div className="order-benefits">

            <div className="benefit-card">

              <i className="fa-solid fa-truck-fast"></i>

              <h3>

                Fast Delivery

              </h3>

              <p>

                Secure and timely delivery
                across India.

              </p>

            </div>

            <div className="benefit-card">

              <i className="fa-solid fa-shield-heart"></i>

              <h3>

                Authentic Jewellery

              </h3>

              <p>

                100% certified and genuine
                jewellery.

              </p>

            </div>

            <div className="benefit-card">

              <i className="fa-solid fa-rotate-left"></i>

              <h3>

                Easy Returns

              </h3>

              <p>

                Hassle-free return policy on
                eligible products.

              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default Orders;