import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { SectionOneData } from "./sections-one";
import type { SectionTwoData } from "./sections-two";
import type { SectionThreeData } from "./sections-three";

interface EditAllProps {
  sectionOne: SectionOneData;
  sectionTwo: SectionTwoData;
  sectionThree: SectionThreeData;
  onSectionOneChange: (d: SectionOneData) => void;
  onSectionTwoChange: (d: SectionTwoData) => void;
  onSectionThreeChange: (d: SectionThreeData) => void;
  onSave: () => void;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <p className="fw-bold mb-3" style={{ textDecoration: "underline" }}>{title}</p>
);

const EditAll: React.FC<EditAllProps> = ({
  sectionOne, sectionTwo, sectionThree,
  onSectionOneChange, onSectionTwoChange, onSectionThreeChange,
  onSave,
}) => {
  const [errors, setErrors] = useState<any>({});
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_SIZE = 10 * 1024 * 1024;
  const mapContainerStyle = { width: "100%", height: "300px" };

  useEffect(() => {
    const urls = sectionTwo.files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [sectionTwo.files]);

  const set1 = (field: keyof SectionOneData, value: any) => {
    onSectionOneChange({ ...sectionOne, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const set3 = (field: keyof SectionThreeData, value: any) => {
    onSectionThreeChange({ ...sectionThree, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid: File[] = [];
    let typeError = false;
    let sizeError = false;
    Array.from(incoming).forEach((file) => {
      if (!file.type.startsWith("image/")) { typeError = true; return; }
      if (file.size > MAX_SIZE) { sizeError = true; return; }
      valid.push(file);
    });
    if (typeError) { setErrors((prev: any) => ({ ...prev, files: "Only image files (PNG, JPG, JPEG) are allowed" })); return; }
    if (sizeError) { setErrors((prev: any) => ({ ...prev, files: "Each file must be less than 10 MB" })); return; }
    if (valid.length > 0) {
      onSectionTwoChange({ ...sectionTwo, files: [...sectionTwo.files, ...valid] });
      setErrors((prev: any) => ({ ...prev, files: "" }));
    }
  };

  const removeFile = (index: number) => {
    onSectionTwoChange({ ...sectionTwo, files: sectionTwo.files.filter((_, i) => i !== index) });
  };

  const validate = () => {
    const e: any = {};
    let valid = true;

    if (!sectionOne.incidentDate) { e.incidentDate = "Please select the incident date"; valid = false; }
    if (!sectionOne.incidentTime) { e.incidentTime = "Please select the incident time"; valid = false; }
    if (!sectionOne.incidentLocation) { e.incidentLocation = "Please select the incident location"; valid = false; }
    if (!sectionOne.address) { e.address = "Please provide a location"; valid = false; }
    if (!sectionTwo.knowWho) { e.knowWho = "Please select an option"; valid = false; }
    if (sectionTwo.knowWho === "yes" && !sectionTwo.name1.trim()) { e.name1 = "Please provide the name of the person"; valid = false; }
    if (!sectionTwo.hasEvidence) { e.hasEvidence = "Please select an option"; valid = false; }
    if (sectionTwo.hasEvidence === "yes" && sectionTwo.files.length === 0) { e.files = "Please upload at least one photo"; valid = false; }
    if (!sectionThree.name.trim()) { e.name = "Please enter your name"; valid = false; }
    if (!sectionThree.fullAddress.trim()) { e.fullAddress = "Please enter your full address"; valid = false; }
    if (!sectionThree.phone.trim()) {
      e.phone = "Please enter your phone number"; valid = false;
    } else if (sectionThree.phone.replace(/\D/g, "").length !== 10) {
      e.phone = "Please enter a valid 10-digit phone number"; valid = false;
    }
    if (!sectionThree.email.trim()) {
      e.email = "Please enter your email address"; valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sectionThree.email.trim())) {
      e.email = "Please enter a valid email address"; valid = false;
    }
    if (!sectionThree.ack1) { e.ack1 = "You must acknowledge this statement"; valid = false; }
    if (!sectionThree.ack2) { e.ack2 = "You must acknowledge this statement"; valid = false; }
    if (!sectionThree.ack3) { e.ack3 = "You must acknowledge this statement"; valid = false; }

    setErrors(e);
    return valid;
  };

  return (
    <div>
      {/* ── Section 1 ── */}
      <SectionHeader title="Incident Details" />

      <div className="mb-3">
        <label className="fw-bold">Date of fireworks incident <span className="text-danger">*</span></label>
        <DatePicker
          selected={sectionOne.incidentDate ? new Date(sectionOne.incidentDate) : null}
          onChange={(date: Date | null) => {
            if (date) set1("incidentDate", date.toISOString());
          }}
          dateFormat="MM/dd/yyyy"
          placeholderText="mm/dd/yyyy"
          className="form-control"
          wrapperClassName="w-100"
        />
        {errors.incidentDate && <p className="text-danger mb-1">{errors.incidentDate}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-bold">Time of fireworks incident <span className="text-danger">*</span></label>
        <select className="form-control" value={sectionOne.incidentTime}
          onChange={(e) => set1("incidentTime", e.target.value)}>
          <option value="">Select an option</option>
          {["Morning","Afternoon","Evening","Night"].map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.incidentTime && <p className="text-danger mb-1">{errors.incidentTime}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-bold">Location of fireworks incident <span className="text-danger">*</span></label>
        <select className="form-control" value={sectionOne.incidentLocation}
          onChange={(e) => set1("incidentLocation", e.target.value)}>
          <option value="">Select an option</option>
          {["Front Yard","Back Yard","Street","Park","Parking Lot","Other"].map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.incidentLocation && <p className="text-danger mb-1">{errors.incidentLocation}</p>}
      </div>

      <div className="mb-3">
        <label className="fw-bold">
          Please provide the address where the use, sale, or possession of fireworks occurred (Only San José addresses are enforceable)
          <span className="text-danger">*</span>
        </label>
        <input type="text" className="form-control mb-2" placeholder="Enter address"
          value={sectionOne.address}
          onChange={(e) => set1("address", e.target.value)} />
        {errors.address && <p className="text-danger">{errors.address}</p>}
        <button className="next-btn mb-3 search-btn">Search (Optional) 🔍</button>
      </div>

      <div className="mb-3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={sectionOne.position} zoom={13}>
            <Marker position={sectionOne.position} draggable
              onDragEnd={(e: any) => onSectionOneChange({
                ...sectionOne, position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
              })} />
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="mb-3">
        <label className="fw-semibold">Briefly describe the incident. (what you observed)</label>
        <textarea className="form-control" rows={3} placeholder="Add details here"
          value={sectionOne.additionalInfo}
          onChange={(e) => {
            if (e.target.value.length <= 4000) set1("additionalInfo", e.target.value);
          }} />
        <p className={`mt-1 ${sectionOne.additionalInfo.length === 4000 ? "text-danger" : "text-muted"}`}
          style={{ fontSize: "12px" }}>
          {sectionOne.additionalInfo.length}/4000 characters
        </p>
      </div>

      <hr className="my-4" />

      {/* ── Section 2 ── */}
      <SectionHeader title="Evidence & Witnesses" />

      <div className="mb-4">
        <label className="fw-bold mb-2 d-block">
          Do you know who used, sold, or possessed the illegal fireworks?<span className="text-danger">*</span>
        </label>
        {["yes", "no"].map((val) => (
          <div className="form-check" key={val}>
            <input type="radio" className="form-check-input" name="editKnowWho"
              checked={sectionTwo.knowWho === val}
              onChange={() => {
                onSectionTwoChange({ ...sectionTwo, knowWho: val, name1: "", name2: "" });
                setErrors((prev: any) => ({ ...prev, knowWho: "" }));
              }} />
            <label className="form-check-label">{val.charAt(0).toUpperCase() + val.slice(1)}</label>
          </div>
        ))}
        {errors.knowWho && <p className="text-danger mb-1">{errors.knowWho}</p>}
      </div>

      {sectionTwo.knowWho === "yes" && (
        <div className="mb-4">
          <label className="fw-bold mb-2 d-block">
            Please provide the name of the person(s)<span className="text-danger">*</span>
          </label>
          <input type="text" className="form-control mb-1" maxLength={50}
            value={sectionTwo.name1}
            onChange={(e) => {
              onSectionTwoChange({ ...sectionTwo, name1: e.target.value });
              setErrors((prev: any) => ({ ...prev, name1: "" }));
            }} />
          <small className="text-muted d-block mb-2">50 characters allowed</small>
          {errors.name1 && <p className="text-danger mb-1">{errors.name1}</p>}
          <input type="text" className="form-control mb-1" maxLength={50}
            value={sectionTwo.name2}
            onChange={(e) => onSectionTwoChange({ ...sectionTwo, name2: e.target.value })} />
          <small className="text-muted d-block">50 characters allowed</small>
        </div>
      )}

      <div className="mb-4">
        <label className="fw-bold mb-2 d-block">
          Do you have a photo or video evidence of the incident?<span className="text-danger">*</span>
        </label>
        {["yes", "no"].map((val) => (
          <div className="form-check" key={val}>
            <input type="radio" className="form-check-input" name="editHasEvidence"
              checked={sectionTwo.hasEvidence === val}
              onChange={() => {
                onSectionTwoChange({ ...sectionTwo, hasEvidence: val, files: [] });
                setErrors((prev: any) => ({ ...prev, hasEvidence: "", files: "" }));
              }} />
            <label className="form-check-label">{val.charAt(0).toUpperCase() + val.slice(1)}</label>
          </div>
        ))}
        {errors.hasEvidence && <p className="text-danger mb-1">{errors.hasEvidence}</p>}
      </div>

      {sectionTwo.hasEvidence === "yes" && (
        <div className="mb-4">
          <label className="fw-bold mb-1 d-block">Upload photo <span className="text-danger">*</span></label>
          {previews.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mb-3">
              {previews.map((src, i) => (
                <div key={i} style={{ position: "relative", width: "80px", height: "80px" }}>
                  <img src={src} alt="preview" width={80} height={80} style={{ objectFit: "cover", borderRadius: "6px" }} />
                  <button type="button" className="new-button" onClick={() => removeFile(i)}>×</button>
                </div>
              ))}
            </div>
          )}
          <div className="border rounded p-4 text-center mb-1"
            style={{ background: isDragging ? "#e8f4f8" : "#f0f7fa", borderColor: "#b0d4e0", cursor: "pointer" }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}>
            <div style={{ fontSize: "32px", color: "#198bb3" }}>📷</div>
            <p className="fw-bold mb-1">Drag file here or</p>
            <span style={{ color: "#198bb3", textDecoration: "underline", cursor: "pointer" }}>choose from folder</span>
            <input ref={fileInputRef} type="file" className="d-none" multiple accept="image/*"
              onChange={(e) => addFiles(e.target.files)} />
          </div>
          <p className="text-end text-muted mb-1" style={{ fontSize: "13px" }}>Max 10 MB attachments</p>
          {errors.files && <p className="text-danger mb-1">{errors.files}</p>}
        </div>
      )}

      <hr className="my-4" />

      {/* ── Section 3 ── */}
      <SectionHeader title="Your Contact Information" />

      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">Your name <span className="text-danger">*</span></label>
        <input type="text" className="form-control" maxLength={30} value={sectionThree.name}
          onChange={(e) => set3("name", e.target.value)} />
        <small className="text-muted">30 characters allowed</small>
        {errors.name && <p className="text-danger mb-0">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">Your full address <span className="text-danger">*</span></label>
        <input type="text" className="form-control" maxLength={100} value={sectionThree.fullAddress}
          onChange={(e) => set3("fullAddress", e.target.value)} />
        <small className="text-muted">100 characters allowed</small>
        {errors.fullAddress && <p className="text-danger mb-0">{errors.fullAddress}</p>}
      </div>

      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">Your phone number <span className="text-danger">*</span></label>
        <input
          type="tel"
          className="form-control"
          placeholder="(111) 111-1111"
          value={sectionThree.phone}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            let formatted = "";
            if (digits.length > 0) formatted = "(" + digits.slice(0, 3);
            if (digits.length >= 4) formatted += ") " + digits.slice(3, 6);
            if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);
            set3("phone", formatted);
          }}
        />
        {errors.phone && <p className="text-danger mb-0">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="fw-bold mb-1 d-block">Your email address <span className="text-danger">*</span></label>
        <input type="email" className="form-control" value={sectionThree.email}
          onChange={(e) => set3("email", e.target.value)} />
        {errors.email && <p className="text-danger mb-0">{errors.email}</p>}
      </div>

      <hr />

      <div className="mb-4">
        <p className="fw-bold mb-3">Acknowledgment:</p>

        {[
          { field: "ack1" as const, text: "I understand my report will not result in an immediate emergency response (police/fire). If this is an emergency please call 911." },
          { field: "ack2" as const, text: "I understand my information will remain confidential, but may be released if required by law." },
          { field: "ack3" as const, text: "If enforcement action is taken (citation, etc.), I understand I may be asked to testify about the content of my report." },
        ].map(({ field, text }) => (
          <div className="mb-3" key={field}>
            <div className="form-check align-items-start d-flex gap-2">
              <input type="checkbox" className="form-check-input mt-1 flex-shrink-0"
                checked={sectionThree[field]}
                onChange={(e) => {
                  set3(field, e.target.checked);
                }} />
              <label className="form-check-label">{text} <span className="text-danger">*</span></label>
            </div>
            {errors[field] && <p className="text-danger mb-0 ms-4">{errors[field]}</p>}
          </div>
        ))}
      </div>

      <button className="next-btn w-100" onClick={() => { if (validate()) onSave(); }}>
        Submit
      </button>
    </div>
  );
};

export default EditAll;
