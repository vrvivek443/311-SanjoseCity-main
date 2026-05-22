import React from "react";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

const PayUtilityBills = () => {
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
        Pay Utility Bills
      </h4>

      {/* Intro Text */}
      <p className="fw-semibold">
        Pay for San José Municipal Water System and Recycling & Garbage for
        residential properties with communal service here:
      </p>

      {/* Common Component */}
      <AlertNavigation
        description={[
          "Recycling & Garbage - Single-Family Residential Customers",
          <>
            The City of San José has changed the billing method for single-family
            residential garbage services. Charges are now placed on the{" "}
            <a
              href="https://dtac.santaclaracounty.gov/home"
              target="_blank"
              rel="noreferrer"
            >
              Santa Clara County Secured Property Tax bill
            </a>
            . The billing cycle covered will be the same as the property tax
            bill: July 1 - June 30.
          </>,
        ]}
        links={[
          {
            label: (
              <>
                Use{" "}
                <a
                  href="https://www.e-billexpress.com/ebpp/CSJUtilities/Login/Index"
                  target="_blank"
                  rel="noreferrer"
                >
                  E-Bill Express
                </a>{" "}
                to pay your bill online or sign up for automatic payments. Have
                your account number and amount ready.
              </>
            ),
          },
          {
            label:
              "Prefer to pay by phone? Call (866) 551-5253. (Available 24 hours)",
          },
          {
            label: "Paperless billing option is not available at this time.",
          },
          {
            label: "The ability to view your bills online is currently unavailable.",
          },
          {
            label: (
              <>
                To pay PG&E bills please go to{" "}
                <a
                  href="https://www.pge.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  pge.com
                </a>
              </>
            ),
          },
        ]}
        descriptionBelow
        primaryText="Go To E-Bill Express now!"
        secondaryText=""
        onPrimary={() => {
          window.open("https://www.e-billexpress.com/ebpp/CSJUtilities/Login/Index", "_blank");
        }}
        onSecondary={() => {}}
      />
    </div>
  );
};

export default PayUtilityBills;