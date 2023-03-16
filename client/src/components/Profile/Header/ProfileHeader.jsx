import React from "react";
import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import "./PHeaderstyle.css";
import Badge from "@mui/material/Badge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { getMe } from "../../../api/UserRequests";
import { useState, useEffect } from "react";

function ProfilHeader() {
  const [user, setUser] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMe();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: 300,
          padding: "2",
          borderradius: "5",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1677352241429-dc90cfc7a623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={6}
        >
          <Grid item xs={4} justifyContent="right">
            <Stack
              direction="column"
              className="profilepic"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                style={{
                  border: "4px solid white",
                  margin: "1px",
                }}
                alt="The image"
                // {user?.profilePhoto}
                src={serverPublic + user?.profilePhoto}
                // src="https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=3ef46b07bb19f68322d027cb8f9ac99f"
                sx={{ width: 150, height: 150 }}
              />

              <Button component="label" variant="contained">
                Update profile picture
                <input hidden accept="image/*" multiple type="file" />
              </Button>
              <br />
            </Stack>
          </Grid>

          <Grid xs={2} item marginTop={21}>
            <Button component="label" variant="contained">
              Update cover picture
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ProfilHeader;
