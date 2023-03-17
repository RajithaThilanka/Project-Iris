import { createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import { io } from "socket.io-client";
const MatchesContext = createContext();
const socket = io("http://localhost:5000");
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
  const [selectedDateChat, setSelectedDateChat] = useState();
  const [chats, setChats] = useState([]);
  const [dateChats, setDateChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState({
    age: [18, 100],
    gender: {
      male: true,
      female: true,
    },
    countries: [],
    languages: [],
  });
  const valueToShare = {
    filter,
    setFilter,
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
    activeTab,
    setActiveTab,
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
    selectedDateChat,
    setSelectedDateChat,
    dateChats,
    setDateChats,

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
