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
  const [fetchAgain, setFetchAgain] = useState(false);
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
        <MyChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
}

export default Chat;
