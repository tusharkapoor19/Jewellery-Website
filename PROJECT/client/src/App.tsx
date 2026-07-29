import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css';

import ScrollToHash from "./components/ScrollToHash";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent/CookieConsent";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import StoreLocator from "./pages/StoreLocator/StoreLocator";

import Collections from "./pages/Collections/Collections";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import Jewellery from "./pages/Jewellery/Jewellery";
import JewelleryDetails from "./pages/Jewellery/JewelleryDetails";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import LoginOTP from "./pages/LoginOTP/LoginOTP";

import MyAccount from "./pages/MyAccount/MyAccount";
import Orders from "./pages/Orders/Orders";
import Wishlist from "./pages/Wishlist/Wishlist";
import Addresses from "./pages/Myaddresses/Myaddresses";
import Rewards from "./pages/Rewards/Rewards";
import TrackOrder from "./pages/TrackOrder/TrackOrder";

import Blogs from "./pages/Blogs/Blogs";
import BlogDetails1 from "./pages/BlogDetails1/BlogDetails1";
import BlogDetails2 from "./pages/BlogDetails2/BlogDetails2";
import BlogDetails3 from "./pages/BlogDetails3/BlogDetails3";

import Offers from "./pages/Offers/Offers";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";

import BrandStory from "./pages/BrandStory/BrandStory";
import BehindTheCraft from "./pages/BehindTheCraft/BehindTheCraft";

import FAQ from "./pages/FAQ/FAQ";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy/ReturnPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import CorporateGifting from "./pages/CorporateGifting/CorporateGifting";
import RingSizeGuide from "./pages/RingSizeGuide/RingSizeGuide";
import JewelleryCare from "./pages/JewelleryCare/JewelleryCare";
import HallmarkCertification from "./pages/HallmarkCertification/HallmarkCertification";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import TryOn from "./pages/TryOn/TryOn";
function App() {

    return (

        <>

            <ScrollToTop />

            <ScrollToHash />

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
    path="/order-success"
    element={<OrderSuccess />}
/>

                <Route
                    path="/store-locator"
                    element={<StoreLocator />}
                />

                {/* Collections */}

                <Route
                    path="/collections"
                    element={<Collections />}
                />

                {/* Product Details */}

                <Route
                    path="/product/:productID"
                    element={<ProductDetails />}
                />

                {/* Jewellery */}

                <Route
                    path="/jewellery"
                    element={<Jewellery />}
                />

                <Route
                    path="/jewellery/:id"
                    element={<JewelleryDetails />}
                />

                {/* Authentication */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/login-otp"
                    element={<LoginOTP />}
                />
                                {/* Account */}

                <Route
                    path="/account"
                    element={<MyAccount />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="/addresses"
                    element={<Addresses />}
                />

                <Route
                    path="/rewards"
                    element={<Rewards />}
                />

                <Route
                    path="/track-order"
                    element={<TrackOrder />}
                />

                {/* Blogs */}

                <Route
                    path="/blogs"
                    element={<Blogs />}
                />

                <Route
                    path="/blogs/1"
                    element={<BlogDetails1 />}
                />

                <Route
                    path="/blogs/2"
                    element={<BlogDetails2 />}
                />

                <Route
                    path="/blogs/3"
                    element={<BlogDetails3 />}
                />

                {/* Shopping */}

                <Route
                    path="/offers"
                    element={<Offers />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />


                <Route 
                    path="/try-on" 
                    element={<TryOn />} 
                />


                <Route
                    path="/payment"
                    element={<Payment />}
                />

                {/* Brand */}

                <Route
                    path="/brand-story"
                    element={<BrandStory />}
                />

                <Route
                    path="/behindthecraft"
                    element={<BehindTheCraft />}
                />

                {/* Policies */}

                <Route
                    path="/faq"
                    element={<FAQ />}
                />

                <Route
                    path="/shipping-policy"
                    element={<ShippingPolicy />}
                />

                <Route
                    path="/return-policy"
                    element={<ReturnPolicy />}
                />

                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="/corporate-gifting"
                    element={<CorporateGifting />}
                />

                <Route
                    path="/ring-size-guide"
                    element={<RingSizeGuide />}
                />

                <Route
                    path="/jewellery-care"
                    element={<JewelleryCare />}
                />

                <Route
                    path="/hallmark-certification"
                    element={<HallmarkCertification />}
                />

                <Route
                    path="/terms-conditions"
                    element={<TermsConditions />}
                />

            </Routes>

            <CookieConsent />

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 2500,
                    style: {
                        borderRadius: "14px",
                        background: "#ffffff",
                        color: "#222",
                        border: "1px solid rgba(200,162,77,.25)",
                        boxShadow: "0 15px 35px rgba(0,0,0,.12)"
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