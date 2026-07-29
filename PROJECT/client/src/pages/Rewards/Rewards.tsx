import "./Rewards.css";

import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Rewards = () => {

  return (

    <>

      <TopBar />

      <Navbar />

      <section className="rewards-section">

        <div className="rewards-container">

          <div className="rewards-hero">

            <div className="rewards-icon">

              <i className="fa-solid fa-gem"></i>

            </div>

            <div className="rewards-content">

              <span>

                HIRANYA REWARDS

              </span>

              <h1>

                Gold Membership

              </h1>

              <p>

                Enjoy exclusive rewards,
                premium benefits and
                luxury shopping privileges
                reserved for HIRANYA members.

              </p>

            </div>

          </div>

          <div className="membership-card">

            <div className="points">

              <h2>

                1,250

              </h2>

              <span>

                Reward Points

              </span>

            </div>

            <div className="status">

              <i className="fa-solid fa-crown"></i>

              <h3>

                Gold Member

              </h3>

              <p>

                Active Membership

              </p>

            </div>

          </div>

          <div className="benefits-grid">

            <div className="benefit-card">

              <i className="fa-solid fa-tags"></i>

              <h3>

                Exclusive Discounts

              </h3>

              <p>

                Special offers available
                only for members.

              </p>

            </div>

            <div className="benefit-card">

              <i className="fa-solid fa-truck-fast"></i>

              <h3>

                Priority Delivery

              </h3>

              <p>

                Faster delivery on all
                premium purchases.

              </p>

            </div>

            <div className="benefit-card">

              <i className="fa-solid fa-gift"></i>

              <h3>

                Birthday Gifts

              </h3>

              <p>

                Receive exclusive surprise
                gifts on your birthday.

              </p>

            </div>

            <div className="benefit-card">

              <i className="fa-solid fa-crown"></i>

              <h3>

                VIP Access

              </h3>

              <p>

                Early access to luxury
                launches and collections.

              </p>

            </div>

          </div>

          <div className="reward-action">

            <Link
              to="/jewellery"
              className="reward-btn"
            >

              Explore Jewellery

            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default Rewards;