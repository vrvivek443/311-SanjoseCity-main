import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ReportState {
  service?: string;
  referenceNumber?: string;
  status?: string;
  description?: string;
  location?: string;
  submittedDate?: string;
  photos?: string[];              // base64 / URLs from form submission
  investigationPhotos?: string[]; // added post-investigation
  position?: { lat: number; lng: number };
}

// ── Per-service mock fallbacks (replace with API fetch) ───────────────────────
const MOCK_BY_SERVICE: Record<string, Omit<ReportState, "service">> = {
  "Graffiti": {
    referenceNumber: "260524-000001",
    status: "Open",
    description: "Tell Us More",
    location: "San Jose, CA, USA",
    submittedDate: "5/24/2026 9:48 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3382, lng: -121.8863 },
  },
  "Illegal Dumping": {
    referenceNumber: "260524-000002",
    status: "Open",
    description: "Tell Us More - Test Ticket from Dev Side",
    location: "600 Epic Way, San Jose, CA, USA",
    submittedDate: "5/24/2026 10:09 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3318, lng: -121.9030 },
  },
  "Streetlight Outage": {
    referenceNumber: "260524-000003",
    status: "Open",
    description: "Tell Us More",
    location: "San Jose, CA, USA",
    submittedDate: "5/24/2026 11:00 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3382, lng: -121.8863 },
  },
  "Community WiFi": {
    referenceNumber: "260524-000004",
    status: "Open",
    description: "Tell Us More",
    location: "San Jose, CA, USA",
    submittedDate: "5/24/2026 11:30 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3382, lng: -121.8863 },
  },
  "Illegal Fireworks": {
    referenceNumber: "260524-000005",
    status: "Open",
    description: "Tell Us More",
    location: "San Jose, CA, USA",
    submittedDate: "5/24/2026 11:45 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3382, lng: -121.8863 },
  },
  "Other Issues": {
    referenceNumber: "260524-000006",
    status: "Open",
    description: "Tell Us More",
    location: "San Jose, CA, USA",
    submittedDate: "5/24/2026 11:50 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3382, lng: -121.8863 },
  },
  "Pothole": {
    referenceNumber: "260524-000007",
    status: "Open",
    description: "Tell Us More",
    location: "San Jose, CA, USA",
    submittedDate: "5/24/2026 11:55 PM",
    photos: [],
    investigationPhotos: [],
    position: { lat: 37.3382, lng: -121.8863 },
  },
};

const DEFAULT_MOCK: Omit<ReportState, "service"> = {
  referenceNumber: "260524-000000",
  status: "Open",
  description: "Tell Us More",
  location: "San Jose, CA, USA",
  submittedDate: "5/24/2026 9:00 PM",
  photos: [],
  investigationPhotos: [],
  position: { lat: 37.3382, lng: -121.8863 },
};

const MAX_COMMENT = 255;
const mapContainerStyle = { width: "100%", height: "300px" };

