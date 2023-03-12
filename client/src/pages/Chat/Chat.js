import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/Appbar/Navbar";

import ChatBox from "../../components/miscellaneous/ChatBox";
import MyChat from "../../components/miscellaneous/MyChat";
import Sidedrawer from "../../components/miscellaneous/Sidedrawer";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import MatchesContext from "../../context/matches";
import "./Chat.css";
function Chat() {
  const { setActiveTab } = useContext(MatchesContext);
  setActiveTab(4);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      <Navbar user={user} />{" "}
      <div style={{ display: "flex" }} className="chat-page-container">
        <VerticalNavbar />
        <div className="chat-page">
          {/* <Sidedrawer /> */}
          <div className="chat-page-sub">
            <MyChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
