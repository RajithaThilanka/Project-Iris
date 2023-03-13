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

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(VideoContext);

  const classes = useStyles();

  useEffect(() => {
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [myVideo, stream]);

  return (
    <div container className="video-container">
      {stream && (
        <div
          className="video-me-container"
          // style={{
          //   boxShadow:
          //     "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          // }}
        >
          {/* <Typography variant="h5" gutterBottom>
            {name || "Name"}
          </Typography> */}
          <video
            playsInline
            muted
            autoPlay
            className="video-me"
            ref={myVideo}
          />
        </div>
      )}

      {callAccepted && !callEnded && (
        <div className="video-other-container">
          {/* <Typography variant="h5" gutterBottom>
              {call.name}
            </Typography> */}
          <video playsInline autoPlay className="video-other" ref={userVideo} />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
