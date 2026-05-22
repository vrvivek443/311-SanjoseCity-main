import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface SectionOneData {
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  address: string;
  additionalInfo: string;
  position: { lat: number; lng: number };
}

interface SectionOneProps {
  data: SectionOneData;
  onChange: (data: SectionOneData) => void;
  onNext: () => void;
}

const SectionOne: React.FC<SectionOneProps> = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState<any>({});

  const containerStyle = { width: "100%", height: "300px" };

  const handleDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    onChange({ ...data, position: { lat, lng } });
  };

  const validate = () => {
    const newErrors: any = {};
    let isValid = true;

    if (!data.incidentDate) {
      newErrors.incidentDate = "Please select the incident date";
      isValid = false;
    }
    if (!data.incidentTime) {
      newErrors.incidentTime = "Please select the incident time";
      isValid = false;
    }
    if (!data.incidentLocation) {
      newErrors.incidentLocation = "Please select the incident location";
      isValid = false;
    }
    if (!data.address) {
      newErrors.address = "Please provide a location and remember to hit Search";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validate()) return;
    onNext();
  };

  return (
    <div>
      {/* Date */}
      <div className="mb-3">
        <label className="fw-bold">
          Date of fireworks incident <span className="text-danger">*</span>
        </label>

        <DatePicker
          selected={data.incidentDate ? new Date(data.incidentDate) : null}
          onChange={(date: Date | null) => {
            if (date) {
              onChange({ ...data, incidentDate: date.toISOString() });
              setErrors((prev: any) => ({ ...prev, incidentDate: "" }));
            }
          }}
          dateFormat="MM/dd/yyyy"
          placeholderText="mm/dd/yyyy"
          className="form-control"
          wrapperClassName="w-100"
        />

        {errors.incidentDate && (
          <p className="text-danger mb-1">{errors.incidentDate}</p>
        )}
      </div>

      {/* Time */}
      <div className="mb-3">
        <label className="fw-bold">
          Time of fireworks incident <span className="text-danger">*</span>
        </label>

        <select
          className="form-control"
          value={data.incidentTime}
          onChange={(e) => {
            onChange({ ...data, incidentTime: e.target.value });
            setErrors((prev: any) => ({ ...prev, incidentTime: "" }));
          }}
        >
          <option value="">Select an option</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        {errors.incidentTime && (
          <p className="text-danger mb-1">{errors.incidentTime}</p>
        )}
      </div>

      {/* Location */}
      <div className="mb-3">
        <label className="fw-bold">
          Location of fireworks incident <span className="text-danger">*</span>
        </label>

        <select
          className="form-control"
          value={data.incidentLocation}
          onChange={(e) => {
            onChange({ ...data, incidentLocation: e.target.value });
            setErrors((prev: any) => ({ ...prev, incidentLocation: "" }));
          }}
        >
          <option value="">Select an option</option>
          <option>Front Yard</option>
          <option>Back Yard</option>
          <option>Street</option>
          <option>Park</option>
          <option>Parking Lot</option>
          <option>Other</option>
        </select>

        {errors.incidentLocation && (
          <p className="text-danger mb-1">{errors.incidentLocation}</p>
        )}
      </div>

      {/* Address Section */}
      <div className="mb-3">
        <label className="fw-bold">
          Please provide the address where the use, sale, or possession of
          fireworks occurred (Only San José addresses are enforceable)
          <span className="text-danger">*</span>
        </label>

        <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
          The address provided will be used for enforcement.
        </p>

        <ul style={{ fontSize: "14px" }}>
          <li>Type in the full address and click search</li>
          <li>
            or drag the red pin on the map below to select the location and then
            click search.
          </li>
        </ul>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter address"
          value={data.address}
          onChange={(e) => {
            onChange({ ...data, address: e.target.value });
            setErrors((prev: any) => ({ ...prev, address: "" }));
          }}
        />

        {errors.address && <p className="text-danger">{errors.address}</p>}

        <button className="next-btn mb-3 search-btn">
          Search (Optional) 🔍
        </button>
      </div>

      {/* Map */}
      <div className="mb-3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={data.position}
            zoom={13}
          >
            <Marker
              position={data.position}
              draggable
              onDragEnd={handleDragEnd}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Additional Info */}
      <div className="mb-3">
        <label className="fw-semibold">
          Briefly describe the incident. (what you observed)
        </label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Add details here"
          value={data.additionalInfo}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 4000) return;
            onChange({ ...data, additionalInfo: value });
          }}
        />
        <p
          className={`mt-1 ${
            data.additionalInfo.length === 4000 ? "text-danger" : "text-muted"
          }`}
          style={{ fontSize: "12px" }}
        >
          {data.additionalInfo.length}/4000 characters
        </p>
      </div>

      <button className="next-btn w-100" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default SectionOne;
