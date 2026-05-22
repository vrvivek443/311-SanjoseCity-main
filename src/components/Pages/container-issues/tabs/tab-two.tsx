import { useState, useRef, useEffect } from "react";
import cartImage from "../../../../assets/Lid.png";

export interface TabTwoData {
  cartColor: string;
  authorized: string;
  issues: string[];
}

export const CART_COLORS = [
  {
    key: "black",
    label: "Black (Garbage)",
    swatch: "#1a1a1a",
  },
  {
    key: "grey",
    label: "Grey with blue lid (Recycling)",
    swatch: "#9e9e9e",
  },
  {
    key: "green",
    label: "Green (Yard waste)",
    swatch: "#4caf50",
  },
];

const CART_ISSUES = [
  "Cracks or holes in body",
  "Cracks in hinges and/or handle",
  "Damaged wheels",
  "Damaged Lid",
  "Dirty(graffiti)",
  "Missing or stolen",
  "Wrong size - too large or too small",
  "I need a yard waste cart",
];

interface TabTwoProps {
  onBack: () => void;
  onNext: (data: TabTwoData) => void;
}

const CartDiagram = () => (
  <img src={cartImage} alt="Cart diagram" className="ci-cart-img" />
);

const TabTwo = ({ onBack, onNext }: TabTwoProps) => {
  const [cartColor, setCartColor] = useState("");
  const [authorized, setAuthorized] = useState<string>("");
  const [issues, setIssues] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const toggleIssue = (issue: string) => {
    setIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
    setErrors((prev: any) => ({ ...prev, issues: "" }));
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter(
      (f) =>
        ["image/png", "image/jpeg"].includes(f.type) && f.size <= 10 * 1024 * 1024
    );
    setFiles((prev) => [...prev, ...valid]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;
    if (!cartColor) {
      e.cartColor = "Please select your cart color";
      valid = false;
    }
    if (issues.length === 0) {
      e.issues = "Please select at least one issue";
      valid = false;
    }
    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* Cart color */}
      <p className="fw-bold mb-2">
        What color is your cart?<span className="text-danger"> *</span>
      </p>

      {CART_COLORS.map((c) => (
        <div
          key={c.key}
          className={`ci-color-option ${cartColor === c.key ? "ci-color-selected" : ""}`}
          onClick={() => {
            setCartColor(c.key);
            setErrors((prev: any) => ({ ...prev, cartColor: "" }));
          }}
        >
          <input
            type="radio"
            className="form-check-input me-2"
            checked={cartColor === c.key}
            onChange={() => {}}
          />
          <span
            className="ci-color-swatch"
            style={{ background: c.swatch }}
          />
          <span style={{ fontSize: "14px" }}>{c.label}</span>
        </div>
      ))}
      {errors.cartColor && (
        <p className="text-danger mb-0 mt-1" style={{ fontSize: "13px" }}>
          {errors.cartColor}
        </p>
      )}

      {/* Apartment authorization */}
      <p className="fw-bold mt-4 mb-2" style={{ fontSize: "14px" }}>
        If you live in an apartment or condo, are you authorized to make changes
        to services?
      </p>
      <div className="form-check mb-1">
        <input
          type="radio"
          className="form-check-input"
          name="authorized"
          checked={authorized === "yes"}
          onChange={() => setAuthorized("yes")}
        />
        <label className="form-check-label" style={{ fontSize: "14px" }}>Yes</label>
      </div>
      <div className="form-check mb-3">
        <input
          type="radio"
          className="form-check-input"
          name="authorized"
          checked={authorized === "no"}
          onChange={() => setAuthorized("no")}
        />
        <label className="form-check-label" style={{ fontSize: "14px" }}>No</label>
      </div>

      {/* Cart issues */}
      <p className="fw-bold mb-0" style={{ fontSize: "14px" }}>
        What's wrong with your cart?<span className="text-danger"> *</span>
      </p>
      <p style={{ fontSize: "13px" }} className="mb-2">
        Check all that apply.
      </p>

      <div className="ci-issues-row mb-3">
        <div className="ci-issues-list">
          {CART_ISSUES.map((issue) => (
            <div className="form-check mb-1" key={issue}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={issues.includes(issue)}
                onChange={() => toggleIssue(issue)}
              />
              <label
                className="form-check-label"
                style={{ fontSize: "13px", cursor: "pointer" }}
                onClick={() => toggleIssue(issue)}
              >
                {issue}
              </label>
            </div>
          ))}
          {errors.issues && (
            <p className="text-danger mb-0" style={{ fontSize: "13px" }}>
              {errors.issues}
            </p>
          )}
        </div>

        <CartDiagram />
      </div>

      {/* Add a Photo */}
      <p className="fw-bold mb-0" style={{ fontSize: "14px" }}>Add a Photo</p>
      <p className="mb-0" style={{ fontSize: "13px", color: "#6c757d" }}>
        Help us find it faster.
      </p>
      <p className="mb-2" style={{ fontSize: "13px", color: "#6c757d" }}>
        Select one or more PNG/JPG/JPEG files
      </p>

      {/* Image previews */}
      {previews.length > 0 && (
        <div className="d-flex flex-wrap gap-3 mb-3">
          {previews.map((src, i) => (
            <div key={i} style={{ position: "relative", width: "80px", height: "80px" }}>
              <img
                src={src}
                alt="preview"
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: "6px" }}
              />
              <button
                type="button"
                className="new-button"
                onClick={() => removeFile(i)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        className="border rounded p-4 text-center mb-1"
        style={{
          background: isDragging ? "#e8f4f8" : "#f0f7fa",
          borderColor: "#b0d4e0",
          cursor: "pointer",
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="d-none"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div style={{ fontSize: "32px", color: "#198bb3" }}>📷</div>
        <p className="fw-bold mb-1">Drag file here or</p>
        <span style={{ color: "#198bb3", textDecoration: "underline", cursor: "pointer" }}>
          choose from folder
        </span>
      </div>

      <p className="text-end text-muted mb-3" style={{ fontSize: "13px" }}>
        Max 10 MB attachments
      </p>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="ci-back-outline-btn w-50" onClick={onBack}>
          Go back
        </button>
        <button
          className="next-btn w-50"
          onClick={() => { if (validate()) onNext({ cartColor, authorized, issues }); }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TabTwo;
