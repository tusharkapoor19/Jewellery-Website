import React, { Suspense, lazy } from 'react';

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ScrollToHash from "./components/ScrollToHash";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import "./App.css"

import TopBar from './components/TopBar/TopBar';
import Navbar from "./components/Navbar/Navbar";

import Admin from "./pages/admin/admin";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Home = React.lazy (() => import("./pages/Home/Home"))
const About  = React.lazy (() => import("./pages/About/About"))
const Contact  = React.lazy (() => import("./pages/Contact/Contact"))
const StoreLocator = React.lazy (() => import("./pages/StoreLocator/StoreLocator"))

const Collections = React.lazy (() => import("./pages/Collections/Collections"))
const ProductDetails = React.lazy (() => import("./pages/ProductDetails/ProductDetails"))

const Jewellery = React.lazy (() => import("./pages/Jewellery/Jewellery"))
const JewelleryDetails = React.lazy (() => import("./pages/Jewellery/JewelleryDetails"))

const Login = React.lazy (() => import("./pages/Login/Login"))
const Signup = React.lazy (() => import("./pages/Signup/Signup"))
const ForgotPassword = React.lazy (() => import("./pages/ForgotPassword/ForgotPassword"))
const LoginOTP = React.lazy (() => import("./pages/LoginOTP/LoginOTP"))

const MyAccount = React.lazy (() => import("./pages/MyAccount/MyAccount"))
const Orders = React.lazy (() => import("./pages/Orders/Orders"))
const Wishlist = React.lazy (() => import("./pages/Wishlist/Wishlist"))
const Addresses = React.lazy (() => import("./pages/Myaddresses/Myaddresses"))
const Rewards = React.lazy (() => import("./pages/Rewards/Rewards"))
const TrackOrder = React.lazy (() => import("./pages/TrackOrder/TrackOrder"))

const Blogs = React.lazy (() => import("./pages/Blogs/Blogs"))
const BlogDetails1 = React.lazy (() => import("./pages/BlogDetails1/BlogDetails1"))
const BlogDetails2 = React.lazy (() => import("./pages/BlogDetails2/BlogDetails2"))
const BlogDetails3 = React.lazy (() => import("./pages/BlogDetails3/BlogDetails3"))

const Offers = React.lazy (() => import("./pages/Offers/Offers"))
const Cart = React.lazy (() => import("./pages/Cart/Cart"))
const Checkout = React.lazy (() => import("./pages/Checkout/Checkout"))
const Payment = React.lazy (() => import("./pages/Payment/Payment"))
const HomeCD = React.lazy (() => import('./pages/Home-CD/index'))
const CustomDesign = React.lazy (() => import('./pages/CustomDesign'))
const MyCustomOrders = React.lazy (() => import('./pages/MyCustomOrders'))


const BrandStory = React.lazy (() => import("./pages/BrandStory/BrandStory"))
const BehindTheCraft = React.lazy (() => import("./pages/BehindTheCraft/BehindTheCraft"))

