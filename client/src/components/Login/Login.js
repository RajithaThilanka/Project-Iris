import "./Login.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";
import { logIn } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../Loading/Loading";
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

function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const { error, loading } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    resetForm();
    setOpen(false);
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
    dispatch(logIn(data, navigate));
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
            <h1 className="login-title">Login</h1>

            <TextField
              label="Email"
              color="secondary"
              name="email"
              value={data.email}
              size="small"
              onChange={handleChange}
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Password"
              color="secondary"
              name="password"
              size="small"
              value={data.password}
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
                Login
              </Button>
            )}

            {error && (
              <div className="error-container">
                <p className="error-msg">
                  Please check your credentials and Try again
                </p>
                <p className="forgot-password">
                  <Link to="/forgot-password" replace={true}>
                    Trouble logging in?
                  </Link>
                </p>
              </div>
            )}
          </Box>
        </form>
      </Modal>
    </div>
  );
}

export default Login;
