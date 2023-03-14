import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import VideoContext from "../../context/videoContext";
import "./VideoPlayer.css";
const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid var(--color-primary)",
    margin: "10px",
  },
}));
{
  /* <Typography variant="h5" gutterBottom>
              {call.name}
            </Typography> */
}
{
  /* <Typography variant="h5" gutterBottom>
            {name || "Name"}
          </Typography> */
}

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    socket,
  } = useContext(VideoContext);

  const classes = useStyles();

  useEffect(() => {
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [myVideo, stream]);

  socket.on("endCall", () => {
    window.location.reload();
  });

  return (
    <div container className="video-container">
      {stream && (
        <video
          playsInline
          muted
          autoPlay
          className={
            callAccepted && !callEnded
              ? "video-player smallFrame"
              : "video-player video-me"
          }
          ref={myVideo}
        />
      )}

      {callAccepted && !callEnded && (
        <video
          playsInline
          autoPlay
          className="video-player video-other"
          ref={userVideo}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
