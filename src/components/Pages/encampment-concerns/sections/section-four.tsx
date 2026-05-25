import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface SectionFourRef {
  validate: () => boolean;
}

export interface SectionFourData {
  locations: string[];
  description: string;
}

interface SectionFourProps {
  data: SectionFourData;
  onChange: (data: SectionFourData) => void;
}

const LOCATIONS = [
  "Sidewalk",
  "Street",
  "Trail",
  "Median",
  "Waterway",
  "On ramp or off ramp",
  "City facility (Park, playground, park restroom, community center, library, fire station)",
  "Other Describe below",
];

const SectionFour = forwardRef<SectionFourRef, SectionFourProps>(
  ({ data, onChange }, ref) => {
    const [errors, setErrors] = useState<{ locations?: string; description?: string }>({});

    useImperativeHandle(ref, () => ({
      validate() {
        const newErrors: { locations?: string; description?: string } = {};
        if (data.locations.length === 0) newErrors.locations = "Please select at least one option";
        if (!data.description || data.description.trim().length === 0)
          newErrors.description = "Description is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    const handleLocationChange = (option: string, checked: boolean) => {
      const updated = checked
        ? [...data.locations, option]
        : data.locations.filter((l) => l !== option);
      onChange({ ...data, locations: updated });
      if (updated.length > 0) setErrors((prev) => ({ ...prev, locations: undefined }));
    };

    return (
      <div>
        {/* Location checkboxes */}
        <p className="fw-semibold mb-3">
          Where is the encampment located? Select all that apply:{" "}
          <span className="text-danger">*</span>
        </p>

        {LOCATIONS.map((option) => (
          <div className="form-check mb-2" key={option}>
            <input
              type="checkbox"
              className="form-check-input"
              id={option}
              checked={data.locations.includes(option)}
              onChange={(e) => handleLocationChange(option, e.target.checked)}
            />
            <label className="form-check-label ec-check-label" htmlFor={option}>
              {option}
            </label>
          </div>
        ))}

        {errors.locations && (
          <p className="text-danger mt-1 ec-error">
            {errors.locations}
          </p>
        )}

        {/* Description */}
        <div className="mt-3">
          <label className="fw-semibold">
            Description of Location- Tell us more(e.g. dogs present, burned
            materials, etc.) <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control mt-2"
            rows={3}
            placeholder="Enter Text"
            value={data.description}
            onChange={(e) => {
              onChange({ ...data, description: e.target.value });
              if (e.target.value.trim().length > 0)
                setErrors((prev) => ({ ...prev, description: undefined }));
            }}
          />
          {errors.description && (
            <p className="text-danger mt-1 ec-error">
              {errors.description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default SectionFour;
