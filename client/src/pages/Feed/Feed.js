import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../../components/Appbar/Navbar";
import Tabbar from "../../components/Tabbar";
import { Outlet } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";
import { getAllDates } from "../../api/UserRequests";
function Feed() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const { dates, setDates } = useContext(MatchesContext);

  return (
    <div>
      <Grid container rowSpacing={4}>
        <Grid sm={4}>
          <Navbar user={user} />
        </Grid>
        <Zoom>
          <Grid sm={12}>
            <Tabbar />
          </Grid>
        </Zoom>
      </Grid>
      <Outlet />
    </div>
  );
}

export default Feed;
