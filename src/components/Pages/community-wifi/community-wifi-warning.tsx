import React from "react";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

const CommunityWifiWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Heading */}
      <h4
        className="fw-bold mb-4"
        style={{
          borderBottom: "2px solid #d4a017",
          display: "inline-block",
          paddingBottom: "4px",
        }}
      >
        Community WiFi
      </h4>

      {/* Alert Navigation */}
      <AlertNavigation
        description={[
          "Your feedback on community wifi is very important so that the City can continue to improve this service. Please know that your feedback will be received and reviewed, but you will not receive an individual reply to your report. Your report will be used to inform future service upgrades.",
        ]}
        primaryText="I Understand And Agree"
        secondaryText=""
        onPrimary={() => navigate("/community-wifi")}
        onSecondary={() => {}}
      />
    </div>
  );
};

export default CommunityWifiWarning;