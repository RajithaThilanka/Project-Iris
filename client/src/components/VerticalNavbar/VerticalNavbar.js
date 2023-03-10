import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MatchesContext from "../../context/matches";
import "./VerticalNavbar.css";
function VerticalNavbar({ children }) {
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  const handleClick = (index, link) => {
    setActiveTab(index);
    navigate(link);
  };
  return (
    <>
      <nav className="sidebar">
        <ul className="side-nav">
          <li
            className={
              activeTab === 0
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => handleClick(0, "/me/dashboard")}
          >
            <span className="side-nav__link">Find a match</span>
          </li>
          <li
            className={
              activeTab === 1
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => handleClick(1, "/me/connections")}
          >
            <span className="side-nav__link">My Connections</span>
          </li>
          <li
            className={
              activeTab === 2
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => handleClick(2, "/me/friends")}
          >
            <span className="side-nav__link">My Friends</span>
          </li>
          <li
            className={
              activeTab === 3
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => handleClick(3, "/me/dates")}
          >
            <span className="side-nav__link">My dates</span>
          </li>
          <li
            className={
              activeTab === 4
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => handleClick(4, "/me/chat")}
          >
            <span className="side-nav__link">Messages</span>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}

export default VerticalNavbar;
