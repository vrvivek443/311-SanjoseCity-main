import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Importing images and items
import vehicle from "../assets/logo-Images/Vehicle-Concern.png";
import graffiti from "../assets/logo-Images/graffiti.png";
import dump from "../assets/logo-Images/illegal-dumping.png";
import pothole from "../assets/logo-Images/pothole.png";
import light from "../assets/logo-Images/streetlight-outage.png";
import other from "../assets/logo-Images/other-issues.png";
import fire from "../assets/logo-Images/Illegal-Fireworks.png";
import wifi from "../assets/logo-Images/Community-wifi.png";
import sewer from "../assets/logo-Images/SewerOldIssues.png";
import payutility from "../assets/logo-Images/PUB60x60.png";
import rentregistry from "../assets/logo-Images/RentRegistry.png";
import eviction from "../assets/logo-Images/eviction-prevention.png";
import affordablehousing from "../assets/logo-Images/affordable-housing.png";
import streetsweeping from "../assets/logo-Images/Street Sweeping 1.svg";
import junkpickup from "../assets/logo-Images/bulk-item-pickup.png";
import containerissue from "../assets/logo-Images/cart-issues.png";
import missedcollection from "../assets/logo-Images/missed-collection.png";
import servicenewhomes from "../assets/logo-Images/create-new-services.png";
import mycollectionscheduele from "../assets/logo-Images/collection-schedule.png";
import Modal from "../components/shared/modal/modal";
import LoginAlert from "./shared/login-alert/login-alert";

// FAQ items
const faqItems = [
  {
    label: "Need to contact the City?",
    description:
      "Our friendly team is available 24/7 to address your concerns. Feel free to call us with any questions.",
  },
  {
    label: "Service Expectations",
    description:
      "Staff reviews all 311 reports but only abandoned vehicles that pose a health, safety, or extreme blight concern are being investigated.",
  },
  {
    label: "Send Feedback",
    description:
      "For issues related to service delivery, email customerservice@sanjoseca.gov. For technical issues, review solutions in the San Jose 311 Website or Mobile App.",
  },
  {
    label: "Troubleshooting 311 Technical Problems",
    description:
      "What to do if you have login issues or are unable to submit your request.",
  },
  {
    label: "Accessibility Statement for San Jose 311",
    description:
      "San Jose 311 is committed to ensuring accessibility for people with disabilities. Our goal is to keep the city well maintained.",
  },
];

// Report items WITH ROUTES
const reportItems = [
  { img: vehicle, label: "Vehicle Concerns", path: "/vehicle-concern" },
  { img: graffiti, label: "Graffiti", path: "/graffiti" },
  { img: dump, label: "Illegal Dumping", path: "/illegal-dumping" },
  { img: pothole, label: "Pothole", path: "/pothole" },
  { img: light, label: "Streetlight Outage", path: "/streetlight-outage" },
  { img: other, label: "Other Issues", path: "/other-issues" },
  { img: fire, label: "Illegal Fireworks", path: "/illegal-fireworks" },
  { img: wifi, label: "Community WiFi", path: "/community-wifi" },
  { img: sewer, label: "Sewer / Water Issues", path: "/sewer-issues" },
];

const lookingitems = [
  {
    img: payutility,
    label: "Pay Utility Bills",
    path: "/pay-utility-bills",
  },
  {
    img: rentregistry,
    label: "Rent Registry Tenant Portal",
    path: "https://sjhousingloans.my.site.com/s/tenantportalpage?language=en_US",
  },
  { img: eviction, label: "Eviction Prevention", path: "/eviction-prevention-warning" },
  { img: affordablehousing, label: "Affordable Housing", path: "https://housing.sanjoseca.gov/" },
  { img: streetsweeping, label: "Street Sweeping", path: "/street-sweeping" },
];

const recyclingitems = [
  { img: junkpickup, label: "Junk Pickup", path: "/junk-pickup" },
  { img: containerissue, label: "Container Issues", path: "/container-issues" },
  { img: missedcollection, label: "Missed Collection", path: "/missed-collections" },
  { img: servicenewhomes, label: "Services for New Homes", path: "/services-new-homes" },
  { img: mycollectionscheduele, label: "My Collection Schedule", path: "/collection-schedule" },
];

