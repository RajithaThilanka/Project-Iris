import { Button } from "@mui/material";
import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import "./Notification.css";
function Notification({ notData }) {
  const { notification, setNotification } = useContext(MatchesContext);
  return (
    <div className="notification-cont">
      <h6>Warning!</h6>
      <div className="not-body">
        Your account has been reported for {notData.reason}. Please note that if
        this happens again, you account will be suspended immediately. Thank you
      </div>
      <div className="not-btn-container">
        <Button
          variant="contained"
          sx={{ fontSize: "0.9rem" }}
          onClick={() =>
            setNotification(
              notification.filter((not) => not._id !== notData._id)
            )
          }
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export default Notification;
