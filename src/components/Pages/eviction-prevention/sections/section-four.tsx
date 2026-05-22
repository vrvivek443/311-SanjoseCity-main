import React, { useState } from "react";

export interface SectionFourData {
  evictionNotice: string;
  scheduleAppointment: string;
  rentalAssistance: string;
  helpWith: string[];
}

interface SectionFourProps {
  data: SectionFourData;
  onChange: (data: SectionFourData) => void;
  onNext: () => void;
  onBack: () => void;
}

const RENTAL_ASSISTANCE_OPTIONS = [
  "Emergency Rental Assistance Program (ERAP)",
  "HOME Investment Partnership Program",
  "Section 8 / Housing Choice Voucher",
  "Community Action Agency",
  "Non-profit organization",
  "Other government program",
  "No",
];

const HELP_WITH_OPTIONS = [
  "Financial assistance or other resources",
  "Eviction prevention legal services",
  "Other",
];

const SectionFour: React.FC<SectionFourProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof SectionFourData, value: string) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const toggleHelpWith = (option: string) => {
    const updated = data.helpWith.includes(option)
      ? data.helpWith.filter((h) => h !== option)
      : [...data.helpWith, option];
    onChange({ ...data, helpWith: updated });
    setErrors((prev: any) => ({ ...prev, helpWith: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!data.evictionNotice) { e.evictionNotice = "Please select an option"; valid = false; }
    if (!data.scheduleAppointment) { e.scheduleAppointment = "Please select an option"; valid = false; }
    if (data.helpWith.length === 0) { e.helpWith = "Please select at least one option"; valid = false; }

    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* Eviction Notice */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Do you think you have received a termination or{" "}
          <span className="ep-underline">eviction notice</span> or a{" "}
          <span className="ep-underline">Notice to Pay</span>?
          <span className="text-danger"> *</span>
        </label>
        {["Yes", "No", "I am not sure"].map((val) => (
          <div className="form-check" key={val}>
            <input
              type="radio"
              className="form-check-input"
              name="evictionNotice"
              checked={data.evictionNotice === val}
              onChange={() => set("evictionNotice", val)}
            />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.evictionNotice && (
          <p className="text-danger mb-0 mt-1 ep-error">
            {errors.evictionNotice}
          </p>
        )}
      </div>

      {/* Schedule Appointment */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Would you like us to contact you to schedule an appointment?
          <span className="text-danger"> *</span>
        </label>
        {["Yes", "No", "I have an appointment"].map((val) => (
          <div className="form-check" key={val}>
            <input
              type="radio"
              className="form-check-input"
              name="scheduleAppointment"
              checked={data.scheduleAppointment === val}
              onChange={() => set("scheduleAppointment", val)}
            />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.scheduleAppointment && (
          <p className="text-danger mb-0 mt-1 ep-error">
            {errors.scheduleAppointment}
          </p>
        )}
      </div>

      {/* Rental Assistance */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Have you ever received rental assistance from other sources?
        </label>
        <select
          className="form-select"
          value={data.rentalAssistance}
          onChange={(e) => set("rentalAssistance", e.target.value)}
        >
          <option value=""></option>
          {RENTAL_ASSISTANCE_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Help With */}
      <div className="mb-4">
        <label className="fw-semibold mb-1 d-block">
          What do you need help with ?
          <span className="text-danger"> *</span>
        </label>
        {HELP_WITH_OPTIONS.map((option) => (
          <div className="form-check" key={option}>
            <input
              type="checkbox"
              className="form-check-input"
              checked={data.helpWith.includes(option)}
              onChange={() => toggleHelpWith(option)}
            />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
        {errors.helpWith && (
          <p className="text-danger mb-0 mt-1 ep-error">
            {errors.helpWith}
          </p>
        )}
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

export default SectionFour;
