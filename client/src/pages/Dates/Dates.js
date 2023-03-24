import React, { useContext, useEffect, useRef, useState } from "react";
import DateCards from "../../components/DateCards/DateCards";
import "./Dates.css";
import Pulse from "react-reveal/Pulse";
import { getAllDates } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Appbar/Navbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import io from "socket.io-client";
import { logout } from "../../actions/AuthActions";
const ENDPOINT = "http://localhost:5000";
let socket;

function Dates() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(3);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { setSocketConnected, setActiveUsers, notification, setNotification } =
    useContext(MatchesContext);
  const containerRef = useRef();
  const { dates, setDates } = useContext(MatchesContext);
  const dispatch = useDispatch();
  const {
    receivedConRequests,
    setreceivedConRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    setsentConRequests,
    sentConRequests,
    socketConnected,
    setsentDateRequests,
    connections,
    setConnections,
    sentDateRequests,
    setsentFriendRequests,
    friends,
    setFriends,
    sentFriendRequests,
  } = useContext(MatchesContext);

  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true);
      setErr(null);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllDates();
        setErr(null);
        setLoading(false);
        setDates(data);
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
    fetchDates();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("active-users", (activeUsers) => {
      setActiveUsers(activeUsers);
    });
  }, [user]);

  useEffect(() => {
    socket.on("message recieved", async (newMessageRecieved) => {
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
      }
    });
  });

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
    return () => {
      socket.off();
      setSocketConnected(false);
    };
  }, []);
  return (
    <>
      {socketConnected && <Navbar user={user} socket={socket} />}
      {socketConnected && (
        <div
          className="dates-container"
          style={{
            display: "flex",
          }}
        >
          <VerticalNavbar />

          {!loading && !err && dates.length > 0 ? (
            <div className="dates">
              <DateCards />
            </div>
          ) : !loading && !err && dates.length === 0 ? (
            <h3 className="connections-err-msg">
              No any dates yet
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </h3>
          ) : loading && !err ? (
            <div
              className="dashboard-loading-container"
              style={{ height: "100vh" }}
              ref={containerRef}
            >
              <div className="dashboard-loading-photo">
                <img src={serverPublic + "irislogo.png"} alt="loading-user" />
              </div>
            </div>
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
      )}
    </>
  );
}

export default Dates;
