import * as React from "react";
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
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { useDispatch } from "react-redux";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import "./Navbar.css";
import { Divider } from "@mui/material";
import Requests from "../Requests/Requests";
const pages = ["Explore", "Safety Tips", "About Us"];
const settings = ["Profile", "Account", "Dashboard"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElFriend, setAnchorElFriend] = React.useState(null);
  const [anchorElConnection, setAnchorElConnection] = React.useState(null);
  const [anchorElDate, setAnchorElDate] = React.useState(null);
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

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ width: "100vw", backgroundColor: "primary.main" }}
      >
        <Toolbar disableGutters>
          <div className="navbar-logo">
            <img src="./irislogo.png" alt="iris-logo" />
          </div>
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
              gap: "20px",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",

              padding: "0.2rem 0.5rem",
            }}
          >
            <Tooltip title="Open Connection Requests">
              <IconButton onClick={handleOpenConnectionMenu} sx={{ p: 0 }}>
                <BsFillPersonFill fill="#fff" />
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
                <Requests />
              </div>
            </Menu>
            {/* Dates */}
            <Tooltip title="Open date invitations">
              <IconButton onClick={handleOpenDateMenu} sx={{ p: 0 }}>
                <CoffeeIcon sx={{ color: "#fff", marginTop: "0.4rem" }} />
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
                <Requests />
              </div>
            </Menu>

            {/* Settings */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
