import React, { useContext, useEffect, useState } from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Connections.css";
import Pulse from "react-reveal/Pulse";
import { getAllConnections } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";

function Connections() {
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

  return (
    <Pulse>
      <div className="connections-container">
        <ProfileCards cardType="connection" />
      </div>
    </Pulse>
  );
}

export default Connections;
