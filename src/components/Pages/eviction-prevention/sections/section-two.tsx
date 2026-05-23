import React, { useState } from "react";

export interface SectionTwoData {
  surveyFor: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  address: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  phone: string;
  allowText: string;
}

interface SectionTwoProps {
  data: SectionTwoData;
  onChange: (data: SectionTwoData) => void;
  onNext: () => void;
  onBack: () => void;
}

interface FieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({
  label,
  required = false,
  type = "text",
  value,
  error,
  onChange,
}) => (
  <div className="mb-3">
    <label className="fw-semibold mb-1 d-block">
      {label}
      {required && <span className="text-danger"> *</span>}
    </label>
    <input
      type={type}
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-danger mb-0 mt-1 ep-error">{error}</p>}
  </div>
);

const SectionTwo: React.FC<SectionTwoProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof SectionTwoData, value: string) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!data.surveyFor) { e.surveyFor = "Please select an option"; valid = false; }
    if (!data.firstName.trim()) { e.firstName = "First name is required"; valid = false; }
    if (!data.lastName.trim()) { e.lastName = "Last name is required"; valid = false; }
    if (!data.address.trim()) { e.address = "Address is required"; valid = false; }
    if (!data.city.trim()) { e.city = "City is required"; valid = false; }
    if (!data.state.trim()) { e.state = "State is required"; valid = false; }
    if (!data.zipcode.trim()) {
      e.zipcode = "Zipcode is required"; valid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(data.zipcode.trim())) {
      e.zipcode = "Please enter a valid zipcode"; valid = false;
    }
    if (!data.email.trim()) {
      e.email = "Email is required"; valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      e.email = "Please enter a valid email address"; valid = false;
    }
    if (!data.phone.trim()) {
      e.phone = "Phone number is required"; valid = false;
    } else if (data.phone.replace(/\D/g, "").length !== 10) {
      e.phone = "Please enter a valid 10-digit phone number"; valid = false;
    }
    if (!data.allowText) { e.allowText = "Please select an option"; valid = false; }

    setErrors(e);
    return valid;
  };

  return (
    <div>

      {/* Survey for */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Is this survey for yourself or others?
          <span className="text-danger"> *</span>
        </label>
        {["Self", "Someone else"].map((val) => (
          <div className="form-check" key={val}>
            <input
              type="radio"
              className="form-check-input"
              name="surveyFor"
              checked={data.surveyFor === val}
              onChange={() => set("surveyFor", val)}
            />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.surveyFor && <p className="text-danger mb-0 mt-1 ep-error">{errors.surveyFor}</p>}
      </div>

      <Field label="First Name" value={data.firstName} error={errors.firstName} onChange={(v) => set("firstName", v)} required />
      <Field label="Middle Initial" value={data.middleInitial} onChange={(v) => set("middleInitial", v)} />
      <Field label="Last Name" value={data.lastName} error={errors.lastName} onChange={(v) => set("lastName", v)} required />
      <Field label="Address" value={data.address} error={errors.address} onChange={(v) => set("address", v)} required />
      <Field label="Address Line 2" value={data.addressLine2} onChange={(v) => set("addressLine2", v)} />
      <Field label="City" value={data.city} error={errors.city} onChange={(v) => set("city", v)} required />
      <Field label="State" value={data.state} error={errors.state} onChange={(v) => set("state", v)} required />
      <Field label="Zipcode" value={data.zipcode} error={errors.zipcode} onChange={(v) => set("zipcode", v)} required />
      <Field label="Email" value={data.email} error={errors.email} onChange={(v) => set("email", v)} required type="email" />
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Phone<span className="text-danger"> *</span>
        </label>
        <input
          type="tel"
          className="form-control"
          value={data.phone}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            let formatted = "";
            if (digits.length > 0) formatted = "(" + digits.slice(0, 3);
            if (digits.length >= 4) formatted += ") " + digits.slice(3, 6);
            if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);
            set("phone", formatted);
          }}
        />
        {errors.phone && <p className="text-danger mb-0 mt-1 ep-error">{errors.phone}</p>}
      </div>

      {/* Allow text */}
      <div className="mb-4">
        <label className="fw-semibold mb-1 d-block">
          Can we send you text messages about your request?
          <span className="text-danger"> *</span>
        </label>
        {["Yes", "No"].map((val) => (
          <div className="form-check" key={val}>
            <input
              type="radio"
              className="form-check-input"
              name="allowText"
              checked={data.allowText === val}
              onChange={() => set("allowText", val)}
            />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.allowText && <p className="text-danger mb-0 mt-1 ep-error">{errors.allowText}</p>}
      </div>

      <div className="d-flex gap-2">
        <button className="ep-back-btn w-50" onClick={onBack}>
          Back
        </button>
        <button className="next-btn w-50" onClick={() => { if (validate()) onNext(); }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionTwo;
