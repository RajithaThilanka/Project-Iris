import "./Login.css";
import Grid from "@mui/material/Unstable_Grid2";
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
    dispatch(logIn(data, navigate));
  };

  //
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="login-container-main">
      <form onSubmit={handleSubmit} className="login-form-main" method="post">
        <Grid container rowSpacing={3} px={3} margin={2}>
          <Grid item sm={12} xs={12}>
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={handleClose}
            >
              <img
                style={{ borderRadius: "50%", width: "4rem", height: "4rem" }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
              />
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <h3 className="heading-tertiary login-heading">
              Login to your account
            </h3>
          </Grid>
          <Grid item sm={12} xs={12}>
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
          </Grid>
          <Grid item sm={12} xs={12}>
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
          </Grid>
          <Grid item sm={12} xs={12}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
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
          </Grid>
          <Grid item sm={12} xs={12}>
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
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
