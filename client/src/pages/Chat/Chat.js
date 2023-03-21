import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserChats } from "../../api/UserRequests";

import Navbar from "../../components/Appbar/Navbar";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

import ChatBox from "../../components/miscellaneous/ChatBox";
import MyChat from "../../components/miscellaneous/MyChat";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import MatchesContext from "../../context/matches";
import "./Chat.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
function Chat() {
  const { setActiveTab } = useContext(MatchesContext);
  setActiveTab(4);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [err, setErr] = useState(null);

  const mychatscroll = useRef();
  useEffect(() => {
    mychatscroll.current?.scrollIntoView({ behavior: "smooth" });
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
      }
    };
    fetchChats();
  }, []);
  return (
    <>
      <Navbar user={user} />
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
              ref={mychatscroll}
              style={{ background: "#ddd" }}
            >
              <MyChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </div>
          )}
        </div>
        <BottomNavbar />
      </div>
    </>
  );
}

export default Chat;
