import "./FeaturedCollections.css";

const FeaturedCollections = () => {
  return (
    <section className="featured">

      <div className="featured-heading">

        <p>Luxury Picks</p>

        <h2>FEATURED COLLECTIONS</h2>

        <span>
          Explore our newly launched jewellery collections
        </span>

      </div>

      <div className="featured-grid">

        <div className="large-card">
          <img
            src="/images/featured/pendant.jpg"
            alt="Pendant Collection"
          />

          <div className="overlay">
            <h3>Pendant Collection</h3>
            <button>Explore →</button>
          </div>
        </div>

        <div className="right-side">

          <div className="small-card">
            <img
              src="/images/featured/earrings.jpg"
              alt="Earrings"
            />

            <div className="overlay">
              <h3>Earrings</h3>
              <button>Explore →</button>
            </div>
          </div>

          <div className="small-card">
            <img
              src="/images/featured/bangles.jpg"
              alt="Bangles"
            />

            <div className="overlay">
              <h3>Bangles</h3>
              <button>Explore →</button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default FeaturedCollections;