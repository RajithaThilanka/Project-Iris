import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Friends.css";
import Pulse from "react-reveal/Pulse";
import MatchesContext from "../../context/matches";
import { getAllDates, getAllFriends } from "../../api/UserRequests";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import Navbar from "../../components/Appbar/Navbar";
import { useSelector } from "react-redux";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket;
function Friends() {
  const { friends, setFriends } = useContext(MatchesContext);
  const { dates, setDates } = useContext(MatchesContext);
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const { setSocketConnected, setActiveUsers, notification, setNotification } =
    useContext(MatchesContext);

  setActiveTab(2);
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setErr(null);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllFriends();

        setFriends(data);
        setErr(null);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErr(error);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true);
      setErr(false);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllDates();

        setDates(data);
        setErr(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setErr(err);
      }
    };
    fetchDates();
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
        // setFetchAgain(!fetchAgain);
      }
    });
  });

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const containerRef = useRef();
  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    return () => {
      socket.off();
    };
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div
        className="friends-container"
        style={{
          display: "flex",
        }}
      >
        <VerticalNavbar />
        {!loading && !err && friends.length > 0 ? (
          <div className="friends">
            <ProfileCards cardType="friend" />
          </div>
        ) : !loading && !err && friends.length === 0 ? (
          <h3 className="connections-err-msg">
            No any friends yet
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
            {console.log(err)}
            {err?.response?.data?.message}
            <SentimentVeryDissatisfiedIcon fontSize="large" />
          </h3>
        ) : (
          ""
        )}

        <BottomNavbar />
      </div>
    </>
  );
}

export default Friends;
