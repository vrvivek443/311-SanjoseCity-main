import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface SectionThreeRef {
  validate: () => boolean;
}

export interface SectionThreeData {
  concerns: string[];
}

interface SectionThreeProps {
  data: SectionThreeData;
  onChange: (data: SectionThreeData) => void;
}

const OPTIONS = [
  "Significant unsanitary conditions",
  "Severe vector control issues (rodents present in large quantities)",
  "Biohazards present (e.g. feces, needles, etc.)",
  "Fire danger",
  "Vehicle or pedestrian danger",
  "Unauthorized access to electrical",
  "Adjacent to residential wall or fence",
  "None of the above. Exit this form.",
];

const NONE_OPTION = "None of the above. Exit this form.";

const SectionThree = forwardRef<SectionThreeRef, SectionThreeProps>(
  ({ data, onChange }, ref) => {
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
      validate() {
        if (data.concerns.length === 0) {
          setError("Please select at least one option");
          return false;
        }
        setError("");
        return true;
      },
    }));

    const handleChange = (option: string, checked: boolean) => {
      let updated: string[];

      if (option === NONE_OPTION) {
        updated = checked ? [NONE_OPTION] : [];
      } else {
        const without = data.concerns.filter((c) => c !== NONE_OPTION);
        updated = checked
          ? [...without, option]
          : without.filter((c) => c !== option);
      }

      onChange({ concerns: updated });
      if (updated.length > 0) setError("");
    };

    return (
      <div>
        <p className="fw-semibold mb-3">
          What are the health and safety concerns you are reporting? Select all
          that apply. <span className="text-danger">*</span>
        </p>

        {OPTIONS.map((option) => (
          <div className="form-check mb-2" key={option}>
            <input
              type="checkbox"
              className="form-check-input"
              id={option}
              checked={data.concerns.includes(option)}
              onChange={(e) => handleChange(option, e.target.checked)}
            />
            <label className="form-check-label ec-check-label" htmlFor={option}>
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

export default SectionThree;
