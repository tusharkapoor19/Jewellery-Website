import "./Testimonials.css";

import user1 from "../../assets/testimonials/user1.jpg";
import user2 from "../../assets/testimonials/user2.jpg";
import user3 from "../../assets/testimonials/user3.jpg";

const reviews = [
  {
    image: user1,
    name: "Priya Sharma",
    city: "New Delhi",
    review:
      "The craftsmanship is exceptional. My bridal necklace exceeded every expectation. Truly luxurious.",
  },
  {
    image: user2,
    name: "Ananya Mehta",
    city: "Mumbai",
    review:
      "Beautiful packaging, timely delivery and amazing quality. HIRANYA has become my favourite jewellery brand.",
  },
  {
    image: user3,
    name: "Riya Kapoor",
    city: "Jaipur",
    review:
      "Every detail feels premium. The jewellery shines beautifully and the finishing is simply perfect.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonial-heading">
        <span>OUR CUSTOMERS</span>

        <h2>Stories That Shine</h2>

        <p>
          Thousands of happy customers trust HIRANYA for timeless elegance.
        </p>
      </div>

      <div className="testimonial-grid">
        {reviews.map((item) => (
          <div className="testimonial-card" key={item.name}>
            <figure>
              <img src={item.image} alt={item.name} />
            </figure>

            <div className="quote-icon">❝</div>

            <div className="stars">★★★★★</div>

            <blockquote className="review">
              {item.review}
            </blockquote>

            <h3>{item.name}</h3>

            <span>{item.city}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;