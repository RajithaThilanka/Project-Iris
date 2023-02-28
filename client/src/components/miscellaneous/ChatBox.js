import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat, setSelectedChat } = useContext(MatchesContext);
  // display none if selectedChat? "flex":"none"
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "18px",
        backgroundColor: "white",
        width: "100%",
        borderRadius: "10px",
        borderWidth: "1px",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
}

export default ChatBox;
