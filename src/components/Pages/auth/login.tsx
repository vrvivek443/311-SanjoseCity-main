import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { validateLoginForm } from "../../../utils/authValidation";
import type { FormErrors } from "../../../utils/authValidation";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect already-logged-in users
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = () => {
    setAuthError("");

    const validationErrors = validateLoginForm(data.email, data.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate async — swap this block with a real API call when ready
    setTimeout(() => {
      const result = login(data.email, data.password);
      if (result.success) {
        navigate("/");
      } else {
        setAuthError(result.error || "Login failed. Please try again.");
        setIsSubmitting(false);
      }
    }, 500);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">

        {/* Logo / Branding */}
        <div className="auth-logo-row">
          <img src="src/assets/311-Logo.png" alt="311 San Jose logo" className="auth-logo" />
          <h4 className="auth-brand-name">311-San-Jose</h4>
        </div>

        <h3 className="auth-heading">Log in</h3>
        <p className="auth-subtext">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/signup")}>Sign up</span>
        </p>

        {authError && <div className="auth-alert-error">{authError}</div>}

        {/* Email */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control auth-input ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setErrors((prev) => ({ ...prev, email: "" }));
              setAuthError("");
            }}
          />
          {errors.email && <p className="text-danger auth-error-msg">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">
            Password <span className="text-danger">*</span>
          </label>
          <div className="auth-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control auth-input ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
                setErrors((prev) => ({ ...prev, password: "" }));
                setAuthError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <span
              className="auth-toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}></i>
            </span>
          </div>
          {errors.password && <p className="text-danger auth-error-msg">{errors.password}</p>}
        </div>

        {/* Forgot password */}
        <div className="auth-forgot-row">
          <span className="auth-link">Forgot your password?</span>
        </div>

        {/* Login button */}
        <button
          className="auth-primary-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? <><i className="bx bx-loader-alt bx-spin"></i>&nbsp; Logging in...</>
            : "Log in"
          }
        </button>

        <div className="auth-divider"><span>or</span></div>

        <button
          className="auth-secondary-btn"
          onClick={() => navigate("/")}
          disabled={isSubmitting}
        >
          Return home
        </button>

      </div>
    </div>
  );
};

export default Login;
