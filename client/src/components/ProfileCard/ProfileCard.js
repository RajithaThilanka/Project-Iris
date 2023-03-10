import { IconButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";

import ChatIcon from "@mui/icons-material/Chat";
import "./ProfileCard.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoffeeIcon from "@mui/icons-material/Coffee";
import {
  acceptFriend,
  cancelFriendRequest,
  createChat,
  removeConnection,
  sendFriendRequest,
} from "../../api/UserRequests";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";
import { useNavigate } from "react-router-dom";

function ProfileCard({ conUser, cardType }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const otherUser =
    conUser.senderId._id === user._id ? conUser.receiverId : conUser.senderId;
  const { activeUsers } = useContext(MatchesContext);
  const {
    sentFriendRequests,
    setsentFriendRequests,
    connections,
    setConnections,
    setreceivedFriendRequests,
    receivedFriendRequests,
    friends,
    setFriends,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  } = useContext(MatchesContext);

  const [visible, setVisible] = useState(false);
  const [requestSent, setRequestSent] = useState(
    conUser.status === "friend-req-pending"
  );
  const navigate = useNavigate();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleSendFriendRequest = async (id) => {
    try {
      setRequestSent(true);
      const {
        data: {
          data: { data },
        },
      } = await sendFriendRequest(id);
      setsentFriendRequests([...sentFriendRequests, data]);
      toast.success("Friend request sent", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const accessChat = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await createChat(otherUser._id);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      navigate("/me/chat");
      //   toggleDrawer(anchor, false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveConnection = async (id) => {
    console.log(id);
    try {
      await removeConnection(id);
      setConnections(
        connections.filter((con) => {
          return con._id !== conUser._id;
        })
      );
      toast.success("Connection removed", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleAcceptFriendRequest = async (id) => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await acceptFriend(id);
      setreceivedFriendRequests(
        receivedFriendRequests.filter((req) => req.senderId._id !== id)
      );
      setConnections(connections.filter((u) => u.senderId._id !== id));
      setFriends([...friends, data]);
      setRequestSent(true);
      toast.success("Friend request accepted", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleCancelFriendRequest = async (id) => {
    try {
      await cancelFriendRequest(id);
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req.receiverId._id !== id)
      );
      setreceivedFriendRequests(
        receivedFriendRequests.filter((req) => req.senderId._id !== id)
      );
      setRequestSent(false);
      toast.success("Friend request cancelled", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
          <IconButton style={{ color: "var(--color-primary)" }}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        {!requestSent ? (
          <IconButton
            onClick={() => handleSendFriendRequest(otherUser._id)}
            style={{ color: "var(--color-primary)" }}
          >
            <Tooltip title="add friend">
              <PersonAddIcon />
            </Tooltip>
          </IconButton>
        ) : requestSent && conUser.senderId._id === user._id ? (
          <IconButton
            onClick={() => handleCancelFriendRequest(otherUser._id)}
            style={{ color: "var(--color-primary)" }}
          >
            <Tooltip title="cancel request">
              <CancelIcon />
            </Tooltip>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleAcceptFriendRequest(otherUser._id)}
            style={{ color: "var(--color-primary)" }}
          >
            <Tooltip title="accept request">
              <PersonAddIcon />
            </Tooltip>
          </IconButton>
        )}

        <Tooltip title="Message" placement="bottom">
          <IconButton
            style={{ color: "var(--color-primary)" }}
            onClick={accessChat}
          >
            <ChatIcon />
          </IconButton>
        </Tooltip>
        {cardType === "friend" && (
          <Tooltip title="Invite for a date" placement="bottom">
            <IconButton style={{ color: "var(--color-primary)" }}>
              <CoffeeIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Demote" placement="bottom">
          <IconButton
            onClick={() => {
              handleRemoveConnection(otherUser._id);
            }}
            style={{ color: "var(--color-primary)" }}
          >
            <PersonRemoveAlt1Icon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Block and Report" placement="bottom">
          <IconButton style={{ color: "var(--color-primary)" }}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="profile-header">
        <div className="profile-status-container">
          {activeUsers.some((user) => user.userId === otherUser._id) ? (
            <div className="suggestion-online--dot"></div>
          ) : (
            <div className="suggestion-offline--dot"></div>
          )}
          <div className="profile-status">
            {" "}
            {activeUsers.some((user) => user.userId === otherUser._id)
              ? "Online"
              : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
