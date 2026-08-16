import "./Navbar.css";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

import axios from "axios";

import {
  Heart,
  ShoppingCart,
  CircleUserRound,
  ChevronDown,
  ChevronUp,
  User,
  Package,
  Truck,
  MapPin,
  LogOut,
  Gem,
  Crown,
  Sparkles,
  Bell,
  X,
  Menu,
  BriefcaseBusiness,
  Sun,
  Moon,
} from "lucide-react";

// ====================================================
// COLLECTIONS
// ====================================================

const collections = [
  { name: "All Collections" },
  { name: "Best Sellers" },
  { name: "New Arrivals" },
  { name: "Bridal Collection" },
  { name: "Daily Wear" },
  { name: "Festive Collection" },
  { name: "Office Wear" },
  { name: "Luxury Collection" },
  { name: "Gift Collection" },
];

// ====================================================
// SHOP BY METAL
// ====================================================

const jewelleryMetals = [
  { name: "Gold" },
  { name: "Silver" },
  { name: "White Gold" },
  { name: "Rose Gold" },
  { name: "Platinum" },
];

// ====================================================
// SHOP BY JEWELLERY
// ====================================================

const jewellery = [
  { name: "All Jewellery" },
  { name: "Rings" },
  { name: "Necklaces" },
  { name: "Earrings" },
  { name: "Bracelets" },
  { name: "Bangles" },
  { name: "Chains" },
  { name: "Pendants" },
  { name: "Mangalsutra" },
  { name: "Anklets" },
  { name: "Nose Pins" },
  { name: "Men's Jewellery" },
  { name: "Kids Jewellery" },
  { name: "Idols & Coins" },
];

// ====================================================
// DESIGN STUDIO
// ====================================================

const studio = [
  {
    name: "Custom Jewellery",
    link: "/custom-jewellery",
  },
  {
    name: "Ring Size Guide",
    link: "/ring-size-guide",
  },
  {
    name: "Jewellery Care",
    link: "/jewellery-care",
  },
  {
    name: "Hallmark & Certification",
    link: "/hallmark-certification",
  },
];

