import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Login.css";

const GOOGLE_CLIENT_ID =
  "324239930224-ssqvh9vujf7m2ngamvgtqkrsped8h097.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();

  const { login, googleLogin } = useAuth();

  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // ==========================================
  // GOOGLE IDENTITY SERVICES
  // ==========================================

  useEffect(() => {
    const initializeGoogle = () => {
      const google = (window as any).google;

      if (!google?.accounts?.id || !googleButtonRef.current) {
        return;
      }

      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,

        callback: async (response: any) => {
          try {
            if (!response?.credential) {
              throw new Error("Google authentication failed.");
            }

            setLoading(true);
            setServerError("");

            const role = await googleLogin(response.credential);

            setSuccess(true);

            setTimeout(() => {
              navigate(role === "admin" ? "/admin" : "/");
            }, 1500);
          } catch (error: any) {
            setServerError(
              error?.message ||
                "Google login failed. Please try again."
            );
          } finally {
            setLoading(false);
          }
        },
      });

      // Clear previous button if React re-renders
      googleButtonRef.current.innerHTML = "";

      // Render Google's official button
      google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          width: 400,
          text: "continue_with",
          shape: "pill",
          logo_alignment: "left",
        }
      );
    };

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (existingScript) {
      // Script already loaded
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    document.body.appendChild(script);
  }, [googleLogin, navigate]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e: any) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    let error: any = {};

    if (!formData.email) {
      error.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      error.email = "Enter valid email";
    }

    if (!formData.password) {
      error.password = "Password is required";
    }

    setErrors(error);

    return Object.keys(error).length === 0;
  };

  // ==========================================
  // NORMAL LOGIN
  // ==========================================

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setServerError("");

      const role = await login(
        formData.email,
        formData.password
      );

      setSuccess(true);

      setTimeout(() => {
        navigate(role === "admin" ? "/admin" : "/");
      }, 1500);
    } catch (error: any) {
      setServerError(
        error?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <div className="login-page">

        <div className="login-wrapper">

          {/* LEFT BRAND SECTION */}

          <div className="login-brand">

            <h1>
              HIRANYA
            </h1>

            <p>
              CRAFTED FOR LUXURY
            </p>

            <span>
              Welcome back to your luxury
              <br />
              jewellery experience.
            </span>

            <ul>

              <li>
                ✦ Access your wishlist
              </li>

              <li>
                ✦ Track your orders
              </li>

              <li>
                ✦ Get exclusive collections
              </li>

            </ul>

          </div>


          {/* LOGIN CARD */}

          <div className="login-card">

            {/* SUCCESS MESSAGE */}

            {success && (
              <div className="login-success">

                <div className="success-icon">

                  <i className="fa-solid fa-check"></i>

                </div>

                <h3>
                  Login Successful
                </h3>

                <p>
                  Welcome back to HIRANYA ✨
                </p>

              </div>
            )}


            {/* HEADER */}

            <div className="login-header">

              <h2>
                Welcome Back
              </h2>

              <p>
                Login to your account
              </p>

            </div>


            {/* SERVER ERROR */}

            {serverError && (
              <p className="server-error">
                {serverError}
              </p>
            )}


            {/* ================================= */}
            {/* NORMAL LOGIN FORM */}
            {/* ================================= */}

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="input-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

                {errors.email && (
                  <small>
                    {errors.email}
                  </small>
                )}

              </div>


              {/* PASSWORD */}

              <div className="input-group">

                <label>
                  Password
                </label>

                <div className="password-box">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {errors.password && (
                  <small>
                    {errors.password}
                  </small>
                )}

              </div>


              {/* OPTIONS */}

              <div className="login-options">

                <label>

                  <input
                    type="checkbox"
                    name="remember"
                    checked={
                      formData.remember
                    }
                    onChange={handleChange}
                  />

                  <span>
                    Remember me
                  </span>

                </label>


                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? "Logging In..."
                  : "Login"}
              </button>


              {/* OTP LOGIN */}

              <div className="otp-login">

                <Link to="/login-otp">
                  Login With OTP
                </Link>

              </div>


              {/* CREATE ACCOUNT */}

              <p className="create-account">

                Don't have an account?

                <Link to="/signup">
                  Create Account
                </Link>

              </p>

            </form>

            {/* ================================= */}
            {/* GOOGLE LOGIN — LAST */}
            {/* ================================= */}

            <div className="login-divider">
              <span>
                OR
              </span>
            </div>

            <div className="google-login-wrapper">

              {/* Custom-styled button (visual only) */}
              <button
                type="button"
                className="google-btn-custom"
                tabIndex={-1}
                aria-hidden="true"
              >
                <svg
                  className="google-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                    c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                    c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
                    l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                    c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                    c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
                    C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Real Google button, kept invisible on top so clicks land on it */}
              <div
                ref={googleButtonRef}
                className="google-login-btn-overlay"
              ></div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Login;