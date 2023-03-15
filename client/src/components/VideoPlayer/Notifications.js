import React, { useContext } from "react";
import { Button } from "@mui/material";
import MatchesContext from "../../context/matches";
import VideoContext from "../../context/videoContext";

const Notifications = ({ resId }) => {
  const { answerCall, call, callAccepted, leaveCall, calling, setCalling } =
    useContext(VideoContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <h6 style={{ color: "#fff", fontSize: "2rem" }}>
            {call.name} is calling:
          </h6>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => leaveCall(resId)}
          >
            Decline
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
