import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import "./LoginOTP.css";

const LoginOTP = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [serverError, setServerError] = useState("");
  const [timer, setTimer] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleEmailChange = (e: any) => {
    setFormData({
      ...formData,
      email: e.target.value.toLowerCase(),
    });
  };

  const validateEmail = () => {
    let error: any = {};

    if (!formData.email) {
      error.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      error.email = "Enter valid email address";
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const validateOtp = () => {
    let error: any = {};

    if (!formData.otp) {
      error.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(formData.otp)) {
      error.otp = "OTP must be 6 digits";
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const sendOtp = async () => {
    if (!validateEmail()) return;

    try {
      setLoading(true);
      setServerError("");

      const response = await fetch("http://localhost:5001/auth/sendlogotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP send failed");
      }

      setStep(2);
      setTimer(60);
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      setServerError("");

      const response = await fetch("http://localhost:5001/auth/sendlogotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Resend OTP failed");
      }

      setTimer(60);
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!validateOtp()) return;

    try {
      setLoading(true);
      setServerError("");

      const response = await fetch("http://localhost:5001/auth/verifylogotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // Extract token and exact name returned by backend
      const token = data.token || data.log?.token;
      const userDisplayName = data.name || data.log?.name || "Valued Customer";

      // Save exact authentication details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userDisplayName);
      localStorage.setItem("isLoggedIn", "true");

      // Instantly dispatch event for Navbar updates
      window.dispatchEvent(new Event("auth-change"));

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="loginotp-page">
        <div className="loginotp-wrapper">
          <div className="loginotp-brand">
            <h1>HIRANYA</h1>
            <p>SECURE LUXURY ACCESS</p>
            <span>
              Login securely with OTP and access your jewellery collection.
            </span>

            <ul>
              <li>✦ No password required</li>
              <li>✦ Secure email verification</li>
              <li>✦ Fast & safe login</li>
            </ul>
          </div>

          <div className="loginotp-card">
            {success && (
              <div className="otp-success">
                <div className="success-icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3>Login Successful</h3>
                <p>Welcome back to HIRANYA ✨</p>
              </div>
            )}

            <div className="loginotp-header">
              <h2>Login With OTP</h2>
              <p>Secure access to your account</p>
            </div>

            {serverError && <p className="server-error">{serverError}</p>}

            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <small>{errors.email}</small>}
                </div>
              )}

              {step === 2 && (
                <div className="input-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    maxLength={6}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData({
                        ...formData,
                        otp: value,
                      });
                    }}
                    placeholder="Enter 6 digit OTP"
                  />
                  {errors.otp && <small>{errors.otp}</small>}
                </div>
              )}

              {step === 2 && (
                <div className="resend-box">
                  {timer > 0 ? (
                    <p>Resend OTP in {timer}s</p>
                  ) : (
                    <button
                      type="button"
                      className="resend-btn"
                      onClick={resendOtp}
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              )}

              {step === 1 && (
                <button
                  type="button"
                  className="otp-btn"
                  onClick={sendOtp}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  className="otp-btn"
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              )}

              <p className="back-login">
                <Link to="/login">Back To Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default LoginOTP;