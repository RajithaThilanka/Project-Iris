import React from "react";
import AbtUs from "../../components/AboutUs/AboutUs";
import Stack from "@mui/material/Stack";
import Navbar from "../../components/Appbar/Navbar";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export default function AboutUs() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  return (
    <div>
      <Grid container spacing={{ xs: 7, sm: 8, md: 8, lg: 8 }}>
        <Grid item xs={12}>
          <Navbar user={user} />
        </Grid>
        <Grid item xs={12}>
          <AbtUs />
        </Grid>
      </Grid>
    </div>
  );
}
