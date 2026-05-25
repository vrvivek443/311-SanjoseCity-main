import { forwardRef, useImperativeHandle } from "react";
import FileUpload from "../../../shared/file-upload/file-upload";

export interface SectionFiveRef {
  validate: () => boolean;
}

export interface SectionFiveData {
  images: File[];
}

interface SectionFiveProps {
  data: SectionFiveData;
  onChange: (data: SectionFiveData) => void;
}

const SectionFive = forwardRef<SectionFiveRef, SectionFiveProps>(
  ({ data, onChange }, ref) => {
    useImperativeHandle(ref, () => ({
      validate() {
        return true;
      },
    }));

    return (
      <div>
        <p className="fw-semibold mb-3">
          Please provide a photo of the concern if possible and safe. Providing
          this may help staff resolve the concern faster, but will not
          prioritize the assessment.
        </p>

        <FileUpload
          files={data.images}
          onChange={(files) => onChange({ images: files })}
        />
      </div>
    );
  }
);

export default SectionFive;