const SinglePhoto = ({ photos }: { photos: string[] }) => (
  <div
    className="border rounded"
    style={{ height: 220, background: photos.length ? "#f8f8f8" : "#0b3d5c", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
  >
    {photos.length > 0 ? (
      <img src={photos[0]} alt="submitted-photo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
    ) : (
      <div style={{ textAlign: "center", color: "#fff" }}>
        <i className="bx bx-camera" style={{ fontSize: 52 }}></i>
        <p style={{ fontSize: 12, marginTop: 6 }}>No photos submitted</p>
      </div>
    )}
  </div>
);

const PhotoGridAll = ({ photos }: { photos: string[] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
    {photos.map((src, i) => (
      <div
        key={i}
        style={{ background: "#f8f8f8", border: "1px solid #ddd", borderRadius: 6, height: 180, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <img
          src={src}
          alt={`photo-${i}`}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
    ))}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
interface PostedComment {
  id: number;
  text: string;
  author: string;
  time: string;
}

const TrackReport = () => {
  const { user } = useAuth();
  const { state } = useLocation() as { state: ReportState | null };
  const [comment, setComment] = useState("");
  const [postedComments, setPostedComments] = useState<PostedComment[]>([]);

  const handleSubmitComment = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = now.toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
    setPostedComments((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, author: user ? `${user.firstName} ${user.lastName}`.trim() : "You", time },
    ]);
    setComment("");
  };

  const service = state?.service ?? "Report";
  const mock = MOCK_BY_SERVICE[service] ?? DEFAULT_MOCK;

  const referenceNumber  = state?.referenceNumber  ?? mock.referenceNumber!;
  const status           = state?.status           ?? mock.status!;
  const description      = state?.description      ?? mock.description!;
  const location         = state?.location         ?? mock.location!;
  const submittedDate    = state?.submittedDate     ?? mock.submittedDate!;
  const photos           = state?.photos            ?? mock.photos!;
  const position         = state?.position          ?? mock.position!;

  return (
    <div className="container mt-3 mb-4">
      {/* Header */}
      <h5 className="fw-bold mb-2">Report Summary</h5>
      <p style={{ color: "#0f766e", fontWeight: 600 }}>
        Reference Number: {referenceNumber}
      </p>

      <div className="row">
        {/* LEFT — details */}
        <div className="col-md-6">
          <div className="border rounded p-3 mb-3 bg-light">
            <p><strong>Status:</strong>&nbsp; {status}</p>
            <p>
              <strong>Service:</strong>&nbsp;
              <span style={{ color: "#0f766e" }}>{service}</span>
            </p>
            <p><strong>Description:</strong>&nbsp; {description}</p>
            <p><strong>Location:</strong>&nbsp; {location}</p>
            <p><strong>Submitted Date:</strong>&nbsp; {submittedDate}</p>
          </div>
        </div>

        {/* RIGHT — submission photos (first photo only) */}
        <div className="col-md-6">
          <p className="fw-bold" style={{ fontSize: 13 }}>
            PHOTOS SUBMITTED AT SERVICE REQUEST CREATION
          </p>
          <SinglePhoto photos={photos} />
        </div>
      </div>

      {/* Comment section */}
      <div className="border rounded p-3 mb-3 bg-light">
        {user ? (
          <>
            <label className="fw-semibold mb-2" style={{ fontSize: 14 }}>
              Your comment
            </label>
            <div style={{ position: "relative" }}>
              <textarea
                className="form-control"
                rows={3}
                maxLength={MAX_COMMENT}
                placeholder="Type your comment here...."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ resize: "none", paddingRight: 36 }}
              />
              <span style={{ position: "absolute", top: 6, right: 10, fontSize: 11, color: "#888" }}>
                {MAX_COMMENT - comment.length}
              </span>
            </div>
            <button
              className="mt-3"
              onClick={handleSubmitComment}
              style={{
                background: "#0f766e", color: "#fff", border: "none",
                borderRadius: 6, padding: "8px 18px", fontWeight: 600, cursor: "pointer",
              }}
            >
              Submit Comment
            </button>

            {postedComments.length > 0 && (
              <div className="mt-3">
                {postedComments.map((c) => (
                  <div key={c.id} className="border rounded p-2 mb-2" style={{ background: "#fff" }}>
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{c.author}</span>
                      <span style={{ fontSize: 11, color: "#888" }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: 13, margin: 0 }}>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
            You must be logged in to post or view comments.
          </p>
        )}
      </div>

      {/* All submitted photos grid */}
      {photos.length > 0 && (
        <div className="mb-3">
          <p className="fw-bold mb-2" style={{ fontSize: 13 }}>VIEW INVESTIGATION PHOTOS</p>
          <PhotoGridAll photos={photos} />
        </div>
      )}

      {/* Map */}
      <div className="border rounded">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={position} zoom={13}>
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default TrackReport;
