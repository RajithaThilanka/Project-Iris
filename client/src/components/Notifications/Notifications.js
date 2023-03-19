import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import ChatNotification from "../ChatNotification/ChatNotification";
import Notification from "../Notification/Notification";
import "./Notifications.css";
function Notifications({ handleCloseNotMenu }) {
  const { notification, setNotification, warnings, setWarnings } =
    useContext(MatchesContext);
  return (
    <div className="notif-container">
      {notification.map((not) => {
        return (
          <ChatNotification
            key={not._id}
            notData={not}
            handleCloseNotMenu={handleCloseNotMenu}
          />
        );
      })}
      {warnings.map((not) => (
        <Notification
          key={not._id}
          notData={not}
          handleCloseNotMenu={handleCloseNotMenu}
        />
      ))}
    </div>
  );
}

export default Notifications;
