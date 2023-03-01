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
  const [notification, setNotification] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const valueToShare = {
    sentConRequests,
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
    socketConnected,
    setSocketConnected,
    activeUsers,
    setActiveUsers,
    addConnection: (newConnection) => {
      setConnections([...connections, newConnection]);
    },
    friends,
    setFriends,
    dates,
    setDates,
    notification,
    setNotification,
  };
  return (
    <MatchesContext.Provider value={valueToShare}>
      {children}
    </MatchesContext.Provider>
  );
}

export { ContextProvider };
export default MatchesContext;
