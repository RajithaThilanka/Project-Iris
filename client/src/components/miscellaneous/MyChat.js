import { Avatar, Badge, Button, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserChats } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loader from "../Loading/Loading";
import { Stack } from "@mui/system";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import styled from "@emotion/styled";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CircleIcon from "@mui/icons-material/Circle";
function MyChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [loggedUser, setLoggedUser] = useState(user);
  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    activeUsers,
    notification,
    setNotification,
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
    <div
      style={{
        display: selectedChat ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        backgroundColor: "var(--color-primary)",
        width: "100%",
        borderRadius: "15px",
        borderWidth: "1px",
        maxWidth: "70%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--color-primary)",
          borderRadius: "20px",
          marginBottom: "0.8rem",
        }}
      >
        <h6
          style={{
            fontSize: "2rem",
            color: "#fff",

            flex: 1,
            textAlign: "center",
          }}
        >
          My Chats
        </h6>
        <GroupChatModal>
          <IconButton
            variant="contained"
            style={{ display: "flex", fontSize: "12px" }}
          >
            <AddCircleIcon style={{ color: "#fff" }} />
          </IconButton>
        </GroupChatModal>
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
                    setNotification(
                      notification.filter((not) => not.chat._id !== chat._id)
                    );
                  }}
                  key={chat._id}
                  style={{
                    cursor: "pointer",
                    // backgroundColor:
                    //   selectedChat === chat
                    //     ? "var(--color-primary-light)"
                    //     : "#E8E8E8",
                    // color: selectedChat === chat ? "white" : "black",
                    background: "var( --color-grey-light-3)",
                    borderRadius: "50px",
                    padding: " 16px 24px",
                    overflowY: "scroll",
                  }}
                >
                  {!chat.isGroupChat ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "20px",
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
                            user.profilePhoto
                              ? serverPublic +
                                getSenderFull(loggedUser, chat.users)
                                  .profilePhoto
                              : serverPublic + "defaultProfile.png"
                          }
                        />
                      </StyledBadge>
                      <h6
                        style={{
                          // backgroundColor: "var(--color-primary)",
                          color: "#000",
                          fontSize: "1.3rem",
                          padding: "0.2rem 2rem",
                          borderRadius: "20px",
                          fontWeight: 700,
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
                            // background: "var(--color-secondary)",
                            // color: "#000",
                            fontSize: "1.2rem",
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
                            } ${chat.latestMessage.content}`}
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
