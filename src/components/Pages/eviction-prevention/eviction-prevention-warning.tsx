import { useNavigate } from "react-router-dom";
import "./eviction-prevention.css";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

const EvictionPreventionWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-3 mb-4">
      <h4 className="fw-bold mb-4 ep-heading">
        Eviction Prevention
      </h4>

      <AlertNavigation
        description={[
          <>
            All personal identifying information is kept confidential and not
            used for any other purpose. The information you provide will be used
            for support in the requested housing services and associated
            government services. All personal identifying information is kept
            confidential unless required by law. Your data provided will not be
            sold for any purpose and will not be used to investigate matters
            related to immigration status. For more information on the City of
            San Jose's data handling, see the{" "}
            <a
              href="https://www.sanjoseca.gov/your-government/departments-offices/information-technology/e-government-policy"
              target="_blank"
              rel="noreferrer"
            >
              E-Government policy
            </a>
            .
          </>,
        ]}
        primaryText="Continue"
        onPrimary={() => navigate("/eviction-prevention")}
        secondaryText=""
        onSecondary={() => {}}
      />
    </div>
  );
};

export default EvictionPreventionWarning;
