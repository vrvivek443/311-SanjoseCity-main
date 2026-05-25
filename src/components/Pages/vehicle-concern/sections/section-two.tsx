import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "../../../shared/modal/modal";
import FileUpload from "../../../shared/file-upload/file-upload";

export interface SectionTwoRef {
  validate: () => boolean;
}

interface SectionTwoProps {
  data: {
    images: File[];
    noPhoto: boolean;
  };
  onChange: (data: any) => void;
}

const SectionTwo = forwardRef<SectionTwoRef, SectionTwoProps>(
  ({ data, onChange }, ref) => {
    const [error, setError] = useState("");
    const { images = [], noPhoto } = data;
    const [showModal, setShowModal] = useState(false);

    useImperativeHandle(ref, () => ({
      validate() {
        if ((!images || images.length === 0) && !noPhoto) {
          setError("Please upload a photo or select 'I don't have a photo'");
          return false;
        }
        setError("");
        return true;
      },
    }));

    const hasImages = images && images.length > 0;

    return (
      <>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          message={`We prioritize investigating reports that include a photo of the vehicle.\n\nIncluding a photo with your report helps our officers locate the vehicle faster and easier thus helping expedite the investigation`}
          primaryText="Upload Photo"
          secondaryText="I understand, continue"
          onPrimary={() => {
            onChange({ images: [], noPhoto: false });
            setShowModal(false);
          }}
          onSecondary={() => setShowModal(false)}
        />

        <div className="container mt-4">
          <FileUpload
            files={images}
            onChange={(files) =>
              onChange({ ...data, images: files, noPhoto: files.length > 0 ? false : noPhoto })
            }
            label="Upload / take vehicle photo"
            description="Photo should show the vehicle condition being reported"
          />

          <div className="form-check mt-2">
            <input
              type="radio"
              className="form-check-input"
              checked={noPhoto}
              disabled={hasImages}
              onChange={() => {
                onChange({ images: [], noPhoto: true });
                setError("");
                setShowModal(true);
              }}
            />
            <label className="form-check-label">I don't have a photo</label>
          </div>

          {error && <p className="text-danger mt-1">{error}</p>}
        </div>
      </>
    );
  },
);

export default SectionTwo;
