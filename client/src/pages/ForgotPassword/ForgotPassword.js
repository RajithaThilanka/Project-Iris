import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Grid from "@mui/material/Unstable_Grid2";
import { FormLabel, TextField } from "@mui/material";
import { forgotPassword } from "../../api/AuthRequests";
import "./ForgotPassword.css";

import Loader from "../../components/Loading/Loading";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "background.paper",

  boxShadow: 24,
  py: 4,
  px: 2,
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setLoading(false);
      navigate("/reset-message", { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="forgot-password-container-main">
      <form method="post" className="forgot-form-main" onSubmit={handleSubmit}>
        <Grid container rowSpacing={3} px={3} margin={2}>
          <Grid item sm={12} xs={12}>
            <div style={{ textAlign: "center", marginTop: "-2rem" }}>
              <VpnKeyIcon
                sx={{ fontSize: "8rem", color: "var(--color-primary)" }}
              />
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <h3 className="heading-tertiary forgot-heading">
              Trouble logging in?
            </h3>
          </Grid>
          <Grid item sm={12} xs={12}>
            <p
              style={{
                fontSize: "1.3rem",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Enter your email and we will send you a link to reset your
              password get back into your account
            </p>
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              label="Email"
              color="secondary"
              name="email"
              //   value={data.email}
              size="small"
              //   onChange={handleChange}
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <Button type="submit" variant="contained" fullWidth>
                Send
              </Button>
            )}
          </Grid>
          <Grid item sm={12} xs={12}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "1.4rem", textAlign: "center" }}
            >
              Click{" "}
              <Link style={{ color: "var(--color-primary)" }} to="/auth/login">
                here
              </Link>{" "}
              to go back to login page
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
