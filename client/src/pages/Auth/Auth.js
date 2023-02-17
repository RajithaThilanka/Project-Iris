import { Button, FormLabel, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";

import "./Auth.css";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsSignUp(!isSignUp);
    dispatch({ type: "AUTH_RESET" });
  };
  return (
    <>
      <Grid className="Login-page">
        <Grid className="subLogin-page">
          <Grid>
            {isSignUp ? <SignUp /> : <Login />}
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
          </Grid>
        </Grid>
        <Grid>
          <Stack direction="row" spacing={0} justifyContent={"center"}>
            <FormLabel>
              {isSignUp ? `Already have an account?` : `Don't have an account?`}
            </FormLabel>
            <Button onClick={handleClick} sx={{ padding: 0 }}>
              {isSignUp ? `Login` : `Join`}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Auth;
