import React from "react";
import "./Support.css";
import { Button } from "@mui/material";
function Support() {
  return (
    <div className="support-container">
      <h5 className="heading-secondary support-heading">
        We are here for your support
      </h5>
      <div className="support-content">
        Signing up for IRIS is the first step in finding your next great
        relationship. From profile tips to sharing your success story, we are
        here to support you in your journey for love. WE’RE AVAILABLE 24/7, 365
        DAYS A YEAR. Feel free to contact us to know more about our service.
      </div>
      <div className="support-btn-container">
        <button
          variant="contained"
          className="btn btn--white btn--animated"
          style={{ color: "#fff", fontSize: "1.5rem" }}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default Support;
