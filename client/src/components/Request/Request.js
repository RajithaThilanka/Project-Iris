import { Button } from "@mui/material";
import React from "react";
import "./Request.css";
import { AiFillStar } from "react-icons/ai";
function Request() {
  return (
    <div className="request-container">
      <div className="req-user-img">
        <img src="./img/dinesh.jpg" alt="dinesh" />
      </div>
      <div className="req-user-container">
        <div className="user-type">{<AiFillStar />}</div>
        <div className="req-user-info">
          <h7>Dinesh Kaushan</h7>
          <p>3 days ago</p>
        </div>
        <div className="req-user-options">
          <Button variant="contained" size="small">
            Accept
          </Button>
          <Button variant="contained" size="small" color="otherColors">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Request;
