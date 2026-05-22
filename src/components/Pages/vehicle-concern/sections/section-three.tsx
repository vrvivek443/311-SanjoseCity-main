import React, { forwardRef, useImperativeHandle } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export interface SectionThreeRef {
  validate: () => boolean;
}

interface SectionThreeData {
  cityStreet: string;
  address: string;
  additionalInfo: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface SectionThreeProps {
  data: SectionThreeData;
  onChange: (data: SectionThreeData) => void;
}

const SectionThree = forwardRef<SectionThreeRef, SectionThreeProps>(
  ({ data, onChange }, ref) => {
    const [errors, setErrors] = React.useState<any>({});

    const containerStyle = {
      width: "100%",
      height: "400px",
    };

    const handleDragEnd = (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      onChange({
        ...data,
        position: { lat, lng },
      });
    };

    // ✅ Validation
    useImperativeHandle(ref, () => ({
      validate() {
        let newErrors: any = {};

        if (!data.cityStreet) {
          newErrors.cityStreet = "Please select Yes or No";
        }

        if (!data.address) {
          newErrors.address = "Address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    return (
      <div className="container mt-3 mb-4">
        {/* Question */}
        <div className="mb-3">
          <label className="fw-bold">
            Is the vehicle on a City Street?{" "}
            <span className="text-danger">*</span>
          </label>

          <div className="mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cityStreet"
                id="yes"
                checked={data.cityStreet === "yes"}
                onChange={() => {
                  onChange({ ...data, cityStreet: "yes" });
                  setErrors((prev: any) => ({
                    ...prev,
                    cityStreet: "",
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="yes">
                Yes
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cityStreet"
                id="no"
                checked={data.cityStreet === "no"}
                onChange={() => {
                  onChange({ ...data, cityStreet: "no" });
                  setErrors((prev: any) => ({
                    ...prev,
                    cityStreet: "",
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="no">
                No
              </label>
            </div>
          </div>

          {errors.cityStreet && (
            <p className="text-danger">{errors.cityStreet}</p>
          )}
        </div>

        {/* Address Section */}
        <div className="mb-3">
          <label className="fw-bold">
            Where is it? <span className="text-danger">*</span>
          </label>

          <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
            (Only San Jose addresses are enforceable)
          </p>

          <ul style={{ fontSize: "13px" }}>
            <li>Type in the full address and click search</li>
            <li>or</li>
            <li>
              Drag the red pin on the map below to select the location and then
              click search
            </li>
          </ul>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter address"
            value={data.address}
            onChange={(e) => {
              onChange({ ...data, address: e.target.value });
              setErrors((prev: any) => ({
                ...prev,
                address: "",
              }));
            }}
          />

          {errors.address && <p className="text-danger">{errors.address}</p>}

          <button type="button" className="next-btn mb-3 search-btn">
            <span>Search (required)</span>
            <span className="icon">🔍</span>
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
        <div>
          <label className="fw-semibold">Tell us more</label>
          <p className="text-muted" style={{ fontSize: "13px" }}>
            e.g. nearest intersection
          </p>

          <textarea
            className="form-control"
            rows={3}
            placeholder="Add details here"
            value={data.additionalInfo}
            onChange={(e) =>
              onChange({
                ...data,
                additionalInfo: e.target.value,
              })
            }
          />
        </div>
      </div>
    );
  },
);

export default SectionThree;
