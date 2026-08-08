import "./Hero.css";

import heroImage1 from "../../assets/images/hero/HERO.png";
import heroImage2 from "../../assets/images/hero/heroImage2.png";

import heroVideo1 from "../../assets/videos/hero/herovideo.mp4";
import heroVideo2 from "../../assets/videos/hero/hero2.mp4";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const slides = [
  {
    type: "image",
    src: heroImage1,
  },
  {
    type: "video",
    src: heroVideo1,
  },
  {
    type: "image",
    src: heroImage2,
  },
  {
    type: "video",
    src: heroVideo2,
  },
];

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            CRAFTED FOR LUXURY
          </span>

          <h1>
            Timeless Jewellery
            <br />
            Crafted For You.
          </h1>

          <p>
            Discover handcrafted gold and diamond jewellery that
            blends timeless Indian artistry with modern luxury.
            Every piece is designed to celebrate your elegance.
          </p>

          <div className="hero-buttons">

            <button className="hero-primary-btn" onClick={() => navigate("/collections")}>
              Explore Collection
            </button>

            <button className="hero-secondary-btn" onClick={() => navigate("/try-on")}>
              Virtual Try-On
            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-card">

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              speed={900}
              loop
              className="heroSwiper"
            >

              {slides.map((item, index) => (

                <SwiperSlide key={index}>
                                    {item.type === "image" ? (

                    <img
                      src={item.src}
                      alt={`Hero Slide ${index + 1}`}
                      className="hero-image"
                    />

                  ) : (

                    <video
                      className="hero-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >

                      <source
                        src={item.src}
                        type="video/mp4"
                      />

                      Your browser does not support the video tag.

                    </video>

                  )}

                </SwiperSlide>

              ))}

            </Swiper>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;