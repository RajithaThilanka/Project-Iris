import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequests";
import Navbar from "../../components/Appbar/Navbar";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/miscellaneous/ChatBox";
import MyChat from "../../components/miscellaneous/MyChat";
import Sidedrawer from "../../components/miscellaneous/Sidedrawer";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import MatchesContext from "../../context/matches";

function Chat() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(4);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      <Navbar user={user} />{" "}
      <div style={{ display: "flex" }}>
        <VerticalNavbar />
        <div className="Chat" style={{ width: "100%", padding: "1rem" }}>
          <Sidedrawer />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "91.5vh",
              padding: "10px",
              margin: "1rem",
            }}
          >
            <MyChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        </div>
      </div>
    </>
  );
}

export default Chat;
