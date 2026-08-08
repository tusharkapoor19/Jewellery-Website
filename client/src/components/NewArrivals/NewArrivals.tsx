import "./NewArrivals.css";

import ring from "../../assets/new/ring.jpg";
import necklace from "../../assets/new/necklace.jpg";
import earrings from "../../assets/new/earrings.jpg";
import bracelet from "../../assets/new/bracelet.jpg";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Diamond Ring",
    image: ring,
    price: "₹32,999",
    oldPrice: "₹36,999",
    badge: "NEW",
  },
  {
    id: 2,
    name: "Gold Necklace",
    image: necklace,
    price: "₹68,499",
    oldPrice: "₹74,999",
    badge: "TRENDING",
  },
  {
    id: 3,
    name: "Elegant Earrings",
    image: earrings,
    price: "₹18,999",
    oldPrice: "₹21,499",
    badge: "HOT",
  },
  {
    id: 4,
    name: "Luxury Bracelet",
    image: bracelet,
    price: "₹24,999",
    oldPrice: "₹28,499",
    badge: "NEW",
  },
];

const NewArrivals = () => {
  const navigate = useNavigate();
  return (
    <section className="new-arrivals">

      <div className="section-heading">

        <span>Latest Collection</span>

        <h2>New Arrivals</h2>

        <p>
          Discover the newest handcrafted jewellery pieces designed with
          timeless elegance.
        </p>

      </div>

      <div className="arrival-grid">

        {products.map((item) => (

          <div className="arrival-card" key={item.id}>

            <span className="badge">
              {item.badge}
            </span>

            <button className="wishlist">
              <i className="bi bi-heart"></i>
            </button>

            <div className="arrival-image">

              <img src={item.image} alt={item.name} />

            </div>

            <div className="arrival-content">

              <h3>{item.name}</h3>

              <div className="rating">
                ★★★★★
              </div>

              <div className="price">

                <span>{item.price}</span>

                <del>{item.oldPrice}</del>

              </div>

              <button className="arrival-btn" onClick={() => navigate("/collections")}>
                View Collection
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default NewArrivals;