import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

export interface SectionFourRef {
  validate: () => boolean;
}

// ✅ Simple short codes
export type SectionFourCode =
  | "LIV"
  | "TRA"
  | "PAR"
  | "PRI"
  | "POO"
  | "ISS"
  | "CRI";

interface SectionFourProps {
  data: SectionFourCode | ""; // 🔥 from parent
  onChange: (value: SectionFourCode) => void;
}

const SectionFour = forwardRef<SectionFourRef, SectionFourProps>(
  ({ data, onChange }, ref) => {
    const [error, setError] = useState("");

    // ✅ Code + Label mapping (UNCHANGED)
    const options: { code: SectionFourCode; label: string }[] = [
      { code: "LIV", label: "Lived-in vehicle" },
      {
        code: "TRA",
        label:
          "Trash/sewage around a vehicle (not inside the vehicle or on the truck bed)",
      },
      { code: "PAR", label: "Vehicle in a park, creek or trail" },
      { code: "PRI", label: "Vehicle on private property" },
      {
        code: "POO",
        label: "Poor condition of a vehicle parked on a city street",
      },
      {
        code: "ISS",
        label:
          "Issue with how, where or how long a vehicle is parked on a city street",
      },
      {
        code: "CRI",
        label:
          "Suspected vehicle-related criminal activity (drugs or prostitution)",
      },
    ];

    const handleChange = (code: SectionFourCode) => {
      onChange(code); // 🔥 parent state
      setError("");
    };

    // ✅ Validation
    useImperativeHandle(ref, () => ({
      validate() {
        if (!data) {
          setError("Please select a concern");
          return false;
        }
        setError("");
        return true;
      },
    }));

    return (
      <div className="container mt-3 mb-4">
        <h5 className="fw-bold">
          What vehicle concern are you reporting?{" "}
          <span className="text-danger">*</span>
        </h5>

        <p className="text-muted">
          Choose one option that best describes the vehicle concern you are
          reporting.
        </p>

        <div className="list-group">
          {options.map((option) => (
            <label
              key={option.code}
              className={`list-group-item list-group-item-action d-flex gap-2`}
              style={{ cursor: "pointer" }}
            >
              <input
                className="form-check-input mt-1"
                type="radio"
                name="vehicleConcern"
                checked={data === option.code}
                onChange={() => handleChange(option.code)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    );
  }
);

export default SectionFour;