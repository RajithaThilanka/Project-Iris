import React from "react";

import Bar from "../../components/Appbar/MainAppbar";

import { Stack, Typography, Grid } from "@mui/material";
import ProfilHeader from "../../components/Profile/Header/ProfileHeader";
import "./profilestyle.css";
import ContentTab from "./ContentTab";
import { useSelector } from "react-redux";
import Navbar from "../../components/Appbar/Navbar";

function UserProfile() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="profilePage">
      <Grid
        container
        container
        direction="row"
        justifyContent="center"
        alignItems="left"
      >
        <Grid item xs={12}>
          <Navbar user={user} />
        </Grid>
        <Grid item xs={12}>
          <ProfilHeader />
        </Grid>
        <Grid item xs={12}>
          <ContentTab />
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
