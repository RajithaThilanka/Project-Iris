import {
  Avatar,
  Badge,
  FormControl,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import DuoIcon from "@mui/icons-material/Duo";
import InputEmoji from "react-input-emoji";
import { updateSeen } from "../../api/ChatRequests";
import { logout } from "../../actions/AuthActions";
const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { activeUsers, setActiveUsers } = useContext(MatchesContext);
  const inputRef = useRef();
  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
  } = useContext(MatchesContext);
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
  const dispatch = useDispatch();
  const {
    receivedConRequests,
    setreceivedConRequests,
    setsentDateRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    sentDateRequests,
    setsentConRequests,
    sentConRequests,
    friends,
    setFriends,
    connections,
    setConnections,
    setsentFriendRequests,
    sentFriendRequests,
  } = useContext(MatchesContext);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("active-users", (activeUsers) => {
      setActiveUsers(activeUsers);
      console.log(activeUsers);
    });
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
      if (error.response.status === 401) {
        socket?.disconnect();
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", async (newMessageRecieved) => {
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
        try {
          await updateSeen(newMessageRecieved._id);
        } catch (err) {
          console.log(err);
        }
      }
    });
  });

  const sendMessage = async () => {
    // event.preventDefault();
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
      } catch (error) {
        console.log(error);
      }
    }
  };
  const typingHandler = (text) => {
    setNewMessage(text);
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
      if (timeDiff >= timerLength && !typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  useEffect(() => {
    socket.on("new-con-req-received", (newConReq) => {
      if (!receivedConRequests.some((req) => req._id === newConReq._id)) {
        setreceivedConRequests([newConReq, ...receivedConRequests]);
      }
    });

    socket.on("new-friend-req-received", (newConReq) => {
      if (!receivedFriendRequests.some((req) => req._id === newConReq._id)) {
        setreceivedFriendRequests([newConReq, ...receivedFriendRequests]);
      }
    });
    socket.on("new-con-req-accepted", (newConReq) => {
      setsentConRequests(
        sentConRequests.filter((req) => req._id !== newConReq._id)
      );
      setConnections([...connections, newConReq]);
    });
    socket.on("new-friend-req-accepted", (newConReq) => {
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req._id !== newConReq._id)
      );
      setFriends([...friends, newConReq]);
      setConnections(
        connections.filter(
          (u) =>
            u.receiverId._id !== newConReq.receiverId._id &&
            u.senderId._id !== newConReq.receiverId._id
        )
      );
    });
    socket.on("new-date-req-accepted", (newConReq) => {
      setsentDateRequests(
        sentDateRequests.filter((req) => req._id !== newConReq._id)
      );
    });
  });
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

  useEffect(() => {
    selectedChat && inputRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat]);
  useEffect(() => {
    return () => {
      socket.off();
      setSocketConnected(false);
    };
  }, []);
  return (
    <>
      {selectedChat ? (
        <>
          <div className="chat-user-header">
            <IconButton
              style={{}}
              onClick={() => {
                setSelectedChat("");
                setFetchAgain(!fetchAgain);
              }}
            >
              <ArrowBackIosIcon
                style={{ color: "#fff", width: "2rem", height: "2rem" }}
                fontSize="small"
              />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <div className="single-chat-user-container">
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
                        serverPublic +
                        getSenderFull(user, selectedChat.users).profilePhoto
                      }
                      style={{
                        cursor: "pointer",
                        width: "4rem",
                        height: "4rem",
                        border: "1px solid #fff",
                      }}
                      onClick={() => setOpen(true)}
                    />
                  </StyledBadge>
                  <h6 className="single-chat-username">
                    {getSender(user, selectedChat.users)}
                  </h6>
                  <DuoIcon
                    fontSize="small"
                    sx={{
                      width: "2.7rem",
                      height: "2.7rem",
                      marginLeft: "auto",
                    }}
                  />
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
          </div>
          <div
            className="chat-container"
            style={{
              backgroundImage:
                serverPublic +
                  getSenderFull(user, selectedChat.users).profilePhoto !==
                "defaultProfile"
                  ? `linear-gradient(to bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.5),rgba(0,0,0,0.6)),url(${
                      serverPublic +
                      getSenderFull(user, selectedChat.users).profilePhoto
                    })`
                  : serverPublic + "chat-background.png",
              backgroundSize: "auto 100%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#000",
              backgroundPosition: "50% 50%",
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
            <div className="lottie-container" style={{ position: "relative" }}>
              {isTyping ? (
                <div style={{}} className="lottie">
                  <Lottie
                    options={defaultOptions}
                    width={30}
                    style={{ marginBottom: 15 }}
                  />
                </div>
              ) : (
                <></>
              )}

              <div className="input-emoji-chat-container" ref={inputRef}>
                <InputEmoji
                  placeholder="Type a message"
                  onChange={typingHandler}
                  value={newMessage}
                  onEnter={sendMessage}
                  theme="dark"
                  fontSize={12}
                />
                <IconButton sx={{ color: "#fff" }} onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
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
