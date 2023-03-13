import React, { useContext, useState } from "react";

import Zoom from "react-reveal/Zoom";
import { createChat, searchUser } from "../../../api/UserRequests";
import MatchesContext from "../../../context/matches";
import Loader from "../../Loading/Loading";
import UserListItem from "../UserAvatar/UserListItem";
function ChatFriendsList({
  loading,
  searchResult,
  setSearch,
  setSearchResult,
}) {
  const {
    chats,
    setChats,
    setSelectedChat,
    activeUsers,
    notification,
    setNotification,
    selectedChat,
  } = useContext(MatchesContext);
  const [loadingChat, setLoadingChat] = useState(false);
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const {
        data: {
          data: { data },
        },
      } = await createChat(userId);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSearch("");
      setSearchResult(searchResult.filter((el) => false));
      setSelectedChat(data);
      setLoadingChat(false);
      //   console.log(searchResult);
      //   toggleDrawer(anchor, false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Zoom>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          searchResult?.map((user) => {
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            );
          })
        )}
      </div>
    </Zoom>
  );
}

export default ChatFriendsList;
