import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Gem,
  ShieldCheck,
  Truck,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-hot-toast";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import productService from "../../services/productService";

import { Product } from "../../types";

import "./Jewellery.css";


interface JewelleryNavState {
  category?: string;
  metal?: string;
}

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "newest";


const Jewellery = () => {

  const location = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  /* =====================================================
     FILTER STATE
  ===================================================== */

  const [activeMetal, setActiveMetal] =
    useState("All Metals");

  const [activeCategory, setActiveCategory] =
    useState("All Jewellery");

  const [sortOption, setSortOption] =
    useState<SortOption>("featured");


  /* =====================================================
     CUSTOM DROPDOWN STATE
  ===================================================== */

  const [metalDropdownOpen, setMetalDropdownOpen] =
    useState(false);

  const [categoryDropdownOpen, setCategoryDropdownOpen] =
    useState(false);

  const [sortDropdownOpen, setSortDropdownOpen] =
    useState(false);


  /* =====================================================
     PRICE STATE
  ===================================================== */

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedMinPrice, setSelectedMinPrice] =
    useState(0);

  const [selectedMaxPrice, setSelectedMaxPrice] =
    useState(0);


  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const [newsletterEmail, setNewsletterEmail] =
    useState("");

  const [subscribed, setSubscribed] =
    useState(false);


  /* =====================================================
     FILTER REF
  ===================================================== */

  const filterRef =
    useRef<HTMLElement | null>(null);


  /* =====================================================
     FILTER OPTIONS
  ===================================================== */

  const metals = [
    "All Metals",
    "Gold",
    "Silver",
    "White Gold",
    "Rose Gold",
    "Platinum",
  ];


  const categories = [
    "All Jewellery",
    "Rings",
    "Necklaces",
    "Earrings",
    "Bracelets",
    "Bangles",
    "Chains",
    "Pendants",
    "Mangalsutra",
    "Anklets",
    "Nose Pins",
    "Men's Jewellery",
    "Kids Jewellery",
    "Idols & Coins",
  ];


  const sortOptions: {
    value: SortOption;
    label: string;
  }[] = [
    {
      value: "featured",
      label: "Featured",
    },
    {
      value: "price-low",
      label: "Price: Low to High",
    },
    {
      value: "price-high",
      label: "Price: High to Low",
    },
    {
      value: "newest",
      label: "Newest First",
    },
  ];


  /* =====================================================
     LOAD PRODUCTS
  ===================================================== */

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const data =
          await productService.getAllProducts();

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to load jewellery:",
          error
        );

        toast.error(
          "Unable to load jewellery."
        );

      } finally {

        setLoading(false);

      }

    };


    loadProducts();

  }, []);


  /* =====================================================
     NAVIGATION STATE
  ===================================================== */

  useEffect(() => {

    const navState =
      location.state as JewelleryNavState | null;

    if (!navState) return;


    if (
      navState.category &&
      categories.includes(navState.category)
    ) {

      setActiveCategory(
        navState.category
      );

    }


    if (
      navState.metal &&
      metals.includes(navState.metal)
    ) {

      setActiveMetal(
        navState.metal
      );

    }


    setTimeout(() => {

      filterRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 700);

  }, [location.state]);


  /* =====================================================
     PRICE RANGE
  ===================================================== */

  useEffect(() => {

    if (!products.length) return;


    const prices =
      products
        .map(product =>
          Number(product.price)
        )
        .filter(price =>
          Number.isFinite(price)
        );


    if (!prices.length) return;


    const lowest =
      Math.floor(
        Math.min(...prices)
      );

    const highest =
      Math.ceil(
        Math.max(...prices)
      );


    setMinPrice(lowest);
    setMaxPrice(highest);

    setSelectedMinPrice(lowest);
    setSelectedMaxPrice(highest);

  }, [products]);


  /* =====================================================
     FORMAT PRICE
  ===================================================== */

  const formatPrice = (
    price: number
  ) => {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(price);

  };


  /* =====================================================
     PRICE PRESETS
  ===================================================== */

  const pricePresets = [
    {
      label: "Under ₹10K",
      min: 0,
      max: 10000,
    },
    {
      label: "₹10K – ₹25K",
      min: 10000,
      max: 25000,
    },
    {
      label: "₹25K – ₹50K",
      min: 25000,
      max: 50000,
    },
    {
      label: "₹50K+",
      min: 50000,
      max: Number.MAX_SAFE_INTEGER,
    },
  ];


  /* =====================================================
     PRICE PRESET
  ===================================================== */

  const applyPricePreset = (
    min: number,
    max: number
  ) => {

    const actualMin =
      Math.max(
        minPrice,
        min
      );

    const actualMax =
      Math.min(
        maxPrice,
        max
      );


    setSelectedMinPrice(
      actualMin
    );

    setSelectedMaxPrice(
      actualMax
    );

  };


  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredProducts =
    useMemo(() => {

      let result =
        [...products];


      /* METAL */

      if (
        activeMetal !==
        "All Metals"
      ) {

        result =
          result.filter(
            product =>
              String(
                product.metal
              ).toLowerCase() ===
              activeMetal.toLowerCase()
          );

      }


      /* CATEGORY */

      if (
        activeCategory !==
        "All Jewellery"
      ) {

        result =
          result.filter(
            product =>
              String(
                product.category
              ).toLowerCase() ===
              activeCategory.toLowerCase()
          );

      }


      /* PRICE */

      result =
        result.filter(
          product => {

            const price =
              Number(
                product.price
              );

            return (
              price >=
                selectedMinPrice &&
              price <=
                selectedMaxPrice
            );

          }
        );


      /* SORT */

      if (
        sortOption ===
        "price-low"
      ) {

        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );

      }


      if (
        sortOption ===
        "price-high"
      ) {

        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );

      }


      if (
        sortOption ===
        "newest"
      ) {

        result.sort(
          (a, b) => {

            const dateA =
              new Date(
                String(
                  a.createdAt
                )
              ).getTime();

            const dateB =
              new Date(
                String(
                  b.createdAt
                )
              ).getTime();

            return dateB - dateA;

          }
        );

      }


      return result;

    }, [
      products,
      activeMetal,
      activeCategory,
      selectedMinPrice,
      selectedMaxPrice,
      sortOption,
    ]);


  /* =====================================================
     FILTER STATUS
  ===================================================== */

  const hasFilters =
    activeMetal !== "All Metals" ||
    activeCategory !== "All Jewellery" ||
    selectedMinPrice > minPrice ||
    selectedMaxPrice < maxPrice ||
    sortOption !== "featured";


  /* =====================================================
     RESET
  ===================================================== */

  const resetFilters = () => {

    setActiveMetal(
      "All Metals"
    );

    setActiveCategory(
      "All Jewellery"
    );

    setSortOption(
      "featured"
    );

    setSelectedMinPrice(
      minPrice
    );

    setSelectedMaxPrice(
      maxPrice
    );

    setMetalDropdownOpen(false);
    setCategoryDropdownOpen(false);
    setSortDropdownOpen(false);

  };


  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const handleNewsletter = () => {

    if (!newsletterEmail.trim()) {

      toast.error(
        "Please enter your email."
      );

      return;

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailRegex.test(
        newsletterEmail
      )
    ) {

      toast.error(
        "Please enter a valid email."
      );

      return;

    }


    const stored =
      localStorage.getItem(
        "hiranyaNewsletter"
      );


    if (
      stored ===
      newsletterEmail
    ) {

      toast(
        "Already subscribed ❤️"
      );

      return;

    }


    localStorage.setItem(
      "hiranyaNewsletter",
      newsletterEmail
    );


    setSubscribed(true);
    setNewsletterEmail("");


    toast.success(
      "✨ Welcome to HIRANYA!"
    );


    setTimeout(() => {

      setSubscribed(false);

    }, 3000);

  };


  /* =====================================================
     CLOSE OTHER DROPDOWNS
  ===================================================== */

  const openMetalDropdown = () => {

    setMetalDropdownOpen(
      !metalDropdownOpen
    );

    setCategoryDropdownOpen(false);
    setSortDropdownOpen(false);

  };


  const openCategoryDropdown = () => {

    setCategoryDropdownOpen(
      !categoryDropdownOpen
    );

    setMetalDropdownOpen(false);
    setSortDropdownOpen(false);

  };


  const openSortDropdown = () => {

    setSortDropdownOpen(
      !sortDropdownOpen
    );

    setMetalDropdownOpen(false);
    setCategoryDropdownOpen(false);

  };


  /* =====================================================
     SORT LABEL
  ===================================================== */

  const selectedSortLabel =
    sortOptions.find(
      option =>
        option.value === sortOption
    )?.label || "Featured";


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <>

      <TopBar />

      <Navbar />


      {/* =================================================
          HERO
      ================================================= */}

      <section className="jewellery-hero">

        <div className="hero-overlay"></div>

        <div className="hero-glow"></div>


        <div className="hero-content">

          <span>
            HIRANYA • FINE JEWELLERY
          </span>


          <h1>
            Timeless Luxury
            <br />
            Crafted Forever
          </h1>


          <p>
            Discover handcrafted jewellery
            inspired by timeless elegance,
            exceptional purity and
            luxurious craftsmanship.
          </p>


          <div className="hero-buttons">

            <button
              className="gold-btn"

              onClick={() => {

                filterRef.current?.scrollIntoView({
                  behavior: "smooth",
                });

              }}
            >

              Explore Collection

              <ArrowRight
                size={18}
              />

            </button>


            <button
              className="glass-btn"
            >
              Book Consultation
            </button>

          </div>


          <div className="hero-features">

            <div>
              <Gem size={18} />
              BIS Hallmarked
            </div>

            <div>
              <ShieldCheck size={18} />
              Lifetime Exchange
            </div>

            <div>
              <Truck size={18} />
              Free Shipping
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          JEWELLERY
      ================================================= */}

      <section
        className="jewellery-page"
        id="shop"
        ref={filterRef}
      >


        {/* SECTION TITLE */}

        <div className="section-title">

          <span>
            PREMIUM JEWELLERY
          </span>

          <h2>
            Find Your Signature Piece
          </h2>

          <p>
            Refine your selection by metal,
            jewellery type and price.
          </p>

        </div>


        {/* =================================================
            FILTER PANEL
        ================================================= */}

        <div className="jewellery-filter-panel">


          {/* =================================================
              REFINE
          ================================================= */}

          <div className="filter-panel-header">

            <div className="filter-heading">

              <SlidersHorizontal
                size={19}
              />

              <div>

                <span>
                  REFINE COLLECTION
                </span>


                {hasFilters && (

                  <em>
                    FILTERS APPLIED
                  </em>

                )}

              </div>

            </div>

          </div>


          {/* =================================================
              METAL + JEWELLERY
          ================================================= */}

          <div className="filter-dropdown-row">


            {/* =================================================
                METAL DROPDOWN
            ================================================= */}

            <div className="filter-group filter-dropdown-group">

              <div className="filter-group-title">

                <span>
                  SHOP BY METAL
                </span>

              </div>


              <div className="premium-select custom-select">


                <button
                  type="button"
                  className="custom-select-trigger"

                  onClick={
                    openMetalDropdown
                  }
                >

                  <span>
                    {activeMetal}
                  </span>


                  <ChevronDown
                    size={17}

                    className={
                      metalDropdownOpen
                        ? "select-arrow open"
                        : "select-arrow"
                    }
                  />

                </button>


                {metalDropdownOpen && (

                  <div className="custom-select-menu">

                    {metals.map(
                      metal => (

                        <button
                          type="button"

                          key={metal}

                          className={
                            activeMetal === metal
                              ? "custom-option active"
                              : "custom-option"
                          }

                          onClick={() => {

                            setActiveMetal(
                              metal
                            );

                            setMetalDropdownOpen(
                              false
                            );

                          }}
                        >

                          <span>
                            {metal}
                          </span>


                          {activeMetal ===
                            metal && (

                            <span>
                              ✓
                            </span>

                          )}

                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


            {/* =================================================
                JEWELLERY DROPDOWN
            ================================================= */}

            <div className="filter-group filter-dropdown-group">

              <div className="filter-group-title">

                <span>
                  SHOP BY JEWELLERY
                </span>

              </div>


              <div className="premium-select custom-select">


                <button
                  type="button"
                  className="custom-select-trigger"

                  onClick={
                    openCategoryDropdown
                  }
                >

                  <span>
                    {activeCategory}
                  </span>


                  <ChevronDown
                    size={17}

                    className={
                      categoryDropdownOpen
                        ? "select-arrow open"
                        : "select-arrow"
                    }
                  />

                </button>


                {categoryDropdownOpen && (

                  <div className="custom-select-menu">

                    {categories.map(
                      category => (

                        <button
                          type="button"

                          key={category}

                          className={
                            activeCategory === category
                              ? "custom-option active"
                              : "custom-option"
                          }

                          onClick={() => {

                            setActiveCategory(
                              category
                            );

                            setCategoryDropdownOpen(
                              false
                            );

                          }}
                        >

                          <span>
                            {category}
                          </span>


                          {activeCategory ===
                            category && (

                            <span>
                              ✓
                            </span>

                          )}

                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


          </div>


          {/* =================================================
              PRICE
          ================================================= */}

          <div className="filter-bottom-grid">


            <div className="price-filter">

              <div className="filter-group-title">

                <span>
                  PRICE RANGE
                </span>


                <strong>

                  {formatPrice(
                    selectedMinPrice
                  )}

                  {" – "}

                  {formatPrice(
                    selectedMaxPrice
                  )}

                </strong>

              </div>


              <div className="price-range">


                {/* MIN */}

                <input
                  type="range"

                  min={minPrice}

                  max={maxPrice}

                  value={
                    selectedMinPrice
                  }

                  onChange={(e) => {

                    const value =
                      Number(
                        e.target.value
                      );


                    if (
                      value <=
                      selectedMaxPrice
                    ) {

                      setSelectedMinPrice(
                        value
                      );

                    }

                  }}

                  className="range-slider"
                />


                {/* MAX */}

                <input
                  type="range"

                  min={minPrice}

                  max={maxPrice}

                  value={
                    selectedMaxPrice
                  }

                  onChange={(e) => {

                    const value =
                      Number(
                        e.target.value
                      );


                    if (
                      value >=
                      selectedMinPrice
                    ) {

                      setSelectedMaxPrice(
                        value
                      );

                    }

                  }}

                  className="range-slider range-top"
                />

              </div>


              <div className="price-values">

                <span>
                  {formatPrice(
                    minPrice
                  )}
                </span>

                <span>
                  {formatPrice(
                    maxPrice
                  )}
                </span>

              </div>


              {/* QUICK PRICE */}

              <div className="price-presets">

                {pricePresets.map(
                  preset => {

                    const presetMin =
                      Math.max(
                        minPrice,
                        preset.min
                      );

                    const presetMax =
                      Math.min(
                        maxPrice,
                        preset.max
                      );


                    const isActive =
                      selectedMinPrice ===
                        presetMin &&
                      selectedMaxPrice ===
                        presetMax;


                    return (

                      <button
                        type="button"

                        key={
                          preset.label
                        }

                        className={
                          isActive
                            ? "active"
                            : ""
                        }

                        onClick={() =>
                          applyPricePreset(
                            preset.min,
                            preset.max
                          )
                        }
                      >

                        {preset.label}

                      </button>

                    );

                  }
                )}

              </div>

            </div>


            {/* =================================================
                SORT
            ================================================= */}

            <div className="sort-filter">

              <div className="filter-group-title">

                <span>
                  SORT BY
                </span>

              </div>


              <div className="premium-select custom-select">


                <button
                  type="button"

                  className="custom-select-trigger"

                  onClick={
                    openSortDropdown
                  }
                >

                  <span>
                    {selectedSortLabel}
                  </span>


                  <ChevronDown
                    size={17}

                    className={
                      sortDropdownOpen
                        ? "select-arrow open"
                        : "select-arrow"
                    }
                  />

                </button>


                {sortDropdownOpen && (

                  <div className="custom-select-menu">

                    {sortOptions.map(
                      option => (

                        <button
                          type="button"

                          key={
                            option.value
                          }

                          className={
                            sortOption ===
                            option.value
                              ? "custom-option active"
                              : "custom-option"
                          }

                          onClick={() => {

                            setSortOption(
                              option.value
                            );

                            setSortDropdownOpen(
                              false
                            );

                          }}
                        >

                          <span>
                            {option.label}
                          </span>


                          {sortOption ===
                            option.value && (

                            <span>
                              ✓
                            </span>

                          )}

                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


          </div>


          {/* =================================================
              RESET
          ================================================= */}

          <button
            type="button"
            className="filter-reset-btn"

            onClick={
              resetFilters
            }
          >

            <RotateCcw
              size={15}
            />

            Reset

          </button>


        </div>


        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="jewellery-results-bar">

          <div>

            Showing{" "}

            <strong>
              {
                filteredProducts.length
              }
            </strong>

            {" "}of{" "}

            <strong>
              {
                products.length
              }
            </strong>

            {" "}pieces

          </div>


          <span>

            {activeMetal !==
              "All Metals" &&
              activeMetal}


            {activeMetal !==
              "All Metals" &&
              activeCategory !==
                "All Jewellery" &&
              " • "}


            {activeCategory !==
              "All Jewellery" &&
              activeCategory}


            {activeMetal ===
              "All Metals" &&
              activeCategory ===
                "All Jewellery" &&
              "All Jewellery"}

          </span>

        </div>


        {/* =================================================
            PRODUCTS
        ================================================= */}

        {loading ? (

          <div className="loading-products">
            Loading Luxury Jewellery...
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="no-products">

            <Gem size={32} />

            <h3>
              No jewellery found
            </h3>

            <p>
              Try adjusting your filters
              to discover more pieces.
            </p>

            <button
              type="button"
              onClick={
                resetFilters
              }
            >
              Reset Filters
            </button>

          </div>

        ) : (

          <section className="products-section">

            <ProductGrid
              products={
                filteredProducts
              }
            />

          </section>

        )}


      </section>


      {/* =================================================
          WHY HIRANYA
      ================================================= */}

      <section className="why-hiranya">

        <div className="why-title">

          <span>
            WHY CHOOSE HIRANYA
          </span>

          <h2>
            Crafted With Trust.
            <br />
            Designed For Generations.
          </h2>

          <p>
            Every HIRANYA masterpiece is handcrafted
            with ethically sourced materials,
            certified purity and timeless elegance.
          </p>

        </div>


        <div className="why-grid">

          <div className="why-card">

            <Gem size={38} />

            <h3>
              Finest Craftsmanship
            </h3>

            <p>
              Every jewellery piece is handcrafted
              by experienced artisans.
            </p>

          </div>


          <div className="why-card">

            <ShieldCheck size={38} />

            <h3>
              Certified Purity
            </h3>

            <p>
              BIS Hallmarked jewellery
              with guaranteed authenticity.
            </p>

          </div>


          <div className="why-card">

            <Truck size={38} />

            <h3>
              Free Shipping
            </h3>

            <p>
              Secure insured delivery
              across India.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          NEWSLETTER
      ================================================= */}

      <section className="newsletter">

        <div className="newsletter-box">

          <span>
            HIRANYA EXCLUSIVE
          </span>

          <h2>
            Join Our Luxury Circle
          </h2>

          <p>
            Subscribe and receive exclusive launches,
            festive offers, members-only collections,
            luxury styling inspiration and early access.
          </p>


          {subscribed && (

            <div className="newsletter-success">

              <h4>
                ✨ Welcome to HIRANYA
              </h4>

              <p>
                Thank you for subscribing.
                You'll now receive exclusive launches,
                luxury collections, premium offers
                and festive updates.
              </p>

            </div>

          )}


          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email"

              value={
                newsletterEmail
              }

              onChange={(e) =>
                setNewsletterEmail(
                  e.target.value
                )
              }
            />


            <button
              type="button"
              onClick={
                handleNewsletter
              }
            >

              {
                subscribed
                  ? "Subscribed ✓"
                  : "Subscribe"
              }

            </button>

          </div>


          <small>
            🔒 Your email is safe with HIRANYA.
            No spam. Unsubscribe anytime.
          </small>

        </div>

      </section>


      <Footer />

    </>

  );

};


export default Jewellery;