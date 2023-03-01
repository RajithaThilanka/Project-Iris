import { Box, Button, Drawer, TextField, Tooltip } from "@mui/material";
import { createChat, searchUser } from "../../api/UserRequests";

import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";
import Loader from "../Loading/Loading";
import UserListItem from "./UserAvatar/UserListItem";
import MatchesContext from "../../context/matches";
function Sidedrawer() {
  const anchor = "left";
  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  } = useContext(MatchesContext);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
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
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const {
        data: {
          data: { data },
        },
      } = await createChat(userId);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      //   toggleDrawer(anchor, false);
    } catch (error) {
      console.log(error);
    }
  };
  const list = (anchor) => (
    <Box sx={{ width: 400, padding: "3rem" }} role="presentation">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          required
          placeholder="Search by name or email"
          sx={{ mr: "16px", flex: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
        />
        <Button onClick={handleSearch}>Go</Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        searchResult?.map((user) => {
          return (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          );
        })
      )}
      {loadingChat && <Loader />}
    </Box>
  );

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          padding: "5px 10px 5px 10px",
          borderWidth: "5px",
        }}
      >
        <Tooltip title="Search users to chat" placement="bottom-end">
          <Button variant="ghost" onClick={toggleDrawer(anchor, true)}>
            <SearchIcon />
            <span style={{ padding: "2px" }}>Search User</span>
          </Button>
        </Tooltip>
        <h3>Iris</h3>
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "space-around",
            alignItems: "center",
            wrap: "no-wrap",
          }}
        >
          <NotificationMenu />
          <ProfileMenu />
        </div>
      </Box>
      <div>
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}

export default Sidedrawer;
