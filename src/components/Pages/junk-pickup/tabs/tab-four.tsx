import { useState } from "react";
import type { TabOneData } from "./tab-one";
import { ITEMS } from "./tab-two";

interface TabFourProps {
  tabOneData: TabOneData;
  quantities: Record<string, number>;
  onBack: () => void;
  onSubmit: () => void;
}

const getUpcomingMondays = (): Date[] => {
  const mondays: Date[] = [];
  const d = new Date();
  const daysUntilMonday = d.getDay() === 1 ? 7 : (8 - d.getDay()) % 7;
  d.setDate(d.getDate() + daysUntilMonday);
  for (let i = 0; i < 4; i++) {
    mondays.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return mondays;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const TabFour = ({ tabOneData, quantities, onBack, onSubmit }: TabFourProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const mondays = getUpcomingMondays();
  const dateOptions = [
    ...mondays.map((d) => formatDate(d)),
    "None work for me",
  ];

  const selectedItems = ITEMS.filter((item) => quantities[item.key] > 0);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <h5 className="fw-bold mb-3 jp-title">Confirm details</h5>

      {/* Address */}
      <div className="mb-2">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your address:</p>
        <p className="fw-bold jp-confirm-value mb-0">{tabOneData.address || "—"}</p>
      </div>

      {/* Unit */}
      <div className="mb-2">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your unit or apartment #:</p>
        <p className="fw-bold jp-confirm-value mb-0">{tabOneData.unit || ""}</p>
      </div>

      {/* Phone */}
      <div className="mb-3">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your phone number:</p>
        <p className="fw-bold jp-confirm-value mb-0">{tabOneData.phone}</p>
      </div>

      {/* Date selection */}
      <div className="jp-confirm-box mb-3">
        <p className="mb-2" style={{ fontSize: "13px" }}>
          Select a preferred date. We'll try our best to schedule it.
        </p>
        {dateOptions.map((option) => (
          <div className="form-check mb-1" key={option}>
            <input
              type="radio"
              className="form-check-input"
              name="preferredDate"
              checked={selectedDate === option}
              onChange={() => setSelectedDate(option)}
            />
            <label className="form-check-label" style={{ fontSize: "14px" }}>
              {option}
            </label>
          </div>
        ))}
      </div>

      {/* Items summary */}
      <div className="jp-confirm-box mb-4">
        <p className="fw-semibold mb-2" style={{ fontSize: "13px" }}>
          Your junk pickup item(s):
        </p>
        {selectedItems.length === 0 ? (
          <p className="text-muted mb-0" style={{ fontSize: "13px" }}>No items selected</p>
        ) : (
          selectedItems.map((item) => (
            <div key={item.key} className="d-flex justify-content-between mb-1">
              <span style={{ fontSize: "14px" }}>{item.label}</span>
              <span style={{ fontSize: "14px" }}>Quantity: {quantities[item.key]}</span>
            </div>
          ))
        )}
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="jp-back-outline-btn w-50" onClick={onBack}>
          Go Back
        </button>
        <button className="next-btn w-50" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TabFour;
