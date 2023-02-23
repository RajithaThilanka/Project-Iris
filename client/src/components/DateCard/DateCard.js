import { Button } from "@mui/material";
import React from "react";
import { users } from "../../dev-data/users";
import "./DateCard.css";
function DateCard({ dateInfo }) {
  const [sender, receiver] = users;
  return (
    <div className="date-card">
      <div className="date-card-img"></div>
      <div className="date-time-remaining">starts in 3 hours</div>
      <div className="date-partners">
        <div className="partner">
          <img src="./img/dinesh.jpg" alt="" className="partner-img" />
          <h3 className="partner-name">Sender</h3>
        </div>
        <div className="partner">
          <img src="./img/dinesh.jpg" alt="" className="partner-img" />
          <h3 className="partner-name">Receiver</h3>
        </div>
      </div>
      <div className="date-scheduled-at">{new Date().toLocaleString()}</div>
      <div className="date-btn-container">
        <Button variant="contained" className="go-to-date-btn">
          Go to date
        </Button>
        <Button variant="contained" className="postpone-btn">
          Postpone
        </Button>
      </div>
    </div>
  );
}

export default DateCard;
