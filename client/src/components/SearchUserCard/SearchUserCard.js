import React from "react";
import "./SearchUserCard.css";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function SearchUserCard({ cardHolder }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <div className="search-user-card">
      <div className="card-holder-photo">
        <LazyLoadImage
          effect="blur"
          src={serverPublic + cardHolder?.profilePhoto}
          alt={cardHolder?.profilePhoto}
        />
      </div>

      <div
        className="card-holder-info"
        onClick={() => navigate(`/users/uprofile/${cardHolder?._id}`)}
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
