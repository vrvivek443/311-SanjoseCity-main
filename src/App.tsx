import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

import Home from "./components/Home";
import OtherReports from "./components/other-reports";
import VehicleConcerns from "./components/Pages/vehicle-concern/vehicle-concerns";
import Graffiti from "./components/Pages/graffiti/graffiti";
import TrackReport from "./components/Pages/graffiti/Track-Report/track-report";
import IllegalDumping from "./components/Pages/illegal-dumping/illegal-dumping";
import Potholes from "./components/Pages/potholes/potholes";
import StreetlightOutage from "./components/Pages/streetlight-outage/streetlight-outage";
import OtherIssues from "./components/Pages/other-issues/other-issues";
import IllegalFirework from "./components/Pages/illegal-firework/illegal-firework";
import CommunityWifi from "./components/Pages/community-wifi/community-wifi";
import SewageIssues from "./components/Pages/sewer-issues/sewer-issues";
import StreetlightWarning from "./components/Pages/streetlight-outage/streelight-warning-alert";
import CommunityWifiWarning from "./components/Pages/community-wifi/community-wifi-warning";
import PayUtilityBills from "./components/Pages/Pay-Utility-Bills/pay-utility-bills";
import StreetSweeping from "./components/Pages/street-sweeping/street-sweeping";
import EvictionPreventionWarning from "./components/Pages/eviction-prevention/eviction-prevention-warning";
import EvictionPrevention from "./components/Pages/eviction-prevention/eviction-prevention";
import JunkPickup from "./components/Pages/junk-pickup/junk-pickup";
import ContainerIssues from "./components/Pages/container-issues/container-issues";
import MissedCollections from "./components/Pages/missed-collections/missed-collections";
import ServicesNewHomes from "./components/Pages/services-new-homes/services-new-homes";
import CollectionSchedule from "./components/Pages/collection-scheduele/collection-scheduele";
import Login from "./components/Pages/auth/login";
import Signup from "./components/Pages/auth/signup";

function App() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="wrapper">

      {/* Sidebar */}
      <div className="sidebar-wrapper" data-simplebar="true">

        {/* Header */}
        <div className="sidebar-header">
          <div>
            <img
              src="src/assets/311-Logo.png"
              className="logo-icon"
              alt="logo icon"
            />
          </div>

          <div>
            <h4 className="logo-text">311-San-Jose</h4>
          </div>

          <div className="toggle-icon ms-auto">
            <i className="bx bx-arrow-back"></i>
          </div>
        </div>

        {/* Menu */}
        <ul className="metismenu" id="menu">

          {/* ✅ Home */}
          <li>
            <a onClick={() => navigate("/")}>
              <div className="parent-icon">
                <i className="bx bx-home-alt"></i>
              </div>
              <div className="menu-title">Home</div>
            </a>
          </li>

          {/* ✅ Other Reports */}
          <li>
            <a onClick={() => navigate("/other-reports")}>
              <div className="parent-icon">
                <i className="bx bx-category"></i>
              </div>
              <div className="menu-title">Other reports</div>
            </a>
          </li>

          {/* FAQ (still static for now) */}
          <li>
            <a>
              <div className="parent-icon">
                <i className="bx bx-help-circle"></i>
              </div>
              <div className="menu-title">FAQ</div>
            </a>
          </li>

          {/* Reports Dashboard */}
          <li>
            <a className="has-arrow">
              <div className="parent-icon">
                <i className="bx bx-chart"></i>
              </div>
              <div className="menu-title">Reports Dashboard</div>
            </a>

            <ul>
              <li>
                <a>
                  <i className="bx bx-radio-circle"></i>All Services
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-radio-circle"></i>Illegal Fireworks
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-radio-circle"></i>Vehicle Concerns
                </a>
              </li>
            </ul>
          </li>

          {/* Pay Bills */}
          <li>
            <a href="https://www.sanjoseca.gov/residents/payments" target="_blank" rel="noopener noreferrer">
              <div className="parent-icon">
                <i className="bx bx-money"></i>
              </div>
              <div className="menu-title">Pay Bills</div>
            </a>
          </li>

        </ul>

        {/* Footer Buttons */}
        <div className="sidebar-footer">
          {user ? (
            <>
              <div className="sidebar-user-info">
                <i className="bx bx-user-circle sidebar-user-icon"></i>
                <span className="sidebar-user-name btn-text">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button
                className="btn login-btn btn-cover"
                onClick={() => { logout(); navigate("/"); }}
              >
                <i className="bx bx-log-out"></i>
                <span className="btn-text">Log out</span>
              </button>
            </>
          ) : (
            <>
              <button className="btn login-btn btn-cover" onClick={() => navigate("/login")}>
                <i className="bx bx-log-in"></i>
                <span className="btn-text">Login</span>
              </button>
              <button className="btn signup-btn" onClick={() => navigate("/signup")}>
                <i className="bx bx-user-plus"></i>
                <span className="btn-text">Sign Up</span>
              </button>
            </>
          )}
        </div>

      </div>

      {/* Page Content */}
      <div className="page-wrapper">
        <div className="page-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other-reports" element={<OtherReports />} />
            <Route path="/vehicle-concern" element={<VehicleConcerns />} />
            <Route path="/graffiti" element={<Graffiti />} />
            <Route path="/track-report" element={<TrackReport />}/>
            <Route path="/illegal-dumping" element={<IllegalDumping />} />
            <Route path="/pothole" element={<Potholes />} />
            <Route path="/streetlight-outage" element={<StreetlightOutage />} />
            <Route path="/streetlight-warning" element={<StreetlightWarning />} />
            <Route path="/other-issues" element={<OtherIssues />} />
            <Route path="/illegal-fireworks" element={<IllegalFirework />} />
            <Route path="/community-wifi" element={<CommunityWifi />} />
            <Route path="/sewer-issues" element={<SewageIssues />} />
            <Route path="/community-wifi-warning" element={<CommunityWifiWarning />} />
            <Route path="/pay-utility-bills" element={<PayUtilityBills />} />
            <Route path="/street-sweeping" element={<StreetSweeping />} />
            <Route path="/eviction-prevention-warning" element={<EvictionPreventionWarning />} />
            <Route path="/eviction-prevention" element={<EvictionPrevention />} />
            <Route path="/junk-pickup" element={<JunkPickup />} />
            <Route path="/container-issues" element={<ContainerIssues />} />
            <Route path="/missed-collections" element={<MissedCollections />} />
            <Route path="/services-new-homes" element={<ServicesNewHomes />} />
            <Route path="/collection-schedule" element={<CollectionSchedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

        </div>
      </div>

      {/* Overlay */}
      <div className="overlay toggle-icon"></div>

      {/* Back to top */}
      <a href="#" onClick={(e) => e.preventDefault()} className="back-to-top">
        <i className="bx bxs-up-arrow-alt"></i>
      </a>

      {/* Footer */}
      <footer className="page-footer">
        <p className="mb-0">Copyright &copy; 2026. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;