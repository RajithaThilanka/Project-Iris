import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
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
  createChat,
  removeFriend,
  sendDateRequest,
  sendFriendRequest,
} from "../../api/UserRequests";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import DialogBox from "../DialogBox/DialogBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function FriendProfileCard({ conUser, cardType }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialDate = {
    scheduledAt: new Date(),
    dateType: "coffee",
  };
  const [dateData, setDateData] = useState(initialDate);
  const handleDateData = (event) => {
    setDateData({ ...dateData, [event.target.name]: event.target.value });
  };
  const handleScheduledAt = (value) => {
    setDateData({ ...dateData, scheduledAt: value });
  };
  const {
    dates,
    setDates,
    sentDateRequests,
    setsentDateRequests,
    activeUsers,
    setFriends,
    friends,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  } = useContext(MatchesContext);
  const navigate = useNavigate();
  const otherUser =
    conUser.senderId._id === user._id ? conUser.receiverId : conUser.senderId;
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
  // const t = dates.find((date) => {
  //   return (
  //     date.senderId._id === otherUser._id ||
  //     date.receiverId._id === otherUser._id
  //   );
  // });

  const [inviteBtnVisible, setInviteBtnVisible] = useState();
  const [alreadyHasDate, setAlreadyHasDate] = useState();

  const [visible, setVisible] = useState(false);

  const handleRemoveFriend = async (id) => {
    try {
      await removeFriend(id);
      setFriends(
        friends.filter((con) => {
          return con._id !== conUser._id;
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

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const t = dates.find((date) => {
      return (
        date.senderId._id === otherUser._id ||
        date.receiverId._id === otherUser._id
      );
    });

    t ? setAlreadyHasDate(true) : setAlreadyHasDate(false);
    t ? setInviteBtnVisible(false) : setInviteBtnVisible(true);
  }, [dates]);
  const handleSendDateRequest = async (id) => {
    try {
      setInviteBtnVisible(false);

      const {
        data: {
          data: { data },
        },
      } = await sendDateRequest(id, dateData);
      setsentDateRequests([...sentDateRequests, data]);
      setDates([...dates, data]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDate = async (id) => {
    try {
      setInviteBtnVisible(true);
      setsentDateRequests(
        sentDateRequests.filter((dt) => {
          return dt.receiverId._id != otherUser._id;
        })
      );
      setDates(
        dates.filter((dt) => {
          return dt.receiverId._id != otherUser._id;
        })
      );
      await cancelDateRequest(id);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="date-invite-container">
            <h2>Invite {otherUser.firstname} for a date</h2>

            <Stack spacing={2} direction="column">
              <div>
                <FormHelperText sx={{ marginLeft: "8px" }}>
                  Schedule your date
                </FormHelperText>
                {/* <TextField
                  id="date"
                  name="scheduledAt"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dateData.scheduledAt}
                  onChange={handleDateData}
                /> */}
                <DateTimePicker
                  value={dateData.scheduledAt}
                  onChange={handleScheduledAt}
                  minDate={new Date()}
                />
              </div>
              <div>
                <FormHelperText sx={{ marginLeft: "8px" }}>
                  How would you like to be your date?
                </FormHelperText>
                <Select
                  name="dateType"
                  fullWidth
                  size="small"
                  value={dateData.dateType}
                  onChange={handleDateData}
                >
                  <MenuItem key="coffee" value="coffee">
                    Coffee
                  </MenuItem>
                  <MenuItem key="rainy" value="rainy">
                    Rainy
                  </MenuItem>
                  <MenuItem key="summer" value="summer">
                    Summer
                  </MenuItem>
                  <MenuItem key="winter" value="winter">
                    Winter
                  </MenuItem>
                </Select>
              </div>
              <Button
                type="contained"
                onClick={() => handleSendDateRequest(otherUser._id)}
              >
                Invite
              </Button>
            </Stack>
          </div>
        </Box>
      </Modal>

      <img
        src={serverPublic + otherUser.profilePhoto}
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
          <IconButton style={{ color: "#fff" }}>
            <AccountCircleIcon className="profile-card-btn" />
          </IconButton>
        </Tooltip>

        {inviteBtnVisible ? (
          <Tooltip title={"Invite date"} placement="bottom">
            <IconButton
              onClick={handleOpen}
              style={{ color: "#fff" }}
              disabled={alreadyHasDate}
            >
              <CoffeeIcon className="profile-card-btn" />
            </IconButton>
          </Tooltip>
        ) : (
          <DialogBox
            title="Confirm Cancel"
            content="Are you sure to cancel date invitation?"
            YesBtn="Confirm"
            NoBtn="Cancel"
            handleYes={() => {
              handleCancelDate(otherUser._id);
            }}
          >
            <Tooltip title={"Cancel date invite"} placement="bottom">
              <IconButton style={{ color: "#fff" }} disabled={alreadyHasDate}>
                <CancelIcon className="profile-card-btn" />
              </IconButton>
            </Tooltip>
          </DialogBox>
        )}

        {/* <Tooltip
          title={inviteBtnVisible ? "Invite date" : "Cancel date invite"}
          placement="bottom"
        >
          <IconButton
            onClick={
              inviteBtnVisible
                ? handleOpen
                : () => {
                    handleCancelDate(otherUser._id);
                  }
            }
            style={{ color: "#fff" }}
            disabled={alreadyHasDate}
          >
            {inviteBtnVisible ? (
              <CoffeeIcon className="profile-card-btn" />
            ) : (
              <CancelIcon className="profile-card-btn" />
            )}
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Message" placement="bottom">
          <IconButton style={{ color: "#fff" }} onClick={accessChat}>
            <ChatIcon className="profile-card-btn" />
          </IconButton>
        </Tooltip>
        <DialogBox
          title="Confirm Downgrade"
          content="Are you sure to downgrade to connection level?"
          YesBtn="Confirm"
          NoBtn="Cancel"
          handleYes={() => {
            handleRemoveFriend(otherUser._id);
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
            {activeUsers.some((user) => user.userId === otherUser._id)
              ? "Online"
              : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendProfileCard;
