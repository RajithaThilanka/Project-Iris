import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { logout } from "../../actions/AuthActions";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { useDispatch } from "react-redux";
import { BsFillPersonCheckFill } from "react-icons/bs";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { BsFillPersonFill } from "react-icons/bs";
import "./Navbar.css";
import Requests from "../Requests/Requests";
import FriendRequests from "../FriendRequests/FriendRequests";
import DateRequests from "../DateRequests/DateRequests";
import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MatchesContext from "../../context/matches";
import {
  fetchWarnings,
  getAllFriends,
  getReceivedConRequests,
  getReceivedDateRequests,
  getReceivedFriendRequests,
  getSentConRequests,
  getSentDateRequests,
  getSentFriendRequests,
} from "../../api/UserRequests";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import { fetchChatNotifications } from "../../api/ChatRequests";

const pages = ["Explore", "Safety Tips", "About Us"];
// const settings = ["Account", "Dashboard"];
const settings = [
  { label: "Account", to: "/me" },
  { label: "Dashboard", to: "/me" },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
function Navbar({ user, socket }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElFriend, setAnchorElFriend] = useState(null);
  const [anchorElConnection, setAnchorElConnection] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);
  const [anchorElNot, setAnchorElNot] = useState(null);
  const [dateRequests, setDateRequests] = useState();
  const dispatch = useDispatch();

  const handleOpenNotMenu = (event) => {
    setAnchorElNot(event.currentTarget);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenDateMenu = (event) => {
    setAnchorElDate(event.currentTarget);
  };
  const handleOpenFriendMenu = (event) => {
    setAnchorElFriend(event.currentTarget);
  };
  const handleOpenConnectionMenu = (event) => {
    setAnchorElConnection(event.currentTarget);
  };
  const handleCloseNotMenu = () => {
    setAnchorElNot(null);
  };
  const handleCloseFriendMenu = () => {
    setAnchorElFriend(null);
  };
  const handleCloseDateMenu = () => {
    setAnchorElDate(null);
  };
  const handleCloseConnectionMenu = () => {
    setAnchorElConnection(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const {
    sentConRequests,
    setsentConRequests,
    receivedConRequests,
    setreceivedConRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    sentFriendRequests,
    setsentFriendRequests,
    setFriends,
    socketConnected,
    setSocketConnected,
    sentDateRequests,
    receivedDateRequests,
    setsentDateRequests,
    setreceivedDateRequests,
    notification,
    setNotification,
    warnings,
    setWarnings,
    fetchNots,
    setFetchNots,
  } = useContext(MatchesContext);
  useEffect(() => {
    const fetchsentConRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getSentConRequests();
      setsentConRequests(data);
    };
    fetchsentConRequests();
  }, []);

  useEffect(() => {
    const fetchreceivedConRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getReceivedConRequests();
      setreceivedConRequests(data);
    };
    fetchreceivedConRequests();
  }, []);
  useEffect(() => {
    const fetchsentFriendRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getSentFriendRequests();

      setsentFriendRequests(data);
    };
    fetchsentFriendRequests();
  }, []);

  useEffect(() => {
    const fetchreceivedFriendRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getReceivedFriendRequests();
      setreceivedFriendRequests(data);
    };
    fetchreceivedFriendRequests();
  }, []);
  useEffect(() => {
    const fetchsentDateRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getSentDateRequests();
      setsentDateRequests(data);
      //   console.log(sentConRequests);
    };
    fetchsentDateRequests();
  }, []);

  useEffect(() => {
    const fetchreceivedDateRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getReceivedDateRequests();
      setreceivedDateRequests(data);
    };
    fetchreceivedDateRequests();
  }, []);

  useEffect(() => {
    const fetchNewWarnings = async () => {
      const {
        data: {
          data: { data },
        },
      } = await fetchWarnings();

      setWarnings(data);
    };
    fetchNewWarnings();
  }, []);
  useEffect(() => {
    const fetchChatNots = async () => {
      const {
        data: {
          data: { data },
        },
      } = await fetchChatNotifications();

      setFetchNots(false);
      setNotification(data);
    };
    fetchNots && fetchChatNots();
  }, []);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100vw",
        backgroundColor: "var(--color-grey-dark-1)",
        top: 0,
        left: 0,
      }}
    >
      <Container
        sx={{
          width: "100%",
          backgroundColor: "var(--color-grey-dark-1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="navbar-logo"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          <img src={serverPublic + "irislogo.png"} alt="iris-logo" />
        </div>
        <Toolbar disableGutters sx={{ width: "100%" }}>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IRIS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {
                <MenuItem
                  className="home-menu-item"
                  onClick={() => navigate("/home")}
                >
                  <div>
                    <div style={{ width: "4rem", height: "4rem" }}>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                        }}
                        src={serverPublic + "irislogo.png"}
                        alt=""
                      />
                    </div>
                  </div>
                </MenuItem>
              }
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/me/dashboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              HOME
            </Button>
            <Button
              //onClick={() => navigate("/about-us")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Explore
            </Button>
            <Button
              //onClick={() => navigate("/about-us")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Safety Tips
            </Button>
            <Button
              onClick={() => navigate("/about-us")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About Us
            </Button>
          </Box>

          {/* Connection requests */}
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              gap: "4rem",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",

              padding: "0.2rem 0.5rem",
            }}
          >
            <Tooltip title="Open Connection Requests">
              <IconButton
                onClick={handleOpenConnectionMenu}
                sx={{ p: 0, position: "relative" }}
              >
                <BsFillPersonFill fill="#fff" />
                <div className="num-req-count">
                  {sentConRequests.length + receivedConRequests.length}
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  width: "30rem",
                  height: "92%",
                  mt: "35px",
                  overflow: "scroll",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElConnection}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElConnection)}
              onClose={handleCloseConnectionMenu}
            >
              <div>
                <Requests socket={socket} />
              </div>
              {/* </MenuItem> */}
            </Menu>
            {/* Friends */}
            <Tooltip title="Open friend requests">
              <IconButton onClick={handleOpenFriendMenu} sx={{ p: 0 }}>
                <BsFillPersonCheckFill fill="#fff" />
                <div className="num-req-count">
                  {sentFriendRequests.length + receivedFriendRequests.length}
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  width: "30rem",
                  height: "92%",
                  mt: "35px",
                  overflow: "scroll",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElFriend}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElFriend)}
              onClose={handleCloseFriendMenu}
            >
              <div>
                <FriendRequests socket={socket} />
              </div>
            </Menu>
            {/* Dates */}
            <Tooltip title="Open date invitations">
              <IconButton onClick={handleOpenDateMenu} sx={{ p: 0 }}>
                <CoffeeIcon sx={{ color: "#fff", marginTop: "0.4rem" }} />
                <div className="num-req-count">
                  {receivedDateRequests.length + sentDateRequests.length}
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  width: "30rem",
                  height: "92%",
                  mt: "35px",
                  overflow: "scroll",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElDate}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElDate)}
              onClose={handleCloseDateMenu}
            >
              <div>
                <DateRequests socket={socket} />
              </div>
            </Menu>

            {/* Notifications */}
            <Tooltip title="Open new notifications">
              <IconButton onClick={handleOpenNotMenu} sx={{ p: 0 }}>
                <NotificationsIcon
                  sx={{ color: "#fff", marginTop: "0.5rem" }}
                />
                <div className="num-req-count main-notification-count">
                  {warnings.length + notification.length}
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  width: "25rem",
                  height: "50%",
                  mt: "35px",
                  overflow: "scroll",
                  background: "#eee",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElNot}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNot)}
              onClose={handleCloseNotMenu}
            >
              <div>
                <Notifications handleCloseNotMenu={handleCloseNotMenu} />
              </div>
            </Menu>

            {/* Settings */}
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, objectFit: "cover" }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant={socketConnected ? "dot" : ""}
                >
                  <Avatar
                    alt="user avatar"
                    src={serverPublic + user.profilePhoto}
                  />
                </StyledBadge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{
                        color: "var(--color-primary)",
                        textDecoration: "none",
                      }}
                      to={setting.to}
                    >
                      {setting.label}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}

              <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                <Button onClick={() => navigate("/me/profile")}>Profile</Button>
              </MenuItem>

              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <Button
                  onClick={() => {
                    socket?.disconnect();
                    dispatch(logout());
                  }}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
