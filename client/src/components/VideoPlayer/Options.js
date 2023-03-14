import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MatchesContext from "../../context/matches";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import VideoContext from "../../context/videoContext";

const socket = io("http://localhost:5000");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",

    border: "2px solid var(--color-primary)",
  },
}));

function Options({ resId, children }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const {
    me,
    callAccepted,
    name,
    setName,
    leaveCall,
    callEnded,
    videoActiveUsers,
    callUser,
  } = useContext(VideoContext);
  const [idToCall, setIdToCall] = useState("");

  useEffect(() => {
    const socketObj = videoActiveUsers.find((u) => u.userId === resId);
    console.log(videoActiveUsers);
    if (socketObj) {
      setIdToCall(socketObj.socketId);
    }
  }, [videoActiveUsers]);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const classes = useStyles();
  return (
    <Container>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="ID to Call"
                value={idToCall}
                fullWidth
                aria-readonly
              />
              <div id="controls">
                {callAccepted && !callEnded ? (
                  <div
                    className="control-container"
                    id="leave-btn"
                    onClick={() => leaveCall(idToCall)}
                  >
                    <img src={serverPublic + "phone.png"} alt="" />
                  </div>
                ) : (
                  <div
                    className="control-container"
                    id="camera-btn"
                    onClick={() => callUser(idToCall)}
                  >
                    <img src={serverPublic + "camera.png"} alt="" />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}

export default Options;
