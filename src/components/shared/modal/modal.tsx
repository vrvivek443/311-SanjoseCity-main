import React from "react";
import "./modal.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  message,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
  children,
  size,
}) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal fade show d-block modal-custom" tabIndex={-1}>
        <div
          className={`modal-dialog modal-dialog-centered ${
            size === "sm" ? "modal-sm" : size === "lg" ? "modal-lg" : ""
          }`}
        >
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body text-center">
              {/* ✅ If custom UI provided → render it */}
              {children ? children : <p>{message}</p>}
            </div>

            {/* Footer (only for default mode) */}
            {!children && (
              <div className="modal-footer flex-column border-0">
                <button className="btn w-100 btn-color" onClick={onPrimary}>
                  {primaryText}
                </button>

                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={onSecondary}
                >
                  {secondaryText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
