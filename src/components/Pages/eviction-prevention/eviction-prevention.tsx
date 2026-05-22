import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./eviction-prevention.css";
import SectionOne from "./sections/section-one";
import SectionTwo from "./sections/section-two";
import type { SectionTwoData } from "./sections/section-two";
import SectionThree from "./sections/section-three";
import type { SectionThreeData } from "./sections/section-three";
import SectionFour from "./sections/section-four";
import type { SectionFourData } from "./sections/section-four";
import SectionFive from "./sections/section-five";
import type { SectionFiveData } from "./sections/section-five";
import FinalReport from "./sections/final-report";
import EditAll from "./sections/edit-all";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";

const TOTAL_STEPS = 5;

const EvictionPrevention = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [sectionTwoData, setSectionTwoData] = useState<SectionTwoData>({
    surveyFor: "Self",
    firstName: "",
    middleInitial: "",
    lastName: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "CA",
    zipcode: "",
    email: "",
    phone: "",
    allowText: "",
  });

  const [sectionThreeData, setSectionThreeData] = useState<SectionThreeData>({
    adults: "",
    minors: "",
    incomeRange: "",
    incomeAmount: "",
    sourceOfIncome: [],
    preferredLanguage: "",
  });

  const [sectionFourData, setSectionFourData] = useState<SectionFourData>({
    evictionNotice: "",
    scheduleAppointment: "",
    rentalAssistance: "",
    helpWith: [],
  });

  const [sectionFiveData, setSectionFiveData] = useState<SectionFiveData>({
    heardAboutUs: [],
    otherSpecify: "",
  });

  return (
    <div className="container mt-3 mb-4">
      {/* Stepper */}
      {step <= TOTAL_STEPS && (
        <div className="d-flex justify-content-center align-items-center mb-4 mt-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isActive = step >= stepNum;
            return (
              <React.Fragment key={stepNum}>
                <div className={isActive ? "ep-stepper-dot-active" : "ep-stepper-dot"} />
                {stepNum < TOTAL_STEPS && (
                  <div className={step > stepNum ? "ep-stepper-line-active" : "ep-stepper-line"} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Header */}
      {(step < 7 || step === 8) && (
        <h4 className="fw-bold mb-4 ep-heading">
          {step === 1 ? "Eviction Prevention" : "Eviction Prevention Assistance Request"}
        </h4>
      )}

      {step === 1 && (
        <SectionOne
          onBack={() => navigate("/eviction-prevention-warning")}
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
        <SectionFour
          data={sectionFourData}
          onChange={setSectionFourData}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}
      {step === 5 && (
        <SectionFive
          data={sectionFiveData}
          onChange={setSectionFiveData}
          onBack={() => setStep(4)}
          onNext={() => setStep(6)}
        />
      )}
      {step === 6 && (
        <FinalReport
          sectionTwo={sectionTwoData}
          sectionThree={sectionThreeData}
          sectionFour={sectionFourData}
          sectionFive={sectionFiveData}
          onEdit={() => setStep(8)}
          onSubmit={() => { setStep(7); setShowFeedbackModal(true); }}
        />
      )}
      {step === 8 && (
        <EditAll
          sectionTwo={sectionTwoData}
          sectionThree={sectionThreeData}
          sectionFour={sectionFourData}
          sectionFive={sectionFiveData}
          onSectionTwoChange={setSectionTwoData}
          onSectionThreeChange={setSectionThreeData}
          onSectionFourChange={setSectionFourData}
          onSectionFiveChange={setSectionFiveData}
          onSave={() => setStep(7)}
        />
      )}
      {step === 7 && (
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
          <AlertNavigation
            title={`Thank you for your assistance request, ${sectionTwoData.firstName} ${sectionTwoData.lastName}`}
            description={[
              "Your Assistance Request has been submitted. A confirmation email is being sent to your registered email address. Someone from our team will reach out to you within 2 business days.",
              <a href="#" className="ep-link">
                Download a PDF of my submitted form
              </a>,
            ]}
            primaryText="Return Home"
            secondaryText=""
            onPrimary={() => navigate("/")}
            onSecondary={() => {}}
          />
        </>
      )}
    </div>
  );
};

export default EvictionPrevention;
