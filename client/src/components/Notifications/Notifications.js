import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import Notification from "../Notification/Notification";
import "./Notifications.css";
function Notifications() {
  const { notification, setNotification } = useContext(MatchesContext);
  return (
    <div className="notif-container">
      {notification.map((not) => (
        <Notification key={not._id} notData={not} />
      ))}
    </div>
  );
}

export default Notifications;
