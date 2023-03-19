import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import SingleChat from "./SingleChat";
import "./ChatBox.css";
function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat, setSelectedChat } = useContext(MatchesContext);
  // display none if selectedChat? "flex":"none"
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div
      className="chatbox-container"
      style={{
        display: selectedChat ? "flex" : "none",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
}

export default ChatBox;
