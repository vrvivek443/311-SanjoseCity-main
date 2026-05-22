import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./container-issues.css";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";
import TabOne from "./tabs/tab-one";
import type { TabOneData } from "./tabs/tab-one";
import TabTwo from "./tabs/tab-two";
import type { TabTwoData } from "./tabs/tab-two";
import TabThree from "./tabs/tab-three";

const ContainerIssues = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [tabOneData, setTabOneData] = useState<TabOneData>({
    address: "",
    unit: "",
    phone: "",
    serialNumber: "",
  });

  const [tabTwoData, setTabTwoData] = useState<TabTwoData>({
    cartColor: "",
    authorized: "",
    issues: [],
  });

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
            "Your reference ID# is 260521-000003.",
            "Your neighborhood service provider will reach out to you directly by phone within one business days.",
          ]}
          primaryText="Return home"
          onPrimary={() => navigate("/")}
          secondaryText=""
          onSecondary={() => {}}
        />
      </>
    );
  }

  return (
    <div className="container mt-3 mb-4">
      <h4 className="fw-bold mb-4 ci-title">
        Request Container Exchange or Repair
      </h4>

      {step === 1 && (
        <TabOne
          data={tabOneData}
          onChange={setTabOneData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <TabTwo
          data={tabTwoData}
          onChange={setTabTwoData}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <TabThree
          tabOneData={tabOneData}
          tabTwoData={tabTwoData}
          onBack={() => setStep(2)}
          onSubmit={() => {
            setShowFeedbackModal(true);
            setShowSuccess(true);
          }}
        />
      )}
    </div>
  );
};

export default ContainerIssues;
