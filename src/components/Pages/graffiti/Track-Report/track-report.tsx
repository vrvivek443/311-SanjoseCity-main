import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const TrackReport = () => {
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const position = {
    lat: 37.3382,
    lng: -121.8863,
  };

  return (
    <div className="container mt-3 mb-4">
      {/* Header */}
      <h5 className="fw-bold mb-2">Report Summary</h5>
      <p className="text-primary fw-semibold">
        Reference Number: 260505-000016
      </p>

      <div className="row">
        {/* LEFT SECTION */}
        <div className="col-md-6">
          <div className="border rounded p-3 mb-3 bg-light">
            <p>
              <strong>Status:</strong> Open
            </p>
            <p>
              <strong>Service:</strong> Graffiti
            </p>
            <p>
              <strong>Description:</strong> Tell Us More
            </p>
            <p>
              <strong>Location:</strong>
              <br />
              San Jose Mineta International Airport (SJC), Airport Boulevard,
              San Jose, CA, USA
            </p>
            <p>
              <strong>Submitted Date:</strong> 5/5/2026 3:24 AM
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-6">
          <p className="fw-bold">
            PHOTOS SUBMITTED AT SERVICE REQUEST CREATION
          </p>

          <div
            className="border rounded d-flex align-items-center justify-content-center"
            style={{
              height: "180px",
              background: "#0b3d5c",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "40px" }}>📷</div>
          </div>
        </div>
      </div>

      {/* LOGIN MESSAGE */}
      <div className="border rounded p-2 mb-3 bg-light">
        You must be logged in to post or view comments.
      </div>

      {/* MAP */}
      <div className="border rounded">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={13}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default TrackReport;