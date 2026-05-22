import React from "react";

interface AlertNavigationProps {
  title?: string;
  description: React.ReactNode[];
  links?: { label: React.ReactNode; url?: string }[];
  primaryText: string;
  secondaryText: string;
  onPrimary: () => void;
  onSecondary: () => void;
  descriptionBelow?: boolean;
}

const AlertNavigation: React.FC<AlertNavigationProps> = ({
  title,
  description,
  links,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
  descriptionBelow = false,
}) => {
  const descriptionBlock = description.map((text, i) => (
    <p key={i}>{text}</p>
  ));

  const linksBlock = links && (
    <ul>
      {links.map((link, i) => (
        <li key={i}>{link.label}</li>
      ))}
    </ul>
  );

  return (
    <div className="container mt-4">
      {title && (
        <h4
          className="fw-bold mb-4"
          style={{
            borderBottom: "2px solid #d4a017",
            display: "inline-block",
            paddingBottom: "4px",
          }}
        >
          {title}
        </h4>
      )}
      <div className="card p-4 shadow-sm">
        {!descriptionBelow && descriptionBlock}
        {linksBlock}
        {descriptionBelow && descriptionBlock}

        {/* Buttons */}
        {/* Buttons */}
        <div className="mt-4">
          <button className="btn btn-color w-100 mb-2" onClick={onPrimary}>
            {primaryText}
          </button>

          {secondaryText && (
            <button
              className="btn btn-outline-secondary w-100"
              onClick={onSecondary}
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertNavigation;
