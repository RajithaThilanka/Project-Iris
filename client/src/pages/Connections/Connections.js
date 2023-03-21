import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Connections.css";
import Pulse from "react-reveal/Pulse";
import { getAllConnections } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import Navbar from "../../components/Appbar/Navbar";
import { useSelector } from "react-redux";
import "./Connections.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket;
function Connections() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(1);
  const { connections, setConnections } = useContext(MatchesContext);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      setErr(false);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllConnections();
        setConnections(data);
        setErr(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErr(true);
      }
    };
    fetchConnections();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { setSocketConnected, setActiveUsers, notification, setNotification } =
    useContext(MatchesContext);
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
    socket.on("message recieved", async (newMessageRecieved) => {
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
        // setFetchAgain(!fetchAgain);
      }
    });
  });

  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div
        className="connections-container"
        style={{
          display: "flex",
        }}
      >
        <VerticalNavbar />

        {!loading && !err && connections.length > 0 ? (
          <div className="connections">
            <ProfileCards cardType="connection" />
          </div>
        ) : !loading && !err && connections.length === 0 ? (
          <h3 className="connections-err-msg">
            No any connections yet
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
            Something went wrong
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

export default Connections;
