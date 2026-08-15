import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router-dom";

import {
  Gem,
  ShieldCheck,
  Truck,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  Check,
} from "lucide-react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import productService from "../../services/productService";

import { Product } from "../../types";

import "./Collections.css";


/* =========================================================
   NAVIGATION STATE
========================================================= */

interface CollectionsNavState {
  collection?: string;
}


/* =========================================================
   SORT OPTIONS
========================================================= */

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "newest";


/* =========================================================
   COLLECTIONS
========================================================= */

const collections = [
  "All Collections",
  "Best Sellers",
  "New Arrivals",
  "Bridal Collection",
  "Daily Wear",
  "Festive Collection",
  "Office Wear",
  "Luxury Collection",
  "Gift Collection",
];


const Collections = () => {

  const location = useLocation();


  /* =====================================================
     PRODUCTS
  ===================================================== */

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);


  /* =====================================================
     ACTIVE COLLECTION
  ===================================================== */

  const [activeCollection, setActiveCollection] =
    useState("All Collections");


  /* =====================================================
     COLLECTION DROPDOWN
  ===================================================== */

  const [
    isCollectionDropdownOpen,
    setIsCollectionDropdownOpen,
  ] = useState(false);


  const collectionDropdownRef =
    useRef<HTMLDivElement | null>(null);


  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const [newsletterEmail, setNewsletterEmail] =
    useState("");

  const [subscribed, setSubscribed] =
    useState(false);


  /* =====================================================
     PRICE FILTER
  ===================================================== */

  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(0);

  const [selectedMinPrice, setSelectedMinPrice] =
    useState(0);

  const [selectedMaxPrice, setSelectedMaxPrice] =
    useState(0);


  /* =====================================================
     SORT
  ===================================================== */

  const [sortOption, setSortOption] =
    useState<SortOption>("featured");


  /* =====================================================
     FILTER SECTION REF
  ===================================================== */

  const filterRef =
    useRef<HTMLElement | null>(null);


  const requestIdRef =
    useRef(0);


  /* =====================================================
     QUICK PRICE PRESETS
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
      max: Infinity,
    },
  ];


  /* =====================================================
     LOAD PRODUCTS WHEN COLLECTION CHANGES
  ===================================================== */

  useEffect(() => {

    loadProducts();

  }, [activeCollection]);


  /* =====================================================
     CLOSE COLLECTION DROPDOWN
     WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {

    const handleOutsideClick = (
      event: MouseEvent
    ) => {

      if (
        collectionDropdownRef.current &&
        !collectionDropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setIsCollectionDropdownOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);


  /* =====================================================
     NAVIGATION STATE
  ===================================================== */

  useEffect(() => {

    const navState =
      location.state as CollectionsNavState | null;


    if (!navState?.collection) {
      return;
    }


    if (
      collections.includes(
        navState.collection
      )
    ) {

      setActiveCollection(
        navState.collection
      );

    }


    setTimeout(() => {

      filterRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 700);


    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [location.state]);


  /* =====================================================
     LOAD PRODUCTS FROM BACKEND
  ===================================================== */

  const loadProducts = async () => {

    const requestId =
      ++requestIdRef.current;


    try {

      setLoading(true);


      let data: Product[] = [];


      /* -----------------------------------------------
         ALL COLLECTIONS
      ------------------------------------------------ */

      if (
        activeCollection ===
        "All Collections"
      ) {

        data =
          await productService
            .getAllProducts();

      }


      /* -----------------------------------------------
         SPECIFIC COLLECTION
      ------------------------------------------------ */

      else {

        data =
          await productService
            .getProductsByCollection(
              activeCollection
            );

      }


      /*
        Prevent older API response from
        overwriting latest selection.
      */

      if (
        requestId !==
        requestIdRef.current
      ) {

        return;

      }


      setProducts(data);


      /* -----------------------------------------------
         COLLECTION-SPECIFIC PRICE RANGE
      ------------------------------------------------ */

      if (data.length > 0) {

        const prices =
          data.map((product) =>
            Number(product.price)
          );


        const lowest =
          Math.min(...prices);

        const highest =
          Math.max(...prices);


        setMinPrice(lowest);

        setMaxPrice(highest);


        setSelectedMinPrice(
          lowest
        );

        setSelectedMaxPrice(
          highest
        );

      }

      else {

        setMinPrice(0);

        setMaxPrice(0);

        setSelectedMinPrice(0);

        setSelectedMaxPrice(0);

      }


      /* -----------------------------------------------
         RESET SORT WHEN COLLECTION CHANGES
      ------------------------------------------------ */

      setSortOption("featured");

    }


    catch (error) {

      console.error(
        "Error loading collection products:",
        error
      );


      if (
        requestId !==
        requestIdRef.current
      ) {

        return;

      }


      setProducts([]);

      setMinPrice(0);

      setMaxPrice(0);

      setSelectedMinPrice(0);

      setSelectedMaxPrice(0);

    }


    finally {

      if (
        requestId ===
        requestIdRef.current
      ) {

        setLoading(false);

      }

    }

  };


  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredProducts =
    useMemo(() => {

      let result =
        products.filter((product) => {

          const price =
            Number(product.price);


          return (
            price >= selectedMinPrice &&
            price <= selectedMaxPrice
          );

        });


      /* -----------------------------------------------
         PRICE LOW → HIGH
      ------------------------------------------------ */

      if (
        sortOption ===
        "price-low"
      ) {

        result =
          [...result].sort(
            (a, b) =>
              Number(a.price) -
              Number(b.price)
          );

      }


      /* -----------------------------------------------
         PRICE HIGH → LOW
      ------------------------------------------------ */

      if (
        sortOption ===
        "price-high"
      ) {

        result =
          [...result].sort(
            (a, b) =>
              Number(b.price) -
              Number(a.price)
          );

      }


      /* -----------------------------------------------
         NEWEST
      ------------------------------------------------ */

      if (
        sortOption ===
        "newest"
      ) {

        result =
          [...result].sort(
            (a, b) => {

              const dateA =
                a.createdAt
                  ? new Date(
                      a.createdAt
                    ).getTime()
                  : 0;


              const dateB =
                b.createdAt
                  ? new Date(
                      b.createdAt
                    ).getTime()
                  : 0;


              return dateB - dateA;

            }
          );

      }


      return result;

    }, [
      products,
      selectedMinPrice,
      selectedMaxPrice,
      sortOption,
    ]);


  /* =====================================================
     FILTER STATUS
  ===================================================== */

  const filtersApplied =
    selectedMinPrice > minPrice ||
    selectedMaxPrice < maxPrice ||
    sortOption !== "featured";


  /* =====================================================
     PRICE FORMAT
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
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {

    setSelectedMinPrice(
      minPrice
    );

    setSelectedMaxPrice(
      maxPrice
    );

    setSortOption(
      "featured"
    );

  };


  /* =====================================================
     APPLY PRICE PRESET
  ===================================================== */

  const applyPricePreset = (
    presetMin: number,
    presetMax: number
  ) => {

    const finalMin =
      Math.max(
        presetMin,
        minPrice
      );


    const finalMax =
      Math.min(
        presetMax,
        maxPrice
      );


    if (
      finalMin <=
      finalMax
    ) {

      setSelectedMinPrice(
        finalMin
      );

      setSelectedMaxPrice(
        finalMax
      );

    }

  };


  /* =====================================================
     SELECT COLLECTION
  ===================================================== */

  const handleCollectionSelect = (
    collection: string
  ) => {

    setActiveCollection(
      collection
    );

    setIsCollectionDropdownOpen(
      false
    );

  };


  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const handleNewsletter = () => {

    if (
      !newsletterEmail.trim()
    ) {

      return;

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailRegex.test(
        newsletterEmail
      )
    ) {

      return;

    }


    localStorage.setItem(
      "hiranyaNewsletter",
      newsletterEmail
    );


    setSubscribed(true);

    setNewsletterEmail("");


    setTimeout(() => {

      setSubscribed(false);

    }, 3000);

  };


  /* =====================================================
     JSX
  ===================================================== */

  return (

    <>

      {/* =================================================
          TOP BAR
      ================================================= */}

      <TopBar />


      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      {/* =================================================
          HERO
      ================================================= */}

      <section className="jewellery-hero">

        <div className="hero-overlay"></div>

        <div className="hero-glow"></div>


        <div className="hero-content">

          <span>
            HIRANYA • CURATED COLLECTIONS
          </span>


          <h1>

            Collections

            <br />

            Crafted For Every Story

          </h1>


          <p>

            Explore handcrafted collections
            inspired by timeless elegance,
            exceptional purity and
            luxurious craftsmanship.

          </p>


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
          COLLECTION SECTION
      ================================================= */}

      <section
        className="jewellery-page"
        id="shop"
        ref={filterRef}
      >


        {/* =================================================
            SECTION TITLE
        ================================================= */}

        <div className="section-title">

          <span>
            CURATED SETS
          </span>


          <h2>
            Shop By Collection
          </h2>


          <p>

            Choose from our handcrafted
            collections, each designed
            for a different moment
            and every generation.

          </p>

        </div>


        {/* =================================================
            FILTER + SORT
        ================================================= */}

        {!loading &&
          products.length > 0 && (

          <div className="collection-controls">


            {/* =============================================
                REFINE COLLECTION
            ============================================= */}

            <div className="filter-heading">

              <SlidersHorizontal
                size={18}
              />


              <div>

                <span className="refine-label">

                  REFINE COLLECTION


                  {filtersApplied && (

                    <em>
                      FILTERS APPLIED
                    </em>

                  )}

                </span>


                <strong>
                  {activeCollection}
                </strong>

              </div>

            </div>


            {/* =============================================
                PRICE
            ============================================= */}

            <div className="price-filter">


              <div className="control-label">

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


              {/* PRICE SLIDER */}

              <div className="range-container">


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

                  className="
                    range-slider
                    range-min
                  "
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

                  className="
                    range-slider
                    range-max
                  "
                />

              </div>


              {/* PRICE LIMITS */}

              <div className="price-limits">

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


              {/* QUICK PRESETS */}

              <div className="price-presets">

                {pricePresets.map(
                  (preset) => {

                    const presetMin =
                      Math.max(
                        preset.min,
                        minPrice
                      );


                    const presetMax =
                      Math.min(
                        preset.max,
                        maxPrice
                      );


                    if (
                      presetMin >
                      presetMax
                    ) {

                      return null;

                    }


                    const isActive =
                      selectedMinPrice ===
                        presetMin &&
                      selectedMaxPrice ===
                        presetMax;


                    return (

                      <button
                        key={
                          preset.label
                        }

                        type="button"

                        className={
                          isActive
                            ? "price-preset active"
                            : "price-preset"
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


            {/* =============================================
                SORT
            ============================================= */}

            <div className="sort-filter">

              <label htmlFor="collection-sort">
                SORT BY
              </label>


              <select
                id="collection-sort"

                value={sortOption}

                onChange={(e) =>
                  setSortOption(
                    e.target
                      .value as SortOption
                  )
                }
              >

                <option value="featured">
                  Featured
                </option>


                <option value="price-low">
                  Price: Low to High
                </option>


                <option value="price-high">
                  Price: High to Low
                </option>


                <option value="newest">
                  Newest
                </option>

              </select>

            </div>


            {/* =============================================
                RESET
            ============================================= */}

            <button
              className="reset-filters"

              onClick={
                resetFilters
              }

              title="Reset filters"

              type="button"
            >

              <RotateCcw
                size={16}
              />

              Reset

            </button>


            {/* =============================================
                SHOP BY COLLECTION
            ============================================= */}

            <div
              className="
                collection-dropdown-section
              "
            >

              <div className="collection-dropdown-title">

                SHOP BY COLLECTION

              </div>


              <div
                className="collection-dropdown"
                ref={
                  collectionDropdownRef
                }
              >


                {/* DROPDOWN BUTTON */}

                <button
                  type="button"

                  className={`
                    collection-dropdown-trigger
                    ${
                      isCollectionDropdownOpen
                        ? "open"
                        : ""
                    }
                  `}

                  onClick={() =>
                    setIsCollectionDropdownOpen(
                      (prev) => !prev
                    )
                  }
                >

                  <span>
                    {activeCollection}
                  </span>


                  <ChevronDown
                    size={18}

                    className={
                      isCollectionDropdownOpen
                        ? "rotate"
                        : ""
                    }
                  />

                </button>


                {/* DROPDOWN OPTIONS */}

                {isCollectionDropdownOpen && (

                  <div className="collection-dropdown-menu">

                    {collections.map(
                      (collection) => (

                        <button
                          key={collection}

                          type="button"

                          className={`
                            collection-dropdown-option
                            ${
                              activeCollection ===
                              collection
                                ? "active"
                                : ""
                            }
                          `}

                          onClick={() =>
                            handleCollectionSelect(
                              collection
                            )
                          }
                        >

                          <span>
                            {collection}
                          </span>


                          {activeCollection ===
                            collection && (

                            <Check
                              size={16}
                            />

                          )}

                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


          </div>

        )}


        {/* =================================================
            RESULT COUNT
        ================================================= */}

        {!loading &&
          products.length > 0 && (

          <div className="collection-results-info">

            <span>

              Showing{" "}

              <strong>
                {filteredProducts.length}
              </strong>

              {" "}of{" "}

              <strong>
                {products.length}
              </strong>

              {" "}pieces

            </span>


            <span>
              {activeCollection}
            </span>

          </div>

        )}


        {/* =================================================
            PRODUCTS
        ================================================= */}

        {loading ? (

          <div className="loading-products">

            Loading Luxury Collections...

          </div>

        ) : filteredProducts.length > 0 ? (

          <section className="products-section">

            <ProductGrid
              products={
                filteredProducts
              }
            />

          </section>

        ) : (

          <div className="no-products">

            <Gem size={34} />


            <h3>

              No jewellery in
              this price range

            </h3>


            <p>

              Try adjusting your
              price range to discover
              more pieces.

            </p>


            <button
              onClick={
                resetFilters
              }

              type="button"
            >

              Reset Filters

            </button>

          </div>

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
            Designed For Generations.

          </h2>


          <p>

            Every HIRANYA masterpiece
            is handcrafted with ethically
            sourced materials, certified
            purity and timeless elegance.

          </p>

        </div>


        <div className="why-grid">


          <div className="why-card">

            <Gem size={38} />

            <h3>
              Finest Craftsmanship
            </h3>

            <p>

              Every piece in our
              collections is handcrafted
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

            Subscribe and receive
            exclusive launches,
            festive offers,
            members-only collections,
            luxury styling inspiration
            and early access.

          </p>


          {subscribed && (

            <div className="newsletter-success">

              <h4>
                ✨ Welcome to HIRANYA
              </h4>


              <p>

                Thank you for subscribing.
                You'll now receive exclusive
                launches, luxury collections,
                premium offers and festive
                updates.

              </p>

            </div>

          )}


          <div className="newsletter-form">


            <input
              type="email"

              placeholder="
                Enter your email
              "

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
              onClick={
                handleNewsletter
              }

              type="button"
            >

              {subscribed
                ? "Subscribed ✓"
                : "Subscribe"}

            </button>


          </div>


          <small>

            🔒 Your email is safe
            with HIRANYA.
            No spam. Unsubscribe anytime.

          </small>


        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </>

  );

};


export default Collections;