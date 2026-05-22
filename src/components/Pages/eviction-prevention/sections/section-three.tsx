import React, { useState } from "react";

export interface SectionThreeData {
  adults: string;
  minors: string;
  incomeRange: string;
  incomeAmount: string;
  sourceOfIncome: string[];
  preferredLanguage: string;
}

interface SectionThreeProps {
  data: SectionThreeData;
  onChange: (data: SectionThreeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const INCOME_SOURCES = [
  "Work",
  "Unemployment",
  "Social Security",
  "SSI",
  "Calworks/ Welfare",
  "State Disability",
  "VA Benefits",
  "General Assistance",
  "Other",
];

const INCOME_RANGES = [
  "Under $20,000",
  "$20,001 - $40,000",
  "$40,001 - $60,000",
  "$60,001 - $80,000",
  "$80,001 - $100,000",
  "Over $100,000",
];

const COUNT_OPTIONS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

const SectionThree: React.FC<SectionThreeProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<any>({});

  const set = (field: keyof SectionThreeData, value: string) => {
    onChange({ ...data, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const toggleSource = (source: string) => {
    const updated = data.sourceOfIncome.includes(source)
      ? data.sourceOfIncome.filter((s) => s !== source)
      : [...data.sourceOfIncome, source];
    onChange({ ...data, sourceOfIncome: updated });
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!data.adults) { e.adults = "Please select an option"; valid = false; }
    if (!data.minors) { e.minors = "Please select an option"; valid = false; }
    if (!data.preferredLanguage.trim()) {
      e.preferredLanguage = "Preferred language is required";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* Adults */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Number of adults in the household &gt; 18 years of age
          <span className="text-danger"> *</span>
        </label>
        <select
          className="form-select"
          value={data.adults}
          onChange={(e) => set("adults", e.target.value)}
        >
          <option value=""></option>
          {COUNT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.adults && <p className="text-danger mb-0 mt-1 ep-error">{errors.adults}</p>}
      </div>

      {/* Minors */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Number of minors in the household &lt; 18 years of age
          <span className="text-danger"> *</span>
        </label>
        <select
          className="form-select"
          value={data.minors}
          onChange={(e) => set("minors", e.target.value)}
        >
          <option value=""></option>
          {COUNT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.minors && <p className="text-danger mb-0 mt-1 ep-error">{errors.minors}</p>}
      </div>

      {/* Gross income */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Household gross income (before tax deductions)
        </label>
        <select
          className="form-select mb-2"
          value={data.incomeRange}
          onChange={(e) => set("incomeRange", e.target.value)}
        >
          <option value=""></option>
          {INCOME_RANGES.map((r) => <option key={r}>{r}</option>)}
        </select>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            placeholder=""
            value={data.incomeAmount}
            onChange={(e) => set("incomeAmount", e.target.value)}
          />
        </div>
      </div>

      {/* Source of income */}
      <div className="mb-3">
        <label className="fw-semibold mb-1 d-block">
          Source of income (check all that apply)
        </label>
        {INCOME_SOURCES.map((source) => (
          <div className="form-check" key={source}>
            <input
              type="checkbox"
              className="form-check-input"
              checked={data.sourceOfIncome.includes(source)}
              onChange={() => toggleSource(source)}
            />
            <label className="form-check-label">{source}</label>
          </div>
        ))}
      </div>

      {/* Preferred language */}
      <div className="mb-4">
        <label className="fw-semibold mb-1 d-block">
          Requester's Preferred language(s):
          <span className="text-danger"> *</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={data.preferredLanguage}
          onChange={(e) => set("preferredLanguage", e.target.value)}
        />
        {errors.preferredLanguage && (
          <p className="text-danger mb-0 mt-1 ep-error">
            {errors.preferredLanguage}
          </p>
        )}
      </div>

      <div className="d-flex gap-2">
        <button className="ep-back-btn w-50" onClick={onBack}>
          Back
        </button>
        <button className="next-btn w-50" onClick={() => { if (validate()) onNext(); }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionThree;
