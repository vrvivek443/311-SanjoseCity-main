import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./other-reports.css";

const ISSUE_TYPES = [
  "All",
  "Graffiti",
  "Vehicle Concerns",
  "Illegal Dumping",
  "Pothole",
  "Streetlight Outage",
  "Illegal Fireworks",
  "Community Wifi",
  "Sewer Issues",
  "Other Issues",
  "Junk Pickup",
  "Missed Collections",
  "Container Issues",
];

const SAMPLE_MARKERS = [
  { lat: 37.3382, lng: -121.8863 },
  { lat: 37.3450, lng: -121.8900 },
  { lat: 37.3300, lng: -121.8800 },
  { lat: 37.3520, lng: -121.8750 },
  { lat: 37.3250, lng: -121.8950 },
  { lat: 37.3600, lng: -121.8700 },
  { lat: 37.3180, lng: -121.8650 },
  { lat: 37.3700, lng: -121.9000 },
  { lat: 37.3400, lng: -121.9100 },
  { lat: 37.3550, lng: -121.8600 },
];

const mapContainerStyle = { width: "100%", height: "420px" };
const mapCenter = { lat: 37.3382, lng: -121.8863 };

const OtherReports = () => {
  const [isMapView, setIsMapView] = useState(true);
  const [issueType, setIssueType] = useState("All");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [reportId, setReportId] = useState("");

  return (
    <div className="container-fluid mt-3 mb-4">
      <div className="row g-3">

        {/* Left — Map / List */}
        <div className="col-lg-8">
          <div className="or-map-wrapper">
            <div className="or-map-header">
              <p className="or-map-title">
                All Requests - {isMapView ? "Map View" : "List View"}
              </p>
              <button
                className="or-switch-btn"
                onClick={() => setIsMapView((v) => !v)}
              >
                Switch To {isMapView ? "List View" : "Map View"}
              </button>
            </div>

            {isMapView ? (
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={12}
                >
                  {SAMPLE_MARKERS.map((pos, i) => (
                    <Marker key={i} position={pos} />
                  ))}
                </GoogleMap>
              </LoadScript>
            ) : (
              <div className="p-3">
                <table className="table table-bordered or-list-table">
                  <thead className="table-light">
                    <tr>
                      <th>Report ID</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>260521-000001</td>
                      <td>Graffiti</td>
                      <td>05/21/2026</td>
                      <td>Open</td>
                    </tr>
                    <tr>
                      <td>260521-000002</td>
                      <td>Pothole</td>
                      <td>05/20/2026</td>
                      <td>In Progress</td>
                    </tr>
                    <tr>
                      <td>260521-000003</td>
                      <td>Illegal Dumping</td>
                      <td>05/19/2026</td>
                      <td>Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right — Filters */}
        <div className="col-lg-4 d-flex flex-column gap-3">

          {/* Filter by type + date */}
          <div className="or-filter-card">
            <p className="or-filter-label">Find a report by type of issue</p>

            <select
              className="form-select form-select-sm mb-3"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              {ISSUE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <label className="fw-semibold mb-1" style={{ fontSize: "13px" }}>
              From Date
            </label>
            <div className="or-date-input-wrap mb-3">
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                onChangeRaw={(e) => e.preventDefault()}
                dateFormat="MM/dd/yyyy"
                placeholderText="mm/dd/yyyy"
                className="form-control form-control-sm"
                wrapperClassName="d-block"
              />
              <span className="or-cal-icon">📅</span>
            </div>

            <label className="fw-semibold mb-1" style={{ fontSize: "13px" }}>
              To Date
            </label>
            <div className="or-date-input-wrap">
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                onChangeRaw={(e) => e.preventDefault()}
                dateFormat="MM/dd/yyyy"
                placeholderText="mm/dd/yyyy"
                minDate={fromDate ?? undefined}
                className="form-control form-control-sm"
                wrapperClassName="d-block"
              />
              <span className="or-cal-icon">📅</span>
            </div>

            <button className="or-search-btn">Search</button>
          </div>

          {/* Filter by ID */}
          <div className="or-filter-card">
            <p className="or-filter-label">
              Find a report by ID# e.g. 0123456-789012 or SJ311PSR20240328-0001
            </p>
            <input
              type="text"
              className="form-control form-control-sm"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
            />
            <button className="or-search-btn">Search</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OtherReports;
