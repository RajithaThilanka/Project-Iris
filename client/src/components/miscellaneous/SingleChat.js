import { Icon, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/UserAvatar/ProfileModal";
import PreviewIcon from "@mui/icons-material/Preview";
import UpdatedGroupChatModel from "./UpdateGroupChatModal";
function SingleChat({ fetchAgain, setFetchAgain }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { selectedChat, setSelectedChat } = useContext(MatchesContext);
  const [modalOpen, setOpen] = React.useState(false);
  return (
    <>
      {selectedChat ? (
        <>
          <span
            style={{
              fontSize: "28px",
              padding: "0 18px 12px 12px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              style={{ display: "flex" }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIosIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <IconButton onClick={() => setOpen(true)}>
                  <PreviewIcon />
                </IconButton>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                  modalOpen={modalOpen}
                  handleCloseModal={() => setOpen(false)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdatedGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "18px",
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            Messages here
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <span style={{ fontSize: "3rem" }}>
            Click on a user to start chatting
          </span>
        </div>
      )}
    </>
  );
}

export default SingleChat;
