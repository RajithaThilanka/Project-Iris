import { Avatar, Tooltip } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import TimeAgo from "react-timeago";
import { format } from "timeago.js";
import "./ScrollableChat.css";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
function ScrollableChat({ messages }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id} ref={scroll}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                placement="bottom-start"
                title={m.sender.firstname}
                arrow
              >
                <Avatar
                  style={{
                    marginTop: "15px",
                    marginRight: "6px",
                    cursor: "pointer",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                  src={serverPublic + m.sender.profilePhoto}
                >
                  {m.sender.firstname[0]}
                </Avatar>
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,

                borderRadius: "1rem",
                padding: "0.2rem 1.2rem",

                maxWidth: "50%",
                minWidth: "20%",
                fontSize: "1.2rem",
                fontWeight: 500,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                marginBottom: "4px",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              {m.content}
              <div style={{ textAlign: "right" }}>
                <span className="chat-timeago">{format(m.createdAt)}</span>
              </div>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
