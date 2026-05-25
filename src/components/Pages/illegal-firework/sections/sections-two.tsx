import React, { useState } from "react";
import FileUpload from "../../../shared/file-upload/file-upload";

export interface SectionTwoData {
  knowWho: string;
  name1: string;
  name2: string;
  hasEvidence: string;
  files: File[];
}

interface SectionTwoProps {
  data: SectionTwoData;
  onChange: (data: SectionTwoData) => void;
  onNext: () => void;
  onBack: () => void;
}

const SectionTwo: React.FC<SectionTwoProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    let isValid = true;

    if (!data.knowWho) {
      newErrors.knowWho = "Please select an option";
      isValid = false;
    }

    if (data.knowWho === "yes" && !data.name1.trim()) {
      newErrors.name1 = "Please provide the name of the person";
      isValid = false;
    }

    if (!data.hasEvidence) {
      newErrors.hasEvidence = "Please select an option";
      isValid = false;
    }

    if (data.hasEvidence === "yes" && data.files.length === 0) {
      newErrors.files = "Please upload at least one photo or video";
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
      {/* Q1 — Know who */}
      <div className="mb-4">
        <label className="fw-bold mb-2 d-block">
          Do you know who used, sold, or possessed the illegal fireworks?
          <span className="text-danger">*</span>
        </label>

        {["yes", "no"].map((val) => (
          <div className="form-check" key={val}>
            <input
              type="radio"
              className="form-check-input"
              name="knowWho"
              checked={data.knowWho === val}
              onChange={() => {
                onChange({ ...data, knowWho: val, name1: "", name2: "" });
                setErrors((prev: any) => ({ ...prev, knowWho: "" }));
              }}
            />
            <label className="form-check-label">
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </label>
          </div>
        ))}

        {errors.knowWho && (
          <p className="text-danger mb-1">{errors.knowWho}</p>
        )}
      </div>

      {/* Conditional name fields */}
      {data.knowWho === "yes" && (
        <div className="mb-4">
          <label className="fw-bold mb-2 d-block">
            Please provide the name of the person(s)
            <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className="form-control mb-1"
            maxLength={50}
            value={data.name1}
            onChange={(e) => {
              onChange({ ...data, name1: e.target.value });
              setErrors((prev: any) => ({ ...prev, name1: "" }));
            }}
          />
          <small className="text-muted d-block mb-2">50 characters allowed</small>

          {errors.name1 && (
            <p className="text-danger mb-1">{errors.name1}</p>
          )}

          <input
            type="text"
            className="form-control mb-1"
            maxLength={50}
            value={data.name2}
            onChange={(e) => onChange({ ...data, name2: e.target.value })}
          />
          <small className="text-muted d-block">50 characters allowed</small>
        </div>
      )}

      {/* Q2 — Evidence */}
      <div className="mb-4">
        <label className="fw-bold mb-2 d-block">
          Do you have a photo or video evidence of the incident?
          <span className="text-danger">*</span>
        </label>

        {["yes", "no"].map((val) => (
          <div className="form-check" key={val}>
            <input
              type="radio"
              className="form-check-input"
              name="hasEvidence"
              checked={data.hasEvidence === val}
              onChange={() => {
                onChange({ ...data, hasEvidence: val, files: [] });
                setErrors((prev: any) => ({ ...prev, hasEvidence: "", files: "" }));
              }}
            />
            <label className="form-check-label">
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </label>
          </div>
        ))}

        {errors.hasEvidence && (
          <p className="text-danger mb-1">{errors.hasEvidence}</p>
        )}
      </div>

      {/* Conditional file upload */}
      {data.hasEvidence === "yes" && (
        <div className="mb-4">
          <FileUpload
            files={data.files}
            onChange={(files) => {
              onChange({ ...data, files });
              setErrors((prev: any) => ({ ...prev, files: "" }));
            }}
            label="Upload photo *"
            description="Photos should show the observed fireworks activity occurring."
          />
          {errors.files && (
            <p className="text-danger mb-1" style={{ fontSize: "13px" }}>{errors.files}</p>
          )}
        </div>
      )}

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

export default SectionTwo;
