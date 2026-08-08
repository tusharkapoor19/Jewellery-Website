import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Gem, ShieldCheck, Truck, ArrowRight } from "lucide-react";
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

const Jewellery = () => {

    const location = useLocation();

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [activeMetal, setActiveMetal] =
        useState("All Metals");

    const [activeCategory, setActiveCategory] =
        useState("All Jewellery");

    const [newsletterEmail, setNewsletterEmail] =
        useState("");

    const [subscribed, setSubscribed] =
        useState(false);

    // Ref to the filter/products section - used for smooth scroll
    // instead of hash-based navigation.
    const filterRef = useRef<HTMLElement | null>(null);
    const requestIdRef = useRef(0);

    const metals = [

        "All Metals",

        "Gold",

        "Silver",

        "White Gold",

        "Rose Gold",

        "Platinum"

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

        "Idols & Coins"

    ];

    useEffect(() => {

        loadProducts();

    }, [

        activeMetal,

        activeCategory

    ]);

    // Read navigation state (from Navbar links) instead of hash.
    // If a category or metal was passed via navigate("/jewellery", { state }),
    // auto-select it, then smoothly scroll to the filter/products section.
    useEffect(() => {

        const navState = location.state as JewelleryNavState | null;

        if (!navState) return;

        if (navState.category && categories.includes(navState.category)) {

            setActiveCategory(navState.category);

            setActiveMetal("All Metals");

        }
        else if (navState.metal && metals.includes(navState.metal)) {

            setActiveMetal(navState.metal);

            setActiveCategory("All Jewellery");

        }

        setTimeout(() => {

            filterRef.current?.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 700);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    const loadProducts = async () => {
        const requestId = ++requestIdRef.current;

        try {

            setLoading(true);

            let data: Product[] = [];

            if (

                activeMetal === "All Metals" &&

                activeCategory === "All Jewellery"

            ) {

                data =
                    await productService.getAllProducts();

            }

            else if (

                activeMetal !== "All Metals"

            ) {

                data =
                    await productService.getProductsByMetal(
                        activeMetal
                    );

            }

            else {

                data =
                    await productService.getProductsByCategory(
                        activeCategory
                    );

            }

            if (requestId === requestIdRef.current) {
    setProducts(data);
}

        }

        catch (err) {

            console.log(err);

        }

        finally {
    if (requestId === requestIdRef.current) {
        setLoading(false);
    }
}

    };

    const handleNewsletter = () => {

        if (!newsletterEmail.trim()) {

            toast.error("Please enter your email.");

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(newsletterEmail)) {

            toast.error("Please enter a valid email.");

            return;

        }

        const stored =
            localStorage.getItem("hiranyaNewsletter");

        if (stored === newsletterEmail) {

            toast("Already subscribed ❤️");

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

    return (

        <>

            <TopBar />

            <Navbar />

            <section className="jewellery-hero">

                <div className="hero-overlay"></div>

                <div className="hero-glow"></div>

                <div className="hero-content">

                    <span>

                        HIRANYA • FINE JEWELLERY

                    </span>

                    <h1>

                        Timeless Luxury

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

                                    behavior:"smooth"

                                });

                            }}

                        >

                            Explore Collection

                            <ArrowRight size={18}/>

                        </button>

                        <button

                            className="glass-btn"

                        >

                            Book Consultation

                        </button>

                    </div>

                    <div className="hero-features">

                        <div>

                            <Gem size={18}/>

                            BIS Hallmarked

                        </div>

                        <div>

                            <ShieldCheck size={18}/>

                            Lifetime Exchange

                        </div>

                        <div>

                            <Truck size={18}/>

                            Free Shipping

                        </div>

                    </div>

                </div>

            </section>
            <section

    className="jewellery-page"

    id="shop"

    ref={filterRef}

>

    <div className="section-title">

        <span>

            PREMIUM METALS

        </span>

        <h2>

            Shop By Metal

        </h2>

        <p>

            Choose your favourite precious metal crafted
            with unmatched purity and luxury.

        </p>

    </div>

    <div className="metal-filter">

        {

            metals.map(metal=>(

                <button

                    key={metal}

                    className={

                        activeMetal===metal

                        ?

                        "active"

                        :

                        ""

                    }

                    onClick={()=>{

                        setActiveMetal(

                            metal

                        );

                        setActiveCategory(

                            "All Jewellery"

                        );

                    }}

                >

                    {metal}

                </button>

            ))

        }

    </div>

    <div className="section-title jewellery-heading">

        <span>

            OUR COLLECTION

        </span>

        <h2>

            Shop By Jewellery

        </h2>

        <p>

            Discover handcrafted collections
            for every occasion.

        </p>

    </div>

    <div className="category-filter">

        {

            categories.map(category=>(

                <button

                    key={category}

                    className={

                        activeCategory===category

                        ?

                        "active"

                        :

                        ""

                    }

                    onClick={()=>{

                        setActiveCategory(

                            category

                        );

                        setActiveMetal(

                            "All Metals"

                        );

                    }}

                >

                    {category}

                </button>

            ))

        }

    </div>

    {

        loading

        ?

        <div className="loading-products">

            Loading Luxury Jewellery...

        </div>

        :

        <section

            className="products-section"

        >

            <ProductGrid

                products={products}

            />

        </section>

    }

</section>
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

            Every HIRANYA masterpiece is handcrafted
            with ethically sourced materials,
            certified purity and timeless elegance.

        </p>

    </div>

    <div className="why-grid">

        <div className="why-card">

            <Gem size={38}/>

            <h3>

                Finest Craftsmanship

            </h3>

            <p>

                Every jewellery piece is handcrafted
                by experienced artisans.

            </p>

        </div>

        <div className="why-card">

            <ShieldCheck size={38}/>

            <h3>

                Certified Purity

            </h3>

            <p>

                BIS Hallmarked jewellery
                with guaranteed authenticity.

            </p>

        </div>

        <div className="why-card">

            <Truck size={38}/>

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
            festive offers,
            members-only collections,
            luxury styling inspiration
            and early access.

        </p>

        {

            subscribed &&

            <div className="newsletter-success">

                <h4>

                    ✨ Welcome to HIRANYA

                </h4>

                <p>

                    Thank you for subscribing.

                    You'll now receive exclusive launches,

                    luxury collections,

                    premium offers

                    and festive updates.

                </p>

            </div>

        }

        <div className="newsletter-form">

            <input

                type="email"

                placeholder="Enter your email"

                value={newsletterEmail}

                onChange={(e)=>{

                    setNewsletterEmail(

                        e.target.value

                    );

                }}

            />

            <button

                onClick={handleNewsletter}

            >

                {

                    subscribed

                    ?

                    "Subscribed ✓"

                    :

                    "Subscribe"

                }

            </button>

        </div>

        <small>

            🔒 Your email is safe with HIRANYA.

            No spam. Unsubscribe anytime.

        </small>

    </div>

</section>

<Footer/>

</>

);

};

export default Jewellery;
