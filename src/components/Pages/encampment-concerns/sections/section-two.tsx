import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface SectionTwoRef {
  validate: () => boolean;
}

export interface SectionTwoData {
  condition: string;
}

interface SectionTwoProps {
  data: SectionTwoData;
  onChange: (data: SectionTwoData) => void;
}

const CONDITIONS = [
  "Blocking right of way (e.g. sidewalk, street, etc.)",
  "Significant Health and Safety Concern",
  "Within 150ft of a school or a park playground",
  "Within a No Encampment Zone",
  "None of the above. Exit the form.",
];

const SectionTwo = forwardRef<SectionTwoRef, SectionTwoProps>(
  ({ data, onChange }, ref) => {
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
      validate() {
        if (!data.condition) {
          setError("Please select one option");
          return false;
        }
        setError("");
        return true;
      },
    }));

    return (
      <div>
        <p className="fw-semibold mb-3">
          Encampments can be reported if they meet at least one of the following
          conditions. Select one: <span className="text-danger">*</span>
        </p>

        {CONDITIONS.map((option) => (
          <div className="form-check mb-2" key={option}>
            <input
              type="radio"
              className="form-check-input"
              name="condition"
              id={option}
              checked={data.condition === option}
              onChange={() => {
                onChange({ condition: option });
                setError("");
              }}
            />
            <label
              className="form-check-label ec-check-label"
              htmlFor={option}
            >
              {option}
            </label>
          </div>
        ))}

        {error && (
          <p className="text-danger mt-1 ec-error">{error}</p>
        )}
      </div>
    );
  }
);

export default SectionTwo;
