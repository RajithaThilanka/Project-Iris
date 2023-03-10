import "./ResetPassword.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";
import { logIn, resetPassword } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../components/Loading/Loading";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  alignItems: "center",
};

function ResetPassword() {
  const initialState = {
    password: "",
    passwordConfirm: "",
  };
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { error, loading } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    resetForm();
    setOpen(false);
    navigate(`/home`);
  };
  // Reset form fields

  const resetForm = () => {
    dispatch({ type: "AUTH_RESET" });
    setData(initialState);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.passwordConfirm) setPasswordMatch(false);
    else {
      setPasswordMatch(true);
      dispatch(resetPassword(data, token, navigate));
    }
    // dispatch(logIn(data, navigate));
  };

  //

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <div className="cancel-btn-container">
              <IconButton onClick={handleClose} className="cancel-btn">
                <CloseIcon fontSize="medium" />
              </IconButton>
            </div>
            <h1 className="login-title">Reset Password</h1>

            <TextField
              label="New Password"
              color="secondary"
              name="password"
              value={data.password}
              size="small"
              onChange={handleChange}
              fullWidth
              required
              type="password"
            />
            <TextField
              label="Confirm Password"
              color="secondary"
              name="passwordConfirm"
              size="small"
              value={data.passwordConfirm}
              onChange={handleChange}
              fullWidth
              type="password"
              required
            />
            {loading ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                Reset
              </Button>
            )}

            {!passwordMatch && (
              <div className="error-container">
                <p className="error-msg">
                  Passwords do not match Please check and Try again
                </p>
              </div>
            )}
            {error && (
              <div className="error-container">
                <p className="error-msg">{error.message}</p>
              </div>
            )}
          </Box>
        </form>
      </Modal>
    </div>
  );
}

export default ResetPassword;
