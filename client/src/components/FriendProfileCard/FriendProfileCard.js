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
import { Stack } from "@mui/system";

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
    scheduledAt: new Date().toDateString(),
    dateType: "coffee",
  };
  const [dateData, setDateData] = useState(initialDate);
  const handleDateData = (event) => {
    setDateData({ ...dateData, [event.target.name]: event.target.value });
  };
  const { dates, setDates, sentDateRequests, setsentDateRequests } =
    useContext(MatchesContext);

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
                <TextField
                  id="date"
                  name="scheduledAt"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dateData.scheduledAt}
                  onChange={handleDateData}
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
          <IconButton
            onClick={
              inviteBtnVisible
                ? handleOpen
                : () => {
                    handleCancelDate(otherUser._id);
                  }
            }
          >
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
