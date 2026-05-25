import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import "./streetlight-outage.css";
import Modal from "../../shared/modal/modal";

const StreetlightOutage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [data, setData] = useState({
    address: "",
    additionalInfo: "",
    poleNumber: "",
    multipleLightsImpacted: "",
    isView: "no",
    position: { lat: 37.3382, lng: -121.8863 },
  });

  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const handleDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setData({ ...data, position: { lat, lng } });
  };

  const handleDroppedFiles = (files: FileList) => {
    let selectedFiles = Array.from(files);

    let hasSizeError = false;
    let hasTypeError = false;

    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        hasTypeError = true;
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        hasSizeError = true;
        return false;
      }

      return true;
    });

    if (hasTypeError) {
      setImageError("Only image files are allowed (JPG, PNG, etc.)");
    } else if (hasSizeError) {
      setImageError("One or more images exceed 10MB limit");
    } else {
      setImageError("");
    }

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);

      // ✅ Clear image required error
      setImageError("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    handleDroppedFiles(files);

    e.target.value = "";
  };

  const validate = () => {
    let newErrors: any = {};

    if (!data.address) {
      newErrors.address =
        "Please provide a location and remember to hit Search";
    }

    // ✅ Pole Number validation
    if (!data.poleNumber || data.poleNumber.trim() === "") {
      newErrors.poleNumber = "Please enter the pole number.";
    }

    // ✅ Multiple Lights validation
    if (!data.multipleLightsImpacted) {
      newErrors.multipleLightsImpacted = "Please select an option";
    }

    // ✅ Public View validation
    if (!data.isView) {
      newErrors.isView = "Please select an option";
    }

    // ✅ Additional Info validation
    if (!data.additionalInfo || data.additionalInfo.trim().length === 0) {
      newErrors.additionalInfo = "Please describe the issue";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Graffiti Data:", data);

      setIsSubmitting(false);
      setShowFeedbackModal(true);
      setShowSuccess(true);
    }, 1000);
  };

  if (showSuccess) {
    return (
      <>
        <Modal
          show={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
        >
          <div className="text-start">
            <h5 className="fw-bold mb-3">Please share your Feedback</h5>

            <p className="fw-semibold">
              How would you rate your overall experience using San Jose 311 to
              enter a service request?
              <span className="text-danger">*</span>
            </p>

            {["Very Good", "Good", "Neutral", "Bad", "Very Bad"].map((item) => (
              <div className="form-check" key={item}>
                <input type="radio" className="form-check-input" name="rating" />
                <label className="form-check-label">{item}</label>
              </div>
            ))}

            <p className="fw-semibold mt-3">
              How did you hear about San Jose 311?
              <span className="text-danger">*</span>
            </p>

            {[
              "I am an active San Jose 311 user",
              "City of San Jose",
              "Social Media",
              "Flyers/Posters",
              "Events",
              "Friend/Family",
              "Radio",
              "Newspaper/Newsletter",
              "Other",
            ].map((item) => (
              <div className="form-check" key={item}>
                <input type="radio" className="form-check-input" name="source" />
                <label className="form-check-label">{item}</label>
              </div>
            ))}

            <div className="text-end mt-3">
              <button
                className="btn btn-info text-white"
                onClick={() => setShowFeedbackModal(false)}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
        <h4 className="fw-bold mb-4">Thank you for your report</h4>

        <AlertNavigation
          description={[
            <>
              Write down your reference ID#{" "}
              <strong>260518-000005.</strong> Use it to track the status of
              your report.
            </>,
            <>
              Typical streetlight outages can be addressed in 16 business
              days,{" "}
              <strong>but are currently taking longer.</strong>
            </>,
            <>
              <strong>Please note:</strong> Due to widespread streetlight
              vandalism and copper wire theft, streetlight outages are
              currently taking{" "}
              <strong className="text-danger">
                at least six months to repair.
              </strong>{" "}
              We are in the process of adding capacity to improve response
              times. You can view our{" "}
              <a
                href="https://csj.maps.arcgis.com/apps/webappviewer/index.html?id=b3621648cdf24ccb9a837d57ecda06eb"
                target="_blank"
                rel="noreferrer"
              >
                Streetlight Stolen Wire and Vandalism Incidents map
              </a>{" "}
              to see service requests and our progress.
            </>,
          ]}
          primaryText="Track my report"
          onPrimary={() =>
            navigate("/track-report", {
              state: {
                service: "Streetlight Outage",
                location: data.address,
                description: data.additionalInfo || "Tell Us More",
                photos: images.map((f) => URL.createObjectURL(f)),
                position: data.position,
              },
            })
          }
          secondaryText="Return home"
          onSecondary={() => navigate("/")}
        />
      </>
    );
  }
  return (
    <>
      <div className="container mt-3 mb-4">
        {/* Header */}
        <h4 className="fw-bold mb-4 mc-title">Your Streetlight Outage Report</h4>

        {/* Photo Upload Section */}
        <div className="mb-3">
          <label className="fw-bold">Add a Photo</label>
          <p className="text-muted" style={{ fontSize: "13px" }}>
            Streetlights are lights on roads or sidewalks. Not lights inside
            parks and buildings, or traffic signals. Submit one report per light
            for multiple outages.
          </p>

          <div
            className="border rounded d-flex flex-column align-items-center justify-content-center p-4"
            style={{
              cursor: "pointer",
              background: "#f8f9fa",
              border: "2px dashed #ccc",
            }}
            onClick={() => document.getElementById("fileInput")?.click()}
            // ✅ Allow drag
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            // ✅ Handle drop
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();

              const files = e.dataTransfer.files;

              if (!files || files.length === 0) return;

              handleDroppedFiles(files);
            }}
          >
            <div style={{ fontSize: "24px" }}>📷</div>
            <p className="mb-0">Drag file here or</p>
            <span className="text-primary">choose from folder</span>
          </div>

          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          {imageError && <p className="text-danger mt-2">{imageError}</p>}

          {/* Preview */}
          {images.length > 0 && (
            <div className="mt-3 d-flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    width={80}
                    height={80}
                    style={{
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="new-button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Address Section */}
        <div className="mb-3">
          <label className="fw-bold">
            Where is it? <span className="text-danger">*</span>
          </label>

          <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
            (Only valid city locations are accepted)
          </p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter address"
            value={data.address}
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
              setErrors((prev: any) => ({ ...prev, address: "" }));
            }}
          />

          {errors.address && <p className="text-danger">{errors.address}</p>}

          <button className="next-btn mb-3 search-btn">
            Search (Optional) 🔍
          </button>
        </div>

        {/* Map */}
        <div className="mb-3">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={data.position}
              zoom={13}
            >
              <Marker
                position={data.position}
                draggable
                onDragEnd={handleDragEnd}
              />
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Pole Number */}
        <div className="mb-3">
          <label className="fw-bold">
            What is the pole number?
            <span className="text-danger">*</span>
          </label>

          <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
            All City of San José streetlight pole numbers should include a
            letter (e.g. 19L2897).
          </p>

          <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
            If you cannot read the number or you are unable to enter it here,
            please call 408-794-1900 with the nearest address to report the
            streetlight outage.
          </p>

          <input
            type="text"
            className="form-control"
            maxLength={7}
            placeholder="Enter pole number"
            value={data.poleNumber}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();

              // Allow only letters and numbers
              if (/^[A-Z0-9]*$/.test(value)) {
                setData({
                  ...data,
                  poleNumber: value,
                });

                setErrors((prev: any) => ({
                  ...prev,
                  poleNumber: "",
                }));
              }
            }}
          />

          <p className="text-muted mt-1" style={{ fontSize: "12px" }}>
            7 characters allowed
          </p>

          {errors.poleNumber && (
            <p className="text-danger">{errors.poleNumber}</p>
          )}
        </div>

        {/* Multiple Lights Impacted */}
        <div className="mb-3">
          <label className="fw-bold">
            Are multiple lights in a row impacted?
            <span className="text-danger">*</span>
          </label>

          <div className="mt-2">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="multipleLightsImpacted"
                checked={data.multipleLightsImpacted === "yes"}
                onChange={() => {
                  setData({
                    ...data,
                    multipleLightsImpacted: "yes",
                  });

                  setErrors((prev: any) => ({
                    ...prev,
                    multipleLightsImpacted: "",
                  }));
                }}
              />

              <label className="form-check-label">Yes</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="multipleLightsImpacted"
                checked={data.multipleLightsImpacted === "no"}
                onChange={() => {
                  setData({
                    ...data,
                    multipleLightsImpacted: "no",
                  });

                  setErrors((prev: any) => ({
                    ...prev,
                    multipleLightsImpacted: "",
                  }));
                }}
              />

              <label className="form-check-label">No</label>
            </div>
          </div>

          {errors.multipleLightsImpacted && (
            <p className="text-danger">{errors.multipleLightsImpacted}</p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mb-3">
          <label className="fw-semibold">
            Tell us more<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Add details here"
            value={data.additionalInfo}
            onChange={(e) => {
              let value = e.target.value;

              // ✅ HARD LIMIT: stop at 4000 chars
              if (value.length > 4000) return;

              setData({ ...data, additionalInfo: value });

              if (value.trim().length === 0) {
                setErrors((prev: any) => ({
                  ...prev,
                  additionalInfo: "This field is required",
                }));
              } else {
                setErrors((prev: any) => ({
                  ...prev,
                  additionalInfo: "",
                }));
              }
            }}
          />
          <p
            className={`mt-1 ${
              data.additionalInfo.length === 4000 ? "text-danger" : "text-muted"
            }`}
            style={{ fontSize: "12px" }}
          >
            {data.additionalInfo.length}/4000 characters
          </p>

          {errors.additionalInfo && (
            <p className="text-danger mb-1">{errors.additionalInfo}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="fw-bold">
            Allow public to view your report?
            <span className="text-danger">*</span>
          </label>
          <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
            No one will see your name
          </p>

          <div className="mt-2">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="isView"
                checked={data.isView === "yes"}
                onChange={() => {
                  setData({ ...data, isView: "yes" });
                  setErrors((prev: any) => ({
                    ...prev,
                    isView: "",
                  }));
                }}
              />
              <label className="form-check-label">Yes</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="offensive"
                checked={data.isView === "no"}
                onChange={() => {
                  setData({ ...data, isView: "no" });
                  setErrors((prev: any) => ({
                    ...prev,
                    isView: "",
                  }));
                }}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          {errors.isView && <p className="text-danger">{errors.isView}</p>}
        </div>

        {/* Submit */}
        <button className="next-btn w-100" onClick={handleSubmit}>
          Submit
        </button>

        {isSubmitting && (
          <div className="loader-overlay">
            <div className="loader-box">
              <div className="spinner"></div>
              <p>Submitting your report...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StreetlightOutage;
