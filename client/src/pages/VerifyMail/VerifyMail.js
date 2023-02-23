import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirmMail } from "../../actions/AuthActions";
import Zoom from "react-reveal/Zoom";
import "./VerifyMail.css";
import Loader from "../../components/Loading/Loading";
function VerifyMail() {
  const { error, loading } = useSelector((state) => state.authReducer);
  console.log(loading);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, token } = params;

  useEffect(() => {
    if (userId && token) {
      dispatch(confirmMail(userId, token, navigate));
    }
  }, []);

  return (
    <div className="verify-mail-container">
      <div className="verify-mail-msg">
        <Zoom>
          <div className="loader-container">{loading ? <Loader /> : ""}</div>
        </Zoom>
      </div>
    </div>
  );
}

export default VerifyMail;
