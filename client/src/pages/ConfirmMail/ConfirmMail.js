import React, { useEffect } from "react";
import "./ConfirmMail.css";
import Zoom from "react-reveal/Zoom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmMail } from "../../actions/AuthActions";
function ConfirmMail() {
  return (
    <div className="confirm-mail-container">
      <div className="confirm-mail-msg">
        <Zoom>
          <h2>Mail successfully sent</h2>
        </Zoom>

        <p>
          Please follow the link attached to your email to verify your account
        </p>
      </div>
    </div>
  );
}

export default ConfirmMail;
