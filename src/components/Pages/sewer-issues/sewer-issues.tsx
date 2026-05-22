import React from "react";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

const SewageIssues = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Heading */}
      <h4
        className="fw-bold mb-3"
        style={{
          borderBottom: "2px solid #d4a017",
          display: "inline-block",
          paddingBottom: "4px",
        }}
      >
        Report Sewer / Water Issues
      </h4>

      {/* Alert Navigation Component */}
      <AlertNavigation
        description={[
          "Please report any of the following emergencies immediately by phone at (408) 794-1900:",
        ]}
        links={[
          { label: "Sewer spills or bad odors" },
          { label: "Local flooding or water in the street" },
          { label: "Missing, broken or displaced manhole covers or grates" },
          { label: "You can also report downed trees/limbs" },
        ]}
        primaryText="Call (408) 794-1900"
        secondaryText="Go Home"
        onPrimary={() => {
          window.location.href = "tel:4087941900";
        }}
        onSecondary={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default SewageIssues;