import HeroButtons from "./HeroButtons";

function HeroText() {
  return (
    <div className="hero-text">

      <span className="hero-tag">
        TIMELESS ELEGANCE
      </span>

      <h1 className="hero-title">
        Timeless Beauty,
        <br />
        Crafted For
        <span> Every Story.</span>
      </h1>

      <p className="hero-description">
        Discover handcrafted jewellery designed to celebrate
        love, traditions and unforgettable moments.
        Every masterpiece is created with precision,
        elegance and timeless craftsmanship.
      </p>

      <HeroButtons />

    </div>
  );
}

export default HeroText;