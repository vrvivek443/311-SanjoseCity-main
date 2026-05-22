import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { validateSignupForm } from "../../../utils/authValidation";
import type { FormErrors } from "../../../utils/authValidation";
import "./auth.css";

const LANGUAGES = ["English", "Spanish", "Vietnamese"];

const Signup = () => {
  const navigate = useNavigate();
  const { user, signup } = useAuth();

  const [data, setData] = useState({
    email: "",
    preferredLanguage: "English",
    firstName: "",
    lastName: "",
    address: "",
    unit: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect already-logged-in users
  if (user) return <Navigate to="/" replace />;

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setAuthError("");
  };

  const handleSubmit = () => {
    setAuthError("");

    const validationErrors = validateSignupForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate async — swap this block with a real API call when ready
    setTimeout(() => {
      const result = signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address
          ? `${data.address}${data.unit ? ", " + data.unit : ""}`
          : "",
        preferredLanguage: data.preferredLanguage,
        password: data.password,
      });

      if (result.success) {
        navigate("/");
      } else {
        setAuthError(result.error || "Signup failed. Please try again.");
        setIsSubmitting(false);
      }
    }, 500);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card auth-card-wide">

        {/* Logo / Branding */}
        <div className="auth-logo-row">
          <img src="src/assets/311-Logo.png" alt="311 San Jose logo" className="auth-logo" />
          <h4 className="auth-brand-name">311-San-Jose</h4>
        </div>

        <h3 className="auth-heading">Create an account</h3>
        <p className="auth-subtext">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>Log in</span>
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
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <p className="text-danger auth-error-msg">{errors.email}</p>}
        </div>

        {/* Preferred Language */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">Preferred language</label>
          <select
            className="form-control auth-input"
            value={data.preferredLanguage}
            onChange={(e) => handleChange("preferredLanguage", e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* First Name */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">
            First name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control auth-input ${errors.firstName ? "is-invalid" : ""}`}
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          {errors.firstName && <p className="text-danger auth-error-msg">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">
            Last name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control auth-input ${errors.lastName ? "is-invalid" : ""}`}
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          {errors.lastName && <p className="text-danger auth-error-msg">{errors.lastName}</p>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">Address</label>
          <input
            type="text"
            className="form-control auth-input"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* Unit or Apartment # */}
        <div className="mb-3">
          <label className="fw-semibold auth-label">Unit or Apartment #</label>
          <input
            type="text"
            className="form-control auth-input"
            value={data.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
          />
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
              placeholder="Minimum 8 characters"
              value={data.password}
              onChange={(e) => handleChange("password", e.target.value)}
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="fw-semibold auth-label">
            Confirm password <span className="text-danger">*</span>
          </label>
          <div className="auth-password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control auth-input ${errors.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Re-enter your password"
              value={data.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            <span
              className="auth-toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              <i className={`bx ${showConfirmPassword ? "bx-hide" : "bx-show"}`}></i>
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-danger auth-error-msg">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="auth-btn-row">
          <button
            className="auth-secondary-btn"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
          >
            Return Home
          </button>
          <button
            className="auth-primary-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? <><i className="bx bx-loader-alt bx-spin"></i>&nbsp; Creating account...</>
              : "Sign Up"
            }
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;
