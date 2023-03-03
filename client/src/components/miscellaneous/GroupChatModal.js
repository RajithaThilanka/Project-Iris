import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserListItem from "./UserAvatar/UserListItem";
import Modal from "@mui/material/Modal";
import MatchesContext from "../../context/matches";
import { useSelector } from "react-redux";
import { FormControl, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { createGroup, searchUser } from "../../api/UserRequests";
import Loader from "../Loading/Loading";
import UserBadgeItem from "./UserAvatar/UserBadgeItem";
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

export default function GroupChatModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [groupChatName, setGroupChatName] = React.useState();
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { chats, setChats } = React.useContext(MatchesContext);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

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
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.log("Please fill all fields");
    }
    try {
      const {
        data: {
          data: { data },
        },
      } = await createGroup(
        groupChatName,
        selectedUsers.map((u) => u._id)
      );
      setChats([data, ...chats]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h6
            style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Create Group Chat
          </h6>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <TextField
                  required
                  size="small"
                  label="Chat Group Name"
                  fullWidth
                  name="chatName"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  size="small"
                  label="Add users"
                  fullWidth
                  name="search"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedUsers.map((u) => {
                  return (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  );
                })}
              </div>

              {loading ? (
                <Loader />
              ) : (
                searchResult?.slice(0, 4).map((user) => {
                  return (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  );
                })
              )}
              <Button onClick={handleSubmit}>Create chat</Button>
            </Stack>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
