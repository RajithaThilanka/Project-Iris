import { Button } from "@mui/material";
import React, { useContext } from "react";
import { setNotified } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import "./Notification.css";
function Notification({ notData, isWarning }) {
  const { notification, setNotification, warnings, setWarnings } =
    useContext(MatchesContext);

  const handleWarning = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await setNotified(notData._id);
      setWarnings(warnings.filter((not) => not._id + "" !== notData._id + ""));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotification = () => {
    setNotification(
      notification.filter((not) => not._id + "" !== notData._id + "")
    );
  };
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
          onClick={!isWarning ? handleNotification : handleWarning}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export default Notification;
