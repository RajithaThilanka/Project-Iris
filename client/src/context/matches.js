import { createContext, useState } from "react";

const MatchesContext = createContext();

function ContextProvider({ children }) {
  const [sentConRequests, setsentConRequests] = useState([]);
  const [receivedConRequests, setreceivedConRequests] = useState([]);
  const [receivedDateRequests, setreceivedDateRequests] = useState([]);
  const [sentDateRequests, setsentDateRequests] = useState([]);
  const [receivedFriendRequests, setreceivedFriendRequests] = useState([]);
  const [sentFriendRequests, setsentFriendRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const valueToShare = {
    sentConRequests,
    addRequest: (newRequest) => {
      setsentConRequests([...sentConRequests, newRequest]);
    },
    receivedDateRequests,
    setreceivedDateRequests,
    sentDateRequests,
    setsentDateRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    sentFriendRequests,
    setsentFriendRequests,
    setsentConRequests,
    receivedConRequests,
    setreceivedConRequests,
    connections,
    setConnections,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    addConnection: (newConnection) => {
      setConnections([...connections, newConnection]);
    },
    friends,
    setFriends,
    dates,
    setDates,
  };
  return (
    <MatchesContext.Provider value={valueToShare}>
      {children}
    </MatchesContext.Provider>
  );
}

export { ContextProvider };
export default MatchesContext;
