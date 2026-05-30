import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div style={{ maxWidth: "320px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "var(--accent)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text)" }}>TaskFlow</h1>
          </div>

          <p
            className="auth-left-sub"
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
            }}
          >
            Track projects, manage tasks, and stay productive with a clean modern
            workspace.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div
          className="auth-card"
          style={{
            padding: "2.5rem",
            borderRadius: "16px",
            border: "none",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Welcome Back
          </h2>

          <p
            className="auth-subtitle"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Log in to your account
          </p>

          {error && (
            <p style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", justifyContent: "center" }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-footer-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
