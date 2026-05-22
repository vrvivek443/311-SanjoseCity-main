import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./junk-pickup.css";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";
import TabOne from "./tabs/tab-one";
import type { TabOneData } from "./tabs/tab-one";
import TabTwo from "./tabs/tab-two";
import TabThree from "./tabs/tab-three";
import TabFour from "./tabs/tab-four";

const JunkPickup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [tabOneData, setTabOneData] = useState<TabOneData>({
    ack1: false,
    ack2: false,
    address: "",
    unit: "",
    phone: "",
  });
  const [tabTwoQuantities, setTabTwoQuantities] = useState<Record<string, number>>({});

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
            "Your reference ID# is 260520-000002.",
            "You will receive an email with the first available date and if that date doesn't work, you can contact the hauler directly to reschedule it.",
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
      <h4 className="fw-bold mb-4 jp-title">Request Junk Pickup</h4>

      {step === 1 && (
        <TabOne
          data={tabOneData}
          onChange={setTabOneData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <TabTwo
          onBack={() => setStep(1)}
          onNext={(quantities) => {
            setTabTwoQuantities(quantities);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <TabThree
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <TabFour
          tabOneData={tabOneData}
          quantities={tabTwoQuantities}
          onBack={() => setStep(3)}
          onSubmit={() => {
            setShowFeedbackModal(true);
            setShowSuccess(true);
          }}
        />
      )}
    </div>
  );
};

export default JunkPickup;
