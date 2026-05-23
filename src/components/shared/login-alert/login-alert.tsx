import React, { useState } from "react";
import "./login-alert.css";

interface LoginAlertProps {
  title?: string;
  description?: string;
  onLogin: (email: string, password: string) => void | Promise<void>;
  onGuestSubmit: () => void;
  isSubmitting?: boolean;
  error?: string;
}

const LoginAlert: React.FC<LoginAlertProps> = ({
  title,
  description = "By logging in you will be able to receive updates on the status of your report.",
  onLogin,
  onGuestSubmit,
  isSubmitting = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      onLogin(email.trim(), password.trim());
    }
  };

  return (
    <div className="la-wrapper">
      {title && <h4 className="fw-bold mb-4 all-title">{title}</h4>}
      <p className="la-description">{description}</p>

      {error && <div className="la-error-banner">{error}</div>}

      <div className="la-field">
        <label className="la-label">Email</label>
        <input
          type="email"
          className="la-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="la-field">
        <label className="la-label">Password</label>
        <div className="la-password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="la-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            disabled={isSubmitting}
          />
          <span
            className="la-toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            <i className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}></i>
          </span>
        </div>
      </div>

      <div className="la-forgot-row">
        <span className="la-link">Forgot your password?</span>
      </div>

      <div className="la-btn-row">
        <button
          className="la-guest-btn"
          onClick={onGuestSubmit}
          disabled={isSubmitting}
        >
          Submit as guest
        </button>
        <button
          className="la-login-btn"
          onClick={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="bx bx-loader-alt bx-spin"></i>&nbsp;Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginAlert;
