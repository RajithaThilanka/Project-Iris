import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loading/Loading";
import { signupAccountInfo } from "../../../api/AuthRequests";
import "./AccountInfo.css";
function AccountInfo() {
  const [formData, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [strong, setStrong] = useState(false);

  const resetForm = () => {
    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  };
  const navigate = useNavigate();
  const handleData = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    if (formData.password === formData.passwordConfirm) {
      try {
        const {
          data: {
            data: { data },
          },
        } = await signupAccountInfo(formData);
        resetForm();
        setErr(null);
        setLoading(false);
        navigate(`/auth/signup/user-info`, {
          replace: true,
          state: {
            id: data._id,
          },
        });
      } catch (error) {
        console.log(error);
        setErr(error);

        setLoading(false);
        if (error?.response?.data?.message?.startsWith("next")) {
          const msg = error?.response?.data?.message;
          const nextStep = +msg.slice(msg.indexOf(":") + 1, msg.indexOf("-"));
          const id = msg.slice(msg.indexOf("-") + 1);

          switch (nextStep) {
            case 2:
              navigate(`/auth/signup/user-info`, {
                replace: true,
                state: {
                  id: id,
                },
              });
              break;
            case 3:
              navigate(`/auth/signup/profileview-info`, {
                replace: true,
                state: {
                  id: id,
                },
              });
              break;
            case 4:
              navigate(`/auth/signup/lookingfor-info`, {
                replace: true,
                state: {
                  id: id,
                },
              });
              break;
            default:
              navigate("/home");
          }
        }
      }
    } else {
      console.log("Passwords do not match");
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    setPasswordsMatch(formData.password === formData.passwordConfirm);
  }, [formData.password, formData.passwordConfirm]);

  useEffect(() => {
    setStrong(formData.password.length >= 8);
  }, [formData.password]);
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="account-info-form" method="post">
        <Grid container spacing={3} px={3} margin={2}>
          <Grid sm={12} xs={12}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "4rem",
                  height: "4rem",
                  cursor: "pointer",
                }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
                onClick={() => navigate("/home", { replace: true })}
              />
            </div>
          </Grid>
          <Grid sm={12} xs={12}>
            <h3 className="heading-tertiary signup-heading">Let's begin</h3>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>First Name</FormLabel>
              <TextField
                required
                size="small"
                label="Required"
                fullWidth
                name="firstname"
                onChange={handleData}
                value={formData.firstname}
              />
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Last Name</FormLabel>
              <TextField
                required
                size="small"
                label="Required"
                fullWidth
                name="lastname"
                onChange={handleData}
                value={formData.lastname}
              />
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Email</FormLabel>
              <TextField
                required
                label="Required"
                size="small"
                fullWidth
                name="email"
                type="email"
                error={err ? true : false}
                helperText={err ? err?.response?.data?.message : ""}
                onChange={handleData}
                value={formData.email}
              />
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Password</FormLabel>
              <TextField
                required
                label="Required"
                size="small"
                type="password"
                fullWidth
                name="password"
                onChange={handleData}
                error={!passwordsMatch || !strong}
                helperText={
                  !passwordsMatch
                    ? "Passwords do not match"
                    : !strong
                    ? "Password should be at least 8 characters"
                    : ""
                }
                value={formData.password}
              />
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Confirm Password
              </FormLabel>
              <TextField
                required
                label="Required"
                size="small"
                type="password"
                fullWidth
                name="passwordConfirm"
                error={!passwordsMatch}
                helperText={!passwordsMatch ? "Passwords do not match" : ""}
                onChange={handleData}
                value={formData.passwordConfirm}
              />
            </Stack>
          </Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={4} xs={1}></Grid>
          <Grid sm={4} xs={6}>
            {loading && !err ? (
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
                variant="contained"
                fullWidth
                type="submit"
                disabled={!passwordsMatch || !strong}
              >
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AccountInfo;
