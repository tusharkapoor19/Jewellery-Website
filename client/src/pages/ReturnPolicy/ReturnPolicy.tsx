import "./ReturnPolicy.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import {
  Diamond,
  RefreshCw,
  Handshake,
} from "lucide-react";

const ReturnPolicy = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <div className="return-policy">

        {/* Hero Section */}

        <div className="return-banner">

          <h1>Returns & Refund Policy</h1>

          <p>
            At <span>HIRANYA</span>, every jewellery piece is crafted with
            exceptional care and undergoes rigorous quality inspection before
            dispatch. Due to the precious nature of our jewellery, returns are
            accepted only under specific circumstances mentioned in this policy.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="return-features">

          <div className="return-card">

            <div className="return-icon"><Diamond size={30} strokeWidth={1.6} /></div>

            <h3>Quality Assured</h3>

            <p>
              Every jewellery piece is carefully inspected to ensure premium
              craftsmanship and authenticity before shipping.
            </p>

          </div>

          <div className="return-card">

            <div className="return-icon"><RefreshCw size={30} strokeWidth={1.6} /></div>

            <h3>Easy Replacement</h3>

            <p>
              Eligible damaged or defective jewellery is replaced quickly after
              successful verification by our quality team.
            </p>

          </div>

          <div className="return-card">

            <div className="return-icon"><Handshake size={30} strokeWidth={1.6} /></div>

            <h3>Dedicated Support</h3>

            <p>
              Our customer care team is always available to guide you
              throughout the return, replacement, and claim process.
            </p>

          </div>

        </div>

        {/* Main Content */}

        <div className="return-container">

          <section className="return-section">

            <h2>1. Return Eligibility</h2>

            <p>
              At HIRANYA, every jewellery piece undergoes strict quality
              inspection before dispatch. Due to the precious nature of gold,
              diamond, and fine jewellery, we do not accept returns based on
              customer preference, change of mind, incorrect selection,
              sizing issues, or any personal reason after successful delivery.
            </p>

          </section>

          <section className="return-section">

            <h2>2. Eligible Return & Replacement Cases</h2>

            <p>
              Return or replacement requests will only be considered under
              the following circumstances:
            </p>

            <ul>

              <li>Product received damaged during transit.</li>

              <li>Incorrect product delivered.</li>

              <li>Verified manufacturing defect.</li>

              <li>Missing jewellery item or accessory inside the package.</li>

            </ul>

          </section>

          <section className="return-section">

            <h2>3. Mandatory Unboxing Video</h2>

            <p>
              Customers are required to record a continuous, uninterrupted
              unboxing video while opening the sealed package. The recording
              should clearly capture the shipping label, package condition,
              security seal, and the complete unboxing process.
            </p>

            <p>
              Claims related to transit damage, incorrect products, missing
              items, tampered packaging, or manufacturing defects may not be
              accepted without a valid unboxing video submitted during the
              claim process.
            </p>

          </section>

          <section className="return-section">

            <h2>4. Damaged During Transit</h2>

            <p>
              If your jewellery arrives damaged during transit, please contact
              our customer support team within <strong>48 hours</strong> of
              delivery. Kindly provide your order details, clear photographs,
              and the complete unboxing video for verification.
            </p>

            <p>
              After successful verification, HIRANYA will initiate an
              appropriate resolution according to this policy.
            </p>

          </section>
                    <section className="return-section">

            <h2>5. Product Inspection</h2>

            <p>
              Every approved return or replacement request is subject to a
              detailed quality inspection by HIRANYA's quality assurance team.
              The returned jewellery must be in its original condition along
              with the original packaging, invoice, authenticity certificate,
              and any accompanying accessories.
            </p>

            <p>
              Claims involving customer misuse, accidental damage,
              unauthorized alterations, improper storage, or normal wear and
              tear will not qualify for replacement or refund.
            </p>

          </section>

          <section className="return-section">

            <h2>6. Replacement Policy</h2>

            <p>
              HIRANYA believes in resolving genuine issues through
              replacement wherever possible. Once your claim has been
              verified, we will arrange a replacement of the same jewellery
              item.
            </p>

            <p>
              If the identical product is unavailable, an equivalent product
              of similar value may be offered, subject to customer approval
              and stock availability.
            </p>

          </section>

          <section className="return-section">

            <h2>7. Refund Policy</h2>

            <p>
              Refunds are not applicable for customer preference, change of
              mind, incorrect product selection, sizing concerns, or any
              other personal reason after successful delivery.
            </p>

            <p>
              Refunds will only be considered if an approved replacement
              cannot be provided due to permanent stock unavailability,
              discontinued products, or other exceptional circumstances
              determined solely by HIRANYA after successful verification.
            </p>

            <p>
              Where applicable, approved refunds will be processed to the
              customer's original payment method within 5–7 business days
              after final approval.
            </p>

          </section>

          <section className="return-section">

            <h2>8. Non-Returnable Products</h2>

            <ul>

              <li>Customized or Made-to-Order Jewellery</li>

              <li>Personalized or Engraved Jewellery</li>

              <li>Earrings (for hygiene reasons)</li>

              <li>Gift Cards & Promotional Vouchers</li>

              <li>Products damaged after delivery due to customer handling</li>

              <li>Products without original invoice or authenticity certificates</li>

              <li>Products returned without original packaging</li>

            </ul>

          </section>
                    <section className="return-section">

            <h2>9. Order Cancellation</h2>

            <p>
              Orders may be cancelled only before they have been dispatched
              from our fulfilment center. Once an order has been shipped,
              cancellation requests cannot be accepted and the order will be
              governed by this Return & Refund Policy.
            </p>

          </section>

          <section className="return-section">

            <h2>10. Customer Responsibilities</h2>

            <p>
              To ensure a smooth claim process, customers are requested to:
            </p>

            <ul>

              <li>Record a complete, uninterrupted unboxing video.</li>

              <li>Report damaged or incorrect deliveries within 48 hours.</li>

              <li>Keep the original invoice, authenticity certificate, and packaging safely.</li>

              <li>Do not wear, modify, resize, polish, or alter the jewellery before raising a claim.</li>

              <li>Cooperate with our verification process whenever requested.</li>

            </ul>

          </section>

          <section className="return-section">

            <h2>11. Need Assistance?</h2>

            <p>
              If you have any questions regarding returns, replacements,
              refunds, damaged deliveries, or your order, our customer
              support team will be happy to assist you.
            </p>

            <div className="return-contact">

              <p>
                <strong>Email:</strong> support@hiranya.com
              </p>

              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>

              <p>
                <strong>Working Hours:</strong> Monday – Saturday |
                10:00 AM – 7:00 PM
              </p>

            </div>

          </section>

          <section className="return-section">

            <h2>12. Policy Updates</h2>

            <p>
              HIRANYA reserves the right to revise, amend, or update this
              Return & Refund Policy at any time without prior notice. Any
              changes will be published on this page and will become
              effective immediately upon publication.
            </p>

            <p className="return-update">
              Last Updated: March 2026
            </p>

          </section>

        </div>

      </div>

      <Newsletter />
      <Footer />

    </>
  );
};

export default ReturnPolicy;