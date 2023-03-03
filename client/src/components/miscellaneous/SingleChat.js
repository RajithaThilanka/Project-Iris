import {
  Avatar,
  Badge,
  FormControl,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
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
import styled from "@emotion/styled";
import InputEmoji from "react-input-emoji";
const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { activeUsers } = useContext(MatchesContext);

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
    // socket.on("active-users", (activeUsers) => {
    //   setActiveUsers(activeUsers);
    // });
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

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      {selectedChat ? (
        <>
          <span className="chat-user-header">
            <IconButton
              style={{ display: "flex" }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIosIcon style={{ color: "#fff" }} />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant={
                      activeUsers.some(
                        (u) =>
                          u.userId ===
                          getSenderFull(user, selectedChat.users)._id
                      )
                        ? "dot"
                        : ""
                    }
                  >
                    <Avatar
                      alt="user avatar"
                      src={
                        user.profilePhoto
                          ? serverPublic +
                            getSenderFull(user, selectedChat.users).profilePhoto
                          : serverPublic + "defaultProfile.png"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpen(true)}
                    />
                  </StyledBadge>
                  <h6 style={{ fontSize: "1.5rem", fontWeight: "400" }}>
                    {getSender(user, selectedChat.users)}
                  </h6>
                </div>

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
          <div className="chat-container">
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
              {/* <InputEmoji onChange={typingHandler} value={newMessage} /> */}
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
