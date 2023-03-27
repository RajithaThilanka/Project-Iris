import PropTypes from "prop-types";
import "./verification.css";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { logIn } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "60vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  alignItems: "center",
};

function VerificationCard({ title, children, reverse }) {
  const { error, loading } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };
  // Reset form fields

  const resetForm = () => {
    dispatch({ type: "AUTH_RESET" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(data, navigate));
  };

  return (
    <div>
      <Modal
        open={open}
        //  onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <div className="cancel-btn-container">
              <Link to="/me/profile">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClose();
                  }}
                  className="cancel-btn"
                >
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </Link>
            </div>
            <h1 className="login-title">{title}</h1>
            {children}
          </Box>
        </form>
      </Modal>
    </div>
  );
}

VerificationCard.defaultProps = {
  reverse: false,
};

VerificationCard.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default VerificationCard;
