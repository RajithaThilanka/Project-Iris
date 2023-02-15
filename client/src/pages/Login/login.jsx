import "../../App.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";
import { logIn } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);

  // Reset form fields

  const resetForm = () => {
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

  return (
    <Grid className="Login-page">
      <Grid className="subLogin-page">
        <Grid>
          <Grid
            justifyContent="flex-end"
            display="flex"
            sx={{ mx: 0.5, padding: 1 }}
          >
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid>
            <Stack spacing={4} direction="row" justifyContent={"center"}>
              <Button variant="outlined" sx={{ backgroundColor: "#F2EEFF" }}>
                Registration
              </Button>
              <Button variant="text">Log in</Button>
            </Stack>
          </Grid>

          <Grid>
            <h1>Log in</h1>
          </Grid>

          <Grid>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "45ch" },
              }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormLabel>
                Your login is not valid please check your data
              </FormLabel>
              <TextField
                label="Email"
                color="secondary"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                color="secondary"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <Grid sx={{ padding: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  sx={{ backgroundColor: "#ED1E82" }}
                  style={{ padding: "11px 170px", borderRadius: "50px" }}
                >
                  Login
                </Button>
              </Grid>
            </Box>
          </Grid>

          <Grid justifyContent="flex-end" display="flex" sx={{ padding: 1 }}>
            <Button
              variant="text"
              sx={{
                fontWeight: "bold",
                fontSize: 12,
                mx: 2,
                fontStyle: "italic",
              }}
            >
              Forgotton Password
            </Button>
          </Grid>

          <Grid>
            <Stack direction="row" spacing={0} justifyContent={"center"}>
              <FormLabel>Don't have an account? </FormLabel>
              <Button href="/signup" sx={{ padding: 0 }}>
                Join
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
