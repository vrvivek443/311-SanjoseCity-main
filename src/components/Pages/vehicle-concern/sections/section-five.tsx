import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Modal from "../../../shared/modal/modal";

export interface SectionFiveRef {
  validate: () => boolean;
}

interface SectionFiveProps {
  section4Value: string;
  data: {
    selected: string[];
    notes: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    day?: string;
    time?: string;
  };
  onChange: (data: any) => void;
}

const SectionFive = forwardRef<SectionFiveRef, SectionFiveProps>(
  ({ section4Value, data, onChange }, ref) => {
    const [errorOption, setError] = React.useState("");
    const [errorPara, setParaError] = React.useState("");
    const [showISSModal, setShowISSModal] = useState(false);
    const [emailError, setEmailError] = useState("");
    React.useEffect(() => {
      if (section4Value === "ISS" && data.day && data.time) {
        setShowISSModal(false);
      }
    }, [data.day, data.time, section4Value]);

    const livTriggerOption = "LIV_SEEN_PERSON";

    const isSingleSelect = section4Value === "POO" || section4Value === "ISS";

    const headerConfig = useMemo(() => {
      switch (section4Value) {
        case "LIV":
        case "TRA":
          return {
            title:
              "Please select at least one option that applies to the vehicle you are reporting:",
          };

        case "PAR":
          return {
            title:
              "If the vehicle is in a park, creek or a trail, select at least one option that applies to the vehicle you are reporting:",
          };

        case "PRI":
          return {
            title:
              "If the vehicle is on a residential private property, select at least one option that applies to the vehicle you are reporting:",
          };

        case "POO":
          return {
            title:
              "Vehicles will be investigated if they meet one of these qualifying conditions:",
            description:
              "Select one option that best describes the problem you are reporting.",
          };

        case "ISS":
          return {
            title:
              "Please select at least one option that describes the vehicle (parked on a city street):",
          };

        case "CRI":
          return {
            title:
              "What potential criminal activity did you witness involving this vehicle? Please describe:",
            description:
              "Always put your safety first. Gather information discreetly. Never confront suspicious persons.",
          };

        default:
          return {
            title: "Please select an option",
            description: "",
          };
      }
    }, [section4Value]);

    const options = useMemo(() => {
      switch (section4Value) {
        case "LIV":
          return [
            {
              code: "LIV_SEEN_PERSON",
              label:
                "I have seen a person(s) living/ going in and out of the vehicle.",
            },
            {
              code: "LIV_RV_TRASH",
              label:
                "RV with trash around it - assumed that people are living in it.",
            },
            {
              code: "LIV_TRAILER_TRASH",
              label:
                "A car with a trailer attached with trash around it - assumed that people are living in them.",
            },
          ];

        case "TRA":
          return [
            {
              code: "TRA_SEWAGE",
              label: "Sewage/ bio- waste leaking from/ around the vehicle",
            },
            {
              code: "TRA_TRASH",
              label:
                "Trash/ items outside of the vehicle on the sidewalk or in the street",
            },
          ];

        case "PAR":
          return [
            {
              code: "PAR_ABANDONED",
              label:
                "The vehicle looks abandoned/ undrivable (but no-one is living in it)",
            },
            {
              code: "PAR_BURNED",
              label: "The vehicle is burned (but no-one is living in it)",
            },
            { code: "PAR_TRASH", label: "There is trash around the vehicle" },
            {
              code: "PAR_BLOCKING_TRAIL",
              label: "The vehicle is on a trail blocking the path",
            },
          ];

        case "PRI":
          return [
            {
              code: "PRI_HEAVY_VEHICLE",
              label:
                "Commercial vehicle with gross vehicle weight over 10,000 pounds",
            },
            {
              code: "PRI_CAMPER",
              label: "Unmounted camper shell visible from the street",
            },
            {
              code: "PRI_INOPERABLE",
              label:
                "Inoperable vehicle stored on private property visible from the street",
            },
            {
              code: "PRI_REAR_STORAGE",
              label: "Vehicle stored within 5 feet of property line",
            },
            {
              code: "PRI_AUTO_BUSINESS",
              label: "Person running an auto repair business from home",
            },
            {
              code: "PRI_LIVING",
              label: "Person living in RV or vehicle over 72 hours",
            },
            {
              code: "PRI_LAWN",
              label: "Vehicle parked on unpaved surface/front yard",
            },
            {
              code: "PRI_ABANDONED",
              label: "Abandoned vehicle on private land",
            },
          ];

        case "POO":
          return [
            { code: "POO_BURNED", label: "Burned out vehicle" },
            { code: "POO_BLOCKS", label: "On jacks/ blocks" },
            { code: "POO_WINDOWS", label: "Missing or shattered windows" },
            { code: "POO_GRAFFITI", label: "Vandalized/ Graffiti" },
            { code: "POO_FLAT_TIRES", label: "Flat tires" },
            { code: "POO_MISSING_WHEEL", label: "Missing tire or wheel" },
            { code: "POO_DAMAGE", label: "Significant damage" },
            { code: "POO_OPEN", label: "Open doors or trunk" },
            { code: "POO_MARKINGS", label: "Auction/salvage markings" },
            { code: "POO_CITATIONS", label: "Multiple citations" },
            { code: "POO_DUMPING", label: "Attracting dumping" },
            { code: "POO_INOPERABLE", label: "Inoperable vehicle" },
          ];

        case "ISS":
          return [
            {
              code: "ISS_VP10",
              label:
                "Vehicle is parked without moving for 10 or more consecutive days.",
            },
            {
              code: "ISS_TRAILER",
              label: "Unattached trailer e.g. 5th wheel, boat, utility trailer",
            },
            { code: "ISS_NOPARK", label: "No Parking / Time Limit" },
            { code: "ISS_FIRE", label: "Fire Hydrant / Fire Lane" },
            { code: "ISS_BLOCKING", label: "Blocking sidewalk / traffic" },
            { code: "ISS_DISABLED", label: "Disabled parking" },
            { code: "ISS_LOADING", label: "Loading zone" },
            { code: "ISS_BIKE", label: "Bike lane" },
            { code: "ISS_PERMIT", label: "Permit parking" },
            { code: "ISS_METER", label: "Metered parking" },
          ];

        case "CRI":
          return [
            { code: "CRI_DRUGS", label: "Drugs being sold" },
            { code: "CRI_TRAFFICKING", label: "Prostitution / trafficking" },
          ];

        default:
          return [];
      }
    }, [section4Value]);

    const handleSelect = (code: string) => {
      setError("");

      if (section4Value === "ISS") {
        onChange({ ...data, selected: [code] });

        const noModalCodes = ["ISS_VP10", "ISS_TRAILER"];
        console.log(!noModalCodes.includes(code));

        if (!noModalCodes.includes(code)) {
          setShowISSModal(true);
        }

        return;
      }

      if (isSingleSelect) {
        onChange({ ...data, selected: [code] });
      } else {
        const exists = data.selected.includes(code);
        const updated = exists
          ? data.selected.filter((item) => item !== code)
          : [...data.selected, code];

        if (section4Value === "LIV" && !updated.includes("LIV_SEEN_PERSON")) {
          onChange({ ...data, selected: updated, day: "", time: "" });
        } else {
          onChange({ ...data, selected: updated });
        }
      }
    };

    useImperativeHandle(ref, () => ({
      validate() {
        let isValid = true;

        // Reset errors first
        setError("");
        setParaError("");

        // ✅ Option validation
        if (!data.selected || data.selected.length === 0) {
          setError("Please select at least one option");
          isValid = false;
        }

        if (section4Value === "ISS") {
          const selectedCode = data.selected[0];

          const noModalCodes = ["ISS_VP10", "ISS_TRAILER"];

          const requiresDateTime =
            selectedCode && !noModalCodes.includes(selectedCode);

          if (requiresDateTime && (!data.day || !data.time)) {
            setShowISSModal(true);
            return false;
          }
        }

        // ✅ LIV validation
        if (
          section4Value === "LIV" &&
          data.selected.includes(livTriggerOption)
        ) {
          if (!data.day || !data.time) {
            setError("Please select day and time");
            isValid = false;
          }
        }

        // ✅ CRI validation (TEXT AREA)
        if (section4Value === "CRI") {
          if (!data.notes || data.notes.trim() === "") {
            setParaError("Please describe the activity observed");
            isValid = false;
          }
        }

        return isValid;
      },
    }));

    return (
      <div className="container mt-3 mb-4">
        <h5 className="fw-bold">
          {headerConfig.title}
          <span className="text-danger"> *</span>
        </h5>

        {headerConfig.description && (
          <p className="text-muted">{headerConfig.description}</p>
        )}

        <div className="list-group mb-3">
          {options.length > 0 ? (
            options.map((option, index) => {
              const isChecked = data.selected.includes(option.code);

              return (
                <div key={index}>
                  <label
                    className="list-group-item list-group-item-action d-flex gap-2 align-items-start"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      className="form-check-input mt-1"
                      type={isSingleSelect ? "radio" : "checkbox"}
                      name="case5Option"
                      checked={isChecked}
                      onChange={() => handleSelect(option.code)}
                    />
                    <span>{option.label}</span>
                  </label>

                  {/* LIV Inline UI (unchanged) */}
                  {section4Value === "LIV" &&
                    option.code === livTriggerOption &&
                    isChecked && (
                      <div className="mt-3 ms-4">
                        <h6 className="fw-bold">
                          Is there a typical day and time the person(s) are seen
                          at the vehicle?
                          <span className="text-danger"> *</span>
                        </h6>

                        <div className="mb-3">
                          <label className="form-label">
                            Day<span className="text-danger"> *</span>
                          </label>
                          <select
                            className="form-select"
                            value={data.day || ""}
                            onChange={(e) => {
                              onChange({ ...data, day: e.target.value });
                              setError("");
                            }}
                          >
                            <option value="">Select an option</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            Time<span className="text-danger"> *</span>
                          </label>
                          <select
                            className="form-select"
                            value={data.time || ""}
                            onChange={(e) => {
                              onChange({ ...data, time: e.target.value });
                              setError("");
                            }}
                          >
                            <option value="">Select an option</option>
                            <option value="Morning">
                              Morning (6:00am-12:00noon)
                            </option>
                            <option value="Afternoon">
                              Afternoon (Noon-6:00pm)
                            </option>
                            <option value="Evening">
                              Evening (6:00pm-10:00pm)
                            </option>
                            <option value="Overnight">
                              Overnight (10:00pm-6:00am)
                            </option>
                          </select>
                        </div>
                      </div>
                    )}
                </div>
              );
            })
          ) : (
            <p className="text-muted">No options available</p>
          )}
        </div>

        {errorOption && <p className="text-danger">{errorOption}</p>}

        <div className="mb-3">
          <label className="fw-semibold mb-2">
            {section4Value === "CRI"
              ? "Describe the activity observed:"
              : "Additional Information - If any"}
            {section4Value === "CRI" && <span className="text-danger"> *</span>}
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Type in Text"
            value={data.notes}
            onChange={(e) => {
              onChange({ ...data, notes: e.target.value });
              setParaError("");
            }}
          />
        </div>

        {errorPara && <p className="text-danger">{errorPara}</p>}

        {/* ✅ ISS Modal */}
        <Modal
          show={showISSModal}
          onClose={() => setShowISSModal(false)}
          size="sm"
        >
          <div className="text-start">
            <h6 className="fw-bold">
              Is there a typical day and time you are seeing the illegal
              parking?
              <span className="text-danger"> *</span>
            </h6>

            <div className="mt-3">
              <label className="fw-semibold">Day</label>
              {["Weekday", "Weekend", "Everyday"].map((d) => (
                <div className="form-check" key={d}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="day"
                    checked={data.day === d}
                    onChange={() => {
                      onChange({ ...data, day: d });
                      setError("");
                    }}
                  />
                  <label className="form-check-label">{d}</label>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label className="fw-semibold">Time of Day</label>
              {[
                "Morning (6:00am-12:00noon)",
                "Afternoon (Noon-6:00pm)",
                "Evening (6:00pm-10:00pm)",
                "Overnight (10:00pm-6:00am)",
              ].map((t) => (
                <div className="form-check" key={t}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="time"
                    checked={data.time === t}
                    onChange={() => {
                      onChange({ ...data, time: t });
                      setError("");
                    }}
                  />
                  <label className="form-check-label">{t}</label>
                </div>
              ))}
            </div>
          </div>
        </Modal>

        {section4Value === "CRI" && (
          <div className="mt-4">
            {" "}
            <h6 className="fw-bold">
              {" "}
              Please provide your contact information below:{" "}
            </h6>{" "}
            <p className="text-muted">
              {" "}
              It will be helpful if investigators have a way to contact you to
              follow-up with any additional questions.{" "}
            </p>{" "}
            <div className="mb-3">
              {" "}
              <label className="form-label">Your first name:</label>{" "}
              <input
                type="text"
                className="form-control"
                value={data.firstName || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only letters and spaces
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    onChange({ ...data, firstName: value });
                  }
                }}
              />{" "}
            </div>{" "}
            <div className="mb-3">
              {" "}
              <label className="form-label">Your last name:</label>{" "}
              <input
                type="text"
                className="form-control"
                value={data.lastName || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only letters and spaces
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    onChange({ ...data, lastName: value });
                  }
                }}
              />{" "}
            </div>{" "}
            <div className="mb-3">
              <label className="form-label">Email address:</label>

              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                value={data.email || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  onChange({
                    ...data,
                    email: value,
                  });

                  // Email Validation
                  if (
                    value.trim() !== "" &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ) {
                    setEmailError("Please enter a valid email address");
                  } else {
                    setEmailError("");
                  }
                }}
              />

              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>{" "}
            <div className="mb-3">
              {" "}
              <label className="form-label">Phone number:</label>{" "}
              <input
                type="tel"
                className="form-control"
                value={data.phone || ""}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  let formatted = "";
                  if (digits.length > 0) formatted = "(" + digits.slice(0, 3);
                  if (digits.length >= 4) formatted += ") " + digits.slice(3, 6);
                  if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);
                  onChange({ ...data, phone: formatted });
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default SectionFive;
