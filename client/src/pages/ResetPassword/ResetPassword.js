import "./ResetPassword.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";
import { logIn, resetPassword } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import { Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Unstable_Grid2";
import Loader from "../../components/Loading/Loading";

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

  const handleClose = () => {
    resetForm();
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
    <div className="reset-password-container-main">
      <form method="post" className="reset-form-main" onSubmit={handleSubmit}>
        <Grid container rowSpacing={3} px={3} margin={2}>
          <Grid item sm={12} xs={12}>
            <div style={{ textAlign: "center", marginTop: "-2rem" }}>
              <VpnKeyIcon
                sx={{ fontSize: "8rem", color: "var(--color-primary)" }}
              />
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <h3 className="heading-tertiary reset-heading">Reset Password</h3>
          </Grid>

          <Grid item sm={12} xs={12}>
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
          </Grid>
          <Grid item sm={12} xs={12}>
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
                Send
              </Button>
            )}
          </Grid>
          <Grid item sm={12} xs={12}>
            {!passwordMatch && (
              <div className="error-container">
                <p className="error-msg">
                  Passwords do not match Please check and Try again
                </p>
              </div>
            )}
          </Grid>
          <Grid item sm={12} xs={12}>
            {error && (
              <div className="error-container">
                <p className="error-msg">{error.message}</p>
              </div>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ResetPassword;
