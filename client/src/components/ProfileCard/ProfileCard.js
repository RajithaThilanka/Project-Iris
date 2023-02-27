import { IconButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";

import ChatIcon from "@mui/icons-material/Chat";
import "./ProfileCard.css";
import CancelIcon from "@mui/icons-material/Cancel";

import CoffeeIcon from "@mui/icons-material/Coffee";
import {
  cancelFriendRequest,
  removeConnection,
  sendFriendRequest,
} from "../../api/UserRequests";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";

function ProfileCard({ conUser, cardType }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const otherUser =
    conUser.senderId._id === user._id ? conUser.receiverId : conUser.senderId;

  const {
    sentFriendRequests,
    setsentFriendRequests,
    connections,
    setConnections,
  } = useContext(MatchesContext);

  const [visible, setVisible] = useState(false);
  const [requestSent, setRequestSent] = useState(
    conUser.status === "friend-req-pending"
  );

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleSendFriendRequest = async (id) => {
    try {
      if (!requestSent) {
        setRequestSent(true);

        const {
          data: {
            data: { data },
          },
        } = await sendFriendRequest(id);
        setsentFriendRequests([...sentFriendRequests, data]);
      } else if (requestSent && conUser.senderId._id === user._id) {
        setRequestSent(false);
        await cancelFriendRequest(id);
        setsentFriendRequests(
          sentFriendRequests.filter(
            (req) => req.receiverId._id != otherUser._id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveConnection = async (id) => {
    try {
      setConnections(
        connections.filter((con) => {
          return con._id !== conUser._id;
        })
      );
      await removeConnection(id);
    } catch (error) {
      console.log(error);
    }
  };
  // add friend btn => friend-req not pending
  // cancel request => friend-req pending and senderId = userId
  // accept request => friend-req pending and senderID = otherUserId
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
          title={
            !requestSent
              ? "Add friend"
              : requestSent && conUser.senderId._id === user._id
              ? "Cancel request"
              : null
          }
          placement="bottom"
        >
          <IconButton
            onClick={() => handleSendFriendRequest(otherUser._id)}
            disabled={requestSent && conUser.senderId._id !== user._id}
          >
            {!requestSent ? (
              <PersonAddIcon />
            ) : requestSent && conUser.senderId._id === user._id ? (
              <CancelIcon />
            ) : (
              <PersonAddIcon />
            )}
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

export default ProfileCard;