// ====================================================
// NAVBAR
// ====================================================

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  // ====================================================
  // AUTHENTICATION
  // ====================================================

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [userName, setUserName] = useState<string | null>(() =>
    localStorage.getItem("userName")
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const logged = localStorage.getItem("isLoggedIn");
    const tok = localStorage.getItem("token");

    return logged === "true" || !!tok;
  });

  // ====================================================
  // MOBILE
  // ====================================================

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const [openAccordion, setOpenAccordion] =
    useState<string>("");

  const hasCartItems = cartCount > 0;

  const [showCartNudge, setShowCartNudge] =
    useState<boolean>(false);

  // ====================================================
  // NOTIFICATIONS
  // ====================================================

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [showNotifications, setShowNotifications] =
    useState<boolean>(false);

  const [notifUserId, setNotifUserId] =
    useState<string | null>(null);

  // ====================================================
  // NAVBAR REF
  // ====================================================

  const navRef = useRef<HTMLElement | null>(null);

  // ====================================================
  // TOAST POSITION
  // ====================================================

  useEffect(() => {
    const updateToastOffset = () => {
      if (navRef.current) {
        const bottom =
          navRef.current.getBoundingClientRect().bottom;

        document.documentElement.style.setProperty(
          "--toast-top",
          `${bottom + 12}px`
        );
      }
    };

    updateToastOffset();

    window.addEventListener(
      "resize",
      updateToastOffset
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateToastOffset
      );
    };
  }, []);

  // ====================================================
  // AUTH SYNC
  // ====================================================

  const syncAuthState = () => {
    const currentToken =
      localStorage.getItem("token");

    const currentUserName =
      localStorage.getItem("userName");

    const currentLoggedIn =
      localStorage.getItem("isLoggedIn");

    setToken(currentToken);
    setUserName(currentUserName);

    setIsLoggedIn(
      currentLoggedIn === "true" ||
        !!currentToken
    );
  };

  useEffect(() => {
    syncAuthState();

    const handleAuthChange = () => {
      syncAuthState();
    };

    window.addEventListener(
      "storage",
      handleAuthChange
    );

    window.addEventListener(
      "auth-change",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleAuthChange
      );

      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );
    };
  }, []);

  // ====================================================
  // FETCH NOTIFICATIONS
  // ====================================================

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const currentToken =
          localStorage.getItem("token");

        if (!currentToken) {
          setNotifications([]);
          return;
        }

        const profileResponse =
          await axios.get(
            "http://localhost:5005/profile/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${currentToken}`,
              },
            }
          );

        const userId =
          profileResponse.data.user.id;

        setNotifUserId(userId);

        const response =
          await axios.get(
            `http://localhost:5007/notifications/${userId}`
          );

        if (response.data.success) {
          setNotifications(
            response.data.notifications
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch notifications",
          error
        );
      }
    };

    fetchNotifications();

    const interval = setInterval(
      fetchNotifications,
      5000
    );

    return () =>
      clearInterval(interval);
  }, [token]);

  // ====================================================
  // CART NUDGE
  // ====================================================

  useEffect(() => {
    if (!hasCartItems) {
      const timer = setTimeout(
        () => setShowCartNudge(true),
        1200
      );

      return () =>
        clearTimeout(timer);
    }

    setShowCartNudge(false);
  }, [hasCartItems]);

  // ====================================================
  // MOBILE ACCORDION
  // ====================================================

  const toggleAccordion = (name: string) => {
    setOpenAccordion(
      openAccordion === name
        ? ""
        : name
    );
  };

  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authProvider");

    setToken(null);
    setUserName(null);
    setIsLoggedIn(false);
    setMobileOpen(false);

    window.dispatchEvent(
      new Event("auth-change")
    );

    navigate("/login");
  };

  // ====================================================
  // MARK NOTIFICATION AS READ
  // ====================================================

  const handleMarkAsRead = async (
    id: string
  ) => {
    try {
      await axios.patch(
        `http://localhost:5007/notifications/${id}/read`
      );

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id
            ? {
                ...notif,
                isRead: true,
              }
            : notif
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read",
        error
      );
    }
  };

  // ====================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ====================================================

  const handleMarkAllAsRead = async () => {
    if (!notifUserId) return;

    try {
      await axios.patch(
        `http://localhost:5007/notifications/${notifUserId}/read-all`
      );

      setNotifications((prev) =>
        prev.map((notif) => ({
          ...notif,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read",
        error
      );
    }
  };

  // ====================================================
  // AUTH CHECK
  // ====================================================

  const userIsAuthenticated =
    isLoggedIn && !!token;

  // ====================================================
  // JEWELLERY NAVIGATION
  // ====================================================

  const goToJewelleryByCategory = (
    category: string
  ) => {
    setMobileOpen(false);

    navigate("/jewellery", {
      state: { category },
    });
  };

  const goToJewelleryByMetal = (
    metal: string
  ) => {
    setMobileOpen(false);

    navigate("/jewellery", {
      state: { metal },
    });
  };

  const goToCollection = (
    collection: string
  ) => {
    setMobileOpen(false);

    navigate("/collections", {
      state: { collection },
    });
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <header
      className="navbar"
      ref={navRef}
    >
      <div className="navbar-container">

        {/* ====================================================
            LOGO
        ==================================================== */}

        <div className="logo">
          <Link
            to="/"
            className="logo-link"
          >
            <h1>HIRANYA</h1>

            <span>
              CRAFTED FOR LUXURY
            </span>
          </Link>
        </div>

        {/* ====================================================
            DESKTOP NAVIGATION
        ==================================================== */}

        <nav>
          <ul className="nav-links">

            {/* HOME */}
            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            {/* ==================================================
                COLLECTIONS
            ================================================== */}

            <li className="dropdown">
              <span className="dropdown-title-span">
                <Sparkles size={14} />

                Collections

                <ChevronDown size={12} />
              </span>

              <ul className="dropdown-menu">
                {collections.map(
                  (item) => (
                    <li
                      key={item.name}
                    >
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          goToCollection(
                            item.name
                          )
                        }
                        style={{
                          display:
                            "block",
                          padding:
                            "10px 16px",
                          cursor:
                            "pointer",
                        }}
                      >
                        {item.name}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </li>

            {/* ==================================================
                JEWELLERY MEGA MENU
            ================================================== */}

            <li className="dropdown mega-dropdown">

              <Link
                to="/jewellery"
                className="dropdown-title"
              >
                Jewellery

                <ChevronDown
                  size={12}
                />
              </Link>

              <div className="dropdown-menu mega-menu">

                {/* SHOP BY METAL */}

                <div className="mega-menu-column">

                  <h4 className="mega-menu-heading">
                    <Gem
                      size={16}
                      style={{
                        marginRight: 6,
                        verticalAlign:
                          "middle",
                      }}
                    />

                    Shop by Metal
                  </h4>

                  <ul className="mega-menu-list">

                    {jewelleryMetals.map(
                      (item) => (
                        <li
                          key={item.name}
                        >
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              goToJewelleryByMetal(
                                item.name
                              )
                            }
                            style={{
                              display:
                                "block",
                              padding:
                                "10px 16px",
                              cursor:
                                "pointer",
                            }}
                          >
                            {item.name}
                          </span>
                        </li>
                      )
                    )}

                  </ul>
                </div>

                {/* SHOP BY JEWELLERY */}

                <div className="mega-menu-column">

                  <h4 className="mega-menu-heading">

                    <Crown
                      size={16}
                      style={{
                        marginRight: 6,
                        verticalAlign:
                          "middle",
                      }}
                    />

                    Shop by Jewellery
                  </h4>

                  <ul className="mega-menu-grid">

                    {jewellery.map(
                      (item) => (
                        <li
                          key={item.name}
                        >
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              goToJewelleryByCategory(
                                item.name
                              )
                            }
                            style={{
                              display:
                                "block",
                              padding:
                                "10px 16px",
                              cursor:
                                "pointer",
                            }}
                          >
                            {item.name}
                          </span>
                        </li>
                      )
                    )}

                  </ul>
                </div>

              </div>
            </li>

            {/* TRY ON */}
            <li>
              <Link to="/try-on">
                Try On
              </Link>
            </li>

            {/* OFFERS */}
            <li>
              <Link to="/offers">
                Offers
              </Link>
            </li>

            {/* ==================================================
                DESIGN STUDIO
            ================================================== */}

            <li className="dropdown">

              <span className="dropdown-title-span">

                <Sparkles size={14} />

                Design Studio

                <ChevronDown size={12} />

              </span>

              <ul className="dropdown-menu">

                {studio.map(
                  (item) => (
                    <li
                      key={item.name}
                    >
                      <Link
                        to={item.link}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                )}

              </ul>
            </li>

            {/* CORPORATE GIFTING */}

            <li>
              <Link
  to="/corporate-gifting"
  className="corporate-btn"
>
  <span>Corporate Gifting</span>
              </Link>
            </li>

            {/* BLOGS */}

            <li>
              <Link to="/blogs">
                Blogs
              </Link>
            </li>

            {/* CONTACT */}

            <li>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>

          </ul>
        </nav>

        {/* ====================================================
            RIGHT ICONS
        ==================================================== */}

        <div className="icon-wrapper">

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="wishlist-link"
          >
            <Heart size={21} />

            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}
          </Link>

        </div>

        {/* ====================================================
            NOTIFICATIONS
        ==================================================== */}

        <div className="icon-wrapper notification-wrapper dropdown">

          <div
            className="notification-icon-btn"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            style={{
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Bell size={21} />

            {notifications.filter(
              (n) => !n.isRead
            ).length > 0 && (
              <span className="notification-badge">
                {
                  notifications.filter(
                    (n) => !n.isRead
                  ).length
                }
              </span>
            )}
          </div>

          {showNotifications && (
            <div className="notification-dropdown-menu">

              <div className="notification-header">

                <h3>
                  Notifications
                </h3>

                {notifications.filter(
                  (n) => !n.isRead
                ).length > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="mark-all-read-btn"
                    aria-label="Mark all notifications as read"
                  >
                    Mark as read
                  </button>
                )}

              </div>

              <div className="notification-list">

                {notifications.length === 0 ? (
                  <p className="no-notifications">
                    No Notifications
                  </p>
                ) : (
                  notifications.map(
                    (notif) => (
                      <div
                        key={notif._id}
                        className={`notification-item ${
                          notif.isRead
                            ? "read"
                            : "unread"
                        }`}
                        onClick={() =>
                          handleMarkAsRead(
                            notif._id
                          )
                        }
                      >

                        <div className="notification-content">

                          <h4>
                            {notif.title}
                          </h4>

                          <p>
                            {notif.message}
                          </p>

                          <span className="notification-time">
                            {new Date(
                              notif.createdAt
                            ).toLocaleTimeString(
                              [],
                              {
                                hour:
                                  "2-digit",
                                minute:
                                  "2-digit",
                              }
                            )}
                          </span>

                        </div>

                      </div>
                    )
                  )
                )}

              </div>
            </div>
          )}

        </div>

        {/* ====================================================
            CART
        ==================================================== */}

        <div className="icon-wrapper cart-wrapper">

          <Link
            to="/cart"
            aria-label="Cart"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          {!hasCartItems &&
            showCartNudge && (
              <div
                className="cart-popup-nudge"
                onMouseEnter={() =>
                  setShowCartNudge(false)
                }
              >

                <span>
                  Your cart is empty
                </span>

                <button
                  className="close-nudge"
                  onClick={() =>
                    setShowCartNudge(false)
                  }
                  aria-label="Close cart notification"
                >
                  <X size={14} />
                </button>

              </div>
            )}

        </div>

        {/* ====================================================
            PROFILE
        ==================================================== */}

        <div className="dropdown profile-dropdown">

          <div className="profile-icon-btn">
            <CircleUserRound size={21} />
          </div>

          <div className="dropdown-menu profile-menu">

            {/* THEME TOGGLE */}

            <div className="theme-toggle-row">

              <span className="theme-toggle-label">
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>

              <button
                type="button"
                className={`theme-toggle-switch ${
                  isDark ? "is-dark" : "is-light"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                role="switch"
                aria-checked={isDark}
                aria-label={`Switch to ${
                  isDark ? "light" : "dark"
                } mode`}
              >
                <Sun
                  size={12}
                  className="theme-toggle-icon theme-toggle-icon-sun"
                />

                <Moon
                  size={12}
                  className="theme-toggle-icon theme-toggle-icon-moon"
                />

                <span className="theme-toggle-thumb" />
              </button>

            </div>

            {userIsAuthenticated ? (
              <div className="profile-user-box">

                <div className="profile-greeting">
                  <span>
                    Hello,
                  </span>

                  <strong>
                    {userName ||
                      "Valued Customer"}
                  </strong>
                </div>

                <ul className="profile-list">

                  <li>
                    <Link to="/account">
                      <User size={14} />
                      My Account
                    </Link>
                  </li>

                  <li>
                    <Link to="/orders">
                      <Package size={14} />
                      My Orders
                    </Link>
                  </li>

                  <li>
                    <Link to="/track-order">
                      <Truck size={14} />
                      Track Order
                    </Link>
                  </li>

                  <li>
                    <Link to="/wishlist">
                      <Heart size={14} />
                      Wishlist
                    </Link>
                  </li>

                  <li>
                    <Link to="/addresses">
                      <MapPin size={14} />
                      Saved Addresses
                    </Link>
                  </li>

                  <li className="logout-li">
                    <button
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </li>

                </ul>

              </div>
            ) : (
              <div className="profile-auth-box">

                <p className="profile-welcome">
                  Welcome back!
                </p>

                <Link
                  to="/login"
                  className="btn-auth btn-login"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn-auth btn-signup"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>
        </div>

        {/* ====================================================
            HAMBURGER
        ==================================================== */}

        <button
          className="hamburger"
          onClick={() =>
            setMobileOpen(true)
          }
          aria-label="Open menu"
        >
          <Menu size={23} />
        </button>

      </div>

      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        className={`mobile-overlay ${
          mobileOpen ? "active" : ""
        }`}
        onClick={() =>
          setMobileOpen(false)
        }
      />

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      <aside
        className={`mobile-menu ${
          mobileOpen ? "active" : ""
        }`}
      >

        {/* MOBILE HEADER */}

        <div className="mobile-header">

          <h2>
            HIRANYA
          </h2>

          <div className="mobile-header-actions">

            <button
              type="button"
              className={`theme-toggle-switch ${
                isDark ? "is-dark" : "is-light"
              }`}
              onClick={toggleTheme}
              role="switch"
              aria-checked={isDark}
              aria-label={`Switch to ${
                isDark ? "light" : "dark"
              } mode`}
            >
              <Sun
                size={12}
                className="theme-toggle-icon theme-toggle-icon-sun"
              />

              <Moon
                size={12}
                className="theme-toggle-icon theme-toggle-icon-moon"
              />

              <span className="theme-toggle-thumb" />
            </button>

            <button
              type="button"
              onClick={() =>
                setMobileOpen(false)
              }
              aria-label="Close menu"
              className="mobile-close-btn"
            >
              <X size={23} />
            </button>

          </div>

        </div>

        {/* ==================================================
            MOBILE PROFILE
        ================================================== */}

        <div className="mobile-user-banner">

          {userIsAuthenticated ? (
            <div className="mobile-user-info">

              <User
                size={18}
              />

              <span className="mobile-greeting-text">
                Hello,{" "}
                {userName ||
                  "Valued Customer"}
              </span>

            </div>
          ) : (
            <div className="mobile-auth-btns">

              <Link
                to="/login"
                className="btn-auth btn-login"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn-auth btn-signup"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Sign Up
              </Link>

            </div>
          )}

        </div>

        {/* ==================================================
            MOBILE LINKS
        ================================================== */}

        <ul className="mobile-links">

          {/* HOME */}

          <li>
            <Link
              to="/"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Home
            </Link>
          </li>

          {/* ==================================================
              COLLECTIONS
          ================================================== */}

          <li>

            <div
              className="mobile-dropdown-title"
              onClick={() =>
                toggleAccordion(
                  "collections"
                )
              }
            >
              <span>
                Collections
              </span>

              {openAccordion ===
              "collections" ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </div>

            {openAccordion ===
              "collections" && (
              <ul className="mobile-submenu">

                {collections.map(
                  (item) => (
                    <li
                      key={item.name}
                    >
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          goToCollection(
                            item.name
                          )
                        }
                        style={{
                          cursor:
                            "pointer",
                        }}
                      >
                        {item.name}
                      </span>
                    </li>
                  )
                )}

              </ul>
            )}

          </li>

          {/* ==================================================
              JEWELLERY
          ================================================== */}

          <li>

            <div
              className="mobile-dropdown-title"
              onClick={() =>
                toggleAccordion(
                  "jewellery"
                )
              }
            >

              <span>
                Jewellery
              </span>

              {openAccordion ===
              "jewellery" ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}

            </div>

            {openAccordion ===
              "jewellery" && (
              <div className="mobile-submenu">

                {/* METAL */}

                <div className="mobile-section-label">

                  <Gem
                    size={12}
                    style={{
                      marginRight: 4,
                      verticalAlign:
                        "middle",
                    }}
                  />

                  Shop by Metal

                </div>

                <ul>

                  {jewelleryMetals.map(
                    (item) => (
                      <li
                        key={item.name}
                      >
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            goToJewelleryByMetal(
                              item.name
                            )
                          }
                          style={{
                            cursor:
                              "pointer",
                          }}
                        >
                          {item.name}
                        </span>
                      </li>
                    )
                  )}

                </ul>

                {/* JEWELLERY */}

                <div
                  className="mobile-section-label"
                  style={{
                    marginTop:
                      "12px",
                  }}
                >

                  <Crown
                    size={12}
                    style={{
                      marginRight: 4,
                      verticalAlign:
                        "middle",
                    }}
                  />

                  Shop by Jewellery

                </div>

                <ul>

                  {jewellery.map(
                    (item) => (
                      <li
                        key={item.name}
                      >
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            goToJewelleryByCategory(
                              item.name
                            )
                          }
                          style={{
                            cursor:
                              "pointer",
                          }}
                        >
                          {item.name}
                        </span>
                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

          </li>

          {/* TRY ON */}

          <li>
            <Link
              to="/try-on"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Try On
            </Link>
          </li>

          {/* OFFERS */}

          <li>
            <Link
              to="/offers"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Offers
            </Link>
          </li>

          {/* ==================================================
              DESIGN STUDIO
          ================================================== */}

          <li>

            <div
              className="mobile-dropdown-title"
              onClick={() =>
                toggleAccordion(
                  "studio"
                )
              }
            >

              <span>
                Design Studio
              </span>

              {openAccordion ===
              "studio" ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}

            </div>

            {openAccordion ===
              "studio" && (
              <ul className="mobile-submenu">

                {studio.map(
                  (item) => (
                    <li
                      key={item.name}
                    >
                      <Link
                        to={item.link}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                )}

              </ul>
            )}

          </li>

          {/* CORPORATE GIFTING */}

          <li>
            <Link
              to="/corporate-gifting"
              onClick={() =>
                setMobileOpen(false)
              }
              className="mobile-corporate-btn"
            >
              <BriefcaseBusiness
                size={16}
              />

              Corporate Gifting
            </Link>
          </li>

          {/* BLOGS */}

          <li>
            <Link
              to="/blogs"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Blogs
            </Link>
          </li>

          {/* CONTACT */}

          <li>
            <Link
              to="/contact"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Contact
            </Link>
          </li>

          <hr className="mobile-divider" />

          {/* ==================================================
              LOGGED-IN MOBILE OPTIONS
          ================================================== */}

          {userIsAuthenticated ? (
            <>
              <li>
                <Link
                  to="/account"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <User size={16} />
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <Package size={16} />
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/track-order"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <Truck size={16} />
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="wishlist-link"
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/addresses"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <MapPin size={16} />
                  Saved Addresses
                </Link>
              </li>

              <li
                style={{
                  marginTop:
                    "12px",
                }}
              >
                <button
                  className="logout-btn mobile-logout"
                  onClick={
                    handleLogout
                  }
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/wishlist"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="wishlist-link"
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <ShoppingCart
                    size={16}
                  />
                  Cart
                </Link>
              </li>
            </>
          )}

        </ul>

      </aside>
    </header>
  );
};

export default Navbar;