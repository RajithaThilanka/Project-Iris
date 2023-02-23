import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileCards.css";

function ProfileCards({ users, cardType }) {
  const renderedCards = users.map((user) => {
    return <ProfileCard user={user} cardType={cardType} />;
  });
  return <div className="profile-cards">{renderedCards}</div>;
}

export default ProfileCards;
