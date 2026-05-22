import React, { useState } from "react";

export interface SectionThreeData {
  name: string;
  fullAddress: string;
  phone: string;
  email: string;
  ack1: boolean;
  ack2: boolean;
  ack3: boolean;
}

interface SectionThreeProps {
  data: SectionThreeData;
  onChange: (data: SectionThreeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const SectionThree: React.FC<SectionThreeProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    let isValid = true;

    if (!data.name.trim()) {
      newErrors.name = "Please enter your name";
      isValid = false;
    }

    if (!data.fullAddress.trim()) {
      newErrors.fullAddress = "Please enter your full address";
      isValid = false;
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
      isValid = false;
    } else if (data.phone.replace(/\D/g, "").length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!data.email.trim()) {
      newErrors.email = "Please enter your email address";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!data.ack1) {
      newErrors.ack1 = "You must acknowledge this statement";
      isValid = false;
    }

    if (!data.ack2) {
      newErrors.ack2 = "You must acknowledge this statement";
      isValid = false;
    }

    if (!data.ack3) {
      newErrors.ack3 = "You must acknowledge this statement";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validate()) return;
    onNext();
  };

  return (
    <div>
      {/* Name */}
      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">
          Your name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          maxLength={30}
          value={data.name}
          onChange={(e) => {
            onChange({ ...data, name: e.target.value });
            setErrors((prev: any) => ({ ...prev, name: "" }));
          }}
        />
        <small className="text-muted">30 characters allowed</small>
        {errors.name && <p className="text-danger mb-0">{errors.name}</p>}
      </div>

      {/* Full address */}
      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">
          Your full address <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          maxLength={100}
          value={data.fullAddress}
          onChange={(e) => {
            onChange({ ...data, fullAddress: e.target.value });
            setErrors((prev: any) => ({ ...prev, fullAddress: "" }));
          }}
        />
        <small className="text-muted">100 characters allowed</small>
        {errors.fullAddress && (
          <p className="text-danger mb-0">{errors.fullAddress}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">
          Your phone number <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          className="form-control"
          placeholder="(111) 111-1111"
          value={data.phone}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            let formatted = "";
            if (digits.length > 0) formatted = "(" + digits.slice(0, 3);
            if (digits.length >= 4) formatted += ") " + digits.slice(3, 6);
            if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);
            onChange({ ...data, phone: formatted });
            setErrors((prev: any) => ({ ...prev, phone: "" }));
          }}
        />
        {errors.phone && <p className="text-danger mb-0">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">
          Your email address <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          value={data.email}
          onChange={(e) => {
            onChange({ ...data, email: e.target.value });
            setErrors((prev: any) => ({ ...prev, email: "" }));
          }}
        />
        {errors.email && <p className="text-danger mb-0">{errors.email}</p>}
      </div>

      <hr />

      {/* Acknowledgment */}
      <div className="mb-4">
        <p className="fw-bold mb-3">Acknowledgment:</p>

        {/* Ack 1 */}
        <div className="mb-3">
          <div className="form-check align-items-start d-flex gap-2">
            <input
              type="checkbox"
              className="form-check-input mt-1 flex-shrink-0"
              checked={data.ack1}
              onChange={(e) => {
                onChange({ ...data, ack1: e.target.checked });
                setErrors((prev: any) => ({ ...prev, ack1: "" }));
              }}
            />
            <label className="form-check-label">
              I understand my report will not result in an immediate emergency
              response (police/fire). If this is an emergency please call 911.{" "}
              <span className="text-danger">*</span>
            </label>
          </div>
          {errors.ack1 && <p className="text-danger mb-0 ms-4">{errors.ack1}</p>}
        </div>

        {/* Ack 2 */}
        <div className="mb-3">
          <div className="form-check align-items-start d-flex gap-2">
            <input
              type="checkbox"
              className="form-check-input mt-1 flex-shrink-0"
              checked={data.ack2}
              onChange={(e) => {
                onChange({ ...data, ack2: e.target.checked });
                setErrors((prev: any) => ({ ...prev, ack2: "" }));
              }}
            />
            <label className="form-check-label">
              I understand my information will remain confidential, but may be
              released if required by law.{" "}
              <span className="text-danger">*</span>
            </label>
          </div>
          {errors.ack2 && <p className="text-danger mb-0 ms-4">{errors.ack2}</p>}
        </div>

        {/* Ack 3 */}
        <div className="mb-3">
          <div className="form-check align-items-start d-flex gap-2">
            <input
              type="checkbox"
              className="form-check-input mt-1 flex-shrink-0"
              checked={data.ack3}
              onChange={(e) => {
                onChange({ ...data, ack3: e.target.checked });
                setErrors((prev: any) => ({ ...prev, ack3: "" }));
              }}
            />
            <label className="form-check-label">
              If enforcement action is taken (citation, etc.), I understand I
              may be asked to testify about the content of my report.{" "}
              <span className="text-danger">*</span>
            </label>
          </div>
          {errors.ack3 && <p className="text-danger mb-0 ms-4">{errors.ack3}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="d-flex gap-2 mt-3">
        <button className="back-btn w-50" onClick={onBack}>
          Back
        </button>
        <button className="next-btn w-50" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionThree;
