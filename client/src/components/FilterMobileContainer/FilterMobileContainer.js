import * as React from "react";

import Drawer from "@mui/material/Drawer";

import Divider from "@mui/material/Divider";

import Filter from "../Filter/Filter";
import { IconButton } from "@mui/material";

export default function FilterMobileContainer({ children }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const anchor = "left";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <IconButton
        disabled={window.location.pathname !== "/me/dashboard"}
        sx={{ padding: "0", paddingBottom: "0.2rem" }}
        onClick={toggleDrawer(anchor, true)}
      >
        {children}
      </IconButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        PaperProps={{
          sx: {
            width: "70%",
            height: "87.6%",
            top: "7.4%",
          },
        }}
        sx={{ width: "70%", top: "7.4%", height: "80%" }}
      >
        <Filter />
      </Drawer>
    </div>
  );
}
