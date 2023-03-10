import React from "react";
import { Outlet } from "react-router-dom";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";

function WithNav() {
  return (
    <>
      <VerticalNavbar />
      <Outlet />
    </>
  );
}

export default WithNav;
