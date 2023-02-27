import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/miscellaneous/ChatBox";
import MyChat from "../../components/miscellaneous/MyChat";
import Sidedrawer from "../../components/miscellaneous/Sidedrawer";

function Chat() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="Chat" style={{ width: "100%" }}>
      <Sidedrawer />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "91.5vh",
          padding: "10px",
        }}
      >
        <MyChat />
        <ChatBox />
      </Box>
    </div>
  );
}

export default Chat;
