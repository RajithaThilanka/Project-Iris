import React from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Connections.css";
import Pulse from "react-reveal/Pulse";
function Connections() {
  const db = users;
  console.log(users);
  return (
    <Pulse>
      <div className="connections-container">
        <ProfileCards users={db} />
      </div>
    </Pulse>
  );
}

export default Connections;
