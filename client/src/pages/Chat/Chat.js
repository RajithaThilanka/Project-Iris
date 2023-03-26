import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChats } from "../../api/UserRequests";

import Navbar from "../../components/Appbar/Navbar";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

import ChatBox from "../../components/miscellaneous/ChatBox";
import MyChat from "../../components/miscellaneous/MyChat";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import MatchesContext from "../../context/matches";
import "./Chat.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import io from "socket.io-client";
import { logout } from "../../actions/AuthActions";
const ENDPOINT = "http://localhost:5000";
let socket;

function Chat() {
  const { setActiveTab, setSocketConnected, setActiveUsers, socketConnected } =
    useContext(MatchesContext);
  setActiveTab(4);
  const dispatch = useDispatch();
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [err, setErr] = useState(null);

  // const mychatscroll = useRef();
  // useEffect(() => {
  //   mychatscroll.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("active-users", (activeUsers) => {
      setActiveUsers(activeUsers);
      console.log(activeUsers);
    });
  }, []);
  useEffect(() => {
    const fetchChats = async () => {
      setErr(null);

      try {
        await fetchUserChats();
        setErr(null);
      } catch (error) {
        console.log(error);
        setErr(error);
        if (error.response.status === 401) {
          socket?.disconnect();
          dispatch(logout());
        }
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    return () => {
      socket.off();
      setSocketConnected(false);
    };
  }, []);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      {socketConnected && <Navbar user={user} socket={socket} />}
      {socketConnected ? (
        <div style={{ display: "flex" }} className="chat-page-container">
          <VerticalNavbar />
          <div className="chat-page">
            {/* <Sidedrawer /> */}
            {err ? (
              <h3 className="connections-err-msg">
                {err?.response?.data?.message}
                <SentimentVeryDissatisfiedIcon fontSize="large" />
              </h3>
            ) : (
              <div
                className="chat-page-sub"
                // ref={mychatscroll}
                style={{ background: "#ddd" }}
              >
                <MyChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  socket={socket}
                />
                <ChatBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            )}
          </div>
          <BottomNavbar />
        </div>
      ) : !socketConnected ? (
        <div
          className="dashboard-loading-container"
          style={{ height: "100vh" }}
        >
          <div className="dashboard-loading-photo">
            <img src={serverPublic + "irislogo.png"} alt="loading-user" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Chat;
