import React, { forwardRef, useImperativeHandle, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export interface SectionOneRef {
  validate: () => boolean;
}

export interface SectionOneData {
  address: string;
  position: { lat: number; lng: number };
}

interface SectionOneProps {
  data: SectionOneData;
  onChange: (data: SectionOneData) => void;
}

const SectionOne = forwardRef<SectionOneRef, SectionOneProps>(
  ({ data, onChange }, ref) => {
    const [errors, setErrors] = useState<any>({});

    const handleDragEnd = (e: any) => {
      onChange({ ...data, position: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
    };

    useImperativeHandle(ref, () => ({
      validate() {
        const newErrors: any = {};
        if (!data.address) newErrors.address = "Address is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    return (
      <div>
        <div className="mb-3">
          <label className="fw-bold">
            Encampment Location <span className="text-danger">*</span>
          </label>

          <ol className="ec-ol mt-2 mb-3">
            <li>Type in the address and pick from the autocomplete options or</li>
            <li>Move the red pin on the map</li>
            <li>Click the 'Search' button once the address field is populated</li>
          </ol>

          <input
            type="text"
            className="form-control mb-2"
            placeholder=""
            value={data.address}
            onChange={(e) => {
              onChange({ ...data, address: e.target.value });
              setErrors((prev: any) => ({ ...prev, address: "" }));
            }}
          />
          {errors.address && (
            <p className="text-danger ec-error">{errors.address}</p>
          )}

          <button type="button" className="next-btn mb-3 search-btn w-100">
            Search (required) &nbsp;🔍
          </button>
        </div>

        <div className="mb-3">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerClassName="ec-map-container" center={data.position} zoom={13}>
              <Marker position={data.position} draggable onDragEnd={handleDragEnd} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    );
  }
);

export default SectionOne;
