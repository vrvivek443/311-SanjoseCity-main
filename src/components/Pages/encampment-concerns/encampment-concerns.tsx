import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./encampment-concerns.css";
import SectionOne from "./sections/section-one";
import SectionTwo from "./sections/section-two";
import SectionThree from "./sections/section-three";
import SectionFour from "./sections/section-four";
import SectionFive from "./sections/section-five";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import type { SectionOneRef, SectionOneData } from "./sections/section-one";
import type { SectionTwoRef, SectionTwoData } from "./sections/section-two";
import type { SectionThreeRef, SectionThreeData } from "./sections/section-three";
import type { SectionFourRef, SectionFourData } from "./sections/section-four";
import type { SectionFiveRef, SectionFiveData } from "./sections/section-five";

const TOTAL_STEPS = 5;

const EncampmentConcerns: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionOneRef = useRef<SectionOneRef>(null);
  const sectionTwoRef = useRef<SectionTwoRef>(null);
  const sectionThreeRef = useRef<SectionThreeRef>(null);
  const sectionFourRef = useRef<SectionFourRef>(null);
  const sectionFiveRef = useRef<SectionFiveRef>(null);

  const [sectionOneData, setSectionOneData] = useState<SectionOneData>({
    address: "",
    position: { lat: 37.3382, lng: -121.8863 },
  });

  const [sectionTwoData, setSectionTwoData] = useState<SectionTwoData>({
    condition: "",
  });

  const [sectionThreeData, setSectionThreeData] = useState<SectionThreeData>({
    concerns: [],
  });

  const [sectionFourData, setSectionFourData] = useState<SectionFourData>({
    locations: [],
    description: "",
  });

  const [sectionFiveData, setSectionFiveData] = useState<SectionFiveData>({
    images: [],
  });

  const stepValidationMap: Record<number, () => boolean | undefined> = {
    1: () => sectionOneRef.current?.validate(),
    2: () => sectionTwoRef.current?.validate(),
    3: () => sectionThreeRef.current?.validate(),
    4: () => sectionFourRef.current?.validate(),
    5: () => sectionFiveRef.current?.validate(),
  };

  const isHealthAndSafety = sectionTwoData.condition === "Significant Health and Safety Concern";

  const handleNext = () => {
    const validate = stepValidationMap[currentStep];
    if (validate && !validate()) return;

    if (currentStep === 2) {
      if (sectionTwoData.condition === "None of the above. Exit the form.") {
        navigate(-1);
        return;
      }
      setCurrentStep(isHealthAndSafety ? 3 : 4);
      return;
    }

    if (currentStep === 3 && sectionThreeData.concerns.includes("None of the above. Exit this form.")) {
      navigate(-1);
      return;
    }

    if (currentStep === TOTAL_STEPS) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentStep(6);
      }, 1000);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else if (currentStep === 4 && !isHealthAndSafety) {
      setCurrentStep(2);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (currentStep === 6) {
    return (
      <div className="container mt-3 mb-4">
        <div className="text-center mb-3">
          <div className="ec-success-icon">✓</div>
        </div>

        <AlertNavigation
          description={[
            "Thank you for your report, Vivek Vr",
            <>
              Your service request# is{" "}
              <span className="text-primary fw-semibold">SJ311PSR20260525-0006</span>
            </>,
          ]}
          primaryText="Report another encampment"
          secondaryText="Go Home"
          onPrimary={() => window.location.reload()}
          onSecondary={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="container mt-3 mb-4">
      {currentStep === 1 && <SectionOne ref={sectionOneRef} data={sectionOneData} onChange={setSectionOneData} />}
      {currentStep === 2 && <SectionTwo ref={sectionTwoRef} data={sectionTwoData} onChange={setSectionTwoData} />}
      {currentStep === 3 && <SectionThree ref={sectionThreeRef} data={sectionThreeData} onChange={setSectionThreeData} />}
      {currentStep === 4 && <SectionFour ref={sectionFourRef} data={sectionFourData} onChange={setSectionFourData} />}
      {currentStep === 5 && <SectionFive ref={sectionFiveRef} data={sectionFiveData} onChange={setSectionFiveData} />}

      <div className="d-flex flex-column gap-2 mt-3">
        <button className="next-btn w-100" onClick={handleNext}>
          {currentStep === TOTAL_STEPS ? "Submit" : "Next"}
        </button>
        <button className="ec-back-btn" onClick={handleBack}>
          Back
        </button>
      </div>

      {isSubmitting && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Submitting your report...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncampmentConcerns;
