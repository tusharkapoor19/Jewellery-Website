import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ScrollToHash from "./components/ScrollToHash";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent/CookieConsent";

import TopBar from "./components/TopBar/TopBar";
import Navbar from "./components/Navbar/Navbar";
import CompareBar from "./components/CompareBar/CompareBar";

import "./App.css";

import Admin from "./pages/admin/admin";

import { AuthProvider } from "./context/AuthContext";
import { CompareProvider } from "./context/CompareContext";


// =========================================================
// PAGES
// =========================================================

const Home = React.lazy(() =>
    import("./pages/Home/Home")
);

const About = React.lazy(() =>
    import("./pages/About/About")
);

const Contact = React.lazy(() =>
    import("./pages/Contact/Contact")
);

const StoreLocator = React.lazy(() =>
    import("./pages/StoreLocator/StoreLocator")
);

const Collections = React.lazy(() =>
    import("./pages/Collections/Collections")
);

const ProductDetails = React.lazy(() =>
    import("./pages/ProductDetails/ProductDetails")
);

const Jewellery = React.lazy(() =>
    import("./pages/Jewellery/Jewellery")
);

const JewelleryDetails = React.lazy(() =>
    import("./pages/Jewellery/JewelleryDetails")
);


// =========================================================
// AUTH
// =========================================================

const Login = React.lazy(() =>
    import("./pages/Login/Login")
);

const Signup = React.lazy(() =>
    import("./pages/Signup/Signup")
);

const ForgotPassword = React.lazy(() =>
    import("./pages/ForgotPassword/ForgotPassword")
);

const LoginOTP = React.lazy(() =>
    import("./pages/LoginOTP/LoginOTP")
);


// =========================================================
// ACCOUNT
// =========================================================

const MyAccount = React.lazy(() =>
    import("./pages/MyAccount/MyAccount")
);

const Orders = React.lazy(() =>
    import("./pages/Orders/Orders")
);

const Wishlist = React.lazy(() =>
    import("./pages/Wishlist/Wishlist")
);

const Addresses = React.lazy(() =>
    import("./pages/Myaddresses/Myaddresses")
);

const Rewards = React.lazy(() =>
    import("./pages/Rewards/Rewards")
);

const TrackOrder = React.lazy(() =>
    import("./pages/TrackOrder/TrackOrder")
);


// =========================================================
// BLOGS
// =========================================================

const Blogs = React.lazy(() =>
    import("./pages/Blogs/Blogs")
);

const BlogDetails1 = React.lazy(() =>
    import("./pages/BlogDetails1/BlogDetails1")
);

const BlogDetails2 = React.lazy(() =>
    import("./pages/BlogDetails2/BlogDetails2")
);

const BlogDetails3 = React.lazy(() =>
    import("./pages/BlogDetails3/BlogDetails3")
);


// =========================================================
// SHOPPING
// =========================================================

const Offers = React.lazy(() =>
    import("./pages/Offers/Offers")
);

const Cart = React.lazy(() =>
    import("./pages/Cart/Cart")
);

const Checkout = React.lazy(() =>
    import("./pages/Checkout/Checkout")
);

const Payment = React.lazy(() =>
    import("./pages/Payment/Payment")
);


// =========================================================
// CUSTOM / DESIGN
// =========================================================

const HomeCD = React.lazy(() =>
    import("./pages/Home-CD/index")
);

const CustomDesign = React.lazy(() =>
    import("./pages/CustomDesign")
);

const MyCustomOrders = React.lazy(() =>
    import("./pages/MyCustomOrders")
);


// =========================================================
// BRAND / INFORMATION
// =========================================================

const BrandStory = React.lazy(() =>
    import("./pages/BrandStory/BrandStory")
);

const BehindTheCraft = React.lazy(() =>
    import("./pages/BehindTheCraft/BehindTheCraft")
);

const FAQ = React.lazy(() =>
    import("./pages/FAQ/FAQ")
);

const ShippingPolicy = React.lazy(() =>
    import("./pages/ShippingPolicy/ShippingPolicy")
);

const ReturnPolicy = React.lazy(() =>
    import("./pages/ReturnPolicy/ReturnPolicy")
);

