import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../../components/Appbar/Navbar";
import Tabbar from "../../components/Tabbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import { useSelector } from "react-redux";
import MatchesContext from "../../context/matches";
import { getAllDates } from "../../api/UserRequests";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import { Dashboard } from "@mui/icons-material";
import Chat from "../Chat/Chat";
import SideMenu from "../../components/SideMenu";
function Feed() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  const { dates, setDates } = useContext(MatchesContext);

  return (
    <div>
      <Grid container rowSpacing={4}>
        {/* <Grid sm={4}>
          <Navbar user={user} />
        </Grid> */}
        <Zoom>
          <Grid sm={12}>
            <VerticalNavbar />
          </Grid>
        </Zoom>
      </Grid>
    </div>
  );
}

export default Feed;
