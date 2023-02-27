import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import FriendProfileCard from "../FriendProfileCard/FriendProfileCard";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileCards.css";

function ProfileCards({ cardType }) {
  const { connections } = useContext(MatchesContext);
  const { friends } = useContext(MatchesContext);
  let renderedCards = null;
  cardType === "connection"
    ? (renderedCards = connections.map((user) => {
        return (
          <ProfileCard conUser={user} cardType={cardType} key={user._id} />
        );
      }))
    : (renderedCards = renderedCards =
        friends.map((user) => {
          return (
            <FriendProfileCard
              conUser={user}
              cardType={cardType}
              key={user._id}
            />
          );
        }));
  return <div className="profile-cards">{renderedCards}</div>;
}

export default ProfileCards;
