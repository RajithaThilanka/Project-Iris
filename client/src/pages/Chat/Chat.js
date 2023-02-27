import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Conversation/Conversation";

import "./Chat.css";

function Chat() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        Search
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats?.map((chat, index) => {
              return (
                <div>
                  <Conversation
                    data={chat}
                    key={index}
                    currentUser={user._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
      </div>
    </div>
  );
}

export default Chat;
