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
function Connections() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(1);
  const { connections, setConnections } = useContext(MatchesContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllConnections();
        setConnections(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const containerRef = useRef();

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

        {!loading && connections.length > 0 && (
          <div className="connections">
            <ProfileCards cardType="connection" />
          </div>
        )}

        {loading && (
          <div
            className="dashboard-loading-container"
            style={{ height: "100vh" }}
            ref={containerRef}
          >
            <div className="dashboard-loading-photo">
              <img src={serverPublic + "irislogo.png"} alt="loading-user" />
            </div>
          </div>
        )}
        <BottomNavbar />
      </div>
    </>
  );
}

export default Connections;
