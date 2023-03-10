import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { FormLabel, Grid, TextField } from "@mui/material";
import { forgotPassword } from "../../api/AuthRequests";
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
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/auth/login");
  };
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
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center", marginTop: "-2rem" }}>
            <VpnKeyIcon
              sx={{ fontSize: "8rem", color: "var(--color-primary)" }}
            />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Trouble logging in?
          </Typography>
          <p
            style={{
              fontSize: "1.3rem",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Enter your email and we will send you a link to reset your password
            get back into your account
          </p>
          <form
            method="post"
            style={{
              padding: "1rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            onSubmit={handleSubmit}
          >
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
            {loading ? (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Loader />
              </div>
            ) : (
              <Button type="submit" variant="contained">
                Send
              </Button>
            )}
          </form>
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
        </Box>
      </Modal>
    </div>
  );
}
