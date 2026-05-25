import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import FileUpload from "../../shared/file-upload/file-upload";
import "./illegal-dumping.css";
import Modal from "../../shared/modal/modal";

const IllegalDumping = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [data, setData] = useState({
    address: "",
    additionalInfo: "",
    graffitiOn: "",
    isPublic: "",
    isOffensive: "",
    isView: "no",
    position: { lat: 37.3382, lng: -121.8863 }, // San Jose default
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

  const validate = () => {
    let newErrors: any = {};
    let isValid = true;

    // Address validation
    if (!data.address) {
      newErrors.address =
        "Please provide a location and remember to hit Search";
      isValid = false;
    }

    // Public view validation
    if (!data.isView) {
      newErrors.isView = "Please select an option";
      isValid = false;
    }

    // Additional info validation
    if (!data.additionalInfo || data.additionalInfo.trim().length === 0) {
      newErrors.additionalInfo = "Please describe the issue";
      isValid = false;
    }

    // Image validation
    if (images.length === 0) {
      newErrors.images = "Please upload at least one image";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
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
        <h4 className="fw-bold mb-4">Thank you for your report, Vivek Vr!</h4>

        <AlertNavigation
          description={[
            "Your reference ID# is 260507-000018.",
            "We'll also email you a confirmation.",
            "The RAPID (Removing and Preventing Illegal Dumping) team will respond to reports of illegal dumping within 5 business days.",
          ]}
          primaryText="Track my report"
          onPrimary={() =>
            navigate("/track-report", {
              state: {
                service: "Illegal Dumping",
                location: data.address,
                description: data.additionalInfo || "Tell Us More",
                photos: images.map((f) => URL.createObjectURL(f)),
                position: data.position,
              },
            })
          }
          secondaryText=""
          onSecondary={() => {}}
        />
      </>
    );
  }
  return (
    <>
      <div className="container mt-3 mb-4">
        {/* Header */}
        <h4 className="fw-bold mb-4 all-title">Your Illegal Dumping Report</h4>
        <p className="text-muted">
          Illegal dumping includes large amounts of garbage and junk left on
          City of San Jose streets or sidewalks.
        </p>

        {/* Photo Upload Section */}
        <div className="mb-3">
          <FileUpload
            files={images}
            onChange={(files) => { setImages(files); setErrors((prev: any) => ({ ...prev, images: "" })); }}
            label="Add a Photo *"
            description="Help us find it faster. Select any type of image format (Max 10MB each)"
          />
          {errors.images && <p className="text-danger mt-1" style={{ fontSize: "13px" }}>{errors.images}</p>}
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
                    whereIsIt: "",
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
          {errors.whereIsIt && <p className="text-danger">{errors.isView}</p>}
        </div>

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

export default IllegalDumping;
