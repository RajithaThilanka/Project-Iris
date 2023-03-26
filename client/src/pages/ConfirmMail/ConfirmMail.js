import React, { useEffect } from "react";
import "./ConfirmMail.css";
import Zoom from "react-reveal/Zoom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmMail } from "../../actions/AuthActions";
function ConfirmMail({ main, desc }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  return (
    <div className="confirm-mail-container">
      <div
        style={{ textAlign: "center", cursor: "pointer" }}
        className="confirm-mail-logo-container"
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
      <div className="confirm-mail-msg">
        <Zoom>
          <h2>{main}</h2>
        </Zoom>

        <p>{desc}</p>
      </div>
    </div>
  );
}

export default ConfirmMail;
