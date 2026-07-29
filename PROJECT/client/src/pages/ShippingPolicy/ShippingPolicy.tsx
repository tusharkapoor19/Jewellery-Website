import "./ShippingPolicy.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const ShippingPolicy = () => {
  return (
 <>
    <TopBar />
    <Navbar />

    <div className="shipping-policy">

      {/* Banner */}
      <div className="shipping-banner">
        <h1>Shipping Policy</h1>
        <p>
          At <span>HIRANYA</span>, we ensure that every jewellery piece is
          carefully packaged and securely delivered to your doorstep with the
          utmost care and transparency.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="shipping-features">

        <div className="shipping-card">
          <div className="shipping-icon">📦</div>
          <h3>Secure Packaging</h3>
          <p>
            Every HIRANYA jewellery piece is carefully packed in premium,
            tamper-proof packaging to ensure it reaches you safely and in
            perfect condition.
          </p>
        </div>

        <div className="shipping-card">
          <div className="shipping-icon">🚚</div>
          <h3>Fast & Reliable Delivery</h3>
          <p>
            We partner with trusted courier services to provide timely and
            reliable delivery across India and selected international
            destinations.
          </p>
        </div>

        <div className="shipping-card">
          <div className="shipping-icon">🛡️</div>
          <h3>Insured Shipping</h3>
          <p>
            Every eligible order is securely shipped with protection,
            ensuring peace of mind until your jewellery reaches your
            doorstep.
          </p>
        </div>

      </div>

      {/* Main Content */}
      <div className="shipping-container">

        <section className="shipping-section">
          <h2>1. Shipping Overview</h2>
          <p>
            We are committed to providing a smooth and reliable shipping
            experience for all our customers. Every order is carefully
            inspected, securely packed, and dispatched through trusted courier
            partners to ensure safe delivery.
          </p>
        </section>

        <section className="shipping-section">
          <h2>2. Order Processing</h2>
          <p>
            Orders are usually processed within <strong>1–3 business days</strong>
            after successful payment confirmation. Customized or made-to-order
            jewellery may require additional processing time.
          </p>
        </section>

        <section className="shipping-section">
          <h2>3. Estimated Delivery</h2>

          <ul>
            <li>Metro Cities: 2–5 Business Days</li>
            <li>Other Cities: 4–7 Business Days</li>
            <li>Remote Locations: 5–10 Business Days</li>
          </ul>

          <p>
            Delivery timelines may vary during festivals, public holidays, or
            due to unforeseen logistics delays.
          </p>
        </section>

        <section className="shipping-section">
          <h2>4. Shipping Charges</h2>
          <p>
            We offer <strong>free standard shipping</strong> on eligible orders
            across India. Any applicable shipping charges for express delivery
            or remote locations will be displayed during checkout before
            payment confirmation.
          </p>
        </section>

        <section className="shipping-section">
          <h2>5. Order Tracking</h2>
          <p>
            Once your order has been dispatched, you will receive a confirmation
            email and SMS containing your tracking details. You can monitor your
            shipment using the provided tracking number.
          </p>
        </section>

        <section className="shipping-section">
          <h2>6. International Shipping</h2>
          <p>
            International shipping is available for selected destinations.
            Delivery timelines, customs duties, and taxes may vary depending
            upon the destination country.
          </p>
        </section>

        <section className="shipping-section">
          <h2>7. Delivery Delays</h2>
          <p>
            While we strive to deliver every order within the estimated
            timeframe, delays may occur due to weather conditions, natural
            disasters, courier disruptions, government regulations, or other
            unforeseen circumstances beyond our control.
          </p>
        </section>

        <section className="shipping-section">
          <h2>8. Damaged or Lost Shipments</h2>
          <p>
            If your package arrives damaged or appears to be tampered with,
            please contact our support team within <strong>48 hours</strong> of
            delivery. In the rare event that a shipment is lost in transit, we
            will investigate the matter with our logistics partner.
          </p>
        </section>

        <section className="shipping-section">
          <h2>9. Incorrect Shipping Address</h2>
          <p>
            Customers are requested to provide accurate shipping information
            while placing an order. HIRANYA will not be responsible for delays
            caused by incorrect or incomplete address details.
          </p>
        </section>

        <section className="shipping-section">
          <h2>10. Delivery Attempts</h2>
          <p>
            Courier partners generally make multiple delivery attempts. If the
            package cannot be delivered, it may be returned to us. Additional
            shipping charges may apply for re-dispatch.
          </p>
        </section>

        <section className="shipping-section">
          <h2>11. Need Assistance?</h2>

          <p>
            If you have any questions regarding shipping, delivery timelines,
            or order tracking, our customer support team is always happy to
            assist you.
          </p>

          <div className="shipping-contact">
            <p><strong>Email:</strong> support@hiranya.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Working Hours:</strong> Monday – Saturday | 10:00 AM – 7:00 PM</p>
          </div>
        </section>

        <section className="shipping-section">
          <h2>12. Policy Updates</h2>

          <p>
            HIRANYA reserves the right to update or modify this Shipping Policy
            at any time. Changes will be reflected on this page and become
            effective immediately upon publication.
          </p>

          <p className="shipping-update">
            Last Updated: March 2026
          </p>
        </section>

      </div>

    </div>
  
    <Footer />
  </>
  );

};

export default ShippingPolicy;