const PrivacyPolicy = React.lazy(() =>
    import("./pages/PrivacyPolicy/PrivacyPolicy")
);

const CorporateGifting = React.lazy(() =>
    import("./pages/CorporateGifting/CorporateGifting")
);

const RingSizeGuide = React.lazy(() =>
    import("./pages/RingSizeGuide/RingSizeGuide")
);

const JewelleryCare = React.lazy(() =>
    import("./pages/JewelleryCare/JewelleryCare")
);

const HallmarkCertification = React.lazy(() =>
    import("./pages/HallmarkCertification/HallmarkCertification")
);

const TermsConditions = React.lazy(() =>
    import("./pages/TermsConditions/TermsConditions")
);


// =========================================================
// ORDER / PAYMENT SUCCESS
// =========================================================

const OrderSuccess = React.lazy(() =>
    import("./pages/OrderSuccess/OrderSuccess")
);

const PaymentSuccess = React.lazy(() =>
    import("./pages/PaymentSuccess/PaymentSuccess")
);


// =========================================================
// TRY ON
// =========================================================

const TryOn = React.lazy(() =>
    import("./pages/TryOn/TryOn")
);


// =========================================================
// COMPARISON
// =========================================================

const Compare = React.lazy(() =>
    import("./pages/Compare/Compare")
);


// =========================================================
// APP
// =========================================================

