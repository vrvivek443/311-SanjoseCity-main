import React from "react";
import type { SectionOneData } from "./sections-one";
import type { SectionTwoData } from "./sections-two";
import type { SectionThreeData } from "./sections-three";

interface FinalReportProps {
  sectionOne: SectionOneData;
  sectionTwo: SectionTwoData;
  sectionThree: SectionThreeData;
  onEdit: () => void;
  onSubmit: () => void;
}

const Row = ({
  label,
  value,
  required = false,
}: {
  label: string;
  value: string;
  required?: boolean;
}) => (
  <p className="mb-3">
    <strong>{label}:</strong>
    {required && <span className="text-danger"> * </span>}
    {!required && " "}
    {value || <span className="text-muted">—</span>}
  </p>
);

const FinalReport: React.FC<FinalReportProps> = ({
  sectionOne,
  sectionTwo,
  sectionThree,
  onEdit,
  onSubmit,
}) => {
  const formattedDate = sectionOne.incidentDate
    ? new Date(sectionOne.incidentDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div>
      <p className="fw-bold mb-4" style={{ textDecoration: "underline" }}>
        Review the information below before you submit:
      </p>

      {/* Section One */}
      <Row label="Date of Fireworks incident" value={formattedDate} required />
      <Row label="Time of Fireworks incident" value={sectionOne.incidentTime} required />
      <Row label="Location of Fireworks incident" value={sectionOne.incidentLocation} required />
      <Row
        label="Please provide the address where the use, sale, or possession of fireworks occurred (Only San José addresses are enforceable)"
        value={sectionOne.address}
        required
      />
      <Row label="Briefly describe the fireworks incidence" value={sectionOne.additionalInfo} />

      {/* Section Two */}
      <Row
        label="Do you know who used, sold or possessed the illegal fireworks?"
        value={sectionTwo.knowWho === "yes" ? "Yes" : sectionTwo.knowWho === "no" ? "No" : ""}
      />
      {sectionTwo.knowWho === "yes" && (
        <Row label="Name(s) of person(s)" value={[sectionTwo.name1, sectionTwo.name2].filter(Boolean).join(", ")} />
      )}
      <Row
        label="Do you have a photo or video evidence of the incident?"
        value={sectionTwo.hasEvidence === "yes" ? "Yes" : sectionTwo.hasEvidence === "no" ? "No" : ""}
      />
      {sectionTwo.hasEvidence === "yes" && sectionTwo.files.length > 0 && (
        <Row label="Uploaded files" value={`${sectionTwo.files.length} file(s) attached`} />
      )}

      {/* Section Three */}
      <Row label="Your name" value={sectionThree.name} required />
      <Row label="Your full address" value={sectionThree.fullAddress} required />
      <Row label="Your contact number" value={sectionThree.phone} required />
      <Row label="Your email address" value={sectionThree.email} required />

      <hr />

      {/* Acknowledgment — read-only */}
      <p className="fw-bold mb-3">Acknowledgment:</p>

      {[
        {
          checked: sectionThree.ack1,
          text: "I understand my report will not result in an immediate emergency response (police/fire). If this is an emergency please call 911.",
        },
        {
          checked: sectionThree.ack2,
          text: "I understand my information will remain confidential, but may be released if required by law.",
        },
        {
          checked: sectionThree.ack3,
          text: "If enforcement action is taken (citation, etc.), I understand I may be asked to testify about the content of my report.",
        },
      ].map(({ checked, text }, i) => (
        <div className="form-check align-items-start d-flex gap-2 mb-3" key={i}>
          <input
            type="checkbox"
            className="form-check-input mt-1 flex-shrink-0"
            checked={checked}
            readOnly
          />
          <label className="form-check-label">
            {text} <span className="text-danger">*</span>
          </label>
        </div>
      ))}

      {/* Buttons */}
      <div className="d-flex gap-2 mt-4">
        <button className="back-btn w-50" onClick={onEdit}>
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
