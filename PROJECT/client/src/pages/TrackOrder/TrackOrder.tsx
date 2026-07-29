import "./TrackOrder.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const TrackOrder = () => {

  const [orderId, setOrderId] =
    useState("");

  const [searched, setSearched] =
    useState(false);

  const handleTrack = () => {

    setSearched(true);

  };

  return (

    <>

      <TopBar />

      <Navbar />

      <section className="track-section">

        <div className="track-container">

          {/* Hero */}

          <div className="track-hero">

            <div className="track-icon">

              <i className="fa-solid fa-truck-fast"></i>

            </div>

            <div className="track-content">

              <span>

                ORDER TRACKING

              </span>

              <h1>

                Track Your Order

              </h1>

              <p>

                Enter your Order ID to
                check the latest delivery
                status of your jewellery.

              </p>

            </div>

          </div>

          {/* Search Box */}

          <div className="track-card">

            <h2>

              Track Order

            </h2>

            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) =>
                setOrderId(
                  e.target.value
                )
              }
            />

            <button
              className="track-btn"
              onClick={handleTrack}
            >

              <i className="fa-solid fa-magnifying-glass"></i>

              Track Order

            </button>

          </div>

          {/* Result */}

          {searched && (

            <>

              {orderId.trim().toUpperCase() ===
              "HRY123456789" ? (

                <div className="tracking-result">

                  <h2>

                    Order Found

                  </h2>

                  <div className="order-info">

                    <p>

                      <strong>Order ID:</strong>

                      HRY123456789

                    </p>

                    <p>

                      <strong>Product:</strong>

                      Diamond Solitaire Ring

                    </p>

                    <p>

                      <strong>Status:</strong>

                      <span className="status">

                        Out For Delivery

                      </span>

                    </p>

                    <p>

                      <strong>
                        Estimated Delivery:
                      </strong>

                      22 July 2026

                    </p>

                  </div>

                  <div className="tracking-timeline">

                    <div className="timeline-item completed">

                      <i className="fa-solid fa-circle-check"></i>

                      <span>

                        Order Confirmed

                      </span>

                    </div>

                    <div className="timeline-item completed">

                      <i className="fa-solid fa-circle-check"></i>

                      <span>

                        Packed

                      </span>

                    </div>

                    <div className="timeline-item completed">

                      <i className="fa-solid fa-circle-check"></i>

                      <span>

                        Shipped

                      </span>

                    </div>

                    <div className="timeline-item active">

                      <i className="fa-solid fa-truck-fast"></i>

                      <span>

                        Out For Delivery

                      </span>

                    </div>

                    <div className="timeline-item">

                      <i className="fa-regular fa-circle"></i>

                      <span>

                        Delivered

                      </span>

                    </div>

                  </div>
                                    <div className="track-actions">

                    <Link
                      to="/contact"
                      className="track-action-btn"
                    >

                      <i className="fa-solid fa-headset"></i>

                      Need Help?

                    </Link>

                    <Link
                      to="/jewellery"
                      className="track-action-btn secondary"
                    >

                      <i className="fa-solid fa-gem"></i>

                      Continue Shopping

                    </Link>

                  </div>

                  <div className="support-box">

                    <h3>

                      Customer Support

                    </h3>

                    <p>

                      📞 +91 1800-123-4567

                    </p>

                    <p>

                      ✉️ support@hiranya.com

                    </p>

                    <p>

                      🕒 Mon - Sat | 10:00 AM - 7:00 PM

                    </p>

                  </div>

                </div>

              ) : (

                <div className="tracking-result error">

                  <i className="fa-solid fa-circle-xmark"></i>

                  <h2>

                    Order Not Found

                  </h2>

                  <p>

                    Please check your
                    Order ID and try again.

                  </p>

                </div>

              )}

            </>

          )}

          {/* Features */}

          <div className="track-features">

            <div className="feature-card">

              <i className="fa-solid fa-box"></i>

              <h3>

                Secure Packaging

              </h3>

              <p>

                Every jewellery piece is
                packed with utmost care.

              </p>

            </div>

            <div className="feature-card">

              <i className="fa-solid fa-shield-halved"></i>

              <h3>

                Insured Delivery

              </h3>

              <p>

                Every shipment is fully
                insured until delivered.

              </p>

            </div>

            <div className="feature-card">

              <i className="fa-solid fa-headset"></i>

              <h3>

                24×7 Support

              </h3>

              <p>

                Our support team is
                always ready to help.

              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default TrackOrder;