import React, { useState } from "react";
import type { SectionTwoData } from "./section-two";
import type { SectionThreeData } from "./section-three";
import type { SectionFourData } from "./section-four";
import type { SectionFiveData } from "./section-five";

const INCOME_SOURCES = [
  "Work", "Unemployment", "Social Security", "SSI", "Calworks/ Welfare",
  "State Disability", "VA Benefits", "General Assistance", "Other",
];
const INCOME_RANGES = [
  "Under $20,000", "$20,001 - $40,000", "$40,001 - $60,000",
  "$60,001 - $80,000", "$80,001 - $100,000", "Over $100,000",
];
const COUNT_OPTIONS = ["0","1","2","3","4","5","6","7","8","9","10+"];
const RENTAL_ASSISTANCE_OPTIONS = [
  "Emergency Rental Assistance Program (ERAP)",
  "HOME Investment Partnership Program",
  "Section 8 / Housing Choice Voucher",
  "Community Action Agency",
  "Non-profit organization",
  "Other government program",
  "No",
];
const HELP_WITH_OPTIONS = [
  "Financial assistance or other resources",
  "Eviction prevention legal services",
  "Other",
];
const HEARD_ABOUT_OPTIONS = [
  "Abode", "City of San Jose", "Flyer", "Health Trust",
  "Homeless Prevention System (HPS)", "Legal aid organization",
  "Office of Supportive Housing", "Project Sentinel", "Radio/ TV",
  "Sacred Heart", "Santa Clara County Housing Authority",
  "Self-Help center", "Social Media", "Word of Mouth", "Other, please specify",
];

interface EditAllProps {
  sectionTwo: SectionTwoData;
  sectionThree: SectionThreeData;
  sectionFour: SectionFourData;
  sectionFive: SectionFiveData;
  onSectionTwoChange: (d: SectionTwoData) => void;
  onSectionThreeChange: (d: SectionThreeData) => void;
  onSectionFourChange: (d: SectionFourData) => void;
  onSectionFiveChange: (d: SectionFiveData) => void;
  onSave: () => void;
}

const Field: React.FC<{
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}> = ({ label, required = false, type = "text", value, error, onChange }) => (
  <div className="mb-3">
    <label className="fw-semibold mb-1 d-block">
      {label}{required && <span className="text-danger"> *</span>}
    </label>
    <input
      type={type}
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-danger mb-0 mt-1 ep-error">{error}</p>}
  </div>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <p className="fw-semibold mb-3 ep-review-subtitle">{title}</p>
);

