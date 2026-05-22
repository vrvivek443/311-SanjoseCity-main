import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface TabThreeProps {
  position: { lat: number; lng: number };
  onPositionChange: (pos: { lat: number; lng: number }) => void;
  onBack: () => void;
  onNext: () => void;
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

const TabThree = ({ position, onPositionChange, onBack, onNext }: TabThreeProps) => {
  const handleDragEnd = (e: any) => {
    onPositionChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <div>
      <p className="fw-bold mb-1">Help our drivers find your items</p>
      <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
        If you live in an apartment or condo, drag red pin to a location
        approved by your property manager
      </p>

      <div className="mb-4">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={14}
          >
            <Marker
              position={position}
              draggable
              onDragEnd={handleDragEnd}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="d-flex gap-2">
        <button className="jp-back-outline-btn w-50" onClick={onBack}>
          Go Back
        </button>
        <button className="next-btn w-50" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TabThree;
