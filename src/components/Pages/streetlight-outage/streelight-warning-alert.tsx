import React from "react";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

const StreetlightWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h4
        className="fw-bold mb-4 all-title"
      >
        Your Streetlight Outage Report
      </h4>

      <AlertNavigation
        description={[
          <>
            Please note: Due to widespread streetlight vandalism and copper wire theft,{" "}
            <span className="text-danger">streetlight outages are currently taking at least six months to repair.</span>
          </>,
          <>
            We are in the process of adding capacity to improve response times. See if your streetlight has already been reported by visiting our{" "}
            <a
              href="https://csj.maps.arcgis.com/apps/webappviewer/index.html?id=b3621648cdf24ccb9a837d57ecda06eb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Streetlight Stolen Wire and Vandalism Incidents map
            </a>
            .
          </>,
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