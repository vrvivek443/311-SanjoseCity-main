import type { TabOneData } from "./tab-one";

interface TabTwoProps {
  tabOneData: TabOneData;
  onBack: () => void;
  onSubmit: () => void;
}

const SIZE_LABEL: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  none: "I don't need a yard waste container",
};

const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const TabTwo = ({ tabOneData, onBack, onSubmit }: TabTwoProps) => {
  return (
    <div>
      <h5 className="fw-bold mb-4 snh-title">Confirm Details</h5>

      {/* Address */}
      <div className="mb-2">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your address:</p>
        <p className="fw-bold mb-0">{tabOneData.address || "—"}</p>
      </div>

      {/* Unit */}
      <div className="mb-2">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your unit or apartment #:</p>
        <p className="fw-bold mb-0">{tabOneData.unit || ""}</p>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your phone number:</p>
        <p className="fw-bold mb-0">{tabOneData.phone}</p>
      </div>

      {/* Escrow date */}
      <div className="snh-confirm-box mb-3">
        <p className="mb-1" style={{ fontSize: "13px" }}>Selected service start date:</p>
        <p className="fw-bold mb-0">{formatDate(tabOneData.escrowDate)}</p>
      </div>

      {/* Container sizes */}
      <div className="snh-confirm-box mb-4">
        <p className="mb-2" style={{ fontSize: "13px" }}>Container sizes requested:</p>
        <p className="mb-1" style={{ fontSize: "14px" }}>
          Garbage - {SIZE_LABEL[tabOneData.garbageSize] || "—"}
        </p>
        <p className="mb-1" style={{ fontSize: "14px" }}>
          Recycling - {SIZE_LABEL[tabOneData.recyclingSize] || "—"}
        </p>
        <p className="mb-0" style={{ fontSize: "14px" }}>
          Yard Waste - {SIZE_LABEL[tabOneData.yardWasteSize] || "—"}
        </p>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="snh-back-outline-btn w-50" onClick={onBack}>
          Go Back
        </button>
        <button className="next-btn w-50" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TabTwo;
