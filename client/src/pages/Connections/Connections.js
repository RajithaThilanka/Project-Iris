import React, { useContext, useEffect, useState } from "react";
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
function Connections() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(1);
  const { connections, setConnections } = useContext(MatchesContext);
  useEffect(() => {
    const fetchConnections = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getAllConnections();
      setConnections(data);
    };
    fetchConnections();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  return (
    <>
      <Navbar user={user} />
      <div
        className="connections-container"
        style={{
          display: "flex",
          backgroundImage:
            "radial-gradient(at top left,var(--color-primary) 1%,transparent)",
        }}
      >
        <VerticalNavbar />
        <Pulse>
          <div className="connections">
            <ProfileCards cardType="connection" />
          </div>
        </Pulse>
      </div>
    </>
  );
}

export default Connections;
