import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Modal from "../../../shared/modal/modal"; // ✅ import your modal

export interface SectionOneRef {
  validate: () => boolean;
}

interface SectionOneProps {
  data: {
    licensePlate: string;
    vehicleOption: string;
    vehicleType: string;
    vehicleColor: string;
    vehicleMake: string;
    vehicleModel: string;
  };
  onChange: (data: any) => void;
}

const SectionOne = forwardRef<SectionOneRef, SectionOneProps>(
  ({ data, onChange }, ref) => {
    const [errors, setErrors] = useState<any>({});
    const [showFullForm, setShowFullForm] = useState(false);

    // ✅ Modal state (LOCAL)
    const [showModal, setShowModal] = useState(false);
    const [disablePlateInput, setDisablePlateInput] = useState(false);

    const {
      licensePlate,
      vehicleOption,
      vehicleType,
      vehicleColor,
      vehicleMake,
      vehicleModel,
    } = data;

    // ✅ Detect return navigation (DO NOT hide form)
    useEffect(() => {
      if (
        licensePlate ||
        vehicleOption ||
        vehicleType ||
        vehicleColor ||
        vehicleMake ||
        vehicleModel
      ) {
        setShowFullForm(true);
      }
    }, []);

    const validateLicensePlate = (plate: string) => {
      const regex = /^[A-Z0-9]{1,7}$/;
      return regex.test(plate);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      onChange({
        ...data,
        vehicleOption: value,
        licensePlate: "",
      });

      setErrors((prev: any) => ({
        ...prev,
        licensePlate: "",
      }));

      setShowModal(true);

      if (!showFullForm) {
        setShowFullForm(true);
      }
    };

    useImperativeHandle(ref, () => ({
      validate() {
        let newErrors: any = {};

        if (!vehicleType) newErrors.vehicleType = "Vehicle type is required";
        if (!vehicleColor) newErrors.vehicleColor = "Vehicle color is required";
        if (!vehicleMake) newErrors.vehicleMake = "Vehicle make is required";

        if (!vehicleOption) {
          if (!licensePlate) {
            newErrors.licensePlate = "License plate is required";
          } else if (!validateLicensePlate(licensePlate)) {
            newErrors.licensePlate = "Invalid format (1–7 alphanumeric)";
          }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    return (
      <>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          message="Providing a License plate number help us locate the vehicle faster. We prioritize investigating reports that include all requested information including full LPN and a photo"
          primaryText="Provide a license plate number"
          secondaryText="Continue without a license plate number"
          onPrimary={() => {
            onChange({
              ...data,
              vehicleOption: "",
            });
            setDisablePlateInput(false);
            setShowModal(false);
          }}
          onSecondary={() => {
            setDisablePlateInput(true);
            setShowModal(false);
          }}
        />

        {/* License Plate */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Click the camera icon below to scan or upload a photo of the vehicle
            license plate: <span className="text-danger">*</span>
          </label>

          <p className="text-muted mt-2" style={{ fontSize: "13px" }}>
            Please make sure the license plate and outline of the vehicle's
            shape are visible.
          </p>

          <div className="camera-box text-center">
            <input
              type="file"
              accept="image/*"
              id="upload"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  console.log("Selected file:", e.target.files[0]);

                  if (!showFullForm) {
                    setShowFullForm(true);
                  }
                }
              }}
            />

            <label htmlFor="upload" className="camera-icon">
              📷
            </label>
          </div>

          <p className="text-muted mt-2" style={{ fontSize: "13px" }}>
            Or type in the license plate number. Do not include special
            characters
          </p>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter license plate"
            value={licensePlate}
            disabled={disablePlateInput}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();

              onChange({
                ...data,
                licensePlate: value,
              });

              setErrors((prev: any) => ({
                ...prev,
                licensePlate: "",
              }));

              if (!showFullForm) {
                setShowFullForm(true);
              }
            }}
          />
          {errors.licensePlate && (
            <p className="text-danger">{errors.licensePlate}</p>
          )}
        </div>

        {/* Radio Options */}
        <div className="mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="noPlates"
              value="no-plates"
              checked={vehicleOption === "no-plates"}
              onChange={handleRadioChange}
            />
            <label htmlFor="noPlates" className="form-check-label">
              No license plates
            </label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="covered"
              value="covered"
              checked={vehicleOption === "covered"}
              onChange={handleRadioChange}
            />
            <label htmlFor="covered" className="form-check-label">
              License plate covered
            </label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="dontHave"
              value="dont-have"
              checked={vehicleOption === "dont-have"}
              onChange={handleRadioChange}
            />
            <label htmlFor="dontHave" className="form-check-label">
              I don't have the license plate
            </label>
          </div>
        </div>

        {/* Remaining fields */}
        {showFullForm && (
          <>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Vehicle Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={vehicleType}
                onChange={(e) => {
                  onChange({ ...data, vehicleType: e.target.value });

                  setErrors((prev: any) => ({
                    ...prev,
                    vehicleType: "",
                  }));
                }}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="truck">Truck</option>
              </select>
              {errors.vehicleType && (
                <p className="text-danger">{errors.vehicleType}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Vehicle Color <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={vehicleColor}
                onChange={(e) => {
                  onChange({ ...data, vehicleColor: e.target.value });

                  setErrors((prev: any) => ({
                    ...prev,
                    vehicleColor: "",
                  }));
                }}
              >
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="black">Black</option>
              </select>
              {errors.vehicleColor && (
                <p className="text-danger">{errors.vehicleColor}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Vehicle Make <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={vehicleMake}
                onChange={(e) => {
                  onChange({ ...data, vehicleMake: e.target.value });

                  setErrors((prev: any) => ({
                    ...prev,
                    vehicleMake: "",
                  }));
                }}
              >
                <option value="">Select Make</option>
                <option value="toyota">Toyota</option>
                <option value="ford">Ford</option>
              </select>
              {errors.vehicleMake && (
                <p className="text-danger">{errors.vehicleMake}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Vehicle Model</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter vehicle model"
                value={vehicleModel}
                onChange={(e) =>
                  onChange({ ...data, vehicleModel: e.target.value })
                }
              />
            </div>
          </>
        )}
      </>
    );
  },
);

export default SectionOne;
