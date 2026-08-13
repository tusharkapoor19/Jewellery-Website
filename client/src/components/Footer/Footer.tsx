import "./Footer.css";
import { Link } from "react-router-dom";

import {
  Camera,
  Users,
  MessageCircle,
  PlayCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ================= BRAND ================= */}
        <div className="footer-brand">
          <h2>HIRANYA</h2>

          <p>
            Crafting timeless jewellery with heritage,
            elegance and unmatched craftsmanship.
          </p>

          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <Camera size={18} strokeWidth={1.8} />
            </a>

            <a href="#" aria-label="Facebook">
              <Users size={18} strokeWidth={1.8} />
            </a>

            <a href="#" aria-label="Twitter">
              <MessageCircle size={18} strokeWidth={1.8} />
            </a>

            <a href="#" aria-label="YouTube">
              <PlayCircle size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* ================= SHOP ================= */}
        <div className="footer-links">
          <h3>Shop</h3>

          <Link to="/jewellery#rings">
            Rings
          </Link>

          <Link to="/jewellery#necklaces">
            Necklaces
          </Link>

          <Link to="/jewellery#earrings">
            Earrings
          </Link>

          <Link to="/jewellery#bangles">
            Bangles
          </Link>

          <Link to="/jewellery#all-jewellery">
            New Arrivals
          </Link>
        </div>

        {/* ================= CUSTOMER CARE ================= */}
        <div className="footer-links">
          <h3>Customer Care</h3>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/FAQ">
            FAQ
          </Link>

          <Link to="/shipping-policy">
            Shipping Policy
          </Link>

          <Link to="/return-policy">
            Returns & Refund Policy
          </Link>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>
        </div>

        {/* ================= ABOUT ================= */}
        <div className="footer-links">
          <h3>About</h3>

          <Link to="/about#about">
            About HIRANYA
          </Link>

          <Link to="/brand-story">
            Our Brand Story
          </Link>

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

        {/* ================= CONTACT ================= */}
        <div className="footer-contact">
          <h3>Contact</h3>

          <p>
            <MapPin size={16} strokeWidth={1.8} />
            <span>New Delhi, India</span>
          </p>

          <p>
            <Phone size={16} strokeWidth={1.8} />
            <span>+91 98765 43210</span>
          </p>

          <p>
            <Mail size={16} strokeWidth={1.8} />
            <span>support@hiranya.com</span>
          </p>

          <p>
            <Clock size={16} strokeWidth={1.8} />
            <span>Mon - Sat : 10:00 AM - 8:00 PM</span>
          </p>
        </div>

      </div>

      {/* ================= FOOTER BOTTOM ================= */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} HIRANYA. All Rights Reserved.
        </p>

        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} strokeWidth={1.8} />
        </button>

      </div>
    </footer>
  );
};

export default Footer;