const Home = () => {
  const { login } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loginAlertTitle, setLoginAlertTitle] = useState("");
  const [pendingPath, setPendingPath] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const navigate = useNavigate();

  const openLoginAlert = (title: string, path: string) => {
    setLoginAlertTitle(title);
    setPendingPath(path);
    setLoginError("");
    setShowLoginAlert(true);
  };

  const handleVehicleConcernContinue = () => {
    setShowModal(false);
    if (localStorage.getItem("sj311_session")) {
      navigate("/vehicle-concern");
    } else {
      openLoginAlert("Vehicle Concerns", "/vehicle-concern");
    }
  };

  const handleLoginAlertLogin = (email: string, password: string) => {
    setIsLoginSubmitting(true);
    setLoginError("");
    const result = login(email, password);
    setIsLoginSubmitting(false);
    if (result.success) {
      setShowLoginAlert(false);
      navigate(pendingPath);
    } else {
      setLoginError(result.error || "Login failed. Please try again.");
    }
  };

  const handleLoginAlertGuest = () => {
    setShowLoginAlert(false);
    navigate(pendingPath);
  };

  // Filter items based on search query
  const filteredReportItems = reportItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (showLoginAlert) {
    return (
      <div className="container mt-4">
        <LoginAlert
          title={loginAlertTitle}
          onLogin={handleLoginAlertLogin}
          onGuestSubmit={handleLoginAlertGuest}
          isSubmitting={isLoginSubmitting}
          error={loginError}
        />
      </div>
    );
  }

  return (
    <div>
      {/* What would you like to report section */}
      <div className="dashboard">
        <h3 className="section-title">What would you like to report?</h3>
        <div className="tile-grid">
          {filteredReportItems.map((item, index) => (
            <div
              className="tile"
              key={index}
              onClick={() => {
                if (item.path === "/vehicle-concern") {
                  setModalData({
                    message:
                      "To report a vehicle related emergency or to report a crime/ illegal activity in progress call 911 or 408-277-8911.",
                    primaryText: "I am not reporting an emergency, continue",
                    secondaryText: "Home",
                    onPrimary: handleVehicleConcernContinue,
                    onSecondary: () => {
                      setShowModal(false);
                      navigate("/");
                    },
                  });

                  setShowModal(true);
                } else if (item.path === "/streetlight-outage") {
                  navigate("/streetlight-warning");
                } else if (item.path === "/community-wifi") {
                  navigate("/community-wifi-warning");
                } else {
                  item.path && navigate(item.path);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="tile-icon">
                <img src={item.img} alt={item.label} />
              </div>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={modalData?.message || ""}
        primaryText={modalData?.primaryText || ""}
        secondaryText={modalData?.secondaryText || ""}
        onPrimary={modalData?.onPrimary || (() => {})}
        onSecondary={modalData?.onSecondary || (() => {})}
      />

      {/* Looking for section */}
      {/* Looking for section */}
      <div className="dashboard">
        <h3 className="section-title">Looking for</h3>

        <div className="tile-grid">
          {lookingitems.map((item, index) => (
            <div
              className="tile"
              key={index}
              onClick={() => {
                if (item.path) {
                  if (item.path.startsWith("http")) {
                    window.open(item.path, "_blank");
                  } else {
                    navigate(item.path);
                  }
                }
              }}
              style={{ cursor: item.path ? "pointer" : "default" }}
            >
              <div className="tile-icon">
                <img src={item.img} alt={item.label} />
              </div>

              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Residential Garbage & Recycling Services section */}
      <div className="dashboard">
        <h3 className="section-title">
          Residential Garbage & Recycling Services
        </h3>
        <div className="tile-grid">
          {recyclingitems.map((item, index) => (
            <div
              className="tile"
              key={index}
              onClick={() => item.path && navigate(item.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="tile-icon">
                <img src={item.img} alt={item.label} />
              </div>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="dashboard">
        <h3 className="section-title">Find Answers about City Services</h3>
        <div className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="e.g. what's illegal dumping?"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="show-all-btn">Show All</button>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div className="faq-item" key={index}>
              <h4 className="faq-label">{item.label}</h4>
              <p className="faq-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
