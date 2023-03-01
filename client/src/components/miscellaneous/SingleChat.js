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
import Lottie from "react-lottie";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import animationData from "../../animations/typing.json";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { selectedChat, setSelectedChat, notification, setNotification } =
    useContext(MatchesContext);
  const [modalOpen, setOpen] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
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
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const {
          data: {
            data: { data },
          },
        } = await sendAMessage(newMessage, selectedChat._id);

        socket.emit("new message", data);
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
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 1000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
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
