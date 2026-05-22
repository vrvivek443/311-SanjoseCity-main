import { useState } from "react";

export interface TabTwoData {
  cartColor: string;
  cartOutAfter6am: string;
  neighborsReceived: string;
  lidClosed: string;
  blocked: string;
  hazardous: string;
}

export const CART_COLORS = [
  { key: "black", label: "Black (Garbage)", swatch: "#1a1a1a" },
  { key: "grey", label: "Grey with blue lid (Recycling)", swatch: "#9e9e9e" },
  { key: "green", label: "Green (Yard waste)", swatch: "#4caf50" },
];

interface TabTwoProps {
  data: TabTwoData;
  onChange: (data: TabTwoData) => void;
  onBack: () => void;
  onNext: () => void;
}

const YesNo = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <>
    <div className="form-check">
      <input
        type="radio"
        className="form-check-input"
        name={name}
        checked={value === "yes"}
        onChange={() => onChange("yes")}
      />
      <label className="form-check-label" style={{ fontSize: "14px" }}>Yes</label>
    </div>
    <div className="form-check mb-3">
      <input
        type="radio"
        className="form-check-input"
        name={name}
        checked={value === "no"}
        onChange={() => onChange("no")}
      />
      <label className="form-check-label" style={{ fontSize: "14px" }}>No</label>
    </div>
  </>
);

const TabTwo = ({ data, onChange, onBack, onNext }: TabTwoProps) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof TabTwoData, value: string) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;
    if (!data.cartColor) { e.cartColor = "Please select a cart color"; valid = false; }
    if (!data.cartOutAfter6am) { e.cartOutAfter6am = "Please select an option"; valid = false; }
    if (!data.neighborsReceived) { e.neighborsReceived = "Please select an option"; valid = false; }
    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* Cart color */}
      <p className="fw-bold mb-2" style={{ fontSize: "14px" }}>
        What is the cart color?<span className="text-danger"> *</span>
      </p>

      {CART_COLORS.map((c) => (
        <div
          key={c.key}
          className={`ci-color-option ${data.cartColor === c.key ? "ci-color-selected" : ""}`}
          onClick={() => set("cartColor", c.key)}
        >
          <input
            type="radio"
            className="form-check-input me-2"
            checked={data.cartColor === c.key}
            onChange={() => {}}
          />
          <span className="ci-color-swatch" style={{ background: c.swatch }} />
          <span style={{ fontSize: "14px" }}>{c.label}</span>
        </div>
      ))}
      {errors.cartColor && (
        <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>{errors.cartColor}</p>
      )}

      {/* Cart out after 6AM */}
      <p className="fw-bold mt-3 mb-1" style={{ fontSize: "14px" }}>
        Did you set your cart out after 6AM?<span className="text-danger"> *</span>
      </p>
      <YesNo name="cartOut" value={data.cartOutAfter6am} onChange={(v) => set("cartOutAfter6am", v)} />
      {errors.cartOutAfter6am && (
        <p className="text-danger mb-2" style={{ fontSize: "13px" }}>{errors.cartOutAfter6am}</p>
      )}

      {/* Neighbors received */}
      <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
        Did your neighbors receive their garbage and recycling services?
        <span className="text-danger"> *</span>
      </p>
      <YesNo name="neighbors" value={data.neighborsReceived} onChange={(v) => set("neighborsReceived", v)} />
      {errors.neighborsReceived && (
        <p className="text-danger mb-2" style={{ fontSize: "13px" }}>{errors.neighborsReceived}</p>
      )}

      {/* Lid closed */}
      <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
        Was the lid completely closed?
      </p>
      <YesNo name="lid" value={data.lidClosed} onChange={(v) => set("lidClosed", v)} />

      {/* Blocked */}
      <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
        Was there anything blocking your cart, e.g. a parked car?
      </p>
      <YesNo name="blocked" value={data.blocked} onChange={(v) => set("blocked", v)} />

      {/* Hazardous */}
      <p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
        Was there anything hazardous in your cart like oil, paint or pressurized tanks?
      </p>
      <YesNo name="hazardous" value={data.hazardous} onChange={(v) => set("hazardous", v)} />

      {/* Buttons */}
      <div className="d-flex gap-2 mt-2">
        <button className="mc-back-outline-btn w-50" onClick={onBack}>
          Go back
        </button>
        <button
          className="next-btn w-50"
          onClick={() => { if (validate()) onNext(); }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TabTwo;
