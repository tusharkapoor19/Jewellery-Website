import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="brand brand--login">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                d="M12 2 L21 9 L12 22 L3 9 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M3 9 L21 9" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M8.5 9 L12 2 L15.5 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>
          <div>
            <h1>Aurelia</h1>
            <p>Jewellery Admin</p>
          </div>
        </div>

        <h2 className="login-title">Sign in</h2>
        <p className="panel-subtitle">
          Use your admin account to manage orders and the catalogue.
        </p>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="admin@aurelia.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="banner banner--error">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
