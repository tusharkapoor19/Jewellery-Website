import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import {
  Heart,
  ShoppingCart,
  CircleUserRound,
  ChevronDown,
  User,
  Package,
  Truck,
  MapPin,
  CreditCard,
  LogOut,
  Gem,
  Crown,
  Sparkles,
  Bell,
  X,
} from "lucide-react";



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
// SHOP BY METAL  -> navigate("/jewellery", { state: { metal: name } })
// ====================================================
const jewelleryMetals = [
  { name: "Gold" },
  { name: "Silver" },
  { name: "White Gold" },
  { name: "Rose Gold" },
  { name: "Platinum" },
];

// ====================================================
// SHOP BY JEWELLERY  -> navigate("/jewellery", { state: { category: name } })
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

const studio = [
  { name: "Custom Jewellery", link: "/custom-jewellery" },
  { name: "Ring Size Guide", link: "/ring-size-guide" },
  { name: "Jewellery Care", link: "/jewellery-care" },
  { name: "Hallmark & Certification", link: "/hallmark-certification" },
];

const Navbar = () => {
  
  const { cartCount } = useCart();

  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Authentication State from localStorage
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

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string>("");
  // const [hasCartItems, setHasCartItems] = useState<boolean>(true);
  const hasCartItems = cartCount > 0;
  const [showCartNudge, setShowCartNudge] = useState<boolean>(false);

  // Notification States
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Ref to the fixed navbar so we can measure its real, rendered
  // height (topbar + navbar together) and push toast notifications
  // below it instead of letting them sit behind it.
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateToastOffset = () => {
      if (navRef.current) {
        // getBoundingClientRect().bottom already accounts for the
        // topbar's height because the navbar's fixed "top" position
        // is pushed down by it.
        const bottom = navRef.current.getBoundingClientRect().bottom;
        document.documentElement.style.setProperty(
          "--toast-top",
          `${bottom + 12}px`
        );
      }
    };

    updateToastOffset();
    window.addEventListener("resize", updateToastOffset);

    return () => window.removeEventListener("resize", updateToastOffset);
  }, []);

  // Dynamic Auth Event Listener & Sync Function
  const syncAuthState = () => {
    const currentToken = localStorage.getItem("token");
    const currentUserName = localStorage.getItem("userName");
    const currentLoggedIn = localStorage.getItem("isLoggedIn");

    setToken(currentToken);
    setUserName(currentUserName);
    setIsLoggedIn(currentLoggedIn === "true" || !!currentToken);
  };

  useEffect(() => {
    syncAuthState();

    const handleAuthChange = () => {
      syncAuthState();
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Fetch Notifications on mount or when token changes
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const profileResponse = await axios.get(
        "http://localhost:5005/profile/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userId = profileResponse.data.user.id;

      const response = await axios.get(
        `http://localhost:5007/notifications/${userId}`
      );

      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  // First fetch immediately
  fetchNotifications();

  // Then check every 5 seconds
  const interval = setInterval(() => {
    fetchNotifications();
  }, 5000);

  // Stop checking when Navbar unmounts/token changes
  return () => clearInterval(interval);
}, [token]);
  useEffect(() => {
    if (!hasCartItems) {
      const timer = setTimeout(() => setShowCartNudge(true), 1200);
      return () => clearTimeout(timer);
    } else{
      setShowCartNudge(false)
    }
  }, [hasCartItems]);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? "" : name);
  };

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");

    setToken(null);
    setUserName(null);
    setIsLoggedIn(false);
    setMobileOpen(false);

    // Notify all app components of authentication state change
    window.dispatchEvent(new Event("auth-change"));

    navigate("/login");
  };

  // Mark notification as read
  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5007/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  // Delete notification
  const handleDeleteNotification = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5007/notifications/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const userIsAuthenticated = isLoggedIn && !!token;

  // Helper navigation functions (state-based, no hash routing)
  const goToJewelleryByCategory = (category: string) => {
    setMobileOpen(false);
    navigate("/jewellery", { state: { category } });
  };

  const goToJewelleryByMetal = (metal: string) => {
    setMobileOpen(false);
    navigate("/jewellery", { state: { metal } });
  };

  const goToCollection = (collection: string) => {
    setMobileOpen(false);
    navigate("/collections", { state: { collection } });
  };

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1>HIRANYA</h1>
            <span>CRAFTED FOR LUXURY</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* Collections */}
            <li className="dropdown">
              <span className="dropdown-title-span">
                <Sparkles size={14} />
                Collections
                <ChevronDown size={12} />
              </span>
              <ul className="dropdown-menu">
                {collections.map((item) => (
                  <li key={item.name}>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => goToCollection(item.name)}
                      style={{ display: "block", padding: "10px 16px", cursor: "pointer" }}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </li>

            {/* Jewellery Mega Menu */}
            <li className="dropdown mega-dropdown">
              <Link to="/jewellery" className="dropdown-title">
                Jewellery <ChevronDown size={12} />
              </Link>

              <div className="dropdown-menu mega-menu">
                <div className="mega-menu-column">
                  <h4 className="mega-menu-heading">
                    <Gem size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                    Shop by Metal
                  </h4>
                  <ul className="mega-menu-list">
                    {jewelleryMetals.map((item) => (
                      <li key={item.name}>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() => goToJewelleryByMetal(item.name)}
                          style={{ display: "block", padding: "10px 16px", cursor: "pointer" }}
                        >
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mega-menu-column">
                  <h4 className="mega-menu-heading">
                    <Crown size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                    Shop by Jewellery
                  </h4>
                  <ul className="mega-menu-grid">
                    {jewellery.map((item) => (
                      <li key={item.name}>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() => goToJewelleryByCategory(item.name)}
                          style={{ display: "block", padding: "10px 16px", cursor: "pointer" }}
                        >
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <Link to="/try-on">Try On</Link>
            </li>

            <li>
              <Link to="/offers">Offers</Link>
            </li>

            {/* Design Studio */}
            <li className="dropdown">
              <span className="dropdown-title-span">
                <Sparkles size={14} />
                Design Studio
                <ChevronDown size={12} />
              </span>
              <ul className="dropdown-menu">
                {studio.map((item) => (
                  <li key={item.name}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link to="/corporate-gifting" className="corporate-btn">
                <span>Corporate Gifting</span>
              </Link>
            </li>

            <li>
              <Link to="/blogs">Blogs</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>

        {/* Right Icons */}
       <div className="icon-wrapper">

    <Link
        to="/wishlist"
        aria-label="Wishlist"
        className="wishlist-link"
    >

        <Heart size={21} />

    </Link>

</div>

          {/* Notification Bell */}
          <div className="icon-wrapper notification-wrapper dropdown">
            <div
              className="notification-icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ cursor: "pointer", position: "relative", display: "flex", alignItems: "center" }}
            >
              <Bell size={21} />
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              )}
            </div>

            {showNotifications && (
              <div className="notification-dropdown-menu">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="close-notif-btn">
                    <X size={16} />
                  </button>
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <p className="no-notifications">No Notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif._id}
                        className={`notification-item ${notif.isRead ? "read" : "unread"}`}
                        onClick={() => handleMarkAsRead(notif._id)}
                      >
                        <div className="notification-content">
                          <h4>{notif.title}</h4>
                          <p>{notif.message}</p>
                          <span className="notification-time">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <button
                          className="delete-notif-btn"
                          onClick={(e) => handleDeleteNotification(e, notif._id)}
                          title="Delete notification"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="icon-wrapper cart-wrapper">
            <Link to="/cart" aria-label="Cart">
              <ShoppingCart size={21} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>

            {!hasCartItems && showCartNudge && (
              <div className="cart-popup-nudge">
                <span>Your cart is empty😔</span>
                <button
                  className="close-nudge"
                  onClick={() => setShowCartNudge(false)}
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown profile-dropdown">
            <div className="profile-icon-btn">
              <CircleUserRound size={21} />
            </div>

            <div className="dropdown-menu profile-menu">
              {userIsAuthenticated ? (
                <div className="profile-user-box">
                  <div className="profile-greeting">
                    <span>Hello,</span>
                    <strong>{userName || "Valued Customer"}</strong>
                  </div>
                  <ul className="profile-list">
                    <li>
                      <Link to="/account">
                        <User size={14} /> My Account
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders">
                        <Package size={14} /> My Orders
                      </Link>
                    </li>
                    <li>
                      <Link to="/track-order">
                        <Truck size={14} /> Track Order
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
                        <MapPin size={14} /> Saved Addresses
                      </Link>
                    </li>
                    <li className="logout-li">
                      <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={14} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="profile-auth-box">
                  <p className="profile-welcome">Welcome back!</p>
                  <Link to="/login" className="btn-auth btn-login">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-auth btn-signup">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

      {/* MOBILE MENU */}
      <div
        className={`mobile-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      ></div>

      <aside className={`mobile-menu ${mobileOpen ? "active" : ""}`}>
        <div className="mobile-header">
          <h2>HIRANYA</h2>
          <i
            className="fa-solid fa-xmark"
            onClick={() => setMobileOpen(false)}
          ></i>
        </div>

        {/* Mobile Profile Header Banner */}
        <div className="mobile-user-banner">
          {userIsAuthenticated ? (
            <div className="mobile-user-info">
              <span className="mobile-greeting-text">
                Hello, {userName || "Valued Customer"} ✨
              </span>
            </div>
          ) : (
            <div className="mobile-auth-btns">
              <Link
                to="/login"
                className="btn-auth btn-login"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-auth btn-signup"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <ul className="mobile-links">
          <li>
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>

          {/* Collections */}
          <li>
            <div
              className="mobile-dropdown-title"
              onClick={() => toggleAccordion("collections")}
            >
              Collections
              <i
                className={`fa-solid ${
                  openAccordion === "collections"
                    ? "fa-chevron-up"
                    : "fa-chevron-down"
                }`}
              ></i>
            </div>
            {openAccordion === "collections" && (
              <ul className="mobile-submenu">
                {collections.map((item) => (
                  <li key={item.name}>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => goToCollection(item.name)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Jewellery */}
          <li>
            <div
              className="mobile-dropdown-title"
              onClick={() => toggleAccordion("jewellery")}
            >
              <span>Jewellery</span>
              <i
                className={`fa-solid ${
                  openAccordion === "jewellery"
                    ? "fa-chevron-up"
                    : "fa-chevron-down"
                }`}
              ></i>
            </div>
            {openAccordion === "jewellery" && (
              <div className="mobile-submenu">
                <div className="mobile-section-label">
                  <Gem size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
                  Shop by Metal
                </div>
                <ul>
                  {jewelleryMetals.map((item) => (
                    <li key={item.name}>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => goToJewelleryByMetal(item.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div
                  className="mobile-section-label"
                  style={{ marginTop: "12px" }}
                >
                  <Crown size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
                  Shop by Jewellery
                </div>
                <ul>
                  {jewellery.map((item) => (
                    <li key={item.name}>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => goToJewelleryByCategory(item.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/try-on" onClick={() => setMobileOpen(false)}>
              Try On
            </Link>
          </li>

          <li>
            <Link to="/offers" onClick={() => setMobileOpen(false)}>
              Offers
            </Link>
          </li>

          {/* Design Studio */}
          <li>
            <div
              className="mobile-dropdown-title"
              onClick={() => toggleAccordion("studio")}
            >
              Design Studio
              <i
                className={`fa-solid ${
                  openAccordion === "studio"
                    ? "fa-chevron-up"
                    : "fa-chevron-down"
                }`}
              ></i>
            </div>
            {openAccordion === "studio" && (
              <ul className="mobile-submenu">
                {studio.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/corporate-gifting"
              onClick={() => setMobileOpen(false)}
              className="mobile-corporate-btn"
            >
              <i className="fa-solid fa-briefcase"></i>
              Corporate Gifting
            </Link>
          </li>

          <li>
            <Link to="/blogs" onClick={() => setMobileOpen(false)}>
              Blogs
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </li>

          <hr className="mobile-divider" />

          {/* Logged-in Mobile Options */}
          {userIsAuthenticated ? (
            <>
              <li>
                <Link to="/account" onClick={() => setMobileOpen(false)}>
                  👤 My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" onClick={() => setMobileOpen(false)}>
                  📦 My Orders
                </Link>
              </li>
              <li>
                <Link to="/track-order" onClick={() => setMobileOpen(false)}>
                  🚚 Track Order
                </Link>
              </li>
              <li>
    <Link
        to="/wishlist"
        onClick={() => setMobileOpen(false)}
        className="wishlist-link"
    >
        ❤️ Wishlist

    </Link>
</li>
              <li>
                <Link to="/addresses" onClick={() => setMobileOpen(false)}>
                  📍 Saved Addresses
                </Link>
              </li>
              <li style={{ marginTop: "12px" }}>
                <button
                  className="logout-btn mobile-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={14} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
            <li>
    <Link
        to="/wishlist"
        onClick={() => setMobileOpen(false)}
        className="wishlist-link"
    >
        ❤️ Wishlist

    </Link>
</li>

              <li>
                <Link to="/cart" onClick={() => setMobileOpen(false)}>
                  🛒 Cart
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