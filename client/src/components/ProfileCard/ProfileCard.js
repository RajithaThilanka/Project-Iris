import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";
import FlagIcon from "@mui/icons-material/Flag";
import ChatIcon from "@mui/icons-material/Chat";
import "./ProfileCard.css";
import LocationOn from "@mui/icons-material/LocationOn";
import CoffeeIcon from "@mui/icons-material/Coffee";

function ProfileCard({ user, cardType }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="profile-card"
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <img src={user.profilePhoto} alt={user.callTag} className="profile-img" />
      <h5 className="profile-call-tag">{user.callTag}</h5>

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
        <Tooltip title="Friend Request" placement="bottom">
          <IconButton>
            <PersonAddIcon />
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
          <IconButton>
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
              backgroundColor: user.status === "online" ? "#66e2b3" : "red",
            }}
          ></div>
          <div className="profile-status">
            {user.status === "online" ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
