import { useState, useRef, useEffect } from "react";
import "./file-upload.css";

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  label?: string;
  description?: string;
  maxSizeMB?: number;
}

const FileUpload = ({
  files,
  onChange,
  label,
  description,
  maxSizeMB = 10,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSize = maxSizeMB * 1024 * 1024;

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid: File[] = [];
    let typeError = false;
    let sizeError = false;

    Array.from(incoming).forEach((file) => {
      if (!file.type.startsWith("image/")) { typeError = true; return; }
      if (file.size > maxSize) { sizeError = true; return; }
      valid.push(file);
    });

    if (typeError) { setError("Only image files (PNG, JPG, JPEG) are allowed"); return; }
    if (sizeError) { setError(`Each file must be less than ${maxSizeMB} MB`); return; }

    if (valid.length > 0) {
      onChange([...files, ...valid]);
      setError("");
    }
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && <label className="fw-bold mb-1 d-block">{label}</label>}
      {description && (
        <p className={`text-muted mb-2 fu-description`}>{description}</p>
      )}

      {previews.length > 0 && (
        <div className="d-flex flex-wrap gap-3 mb-3">
          {previews.map((src, i) => (
            <div key={i} className="fu-preview-wrap">
              <img src={src} alt="preview" className="fu-preview-img" />
              <button type="button" className="new-button" onClick={() => removeFile(i)}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`border rounded p-4 text-center mb-1 fu-dropzone${isDragging ? " fu-dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="fu-camera-icon">📷</div>
        <p className="fw-bold mb-1">Drag file here or</p>
        <span className="fu-choose-link">choose from folder</span>
        <input
          ref={fileInputRef}
          type="file"
          className="d-none"
          multiple
          accept="image/*"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      <p className="text-end text-muted mb-1 fu-max-size">
        Max {maxSizeMB} MB attachments
      </p>

      {error && <p className="text-danger mb-1 fu-error">{error}</p>}
    </div>
  );
};

export default FileUpload;
