import AlertNavigation from "../../shared/alert-navigation/alert-navigation";

interface IllegalFireworkWarningProps {
  onAgree: () => void;
}

const IllegalFireworkWarning = ({ onAgree }: IllegalFireworkWarningProps) => {
  return (
    <div className="container mt-4">
      <h4 className="fw-bold mb-4">Illegal Fireworks</h4>

      <AlertNavigation
        description={[
          <strong>
            Reporting here will not result in enforcement officers being
            immediately dispatched to the scene.
          </strong>,
          <span className="text-danger">
            To submit a report, you will need to know the location of the
            firework activity.
          </span>,
          <>
            To continue, please agree to the following:
            <ol className="mt-2">
              <li className="mb-2">
                Any photo or video footage related to illegal fireworks use that
                is submitted may be used as evidence.
              </li>
              <li className="mb-2">
                Under no circumstances shall residents who report the use of
                illegal fireworks construe that they are acting as an agent or
                employee of the City, San José Fire Department, or the San José
                Police Department.
              </li>
              <li className="mb-2">
                The City may contact you to confirm your report. If the
                responsible party contests the citation, you will be asked to
                provide evidence.
              </li>
            </ol>
          </>,
        ]}
        primaryText="I Understand And Agree"
        secondaryText=""
        onPrimary={onAgree}
        onSecondary={() => {}}
      />
    </div>
  );
};

export default IllegalFireworkWarning;
