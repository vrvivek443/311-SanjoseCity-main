import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";

const CommunityWifi = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [data, setData] = useState({
    area: "",
    wifiConnected: "",
    experienceTime: "",
    wifiLocation: "",
    deviceType: "",
    experienceRating: "",
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

  const validate = () => {
    let newErrors: any = {};
    let isValid = true;

    if (!data.area) {
      newErrors.area = "Please select an area";
      isValid = false;
    }

    if (!data.wifiConnected) {
      newErrors.wifiConnected = "Please select an option";
      isValid = false;
    }

    if (!data.experienceTime) {
      newErrors.experienceTime = "Please select when you had this experience";
      isValid = false;
    }

    if (!data.wifiLocation) {
      newErrors.wifiLocation = "Please select a location";
      isValid = false;
    }

    if (!data.deviceType) {
      newErrors.deviceType = "Please select a device";
      isValid = false;
    }

    if (!data.experienceRating) {
      newErrors.experienceRating = "Please rate your experience";
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
            "At this time your report will be used to inform future service upgrades."
          ]}
          primaryText="Track my report"
          onPrimary={() => navigate("/track-report")}
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
        <h4 className="fw-bold mb-4">Community WiFi</h4>

        <div className="mb-4">
          <label className="fw-semibold mb-2 d-block">
            Select where you experienced poor WiFi service with the “SJ Access
            Community WiFi" in San Jose.
            <span className="text-danger">*</span>
          </label>

          <select
            className="form-select"
            value={data.area}
            onChange={(e) => { setData({ ...data, area: e.target.value }); setErrors((prev: any) => ({ ...prev, area: "" })); }}
          >
            <option value="">Select an option</option>
            <option>Andrew Hill High School attendance area</option>
            <option>Downtown San Jose</option>
            <option>Independence High School attendance area</option>
          </select>

          {errors.area && <small className="text-danger">{errors.area}</small>}
        </div>

        {/* Address Section */}
        <div className="mb-3">
          <label className="fw-bold">
            Select an option Please move the map pin to where you experienced
            the poor WiFi connectivity to help us identify the location more
            accurately. <span className="text-danger">*</span>
          </label>
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

        {/* Dropdown Fields */}
        <div className="mt-4">
          {/* Question 1 */}
          <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">
              Were you able to connect to "SJ Access Community WiFi" ?
              <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={data.wifiConnected}
              onChange={(e) => { setData({ ...data, wifiConnected: e.target.value }); setErrors((prev: any) => ({ ...prev, wifiConnected: "" })); }}
            >
              <option value="">Select an option</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            {errors.wifiConnected && (
              <small className="text-danger">{errors.wifiConnected}</small>
            )}
          </div>

          {/* Question 2 */}
          <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">
              When did you have this experience ?
              <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={data.experienceTime}
              onChange={(e) => { setData({ ...data, experienceTime: e.target.value }); setErrors((prev: any) => ({ ...prev, experienceTime: "" })); }}
            >
              <option value="">Select an option</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>

            {errors.experienceTime && (
              <small className="text-danger">{errors.experienceTime}</small>
            )}
          </div>

          {/* Question 3 */}
          <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">
              At what location were you connecting to "SJ Access Community WiFi"
              ?<span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={data.wifiLocation}
              onChange={(e) => { setData({ ...data, wifiLocation: e.target.value }); setErrors((prev: any) => ({ ...prev, wifiLocation: "" })); }}
            >
              <option value="">Select an option</option>
              <option>Library</option>
              <option>Park</option>
              <option>Community Center</option>
              <option>Other</option>
            </select>

            {errors.wifiLocation && (
              <small className="text-danger">{errors.wifiLocation}</small>
            )}
          </div>

          {/* Question 4 */}
          <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">
              What device were you using to connect to "SJ Access Community
              WiFi" ?<span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={data.deviceType}
              onChange={(e) => { setData({ ...data, deviceType: e.target.value }); setErrors((prev: any) => ({ ...prev, deviceType: "" })); }}
            >
              <option value="">Select an option</option>
              <option>Android</option>
              <option>iPhone</option>
              <option>Laptop</option>
              <option>Tablet</option>
            </select>

            {errors.deviceType && (
              <small className="text-danger">{errors.deviceType}</small>
            )}
          </div>

          {/* Question 5 */}
          <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">
              How would you rate your experience with "SJ Access Community WiFi"
              ?<span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={data.experienceRating}
              onChange={(e) => { setData({ ...data, experienceRating: e.target.value }); setErrors((prev: any) => ({ ...prev, experienceRating: "" })); }}
            >
              <option value="">Select an option</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>

            {errors.experienceRating && (
              <small className="text-danger">{errors.experienceRating}</small>
            )}
          </div>
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

export default CommunityWifi;
