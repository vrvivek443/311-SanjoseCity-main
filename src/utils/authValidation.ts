// ─── Shared auth validation utils ────────────────────────────────────────────
// Used by login.tsx and signup.tsx.
// Returns a Record<string, string> of field → error message (empty string = valid).

export type FormErrors = Record<string, string>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Individual field validators ───────────────────────────────────────────────

export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
};

export const validateConfirmPassword = (password: string, confirm: string): string => {
  if (!confirm.trim()) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
};

// ── Form-level validators ─────────────────────────────────────────────────────

export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  // Login only checks presence — not length requirement
  if (!password.trim()) errors.password = "Password is required";

  return errors;
};

export const validateSignupForm = (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}): FormErrors => {
  const errors: FormErrors = {};

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";

  const passwordErr = validatePassword(data.password);
  if (passwordErr) errors.password = passwordErr;

  const confirmErr = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;

  return errors;
};
