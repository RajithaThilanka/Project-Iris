import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";
import FlagIcon from "@mui/icons-material/Flag";
import ChatIcon from "@mui/icons-material/Chat";
import "./FriendProfileCard.css";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOn from "@mui/icons-material/LocationOn";
import CoffeeIcon from "@mui/icons-material/Coffee";
import {
  cancelDateRequest,
  cancelFriendRequest,
  sendDateRequest,
  sendFriendRequest,
} from "../../api/UserRequests";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";

function FriendProfileCard({ conUser, cardType }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const {
    dates,
    setDates,
    receivedDateRequests,
    setreceivedDateRequests,
    sentDateRequests,
    setsentDateRequests,
  } = useContext(MatchesContext);

  const otherUser =
    conUser.senderId._id === user._id ? conUser.receiverId : conUser.senderId;

  const t = dates.find((date) => {
    return (
      date.senderId._id === otherUser._id ||
      date.receiverId._id === otherUser._id
    );
  });

  const [inviteBtnVisible, setInviteBtnVisible] = useState(t ? false : true);

  const [visible, setVisible] = useState(false);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleSendDateRequest = async (id) => {
    try {
      if (inviteBtnVisible) {
        setInviteBtnVisible(false);
        await sendDateRequest(id);
      } else {
        setInviteBtnVisible(true);
        await cancelDateRequest(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveConnection = async (id) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="profile-card"
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <img
        src={
          otherUser?.profilePhoto
            ? serverPublic + otherUser.profilePhoto
            : serverPublic + "defaultProfile.png"
        }
        alt={otherUser.callTag}
        className="profile-img"
      />
      <h5 className="profile-call-tag">{otherUser.callTag}</h5>

      <div
        className="profile-buttons"
        style={{
          display: visible ? "flex" : "none",
        }}
      >
        <Tooltip title="View Profile" placement="bottom">
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={inviteBtnVisible ? "Invite date" : "Cancel date invite"}
          placement="bottom"
        >
          <IconButton onClick={() => handleSendDateRequest(otherUser._id)}>
            {inviteBtnVisible ? <CoffeeIcon /> : <CancelIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Message" placement="bottom">
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Tooltip>
        {cardType === "friend" && (
          <Tooltip title="Invite for a date" placement="bottom">
            <IconButton>
              <CoffeeIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Demote" placement="bottom">
          <IconButton
            onClick={() => {
              handleRemoveConnection(otherUser._id);
            }}
          >
            <PersonRemoveAlt1Icon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Block and Report" placement="bottom">
          <IconButton>
            <BlockIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="profile-header">
        <div className="profile-status-container">
          <div
            className="online--dot"
            style={{
              backgroundColor: "#66e2b3",
            }}
          ></div>
          <div className="profile-status">Online</div>
        </div>
      </div>
    </div>
  );
}

export default FriendProfileCard;
