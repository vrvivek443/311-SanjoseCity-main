import { useState } from "react";

export interface TabOneData {
  address: string;
  unit: string;
  phone: string;
  serialNumber: string;
}

interface TabOneProps {
  data: TabOneData;
  onChange: (data: TabOneData) => void;
  onNext: () => void;
}

const TabOne = ({ data, onChange, onNext }: TabOneProps) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof TabOneData, value: string) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!data.address.trim()) {
      e.address = "Service address is required";
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
      {/* Address row */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="fw-bold mb-1 d-block">
            Service address<span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={data.address}
            onChange={(e) => set("address", e.target.value)}
          />
          {errors.address && (
            <p className="text-danger mb-0 mt-1">{errors.address}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="fw-bold mb-1 d-block">Unit or Apartment #</label>
          <input
            type="text"
            className="form-control"
            value={data.unit}
            onChange={(e) => {
              const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
              set("unit", val);
            }}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-3">
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
        {errors.phone && (
          <p className="text-danger mb-0 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Serial number */}
      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">
          What is the serial number on your container?
        </label>
        <input
          type="text"
          className="form-control"
          value={data.serialNumber}
          onChange={(e) => set("serialNumber", e.target.value)}
        />
      </div>

      <button
        className="next-btn w-100"
        onClick={() => {
          if (validate()) onNext();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default TabOne;
