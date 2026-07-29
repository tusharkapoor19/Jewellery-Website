import "./PrivacyPolicy.css";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <div className="privacy-policy">

        {/* Hero */}

        <div className="privacy-banner">

          <h1>Privacy Policy</h1>

          <p>
            At <span>HIRANYA</span>, protecting your personal information is
            one of our highest priorities. This Privacy Policy explains how we
            collect, use, store, and safeguard your information whenever you
            visit or make a purchase through our website.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="privacy-features">

          <div className="privacy-card">

            <div className="privacy-icon">🔒</div>

            <h3>Secure Data</h3>

            <p>
              Your personal information is protected using industry-standard
              security measures.
            </p>

          </div>

          <div className="privacy-card">

            <div className="privacy-icon">🛡️</div>

            <h3>Privacy First</h3>

            <p>
              We never sell your personal information to third parties for
              marketing purposes.
            </p>

          </div>

          <div className="privacy-card">

            <div className="privacy-icon">🤝</div>

            <h3>Transparent Practices</h3>

            <p>
              We clearly explain how your information is collected and used.
            </p>

          </div>

        </div>

        {/* Main Content */}

        <div className="privacy-container">

          <section className="privacy-section">

            <h2>1. Information We Collect</h2>

            <p>
              We may collect personal information including your name, email
              address, phone number, shipping address, billing address,
              payment information, and purchase history when you interact with
              our website.
            </p>

          </section>

          <section className="privacy-section">

            <h2>2. How We Use Your Information</h2>

            <ul>

              <li>Process and deliver your orders.</li>

              <li>Provide customer support.</li>

              <li>Verify transactions and prevent fraud.</li>

              <li>Improve our products and services.</li>

              <li>Send important order updates.</li>

              <li>Respond to customer inquiries.</li>

            </ul>

          </section>

          <section className="privacy-section">

            <h2>3. Payment Information</h2>

            <p>
              HIRANYA does not store your complete payment card details.
              Payments are processed through trusted and secure payment
              gateways that comply with applicable security standards.
            </p>

          </section>

          <section className="privacy-section">

            <h2>4. Cookies & Website Analytics</h2>

            <p>
              We may use cookies and similar technologies to improve website
              performance, remember your preferences, analyze visitor
              behaviour, and enhance your overall shopping experience.
            </p>

          </section>
                    <section className="privacy-section">

            <h2>5. Information Sharing</h2>

            <p>
              HIRANYA values your privacy and does not sell, rent, or trade
              your personal information. We may share limited information only
              with trusted third-party service providers such as payment
              gateways, logistics partners, and technology providers who assist
              us in delivering our services.
            </p>

          </section>

          <section className="privacy-section">

            <h2>6. Data Security</h2>

            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information against
              unauthorized access, disclosure, alteration, or destruction.
              While we strive to use commercially acceptable methods to secure
              your information, no internet transmission or electronic storage
              method can be guaranteed to be completely secure.
            </p>

          </section>

          <section className="privacy-section">

            <h2>7. Your Privacy Rights</h2>

            <p>
              You may request access to your personal information, update your
              account details, or request deletion of your information where
              permitted by applicable laws. Certain information may be retained
              where required for legal, tax, or business purposes.
            </p>

          </section>

          <section className="privacy-section">

            <h2>8. Third-Party Services</h2>

            <p>
              Our website may contain links to third-party websites or
              services. HIRANYA is not responsible for the privacy practices,
              security, or content of those external websites. We encourage you
              to review their respective privacy policies before sharing any
              personal information.
            </p>

          </section>
                    <section className="privacy-section">

            <h2>9. Children's Privacy</h2>

            <p>
              HIRANYA does not knowingly collect personal information from
              individuals under the age of 18. If we become aware that such
              information has been collected without appropriate parental or
              guardian consent, we will take reasonable steps to remove it
              from our records.
            </p>

          </section>

          <section className="privacy-section">

            <h2>10. Data Retention</h2>

            <p>
              We retain your personal information only for as long as
              necessary to fulfill the purposes described in this Privacy
              Policy, comply with legal obligations, resolve disputes, and
              enforce our agreements. When information is no longer required,
              it is securely deleted or anonymized.
            </p>

          </section>

          <section className="privacy-section">

            <h2>11. Contact Us</h2>

            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or the way your personal information is handled,
              please feel free to contact our customer support team.
            </p>

            <div className="privacy-contact">

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

          <section className="privacy-section">

            <h2>12. Changes to This Privacy Policy</h2>

            <p>
              HIRANYA reserves the right to update or modify this Privacy
              Policy at any time to reflect changes in our services, legal
              requirements, or business practices. Any updates will be posted
              on this page with the revised effective date.
            </p>

            <p className="privacy-update">
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

export default PrivacyPolicy;