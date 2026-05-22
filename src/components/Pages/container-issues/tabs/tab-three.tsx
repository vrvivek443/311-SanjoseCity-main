import type { TabOneData } from "./tab-one";
import type { TabTwoData } from "./tab-two";
import { CART_COLORS } from "./tab-two";

const CART_ISSUES = [
  "Cracks or holes in body",
  "Cracks in hinges and/or handle",
  "Damaged wheels",
  "Damaged Lid",
  "Dirty(graffiti)",
  "Missing or stolen",
  "Wrong size - too large or too small",
  "I need a yard waste cart",
];

interface TabThreeProps {
  tabOneData: TabOneData;
  tabTwoData: TabTwoData;
  onBack: () => void;
  onSubmit: () => void;
}

const TabThree = ({ tabOneData, tabTwoData, onBack, onSubmit }: TabThreeProps) => {
  const selectedColor = CART_COLORS.find((c) => c.key === tabTwoData.cartColor);

  const colorLabel = selectedColor?.label.split(" (")[0] ?? "";
  const colorType = selectedColor?.label.match(/\(([^)]+)\)/)?.[1] ?? "";

  return (
    <div>
      <h5 className="fw-bold mb-4 ci-title">Confirm details</h5>

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
      <div className="mb-3">
        <p className="mb-0" style={{ fontSize: "13px" }}>Your phone number:</p>
        <p className="fw-bold mb-0">{tabOneData.phone}</p>
      </div>

      {/* Collection day box */}
      <div className="ci-confirm-box mb-3">
        <p className="mb-1" style={{ fontSize: "13px" }}>
          Your collection day based on your address:
        </p>
        <p className="fw-bold mb-1">Tuesday</p>
        <p className="mb-0" style={{ fontSize: "13px" }}>
          Your cart issue will be addressed on your collection day.
        </p>
      </div>

      {/* Cart details box */}
      <div className="ci-confirm-box mb-4">
        <p className="mb-2" style={{ fontSize: "13px" }}>Cart color:</p>

        {selectedColor && (
          <div className="d-flex align-items-center gap-2 mb-3">
            <span
              style={{
                width: "40px",
                height: "28px",
                background: selectedColor.swatch,
                borderRadius: "3px",
                display: "inline-block",
              }}
            />
            <div>
              <p className="fw-bold mb-0" style={{ fontSize: "14px" }}>{colorLabel}</p>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                ({colorType})
              </p>
            </div>
          </div>
        )}

        <p className="mb-2" style={{ fontSize: "13px" }}>Issue(s) with your cart:</p>
        <ul className="mb-0 ps-3">
          {CART_ISSUES.map((issue) => {
            const selected = tabTwoData.issues.includes(issue);
            return (
              <li key={issue} style={{ fontSize: "13px", marginBottom: "2px" }}>
                {issue}?{" "}
                <span>{selected ? "Yes" : "No"}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="ci-back-outline-btn w-50" onClick={onBack}>
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
