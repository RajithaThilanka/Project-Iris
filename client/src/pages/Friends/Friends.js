import React from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Friends.css";
import Pulse from "react-reveal/Pulse";
function Friends() {
  const db = users;
  console.log(users);
  return (
    <Pulse>
      <div className="friends-container">
        <ProfileCards users={db} cardType="friend" />
      </div>
    </Pulse>
  );
}

export default Friends;
