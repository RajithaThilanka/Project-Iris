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
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Loader from "../Loading/Loading";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "./Review..css";
import { useSelector } from "react-redux";
function Review() {
  const [formData, setData] = useState({
    description: "",
    rating: 0,
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shade, setShade] = useState([false, false, false, false, false]);
  const [description, setDescription] = useState("");
  const [rated, setRated] = useState(false);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const handleShade = (num) => {
    setShade(shade.map((s, i) => i <= num));
  };
  const resetShade = () => {
    setShade([false, false, false, false, false]);
  };

  const confirmRate = () => {
    setRated(true);
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const rating = shade.reduce((acc, val) => (val ? acc + 1 : acc), 0);

      // const {
      //   data: {
      //     data: { data },
      //   },
      // } = await signupReview(formData);
      // resetForm();
      // setErr(null);
      // setLoading(false);
      // navigate(`/auth/signup/user-info`, {
      //   replace: true,
      //   state: {
      //     id: data._id,
      //   },
      // });
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
  };

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
            <h3 className="heading-tertiary signup-heading">
              We value your feedback
            </h3>
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
                value={user?.firstname}
                aria-readonly
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
                value={user?.lastname}
                aria-readonly
              />
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Describe your experience
              </FormLabel>
              <TextField
                id="filled-multiline-static"
                multiline
                rows={10}
                variant="filled"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Rating</FormLabel>
              <p
                className="heading-tertiary rate-label-container"
                style={{
                  color: shade[4]
                    ? "gold"
                    : shade[0] && !shade[1]
                    ? "red"
                    : "var(--color-primary)",
                }}
              >
                {shade[4]
                  ? "Excellent"
                  : shade[3]
                  ? "Very Good"
                  : shade[2]
                  ? "Good"
                  : shade[1]
                  ? "Average"
                  : shade[0]
                  ? "Poor"
                  : "Rate our service"}
              </p>
              <div className="star-container">
                {!rated
                  ? shade.map((star, i) => {
                      if (star)
                        return (
                          <StarIcon
                            key={i}
                            className="star-icon"
                            onMouseOver={() => handleShade(i)}
                            onMouseLeave={resetShade}
                            fontSize="large"
                            onClick={() => confirmRate()}
                          />
                        );
                      else
                        return (
                          <StarOutlineIcon
                            key={i}
                            className="star-icon"
                            onMouseOver={() => handleShade(i)}
                            onMouseLeave={resetShade}
                            fontSize="large"
                            onClick={() => confirmRate()}
                          />
                        );
                    })
                  : shade.map((star, i) => {
                      if (star)
                        return (
                          <StarIcon
                            key={i}
                            className="star-icon"
                            fontSize="large"
                          />
                        );
                      else
                        return (
                          <StarOutlineIcon
                            key={i}
                            className="star-icon"
                            fontSize="large"
                          />
                        );
                    })}
              </div>
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
              <Button variant="contained" fullWidth type="submit">
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Review;
