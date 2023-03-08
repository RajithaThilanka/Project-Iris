import { Button } from "@mui/material";
import React from "react";
import { users } from "../../dev-data/users";
import "./DateCard.css";
import Countdown from "react-countdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function DateCard({ dateInfo }) {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const otherUser =
    dateInfo.senderId._id === user._id
      ? dateInfo.receiverId
      : dateInfo.senderId;
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

      <div className="date-time-remaining">
        <Countdown
          date={new Date(Date.parse(dateInfo.scheduledAt)).getTime()}
        />
        <span style={{ marginLeft: "5px" }}> remaining</span>
      </div>
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
        {new Date(Date.parse(dateInfo.scheduledAt)).toUTCString()}
      </div>
      <div className="date-btn-container">
        <Button
          variant="contained"
          className="go-to-date-btn"
          onClick={() =>
            navigate(`/video-date/${otherUser._id}`, { replace: true })
          }
          disabled={
            new Date(Date.parse(dateInfo.scheduledAt)).getTime() > Date.now()
          }
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
