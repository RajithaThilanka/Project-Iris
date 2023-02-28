import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, IconButton, TextField } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import MatchesContext from "../../context/matches";
import UserBadgeItem from "./UserAvatar/UserBadgeItem";
import {
  adduser,
  removeUser,
  renameGroup,
  searchUser,
} from "../../api/UserRequests";
import Loader from "../Loading/Loading";
import UserListItem from "./UserAvatar/UserListItem";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdatedGroupChatModel({
  children,
  fetchAgain,
  setFetchAgain,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { selectedChat, setSelectedChat } = React.useContext(MatchesContext);
  const [groupChatName, setGroupChatName] = React.useState();
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [renameLoading, setRenameLoading] = React.useState(false);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const {
        data: {
          data: { data },
        },
      } = await renameGroup(selectedChat._id, groupChatName);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const {
        data: {
          data: { data },
        },
      } = await searchUser(search);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) return;
    if (selectedChat.groupAdmin._id !== user._id) return;

    try {
      setLoading(true);

      const {
        data: {
          data: { data },
        },
      } = await adduser(selectedChat._id, user1._id);

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id)
      return;

    try {
      setLoading(true);
      const {
        data: {
          data: { data },
        },
      } = await removeUser(selectedChat._id, user1._id);

      //   if logged in user removes himself
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <IconButton sx={{ display: "flex" }} onClick={handleOpen}>
        <PreviewIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "35px", display: "flex", justifyContent: "center" }}
          >
            {selectedChat.chatName}
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              paddingBottom: "18px",
            }}
          >
            {selectedChat.users.map((u) => {
              return (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignContent: "center",
              marginBottom: "2rem",
            }}
          >
            <FormControl>
              <TextField
                required
                size="small"
                label="Chat Name"
                fullWidth
                name="chatName"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <Button variant="contained" onClick={handleRename}>
              Update
            </Button>
          </div>
          <TextField
            required
            size="small"
            label="Add user to group"
            fullWidth
            name="adduser"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div
            style={{
              overflow: "scroll",
              height: "40%",
              marginTop: "10px",
              boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
            }}
          >
            {loading ? (
              <Loader />
            ) : (
              searchResult?.map((u) => {
                return (
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleAddUser(u)}
                  />
                );
              })
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Button variant="contained">Update</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
