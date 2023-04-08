import { IconButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import "./ProfileCard.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
import DialogBox from "../DialogBox/DialogBox";

function ProfileCard({ conUser, cardType, socket }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const otherUser =
    conUser.senderId._id === user._id ? conUser.receiverId : conUser.senderId;
  const { activeUsers, dates, setDates } = useContext(MatchesContext);
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
      socket.emit("new-friend-request-sent", data);
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
    } catch (error) {}
  };

  //view suggestion profile
  const viewPro = async () => {
    try {
      navigate("/me/suggession/profile/");
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
      // setDates(
      //   dates.filter((dt) => {
      //     return (
      //       dt.senderId + "" != otherUser._id + "" &&
      //       dt.receiverId + "" != otherUser._id + ""
      //     );
      //   })
      // );
      setsentFriendRequests(
        sentFriendRequests.filter(
          (req) =>
            req.senderId._id + "" != otherUser._id + "" &&
            req.receiverId._id + "" != otherUser._id + ""
        )
      );

      setreceivedFriendRequests(
        receivedFriendRequests.filter(
          (req) =>
            req.senderId._id + "" != otherUser._id + "" &&
            req.receiverId._id + "" != otherUser._id + ""
        )
      );

      setChats(
        chats.filter((ch) => {
          const users = ch.users.map((u) => u._id);
          return !users.includes(otherUser._id);
        })
      );
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
      <div className="image-section">
        <LazyLoadImage
          effect="blur"
          src={serverPublic + otherUser.profilePhoto}
          alt={otherUser.callTag}
          className="profile-img"
        />
      </div>
      <h5 className="profile-call-tag">{otherUser.callTag}</h5>

      <div
        className="profile-buttons"
        // style={{
        //   display: visible ? "flex" : "none",
        // }}
      >
        <Tooltip title="View Profile" placement="bottom">
          <IconButton
            style={{ color: "#fff" }}
            onClick={() => navigate(`/users/profile/${otherUser._id}`)}
          >
            <AccountCircleIcon className="profile-card-btn" />
          </IconButton>
        </Tooltip>

        {!requestSent ? (
          <DialogBox
            title="Confirm Upgrade"
            content="Are you sure to add this connection as a friend?"
            YesBtn="Confirm"
            NoBtn="Cancel"
            handleYes={() => handleSendFriendRequest(otherUser._id)}
          >
            <IconButton style={{ color: "#fff" }}>
              <Tooltip title="add friend">
                <PersonAddIcon className="profile-card-btn" />
              </Tooltip>
            </IconButton>
          </DialogBox>
        ) : requestSent && conUser.senderId._id === user._id ? (
          <DialogBox
            title="Confirm Cancel"
            content="Are you sure to cancel friend invite?"
            YesBtn="Confirm"
            NoBtn="Cancel"
            handleYes={() => handleCancelFriendRequest(otherUser._id)}
          >
            <IconButton style={{ color: "#fff" }}>
              <Tooltip title="cancel request">
                <CancelIcon className="profile-card-btn" />
              </Tooltip>
            </IconButton>
          </DialogBox>
        ) : (
          <IconButton
            onClick={() => handleAcceptFriendRequest(otherUser._id)}
            style={{ color: "#fff" }}
          >
            <Tooltip title="accept request">
              <PersonAddIcon className="profile-card-btn" />
            </Tooltip>
          </IconButton>
        )}

        <Tooltip title="Message" placement="bottom">
          <IconButton style={{ color: "#fff" }} onClick={accessChat}>
            <ChatIcon className="profile-card-btn" />
          </IconButton>
        </Tooltip>
        {cardType === "friend" && (
          <Tooltip title="Invite for a date" placement="bottom">
            <IconButton style={{ color: "#fff" }}>
              <CoffeeIcon className="profile-card-btn" />
            </IconButton>
          </Tooltip>
        )}

        <DialogBox
          title="Confirm Removal"
          content="Are you sure to remove this connection?"
          YesBtn="Confirm"
          NoBtn="Cancel"
          handleYes={() => {
            handleRemoveConnection(otherUser._id);
          }}
        >
          <Tooltip title="Demote" placement="bottom">
            <IconButton style={{ color: "#fff" }}>
              <PersonRemoveAlt1Icon className="profile-card-btn" />
            </IconButton>
          </Tooltip>
        </DialogBox>

        <Tooltip title="Block and Report" placement="bottom">
          <IconButton style={{ color: "#fff" }}>
            <BlockIcon className="profile-card-btn" />
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
