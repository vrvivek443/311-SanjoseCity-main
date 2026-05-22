import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface TabOneData {
  address: string;
  unit: string;
  phone: string;
  escrowDate: Date | null;
  garbageSize: string;
  recyclingSize: string;
  yardWasteSize: string;
}

interface TabOneProps {
  data: TabOneData;
  onChange: (data: TabOneData) => void;
  onNext: () => void;
}

const GARBAGE_OPTIONS = [
  { key: "small", label: "Small (32 gallon - recommended)" },
  { key: "medium", label: "Medium (64 gallon)" },
  { key: "large", label: "Large (96 gallon)" },
];

const RECYCLING_OPTIONS = [
  { key: "small", label: "Small (32 gallon)" },
  { key: "medium", label: "Medium (64 gallon)" },
  { key: "large", label: "Large (96 gallon - recommended)" },
];

const YARD_WASTE_OPTIONS = [
  { key: "small", label: "Small (32 gallon)" },
  { key: "medium", label: "Medium (64 gallon)" },
  { key: "large", label: "Large (96 gallon)" },
  { key: "none", label: "I don't need a yard waste container" },
];

const TabOne = ({ data, onChange, onNext }: TabOneProps) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof TabOneData, value: any) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

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
    if (!data.escrowDate) {
      e.escrowDate = "Escrow date is required";
      valid = false;
    }
    if (!data.garbageSize) {
      e.garbageSize = "Please select a garbage container size";
      valid = false;
    }
    if (!data.recyclingSize) {
      e.recyclingSize = "Please select a recycling container size";
      valid = false;
    }
    if (!data.yardWasteSize) {
      e.yardWasteSize = "Please select a yard waste container size";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  return (
    <div>
      <p className="mb-4" style={{ fontSize: "14px" }}>
        Moving to a newly built home? Request garbage, recycling and yard
        collection services here. (New construction only)
      </p>

      {/* Address row */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="fw-bold mb-1 d-block">
            Your address<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={data.address}
            onChange={(e) => set("address", e.target.value)}
          />
          {errors.address && (
            <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.address}</p>
          )}
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
      <div className="mb-3">
        <label className="fw-bold mb-1 d-block">
          Your phone number<span className="text-danger">*</span>
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
          <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.phone}</p>
        )}
      </div>

      {/* Escrow date */}
      <div className="mb-3">
        <label className="fw-bold mb-1 d-block">
          What is the date of escrow for your newly built home?
          <span className="text-danger">*</span>
        </label>
        <DatePicker
          selected={data.escrowDate}
          onChange={(date) => set("escrowDate", date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="MM/DD/YYYY"
          minDate={new Date()}
          className="form-control"
          wrapperClassName="d-block"
        />
        {errors.escrowDate && (
          <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.escrowDate}</p>
        )}
      </div>

      {/* Garbage size */}
      <div className="mb-3">
        <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
          What size garbage container do you need?
          <span className="text-danger">*</span>
        </p>
        {GARBAGE_OPTIONS.map((o) => (
          <div className="form-check" key={o.key}>
            <input
              type="radio"
              className="form-check-input"
              name="garbageSize"
              checked={data.garbageSize === o.key}
              onChange={() => set("garbageSize", o.key)}
            />
            <label className="form-check-label" style={{ fontSize: "14px" }}>
              {o.label}
            </label>
          </div>
        ))}
        {errors.garbageSize && (
          <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.garbageSize}</p>
        )}
      </div>

      {/* Recycling size */}
      <div className="mb-3">
        <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
          What size recycling container do you need?
          <span className="text-danger">*</span>
        </p>
        {RECYCLING_OPTIONS.map((o) => (
          <div className="form-check" key={o.key}>
            <input
              type="radio"
              className="form-check-input"
              name="recyclingSize"
              checked={data.recyclingSize === o.key}
              onChange={() => set("recyclingSize", o.key)}
            />
            <label className="form-check-label" style={{ fontSize: "14px" }}>
              {o.label}
            </label>
          </div>
        ))}
        {errors.recyclingSize && (
          <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.recyclingSize}</p>
        )}
      </div>

      {/* Yard waste size */}
      <div className="mb-4">
        <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
          What size yard waste container do you need?
          <span className="text-danger">*</span>
        </p>
        {YARD_WASTE_OPTIONS.map((o) => (
          <div className="form-check" key={o.key}>
            <input
              type="radio"
              className="form-check-input"
              name="yardWasteSize"
              checked={data.yardWasteSize === o.key}
              onChange={() => set("yardWasteSize", o.key)}
            />
            <label className="form-check-label" style={{ fontSize: "14px" }}>
              {o.label}
            </label>
          </div>
        ))}
        {errors.yardWasteSize && (
          <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.yardWasteSize}</p>
        )}
      </div>

      <button
        className="next-btn w-100"
        onClick={() => { if (validate()) onNext(); }}
      >
        Next
      </button>
    </div>
  );
};

export default TabOne;
