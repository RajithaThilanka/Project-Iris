import { Button } from "@mui/material";
import React from "react";
import { users } from "../../dev-data/users";
import "./DateCard.css";
import Countdown from "react-countdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostponeDate from "../PostponeDate/PostponeDate";
function DateCard({ dateInfo }) {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <div className="date-on">
          <h6 className="text_shadows">Let's roll</h6>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <span>
          {days} days: {hours} hours :{minutes} minutes :{seconds} seconds
        </span>
      );
    }
  };

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const bkgImage = dateImgs.find((d) => d.dateType === dateInfo.dateType);
  return (
    <div className="date-card">
      {open && (
        <PostponeDate
          open={open}
          setOpen={setOpen}
          otherUser={otherUser}
          dateData={dateInfo}
        />
      )}
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
          renderer={renderer}
          date={new Date(Date.parse(dateInfo.scheduledAt)).getTime()}
        />
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
        {new Date(dateInfo.scheduledAt).toString()}
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

        <Button
          variant="contained"
          className="postpone-btn"
          onClick={handleOpen}
        >
          Postpone
        </Button>
      </div>
    </div>
  );
}

export default DateCard;
