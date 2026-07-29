import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CookieConsent.css";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">

      <div className="cookie-content">

        <div className="cookie-icon">
          🍪
        </div>

        <div className="cookie-text">

          <h3>We Value Your Privacy</h3>

          <p>
            We use cookies to enhance your shopping experience,
            remember your preferences, analyze website traffic,
            and improve our services.
            By clicking <strong>Accept All</strong>, you agree
            to our use of cookies.

            <Link to="/privacy-policy">
              {" "}Read Privacy Policy
            </Link>
          </p>

        </div>

      </div>

      <div className="cookie-buttons">

        <button
          className="reject-btn"
          onClick={rejectCookies}
        >
          Reject
        </button>

        <button
          className="accept-btn"
          onClick={acceptCookies}
        >
          Accept All
        </button>

      </div>

    </div>
  );
};

export default CookieConsent;