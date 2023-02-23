import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../../components/Appbar/Navbar";
import Tabbar from "../../components/Tabbar";
import { Outlet } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
function Feed() {
  return (
    <>
      <Grid container rowSpacing={4}>
        <Grid sm={4}>
          <Navbar />
        </Grid>
        <Zoom>
          <Grid sm={12}>
            <Tabbar />
          </Grid>
        </Zoom>
      </Grid>
      <Outlet />
    </>
  );
}

export default Feed;
