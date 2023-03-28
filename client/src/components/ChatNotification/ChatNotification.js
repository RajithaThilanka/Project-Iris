import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateSeenAll } from "../../api/ChatRequests";
import { createChat } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import { format } from "timeago.js";
import "./ChatNotification.css";
import Zoom from "react-reveal/Zoom";
function ChatNotification({ notData, handleCloseNotMenu }) {
  const { chats, setChats, setSelectedChat, setNotification, notification } =
    useContext(MatchesContext);
  const navigate = useNavigate();
  const accessChat = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await createChat(notData.sender._id);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      await updateSeenAll(notData?.chat._id);
      setNotification(
        notification.filter((n) => n.chat._id !== notData?.chat._id)
      );
      setSelectedChat(data);
      handleCloseNotMenu();
      navigate("/me/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div
      style={{
        height: "7rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        padding: "0.5rem",
        // backgroundImage:
        //   "linear-gradient(to right bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.4))",
        backgroundImage:
          "linear-gradient(to right bottom,var(--color-primary-dark), var(--color-primary),var(--color-primary-light))",
      }}
    >
      <div className="chat-notification-container" onClick={accessChat}>
        <div className="chat-notification-sender-pic">
          <img
            src={serverPublic + notData?.sender?.profilePhoto}
            alt="profile"
          />
        </div>

        <div className="chat-notification-sender-name">
          {notData?.sender?.firstname}
        </div>
        <div className="notification-time">{format(notData?.createdAt)}</div>
      </div>

      <div className="chat-notification-msg">{notData?.content}</div>
    </div>
  );
}

export default ChatNotification;
