import React from "react";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

const StreetlightWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h4
        className="fw-bold mb-4"
        style={{
          textDecoration: "underline",
        }}
      >
        Your Streetlight Outage Report
      </h4>

      <AlertNavigation
        description={[
          "Please note: Due to widespread streetlight vandalism and copper wire theft, streetlight outages are currently taking at least six months to repair.",
          "We are in the process of adding capacity to improve response times. See if your streetlight has already been reported by visiting our Streetlight Stolen Wire and Vandalism Incidents map.",
        ]}
        primaryText="I understand, continue"
        secondaryText="Return Home"
        onPrimary={() => navigate("/streetlight-outage")}
        onSecondary={() => navigate("/")}
      />
    </div>
  );
};

export default StreetlightWarning;