const FAQ = React.lazy (() => import("./pages/FAQ/FAQ"))
const ShippingPolicy = React.lazy (() => import("./pages/ShippingPolicy/ShippingPolicy"))
const ReturnPolicy = React.lazy (() => import("./pages/ReturnPolicy/ReturnPolicy"))
const PrivacyPolicy = React.lazy (() => import("./pages/PrivacyPolicy/PrivacyPolicy"))
const CorporateGifting = React.lazy (() => import("./pages/CorporateGifting/CorporateGifting"))
const RingSizeGuide = React.lazy (() => import("./pages/RingSizeGuide/RingSizeGuide"))
const JewelleryCare = React.lazy (() => import("./pages/JewelleryCare/JewelleryCare"))
const HallmarkCertification = React.lazy (() => import("./pages/HallmarkCertification/HallmarkCertification"))
const TermsConditions = React.lazy (() => import("./pages/TermsConditions/TermsConditions"))
const OrderSuccess = React.lazy (() => import("./pages/OrderSuccess/OrderSuccess"))
const PaymentSuccess = React.lazy (() => import("./pages/PaymentSuccess/PaymentSuccess"))
const TryOn = React.lazy (() => import("./pages/TryOn/TryOn"))


 function App() {

    return (

        <>

            <ScrollToTop />

            <ScrollToHash />
        
        <AuthProvider>

            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Home />
                        </Suspense>
                    }
                />

                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" replace />} />


                <Route
                    path="/about"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <About />
                        </Suspense>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Contact />
                        </Suspense>
                    }
                />

                <Route
                    path="/order-success"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <OrderSuccess />
                        </Suspense>
                    }
                />

                <Route
                    path="/store-locator"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <StoreLocator />
                        </Suspense>
                    }
                />


                <Route
                    path="/collections"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Collections />
                        </Suspense>
                    }
                />


                <Route
                    path="/product/:productID"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <ProductDetails />
                        </Suspense>
                    }
                />


                <Route
                    path="/jewellery"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Jewellery />
                        </Suspense>
                    }
                />

                <Route
                    path="/jewellery/:id"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <JewelleryDetails />
                        </Suspense>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Login />
                        </Suspense>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Signup />
                        </Suspense>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <ForgotPassword />
                        </Suspense>
                    }
                />

                <Route
                    path="/login-otp"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <LoginOTP />
                        </Suspense>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <MyAccount />
                        </Suspense>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Orders />
                        </Suspense>
                    }
                />

                <Route
                    path="/wishlist"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Wishlist />
                        </Suspense>
                    }
                />

                <Route
                    path="/addresses"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Addresses />
                        </Suspense>
                    }
                />

                <Route
                    path="/rewards"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Rewards />
                        </Suspense>
                    }
                />

                <Route
                    path="/track-order"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <TrackOrder />
                        </Suspense>
                    }
                />

                <Route
                    path="/blogs"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Blogs />
                        </Suspense>
                    }
                />

                <Route
                    path="/blogs/1"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <BlogDetails1 />
                        </Suspense>
                    }
                />

                <Route
                    path="/blogs/2"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <BlogDetails2 />
                        </Suspense>
                    }
                />

                <Route
                    path="/blogs/3"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <BlogDetails3 />
                        </Suspense>
                    }
                />

                <Route
                    path="/offers"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Offers />
                        </Suspense>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Cart />
                        </Suspense>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Checkout />
                        </Suspense>
                    }
                />

                <Route
                    path="/try-on"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <TryOn />
                        </Suspense>
                    }
                />

                <Route
                    path="/custom-jewellery"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <HomeCD />
                        </Suspense>
                    }
                />

                <Route
                    path="/payment-success"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <PaymentSuccess />
                        </Suspense>
                    }
                />

                <Route 
                    path="/design" 
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <CustomDesign />
                        </Suspense>
                    }

                />

                <Route
                    path="/my-custom-orders"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <MyCustomOrders />
                        </Suspense>
                    }
                />

                <Route
                    path="/payment"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <Payment />
                        </Suspense>
                    }
                />

                <Route
                    path="/brand-story"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <BrandStory />
                        </Suspense>
                    }
                />

                <Route
                    path="/behindthecraft"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <BehindTheCraft />
                        </Suspense>
                    }
                />

                <Route
                    path="/faq"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <FAQ />
                        </Suspense>
                    }
                />

                <Route
                    path="/shipping-policy"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <ShippingPolicy />
                        </Suspense>
                    }
                />

                <Route
                    path="/return-policy"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <ReturnPolicy />
                        </Suspense>
                    }
                />

                <Route
                    path="/privacy-policy"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <PrivacyPolicy />
                        </Suspense>
                    }
                />

                <Route
                    path="/corporate-gifting"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <CorporateGifting />
                        </Suspense>
                    }
                />

                <Route
                    path="/ring-size-guide"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <RingSizeGuide />
                        </Suspense>
                    }
                />

                <Route
                    path="/jewellery-care"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <JewelleryCare />
                        </Suspense>
                    }
                />

                <Route
                    path="/hallmark-certification"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <HallmarkCertification />
                        </Suspense>
                    }
                />

                <Route
                    path="/terms-conditions"
                    element={
                        <Suspense fallback={
                            <>
                                <TopBar />
                                <Navbar />
                            </>
                        } >
                            <TermsConditions />
                        </Suspense>
                    }
                />

            </Routes>
        </AuthProvider>


            <CookieConsent />

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