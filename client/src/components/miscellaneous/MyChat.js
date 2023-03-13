import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createChat, fetchUserChats, searchUser } from "../../api/UserRequests";
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

function MyChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const [loggedUser, setLoggedUser] = useState(user);
  const [focused, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    chats,
    setChats,
    setSelectedChat,
    activeUsers,
    notification,
    setNotification,
    selectedChat,
  } = useContext(MatchesContext);
  console.log(notification);
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

  const handleSearch = async (event) => {
    event.preventDefault();
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
  const handleBlur = () => {
    !search && setFocus(false);
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="chat">
      <div className="contacts_card">
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search__input"
            onFocus={() => setFocus(true)}
            onBlur={handleBlur}
          />
          <IconButton className="search__button" type="submit">
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
                  onClick={() => {
                    setSelectedChat(chat);
                    setNotification(
                      notification.filter((not) => not.chat._id !== chat._id)
                    );
                  }}
                  key={chat._id}
                  className="chat-contact"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    color: "#fff",
                    height: "8rem",
                  }}
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
                              u.userId === getSenderFull(user, chat?.users)._id
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
                            width: "6rem",
                            height: "6rem",
                            border: "1px solid #fff",
                          }}
                        />
                      </StyledBadge>
                      <h6
                        style={{
                          fontSize: "1.4rem",
                          padding: "0.1rem 1rem",

                          fontWeight: 600,
                          flex: 1,
                        }}
                      >
                        {getSenderFull(loggedUser, chat.users).firstname +
                          " " +
                          getSenderFull(loggedUser, chat.users).lastname}
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",

                            fontSize: "1.4rem",
                            fontWeight: "400",
                          }}
                        >
                          {notification.some(
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
                          )}

                          {chat.latestMessage &&
                            `${
                              chat.latestMessage.sender._id === loggedUser._id
                                ? "You :"
                                : chat.latestMessage.sender.firstname[0] + ": "
                            } ${
                              chat.latestMessage.content.slice(0, 10) + " ..."
                            }`}
                          {notification.some(
                            (not) => not.chat._id === chat._id
                          ) ? (
                            ""
                          ) : (
                            <DoneAllIcon
                              style={{ color: "var(--color-primary)" }}
                            />
                          )}
                          {console.log(notification, chat._id)}
                        </span>
                      </h6>
                    </div>
                  ) : (
                    ""
                  )}
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
