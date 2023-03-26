import React, { useContext, useEffect, useState } from "react";
import MatchesContext from "../../context/matches";
import ChatNotification from "../ChatNotification/ChatNotification";
import Notification from "../Notification/Notification";
import "./Notifications.css";
function Notifications({ handleCloseNotMenu }) {
  const { notification, setNotification, warnings, setWarnings } =
    useContext(MatchesContext);
  // const [finalNots, setFinalNots] = useState([]);
  // const prepareNots = () => {
  //   notification.forEach((n) => {
  //     const temp = finalNots.findIndex(
  //       (noti) => noti.chat._id + "" === n.chat._id + ""
  //     );
  //     if (temp !== -1) {
  //       let old = { ...finalNots[temp] };
  //       setFinalNots(
  //         finalNots.filter((notif) => notif.chat._id + "" !== n.chat._id + "")
  //       );
  //       old.content += n.content;
  //       setFinalNots([...finalNots, old]);
  //     } else {
  //       setFinalNots([...finalNots, n]);
  //     }
  //   });

  //   // finalNots = [].concat(...finalNots);
  // };

  // useEffect(() => {
  //   prepareNots();
  //   console.log(finalNots);
  // }, [notification]);
  return (
    <div className="notif-container">
      {notification.map((not, index) => {
        return (
          <ChatNotification
            key={index}
            notData={not}
            handleCloseNotMenu={handleCloseNotMenu}
            isWarning={false}
          />
        );
      })}
      {warnings.map((not) => (
        <Notification
          key={not._id}
          notData={not}
          handleCloseNotMenu={handleCloseNotMenu}
          isWarning={true}
        />
      ))}
    </div>
  );
}

export default Notifications;
