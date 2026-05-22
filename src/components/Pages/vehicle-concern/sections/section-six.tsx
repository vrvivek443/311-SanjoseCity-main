import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/modal/modal";

const SectionSix = () => {
  const navigate = useNavigate();

  const [showFeedbackModal, setShowFeedbackModal] = useState(true);

  // ✅ Open modal on load
  useEffect(() => {
    setShowFeedbackModal(true);
  }, []);

  return (
    <>
      {/* ✅ Feedback Modal */}
      <Modal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}>
        <div className="text-start">
          <h5 className="fw-bold mb-3">Please share your Feedback</h5>

          {/* Question 1 */}
          <p className="fw-semibold">
            How would you rate your overall experience using San Jose 311 to enter a service request?
            <span className="text-danger">*</span>
          </p>

          {["Very Good", "Good", "Neutral", "Bad", "Very Bad"].map((item) => (
            <div className="form-check" key={item}>
              <input type="radio" className="form-check-input" name="rating" />
              <label className="form-check-label">{item}</label>
            </div>
          ))}

          {/* Question 2 */}
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

          {/* Submit Button */}
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

      {/* ✅ Existing UI */}
      <div className="container mt-4 mb-4 text-center">
        <div className="p-4 border rounded bg-light">
          <div className="mb-3">
            <div className="submitForm">✓</div>
          </div>

          <h5 className="fw-bold mb-3">
            Thank you for submitting this Vehicle Concerns Report
          </h5>

          <div className="text-start mx-auto maxWidth">
            <p>
              Your service report #{" "}
              <span className="text-primary fw-semibold">
                SJ311PSR20260427-0196
              </span>
            </p>

            <p>
              The City of San José does not currently have an on-demand service
              for responding to illegally parked vehicle reports.
            </p>

            <p>
              You will not receive any additional communication from the City of
              San José.
            </p>

            <p>
              Your report will be used to guide proactive patrols (every 14 days)
              aimed at enforcing illegal parking on every City street.
            </p>

            <p>
              If during investigation, our teams identify additional vehicle
              issues that necessitate the involvement of multiple departments,
              the resolution of your report will take additional time.
            </p>
          </div>

          <div className="mt-4">
            <button
              className="btn btn-info text-white w-100 mb-2"
              onClick={() => {
                navigate("/vehicle-concern");
                window.location.reload();
              }}
            >
              Report another vehicle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionSix;