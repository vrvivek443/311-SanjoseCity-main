import type { TabOneData } from "./tab-one";
import type { TabTwoData } from "./tab-two";
import { CART_COLORS } from "./tab-two";

interface TabThreeProps {
  tabOneData: TabOneData;
  tabTwoData: TabTwoData;
  onBack: () => void;
  onSubmit: () => void;
}

const formatResponse = (value: string) => {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "No Response";
};

const SUMMARY_ROWS = [
  { label: "Set out after 6A?", field: "cartOutAfter6am" as keyof TabTwoData },
  { label: "Neighbors received service?", field: "neighborsReceived" as keyof TabTwoData },
  { label: "Lid closed?", field: "lidClosed" as keyof TabTwoData },
  { label: "Blocked container or cart?", field: "blocked" as keyof TabTwoData },
  { label: "Hazardous items?", field: "hazardous" as keyof TabTwoData },
];

const TabThree = ({ tabOneData, tabTwoData, onBack, onSubmit }: TabThreeProps) => {
  const selectedColor = CART_COLORS.find((c) => c.key === tabTwoData.cartColor);
  const colorLabel = selectedColor?.label.split(" (")[0] ?? "";
  const colorType = selectedColor?.label.match(/\(([^)]+)\)/)?.[1] ?? "";

  return (
    <div>
      <h5 className="fw-bold mb-4 mc-title">Confirm details</h5>

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

      {/* Confirm box */}
      <div className="mc-confirm-box mb-4">
        {/* Cart color */}
        <p className="mb-2" style={{ fontSize: "13px" }}>Cart color:</p>
        {selectedColor && (
          <div className="d-flex align-items-center gap-2 mb-3">
            <span
              style={{
                width: "40px",
                height: "24px",
                background: selectedColor.swatch,
                borderRadius: "3px",
                display: "inline-block",
              }}
            />
            <div>
              <p className="fw-bold mb-0" style={{ fontSize: "14px" }}>{colorLabel}</p>
              <p className="mb-0" style={{ fontSize: "12px" }}>({colorType})</p>
            </div>
          </div>
        )}

        {/* Summary */}
        <p className="mb-2" style={{ fontSize: "13px" }}>
          Summary of your response(s):
        </p>
        <ul className="mb-0 ps-3">
          {SUMMARY_ROWS.map(({ label, field }) => (
            <li key={field} style={{ fontSize: "13px", marginBottom: "2px" }}>
              {label} {formatResponse(tabTwoData[field] as string)}
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="mc-back-outline-btn w-50" onClick={onBack}>
          Go back
        </button>
        <button className="next-btn w-50" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TabThree;
