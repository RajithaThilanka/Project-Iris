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
  getAllFriends,
  getReceivedConRequests,
  getReceivedDateRequests,
  getReceivedFriendRequests,
  getSentConRequests,
  getSentDateRequests,
  getSentFriendRequests,
} from "../../api/UserRequests";

const pages = ["Explore", "Safety Tips", "About Us"];
const settings = ["Profile", "Account", "Dashboard"];

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
function Navbar({ user }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElFriend, setAnchorElFriend] = useState(null);
  const [anchorElConnection, setAnchorElConnection] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);

  const [dateRequests, setDateRequests] = useState();
  const dispatch = useDispatch();

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
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <AppBar position="static" sx={{ width: "100vw" }}>
      <Container
        sx={{
          width: "100%",
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="navbar-logo">
          <img src="./irislogo.png" alt="iris-logo" />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
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
                <Requests />
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
                <FriendRequests />
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
                <DateRequests />
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
                    src={
                      user.profilePhoto
                        ? serverPublic + user.profilePhoto
                        : serverPublic + "defaultProfile.png"
                    }
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                {/* <Typography textAlign="center">{setting}</Typography> */}
                <Button onClick={() => dispatch(logout())}>Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
