import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./street-sweeping.css";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";

const MOCK_DETAILS = {
  nearestStreet: "Kerley Dr",
  sweepDays: "1st and 3rd Tuesday of the Month",
  sweepTime: "12am - 8am",
  phone: "DOT: (408) 794-1900",
  parkingRestrictions: "",
};

const StreetSweeping = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleGetDetails = () => {
    if (!address.trim()) {
      setAddressError("Please enter your address");
      return;
    }
    setAddressError("");
    setIsFetching(true);

    setTimeout(() => {
      setIsFetching(false);
      setShowResults(true);
    }, 1500);
  };

  const handleSubscribe = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setShowFeedbackModal(true);
  };

  const title = (
    <h4
      className="fw-bold mb-4"
      style={{
        borderBottom: "2px solid #d4a017",
        display: "inline-block",
        paddingBottom: "4px",
      }}
    >
      Street Sweeping Lookup
    </h4>
  );

  if (subscribed) {
    return (
      <div className="container mt-3 mb-4">
        {title}
        <AlertNavigation
          description={[
            "We have sent a verification email to your email address. Please click on the verification link in the email to start your subscription.",
          ]}
          primaryText="Go Home"
          onPrimary={() => navigate("/")}
          secondaryText=""
          onSecondary={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="container mt-3 mb-4">
      {title}

      {!showResults ? (
        /* ── Lookup form ── */
        <div>
          <div className="mb-3">
            <label className="fw-semibold mb-1 d-block">
              Enter your address:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressError("");
              }}
            />
            {addressError && (
              <p className="text-danger mb-0 mt-1">{addressError}</p>
            )}
          </div>

          <button className="next-btn w-100" onClick={handleGetDetails}>
            Get Street Sweeping Details
          </button>
        </div>
      ) : (
        /* ── Results ── */
        <div>
          <p className="fw-bold mb-1">Your address:</p>
          <p className="mb-4">{address}</p>

          {/* Details card */}
          <div className="ss-details-card">
            <h6 className="fw-bold mb-3">Street Sweeping Details</h6>
            <table>
              <tbody>
                <tr>
                  <td>Nearest Street:</td>
                  <td>{MOCK_DETAILS.nearestStreet}</td>
                </tr>
                <tr>
                  <td>Sweep Days:</td>
                  <td>{MOCK_DETAILS.sweepDays}</td>
                </tr>
                <tr>
                  <td>Sweep Time:</td>
                  <td>{MOCK_DETAILS.sweepTime}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{MOCK_DETAILS.phone}</td>
                </tr>
                <tr>
                  <td>Parking Restrictions:</td>
                  <td>{MOCK_DETAILS.parkingRestrictions}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Details note */}
          <p className="fw-bold mb-1" style={{ fontSize: "13px" }}>
            DETAILS
          </p>
          <p className="mb-4" style={{ fontSize: "14px" }}>
            Multiple sweeping routes may be in your street or neighborhood.
            Please{" "}
            <a
              href="https://gis.sanjoseca.gov/maps/serviceslookuptool/"
              target="_blank"
              rel="noreferrer"
            >
              view map
            </a>{" "}
            and click route lines to see other nearby sweeping times.
          </p>

          {/* Subscribe section */}
          <p className="fw-semibold mb-3" style={{ fontSize: "14px" }}>
            Please provide your email address if you would like to subscribe
            for email notifications one day prior to your scheduled street
            sweeping.
          </p>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && (
            <p className="text-danger mb-2">{emailError}</p>
          )}

          <button className="next-btn w-100 mb-2" onClick={handleSubscribe}>
            Subscribe
          </button>

          <button className="ss-exit-btn mt-1" onClick={() => navigate("/")}>
            Exit
          </button>
        </div>
      )}

      {/* Loader */}
      {isFetching && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Fetching details...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreetSweeping;
