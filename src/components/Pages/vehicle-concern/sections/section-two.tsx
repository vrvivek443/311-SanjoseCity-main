import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Modal from "../../../shared/modal/modal";

export interface SectionTwoRef {
  validate: () => boolean;
}

interface SectionTwoProps {
  data: {
    images: File[];
    noPhoto: boolean;
  };
  onChange: (data: any) => void;
}

const SectionTwo = forwardRef<SectionTwoRef, SectionTwoProps>(
  ({ data, onChange }, ref) => {
    const [error, setError] = useState("");
    const [previews, setPreviews] = useState<string[]>([]);

    const { images = [], noPhoto } = data;
    const [showModal, setShowModal] = useState(false);

    // ✅ Generate previews
    useEffect(() => {
      if (!images || images.length === 0) {
        setPreviews([]);
        return;
      }

      const urls = images.map((file) => URL.createObjectURL(file));
      setPreviews(urls);

      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [images]);

    useImperativeHandle(ref, () => ({
      validate() {
        if ((!images || images.length === 0) && !noPhoto) {
          setError("Please upload a photo or select 'I don't have a photo'");
          return false;
        }
        setError("");
        return true;
      },
    }));

    const hasImages = images && images.length > 0;

    const handleAddImages = (files: FileList | null) => {
      if (!files) return;

      const maxSize = 10 * 1024 * 1024; // 10MB

      const validFiles: File[] = [];
      let hasSizeError = false;
      let hasTypeError = false;

      Array.from(files).forEach((file) => {
        // ✅ Allow only images
        if (!file.type.startsWith("image/")) {
          hasTypeError = true;
          return;
        }

        // ✅ File size validation
        if (file.size > maxSize) {
          hasSizeError = true;
          return;
        }

        validFiles.push(file);
      });

      // ✅ Error handling
      if (hasTypeError) {
        setError("Only image files are allowed");
        return;
      }

      if (hasSizeError) {
        setError("Each file must be less than 10 MB");
        return;
      }

      // ✅ Save valid images
      if (validFiles.length > 0) {
        onChange({
          ...data,
          images: [...images, ...validFiles],
          noPhoto: false,
        });

        setError("");
      }
    };
    const handleRemoveImage = (index: number) => {
      const updated = images.filter((_, i) => i !== index);
      onChange({
        ...data,
        images: updated,
      });
    };

    return (
      <>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          message={`We prioritize investigating reports that include a photo of the vehicle.

Including a photo with your report helps our officers locate the vehicle faster and easier thus helping expedite the investigation`}
          primaryText="Upload Photo"
          secondaryText="I understand, continue"
          onPrimary={() => {
            onChange({
              images: [],
              noPhoto: false,
            });
            setShowModal(false);
          }}
          onSecondary={() => {
            setShowModal(false);
          }}
        />

        <div className="container mt-4">
          <label className="form-label fw-bold">
            Upload / take vehicle photo
          </label>

          <p className="text-muted mb-3">
            Photo should show the vehicle condition being reported
          </p>

          {/* ✅ Image Grid Preview */}
          {previews.length > 0 && (
            <div className="row mb-3">
              {previews.map((src, index) => (
                <div className="col-4 mb-3 text-center" key={index}>
                  <img
                    src={src}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <button
                    className="btn btn-sm btn-danger mt-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ✅ Upload Box */}
          <div className="d-flex justify-content-center border border-2 p-4 mb-2">
            <label style={{ cursor: "pointer" }}>
              Add photo
              <input
                type="file"
                accept="image/*"
                multiple
                className="d-none"
                onChange={(e) => handleAddImages(e.target.files)}
              />
            </label>
          </div>

          <p className="text-muted small">Max 10 MB</p>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              checked={noPhoto}
              disabled={hasImages}
              onChange={() => {
                onChange({
                  images: [],
                  noPhoto: true,
                });
                setError("");
                setShowModal(true);
              }}
            />
            <label className="form-check-label">I don't have a photo</label>
          </div>

          {error && <p className="text-danger">{error}</p>}
        </div>
      </>
    );
  },
);

export default SectionTwo;
