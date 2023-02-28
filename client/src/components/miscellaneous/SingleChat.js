import { FormControl, Icon, IconButton, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/UserAvatar/ProfileModal";
import PreviewIcon from "@mui/icons-material/Preview";
import UpdatedGroupChatModel from "./UpdateGroupChatModal";
import Loader from "../Loading/Loading";
import { getAllMessages, sendAMessage } from "../../api/UserRequests";
import "./SingleChat.css";
import ScrollableChat from "./ScrollableChat";
function SingleChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { selectedChat, setSelectedChat } = useContext(MatchesContext);
  const [modalOpen, setOpen] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const {
        data: {
          data: { data },
        },
      } = await getAllMessages(selectedChat._id);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage) {
      try {
        setNewMessage("");
        const {
          data: {
            data: { data },
          },
        } = await sendAMessage(newMessage, selectedChat._id);

        setMessages([...messages, data]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    // Typing indicator logic
  };
  return (
    <>
      {selectedChat ? (
        <>
          <span
            style={{
              fontSize: "28px",
              padding: "0 18px 12px 12px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              style={{ display: "flex" }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIosIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <IconButton onClick={() => setOpen(true)}>
                  <PreviewIcon />
                </IconButton>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                  modalOpen={modalOpen}
                  handleCloseModal={() => setOpen(false)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdatedGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "18px",
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  height: "4rem",
                }}
              >
                <Loader />
              </div>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <form onSubmit={sendMessage}>
              <TextField
                required
                placeholder="Type a message"
                size="small"
                fullWidth
                onChange={typingHandler}
                value={newMessage}
              />
            </form>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <span style={{ fontSize: "3rem" }}>
            Click on a user to start chatting
          </span>
        </div>
      )}
    </>
  );
}

export default SingleChat;
