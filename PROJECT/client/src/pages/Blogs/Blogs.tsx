import "./Blogs.css";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import blogHero from "../../assets/images/blog-hero.jpg";
import luxuryBanner from "../../assets/images/luxury-banner.jpg";
import blogCTA from "../../assets/images/blog-cta.jpg";

import blog1 from "../../assets/images/blog1.jpg";
import blog2 from "../../assets/images/blog2.jpg";
import blog3 from "../../assets/images/blog3.jpg";

import blogBanner1 from "../../assets/images/blog-banner1.jpg";
import blogBanner2 from "../../assets/images/blog-banner2.jpg";
import blogBanner3 from "../../assets/images/blog-banner3.jpg";

const Blogs = () => {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [email, setEmail] = useState("");

  const blogs = [

    {
      id: 1,
      title: "How To Choose The Perfect Diamond Ring",
      category: "Diamond",
      date: "12 July 2026",
      read: "5 min read",
      image: blog1,
      banner: blogBanner1,
      link: "/blogs/1",
      description:
        "Learn how to choose a timeless diamond ring by understanding cut, clarity, color, and carat while balancing elegance with your budget."
    },

    {
      id: 2,
      title: "Latest Gold Jewellery Trends In 2026",
      category: "Gold",
      date: "18 July 2026",
      read: "6 min read",
      image: blog2,
      banner: blogBanner2,
      link: "/blogs/2",
      description:
        "Explore the latest gold jewellery styles including layered necklaces, temple jewellery, dual-tone collections and minimalist luxury."
    },

    {
      id: 3,
      title: "Jewellery Care Tips To Keep Your Collection Shining",
      category: "Care",
      date: "22 July 2026",
      read: "4 min read",
      image: blog3,
      banner: blogBanner3,
      link: "/blogs/3",
      description:
        "Discover professional jewellery cleaning and storage tips to keep your gold, diamond and precious gemstone pieces sparkling for years."
    }

  ];

  const filteredBlogs = useMemo(() => {

    return blogs.filter((blog) => {

      const matchesCategory =
        category === "All" || blog.category === category;

      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [search, category]);

  const subscribe = () => {

    if (!email.trim()) {

      alert("Please enter your email.");

      return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      alert("Please enter a valid email address.");

      return;

    }

    alert("Thank you for subscribing!");

    setEmail("");

  };

  return (

    <>

      <TopBar />

      <Navbar />

      <section
        className="blogs-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url(${blogHero})`
        }}
      >

        <div className="blogs-hero-content">

          <span className="hero-tag">

            HIRANYA BLOGS

          </span>

          <h1>

            Luxury Jewellery
            Guides &
            Inspiration

          </h1>

          <p>

            Discover timeless jewellery trends,
            expert buying guides,
            styling inspiration,
            and jewellery care tips from HIRANYA.

          </p>

          <div className="hero-buttons">

            <a
              href="#blogs"
              className="primary-btn"
            >
              Explore Blogs
            </a>

            <Link
              to="/collections"
              className="secondary-btn"
            >
              Shop Collection
            </Link>

          </div>

        </div>

      </section>

      <section
        className="blogs-section"
        id="blogs"
      >

        <div className="container">

          <div className="search-filter">

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="filter-buttons">

              <button
                className={category === "All" ? "active" : ""}
                onClick={() => setCategory("All")}
              >
                All
              </button>

              <button
                className={category === "Diamond" ? "active" : ""}
                onClick={() => setCategory("Diamond")}
              >
                Diamond
              </button>

              <button
                className={category === "Gold" ? "active" : ""}
                onClick={() => setCategory("Gold")}
              >
                Gold
              </button>

              <button
                className={category === "Care" ? "active" : ""}
                onClick={() => setCategory("Care")}
              >
                Care
              </button>

            </div>

          </div>
                    <div
            className="featured-blog"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${luxuryBanner})`
            }}
          >

            <div className="featured-content">

              <span className="featured-tag">

                FEATURED ARTICLE

              </span>

              <h2>

                {blogs[0].title}

              </h2>

              <p>

                {blogs[0].description}

              </p>

              <div className="featured-card">

                <img
                  src={blogBanner1}
                  alt={blogs[0].title}
                />

                <div>

                  <p>

                    {blogs[0].date}

                  </p>

                  <p>

                    {blogs[0].read}

                  </p>

                </div>

              </div>

              <Link
                to={blogs[0].link}
                className="featured-btn"
              >

                Read Full Article →

              </Link>

            </div>

          </div>

          <div className="section-title">

            <span>

              LATEST ARTICLES

            </span>

            <h2>

              Explore Our Latest Blogs

            </h2>

            <p>

              Browse jewellery buying guides,
              styling inspiration and maintenance
              tips written by HIRANYA experts.

            </p>

          </div>

          <div className="blogs-grid">

            {

              filteredBlogs.length > 0 ? (

                filteredBlogs.map((blog) => (

                  <div
                    key={blog.id}
                    className="blog-card"
                  >

                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="blog-image"
                    />

                    <div className="blog-content">

                      <span className="blog-category">

                        {blog.category}

                      </span>

                      <h3>

                        {blog.title}

                      </h3>

                      <p>

                        {blog.description}

                      </p>

                      <div className="blog-meta">

                        <span>

                          {blog.date}

                        </span>

                        <span>

                          {blog.read}

                        </span>

                      </div>

                      <Link
                        to={blog.link}
                        className="read-more-btn"
                      >

                        Read More →

                      </Link>

                    </div>

                  </div>

                ))

              ) : (

                <div className="no-results">

                  <h3>

                    No Blogs Found

                  </h3>

                  <p>

                    Try changing your search or category.

                  </p>

                </div>

              )

            }

          </div>

        </div>

      </section>

      <section
        className="luxury-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.60),rgba(0,0,0,.60)),url(${luxuryBanner})`
        }}
      >

        <div className="luxury-content">

          <span>

            HIRANYA LUXURY

          </span>

          <h2>

            Jewellery Crafted
            For Generations

          </h2>

          <p>

            Every HIRANYA masterpiece combines
            traditional craftsmanship with
            contemporary elegance to create
            jewellery that tells your story.

          </p>

          <Link
            to="/collections"
            className="luxury-btn"
          >

            Explore Collection

          </Link>

        </div>

      </section>
            <section className="newsletter-section">

        <div className="newsletter-container">

          <span className="newsletter-tag">
            NEWSLETTER
          </span>

          <h2>
            Stay Updated With
            The Latest Jewellery Trends
          </h2>

          <p>
            Subscribe to receive jewellery guides,
            fashion inspiration, styling tips,
            exclusive launches and HIRANYA updates.
          </p>

          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={subscribe}
            >
              Subscribe
            </button>

          </div>

        </div>

      </section>

      <section
        className="bottom-cta"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.70),rgba(0,0,0,.70)),url(${blogCTA})`
        }}
      >

        <div className="cta-content">

          <span>

            DISCOVER HIRANYA

          </span>

          <h2>

            Celebrate Every
            Precious Moment
            With Timeless Jewellery

          </h2>

          <p>

            Browse our handcrafted collections of
            diamond rings, necklaces, earrings,
            bangles and bridal jewellery designed
            for every celebration.

          </p>

          <div className="cta-buttons">

            <Link
              to="/collections"
              className="primary-btn"
            >
              Shop Collection
            </Link>

            <Link
              to="/contact"
              className="secondary-btn"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default Blogs;