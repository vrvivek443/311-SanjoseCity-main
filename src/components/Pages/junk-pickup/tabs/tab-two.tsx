import { useState } from "react";

export const ITEMS = [
  {
    key: "couch",
    icon: "🛋️",
    label: "Couch",
    description: "If sofa is a sectional, each section counts as one item.",
  },
  {
    key: "mattress",
    icon: "🛏️",
    label: "Mattress",
    description: "Mattresses and box springs are separate items.",
  },
  {
    key: "boxspring",
    icon: "🛏️",
    label: "Box spring",
    description: "See above.",
  },
  {
    key: "chair",
    icon: "🪑",
    label: "Chair",
    description:
      "Upholstered, wood, plastic or aluminum okay. Four stacked chairs is considered one bulk item.",
  },
  {
    key: "wood",
    icon: "🪵",
    label: "Wood",
    description:
      "No Pressure Treated wood. Bundles less than 3ft x 2ft, no exposed nails/screws.",
  },
  {
    key: "tires",
    icon: "🔧",
    label: "Tires",
    description:
      "Passenger vehicle and pickup truck tires only. One item is (1) one tire, (2) one tire with an attached rim, or (3) one separate rim.",
  },
  {
    key: "carpet",
    icon: "🪣",
    label: "Carpet",
    description:
      "Roll, then bundle or tie carpets. Dry carpet rolls: no longer than 4ft in length, 2ft in diameter. Wet carpet rolls: no longer than 4ft in length, 2ft in diameter.",
  },
  {
    key: "table",
    icon: "🪞",
    label: "Table",
    description: "Make sure that table leaves are bundled.",
  },
];

const STANDARD_LABELS = new Set(ITEMS.map((i) => i.label.toLowerCase()));

const SEARCH_CATALOG = [
  "Appliance", "Armchair", "Baby Crib", "Barbecue Grill", "Bed Frame",
  "Bicycle", "Bike Rack", "Bookshelf", "Camper Shell", "Car Door",
  "Car Seat", "Cargo Cover", "Carpet Cleaner", "Cart", "Child Carrier",
  "Clothes Dryer", "Coffee Table", "Computer Desk", "Crib",
  "Dining Table", "Dishwasher", "Dresser", "Entertainment Center",
  "Exercise Bike", "Filing Cabinet", "Freezer", "Futon", "Gazebo",
  "Generator", "Golf Clubs", "Grill", "Hammock", "Headboard",
  "Hot Tub", "Ironing Board", "Ladder", "Lamp", "Lawn Chair",
  "Lawn Mower", "Love Seat", "Luggage", "Mirror", "Nightstand",
  "Ottoman", "Patio Furniture", "Piano", "Playground Equipment",
  "Pool Table", "Printer", "Refrigerator", "Rocking Chair", "Rug",
  "Scarecrow", "Shed", "Shelving Unit", "Sleeper Sofa", "Snow Blower",
  "Sofa Bed", "Stationary Bike", "Stroller", "Swing Set", "Television",
  "Tent", "Toilet", "Tool Box", "Toy Car", "Treadmill", "Tricycle",
  "Umbrella", "Vacuum", "Wagon", "Wardrobe", "Washer",
  "Water Heater", "Wheelchair", "Wood Pile",
];

interface TabTwoProps {
  onBack: () => void;
  onNext: (quantities: Record<string, number>) => void;
}

const TabTwo = ({ onBack, onNext }: TabTwoProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(ITEMS.map((i) => [i.key, 0]))
  );
  const [searchQuery, setSearchQuery] = useState("");

  const total = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  const change = (key: string, delta: number) => {
    const next = (quantities[key] ?? 0) + delta;
    if (next < 0) return;
    if (total + delta > 12) return;
    setQuantities((prev) => ({ ...prev, [key]: next }));
  };

  const suggestions = searchQuery.trim().length > 0
    ? SEARCH_CATALOG.filter((label) =>
        label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const addCustomItem = (label: string) => {
    const key = `custom:${label}`;
    setQuantities((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    setSearchQuery("");
  };

  const customKeys = Object.keys(quantities).filter((k) => k.startsWith("custom:"));

  return (
    <div>
      <p className="fw-semibold mb-1">
        What items did you want picked up?<span className="text-danger">*</span>
      </p>
      <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
        Only 12 items can be picked up per request.
      </p>

      {/* Standard item list */}
      <div className="jp-item-list mb-3">
        {ITEMS.map((item) => (
          <div key={item.key} className="jp-item-row">
            <div className="jp-item-icon">{item.icon}</div>
            <div className="jp-item-info">
              <p className="jp-item-label">{item.label}</p>
              <p className="jp-item-desc">{item.description}</p>
            </div>
            <div className="jp-counter">
              <button
                className="jp-counter-btn"
                onClick={() => change(item.key, -1)}
                disabled={quantities[item.key] === 0}
              >
                −
              </button>
              <span className="jp-counter-val">{quantities[item.key]}</span>
              <button
                className="jp-counter-btn"
                onClick={() => change(item.key, 1)}
                disabled={total >= 12}
              >
                +
              </button>
            </div>
          </div>
        ))}

        {/* Custom added items */}
        {customKeys.map((key) => {
          const label = key.replace("custom:", "");
          return (
            <div key={key} className="jp-item-row">
              <div className="jp-item-icon">📦</div>
              <div className="jp-item-info">
                <p className="jp-item-label">{label}</p>
              </div>
              <div className="jp-counter">
                <button
                  className="jp-counter-btn"
                  onClick={() => change(key, -1)}
                  disabled={quantities[key] === 0}
                >
                  −
                </button>
                <span className="jp-counter-val">{quantities[key]}</span>
                <button
                  className="jp-counter-btn"
                  onClick={() => change(key, 1)}
                  disabled={total >= 12}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
        Can't find what you're looking for?
      </p>
      <p className="text-muted mb-2" style={{ fontSize: "13px" }}>
        Search for more items below. Selected items will appear in menu above.
      </p>

      <div className="jp-search-wrap mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {suggestions.length > 0 && (
          <div className="jp-suggestion-list">
            {suggestions.map((label) => {
              const isStandard = STANDARD_LABELS.has(label.toLowerCase());
              return (
                <div
                  key={label}
                  className="jp-suggestion-item"
                  style={{ color: isStandard ? "#198bb3" : "#212529" }}
                  onClick={() => addCustomItem(label)}
                >
                  {label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="mb-4" style={{ fontSize: "13px" }}>
        Still can't find your item?{" "}
        <span style={{ color: "#198bb3" }}>
          Go ahead but we'll reach out for more information
        </span>
      </p>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <button className="ep-back-btn w-50" onClick={onBack}>
          Go Back
        </button>
        <button className="next-btn w-50" onClick={() => onNext(quantities)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TabTwo;
