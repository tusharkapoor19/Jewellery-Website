import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>HIRANYA</h2>

          <p>
            Crafting timeless jewellery with heritage,
            elegance and unmatched craftsmanship.
          </p>

          <div className="footer-social">

            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>

            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>

            <a href="#">
              <i className="bi bi-twitter-x"></i>
            </a>

            <a href="#">
              <i className="bi bi-youtube"></i>
            </a>

          </div>

        </div>
                <div className="footer-links">

          <h3>Shop</h3>

          <Link to="/jewellery#rings">Rings</Link>

<Link to="/jewellery#necklaces">Necklaces</Link>

<Link to="/jewellery#earrings">Earrings</Link>

<Link to="/jewellery#bangles">Bangles</Link>

<Link to="/jewellery#all-jewellery">New Arrivals</Link>

        </div>

        <div className="footer-links">

  <h3>Customer Care</h3>

  <Link to="/contact">
    Contact Us
  </Link>

  <Link to="/FAQ">FAQ</Link>

  <Link to="/shipping-policy">Shipping Policy</Link>

<Link to="/return-policy">Returns & Refund Policy</Link>

 <Link to="/privacy-policy">Privacy Policy</Link>

</div>

        <div className="footer-links">

  <h3>About</h3>

  <Link to="/about#about">
    About HIRANYA
  </Link>

  <Link to="/brand-story">Our Brand Story</Link>

  <Link to="/BehindTheCraft">
    Behind The Craft
  </Link>

  <Link to="/store-locator">
    Store Locator
  </Link>
  
  <Link to="/terms-conditions">
    Terms & Conditions
  </Link>

</div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>
            <i className="bi bi-geo-alt-fill"></i>
            New Delhi, India
          </p>

          <p>
            <i className="bi bi-telephone-fill"></i>
            +91 98765 43210
          </p>

          <p>
            <i className="bi bi-envelope-fill"></i>
            support@hiranya.com
          </p>

          <p>
            <i className="bi bi-clock-fill"></i>
            Mon - Sat : 10:00 AM - 8:00 PM
          </p>

        </div>

      </div>
            <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} HIRANYA. All Rights Reserved.
        </p>

        <button
          className="back-to-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }
        >
          <i className="bi bi-arrow-up"></i>
        </button>

      </div>

    </footer>
  );
};

export default Footer;