import React, { useState, useRef, useEffect } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE = 10 * 1024 * 1024;

  useEffect(() => {
    const urls = data.files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [data.files]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;

    const valid: File[] = [];
    let typeError = false;
    let sizeError = false;

    Array.from(incoming).forEach((file) => {
      if (!file.type.startsWith("image/")) { typeError = true; return; }
      if (file.size > MAX_SIZE) { sizeError = true; return; }
      valid.push(file);
    });

    if (typeError) {
      setErrors((prev: any) => ({ ...prev, files: "Only image files (PNG, JPG, JPEG) are allowed" }));
      return;
    }

    if (sizeError) {
      setErrors((prev: any) => ({ ...prev, files: "Each file must be less than 10 MB" }));
      return;
    }

    if (valid.length > 0) {
      onChange({ ...data, files: [...data.files, ...valid] });
      setErrors((prev: any) => ({ ...prev, files: "" }));
    }
  };

  const removeFile = (index: number) => {
    onChange({ ...data, files: data.files.filter((_, i) => i !== index) });
  };

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
          <label className="fw-bold mb-1 d-block">
            Upload photo <span className="text-danger">*</span>
          </label>
          <p className="mb-1" style={{ fontSize: "14px" }}>
            Photos should show the observed fireworks activity occurring.
          </p>
          <p className="text-muted mb-2" style={{ fontSize: "13px" }}>
            Select one or more PNG/JPG/JPEG files
          </p>

          {/* Previews */}
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
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: "32px", color: "#198bb3" }}>📷</div>
            <p className="fw-bold mb-1">Drag file here or</p>
            <span style={{ color: "#198bb3", textDecoration: "underline", cursor: "pointer" }}>
              choose from folder
            </span>

            <input
              ref={fileInputRef}
              type="file"
              className="d-none"
              multiple
              accept="image/*"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          <p className="text-end text-muted mb-1" style={{ fontSize: "13px" }}>
            Max 10 MB attachments
          </p>

          {errors.files && (
            <p className="text-danger mb-1">{errors.files}</p>
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
