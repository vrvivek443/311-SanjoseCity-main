import { useState } from "react";
import "./collection-scheduele.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const PROVIDERS = [
  {
    label: "Garbage",
    name: "GreenTeam (MFD)",
    email: "311CustomerService4020@wasteconnections.com",
    phone: "(408) 282-4400",
  },
  {
    label: "Recycling",
    name: "GreenTeam (MFD)",
    email: "311CustomerService4020@wasteconnections.com",
    phone: "(408) 282-4400",
  },
  {
    label: "Yard waste",
    name: "GreenWaste (MFD)",
    email: "customerservice@greenwaste.com",
    phone: "(408) 283-4800",
  },
];

const buildCalendarCells = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; isCurrentMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  const remaining = Math.ceil(cells.length / 7) * 7 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false });
  }

  return cells;
};

const CollectionSchedule = () => {
  const [address, setAddress] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchedAddress, setSearchedAddress] = useState("");
  const [error, setError] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const cells = buildCalendarCells(year, month);

  const handleSearch = () => {
    if (!address.trim()) {
      setError("Please enter an address to search");
      return;
    }
    setError("");
    setSearchedAddress(address.trim());
    setSearched(true);
  };

  return (
    <div className="container mt-3 mb-4">
      <h4 className="fw-bold mb-4 cs-title">My Collection Information</h4>

      <p className="mb-4" style={{ fontSize: "14px" }}>
        The City partners with various haulers to deliver our garbage and
        recycling services. Enter your address below to find your collection
        schedule and customer support info:
      </p>

      {/* Search */}
      <label className="fw-bold mb-1 d-block" style={{ fontSize: "14px" }}>
        Your home address:<span className="text-danger">*</span>
      </label>
      <div className="cs-search-wrap mb-1">
        <input
          type="text"
          className="cs-search-input"
          placeholder="Enter an address to search"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="cs-search-btn" onClick={handleSearch}>
          Search &nbsp;🔍
        </button>
      </div>
      {error && <p className="text-danger mb-2" style={{ fontSize: "13px" }}>{error}</p>}

      {/* Results */}
      {searched && (
        <div className="mt-3">
          <p style={{ fontSize: "13px" }} className="mb-3">
            This is hauler customer support info and the collection schedule for{" "}
            {searchedAddress}
          </p>

          {/* Calendar */}
          <div className="cs-calendar mb-1">
            <div className="cs-cal-month">
              {MONTH_NAMES[month]} {year}
            </div>

            <div className="cs-cal-grid">
              {/* Day of week headers */}
              {DAYS_OF_WEEK.map((d) => (
                <div key={d} className="cs-cal-dow">{d}</div>
              ))}

              {/* Day cells */}
              {cells.map((cell, i) => {
                const dow = i % 7;
                const isToday =
                  cell.isCurrentMonth && cell.day === today.getDate();
                const isTuesday = dow === 2;
                const isWednesday = dow === 3;

                let className = "cs-day-cell";
                if (!cell.isCurrentMonth) className += " cs-day-other";
                if (isToday) className += " cs-day-today";

                return (
                  <div key={i} className={className}>
                    <div className="cs-day-num">{cell.day}</div>
                    {cell.isCurrentMonth && isTuesday && (
                      <span className="cs-tag cs-tag-yard">Yard</span>
                    )}
                    {cell.isCurrentMonth && isWednesday && (
                      <span className="cs-tag cs-tag-garbage">Garbage, Recycle</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Provider info */}
          <div className="cs-provider-table">
            {PROVIDERS.map((p) => (
              <div key={p.label} className="cs-provider-row">
                <span className="cs-provider-label">{p.label}</span>
                <span className="cs-provider-info">
                  {p.name}<br />
                  {p.email}<br />
                  {p.phone}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionSchedule;
