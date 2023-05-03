import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteChat, fetchUserChats, searchUser } from "../../api/UserRequests";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MatchesContext from "../../context/matches";

import Loader from "../Loading/Loading";
import { Stack } from "@mui/system";
import { getSenderFull } from "../../config/ChatLogics";
import styled from "@emotion/styled";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CircleIcon from "@mui/icons-material/Circle";
import "./MyChat.css";
import SearchIcon from "@mui/icons-material/Search";
import ChatFriendsList from "./ChatFriendsList/ChatFriendsList";
import ChatIcon from "@mui/icons-material/Chat";
import { updateSeenAll } from "../../api/ChatRequests";

function MyChat({ fetchAgain, setFetchAgain, socket }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const [loggedUser, setLoggedUser] = useState(user);
  const [focused, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backBtnVisible, setBackBtnVisible] = useState(false);
  const {
    chats,
    setChats,
    setSelectedChat,
    activeUsers,
    notification,
    setNotification,
    selectedChat,
  } = useContext(MatchesContext);

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
  }, [fetchAgain]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const {
        data: {
          data: { data },
        },
      } = await searchUser(search);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);
  useEffect(() => {
    socket?.on("message-seen", (chat) => {
      // chat.latestMessage.isSeen = true;
      setChats(
        chats.filter((ch) => {
          if (ch._id !== chat._id) {
            return true;
          } else {
            ch.latestMessage.isSeen = true;
            return true;
          }
        })
      );
    });
  });
  const handleDeleteChat = async (id) => {
    try {
      await deleteChat(id);
      setChats(chats.filter((chat) => chat._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleBackClick = () => {
    setFocus(false);
    setBackBtnVisible(false);
  };

  const handleFocus = () => {
    setFocus(true);
    setBackBtnVisible(true);
  };

  const handleOpenMessage = async (chat) => {
    setSelectedChat(chat);

    await updateSeenAll(chat._id);
    if (
      chat?.latestMessage &&
      chat?.latestMessage?.sender?._id != loggedUser._id
    ) {
      chat.latestMessage.isSeen = true;
    }
    socket.emit("message-seen", chat);
    setNotification(notification.filter((not) => not.chat._id !== chat._id));
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div
      className="chat"
      style={{
        backgroundImage:
          'url("https://live.staticflickr.com/65535/52800386429_19cf461e23_k.jpg")',
        display: window.innerWidth <= 896 && selectedChat ? "none" : "flex",
      }}
    >
      {!backBtnVisible && (
        <div className="chat-friend-list-mob" onClick={handleFocus}>
          <ChatIcon fontSize="medium" />
        </div>
      )}
      <div className="contacts_card">
        <IconButton
          onClick={handleBackClick}
          style={{ display: backBtnVisible ? "flex" : "none" }}
        >
          <ArrowBackIcon style={{ color: "#fff", marginLeft: "0.8rem" }} />
        </IconButton>
        <form className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
            className="search__input"
            onFocus={handleFocus}
          />
          <IconButton className="search__button">
            <SearchIcon className="search__icon" />
          </IconButton>
        </form>
      </div>
      {focused ? (
        <ChatFriendsList
          loading={loading}
          searchResult={searchResult}
          setSearch={setSearch}
          setSearchResult={setSearchResult}
        />
      ) : (
        ""
      )}

      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: !focused ? "block" : "none",
        }}
      >
        {chats ? (
          <Stack overflow="scroll" spacing={2} sx={{ height: "100%" }}>
            {chats.map((chat) => {
              return (
                <div
                  style={{
                    backgroundColor:
                      selectedChat?._id === chat._id
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  className="chat-contact-container"
                >
                  <div
                    onClick={() => handleOpenMessage(chat)}
                    key={chat._id}
                    className="chat-contact"
                    style={{}}
                  >
                    {!chat.isGroupChat ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "10px",
                          padding: " 10px 24px",
                        }}
                      >
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant={
                            activeUsers.some(
                              (u) =>
                                u.userId ===
                                getSenderFull(user, chat?.users)._id
                            )
                              ? "dot"
                              : ""
                          }
                        >
                          <Avatar
                            alt="user avatar"
                            src={
                              serverPublic +
                              getSenderFull(loggedUser, chat.users).profilePhoto
                            }
                            sx={{
                              width: "4.3rem",
                              height: "4.3rem",
                              border: "1px solid #fff",
                            }}
                          />
                        </StyledBadge>
                        <h6 className="chat-contact-card-username">
                          {getSenderFull(loggedUser, chat.users).firstname +
                            " " +
                            getSenderFull(loggedUser, chat.users).lastname}
                          <span style={{}} className="chat-contact-latest-msg">
                            {chat.latestMessage &&
                              `${
                                chat.latestMessage.sender._id === loggedUser._id
                                  ? "You :"
                                  : chat.latestMessage.sender.firstname[0] +
                                    ": "
                              } ${
                                chat.latestMessage.content.slice(0, 10) + " ..."
                              }`}

                            {chat.latestMessage &&
                            chat.latestMessage.sender._id != loggedUser._id &&
                            chat.latestMessage.isSeen === false ? (
                              <CircleIcon
                                style={{
                                  color: "var(--color-primary)",
                                  height: "1.5rem",
                                }}
                              />
                            ) : chat.latestMessage &&
                              chat.latestMessage.sender._id == loggedUser._id &&
                              chat.latestMessage.isSeen === true ? (
                              <DoneAllIcon
                                style={{ color: "cyan" }}
                                fontSize="small"
                              />
                            ) : (
                              ""
                            )}
                            {/* {notification.some(
                              (not) => not.chat._id === chat._id
                            ) ? (
                              <CircleIcon
                                style={{
                                  color: "var(--color-primary)",
                                  height: "1.5rem",
                                }}
                              />
                            ) : (
                              ""
                            )} */}

                            {/* {notification.some(
                              (not) => not.chat._id === chat._id
                            ) ? (
                              ""
                            ) : (
                              <DoneAllIcon
                                style={{ color: "cyan" }}
                                fontSize="small"
                              />
                            )} */}
                          </span>
                        </h6>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <IconButton
                    style={{ marginLeft: "auto" }}
                    onClick={() => handleDeleteChat(chat._id)}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
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
