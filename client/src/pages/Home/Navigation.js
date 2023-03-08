import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
function Navigation() {
  return (
    <>
      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/about-us" className="navigation__link">
              <span>01</span>About US
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/benifits" className="navigation__link">
              <span>02</span>Your benfits
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/reviews" className="navigation__link">
              <span>03</span>reviwes
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/auth/signup/account-info" className="navigation__link">
              <span>04</span>Join now
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
