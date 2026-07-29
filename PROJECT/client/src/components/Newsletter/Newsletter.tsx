import { useState } from "react";
import "./Newsletter.css";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.custom(() => (
      <div
        style={{
          background: "#fff",
          border: "1px solid #d4af37",
          borderRadius: "18px",
          padding: "18px 22px",
          minWidth: "340px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          boxShadow: "0 15px 35px rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#d4af37",
            color: "#111",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          ✓
        </div>

        <div>
          <h4
            style={{
              margin: 0,
              color: "#1f1f1f",
              fontSize: "16px",
            }}
          >
            Thank you for subscribing!
          </h4>

          <p
            style={{
              margin: "6px 0 0",
              color: "#666",
              fontSize: "14px",
            }}
          >
            You'll be the first to know about our latest collections.
          </p>
        </div>
      </div>
    ));

    setEmail("");
  };

  return (
    <section className="home-newsletter">
      <div className="home-newsletter-container">
        <span className="newsletter-tag">
          STAY CONNECTED
        </span>

        <h2>
          Be The First To Discover
          <br />
          Timeless Elegance
        </h2>

        <p>
          Subscribe to receive exclusive launches, festive collections,
          styling inspiration and special offers from HIRANYA.
        </p>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Subscribe
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        <small>
          We respect your privacy. Unsubscribe anytime.
        </small>
      </div>
    </section>
  );
};

export default Newsletter;