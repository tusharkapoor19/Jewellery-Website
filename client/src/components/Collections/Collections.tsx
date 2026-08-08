import "./Collections.css";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import {

    Navigation,

    Autoplay

} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { collections } from "./collectionsData";

const Collections = () => {

    const navigate = useNavigate();

    const openCollection = (

        collection: string

    ) => {

        navigate(

            "/collections",

            {

                state: {

                    collection

                }

            }

        );

    };

    return (

        <section className="collections-home">

            {/* ================= FEATURES ================= */}

            <div className="features">

                <div className="feature">

                    <i className="bi bi-patch-check-fill feature-icon"></i>

                    <div>

                        <h4>

                            100% Certified

                        </h4>

                        <p>

                            Hallmarked Jewellery

                        </p>

                    </div>

                </div>

                <div className="feature-divider"></div>

                <div className="feature">

                    <i className="bi bi-arrow-repeat feature-icon"></i>

                    <div>

                        <h4>

                            Easy Exchange

                        </h4>

                        <p>

                            Lifetime Exchange

                        </p>

                    </div>

                </div>

                <div className="feature-divider"></div>

                <div className="feature">

                    <i className="bi bi-gem feature-icon"></i>

                    <div>

                        <h4>

                            BIS Hallmarked

                        </h4>

                        <p>

                            Assured Quality

                        </p>

                    </div>

                </div>

                <div className="feature-divider"></div>

                <div className="feature">

                    <i className="bi bi-truck feature-icon"></i>

                    <div>

                        <h4>

                            Free Shipping

                        </h4>

                        <p>

                            Pan India

                        </p>

                    </div>

                </div>

                <div className="feature-divider"></div>

                <div className="feature">

                    <i className="bi bi-headset feature-icon"></i>

                    <div>

                        <h4>

                            Lifetime Service

                        </h4>

                        <p>

                            For Every Purchase

                        </p>

                    </div>

                </div>

            </div>

            <div className="section-heading">

                <p className="section-subtitle">

                    Luxury Categories

                </p>

                <h2>

                    EXPLORE OUR COLLECTIONS

                </h2>

                <div className="gold-divider">

                    <span></span>

                    <i className="bi bi-gem"></i>

                    <span></span>

                </div>

            </div>
                        {/* ================= SWIPER ================= */}

            <Swiper

                modules={[

                    Navigation,

                    Autoplay

                ]}

                navigation={true}

                loop={true}

                autoplay={{

                    delay: 3000,

                    disableOnInteraction: false

                }}

                spaceBetween={30}

                breakpoints={{

                    320: {

                        slidesPerView: 2

                    },

                    576: {

                        slidesPerView: 3

                    },

                    992: {

                        slidesPerView: 4

                    },

                    1400: {

                        slidesPerView: 4

                    }

                }}

                className="collections-slider"

            >

                {

                    collections.map(

                        (item) => (

                            <SwiperSlide
                                key={item.title}
                            >

                            <div className="collection-card">
                                <div className="collection-image">
                                    <div className="image-border">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />
                                    </div>
                                </div>
                                <h3>
                                    {item.title}
                                </h3>
                                <button
                                    className="view-all-btn"
                                    onClick={() => navigate("/collections")}
                                >
                                    View All Collections
                                </button>
                            </div>
                            </SwiperSlide>

                        )

                    )

                }

            </Swiper>
                        {/* ================= BOTTOM CTA ================= */}

            <div className="collections-footer">

                <div className="collections-footer-content">

                    <span>

                        Discover timeless elegance crafted for every occasion.

                    </span>

                    <button

                        className="view-all-btn"

                        onClick={() =>

                            navigate("/collections")

                        }

                    >

                        View All Collections

                    </button>

                </div>

            </div>

        </section>

    );

};

export default Collections;