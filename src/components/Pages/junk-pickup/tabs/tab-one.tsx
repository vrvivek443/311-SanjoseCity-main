import { useState } from "react";

export interface TabOneData {
  ack1: boolean;
  ack2: boolean;
  address: string;
  unit: string;
  phone: string;
}

interface TabOneProps {
  data: TabOneData;
  onChange: (data: TabOneData) => void;
  onNext: () => void;
}

const TabOne = ({ data, onChange, onNext }: TabOneProps) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof TabOneData, value: any) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "", ack: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!data.ack1 || !data.ack2) {
      e.ack = "Please confirm both statements";
      valid = false;
    }
    if (!data.address.trim()) {
      e.address = "Your address is required";
      valid = false;
    }
    if (!data.phone.trim()) {
      e.phone = "Phone number is required";
      valid = false;
    } else if (data.phone.replace(/\D/g, "").length !== 10) {
      e.phone = "Please enter a valid 10-digit phone number";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* Acknowledgements */}
      <div className="mb-4">
        <label className="fw-semibold d-block mb-2">
          Please confirm that you read the following:
          <span className="text-danger"> *</span>
        </label>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={data.ack1}
            onChange={(e) => set("ack1", e.target.checked)}
          />
          <label className="form-check-label">
            Only 12 items can be picked up per request.
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={data.ack2}
            onChange={(e) => set("ack2", e.target.checked)}
          />
          <label className="form-check-label">
            No hazardous items (e.g. glass, oil, paint, pressurized tanks) will be picked up.
          </label>
        </div>

        {errors.ack && <p className="text-danger mt-1 mb-0">{errors.ack}</p>}
      </div>

      {/* Address row */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="fw-bold mb-1 d-block">
            Your address<span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={data.address}
            onChange={(e) => set("address", e.target.value)}
          />
          {errors.address && <p className="text-danger mb-0 mt-1">{errors.address}</p>}
        </div>

        <div className="col-md-6">
          <label className="fw-bold mb-1 d-block">Unit or apartment #</label>
          <input
            type="text"
            className="form-control"
            value={data.unit}
            onChange={(e) => set("unit", e.target.value)}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">
          Your phone number<span className="text-danger"> *</span>
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
        {errors.phone && <p className="text-danger mb-0 mt-1">{errors.phone}</p>}
      </div>

      <button className="next-btn w-100" onClick={() => { if (validate()) onNext(); }}>
        Next
      </button>
    </div>
  );
};

export default TabOne;
