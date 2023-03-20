import {
  FormControlLabel,
  FormGroup,
  IconButton,
  styled,
  Switch,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MatchesContext from "../../context/matches";
import "./BottomNavbar.css";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Filter from "../Filter/Filter";
import PublicIcon from "@mui/icons-material/Public";
import FilterMobileContainer from "../FilterMobileContainer/FilterMobileContainer";

function BottomNavbar({ children }) {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, matches, setSelectedChat } =
    useContext(MatchesContext);
  const handleClick = (index, link) => {
    setSelectedChat(null);
    setActiveTab(index);
    navigate(link);
  };

  const { notification, setNotification } = useContext(MatchesContext);

  return (
    <div className="bottom-nav-container">
      {/* <div className="toggle-btn-container">
        Filter
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          className="filter-btn"
          disabled={matches.length === 0}
          size="small"
        />
      </div> */}

      <nav className="bottom-sidebar">
        <ul className="bottom-side-nav">
          <li
            className={
              activeTab === 0
                ? "bottom-side-nav__item bottom-side-nav__item--active"
                : "bottom-side-nav__item"
            }
            onClick={() => handleClick(0, "/me/dashboard")}
          >
            <PublicIcon
              fontSize="large"
              sx={{ color: "var(--color-grey-dark-2)" }}
            />
          </li>
          <li
            className={
              activeTab === 1
                ? "bottom-side-nav__item bottom-side-nav__item--active"
                : "bottom-side-nav__item"
            }
            onClick={() => handleClick(1, "/me/connections")}
          >
            <PersonIcon
              fontSize="large"
              sx={{ color: "var(--color-grey-dark-2)" }}
            />
          </li>
          <li
            className={
              activeTab === 2
                ? "bottom-side-nav__item bottom-side-nav__item--active"
                : "bottom-side-nav__item"
            }
            onClick={() => handleClick(2, "/me/friends")}
          >
            <PersonAddAlt1Icon
              fontSize="large"
              sx={{ color: "var(--color-grey-dark-2)" }}
            />
          </li>
          <li
            className={
              activeTab === 3
                ? "bottom-side-nav__item bottom-side-nav__item--active"
                : "bottom-side-nav__item"
            }
            onClick={() => handleClick(3, "/me/dates")}
          >
            <CoffeeIcon
              fontSize="large"
              sx={{ color: "var(--color-grey-dark-2)" }}
            />
          </li>
          <li
            className={
              activeTab === 4
                ? "bottom-side-nav__item bottom-side-nav__item--active"
                : "bottom-side-nav__item"
            }
            style={{ position: "relative" }}
            onClick={() => handleClick(4, "/me/chat")}
          >
            <div
              style={{
                position: "absolute",
                top: "-25%",
                right: "-40%",
                background: "red",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#fff",
                display: notification.length > 0 ? "block" : "none",
              }}
            >
              {notification?.length}
            </div>
            <ChatBubbleIcon
              fontSize="medium"
              sx={{ color: "var(--color-grey-dark-2)" }}
            />
          </li>
          <li
            className={
              activeTab === 5
                ? "bottom-side-nav__item bottom-side-nav__item--active"
                : "bottom-side-nav__item"
            }
          >
            <FilterMobileContainer>
              <PersonSearchIcon
                fontSize="large"
                sx={{ color: "var(--color-grey-dark-2)" }}
              />
            </FilterMobileContainer>
          </li>
        </ul>
      </nav>

      {children}
    </div>
  );
}

export default BottomNavbar;