const EditAll: React.FC<EditAllProps> = ({
  sectionTwo, sectionThree, sectionFour, sectionFive,
  onSectionTwoChange, onSectionThreeChange, onSectionFourChange, onSectionFiveChange,
  onSave,
}) => {
  const [errors, setErrors] = useState<any>({});

  const set2 = (field: keyof SectionTwoData, value: string) => {
    onSectionTwoChange({ ...sectionTwo, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const set3 = (field: keyof SectionThreeData, value: string) => {
    onSectionThreeChange({ ...sectionThree, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const set4 = (field: keyof SectionFourData, value: string) => {
    onSectionFourChange({ ...sectionFour, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const toggleSource = (source: string) => {
    const updated = sectionThree.sourceOfIncome.includes(source)
      ? sectionThree.sourceOfIncome.filter((s) => s !== source)
      : [...sectionThree.sourceOfIncome, source];
    onSectionThreeChange({ ...sectionThree, sourceOfIncome: updated });
  };

  const toggleHelpWith = (option: string) => {
    const updated = sectionFour.helpWith.includes(option)
      ? sectionFour.helpWith.filter((h) => h !== option)
      : [...sectionFour.helpWith, option];
    onSectionFourChange({ ...sectionFour, helpWith: updated });
    setErrors((prev: any) => ({ ...prev, helpWith: "" }));
  };

  const toggleHeardAbout = (option: string) => {
    const updated = sectionFive.heardAboutUs.includes(option)
      ? sectionFive.heardAboutUs.filter((h) => h !== option)
      : [...sectionFive.heardAboutUs, option];
    onSectionFiveChange({ ...sectionFive, heardAboutUs: updated });
    setErrors((prev: any) => ({ ...prev, heardAboutUs: "" }));
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!sectionTwo.surveyFor) { e.surveyFor = "Please select an option"; valid = false; }
    if (!sectionTwo.firstName.trim()) { e.firstName = "First name is required"; valid = false; }
    if (!sectionTwo.lastName.trim()) { e.lastName = "Last name is required"; valid = false; }
    if (!sectionTwo.address.trim()) { e.address = "Address is required"; valid = false; }
    if (!sectionTwo.city.trim()) { e.city = "City is required"; valid = false; }
    if (!sectionTwo.state.trim()) { e.state = "State is required"; valid = false; }
    if (!sectionTwo.zipcode.trim()) {
      e.zipcode = "Zipcode is required"; valid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(sectionTwo.zipcode.trim())) {
      e.zipcode = "Please enter a valid zipcode"; valid = false;
    }
    if (!sectionTwo.email.trim()) {
      e.email = "Email is required"; valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sectionTwo.email.trim())) {
      e.email = "Please enter a valid email address"; valid = false;
    }
    if (!sectionTwo.phone.trim()) {
      e.phone = "Phone number is required"; valid = false;
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(sectionTwo.phone.trim())) {
      e.phone = "Please enter a valid phone number"; valid = false;
    }
    if (!sectionTwo.allowText) { e.allowText = "Please select an option"; valid = false; }
    if (!sectionThree.adults) { e.adults = "Please select an option"; valid = false; }
    if (!sectionThree.minors) { e.minors = "Please select an option"; valid = false; }
    if (!sectionThree.preferredLanguage.trim()) { e.preferredLanguage = "Preferred language is required"; valid = false; }
    if (!sectionFour.evictionNotice) { e.evictionNotice = "Please select an option"; valid = false; }
    if (!sectionFour.scheduleAppointment) { e.scheduleAppointment = "Please select an option"; valid = false; }
    if (sectionFour.helpWith.length === 0) { e.helpWith = "Please select at least one option"; valid = false; }
    if (sectionFive.heardAboutUs.length === 0) { e.heardAboutUs = "Please select at least one option"; valid = false; }
    if (sectionFive.heardAboutUs.includes("Other, please specify") && !sectionFive.otherSpecify.trim()) {
      e.otherSpecify = "Please specify"; valid = false;
    }

    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* ── Section 2 ── */}
      <SectionHeader title="Personal Information" />

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Is this survey for yourself or others?<span className="text-danger"> *</span>
        </label>
        {["Self", "Someone else"].map((val) => (
          <div className="form-check" key={val}>
            <input type="radio" className="form-check-input" name="surveyFor"
              checked={sectionTwo.surveyFor === val} onChange={() => set2("surveyFor", val)} />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.surveyFor && <p className="text-danger mb-0 mt-1 ep-error">{errors.surveyFor}</p>}
      </div>

      <Field label="First Name" value={sectionTwo.firstName} error={errors.firstName} onChange={(v) => set2("firstName", v)} required />
      <Field label="Middle Initial" value={sectionTwo.middleInitial} onChange={(v) => set2("middleInitial", v)} />
      <Field label="Last Name" value={sectionTwo.lastName} error={errors.lastName} onChange={(v) => set2("lastName", v)} required />
      <Field label="Address" value={sectionTwo.address} error={errors.address} onChange={(v) => set2("address", v)} required />
      <Field label="Address Line 2" value={sectionTwo.addressLine2} onChange={(v) => set2("addressLine2", v)} />
      <Field label="City" value={sectionTwo.city} error={errors.city} onChange={(v) => set2("city", v)} required />
      <Field label="State" value={sectionTwo.state} error={errors.state} onChange={(v) => set2("state", v)} required />
      <Field label="Zipcode" value={sectionTwo.zipcode} error={errors.zipcode} onChange={(v) => set2("zipcode", v)} required />
      <Field label="Email" value={sectionTwo.email} error={errors.email} onChange={(v) => set2("email", v)} required type="email" />
      <Field label="Phone #" value={sectionTwo.phone} error={errors.phone} onChange={(v) => set2("phone", v)} required type="tel" />

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Can we send you text messages about your request?<span className="text-danger"> *</span>
        </label>
        {["Yes", "No"].map((val) => (
          <div className="form-check" key={val}>
            <input type="radio" className="form-check-input" name="allowText"
              checked={sectionTwo.allowText === val} onChange={() => set2("allowText", val)} />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.allowText && <p className="text-danger mb-0 mt-1 ep-error">{errors.allowText}</p>}
      </div>

      <hr className="my-4" />

      {/* ── Section 3 ── */}
      <SectionHeader title="Household Information" />

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Number of adults in the household &gt; 18 years of age<span className="text-danger"> *</span>
        </label>
        <select className="form-select" value={sectionThree.adults} onChange={(e) => set3("adults", e.target.value)}>
          <option value=""></option>
          {COUNT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.adults && <p className="text-danger mb-0 mt-1 ep-error">{errors.adults}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Number of minors in the household &lt; 18 years of age<span className="text-danger"> *</span>
        </label>
        <select className="form-select" value={sectionThree.minors} onChange={(e) => set3("minors", e.target.value)}>
          <option value=""></option>
          {COUNT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.minors && <p className="text-danger mb-0 mt-1 ep-error">{errors.minors}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">Household gross income (before tax deductions)</label>
        <select className="form-select mb-2" value={sectionThree.incomeRange} onChange={(e) => set3("incomeRange", e.target.value)}>
          <option value=""></option>
          {INCOME_RANGES.map((r) => <option key={r}>{r}</option>)}
        </select>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input type="number" className="form-control" value={sectionThree.incomeAmount}
            onChange={(e) => set3("incomeAmount", e.target.value)} />
        </div>
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">Source of income (check all that apply)</label>
        {INCOME_SOURCES.map((source) => (
          <div className="form-check" key={source}>
            <input type="checkbox" className="form-check-input"
              checked={sectionThree.sourceOfIncome.includes(source)} onChange={() => toggleSource(source)} />
            <label className="form-check-label">{source}</label>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Requester's Preferred language(s):<span className="text-danger"> *</span>
        </label>
        <input type="text" className="form-control" value={sectionThree.preferredLanguage}
          onChange={(e) => set3("preferredLanguage", e.target.value)} />
        {errors.preferredLanguage && <p className="text-danger mb-0 mt-1 ep-error">{errors.preferredLanguage}</p>}
      </div>

      <hr className="my-4" />

      {/* ── Section 4 ── */}
      <SectionHeader title="Eviction Details" />

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Do you think you have received a termination or{" "}
          <span className="ep-underline">eviction notice</span> or a{" "}
          <span className="ep-underline">Notice to Pay</span>?
          <span className="text-danger"> *</span>
        </label>
        {["Yes", "No", "I am not sure"].map((val) => (
          <div className="form-check" key={val}>
            <input type="radio" className="form-check-input" name="evictionNotice"
              checked={sectionFour.evictionNotice === val} onChange={() => set4("evictionNotice", val)} />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.evictionNotice && <p className="text-danger mb-0 mt-1 ep-error">{errors.evictionNotice}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Would you like us to contact you to schedule an appointment?<span className="text-danger"> *</span>
        </label>
        {["Yes", "No", "I have an appointment"].map((val) => (
          <div className="form-check" key={val}>
            <input type="radio" className="form-check-input" name="scheduleAppointment"
              checked={sectionFour.scheduleAppointment === val} onChange={() => set4("scheduleAppointment", val)} />
            <label className="form-check-label">{val}</label>
          </div>
        ))}
        {errors.scheduleAppointment && <p className="text-danger mb-0 mt-1 ep-error">{errors.scheduleAppointment}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">Have you ever received rental assistance from other sources?</label>
        <select className="form-select" value={sectionFour.rentalAssistance} onChange={(e) => set4("rentalAssistance", e.target.value)}>
          <option value=""></option>
          {RENTAL_ASSISTANCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          What do you need help with?<span className="text-danger"> *</span>
        </label>
        {HELP_WITH_OPTIONS.map((option) => (
          <div className="form-check" key={option}>
            <input type="checkbox" className="form-check-input"
              checked={sectionFour.helpWith.includes(option)} onChange={() => toggleHelpWith(option)} />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
        {errors.helpWith && <p className="text-danger mb-0 mt-1 ep-error">{errors.helpWith}</p>}
      </div>

      <hr className="my-4" />

      {/* ── Section 5 ── */}
      <SectionHeader title="How Did You Hear About Us" />

      <div className="mb-4">
        <label className="fw-semibold mb-1 d-block">
          How did you hear about us? (check all that apply)<span className="text-danger"> *</span>
        </label>
        {HEARD_ABOUT_OPTIONS.map((option) => (
          <div className="form-check" key={option}>
            <input type="checkbox" className="form-check-input"
              checked={sectionFive.heardAboutUs.includes(option)} onChange={() => toggleHeardAbout(option)} />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
        {sectionFive.heardAboutUs.includes("Other, please specify") && (
          <div className="mt-2">
            <label className="fw-semibold mb-1 d-block">
              Please Specify<span className="text-danger"> *</span>
            </label>
            <input type="text" className="form-control" value={sectionFive.otherSpecify}
              onChange={(e) => {
                onSectionFiveChange({ ...sectionFive, otherSpecify: e.target.value });
                setErrors((prev: any) => ({ ...prev, otherSpecify: "" }));
              }} />
            {errors.otherSpecify && <p className="text-danger mb-0 mt-1 ep-error">{errors.otherSpecify}</p>}
          </div>
        )}
        {errors.heardAboutUs && <p className="text-danger mb-0 mt-1 ep-error">{errors.heardAboutUs}</p>}
      </div>

      <button className="next-btn w-100" onClick={() => { if (validate()) onSave(); }}>
        Submit
      </button>
    </div>
  );
};

export default EditAll;
