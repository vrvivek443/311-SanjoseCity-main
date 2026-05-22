import React, { useState } from "react";

export interface SectionFiveData {
  heardAboutUs: string[];
  otherSpecify: string;
}

interface SectionFiveProps {
  data: SectionFiveData;
  onChange: (data: SectionFiveData) => void;
  onNext: () => void;
  onBack: () => void;
}

const HEARD_ABOUT_OPTIONS = [
  "Abode",
  "City of San Jose",
  "Flyer",
  "Health Trust",
  "Homeless Prevention System (HPS)",
  "Legal aid organization",
  "Office of Supportive Housing",
  "Project Sentinel",
  "Radio/ TV",
  "Sacred Heart",
  "Santa Clara County Housing Authority",
  "Self-Help center",
  "Social Media",
  "Word of Mouth",
  "Other, please specify",
];

const SectionFive: React.FC<SectionFiveProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<any>({});

  const toggleOption = (option: string) => {
    const updated = data.heardAboutUs.includes(option)
      ? data.heardAboutUs.filter((h) => h !== option)
      : [...data.heardAboutUs, option];
    onChange({ ...data, heardAboutUs: updated });
    setErrors((prev: any) => ({ ...prev, heardAboutUs: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (data.heardAboutUs.length === 0) {
      e.heardAboutUs = "Please select at least one option";
      valid = false;
    }
    if (data.heardAboutUs.includes("Other, please specify") && !data.otherSpecify.trim()) {
      e.otherSpecify = "Please specify";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const showOtherInput = data.heardAboutUs.includes("Other, please specify");

  return (
    <div>
      <div className="mb-4">
        <label className="fw-semibold mb-1 d-block">
          How did you hear about us? (check all that apply)
          <span className="text-danger"> *</span>
        </label>
        {HEARD_ABOUT_OPTIONS.map((option) => (
          <div className="form-check" key={option}>
            <input
              type="checkbox"
              className="form-check-input"
              checked={data.heardAboutUs.includes(option)}
              onChange={() => toggleOption(option)}
            />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
        {showOtherInput && (
          <div className="mt-2">
            <label className="fw-semibold mb-1 d-block">
              Please Specify<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={data.otherSpecify}
              onChange={(e) => {
                onChange({ ...data, otherSpecify: e.target.value });
                setErrors((prev: any) => ({ ...prev, otherSpecify: "" }));
              }}
            />
            {errors.otherSpecify && (
              <p className="text-danger mb-0 mt-1 ep-error">
                {errors.otherSpecify}
              </p>
            )}
          </div>
        )}
        {errors.heardAboutUs && (
          <p className="text-danger mb-0 mt-1 ep-error">
            {errors.heardAboutUs}
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

export default SectionFive;
