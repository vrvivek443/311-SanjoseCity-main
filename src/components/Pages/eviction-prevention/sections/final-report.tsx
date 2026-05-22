import React from "react";
import type { SectionTwoData } from "./section-two";
import type { SectionThreeData } from "./section-three";
import type { SectionFourData } from "./section-four";
import type { SectionFiveData } from "./section-five";

interface FinalReportProps {
  sectionTwo: SectionTwoData;
  sectionThree: SectionThreeData;
  sectionFour: SectionFourData;
  sectionFive: SectionFiveData;
  onEdit: () => void;
  onSubmit: () => void;
}

const Row: React.FC<{ label: string; value: string; required?: boolean }> = ({
  label,
  value,
  required = false,
}) => (
  <div className="mb-3">
    <p className="fw-semibold mb-0 ep-row-label">
      {label}
      {required && <span className="text-danger"> *</span>}
    </p>
    <p className="mb-0 ep-row-value">
      {value || "—"}
    </p>
  </div>
);

const FinalReport: React.FC<FinalReportProps> = ({
  sectionTwo,
  sectionThree,
  sectionFour,
  sectionFive,
  onEdit,
  onSubmit,
}) => {
  const fullName = [sectionTwo.firstName, sectionTwo.middleInitial, sectionTwo.lastName]
    .filter(Boolean)
    .join(" ");

  const fullAddress = [sectionTwo.address, sectionTwo.addressLine2]
    .filter(Boolean)
    .join(", ");

  const heardAboutDisplay = sectionFive.heardAboutUs.join(", ");
  const showOtherSpecify =
    sectionFive.heardAboutUs.includes("Other, please specify") &&
    sectionFive.otherSpecify.trim();

  return (
    <div>
      <p className="fw-semibold mb-4 ep-review-subtitle">
        Review the information below before you submit
      </p>

      <Row label="Is this survey for yourself or others?" value={sectionTwo.surveyFor} required />
      <Row label="Name" value={fullName} required />
      <Row label="Address" value={fullAddress} required />
      <Row label="City" value={sectionTwo.city} required />
      <Row label="Zipcode" value={sectionTwo.zipcode} required />
      <Row label="Email" value={sectionTwo.email} required />
      <Row label="Phone #" value={sectionTwo.phone} required />
      <Row
        label="Can we send you text messages about your request?"
        value={sectionTwo.allowText}
        required
      />
      <Row
        label="Number of adults in the household > 18 years of age"
        value={sectionThree.adults}
        required
      />
      <Row
        label="Number of minors in the household < 18 years of age"
        value={sectionThree.minors}
        required
      />
      <Row
        label="Household gross income (before tax deductions)"
        value={[sectionThree.incomeRange, sectionThree.incomeAmount ? `$${sectionThree.incomeAmount}` : ""].filter(Boolean).join(" — ")}
      />
      <Row
        label="Source of income (check all that apply):"
        value={sectionThree.sourceOfIncome.join(", ")}
      />
      <Row
        label="Requester's Preferred language(s):"
        value={sectionThree.preferredLanguage}
        required
      />
      <Row
        label="Do you think you have received a termination or eviction notice or a Notice to Pay?"
        value={sectionFour.evictionNotice}
        required
      />
      <Row
        label="Would you like us to contact you to schedule an appointment?"
        value={sectionFour.scheduleAppointment}
        required
      />
      <Row
        label="Have you ever received rental assistance from other sources"
        value={sectionFour.rentalAssistance}
      />
      <Row
        label="What do you need help with?"
        value={sectionFour.helpWith.join(", ")}
        required
      />
      <div className="mb-3">
        <p className="fw-semibold mb-0 ep-row-label">
          How did you hear about us? (check all that apply):
          <span className="text-danger"> *</span>
        </p>
        <p className="mb-0 ep-row-value">
          {heardAboutDisplay || "—"}
        </p>
        {showOtherSpecify && (
          <p className="mb-0 ep-row-value">
            {sectionFive.otherSpecify}
          </p>
        )}
      </div>

      <div className="d-flex gap-2 mt-2">
        <button className="ep-back-btn w-50" onClick={onEdit}>
          Edit
        </button>
        <button className="next-btn w-50" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FinalReport;
