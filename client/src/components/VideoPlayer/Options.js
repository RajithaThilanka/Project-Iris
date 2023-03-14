import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MatchesContext from "../../context/matches";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import VideoContext from "../../context/videoContext";
import { getUser } from "../../api/UserRequests";
import Loader from "../../components/Loading/Loading";
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

  const [resUser, setResUser] = useState(null);
  const {
    me,
    callAccepted,
    leaveCall,
    callEnded,
    videoActiveUsers,
    callUser,
    call,
    calling,
    setCalling,
  } = useContext(VideoContext);
  const [idToCall, setIdToCall] = useState("");

  useEffect(() => {
    const socketObj = videoActiveUsers.find((u) => u.userId === resId);
    if (socketObj) {
      setIdToCall(socketObj.socketId);
    } else setIdToCall("");
  }, [videoActiveUsers]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getUser(resId);
        setResUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleCallUser = () => {
    setCalling(true);
    callUser(idToCall);
  };
  const classes = useStyles();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        background:
          callAccepted && !callEnded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.7)",

        // opacity: callAccepted && !callEnded ? "0%" : "100%",
        paddingBottom: "1.4rem",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: "2rem",
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
          transition: "all 1s",
        }}
      >
        {idToCall ? "" : `${resUser?.firstname} is offline. Please wait!`}
        {idToCall && !callAccepted && !call.isReceivingCall && !calling
          ? `${resUser?.firstname} is online. Call ${
              resUser?.gender === "male" ? "him" : "her"
            }!`
          : ""}
        {calling && !callAccepted ? `Calling ${resUser?.firstname}` : ""}
      </div>
      <div style={{ textAlign: "center" }}> {!idToCall && <Loader />}</div>
      <div>
        <div id="controls">
          {callAccepted && !callEnded ? (
            <div
              className="control-container"
              id="leave-btn"
              onClick={() => leaveCall(idToCall)}
            >
              <img src={serverPublic + "phone.png"} alt="" />
            </div>
          ) : call.isReceivingCall ? (
            ""
          ) : (
            <IconButton
              className="control-container"
              id="camera-btn"
              onClick={handleCallUser}
              style={{ display: calling && !callAccepted ? "none" : "block" }}
              disabled={!idToCall}
            >
              <img src={serverPublic + "camera.png"} alt="" />
            </IconButton>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export default Options;
