import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./illegal-firework.css";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";
import SectionOne from "./sections/sections-one";
import type { SectionOneData } from "./sections/sections-one";
import SectionTwo from "./sections/sections-two";
import type { SectionTwoData } from "./sections/sections-two";
import SectionThree from "./sections/sections-three";
import type { SectionThreeData } from "./sections/sections-three";
import FinalReport from "./sections/final-report";
import EditAll from "./sections/edit-all";
import IllegalFireworkWarning from "./illegal-firework-warning";

const TOTAL_STEPS = 3;

const IllegalFirework = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(true);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [sectionOneData, setSectionOneData] = useState<SectionOneData>({
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    address: "",
    additionalInfo: "",
    position: { lat: 37.3382, lng: -121.8863 },
  });

  const [sectionTwoData, setSectionTwoData] = useState<SectionTwoData>({
    knowWho: "",
    name1: "",
    name2: "",
    hasEvidence: "",
    files: [],
  });

  const [sectionThreeData, setSectionThreeData] = useState<SectionThreeData>({
    name: "",
    fullAddress: "",
    phone: "",
    email: "",
    ack1: false,
    ack2: false,
    ack3: false,
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowFeedbackModal(true);
      setShowSuccess(true);
    }, 1000);
  };

  if (showWarning) {
    return <IllegalFireworkWarning onAgree={() => setShowWarning(false)} />;
  }

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
        {/* Stepper — hidden on final review */}
        {step <= TOTAL_STEPS && <div className="d-flex justify-content-center align-items-center mb-4 mt-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isActive = step >= stepNum;
            return (
              <React.Fragment key={stepNum}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: isActive ? "#198bb3" : "#fff",
                    border: `2px solid ${isActive ? "#198bb3" : "#d9d9d9"}`,
                  }}
                />
                {stepNum < TOTAL_STEPS && (
                  <div
                    style={{
                      width: "90px",
                      height: "2px",
                      background: step > stepNum ? "#198bb3" : "#d9d9d9",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>}

        {/* Header */}
        <h4 className="fw-bold mb-4 mc-title">My Illegal Fireworks Report</h4>

        {step === 1 && (
          <SectionOne
            data={sectionOneData}
            onChange={setSectionOneData}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SectionTwo
            data={sectionTwoData}
            onChange={setSectionTwoData}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <SectionThree
            data={sectionThreeData}
            onChange={setSectionThreeData}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <FinalReport
            sectionOne={sectionOneData}
            sectionTwo={sectionTwoData}
            sectionThree={sectionThreeData}
            onEdit={() => setStep(5)}
            onSubmit={handleSubmit}
          />
        )}
        {step === 5 && (
          <EditAll
            sectionOne={sectionOneData}
            sectionTwo={sectionTwoData}
            sectionThree={sectionThreeData}
            onSectionOneChange={setSectionOneData}
            onSectionTwoChange={setSectionTwoData}
            onSectionThreeChange={setSectionThreeData}
            onSave={handleSubmit}
          />
        )}

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

export default IllegalFirework;