function App() {

    return (

        <>

            <ScrollToTop />

            <ScrollToHash />


            {/* =================================================
                AUTH PROVIDER
            ================================================= */}

            <AuthProvider>

                {/* =================================================
                    COMPARE PROVIDER
                ================================================= */}

                <CompareProvider>

                    <Routes>


                        {/* =================================================
                            HOME
                        ================================================= */}

                        <Route
                            path="/"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Home />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            ADMIN
                        ================================================= */}

                        <Route
                            path="/admin"
                            element={<Admin />}
                        />


                        {/* =================================================
                            ABOUT
                        ================================================= */}

                        <Route
                            path="/about"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <About />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            CONTACT
                        ================================================= */}

                        <Route
                            path="/contact"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Contact />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            ORDER SUCCESS
                        ================================================= */}

                        <Route
                            path="/order-success"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <OrderSuccess />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            STORE LOCATOR
                        ================================================= */}

                        <Route
                            path="/store-locator"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <StoreLocator />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            COLLECTIONS
                        ================================================= */}

                        <Route
                            path="/collections"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Collections />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            PRODUCT DETAILS
                        ================================================= */}

                        <Route
                            path="/product/:productID"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <ProductDetails />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            JEWELLERY
                        ================================================= */}

                        <Route
                            path="/jewellery"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Jewellery />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            JEWELLERY DETAILS
                        ================================================= */}

                        <Route
                            path="/jewellery/:id"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <JewelleryDetails />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            LOGIN
                        ================================================= */}

                        <Route
                            path="/login"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Login />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            SIGNUP
                        ================================================= */}

                        <Route
                            path="/signup"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Signup />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            FORGOT PASSWORD
                        ================================================= */}

                        <Route
                            path="/forgot-password"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <ForgotPassword />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            LOGIN OTP
                        ================================================= */}

                        <Route
                            path="/login-otp"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <LoginOTP />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            ACCOUNT
                        ================================================= */}

                        <Route
                            path="/account"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <MyAccount />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            ORDERS
                        ================================================= */}

                        <Route
                            path="/orders"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Orders />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            WISHLIST
                        ================================================= */}

                        <Route
                            path="/wishlist"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Wishlist />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            ADDRESSES
                        ================================================= */}

                        <Route
                            path="/addresses"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Addresses />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            REWARDS
                        ================================================= */}

                        <Route
                            path="/rewards"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Rewards />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            TRACK ORDER
                        ================================================= */}

                        <Route
                            path="/track-order"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <TrackOrder />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            BLOGS
                        ================================================= */}

                        <Route
                            path="/blogs"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Blogs />
                                </Suspense>
                            }
                        />


                        <Route
                            path="/blogs/1"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <BlogDetails1 />
                                </Suspense>
                            }
                        />


                        <Route
                            path="/blogs/2"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <BlogDetails2 />
                                </Suspense>
                            }
                        />


                        <Route
                            path="/blogs/3"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <BlogDetails3 />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            OFFERS
                        ================================================= */}

                        <Route
                            path="/offers"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Offers />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            CART
                        ================================================= */}

                        <Route
                            path="/cart"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Cart />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            CHECKOUT
                        ================================================= */}

                        <Route
                            path="/checkout"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Checkout />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            PAYMENT
                        ================================================= */}

                        <Route
                            path="/payment"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Payment />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            TRY ON
                        ================================================= */}

                        <Route
                            path="/try-on"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <TryOn />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            CUSTOM JEWELLERY
                        ================================================= */}

                        <Route
                            path="/custom-jewellery"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <HomeCD />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            PAYMENT SUCCESS
                        ================================================= */}

                        <Route
                            path="/payment-success"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <PaymentSuccess />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            CUSTOM DESIGN
                        ================================================= */}

                        <Route
                            path="/design"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <CustomDesign />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            MY CUSTOM ORDERS
                        ================================================= */}

                        <Route
                            path="/my-custom-orders"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <MyCustomOrders />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            BRAND STORY
                        ================================================= */}

                        <Route
                            path="/brand-story"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <BrandStory />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            BEHIND THE CRAFT
                        ================================================= */}

                        <Route
                            path="/behindthecraft"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <BehindTheCraft />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            FAQ
                        ================================================= */}

                        <Route
                            path="/faq"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <FAQ />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            SHIPPING POLICY
                        ================================================= */}

                        <Route
                            path="/shipping-policy"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <ShippingPolicy />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            RETURN POLICY
                        ================================================= */}

                        <Route
                            path="/return-policy"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <ReturnPolicy />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            PRIVACY POLICY
                        ================================================= */}

                        <Route
                            path="/privacy-policy"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <PrivacyPolicy />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            CORPORATE GIFTING
                        ================================================= */}

                        <Route
                            path="/corporate-gifting"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <CorporateGifting />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            RING SIZE GUIDE
                        ================================================= */}

                        <Route
                            path="/ring-size-guide"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <RingSizeGuide />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            JEWELLERY CARE
                        ================================================= */}

                        <Route
                            path="/jewellery-care"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <JewelleryCare />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            HALLMARK CERTIFICATION
                        ================================================= */}

                        <Route
                            path="/hallmark-certification"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <HallmarkCertification />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            TERMS & CONDITIONS
                        ================================================= */}

                        <Route
                            path="/terms-conditions"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <TermsConditions />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            COMPARISON
                        ================================================= */}

                        <Route
                            path="/compare"
                            element={
                                <Suspense
                                    fallback={
                                        <>
                                            <TopBar />
                                            <Navbar />
                                        </>
                                    }
                                >
                                    <Compare />
                                </Suspense>
                            }
                        />


                        {/* =================================================
                            FALLBACK
                        ================================================= */}

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/"
                                    replace
                                />
                            }
                        />

                    </Routes>


                    {/* =================================================
                        GLOBAL COMPARE BAR
                    ================================================= */}

                    <CompareBar />

                </CompareProvider>

            </AuthProvider>


            {/* =================================================
                COOKIE CONSENT
            ================================================= */}

            <CookieConsent />


            {/* =================================================
                TOASTER
            ================================================= */}

            <Toaster
                position="top-right"
                reverseOrder={false}
                containerStyle={{
                    top: "var(--toast-top, 110px)"
                }}
                toastOptions={{
                    duration: 2500,

                    style: {
                        borderRadius: "14px",
                        background: "#ffffff",
                        color: "#222",
                        border:
                            "1px solid rgba(200,162,77,.25)",
                        boxShadow:
                            "0 15px 35px rgba(0,0,0,.12)"
                    },

                    success: {
                        iconTheme: {
                            primary: "#C8A24D",
                            secondary: "#ffffff"
                        }
                    },

                    error: {
                        iconTheme: {
                            primary: "#dc2626",
                            secondary: "#ffffff"
                        }
                    }
                }}
            />

        </>

    );

}


export default App;