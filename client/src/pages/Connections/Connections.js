import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Connections.css";
import Pulse from "react-reveal/Pulse";
import { getAllConnections } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import Navbar from "../../components/Appbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "./Connections.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import io from "socket.io-client";
import { logout } from "../../actions/AuthActions";
const ENDPOINT = "http://localhost:5000";
let socket;
function Connections() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(1);
  const { connections, setConnections } = useContext(MatchesContext);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      setErr(null);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllConnections();
        setConnections(data);
        setErr(null);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErr(error);
        if (err.response.status === 401) {
          socket?.disconnect();
          dispatch(logout());
        }
      }
    };
    fetchConnections();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const {
    setSocketConnected,
    setActiveUsers,
    notification,
    setNotification,
    receivedConRequests,
    setreceivedConRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    setsentConRequests,
    sentConRequests,
    socketConnected,
    setsentFriendRequests,
    setsentDateRequests,
    sentDateRequests,
    sentFriendRequests,
    setFriends,
    friends,
  } = useContext(MatchesContext);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const containerRef = useRef();
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("active-users", (activeUsers) => {
      setActiveUsers(activeUsers);
    });
  }, [user]);

  useEffect(() => {
    socket.on("new-con-req-received", (newConReq) => {
      if (!receivedConRequests.some((req) => req._id === newConReq._id)) {
        setreceivedConRequests([newConReq, ...receivedConRequests]);
      }
    });

    socket.on("new-friend-req-received", (newConReq) => {
      if (!receivedFriendRequests.some((req) => req._id === newConReq._id)) {
        setreceivedFriendRequests([newConReq, ...receivedFriendRequests]);
      }
    });
    socket.on("new-con-req-accepted", (newConReq) => {
      setsentConRequests(
        sentConRequests.filter((req) => req._id !== newConReq._id)
      );
      setConnections([...connections, newConReq]);
    });
    socket.on("new-friend-req-accepted", (newConReq) => {
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req._id !== newConReq._id)
      );
      setFriends([...friends, newConReq]);

      setConnections(
        connections.filter(
          (u) =>
            u.receiverId._id !== newConReq.receiverId._id &&
            u.senderId._id !== newConReq.receiverId._id
        )
      );
    });
    socket.on("new-date-req-accepted", (newConReq) => {
      setsentDateRequests(
        sentDateRequests.filter((req) => req._id !== newConReq._id)
      );
    });
  });

  useEffect(() => {
    socket.on("message recieved", async (newMessageRecieved) => {
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);

        // setFetchAgain(!fetchAgain);
      }
    });
  });

  // useEffect(() => {
  //   containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);

  useEffect(() => {
    return () => {
      socket.off();
      setSocketConnected(false);
    };
  }, []);
  return (
    <>
      {socketConnected && <Navbar user={user} socket={socket} />}
      {socketConnected ? (
        <div
          className="connections-container"
          style={{
            display: "flex",
          }}
        >
          <VerticalNavbar />

          {!loading && !err && connections.length > 0 ? (
            <div className="connections">
              <ProfileCards cardType="connection" socket={socket} />
            </div>
          ) : !loading && !err && connections.length === 0 ? (
            <h3 className="connections-err-msg">
              No any connections yet
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </h3>
          ) : !loading && err ? (
            <h3 className="connections-err-msg">
              {err?.response?.data?.message}
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </h3>
          ) : (
            ""
          )}

          <BottomNavbar />
        </div>
      ) : (loading && !err) || !socketConnected ? (
        <div
          className="dashboard-loading-container"
          style={{ height: "100vh" }}
          ref={containerRef}
        >
          <div className="dashboard-loading-photo">
            <img src={serverPublic + "irislogo.png"} alt="loading-user" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Connections;
