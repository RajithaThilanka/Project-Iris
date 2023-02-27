import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserChats } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loader from "../Loading/Loading";
import { Stack } from "@mui/system";
import { getSender } from "../../config/ChatLogics";
function MyChat() {
  const [loggedUser, setLoggedUser] = useState();
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { chats, setChats, selectedChat, setSelectedChat } =
    useContext(MatchesContext);
  const fetchChats = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await fetchUserChats();

      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        backgroundColor: "#ccc",
        width: "100%",
        borderRadius: "15px",
        borderWidth: "1px",
      }}
    >
      <div
        style={{
          padding: "0 24px 24px 24px",
          fontSize: "28px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My chats
        <Button style={{ display: "flex", fontSize: "12px" }}>
          New group chat <AddCircleIcon />
        </Button>
      </div>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {chats ? (
          <Stack overflow="scroll" spacing={2}>
            {chats.map((chat) => {
              return (
                <div
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                  key={chat._id}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                    color: selectedChat === chat ? "white" : "black",
                    padding: " 16px 24px",
                    borderRadius: "24px",
                  }}
                >
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              );
            })}
          </Stack>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default MyChat;
