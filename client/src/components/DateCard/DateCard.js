import { Button, Link } from "@mui/material";
import React from "react";
import { users } from "../../dev-data/users";
import "./DateCard.css";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
function DateCard({ dateInfo }) {
  const navigate = useNavigate();
  const dateImgs = [
    {
      dateType: "coffee",
      img: "coffeedate.webp",
    },
    {
      dateType: "rainy",
      img: "rainydate.jpg",
    },
    {
      dateType: "summer",
      img: "summerdate.jpg",
    },
    {
      dateType: "winter",
      img: "winterdate.jpg",
    },
  ];
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const bkgImage = dateImgs.find((d) => d.dateType === dateInfo.dateType);
  return (
    <div className="date-card">
      <div
        className="date-card-img"
        style={{
          backgroundImage: `linear-gradient(
      to right bottom,
      var(--color-grey-light-1),
      transparent
    ),
    url("${serverPublic + bkgImage.img}")`,
        }}
      ></div>

      <div className="date-time-remaining">3 days reamaining</div>
      <div className="date-partners">
        <div className="partner">
          <img
            src={serverPublic + dateInfo.senderId.profilePhoto}
            alt=""
            className="partner-img"
          />
          <h3 className="partner-name">{dateInfo.senderId.callTag}</h3>
        </div>
        <div className="partner">
          <img
            src={serverPublic + dateInfo.receiverId.profilePhoto}
            alt=""
            className="partner-img"
          />
          <h3 className="partner-name">{dateInfo.receiverId.callTag}</h3>
        </div>
      </div>
      <div className="date-scheduled-at">
        {new Date(dateInfo.scheduledAt).toLocaleString()}
      </div>
      <div className="date-btn-container">
        <Button
          variant="contained"
          className="go-to-date-btn"
          onClick={() => navigate(`/chat/${dateInfo._id}`)}
        >
          Go to date
        </Button>
        <Button variant="contained" className="postpone-btn">
          Postpone
        </Button>
      </div>
    </div>
  );
}

export default DateCard;
