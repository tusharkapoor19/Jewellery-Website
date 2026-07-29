import "./SignatureBanner.css";
import bannerImg from "../../assets/banner/signature-banner.jpg";

const SignatureBanner = () => {
  return (
    <section className="signature-banner">

      <div className="signature-overlay">

        <div className="signature-content">

         <span>THE HIRANYA SIGNATURE</span>

<h2>
  Timeless Jewellery
  <br />
  Crafted For Generations
</h2>

<p>
  Every masterpiece is handcrafted with heritage,
  precision and timeless elegance.
</p>

        </div>

      </div>

      <img src={bannerImg} alt="Signature Collection" />

    </section>
  );
};

export default SignatureBanner;