import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./services-new-homes.css";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";
import TabOne from "./tabs/tab-one";
import type { TabOneData } from "./tabs/tab-one";
import TabTwo from "./tabs/tab-two";

const ServicesNewHomes = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [tabOneData, setTabOneData] = useState<TabOneData>({
    address: "",
    unit: "",
    phone: "",
    escrowDate: null,
    garbageSize: "",
    recyclingSize: "",
    yardWasteSize: "",
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
            "Your reference ID# is 260521-000000.",
            "We'll reach out if there are any issues with your request.",
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
      <h4 className="fw-bold mb-4 snh-title">Start Services for Newly Built Homes</h4>

      {step === 1 && (
        <TabOne
          data={tabOneData}
          onChange={setTabOneData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <TabTwo
          tabOneData={tabOneData}
          onBack={() => setStep(1)}
          onSubmit={() => {
            setShowFeedbackModal(true);
            setShowSuccess(true);
          }}
        />
      )}
    </div>
  );
};

export default ServicesNewHomes;
