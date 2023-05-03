import React, { useEffect } from "react";
import Zoom from "react-reveal/Zoom";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./MailConfirmed.css";

function MailConfirmed({ main }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  return (
    <div className="confirmed-mail-container">
      <div
        style={{ textAlign: "center", cursor: "pointer" }}
        className="confirmed-mail-logo-container"
        onClick={() => {
          navigate(`/home`, { replace: true });
        }}
      >
        <img
          style={{
            borderRadius: "50%",
            width: "8rem",
            height: "8rem",
          }}
          src={serverPublic + "irislogo.png"}
          alt="logo"
        />
      </div>
      <div className="confirmed-mail-msg">
        <Zoom>
          <h2>{main}</h2>
        </Zoom>

        <p>
          {" "}
          Click{" "}
          <Link
            style={{ color: "var(--color-secondary)" }}
            to="/auth/signup/questions"
          >
            here
          </Link>{" "}
          to go to your account
        </p>
      </div>
    </div>
  );
}

export default MailConfirmed;
