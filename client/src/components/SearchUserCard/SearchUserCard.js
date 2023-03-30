import React from "react";
import "./SearchUserCard.css";
import { useNavigate } from "react-router-dom";

function SearchUserCard({ cardHolder }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <div className="search-user-card">
      <div className="card-holder-photo">
        <img
          src={serverPublic + cardHolder?.profilePhoto}
          alt={cardHolder?.profilePhoto}
        />
      </div>

      <div
        className="card-holder-info"
        onClick={() => navigate(`/users/profile/${cardHolder?._id}`)}
      >
        <h5 className="card-holder-name">
          {cardHolder?.firstname + " " + cardHolder?.lastname}
        </h5>
        <p className="card-holder-age">17</p>
        <p className="card-holder-country">{cardHolder?.country}</p>
      </div>
    </div>
  );
}

export default SearchUserCard;
