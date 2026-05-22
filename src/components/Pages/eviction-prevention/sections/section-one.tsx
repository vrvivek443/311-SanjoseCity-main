import React from "react";

interface SectionOneProps {
  onNext: () => void;
  onBack: () => void;
}

const SectionOne: React.FC<SectionOneProps> = ({ onNext, onBack }) => {
  return (
    <div>
      <p className="mb-4">
        Welcome to the Housing department application for Eviction Prevention.
      </p>

      <p className="fw-bold mb-2">How the process works:</p>

      <ol className="mb-4 ep-ol">
        <li className="mb-3">
          You will be asked to complete the Eviction Help Center survey form.
          This form consists of{" "}
          <strong>5 sections that need to be completed</strong> by all
          applicants, which provide the Housing department the information they
          need in order to try and help you.
        </li>
        <li>
          Once a completed form is submitted it typically{" "}
          <strong>takes our case workers about 48 business hours</strong> to
          review your information and <strong>reach out to you</strong>.
        </li>
      </ol>

      <div className="d-flex gap-2 mt-3">
        <button className="ep-back-btn w-50" onClick={onBack}>
          Back
        </button>
        <button className="next-btn w-50" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SectionOne;
